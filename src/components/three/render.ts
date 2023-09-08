import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js'

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
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.outputColorSpace = THREE.SRGBColorSpace

    this.composer = new EffectComposer(this.renderer)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }

  public async init() {
    const [texture, model] = await Promise.all([this.TextureLoader(), this.ModalLoader()])

    // this.scene.background = new THREE.Color(0xffffff)
    this.scene.background = texture
    this.scene.environment = texture

    model.scene.castShadow = true
    model.scene.receiveShadow = true
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material
        console.log(material)

        if (material.name === 'Boden') {
          if (material.hasOwnProperty('opacity')) {
            material.opacity = 0.5
          }
        } else {
          if (material.map) {
            material.map.mapping = THREE.EquirectangularReflectionMapping
          }

          if (material.hasOwnProperty('roughness')) {
            material.roughness = 0
          }

          if (material.hasOwnProperty('metalness')) {
            material.metalness = 0.75
          }
        }
      }
    })
    this.scene.add(model.scene)

    this.scene.add(...this.sphere())

    const mixer = new THREE.AnimationMixer(model.scene)
    const action = mixer.clipAction(model.animations[0])
    action.play()

    const renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(renderPass)

    const bloomPass = new BloomPass()
    this.composer.addPass(bloomPass)

    this.animate(mixer)
  }

  public animate(mixer: THREE.AnimationMixer) {
    requestAnimationFrame(() => this.animate(mixer))

    mixer.update(0.01)
    this.controls.update()
    this.composer.render(0.01)
    this.renderer.render(this.scene, this.camera)
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
    const glTF = await loader.loadAsync('/static/three/models/buster_drone/scene.gltf')
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
