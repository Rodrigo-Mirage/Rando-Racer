	var speedcontrolBundle = 'nodecg-speedcontrol';
	var gameTitle = document.getElementById('gameTitle'); // game-title.html
	var gameTitleDiv = document.getElementById('gameTitleDiv'); // game-title.html
	var gameCategory = document.getElementById('gameCategory'); // game-category.html
	var gameCategoryDiv = document.getElementById('gameCategoryDiv'); // game-category.html
	var gameSystem = document.getElementById('gameSystem'); // game-system.html
	
	var gameEstimate = document.getElementById('gameEstimate'); // game-estimate.html
	var gameEstimateDiv = document.getElementById('gameEstimateDiv'); // game-estimate.html
	
	
	var twitch = document.getElementById('twitch'); // twitch.html

	var overlay = document.getElementById('overlay'); 
	var preview = document.getElementById('preview'); 
	var seguir = document.getElementById('seguir'); 
	
	var next4runs = nodecg.Replicant('next4runs');
	var player = document.getElementById('players'); // player.html
	var playerDiv = document.getElementById('playersDiv'); // player.html
	
	
	var ids = [];
	
	var playerNumber =0;

	var GameS = ""; 

	var elemPre = document.getElementById('premios');
	var elemPat = document.getElementById('patro');
	
	next4runs.on('change', (newVal, oldVal) => {
		
		if (newVal)
			updateSceneFields(newVal[0]);
	});
	

	function updateSceneFields(runData) {
		
		var team = runData.teams[playerNumber-1];
		
		var runners =""
		for (var i=0; i < runData.teams.length ;i++){
			for (var j=0; j < runData.teams[i].players.length ;j++){
				if(runners != ""){
					runners += "/";
				}
				runners += runData.teams[i].players[j].name;
			}				
		}
		
		gameTitle.innerHTML = runData.game; // game-title.html
		gameCategory.innerHTML = runData.category; // game-category.html
		gameSystem.style.backgroundImage = "url('../graphics/Images/logos/"+runData.system+".png')"
		gameEstimate.innerHTML = runData.estimate; // game-estimate.html
		player.innerHTML = runners;
		
		preview.style.backgroundImage = "url('../graphics/Images/Intermission/"+runData.game.replace(":","")+".png')"
		
		
		//Posiçao do Estimate
		gameEstimateDiv.style.position= "absolute";
		gameEstimateDiv.style.top = "655px";
		gameEstimateDiv.style.left = "990px";
		gameEstimateDiv.style.fontStyle = "italic";
		gameEstimateDiv.style.fontSize  = "39px";
		gameEstimateDiv.style.color  = "#ff8c00";
		gameEstimateDiv.style.width  = "230px";
		gameEstimateDiv.style.height  = "50px";
		gameEstimateDiv.style.textAlign  = "right";
		
		
		//Posiçao do Logo do sistema
		gameSystem.style.position= "absolute";
		gameSystem.style.top = "594px";
		gameSystem.style.left = "1305px";
		gameSystem.style.width = "165px";
		gameSystem.style.height = "165px";

		//Posiçao do Titulo
		gameTitleDiv.style.position= "absolute";
		gameTitleDiv.style.top = "227px";
		gameTitleDiv.style.left = "885px";
		gameTitleDiv.style.color  = "#ff8c00";
		gameTitleDiv.style.fontStyle = "italic";
		gameTitleDiv.style.fontSize  = "38px";
		gameTitleDiv.style.width  = "600px";
		gameTitleDiv.style.height  = "50px";
		
		//Posiçao da  Categoria
		gameCategoryDiv.style.position= "absolute";
		gameCategoryDiv.style.top = "344px";
		gameCategoryDiv.style.left = "885px";
		gameCategoryDiv.style.height  = "50px";
		gameCategoryDiv.style.color  = "#ff8c00";
		gameCategoryDiv.style.fontStyle = "italic";
		gameCategoryDiv.style.fontSize  = "30px";
		gameCategoryDiv.style.width  = "500px";
		gameCategoryDiv.style.height  = "50px";
		
		playersDiv.style.position= "absolute";
		playersDiv.style.top = "460px";
		playersDiv.style.left = "885px";
		playersDiv.style.width = "400px";
		playersDiv.style.color  = "#ff8c00";
		playersDiv.style.fontStyle = "italic";
		playersDiv.style.fontSize  = "30px";
		playersDiv.style.textAlign= "left";
		
		// a seguir 735 88
		
		seguir.style.position= "absolute";
		seguir.style.top = "88px";
		seguir.style.left = "735px";
		seguir.style.width = "700px";
		seguir.style.color  = "#171513";
		seguir.style.fontStyle = "italic";
		seguir.style.fontWeight = "bold";
		seguir.style.fontSize  = "45px";
		
		//preview
		preview.style.position= "absolute";
		preview.style.top = "74px";
		preview.style.left = "1475px";
		preview.style.width = "386px";
		preview.style.height = "736px";

		
		elemPre.style.position= "absolute";
		elemPre.style.top= "-26px";
		elemPre.style.left= "10px";	
		elemPre.style.width= "562x";
		elemPre.style.height= "562px";	
		
		elemPat.style.position= "absolute";
		elemPat.style.top= "462px";
		elemPat.style.left= "10px";	
		elemPat.style.width= "562px";
		elemPat.style.height= "562px";	

	
	}


	function slidePat(id){
		var next = id+1;

		var nexturl = "Images/Patro/Pat"+(next > 9 ? next: "0" + next )+".jpg";

		if(!imageExists(nexturl)){
			next = 0;
		}

		nexturl = "Images/Patro/Pat"+(next > 9 ? next: "0" + next )+".jpg";


		elemPat.src = nexturl;
		

		setTimeout(function(){
			slidePat(next);
		},5000);
	}

	function slidePre(id){
		var next = id+1;

		var nexturl = "Images/Premios/Pre"+(next > 9 ? next: "0" + next )+".jpg";

		if(!imageExists(nexturl)){
			next = 0;
		}

		nexturl = "Images/Premios/Pre"+(next > 9 ? next: "0" + next )+".jpg";


		elemPre.src = nexturl;
		
		setTimeout(function(){
			slidePre(next);
		},5000);
	}

	function imageExists(image_url){

		var http = new XMLHttpRequest();
	
		http.open('HEAD', image_url, false);
		http.send();
	
		return http.status != 404;
	
	}



	slidePat(0);
	slidePre(0);