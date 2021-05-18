


function test(){
    console.log("Start");
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
                for (var i = 0;i < videosList.length ;i++) {
                    setUrl(createData.sceneItems, "Main", 'Player'+(i+1) , videosList[i].x, videosList[i].y,playerList[i])
                }
            })
        }
    })
}

function setUrl(list, scene, source, x, y, playerData) {
    var url = 'https://player.twitch.tv/?channel=' + playerData.twitch + '&enableExtensions=true&muted=false&parent=twitch.tv&player=popout&volume='+playerData.volume
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