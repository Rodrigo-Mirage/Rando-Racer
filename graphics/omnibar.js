var speedcontrolBundle = 'nodecg-speedcontrol';
var omnibar = document.getElementById('omni-content'); 

var runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);

var next4runs = nodecg.Replicant('next4runs');
var next4incs = nodecg.Replicant('next4incs');

var donateTotal = nodecg.Replicant('donateTotal');

var runsHtml = "";
var incsHtml = "";
var donateHtml = "";	

var oldDonate = 0;

var slideStep = 0;

var incentivos = [];

//setup();

var	lopCont = 0;
var inCount = 0;
	
next4incs.on('change', (newVal, oldVal) => {
	if (newVal)
	{
		lopCont = 0;
		incentivos = [];
		newVal.forEach(element => {
			incentivos.push(element);
		});
		setIncs(incentivos)
	}
});

setTimeout(() => {
	donateTotal.on('change', (newVal, oldVal) => {
		console.log(newVal)
		if (newVal)
		{
			setDonate(newVal);
		}
	});

	next4runs.on('change', (newVal, oldVal) => {
		if (newVal != oldVal)
		{
			setRuns(newVal);
		}
	});
	
	//loop();

}, 2600);

function loop() { 
	var nextRuns = document.getElementById("nextRuns"); 
	var nextIncs = document.getElementById("nextIncs"); 
	var nextRunsAlert = document.getElementById("nextRunsAlert"); 
	var nextIncsAlert = document.getElementById("nextIncsAlert"); 
	if (nextRuns) nextRuns.style.display = "none";
	if (nextIncs) nextIncs.style.display = "none";
	if (nextRunsAlert) nextRunsAlert.style.display = "none";
	if (nextIncsAlert) nextIncsAlert.style.display = "none";
	switch (lopCont) { 
		case 0:
		if (nextRunsAlert) nextRunsAlert.style.display = "flex";
			timer = 5000;
			lopCont = 1;
			setTimeout(() => {
				loop();
			}, timer);	
			break;
		case 1:
		if (nextRuns) nextRuns.style.display = "flex";
			timer = 15000;
			lopCont = 2;
			if (incentivos.length == 0) { 
				lopCont = 0;
			}
			setTimeout(() => {
				loop();
			}, timer);
			break;	
		case 2:
			if (nextIncsAlert) nextIncsAlert.style.display = "flex";
			timer = 5000;
			lopCont = 3;
			setTimeout(() => {
				loop();
			}, timer);
			break;
		case 3:
			if (nextIncs) nextIncs.style.display = "flex";
			loopIncs()	
		break;
			
	}
}
function loopIncs() { 
	//loadIncs(inCount)
}

function loadIncs(count) { 	
	for (var i = 0; i < incentivos.length; i++){
		if (i == count) {
			if (incentivos[i].type == "Arc") {
				document.getElementById("incBox1").style.display = "flex";
				var incGame = document.getElementById("incGame1");
				var incname = document.getElementById("incName1");
				var incVal = document.getElementById("incVal1");
				incGame.innerHTML = incentivos[i].game;
				incname.innerHTML = incentivos[i].name;
				if (incVal) incVal.innerHTML = (incentivos[i].valueA ? incentivos[i].valueA : "0") + " / " + incentivos[i].valueB;
			}
			if (incentivos[i].type == "Mod") {
				var box = 1
				document.getElementById("incBox1").style.display = "flex";
				var incGame = document.getElementById("incGame1");
				var Incname = document.getElementById("incName1");
				var incVal = document.getElementById("incVal1");
				incGame.innerHTML = incentivos[i].game;
				Incname.innerHTML = incentivos[i].name;
				if (incVal) incVal.innerHTML = "";
				box += 1;
				console.log(incentivos[i].options);
				for (var j = 0; j < incentivos[i].options.length; j++) {
					if (incentivos[i].options[j].name != "") {
						document.getElementById("incBox" + box).style.display = "flex";
						var incGame2 = document.getElementById("incGame" + box);
						var incname2 = document.getElementById("incName" + box);
						var incVal2 = document.getElementById("incVal" + box);
						incGame2.innerHTML = incentivos[i].options[j].name;
						incname2.innerHTML = "";
						if (incVal2) incVal2.innerHTML = (incentivos[i].options[j].valueA ? incentivos[i].options[j].valueA : "0");
						box += 1;
					}
				}
			}
			if (i == incentivos.length - 1) {
				inCount = 0;
				lopCont = 0;
				loop();
			} else {
				inCount += 1;
				setTimeout(() => {
					loopIncs();
				}, 6000);
			}
		}
	}
}

function setup(){
	
	var html = "";
		
	html += `<div id='runsaseguir' class='omni-content-item show0' `+(slideStep!=0? `style='display:none;'`:"" )+`>
				<div class="content_block"><span id="spanAseguir">A Seguir</span></div>
				<div class="separador2"></div>
	</div>`;
	
	fitty('#runsaseguir', { minSize: 17, maxSize: 25, multiLine: true });
	html += "<div id='nextRuns' class='omni-content-item show1' "+(slideStep!=1? "style='display:none;'":"" )+">";
	html += runsHtml;
	html += "</div>";
	
	for(var i = 0 ; i < 11 ; i++){
		html += "<div id='Inc"+i+"' class = 'omni-content-item nextInc show"+(i+2)+" ' "+(slideStep!=(i+2)? "style='display:none;' ":"" )+"></div>";
	}
	//html += incsHtml;
	
	omnibar.innerHTML = html;

	slide(slideStep);
}
setup();

