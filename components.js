const imageTargetPortalComponent = () => ({
  schema: {
    name: {type: 'string'},
  },
  init() {
    const {object3D} = this.el
    const {name} = this.data
    object3D.visible = false

    const snow = document.createElement('a-entity')

    snow.setAttribute('position', new THREE.Vector3(0, 0, -0.5))
    snow.setAttribute('scale', '1 1 1')
    snow.setAttribute('visible', 'true')
    snow.setAttribute('particle-system', {

      color: 'white',
      positionSpread: '0 0.5 0',
      rotationAngle: '3.14',
      // direction: '-1',
      particleCount: '250',
      maxParticleCount: '500',
      maxAge: '20',
      accelerationValue: '0, 0, 0',
      size: '0.15',
      accelerationSpread: '0.2 0 0.2',
      velocityValue: '0 2 0',
      blending: 1,
      texture: 'https://cdn.rawgit.com/IdeaSpaceVR/aframe-particle-system-component/master/dist/images/smokeparticle.png',
    })
    console.log(snow)
    this.el.appendChild(snow)

    // selects the portal
    const portal = this.el.sceneEl.querySelector('#portal')
    // selects the ball
    const ball = this.el.sceneEl.querySelector('#ball')

    const showImage = ({detail}) => {
      if (name !== detail.name) {
        return
      }
      
      object3D.position.copy(detail.position)
      object3D.quaternion.copy(detail.rotation)
      object3D.scale.set(detail.scale, detail.scale, detail.scale)
      object3D.visible = true
    }

    const imageFound = (e) => {
      showImage(e)
      
      // portal animation
      setTimeout(() => {
        portal.setAttribute('animation__scaleIn', {
          property: 'radius-inner',
          dur: 1500,
          from: '0.001',
          to: '0.235',
          easing: 'easeOutElastic',
        })
      }, 200)

      // ball animation
      setTimeout(() => {
        ball.setAttribute('animation__moveOut', {
          property: 'position',
          dur: 3000,
          from: '0 .1 -5',
          to: '0 0 0.7',
          easing: 'easeOutQuad',
        })
      }, 1000)
    }

    const imageLost = (e) => {
      object3D.visible = false
    }

    this.el.sceneEl.addEventListener('xrimagefound', imageFound)
    this.el.sceneEl.addEventListener('xrimageupdated', showImage)
    this.el.sceneEl.addEventListener('xrimagelost', imageLost)
  },
})

export {imageTargetPortalComponent}
