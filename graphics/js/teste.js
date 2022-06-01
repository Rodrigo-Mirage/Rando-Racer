

var player = videojs('vid1',window.location.host.indexOf('localhost')>-1?null:
{
    html5: {
      vhs: {
        withCredentials: true
      }
    }
});

var options ={
    src: "/m3u8/"+runner.channel,
    type: 'application/x-mpegURL'
};
player.src(options);