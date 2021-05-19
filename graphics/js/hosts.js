
var hostName = nodecg.Replicant("hostName");
var raceInfo = nodecg.Replicant("raceInfo"); 
var randoTracker = nodecg.Replicant("randoTracker"); 


var hostNameDiv = document.getElementById("HostName");
var runnersInfoDiv = document.getElementById("runnersInfo");




hostName.on("change", (newVal, oldVal) => {
    hostNameDiv.value = newVal;
});

function HostUpdate() { 
    hostName.value = hostNameDiv.value;
}


raceInfo.on("change", (newVal, oldVal) => {
    var html = "";
    for(var i=0;i < newVal.runners.length;i++){
        var info = newVal.runners[i];
        html += `${info.name}<div id="randoTracker${i+1}"></div>`;
    }
    runnersInfoDiv.innerHTML = html;
});



setTimeout(() => {
randoTracker.on("change", (newVal, oldVal) => {

    //OOT

    //height: 180px;
    //width: 618px;

    var medalwidth = "36px";
    var medalheight = "30px;";
    var itemwidth = "30px";
    var itemheight = "30px;";
    var divheight = "50px";


    var prizemarginT = "30px";
    var prizemargin = "5px";
    var prizewidth = "50px";
    var prizeheight = "20px";


    for (i = 0; i < newVal.runnerInfo.length; i++) {
      var randoTrackerDiv = document.getElementById("randoTracker" + (i + 1));
      if (randoTrackerDiv) {
        randoTrackerDiv.style.height = divheight;
        var tracker = "<div style = 'margin-top:5px;margin-left:12px;color:rgb(152,224,95) !important'>";
        newVal.runnerInfo[i].itens.forEach(element => {
            var imgName = element.name;
            if (element.have == 0) {
              imgName += "_fade";
            } else {
              if (element.have != element.max || (element.have == element.max && element.max != 1) ) {
                  imgName += "_" + element.have;
              }
            }
          if (element.type == "break") {
           // tracker += "</div><div style = 'margin-left:12px;color:rgb(152,224,95) !important'>";

          } else {
              switch (element.type) {
                //OOT
                case "jewel":
                    tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + medalwidth + ";height :" + medalheight + "' onclick=\"addItem('" + element.name + "','"+newVal.layout+"',"+i+")\"></div>";
                break;
                case "medal":
                    tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + itemwidth + ";height :" + itemheight + "' onclick=\"addItem('" + element.name + "','"+newVal.layout+"',"+i+")\"></div>";
                break;
                case "location":
                    tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain;background-position: center; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + itemwidth + ";height :" + itemheight + "' onclick=\"addItem('" + element.name + "','"+newVal.layout+"',"+i+")\"></div>";
                break;
                case "item":
                case "music":
                case "transf_mask":
                case "boss_mask":
                    tracker += "<div style='display:inline-block;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + itemwidth + ";height :" + itemheight + "' onclick=\"addItem('" + element.name + "','"+newVal.layout+"',"+i+")\"></div>";
                    break;
                case "space":
                    tracker += "<div style='display:inline-block;background-repeat: no-repeat;background-size: contain; width:" + itemwidth + ";height :" + itemheight + "' ></div>";
                  break;
              }
          }
        });
        tracker += "</div>";
        randoTrackerDiv.innerHTML = tracker;
      }

    }
    
  });
}, 2000);