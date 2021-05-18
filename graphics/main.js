var speedcontrolBundle = "nodecg-speedcontrol";
var runDataActiveRun = nodecg.Replicant("runDataActiveRun", speedcontrolBundle);
var optionsActiveData = nodecg.Replicant("optionsActiveData");
var hostName = nodecg.Replicant("hostName");
var timer = nodecg.Replicant("timer", speedcontrolBundle);


var opts = [];
var templateName = "";
var optLayout = "16";
var ex = 0;
var eY = 0;
var  options = {
  width: 1414,
  height: 803,
  channel: "",
  parent: "localhost",
  autoplay: true,
  muted: false,
};
var couchText = "";

var videoHeight = 803;
var videoWidth = 1414;
var camHeight = 258;
var camWidth = 458;
var hascam = false;
var campProp = 100;

var randomLayout = null;
var randoTracker = nodecg.Replicant("randoTracker");


nodecg.readReplicant("optionsActiveData", "Brat", (opt) => {
  //templateName = "#";
  opts = opt.crops;
  optLayout = opt.layout;
  couchText = opt.couch;
  campProp = opt.camProp;

  if (opt.layout == '4') {
    templateName += "fourByThree-";
  }else{
    templateName += "sixteenByNine-";
  }
  switch (opt.crops.length) { 
    case 1:
    templateName += "One";
      break;
    case 2:
    templateName += "Two";
      break;
    case 4:
    templateName += "Four";
      break;
    default:
  }
  if (opt.cam) { 
    templateName += "-Cam";
  }
  if (opt.rando) {
    templateName += "-Rando-" + opt.rando;
    randomLayout = opt.rando;
  }
  switch (templateName) { 
    case "fourByThree-One":
      videoHeight = 928;
      videoWidth = 1233;
      ex = 420;
      eY = 5;
      break;
    case "sixteenByNine-One":
      videoHeight = 820;
      videoWidth = 1455;
      eY = 5;
      break;
    case "sixteenByNine-One-Cam":
      videoHeight = 820;
      videoWidth = 1455;
      camHeight = 225;
      camWidth = 400;
      hascam = true;
      eY = 5;
      break;
    case "fourByThree-Two":
      videoHeight = 713;
      videoWidth = 944;
      ex = 326;
      break;
    case"sixteenByNine-Two":
      videoHeight = 523;
      videoWidth = 929;
      ex = 5;
      break;
    case "fourByThree-Four":
      videoHeight = 460;
      videoWidth = 614;
      ex = 204;
      ey = 0;
      break;
    case "fourByThree-One-Cam-Rando-OOT":
      videoHeight = 928;
      videoWidth = 1233;
      camHeight = 225;
      camWidth = 400;
      ex = 420;
      eY = 5;
      hascam = true;
      break;
    
    case "fourByThree-Two-Rando-MMR":
      videoHeight = 615;
      videoWidth = 820;
      ex = 326;
      break;
    case "fourByThree-One-Rando-SMZ3":
      videoHeight = 928;
      videoWidth = 1233;
      ex = 420;
      break;
    case "fourByThree-One-Cam-Rando-Convidado":
      videoHeight = 928;
      videoWidth = 1233;
      camHeight = 225;
      camWidth = 400;
      ex = 420;
      eY = 5;
      hascam = true;
      break;
  }

  var canvas = document.getElementById("canvas");
  canvas.className = templateName;

});



