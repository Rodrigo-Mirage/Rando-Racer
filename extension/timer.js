'use strict';

class timerObj {
    constructor(nodecg){
        var timerReplicant = nodecg.Replicant('timer');
        var raceInfo = nodecg.Replicant("raceInfo");
        var timerReplicant2 = nodecg.Replicant('timeVal');
        var RunStatus = nodecg.Replicant('RunStatus');
        var timer = timerReplicant2.value || -30;
        var status = "waiting";

        var hr = 0;
        var min = 0;
        var sec = 0;

        RunStatus.on("change",(newval,oldval)=>{     
          if(!newval){
            RunStatus.value = {
              general: "waiting",
              runners: "waiting"
            }
          }else{
            status = newval.general;
          }
          verify()
        });

        nodecg.listenFor('timerStart', function (data, ack) {
            var old = RunStatus.value;
            old.general = "started";
            RunStatus.value = old;
        });
        nodecg.listenFor('timerPause', function (data, ack) {
            var old = RunStatus.value;
            old.general = "paused";
            RunStatus.value = old;
        });
        nodecg.listenFor('timerReset', function (force, ack) {
            var old = RunStatus.value;
            old.general = "reset";
            RunStatus.value = old;
        });
        nodecg.listenFor('timerStop', function (data, ack) {
          
        });
        nodecg.listenFor('setTimer', function (data, ack) {
            var old = RunStatus.value;
            old.general = "reset";
            old.runners = "waiting";
            RunStatus.value = old;
            timer = data.timer;
        });

        function loop(){
            if(status == "running"){
                timer++;
            }
            var modTimer = timer >= 0 ? timer : -timer;

            sec = parseInt(sec);
            min = parseInt(min);
            hr = parseInt(hr);

            sec = modTimer % 60;
            
            min = Math.floor(modTimer / 60) % 60;

            hr = Math.floor(Math.floor((modTimer / 60) / 60) /60);
        
            if (sec < 10 || sec == 0) {
              sec = '0' + sec;
            }
            if (min < 10 || min == 0) {
              min = '0' + min;
            }
            if (hr < 10 || hr == 0) {
              hr = '0' + hr;
            }

            var formattedTime = (timer < 0? "-":"") +hr + ':' + min + ':' + sec;
            timerReplicant.value = formattedTime;
            timerReplicant2.value = timer;
        }

        setInterval(()=>{loop()},1000);


        raceInfo.on("change",(newval,oldval)=>{  
          verify();
        });



        nodecg.listenFor('readyRacer', function (data, ack) {
          var id = data.id;
          var runners = raceInfo.value.runners;
          for ( var i = 0; i < runners.length; i++) {
              if(runners[i].id == id){
                raceInfo.value.runners[i].status = "ready";
              }
          }
        });

        nodecg.listenFor('unreadyRacer', function (data, ack) {
          var id = data.id;
          var runners = raceInfo.value.runners;
          for ( var i = 0; i < runners.length; i++) {
              if(runners[i].id == id){
                raceInfo.value.runners[i].status = "waiting";
              }
          }
        });

        nodecg.listenFor('doneRacer', function (data, ack) {
          var id = data.id;
          var runners = raceInfo.value.runners;
          for ( var i = 0; i < runners.length; i++) {
              if(runners[i].id == id){
                raceInfo.value.runners[i].status = "done";
              }
          }
        });

        nodecg.listenFor('ffRacer', function (data, ack) {
          var id = data.id;
          var runners = raceInfo.value.runners;
          for ( var i = 0; i < runners.length; i++) {
              if(runners[i].id == id){
                raceInfo.value.runners[i].status = "forfeit";
              }
          }
        });

        function verify(){
          var runners = raceInfo.value.runners;
          var race = [];
          var count = 0;
          var ready = 0;
          var done = 0;

          var old = RunStatus.value;
          if(old.general == "waiting" || old.general == "started"){
              for ( var i = 0; i < runners.length; i++) {
                if(runners[i].status == "ready"){
                  ready++;
                }
                count++;
            }
            if(count == ready){
              old.runners = "ready";
              RunStatus.value = old;
            }else{
              old.runners = "waiting";
              RunStatus.value = old;
            }

          }
          else{
            if(old.general == "running"){
              for ( var i = 0; i < runners.length; i++) {
                if(runners[i].status == "done" || runners[i].status == "forfeit"){
                  done++;
                }
                count++;
              }
              if(count == done){
                old.general = "done";
                old.runners = "done";
                RunStatus.value = old;
              }
            }
          }

          if(old.general == "started" && old.runners == "ready"){
            old.general = "running";
            RunStatus.value = old;
          }
          if(old.general == "reset"){
            for ( var i = 0; i < runners.length; i++) {
              raceInfo.value.runners[i].status = "waiting";
            }
            old.general = "waiting";
            RunStatus.value = old;
          }
        }
    }
}

module.exports = timerObj;