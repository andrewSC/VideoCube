require([
  'jquery',
  'video',
  'lib/three'
], function($) {
  'use strict';

  // Decided not to append the video specific declarations below for readibility sake
  var video = document.getElementById('monitor'),
      videoImage = document.getElementById('videoImage'),
      videoImageContext = videoImage.getContext('2d'),
      videoTexture = new THREE.Texture( videoImage ),
      movieMaterial;

      videoImageContext.fillStyle = '#ffffff';
      videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;

  var scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
      renderer = new THREE.WebGLRenderer(),
      geometry = new THREE.BoxGeometry(300, 300, 300),
      material = new THREE.MeshLambertMaterial({ map: videoTexture }),
      cube = new THREE.Mesh(geometry, material),
      ambientLight = new THREE.AmbientLight(0xbbbbbb),
      directionalLight = new THREE.DirectionalLight(0xffffff);

  cube.overdraw = true;
  camera.position.z = 500;
  directionalLight.position.set(1, 1, 1).normalize();

  scene.add(cube);
  scene.add(ambientLight);
  scene.add(directionalLight);

  renderer.setSize(window.innerWidth, window.innerHeight);

  $('body').append(renderer.domElement);

  function render() {

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      videoImageContext.drawImage(video, 0, 0, videoImage.width, videoImage.height);

      if (videoTexture) {
        videoTexture.needsUpdate = true;
      }
    }

    cube.rotation.x += 0.027;
    cube.rotation.y += 0.027;

    renderer.render(scene, camera);
  }

  function animate() {
    window.requestAnimationFrame(animate);
    render();
  }

  animate();
});
