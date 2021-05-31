'use strict';

class timerObj {
    constructor(nodecg){
        var timerReplicant = nodecg.Replicant('timer');
        var timerReplicant2 = nodecg.Replicant('timeVal');
        var RunStatus = nodecg.Replicant('RunStatus');
        var timer = timerReplicant2.value || -30;
        var status = "waiting";

        RunStatus.on("change",(newval,oldval)=>{     
          if(!newval){
            RunStatus.value = {
              general: "waiting",
              runners: "waiting"
            }
          }else{
            status = newval.general;
          }
          console.log(newval)
          run()
        });

        nodecg.listenFor('timerStart', function (data, ack) {
            var old = RunStatus.value;
            old.general = "started";
            RunStatus.value = old;
            run()
        });
        nodecg.listenFor('timerPause', function (data, ack) {
            var old = RunStatus.value;
            old.general = "paused";
            RunStatus.value = old;
            run()
        });
        nodecg.listenFor('timerReset', function (force, ack) {
            var old = RunStatus.value;
            old.general = "reset";
            old.runners = "waiting";
            RunStatus.value = old;
            run()
        });
        nodecg.listenFor('timerStop', function (data, ack) {
          
        });
        nodecg.listenFor('setTimer', function (data, ack) {
            var old = RunStatus.value;
            old.general = "waiting";
            old.runners = "waiting";
            RunStatus.value = old;
            timer = data.timer;
        });

        var hr = 0;
        var min = 0;
        var sec = 0;

        function loop(){
            if(status == "running"){
                timer++;
            }
            if(status == "reset"){
                timer = 0;
                hr = 0;
                min = 0;
                sec = 0;
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



        var raceInfo = nodecg.Replicant("raceInfo");

        nodecg.listenFor('readyRacer', function (data, ack) {
          var id = data.id;
          var runners = raceInfo.value.runners;
          var race = [];
          var count = 0;
          var ready = 0;
          for ( var i = 0; i < runners.length; i++) {
              var raceitem = {
                name:runners[i].name,
                id:runners[i].id,
                stream:runners[i].stream,
                alt:runners[i].alt,
                crop:runners[i].crop,
                status:runners[i].status,
                url:runners[i].url,
                start:runners[i].start,
                finishTime:""
              }
              if(runners[i].id == id){
                raceitem.status = "ready";
                ready++;
              }
              if(runners[i].status == "ready"){
                ready++;
              }
              race.push(raceitem);
              count++;
          }
          raceInfo.value = {runners: race, type : raceInfo.value.type};
          if(count == ready){
            var old = RunStatus.value;
            old.runners = "ready";
            RunStatus.value = old;
          }else{
            var old = RunStatus.value;
            old.runners = "waiting";
            RunStatus.value = old;
          }
          run();
        });


        nodecg.listenFor('unreadyRacer', function (data, ack) {
          var id = data.id;
            var runners = raceInfo.value.runners;
          var race = [];
          for ( var i = 0; i < runners.length; i++) {
              var raceitem = {
                name:runners[i].name,
                id:runners[i].id,
                stream:runners[i].stream,
                alt:runners[i].alt,
                crop:runners[i].crop,
                status:runners[i].status,
                url:runners[i].url,
                start:runners[i].start,
                finishTime:""
              } 
              if(runners[i].id == id){
                raceitem.status = "waiting";
              }
              race.push(raceitem);
          }
          raceInfo.value = {runners: race, type : raceInfo.value.type};
          run()
        });

        nodecg.listenFor('doneRacer', function (data, ack) {
          var id = data.id;
          var runners = raceInfo.value.runners;
          var race = [];
          var count = 0;
          var done = 0;
          for ( var i = 0; i < runners.length; i++) {
              var raceitem = {
                name:runners[i].name,
                id:runners[i].id,
                stream:runners[i].stream,
                alt:runners[i].alt,
                crop:runners[i].crop,
                status:runners[i].status,
                url:runners[i].url,
                start:runners[i].start,
                finishTime:runners[i].finishTime
              }
              if(runners[i].id == id){
                raceitem.status = "done";
                raceitem.finishTime = timerReplicant.value;
                done++;
              }
              if(runners[i].status == "done" || runners[i].status == "forfeit"){
                done++;
              }
              race.push(raceitem);
              count++;
          }
          raceInfo.value = {runners: race, type : raceInfo.value.type};
          if(count == done){
            var old = RunStatus.value;
            old.general = "done";
            old.runners = "done";
            RunStatus.value = old;
          }
        });

        nodecg.listenFor('ffRacer', function (data, ack) {
          var id = data.id;
          var runners = raceInfo.value.runners;
          var race = [];
          var count = 0;
          var done = 0;
          for ( var i = 0; i < runners.length; i++) {
              var raceitem = {
                name:runners[i].name,
                id:runners[i].id,
                stream:runners[i].stream,
                alt:runners[i].alt,
                crop:runners[i].crop,
                status:runners[i].status,
                url:runners[i].url,
                start:runners[i].start,
                finishTime:runners[i].finishTime
              }
              if(runners[i].id == id){
                raceitem.status = "forfeit";
                raceitem.finishTime = timerReplicant.value;
                done++;
              }
              if(runners[i].status == "done" || runners[i].status == "forfeit"){
                done++;
              }
              race.push(raceitem);
              count++;
          }
          raceInfo.value = {runners: race, type : raceInfo.value.type};
          if(count == done){
            var old = RunStatus.value;
            old.general = "done";
            old.runners = "done";
            RunStatus.value = old;
          }
        });


        function run(){
          if(RunStatus.value.general == "started" && RunStatus.value.runners == "ready"){
            console.log("Race starting")
            var old = RunStatus.value;
            old.general = "running";
            RunStatus.value = old;
          }
        }
    }
}

module.exports = timerObj;