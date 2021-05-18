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


  var gameTitle = document.getElementById("gameTitle"); // game-title.html

  var gameCategory = document.getElementById("gameCategory"); // game-category.html
  var gameSystem = document.getElementById("gameSystem"); // game-system.html
    var gameEstimate = document.getElementById("gameEstimate"); // game-estimate.html
    
  var embedData = nodecg.Replicant("embedData");
  var timerElem = document.getElementById("timer1");
  var player = document.getElementById("player1"); // player.html

  var timerElem2 = document.getElementById("timer2");
  var player2 = document.getElementById("player2"); // player.html

  var timerElem3 = document.getElementById("timer3");
  var player3 = document.getElementById("player3"); // player.html

  var timerElem4 = document.getElementById("timer4");
  var player4 = document.getElementById("player4"); // player.html

  var video = document.getElementById("videoDiv"); // player.html

  var elemPre = document.getElementById("premios");
  var elemPat = document.getElementById("sponsor");
  var couch = document.getElementById("couch");
  if(couch) couch.innerHTML = couchText;

  var ids = [];

  var playerNumber = 0;

runDataActiveRun.on("change", (newVal, oldVal) => {
      console.log(newVal)
    if (newVal != oldVal )  updateSceneFields(newVal);
  });
    
    
    var gameHost = document.getElementById("gameHost"); // game-estimate.html
    hostName.on("change", (newVal, oldVal) => {
    if (newVal) {
        gameHost.innerHTML = newVal;
    }
    });


  function updateSceneFields(runData) {
    var team = runData.teams[playerNumber - 1];

    if (gameTitle) gameTitle.innerHTML = runData.game; // game-title.html
    if (gameCategory) gameCategory.innerHTML = runData.category; // game-category.html
    if (gameSystem) gameSystem.innerHTML = runData.system; // game-system.html
    if (gameEstimate) gameEstimate.innerHTML = runData.estimate; // game-estimate.html
    
   
    var source = document.createElement('source');

    source.setAttribute('src', "../graphics/Images/Intermission/"+ runData.game.replace(":","") + ".mp4");
      video.innerHTML = "";
    video.appendChild(source);

    setTimeout(function() {  
        video.pause();

        source.setAttribute('src', "../graphics/Images/Intermission/"+ runData.game.replace(":","") + ".mp4"); 

        video.load();
        video.play();
    }, 1000);

      
    if (player) player.innerHTML = "";
    if (player2) player2.innerHTML = "";
    if (player3) player3.innerHTML = "";
    if (player4) player4.innerHTML = "";

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

  slidePat(0);
  //slidePre(0);

  