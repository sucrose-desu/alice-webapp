import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

export class BusterDrone {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private controls: OrbitControls
  private composer: EffectComposer

  constructor(canvas: HTMLCanvasElement) {
    const [_w, _h] = [window.innerWidth, window.innerHeight - 110]

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(60, _w / _h, 0.1, 1000)
    this.camera.position.set(0, 1, 5)

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(_w, _h)
    this.renderer.shadowMap.enabled = true
    // this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMapping = THREE.ReinhardToneMapping
    this.renderer.outputColorSpace = THREE.SRGBColorSpace

    this.composer = new EffectComposer(this.renderer)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    // Disable vertical rotation (upward and downward)
    // this.controls.minPolarAngle = Math.PI / 2
    // this.controls.maxPolarAngle = Math.PI / 2
  }

  public async init() {
    const [texture, model] = await Promise.all([this.TextureLoader(), this.ModalLoader()])

    // this.scene.background = new THREE.Color(0xffffff)
    // this.scene.background = texture
    this.scene.environment = texture

    model.scene.castShadow = true
    model.scene.receiveShadow = true
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material.hasOwnProperty('roughness')) {
          child.material.roughness = 0
        }

        if (child.material.hasOwnProperty('metalness')) {
          child.material.metalness = 0.5
        }

        // if (child.material.hasOwnProperty('wireframe')) {
        //   child.material.wireframe = true
        // }
      }
    })

    const renderScene = new RenderPass(this.scene, this.camera)

    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
    const params = {
      threshold: 1,
      strength: 0.2,
      radius: 0,
      exposure: 1
    }
    bloomPass.threshold = params.threshold
    bloomPass.strength = params.strength
    bloomPass.radius = params.radius

    const outputPass = new OutputPass()

    this.composer.addPass(renderScene)
    this.composer.addPass(bloomPass)
    this.composer.addPass(outputPass)

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

    const gui = new GUI()

    const bloomFolder = gui.addFolder('Unreal Bloom Pass')
    bloomFolder.add(params, 'threshold', 0.0, 1.0).onChange((value: number) => {
      bloomPass.threshold = Number(value)
    })
    bloomFolder.add(params, 'strength', 0.0, 3.0).onChange((value: number) => {
      bloomPass.strength = Number(value)
    })

    const toneMappingFolder = gui.addFolder('Tone Mapping')
    toneMappingFolder.add(params, 'exposure', 0.1, 2).onChange((value: number) => {
      this.renderer.toneMappingExposure = Math.pow(value, 4.0)
    })
  }

  public animate(mixer?: THREE.AnimationMixer) {
    requestAnimationFrame(() => this.animate(mixer))

    if (mixer) mixer.update(0.01)

    this.controls.update()
    this.composer.render()
  }

  private sphere() {
    const sphere1 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 50, 50),
      new THREE.MeshStandardMaterial({
        roughness: 0,
        metalness: 0.5,
        color: 0xf1c376
      })
    )
    sphere1.position.set(-2.5, 0, 0)

    const sphere2 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 50, 50),
      new THREE.MeshStandardMaterial({
        roughness: 0,
        metalness: 0.5,
        color: 0xf5f5f5
      })
    )
    sphere2.position.set(2.5, 0, 0)

    return [sphere1, sphere2]
  }

  private async ModalLoader() {
    const loader = new GLTFLoader()
    const glTF = await loader.loadAsync('/static/three/models/sony_digimatic_flip_clock/scene.gltf')
    glTF.scene.scale.set(10, 10, 10)
    glTF.scene.position.y = -0.5
    // glTF.animations // Array<THREE.AnimationClip>
    // glTF.scene // THREE.Group
    // glTF.scenes // Array<THREE.Group>
    // glTF.cameras // Array<THREE.Camera>
    // glTF.asset // Object

    return glTF
  }

  private async TextureLoader() {
    const loader = new RGBELoader()
    const texture = await loader.loadAsync('/static/three/texture/studio_small_03_4k.hdr')

    texture.mapping = THREE.EquirectangularReflectionMapping
    return texture
  }
}
