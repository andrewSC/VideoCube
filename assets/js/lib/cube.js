define([
  'jquery',
  'stats',
  'lib/three'
], function($) {
  'use strict';

    function initVideo(feedId, stillId) {
      var feed = document.getElementById(feedId),
          still = document.getElementById(stillId),
          context = still.getContext('2d'),
          texture = new THREE.Texture(still);

      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, still.width, still.height);

      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      return {
        feed: feed,
        still: still,
        context: context,
        texture: texture
      }
    }

    function initStats() {
      var stats = new Stats();

      stats.domElement.style.position = 'absolute';
      stats.domElement.style.right = '0px';
      stats.domElement.style.top = '0px';

      $('body').append(stats.domElement);

      return stats;
    }

    return {
      init: function(feedId, stillId) {
        var video = initVideo(feedId, stillId),
            stats = initStats(),
            scene = new THREE.Scene(),
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
            renderer = new THREE.WebGLRenderer(),
            geometry = new THREE.BoxGeometry(300, 300, 300),
            material = new THREE.MeshLambertMaterial({ map: video.texture }),
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
          if (video.feed.readyState === video.feed.HAVE_ENOUGH_DATA) {
            video.context.drawImage(video.feed, 0, 0, video.still.width, video.still.height);

            if (video.texture) {
              video.texture.needsUpdate = true;
            }
          }

          cube.rotation.x += 0.027;
          cube.rotation.y += 0.027;

          renderer.render(scene, camera);
        }

        function animate() {
          window.requestAnimationFrame(animate);
          render();
          stats.update();
        }

        animate();
      }
   };
});
