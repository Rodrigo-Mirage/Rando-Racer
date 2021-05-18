var speedcontrolBundle = "nodecg-speedcontrol";
var gameTitle = document.getElementById("gameTitle"); // game-title.html
var gameTitleDiv = document.getElementById("gameTitleDiv"); // game-title.html

var gameCategory = document.getElementById("gameCategory"); // game-category.html
var gameSystem = document.getElementById("gameSystem"); // game-system.html
var gameEstimate = document.getElementById("gameEstimate"); // game-estimate.html
var twitch = document.getElementById("twitch"); // twitch.html
var embedData = nodecg.Replicant("embedData");
var timerElem = document.getElementById("timer1");
var player = document.getElementById("player1"); // player.html

var timerElem2 = document.getElementById("timer2");
var player2 = document.getElementById("player2"); // player.html

var timerElem3 = document.getElementById("timer3");
var player3 = document.getElementById("player3"); // player.html

var timerElem4 = document.getElementById("timer4");
var player4 = document.getElementById("player4"); // player.html

var overlay = document.getElementById("overlay");

var runDataActiveRun = nodecg.Replicant("runDataActiveRun", speedcontrolBundle);

var elemPre = document.getElementById("premios");
var elemPat = document.getElementById("patro");

var ids = [];

var playerNumber = 0;

const video = document.getElementById("runnerName");

var options = {
  width: 854,
  height: 480,
  channel: "",
  parent: "localhost",
  autoplay: true,
  muted: false,
};

var GameS = "";

runDataActiveRun.on("change", (newVal, oldVal) => {
  if (newVal) updateSceneFields(newVal);
});

embedData.on("change", (newVal, oldVal) => {
  if (newVal) {
    var embed = document.getElementById("TPlayers");
    if (embed.innerHTML == "") {
      LoadVideos(newVal.players);
    } else {
      if (newVal.players.length != oldVal.players.length) {
        LoadVideos(newVal.players);
      } else {
        UpdateVideos(newVal.players, oldVal.players);
      }
    }
  }
});

var EmbedList = [];

function LoadVideos(players) {
  var embed = document.getElementById("TPlayers");
  var tags = "";

  for (var j = 0; j < players.length; j++) {
    tags += "<div id='TwitchPlayer" + j + "'></div>";
  }

  embed.innerHTML = tags;

  Position(players.length);

  EmbedList = [];
  for (var j = 0; j < players.length; j++) {
    var options2 = {
      width: options.width,
      height: options.height,
      channel: players[j].channel ? players[j].channel : "brat2",
      parent: "localhost",
      autoplay: true,
    };
    var TwitchPlayer = new Twitch.Player("TwitchPlayer" + j, options2);
    TwitchPlayer.setVolume(players[j].volume);
    EmbedList.push(TwitchPlayer);
  }
}

function Position(numero) {
  timerElem.innerHTML = "00:00:00"; // timer.html
  timerElem2.innerHTML = "00:00:00";
  timerElem3.innerHTML = "00:00:00";
  timerElem4.innerHTML = "00:00:00";

  switch (numero) {
    case 1:
      var tp = document.getElementById("TwitchPlayer0");
      tp.style.position = "absolute";
      tp.style.top = "13px";
      tp.style.left = "492px";

      options = {
        width: 1417,
        height: 796,
        channel: "",
        parent: "localhost",
        autoplay: true,
        muted: false,
      };

      break;
    case 2:
      var tp = document.getElementById("TwitchPlayer0");
      tp.style.position = "absolute";
      tp.style.top = "13px";
      tp.style.left = "13px";

      var tp2 = document.getElementById("TwitchPlayer1");
      if (tp2 != null) {
        tp2.style.position = "absolute";
        tp2.style.top = "13px";
        tp2.style.left = "973px";
      }

      options = {
        width: 934,
        height: 525,
        channel: "",
        parent: "localhost",
        autoplay: true,
        muted: false,
      };

      break;

    case 3:
    case 4:
      var tp = document.getElementById("TwitchPlayer0");
      tp.style.position = "absolute";
      tp.style.top = "9px";
      tp.style.left = "10px";

      var tp2 = document.getElementById("TwitchPlayer1");
      if (tp2 != null) {
        tp2.style.position = "absolute";
        tp2.style.top = "9px";
        tp2.style.left = "1205px";
      }

      var tp3 = document.getElementById("TwitchPlayer2");
      if (tp3 != null) {
        tp3.style.position = "absolute";
        tp3.style.top = "593px";
        tp3.style.left = "10px";
      }

      var tp4 = document.getElementById("TwitchPlayer3");
      if (tp4 != null) {
        tp4.style.position = "absolute";
        tp4.style.top = "593px";
        tp4.style.left = "1205px";
      }

      options = {
        width: 704,
        height: 397,
        channel: "",
        parent: "localhost",
        autoplay: true,
        muted: false,
      };

      break;

    default:
  }

  timerElem.className = "timer1_layout" + numero;
  timerElem2.className = "timer2_layout" + numero;
  timerElem3.className = "timer3_layout" + numero;
  timerElem4.className = "timer4_layout" + numero;

  player.className = "player1_layout" + numero;
  player2.className = "player2_layout" + numero;
  player3.className = "player3_layout" + numero;
  player4.className = "player4_layout" + numero;

  elemPre.className = "premios_layout" + numero;
  elemPat.className = "sponsor_layout" + numero;
  gameEstimate.className = "estimate_layout" + numero;
  gameSystem.className = "system_layout" + numero;
  gameTitleDiv.className = "jogo_layout" + numero;
  gameCategory.className = "categoria_layout" + numero;

  overlay.style.backgroundImage =
    "url('../graphics/Images/Over" + numero + ".png')";
}

