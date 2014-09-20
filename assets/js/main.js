require([
  'jquery',
  'lib/cube',
  'lib/video'
], function($, cube, video) {
  'use strict';

  var feedId = 'video-feed',
      videoStillId = 'video-texture';

  video.init(feedId);
  cube.init(feedId, videoStillId);

});
