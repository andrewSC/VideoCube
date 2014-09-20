require([
  'jquery'
], function($) {
  'use strict';

  /* Adapted implementation from https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/Webcam-Texture.html */

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  window.URL = window.URL || window.webkitURL;

  var camVideo = document.getElementById('monitor');

  if (!navigator.getUserMedia) {
    $('#errorMessage').html('Sorry. <code>navigator.getUserMedia()</code> is not available.');
  }
  else {
    navigator.getUserMedia({video: true}, streamSuccess, streamFailure);
  }

  function streamSuccess(stream) {
    if (window.URL) {
      camVideo.src = window.URL.createObjectURL(stream);
      console.debug(camVideo);
    } else {
      camVideo.src = stream;
    }

    camVideo.onerror = function(e) {
      stream.stop();
    }

    stream.onended = streamFailure;
  }

  function streamFailure(e) {
    var msg = (e.code === 1)
              ? 'User denied access to use camera'
              : 'No camera available';

    $('#errorMessage').html('<b>' + msg + '</b>');
  }

});
