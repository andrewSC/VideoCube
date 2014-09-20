define([
  'jquery'
], function($) {
  'use strict';

  return {
    init: function(feedId) {
      this.feedEl = document.getElementById(feedId);

      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      window.URL = window.URL || window.webkitURL;

      if (!navigator.getUserMedia) {
        this._displayError('Sorry. <code>navigator.getUserMedia()</code> is not available.');
      }
      else {
        navigator.getUserMedia({video: true}, this.streamSuccess.bind(this), this.streamFailure.bind(this));
      }
    },
    streamSuccess: function(stream) {
      this.feedEl.src = (window.URL) ? window.URL.createObjectURL(stream) : stream;

      this.feedEl.onerror = function() {
        stream.stop();
      }

      stream.onended = this.streamFailure;
    },
    streamFailure: function(e) {
      var msg = (e.code === 1) ? 'User denied access to use camera' : 'No camera available';

      this._displayError(msg);
    },
    _displayError: function(msg) {
      $('.js-error-message').html(msg);
      $('.js-centered').removeClass('hide');
    }
  };
});
