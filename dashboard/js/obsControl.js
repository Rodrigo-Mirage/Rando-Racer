var LayoutConfigs = nodecg.Replicant('layoutConfigs');
var raceInfo = nodecg.Replicant("raceInfoCurrent");
var videoPositions = nodecg.Replicant("videoPositions");
var soundFocus = nodecg.Replicant("soundFocus");

var videosConfig = {};
var videosList = [];
var playerList = [];
var videoPos = [];
var soundF = 0;
var type = "";

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
        selectores();
    }else{
        videoPos = [3,4];
        videoPositions.value = videoPos;
    }
});

raceInfo.on("change", (newVal, oldVal) => {
    if(newVal){
        playerList = newVal.runners;
        type = newVal.type;
    }
});

setTimeout(
    function(){
    LayoutConfigs.on("change", (newVal, oldVal) => {
        if(newVal){
            videosConfig = newVal.videosConfig;
            videosList = newVal.videosList;
            selectores();
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

function selectores(){
    const playersSelect = document.getElementById("playersSelect");
    var html = "";
    var options = "";
    for(var i = 0; i < playerList.length ; i++){
        options += "<option value='"+i+"'>"+playerList[i].name+"</option>";
    }
    for(var i = 0; i < videosList.length ; i++){
        html += "<div><label>Video Posição "+(i+1)+"</label><select id='videoPos"+i+"'>"+options+"</select>"+(soundF!=i?"<button onclick='setFocus(("+i+"))'>Focus </button>":"")+"</div>"
    }
    playersSelect.innerHTML = html;
    
    for(var i = 0; i < videosList.length ; i++){
        const videoSelect = document.getElementById("videoPos"+i);
        if(videoPos[i]){
            videoSelect.value = (videoPos[i]-1);
        }
    }

}

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

        setPositions();
    });
}

function setUrl(list, scene, source, x, y, playerData) {

    var url = 'https://player.twitch.tv/?channel=' + (playerData.alt || playerData.stream) + '&enableExtensions=true&muted=false&parent=twitch.tv&player=popout&volume='+playerData.volume
    if(type == "async"){
        url = window.location.origin+"/bundles/Rando-Racer/graphics/player.html?pl="+ playerData.id;
    }
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
            'sceneName': scene,
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

function inicialSetup(){

    var urlBase = window.location.origin+"/bundles/Rando-Racer/graphics/index.html";
    var urlOver = window.location.origin+"/bundles/Rando-Racer/graphics/overlay.html";

    CreateScene("Main").then(()=>{
        CreateBrowser("Main","Fundo",urlBase,0,0,1080,1920).then(()=>{
            CreateBrowser("Main","Overlay",urlOver,0,0,1080,1920).then(()=>{
                CreateScene("End").then(()=>{
                    CreateScene("Soon").then(()=>{
                        
                    });
                });
            });
        });
    });

}

function CreateScene(SceneName){
    var ret = new Promise((resolve,reject)=>{
        nodecg.sendMessage('obs:sendMessage', { 'messageName':"GetSceneList" }, (data)=>{
            if (data.scenes.filter(e => e.name == SceneName).length == 0 ) {
                nodecg.sendMessage('obs:sendMessage', { 'messageName':'CreateScene','data': {
                    'sceneName': SceneName
                }}, (createData)=>{
                    resolve(true)
                });
            }else{
                resolve(true)
            }
        });
    });
    return ret;
}

function CreateMirror(Scene,Scene2){
    var ret = new Promise((resolve,reject)=>{
        nodecg.sendMessage('obs:sendMessage', { 'messageName':'GetSceneItemList', 'data': { 'sceneName': Scene }} , (Data) => {
            if (Data.sceneItems.filter(e => e.sourceName == Scene2).length > 0) {
                resolve()
            }else{
                var objData = {
                    'sourceName': Scene2,
                    'sourceKind': "scene",
                    'sceneName': Scene
                };
                nodecg.sendMessage('obs:sendMessage', { 'messageName':'CreateSource', 'data': objData } , (e)=>{
                    resolve();
                });
            }
        })
    });
    return ret;
}

function CreateBrowser(Scene,name,url,x,y,height,width){
    var ret = new Promise((resolve,reject)=>{
        nodecg.sendMessage('obs:sendMessage', { 'messageName':'GetSceneItemList', 'data': { 'sceneName': Scene }} , (Data) => {
            if (Data.sceneItems.filter(e => e.sourceName == name).length > 0) {
                resolve()
            }else{
                var objData = {
                    'sourceName': name,
                    'sourceKind': "browser_source",
                    'sceneName': Scene,
                    'sourceSettings': {
                        'url':url,
                        "reroute_audio": true,
                        height:height,
                        width:width
                    }
                };
                nodecg.sendMessage('obs:sendMessage', { 'messageName':'CreateSource', 'data': objData } , (e)=>{
                    nodecg.sendMessage('obs:sendMessage', { 'messageName':'SetSceneItemProperties', 'data': {
                        'sceneName': Scene,
                        'item': name,
                        'bounds': {
                            type: "OBS_BOUNDS_STRETCH",
                            y:height,
                            x:width
                        },
                        'position': {
                            'x': x,
                            'y': y
                        }
                    }},()=>{resolve()});
                });


            }
        })
    });
    return ret;
}

//      Scenecontrol

function loadScenes(){
    var html = "";

    nodecg.sendMessage('obs:sendMessage', { 'messageName':"GetSceneList" }, (data)=>{
        for(var i=0; i < data.scenes.length ; i++){
            html += `<button onclick="changeScene('${data.scenes[i].name}')">${data.scenes[i].name}</button>`;
        }
        const Scenecontrol = document.getElementById("Scenecontrol");
        Scenecontrol.innerHTML = html;
    });

}
function changeScene(SceneName){
    nodecg.sendMessage('obs:previewScene', SceneName).then(() => {
        nodecg.sendMessage('obs:transition', 'Fade').then(() => {
            }).catch(err => {
        });
    }).catch(err => {
    });
}

