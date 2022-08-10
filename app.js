// Copyright (c) 2022 8th Wall, Inc.
//
// app.js is the main entry point for your 8th Wall app. Code here will execute after head.html
// is loaded, and before body.html is loaded.
import {imageTargetPortalComponent} from './components'
import {cubeEnvMapComponent} from './cubemap-static'
const tex = require('./assets/texture.jpeg')

AFRAME.registerComponent('image-target-portal', imageTargetPortalComponent())
AFRAME.registerComponent('cubemap-static', cubeEnvMapComponent)
AFRAME.registerComponent('modify-materials', {
  init() {
    // Wait for model to load.
    this.el.addEventListener('model-loaded', () => {
      // Grab the mesh / scene.
      const obj = this.el.getObject3D('mesh')
      // Go over the submeshes and modify materials we want.
      // console.log(obj)
      // console.log(obj.material)
      console.log(obj.children[0].position)
      // obj.children[0].position.set()
      // console.log(obj.children[1])
      // console.log(obj.children[2])
      // obj.material.color.set('red')
      const mesh = obj.children[2]
      const i = 0
      mesh.traverse((node) => {
        node.material.color.set('red')
      })
    })
  },
})
