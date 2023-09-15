'use client'

import * as THREE from 'three'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ThreeRenderer } from './render'

type MeshGeometry = THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>
type Preset = {
  name: string
  value: string
  isColor?: boolean
  isTexture?: boolean
  roughness?: number
  metalness?: number
}

export function Three() {
  // __STATE<React.Hooks>
  const nodeRef = useRef<HTMLCanvasElement>(null)
  const started = useRef<number>(0)

  const [material, setMaterial] = useState<THREE.MeshStandardMaterial | null>(null)
  const arr = useMemo<Preset[]>(
    () => [
      { name: 'grunge.jpg', value: '/static/three/grunge.jpg', roughness: 0.5, metalness: 0.75, isTexture: true },
      { name: '4.jpg', value: '/static/three/4.jpg', roughness: 1, metalness: 0, isTexture: true },
      { name: '3.jpg', value: '/static/three/3.jpg', roughness: 1, metalness: 0, isTexture: true },
      { name: 'wooden.jpg', value: '/static/three/wooden.jpg', roughness: 1, metalness: 0, isTexture: true }
    ],
    []
  )

  // __FUNCTION's
  const handleChange = useCallback(
    (e: Preset) => {
      if (material) {
        if (e.isTexture && material.map?.isTexture) {
          const textureLoader = new THREE.TextureLoader()
          const texture = textureLoader.load(e.value)
          material.map = texture

          if (e.roughness) material.roughness = e.roughness
          if (e.metalness) material.metalness = e.metalness

          // const name = object.material.map.name
          // console.log(name)
        } else if (e.isColor && material.color.isColor) {
          // const hex = '#' + material.color.getHexString()
          // console.log(hex)

          material.color = new THREE.Color(e.value)
        }
      }
    },
    [material]
  )

  const handleSelectedObject = useCallback((object?: MeshGeometry) => {
    if (object?.material) {
      setMaterial(object.material)
    } else {
      setMaterial(null)
    }
  }, [])

  // __EFFECT's
  useEffect(() => {
    if (nodeRef.current && !started.current) {
      const three = new ThreeRenderer(nodeRef.current)
      three.init()
      three.onSelectedObject(handleSelectedObject)

      started.current = 1
      // return () => {
      //   if (started.current) three.destroy()
      // }
    }
  }, [nodeRef, started])

  // __RENDER
  return (
    <>
      <canvas className='three-js mx-auto' ref={nodeRef}></canvas>

      {material && (
        <div className='fixed right-8 bottom-28 p-4 rounded-2xl border-[1px] border-slate-300/75 bg-slate-300/50 backdrop-blur-md'>
          <div className='grid gap-4'>
            <div className='rows'>
              <input
                type='color'
                className='block w-12 h-12 mx-auto cursor-pointer'
                onChange={({ target }) => {
                  handleChange({
                    name: 'input',
                    value: target.value,
                    isColor: true
                  })
                }}
              />
            </div>

            <hr className='border-[1px] border-slate-300/75' />

            {arr.map((record, index) => (
              <div className='rows p-1 cursor-pointer' onClick={() => handleChange(record)} key={index}>
                <img
                  className='block w-12 h-12 object-cover object-center rounded-[50%] outline outline-2 outline-offset-2 outline-slate-200/25'
                  src={record.value}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
