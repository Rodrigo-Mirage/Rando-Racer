var LayoutConfigs = nodecg.Replicant('layoutConfigs');
var raceInfo = nodecg.Replicant("raceInfo");
var videoPositions = nodecg.Replicant("videoPositions");
var soundFocus = nodecg.Replicant("soundFocus");

var videosConfig = {};
var videosList = [];
var playerList = [];
var videoPos = [];
var soundF = 0;

soundFocus.on("change", (newVal, oldVal) => {
    if(newVal!=null && oldVal!=null && newVal != oldVal ){
        soundF = newVal;
        setPositions();
    }else{
        soundF = newVal;
    }
});

function setFocus(i){
    soundFocus.value = i;
}

videoPositions.on("change", (newVal, oldVal) => {
    if(newVal){
        videoPos = newVal;
    }else{
        videoPos = [3,4];
        videoPositions.value = videoPos;
    }
});

raceInfo.on("change", (newVal, oldVal) => {
    playerList = newVal.runners;
});

setTimeout(
    function(){
    LayoutConfigs.on("change", (newVal, oldVal) => {
        if(newVal){
            videosConfig = newVal.videosConfig;
            videosList = newVal.videosList;

            const playersSelect = document.getElementById("playersSelect");
            var html = "";
            var options = "";
            for(var i = 0; i < playerList.length ; i++){
                options += "<option value='"+i+"'>"+playerList[i].name+"</option>";
            }
            for(var i = 0; i < videosList.length ; i++){
                html += "<div><label>Video Posição "+(i+1)+"</label><select id='videoPos"+i+"'>"+options+"</select><button onclick='setFocus(("+i+"))'>Focus </button></div>"
            }
            playersSelect.innerHTML = html;
            
            for(var i = 0; i < videosList.length ; i++){
                const videoSelect = document.getElementById("videoPos"+i);
                console.log(videoPos)
                if(videoPos[i]){
                    videoSelect.value = (videoPos[i]-1);
                }
            }
        }else{
            var obj = {
                videosConfig : {
                    height:450,
                    width:800
                },
                videosList:[
                    {   
                        x:0,
                        y:0
                    },
                    {   
                        x:1000,
                        y:0
                    }
                ]
            };
            LayoutConfigs.value = obj;
        }
    });
},2000);

function SetVideos(){
    nodecg.sendMessage('obs:sendMessage', { 'messageName':"GetSceneList" }, (data)=>{
        if (data.scenes.filter(e => e.name == 'Main').length == 0 ) {
            nodecg.sendMessage('obs:sendMessage', { 'messageName':'CreateScene','data': {
                'sceneName': "Main"
            }}, (reateData)=>{

                nodecg.sendMessage('obs:sendMessage', { 'messageName':'GetSceneItemList', 'data': { 'sceneName': 'Main' }} , (createData) => {
                    for (var i = 0;i < videosList.length ;i++) {
                        setUrl(createData.sceneItems, "Main", 'Player'+(i+1) , videosList[i].x, videosList[i].y,playerList[i])
                    }
                })
            });
        }else{
            nodecg.sendMessage('obs:sendMessage', { 'messageName':'GetSceneItemList', 'data': { 'sceneName': 'Main' }} , (createData) => {
                for (var i = 0;i < playerList.length ;i++) {
                    setUrl(createData.sceneItems, "Main", 'Player'+(i+1) , 0, 0, playerList[i])
                }
            })
        }

    });
}

function setUrl(list, scene, source, x, y, playerData) {
    var url = 'https://player.twitch.tv/?channel=' + (playerData.alt || playerData.stream) + '&enableExtensions=true&muted=false&parent=twitch.tv&player=popout&volume='+playerData.volume
    if (list.filter(e => e.sourceName == source).length > 0) {
        nodecg.sendMessage('obs:sendMessage', { 'messageName':'SetSceneItemProperties', 'data': {
            'sceneName': scene,
            'item': source,
            'bounds': {
                type: "OBS_BOUNDS_STRETCH",
                y:videosConfig.height,
                x:videosConfig.width
            },
            'position': {
                'x': x,
                'y': y
            },
            'crop':playerData.crop
        }}, (e) => {
            nodecg.sendMessage('obs:sendMessage', { 'messageName':'SetSourceSettings', 'data': {
                'sceneName': scene,
                'sourceName': source,
                'sourceSettings': {
                    'url':url,
                    "reroute_audio": true,
                    height:videosConfig.height,
                    width:videosConfig.width
                }
            }});
        });
    } else {
        var objData = {
            'sourceName': source,
            'sourceKind': "browser_source",
            'sceneName': "Main",
            'sourceSettings': {
                'url':url,
                "reroute_audio": true,
                height:videosConfig.height,
                width:videosConfig.width
            }
        };
        nodecg.sendMessage('obs:sendMessage', { 'messageName':'CreateSource', 'data': objData } , (e)=>{
            nodecg.sendMessage('obs:sendMessage', { 'messageName':'SetSceneItemProperties', 'data': {
                'sceneName': scene,
                'item': source,
                'bounds': {
                    type: "OBS_BOUNDS_STRETCH",
                    y:videosConfig.height,
                    x:videosConfig.width
                },
                'position': {
                    'x': x,
                    'y': y
                },
                'crop':playerData.crop
            }});
        });
    }

}

function setPositions(){
    var obj = [];
    for(var i = 0; i < videosList.length ; i++){
        const videoSelect = document.getElementById("videoPos"+i);
        obj.push(parseInt(videoSelect.value)+1);
    }
    videoPositions.value = obj;

    for(var i = 0; i < playerList.length ; i++){
        var x = 0;
        var y = 0;
        var visible = false;
        var vidPos = obj.findIndex((e)=> e == (i+1));
        var muted = true;

        if(vidPos > -1){
            x = videosList[vidPos].x;
            y = videosList[vidPos].y;
            visible = true;
        }
        if(soundF == vidPos){
            muted = false;
        }
        nodecg.sendMessage('obs:sendMessage', { 'messageName':'SetSceneItemProperties', 'data': {
            'sceneName': "Main",
            'item': "Player"+(i+1),
            'position': {
                'x': x,
                'y': y
            },
            'visible':visible
        }});
        nodecg.sendMessage('obs:sendMessage', { 'messageName':'SetMute', 'data': {
            'source': "Player"+(i+1),
            'mute': muted
        }});
    }
}