setTimeout(() => {
  const App = {
      template: templateName,
      data: () => ({
        timer1: "00:00:00",
        timer2: "00:00:00",
        timer3: "00:00:00",
        timer4: "00:00:00",
        donations: "000.000,00",
        player1: "player 1",
        player2: "player 2",
        player3: "player 3",
        player4: "player 4",
        couch: "hey hey, hey hey, hey hey",
        game: "STORY OF SEASONS Friends of Mineral Town",
        cat: "Crash Bandicoot 2: Cortex Strikes Back - Any%",
        plat: "n64",
        est: "00:00:00",
        camera: false,
        bar: [
          {title: "Title",subtitle: "Subtitle", inc: false, val1: "10", val2: "20"},
          {title: "Title",subtitle: "Subtitle", inc: true, val1: "10", val2: "20"},
          {title: "Title",subtitle: "Subtitle", inc: true, val1: "10", val2: "20"},
          {title: "Title",subtitle: "Subtitle", inc: true, val1: "10", val2: "20"}
        ],
        sponsors: [
          {src: "./images/sponsor/1.png"},
          {src: "./images/sponsor/2.png"},
          {src: "./images/sponsor/3.png"},
          {src: "./images/sponsor/4.png"},
        ]
      }),
    };


  var gameTitle = document.getElementById("gameTitle"); // game-title.html

  var gameCategory = document.getElementById("gameCategory"); // game-category.html
  var gameSystem = document.getElementById("gameSystem"); // game-system.html
  var gameEstimate = document.getElementById("gameEstimate"); // game-estimate.html
  var embedData = nodecg.Replicant("embedData");
  var maintimer = document.getElementById("gameTimer");
  var timerElem = document.getElementById("timer1");
  var player = document.getElementById("player1"); // player.html

  var timerElem2 = document.getElementById("timer2");
  var player2 = document.getElementById("player2"); // player.html

  var timerElem3 = document.getElementById("timer3");
  var player3 = document.getElementById("player3"); // player.html

  var timerElem4 = document.getElementById("timer4");
  var player4 = document.getElementById("player4"); // player.html


  var elemPre = document.getElementById("premios");
  var elemPat = document.getElementById("sponsor");
  var couch = document.getElementById("couch");

  var gameHost = document.getElementById("gameHost"); // game-estimate.html
    hostName.on("change", (newVal, oldVal) => {
    if (newVal) {
        gameHost.innerHTML = newVal;
    }
  });



  if(couch) couch.innerHTML = couchText;

  var ids = [];

  var playerNumber = 0;

  runDataActiveRun.on("change", (newVal, oldVal) => {
    if (newVal != oldVal && !oldVal)  updateSceneFields(newVal);
  });

  embedData.on("change", (newVal, oldVal) => {
    if (newVal != oldVal && !oldVal) {
      LoadVideos(newVal.players);
    } else { 
      if (newVal != oldVal) {
        UpdateVideos(newVal.players, oldVal.players)
      }
    }
  });


  optionsActiveData.on("change", (newVal, oldVal) => {
    if (newVal != oldVal && oldVal) {
      temp = "#";
      opts = newVal.crops;
      optLayout = newVal.layout;
      couchText = newVal.couch;

      if (newVal.layout == '4') {
        temp += "fourByThree-";
      } else {
        temp += "sixteenByNine-";
      }
      switch (newVal.crops.length) {
        case 1:
          temp += "One";
          break;
        case 2:
          temp += "Two";
          break;
        case 4:
          temp += "Four";
          break;
        default:
      }

      if (newVal.rando) {
        temp += "-Rando-"+newVal.rando;
      }
      
      var canvas = document.getElementById("canvas");
      canvas.className = temp;

      if (temp != templateName) {
        location.reload();
      }
      else {
        if (couch) couch.innerHTML = couchText;
      }
    }
  });


  var EmbedList = [];

  function LoadVideos(players) {
    EmbedList = [];
    for (var j = 0; j < players.length; j++) {
      var options2 = {
        width: options.width,
        height: options.height,
        channel: players[j].channel ? players[j].channel : "brat2",
        parent: "localhost",
        autoplay: true,
        muted: false
      };
      
      var div = document.getElementById("containerPlayer" + (j + 1)+"Div");
      div.innerHTML = "";

      if (div) { 
        var TwitchPlayer = new Twitch.Player("containerPlayer" + (j + 1)+"Div", options2);

        EmbedList.push(TwitchPlayer);
        resize(opts[j].prop, div, false);
        TwitchPlayer.setVolume(parseFloat(players[j].volume));

        if (hascam) { 
          options2 = {
            width: camWidth,
            height: camHeight,
            channel: players[j].channel ? players[j].channel : "brat2",
            parent: "localhost",
            autoplay: true,
            muted: true
          };
          document.getElementById("runnerCam" + (j + 1)+"Div").innerHTML = "";
          var TwitchPlayerCam = new Twitch.Player("runnerCam" + (j + 1)+"Div", options2);
          TwitchPlayerCam.setVolume(0);
          resize(campProp, document.getElementById("runnerCam" + (j + 1)+"Div"), true);

          if (templateName == "fourByThree-One-Cam-Rando-Convidado") {
            
            options2 = {
              width: camWidth,
              height: camHeight,
              channel: players[j].channel ? players[j].channel : "brat2",
              parent: "localhost",
              autoplay: true,
              muted: true
            };
            document.getElementById("runnerCam2Div").innerHTML = "";
            var TwitchPlayerCam = new Twitch.Player("runnerCam2Div", options2);
            TwitchPlayerCam.setVolume(0);
            resize(campProp, document.getElementById("runnerCam2Div"), true);

          }
        }
      }
    }
  }

  function UpdateVideos(players, old) {
    for (var j = 0; j < players.length; j++) {
      if (players[j].channel != old[j].channel) {
        EmbedList[j].setChannel(players[j].channel);
      }
      if (players[j].volume != old[j].volume) {
        EmbedList[j].setVolume(parseFloat(players[j].volume));
      }
      if (players[j].status != old[j].status) {
        if (players[j].status == "Play") {
          EmbedList[j].play();
        } else {
          EmbedList[j].pause();
        }
      }
      resize(opts[j].prop, document.getElementById("containerPlayer" + (j + 1)), false);
    }
  }

  function updateSceneFields(runData) {
    var team = runData.teams[playerNumber - 1];

    if (gameTitle) gameTitle.innerHTML = runData.game; // game-title.html
    if (gameCategory) gameCategory.innerHTML = runData.category; // game-category.html
    if (gameSystem) gameSystem.innerHTML = runData.system; // game-system.html
    if (gameEstimate) gameEstimate.innerHTML = runData.estimate; // game-estimate.html

    if (player) player.innerHTML = "";
    if (player2) player2.innerHTML = "";
    if (player3) player3.innerHTML = "";
    if (player4) player4.innerHTML = "";


    
    
    if (templateName == "fourByThree-One-Cam-Rando-OOT") {
      
      if (gameTitle) gameTitle.innerHTML = "The Legend of Zelda: O Carrinho of Time"; // game-title.html
      if (gameCategory) gameCategory.innerHTML = "CNH% Turbo - Rando"; // game-category.html
      if (gameSystem) gameSystem.innerHTML = "Simulador do CFC"; // game-system.html
      if (gameEstimate) gameEstimate.innerHTML = runData.estimate; // game-estimate.html

      var playerDiv = document.getElementById("player1Div"); // player.html
      playerDiv.innerHTML = `Piloto:<span id="player1"></span>`;
      player = document.getElementById("player1"); // player.html
    }


    var count = 0;
    ids = [];
    for (var i = 0; i < runData.teams.length; i++) {
      ids.push(runData.teams[i].id);

      for (var j = 0; j < runData.teams[i].players.length; j++) {
        switch (count) {
          case 0:
            if (player) player.innerHTML = runData.teams[i].players[j].name;
            break;
          case 1:
            if (player2) player2.innerHTML = runData.teams[i].players[j].name;
            break;
          case 2:
            if (player3) player3.innerHTML = runData.teams[i].players[j].name;
            break;
          case 3:
            if (player4) player4.innerHTML = runData.teams[i].players[j].name;
            break;
          default:
            if (player) player.innerHTML = team.players[0].name;
        }
        count++;
      }
    }



  }

  timer.on("change", (newVal, oldVal) => {
    if (newVal) updateTimer(newVal, oldVal);
  });

  function updateTimer(newVal, oldVal) {
    maintimer.innerHTML = newVal.time;
    for (var j = 0; j < ids.length; j++) {
      switch (j) {
        case 0:
          if (timerElem) timerElem.innerHTML = newVal.time; // timer.html
          break;
        case 1:
          if (timerElem2) timerElem2.innerHTML = newVal.time; // timer.html
          break;
        case 2:
          if (timerElem3) timerElem3.innerHTML = newVal.time; // timer.html
          break;
        case 3:
          if (timerElem4) timerElem4.innerHTML = newVal.time; // timer.html
          break;
      }
    }
    if (newVal.teamFinishTimes) {
      for (var j = 0; j < ids.length; j++) {
        if (newVal.teamFinishTimes[ids[j]]) {
          switch (j) {
            case 0:
              if (timerElem) timerElem.innerHTML = newVal.teamFinishTimes[ids[j]].time; // timer.html
              break;
            case 1:
              if (timerElem2) timerElem2.innerHTML = newVal.teamFinishTimes[ids[j]].time; // timer.html
              break;
            case 2:
              if (timerElem3) timerElem3.innerHTML = newVal.teamFinishTimes[ids[j]].time; // timer.html
              break;
            case 3:
              if (timerElem4) timerElem4.innerHTML = newVal.teamFinishTimes[ids[j]].time; // timer.html
              break;
          }
        }
      }
    }
  }

  function slidePat(id) {
    var next = id + 1;

    var nexturl = "Images/sponsor/" + (next > 9 ? next : "0" + next) + ".png";

    if (!imageExists(nexturl)) {
      next = 0;
    }

    nexturl = "Images/sponsor/" + (next > 9 ? next : "0" + next) + ".png";

    if(elemPat) elemPat.src = nexturl;

    setTimeout(function () {
      slidePat(next);
    }, 5000);
  }

  function slidePre(id) {
    var next = id + 1;

    var nexturl = "Images/Premios/Pre" + (next > 9 ? next : "0" + next) + ".jpg";

    if (!imageExists(nexturl)) {
      next = 0;
    }

    nexturl = "Images/Premios/Pre" + (next > 9 ? next : "0" + next) + ".jpg";

    if(elemPre) elemPre.src = nexturl;

    setTimeout(function () {
      slidePre(next);
    }, 5000);
  }

  function imageExists(image_url) {
    var http = new XMLHttpRequest();

    http.open("HEAD", image_url, false);
    http.send();

    return http.status != 404;
  }

  function resize(value, Div, cam) {
    var tocrop = 100 - value;
    
    var width = cam ? camWidth : videoWidth;
    var height = cam ? camHeight : videoHeight;

    width = height * 16 / 9;

    cropX = (tocrop / 100) * width;
    cropY = (tocrop / 100) * height;

    if (cam) { 
      cropX = (tocrop / 43) * width;
      cropY = (tocrop / 43) * height;
    }

    if (Div) {
      Div.style.width = width - ex + "px";
      Div.style.height = height + "px";
      
      Div.style.overflow = "hidden";
    }

    if (cam) {
      if (Div) {
        Div.firstChild.style.marginTop = "-" + cropY  + "px";
      }
    } else{
      if (Div) {
        Div.firstChild.style.marginLeft = "-" + ((cropX) + ex) + "px";
        Div.firstChild.style.marginBottom = "-" + ( cropY)+ "px";
      }
    }
    if (Div) {
      Div.firstChild.style.width = width + cropX + "px";
      Div.firstChild.style.height = height + cropY + "px";
    }
  }

  slidePat(0);
  //slidePre(0);

  randoTracker.on("change", (newVal, oldVal) => {

    //OOT

    //height: 180px;
    //width: 618px;

    var medalwidth = "66px";
    var medalheight = "70px;";
    var itemwidth = "50px";
    var itemheight = "50px;";
    var divheight = "180px";


    var prizemarginT = "30px";
    var prizemargin = "5px";
    var prizewidth = "50px";
    var prizeheight = "20px";


    switch (newVal.layout) {
      case "MMR":
        itemwidth = "45px";
        itemheight = "45px;";
        divheight = "180px";
        break;

    }


    for (i = 0; i < newVal.itens.length; i++) {
      var randoTrackerDiv = document.getElementById("randoTracker" + (i + 1));
      if (randoTrackerDiv) {
        randoTrackerDiv.style.height = divheight;
        var tracker = "<div style = 'margin-top:5px;margin-left:12px;color:rgb(152,224,95) !important'>";
        newVal.itens[i].forEach(element => {
            var imgName = element.name;
            if (element.have == 0) {
              imgName += "_fade";
            } else {
              if (element.have != element.max || (element.have == element.max && element.max != 1) ) {
                  imgName += "_" + element.have;
              }
            }
          if (element.type == "break") {
            tracker += "</div><div style = 'margin-left:12px;color:rgb(152,224,95) !important'>";

          } else {
              switch (element.type) {
                //OOT
                case "jewel":
                    tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + medalwidth + ";height :" + medalheight + "' onclick=\"addItem('" + element.name + "','"+newVal.layout+"',"+i+")\"><div class='location' style='margin-top:45px' onclick=\"rotateLocation('" + element.name + "','" + element.location + "','"+newVal.layout+"',"+i+")\">" + element.location + "</div></div>";
                break;
                case "medal":
                    tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + itemwidth + ";height :" + itemheight + "' onclick=\"addItem('" + element.name + "','"+newVal.layout+"',"+i+")\"><div class='location' style='margin-top:35px' onclick=\"rotateLocation('" + element.name + "','" + element.location + "','"+newVal.layout+"',"+i+")\">" + element.location + "</div></div>";
                break;
                case "location":
                    tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain;background-position: center; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + itemwidth + ";height :" + itemheight + "' onclick=\"addItem('" + element.name + "','"+newVal.layout+"',"+i+")\"><div class='location' onclick=\"rotatePrize('" + element.name + "','" + element.prize + "','"+newVal.layout+"',"+i+")\" style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain;margin-top:"+prizemarginT+";margin-left:"+prizemargin+"; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + element.prize + ".png\"); width:" + prizewidth + ";height :" + prizeheight + "'></div></div>";
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
