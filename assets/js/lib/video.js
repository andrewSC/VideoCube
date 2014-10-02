define([
  'jquery'
], function($) {
  'use strict';

  function streamSuccess(stream) {
    this.feedEl.src = (window.URL) ? window.URL.createObjectURL(stream) : stream;

    this.feedEl.onerror = function() {
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

  return {
    init: function(feedId) {
      this.feedEl = document.getElementById(feedId);

      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      window.URL = window.URL || window.webkitURL;

      if (!navigator.getUserMedia) {
        displayError('Sorry. <code>navigator.getUserMedia()</code> is not available.');
      }
      else {
        navigator.getUserMedia({video: true}, streamSuccess.bind(this), streamFailure);
      }
    }
  };
});
