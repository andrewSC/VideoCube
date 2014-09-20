require([
  'jquery'
], function($) {
  'use strict';

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  window.URL = window.URL || window.webkitURL;

  var camVideo = document.getElementById('video-feed');

  if (!navigator.getUserMedia) {
    displayError('Sorry. <code>navigator.getUserMedia()</code> is not available.');
  }
  else {
    navigator.getUserMedia({video: true}, streamSuccess, streamFailure);
  }

  function streamSuccess(stream) {
    camVideo.src = (window.URL) ? window.URL.createObjectURL(stream) : stream;

    camVideo.onerror = function() {
      stream.stop();
    }

    stream.onended = streamFailure;
  }

  function streamFailure(e) {
    var msg = (e.code === 1) ? 'User denied access to use camera' : 'No camera available';

    displayError(msg);
  }

  function displayError(msg) {
    $('.js-error-message').html(msg);
    $('.js-centered').removeClass('hide');
  }

});