function update(){
	fitty.fitAll();
	var nextRuns = document.getElementById('nextRuns'); 
	var nextIncs = document.getElementById('nextIncs'); 
	nextRuns.innerHTML = runsHtml;
	//nextIncs.innerHTML = incsHtml;
	fitty('.nextRunName',{minSize: 17,maxSize: 25,multiLine: true});
	
}
	
function setRuns(value) {
	runsHtml = "";
	for (var i = 0; i < 4; i++){
		runsHtml += `
		<div class="content_block">
			<span class="nextRunName">${value[i].game.includes("Jogo Extra") ? value[i].game.substring(0, 12) : value[i].game}</span>
			<span class="nextRunCat">${value[i].game.includes("Jogo Extra") ? "Categoria Extra" : value[i].category}</span>
		</div>
		<div class="separador2"></div>
		`;
	}
	var el = document.querySelector('#nextRuns');
	el.innerHTML = runsHtml;
}

function setIncs(value) {
	console.log(value)
	var count = 0;
	for(var i = 0 ; i < value.length ; i++){

		incsHtml = "";

		var IncN = document.getElementById('Inc'+i); 
		if(IncN){
		IncN.innerHTML = "";
			if(value[i].type == 'Arc'){
				
				incsHtml += "<div class = 'IncData content_block'>";
					incsHtml += "<div class = 'Incname'>" + value[i].name + "</div>";
					incsHtml += "<div class = 'IncGame'>" + value[i].game + "</div>";
				incsHtml += "</div>";
				incsHtml += "<div class = 'Separador2'></div>";
				incsHtml += "<div class = 'IncValues content_block'>";
					incsHtml += "<div class = 'valorA'>R$ " + value[i].valueA + "</div>";
					incsHtml += "<div class = 'valorSep'> / </div>";
					incsHtml += "<div class = 'valorB'>R$ " + value[i].valueB + "</div>";
				incsHtml += "</div>";
				incsHtml += "<div class = 'Separador2'></div>";
				
			}else{
				
				incsHtml += "<div class = 'IncData content_block'>";
					incsHtml += "<div class = 'Incname'>" + value[i].name + "</div>";
					incsHtml += "<div class = 'IncGame'>" + value[i].game + "</div>";
				incsHtml += "</div>";
				incsHtml += "<div class = 'Separador2'></div>";
				for (var j = 0; j < value[i].options.length && j<3; j++){
					console.log(value[i].options)
					if(value[i].options[j].name != ""){
						incsHtml += "<div class = 'IncOpt content_block' style='width:"+(600/value[i].options.length)+"px'>" ;
						incsHtml += "<div class = 'Incname'>" + value[i].options[j].name + "</div>";
						incsHtml += "<div class = 'Incval'>R$ " + value[i].options[j].value + "</div>";
						incsHtml += "</div>";
						incsHtml += "<div class = 'Separador2'></div>";
					}
				}
			}
			
			IncN.innerHTML = incsHtml;
		}
		count = i;
	}

	for(var i = count+1 ; i < 11 ; i++){
		var IncN = document.getElementById('Inc'+i); 
		if(IncN){
			IncN.innerHTML = "";
		}
	}



}

function setDonate(value){
	var dinheiro = oldDonate;

	var newValue = {
		valor: dinheiro
	}

	var logEl = document.querySelector('.donateVal');
	if(logEl){
		anime({
			targets: newValue, 
			valor: value,
			easing: 'linear',
			round: 100,
			update: function(){
				logEl.innerHTML = "R$ "+ JSON.stringify(newValue).replace(/"/g,'').replace('{valor:','').replace('}','');  
			}
		});

		oldDonate = value;
	}
}

function animateInOut(classe, dir){

	if (dir == 1) {
		anime({
			targets: classe,
			translateX: 1000,
			opacity: '0%',
			delay: anime.stagger(175),
			direction: 'reverse',
			easing: 'easeOutQuad'
		});
	}

	else if (dir == 0) {
		anime({
			targets: classe,
			translateX: 1000,
			opacity: '0%',
			delay: anime.stagger(175),
			easing: 'easeInQuad'
		});
	}
}

function slide(id){
	slideStep = id;
	fitty.fitAll();
	var next = id + 1;
	var el = document.querySelector('.show' + (next));

	if(!el){
		next = 0;
	} else {
		if(el.innerHTML == ""){
			next = 0;
		}
	}
	console.log(id,next)

	var oel = document.querySelector('.show' + id);
	oel.style.display = 'none';

	var nel = document.querySelector('.show' + next);
	nel.style.display = 'flex';

	/*anime({
		targets: oel,
		translateX: 1000,
		direction: 'reverse',
		easing: 'easeOutQuad'
	});*/
	anime({
		targets: nel,
		translateX: 1000,
		easing: 'linear',
		direction: 'reverse'
	});

	setTimeout(function(){
		slide(next);
	},15000);
}



