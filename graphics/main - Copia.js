var speedcontrolBundle = "nodecg-speedcontrol";
var runDataActiveRun = nodecg.Replicant("runDataActiveRun", speedcontrolBundle);
var optionsActiveData = nodecg.Replicant("optionsActiveData");
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



nodecg.readReplicant("optionsActiveData", "Brat", (opt) => {
  templateName = "#";
  opts = opt.crops;
  optLayout = opt.layout;
  couchText = opt.couch;

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

  switch (templateName) { 
    case "#fourByThree-One":
      videoHeight = 940;
      videoWidth = 1254;
      //ex = 160
      eY = 5;
      break;
    case "#sixteenByNine-One":
      videoHeight = 803;
      videoWidth = 1414;
      eY = 5;
      break;
    case "#fourByThree-Two":
      videoHeight = 713;
      videoWidth = 944;
      ex = 326;
      break;
    case"#sixteenByNine-Two":
      videoHeight = 940;
      videoWidth = 1254;
      ex = 730;
      break;
    case "#fourByThree-Four":
      videoHeight = 460;
      videoWidth = 614;
      ex = 204;
      ey = 0;
      break;
  }
});



setTimeout(() => {
  const App = {
          template: "#intermission",
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
              {src: "./images/sponsor/5.png"},
            ]
          }),
        };

        var layout = new Vue({
          vuetify: new Vuetify(),
          render: (h) => h(App),
      }).$mount("#app");

  var gameTitle = document.getElementById("gameTitle"); // game-title.html
  var next4runs = nodecg.Replicant('next4runs');
  var gameCategory = document.getElementById("gameCategory"); // game-category.html
  var gameSystem = document.getElementById("gameSystem"); // game-system.html
  var gameEstimate = document.getElementById("gameEstimate"); // game-estimate.html
  var gameCover = document.getElementById("interGame");
  var embedData = nodecg.Replicant("embedData");
  var timerElem = document.getElementById("timer1");
  var player = document.getElementById("player1"); // player.html

  var timerElem2 = document.getElementById("timer2");
  var player2 = document.getElementById("player2"); // player.html

  var timerElem3 = document.getElementById("timer3");
  var player3 = document.getElementById("player3"); // player.html

  var timerElem4 = document.getElementById("timer4");
  var player4 = document.getElementById("player4"); // player.html


  var elemPre = document.getElementById("premios");
  var elemPat = document.getElementById("patro");
  var couch = document.getElementById("couch");
  if(couch) couch.innerHTML = couchText;

  var ids = [];

  var playerNumber = 0;

  runDataActiveRun.on("change", (newVal, oldVal) => {
    if (newVal) updateSceneFields(newVal);
  });

  embedData.on("change", (newVal, oldVal) => {
    if (newVal != oldVal && !oldVal) {
      LoadVideos(newVal.players);
    } else { 
      UpdateVideos(newVal.players,oldVal.players)
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

      if (temp != templateName) {
        location.reload();
      }
      else {
        if (couch) couch.innerHTML = couchText;

        nodecg.readReplicant("embedData", "Brat", (opt) => {
          LoadVideos(opt.players);
        });
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
      };
      document.getElementById("containerPlayer" + (j + 1)).innerHTML = "";
      var TwitchPlayer = new Twitch.Player("containerPlayer" + (j+1), options2);
      TwitchPlayer.setVolume(players[j].volume);
      EmbedList.push(TwitchPlayer);
      resize(opts[j].prop,document.getElementById("containerPlayer" + (j+1)) ,optLayout)
    }
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
      resize(opts[j].prop,document.getElementById("containerPlayer" + (j+1)) ,optLayout)
    }
  }

  function updateSceneFields(runData) {
    var team = runData.teams[playerNumber - 1];

    if (gameTitle) gameTitle.innerHTML = runData.game; // game-title.html
    if (gameCategory) gameCategory.innerHTML = runData.category; // game-category.html
    //gameSystem.className = runData.system;
    if (gameSystem) gameSystem.style.backgroundImage =
      "url('../graphics/Images/logos/" +
      runData.system.replace("/", "") +
      ".png')";
    if (gameCover) gameCover.style.backgroundImage =
      "linear-gradient(90deg, rgba(55,71,79,1) 6%, rgba(55,71,79,0.1) 100%), url('../graphics/Images/intermission/" +
      runData.game.replace(":", "") +
      ".png')";

    if (gameEstimate) gameEstimate.innerHTML = runData.estimate; // game-estimate.html

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

  timer.on("change", (newVal, oldVal) => {
    if (newVal) updateTimer(newVal, oldVal);
  });

  function updateTimer(newVal, oldVal) {
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

    var nexturl = "Images/Patro/Pat" + (next > 9 ? next : "0" + next) + ".jpg";

    if (!imageExists(nexturl)) {
      next = 0;
    }

    nexturl = "Images/Patro/Pat" + (next > 9 ? next : "0" + next) + ".jpg";

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

  function resize(value, Div, lay) {
    var tocrop = 100 - value;
    
    var width = videoWidth;
    var height = videoHeight;

    width = height * 16 / 9;

    cropX = (tocrop / 100) * width;
    cropY = (tocrop / 100) * height;

    Div.firstChild.style.width = width + cropX + "px";
    Div.firstChild.style.height = height + cropY + "px";

    Div.style.overflow = "hidden";
    Div.style.width = width - ex;
    Div.style.height = height;

    Div.style.marginLeft = "-" + ( cropX + ex ) + "px";
    Div.style.marginBottom = "-" + ( cropY + eY )+ "px";


  }

  //slidePat(0);
  //slidePre(0);
  
}, 2000);
