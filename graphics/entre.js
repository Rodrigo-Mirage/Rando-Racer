	var speedcontrolBundle = 'nodecg-speedcontrol';
	var embedData = nodecg.Replicant('embedData');
	var runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
	
	
	embedData.on('change', (newVal, oldVal) => {
		if (newVal)
		{
			var embed = document.getElementById('TPlayers');
			if(embed.innerHTML == "" ){
				LoadVideos(newVal.players);
			}else{
				if(newVal.players.length != oldVal.players.length){
					LoadVideos(newVal.players);
				}
				else{
					UpdateVideos(newVal.players,oldVal.players);
				}
			}
		}
	});
	
	var EmbedList = [];
	
	function LoadVideos(players){
		var embed = document.getElementById('TPlayers');
		var tags = "";
		
		for(var j=0 ; j < players.length ; j++){
			tags += "<div id='TwitchPlayer"+j+"'></div>";	
		}
		
		embed.innerHTML = tags;
		
		var tp = document.getElementById('TwitchPlayer0');
				tp.style.position= "absolute";
				tp.style.top = "0px";
				tp.style.left = "0px";
				
				options = {
					width: 1920,
					height: 1080,
					channel: "bratentrevista"
				};
						
		
		EmbedList = [];
		for(var j=0 ; j < players.length ; j++){
			var TwitchPlayer = new Twitch.Player("TwitchPlayer"+j, options);
			TwitchPlayer.setVolume(players[j].volume);
			EmbedList.push(TwitchPlayer);
		}
	}
		
	function UpdateVideos(players,old){
		for(var j=0 ; j < players.length ; j++){
			if(players[j].channel != old[j].channel){
				EmbedList[j].setChannel(players[j].channel)
			}
			if(players[j].volume != old[j].volume){
				EmbedList[j].setVolume(players[j].volume)
			}
			if(players[j].status != old[j].status){
				if(players[j].status == 'Play'){
					EmbedList[j].play();
				}else{
					EmbedList[j].pause();
				}
			}
			
		}
	}