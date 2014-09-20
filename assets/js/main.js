require([
  'jquery',
  'lib/cube',
  'lib/video'
], function($, cube, video) {
  'use strict';

  var feedId = 'video-feed',
      stillId = 'video-still';

  video.init(feedId);
  cube.init(feedId, stillId);
});
