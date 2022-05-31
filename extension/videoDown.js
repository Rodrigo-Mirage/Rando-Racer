const { verify } = require("crypto");
const twitch = require("twitch-m3u8");

'use strict';

class Videos {

    constructor(nodecg){
        var videosInfo = nodecg.Replicant("videosInfoCurrent");
        var raceInfo = nodecg.Replicant("raceInfoCurrent");

        raceInfo.on("change", (newVal, oldVal) => {
            if(!oldVal || newVal != oldVal)
            {   
                clear()
                getstreams(newVal)
            }
        });

        nodecg.listenFor('reloadVideos', function (data, ack) {
            getstreams(raceInfo.value);
        });

        nodecg.listenFor('playPlayer', function (data, ack) {
            if (videosInfo.value.filter(e => e.id === data.id).length > 0) {
                var player = videosInfo.value.filter(e => e.id === data.id)[0];
                player.status = "play";
            }
        });

        nodecg.listenFor('pausePlayer', function (data, ack) {
            if (videosInfo.value.filter(e => e.id === data.id).length > 0) {
                var player = videosInfo.value.filter(e => e.id === data.id)[0];
                player.status = "pause";
            }
        });

        nodecg.listenFor('FocusPlayer', function (data, ack) {
            videosInfo.value.forEach(runner=>{
                if(runner.id != data.id){
                    runner.volume = 0;
                }else{
                    runner.volume = 1;
                }
            });
        });

        function clear(){
            videosInfo.value=[];
        }
        
        function getstreams(data) {
            if(data){
                data.runners.forEach(runner => {
                    var channel = runner.alt||runner.stream;
                    var crop = {
                        top: runner.crop.top,
                        bottom: runner.crop.bottom,
                        left: runner.crop.left,
                        right: runner.crop.right,
                    }
                    var obj = {
                        id:runner.id,
                        name:runner.name,
                        game:runner.game,
                        channel:channel,
                        status:"play",
                        volume:0,
                        crops:crop,
                        qualities:[]
                    };
                    var first = true;
                    twitch.getStream(channel)
                        .then(urls => {
                            var qualities  =[];
                            urls.forEach(url => {
                                if(url.quality.indexOf("p")!= -1){
                                    qualities.push({
                                        name:url.quality.replace("(source)","(S)"),
                                        url:url.url,
                                        set:first
                                    });
                                    first = false;
                                }
                            });
                            obj.qualities=qualities;
                        })
                        .catch(err =>{
                            nodecg.log.info(channel + ": Offline")
                        }).finally(()=>{
                            verify(obj)
                        })
                });
            }
        }
        
        function verify(data){
            if(videosInfo.value){
                if (videosInfo.value.filter(e => e.id === data.id).length > 0) {
                    var index = videosInfo.value.filter(e => e.id === data.id)[0];
                    if(index.length != data.qualities.length){
                        index = data;
                    }
                }
                else{
                    videosInfo.value.push(data);
                }
            }
            else{
                videosInfo.value=[data];
            }
        };
 
    }
       
}


module.exports = Videos;