function UpdateVideos(players, old) {
  for (var j = 0; j < players.length; j++) {
    if (players[j].channel != old[j].channel) {
      EmbedList[j].setChannel(players[j].channel);
    }
    if (players[j].volume != old[j].volume) {
      EmbedList[j].setVolume(players[j].volume);
    }
    if (players[j].status != old[j].status) {
      if (players[j].status == "Play") {
        EmbedList[j].play();
      } else {
        EmbedList[j].pause();
      }
    }
    $(EmbedList[j]).click();
  }
}

function updateSceneFields(runData) {
  var team = runData.teams[playerNumber - 1];

  gameTitle.innerHTML = runData.game; // game-title.html
  gameCategory.innerHTML = runData.category; // game-category.html
  //gameSystem.className = runData.system;
  gameSystem.style.backgroundImage =
    "url('../graphics/Images/logos/" +
    runData.system.replace("/", "") +
    ".png')";

  gameEstimate.innerHTML = runData.estimate; // game-estimate.html

  player.innerHTML = "";
  player2.innerHTML = "";
  player3.innerHTML = "";
  player4.innerHTML = "";

  var count = 0;
  ids = [];
  for (var i = 0; i < runData.teams.length; i++) {
    ids.push(runData.teams[i].id);

    for (var j = 0; j < runData.teams[i].players.length; j++) {
      switch (count) {
        case 0:
          player.innerHTML = runData.teams[i].players[j].name;
          break;
        case 1:
          player2.innerHTML = runData.teams[i].players[j].name;
          break;
        case 2:
          player3.innerHTML = runData.teams[i].players[j].name;
          break;
        case 3:
          player4.innerHTML = runData.teams[i].players[j].name;
          break;
        default:
          player.innerHTML = team.players[0].name;
      }
      count++;
    }
  }
}

var timer = nodecg.Replicant("timer", speedcontrolBundle);
timer.on("change", (newVal, oldVal) => {
  if (newVal) updateTimer(newVal, oldVal);
});

function updateTimer(newVal, oldVal) {
  for (var j = 0; j < ids.length; j++) {
    switch (j) {
      case 0:
        timerElem.innerHTML = newVal.time; // timer.html
        break;
      case 1:
        timerElem2.innerHTML = newVal.time; // timer.html
        break;
      case 2:
        timerElem3.innerHTML = newVal.time; // timer.html
        break;
      case 3:
        timerElem4.innerHTML = newVal.time; // timer.html
        break;
    }
  }
  if (newVal.teamFinishTimes) {
    for (var j = 0; j < ids.length; j++) {
      if (newVal.teamFinishTimes[ids[j]]) {
        switch (j) {
          case 0:
            timerElem.innerHTML = newVal.teamFinishTimes[ids[j]].time; // timer.html
            break;
          case 1:
            timerElem2.innerHTML = newVal.teamFinishTimes[ids[j]].time; // timer.html
            break;
          case 2:
            timerElem3.innerHTML = newVal.teamFinishTimes[ids[j]].time; // timer.html
            break;
          case 3:
            timerElem4.innerHTML = newVal.teamFinishTimes[ids[j]].time; // timer.html
            break;
        }
      }
    }
  }
}

function slidePat(id) {
  var next = id + 1;

  var nexturl = "Images/Patro/Pat" + (next > 9 ? next : "0" + next) + ".jpg";

  if (!imageExists(nexturl)) {
    next = 0;
  }

  nexturl = "Images/Patro/Pat" + (next > 9 ? next : "0" + next) + ".jpg";

  elemPat.src = nexturl;

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

  elemPre.src = nexturl;

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
slidePre(0);
