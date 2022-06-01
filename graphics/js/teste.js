var player = videojs('vid1');

var options ={
    src: "/m3u8/egodev",
    type: 'application/x-mpegURL',
    withCredencial:true
};
player.src(options);