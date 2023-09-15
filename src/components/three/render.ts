import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

export class ThreeRenderer {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer

  private controls: OrbitControls
  private composer: EffectComposer
  private renderPass: RenderPass
  private unrealBloomPass: UnrealBloomPass

  private GUI: GUI

  constructor(canvas: HTMLCanvasElement) {
    const [_w, _h] = [window.innerWidth, window.innerHeight]

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x272829)

    this.camera = new THREE.PerspectiveCamera(75, _w / _h, 0.1, 1e3)
    this.camera.position.set(0, 0, 6)

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(_w, _h)
    this.renderer.shadowMap.enabled = true
    this.renderer.toneMapping = THREE.ReinhardToneMapping
    this.renderer.outputColorSpace = THREE.SRGBColorSpace

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    // Disable vertical rotation (upward and downward)
    // this.controls.minPolarAngle = Math.PI / 2
    // this.controls.maxPolarAngle = Math.PI / 2

    this.composer = new EffectComposer(this.renderer)
    this.renderPass = new RenderPass(this.scene, this.camera)
    this.unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(_w, _h), 0.128, 0, 1)

    this.composer.addPass(this.renderPass)
    this.composer.addPass(this.unrealBloomPass)
    this.composer.addPass(new OutputPass())

    this.GUI = new GUI()
  }

  public async init() {
    const [texture, model] = await Promise.all([this.TextureLoader(), this.ModalLoader()])

    this.scene.background = texture
    this.scene.environment = texture

    model.scene.castShadow = true
    model.scene.receiveShadow = true
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material.hasOwnProperty('roughness')) {
          child.material.roughness = 0.1
        }

        if (child.material.hasOwnProperty('metalness')) {
          child.material.metalness = 0.5
        }

        // if (child.material.hasOwnProperty('wireframe')) {
        //   child.material.wireframe = true
        // }
      }
    })

    this.scene.add(model.scene)
    this.scene.add(...this.sphere())

    if (model.animations.length) {
      const mixer = new THREE.AnimationMixer(model.scene)
      const action = mixer.clipAction(model.animations[0])
      action.play()

      this.animate(mixer)
    } else {
      this.animate()
    }

    const fx = {
      threshold: 1,
      strength: 0.128,
      radius: 0,
      exposure: 1
    }

    const bloomFolder = this.GUI.addFolder('Unreal Bloom Pass')
    bloomFolder.add(fx, 'threshold', 0, 1).onChange((value: number) => {
      this.unrealBloomPass.threshold = Number(value)
    })
    bloomFolder.add(fx, 'strength', 0, 3).onChange((value: number) => {
      this.unrealBloomPass.strength = Number(value)
    })

    const toneMappingFolder = this.GUI.addFolder('Tone Mapping')
    toneMappingFolder.add(fx, 'exposure', 0.1, 2).onChange((value: number) => {
      this.renderer.toneMappingExposure = Math.pow(value, 4)
    })
  }

  public animate(mixer?: THREE.AnimationMixer) {
    requestAnimationFrame(() => this.animate(mixer))

    if (mixer) mixer.update(0.01)

    this.controls.update()
    this.composer.render()
  }

  public onSelectedObject(cb: (object?: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>) => void) {
    const onDocumentMouseDown = (event: any) => {
      // Get the mouse coordinates normalized between -1 and 1
      const mouse = new THREE.Vector2()
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      // Create a raycaster and cast a ray from the camera through the mouse position
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, this.camera)

      // Find intersected objects
      const intersects = raycaster.intersectObjects(this.scene.children)

      if (intersects.length > 0) {
        // If there are intersected objects, handle the selection
        const selectedObject = intersects[0].object
        // Do something with the selected object
        cb(selectedObject as any)
      } else {
        if (event?.target?.nodeName === 'CANVAS') cb(void 0)
      }
    }

    document.addEventListener('mousedown', onDocumentMouseDown, false)
  }

  public destroy() {
    // this.composer.dispose()
    this.GUI.destroy()
  }

  private sphere() {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0xffffff, // Base color of the material (white for glass)
        roughness: 0, // Roughness of the material (controls reflections)
        metalness: 1, // Metalness of the material (0 for non-metallic)
        transparent: true, // Enable transparency
        opacity: 0.5, // Set opacity for the glass
        envMapIntensity: 1 // Intensity of environment mapping (reflection)
        // refractionRatio: 0.95, // Refraction ratio (controls bending of light)
      })
    )
    sphere.position.set(3.75, 0, 0)

    const sphere1 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshStandardMaterial({
        roughness: 0,
        metalness: 0.5,
        color: 0xf1c376
      })
    )
    sphere1.position.set(1.25, 0, 0)

    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('/static/three/grunge.jpg')
    const sphere2 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshStandardMaterial({
        roughness: 0.5,
        metalness: 0.75,
        map: texture
      })
    )
    sphere2.position.set(-3.75, 0, 0)

    const sphere3 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshStandardMaterial({
        roughness: 1,
        metalness: 0,
        color: 0x000000
      })
    )
    sphere3.position.set(-1.25, 0, 0)

    return [sphere, sphere1, sphere2, sphere3]
  }

  private async ModalLoader() {
    const loader = new GLTFLoader()
    const glTF = await loader.loadAsync('/static/three/models/sony_digimatic_flip_clock/scene.gltf')
    glTF.scene.scale.set(11, 11, 11)
    glTF.scene.position.y = -2.5
    // glTF.animations // Array<THREE.AnimationClip>
    // glTF.scene // THREE.Group
    // glTF.scenes // Array<THREE.Group>
    // glTF.cameras // Array<THREE.Camera>
    // glTF.asset // Object

    return glTF
  }

  private async TextureLoader() {
    const loader = new RGBELoader()
    const texture = await loader.loadAsync('/static/three/texture/brown_photostudio_02_4k.hdr')

    texture.mapping = THREE.EquirectangularReflectionMapping
    return texture
  }
}
