  
  var speedcontrolBundle = 'nodecg-speedcontrol';
  var incentData = nodecg.Replicant('incentData');
  var curIncentData = nodecg.Replicant('curIncentData');
  var editIncentData = nodecg.Replicant('editIncentData');
  var incGame = document.getElementById('incGame');
  
  var itens = 0;
  var editnum = 0;
  
  var incentivos = [];
  
  function save(){
	  var incentivo = {};
	  
	  incentivo.id = document.getElementById('incId').value;
	  incentivo.name = document.getElementById('incNome').value;
	  
	  var incMod = document.getElementById('incMod');
	  
	  if(incMod.checked == true){
		incentivo.type = "Mod";
		
		incentivo.options =[];
		
		for(var i=0; i< itens-1; i++){
			var valNome = document.getElementById('nomev'+i);
			var valval = document.getElementById('v'+i);
			var val = {name: valNome.value, value: (valval.value != "" ? valval.value : 0 )};
			if(valNome.value != ""){
				incentivo.options.push(val);
			}
		}
		
	  }else{
		incentivo.type = "Arc";
		var valA = document.getElementById('valorA');
		var valB = document.getElementById('valorB');
		incentivo.valueA = valA.value != "" ? valA.value : 0 ;
		incentivo.valueB = valB.value;
	  }
	  
	  var valid = document.getElementById('valid');
	  incentivo.runID = valid.value;
	  incentivo.game = incGame.value;
	  
	  
	  nodecg.readReplicant('incentData', value => {
		var insert = true;
		for(var i=0; i< value.length; i++){
			if(value[i].id == incentivo.id){
				value[i] = incentivo;
				insert = false;
			}
		}
		if(insert){
			value.push(incentivo);
		}
		incentData.value = value;
	  });
	   setup();
	   closeBtn();
	   editnum =0;
  }
  
  
  function setup(){
	  var html = "";
	  var divItens = document.getElementById('itens');
	  var incId = document.getElementById('incId');
	  var incMod = document.getElementById('incMod');
	  var incArc = document.getElementById('incArc');
	  document.getElementById('incNome').value = "";
	  
	  incMod.checked = false;
	  incArc.checked = false;
	  const valor = document.getElementById('valor');
	  const valores = document.getElementById('valores');

  	  valor.style.display = "none";
	  valores.style.display = "none";
	  
	  var valorA = document.getElementById('valorA');
	  var valorB = document.getElementById('valorB');
	  
	  valorA.value = "";
	  valorB.value = "";
	  
	  itens = 0;
	  html += "<div id='item"+itens+"'><label>Nome</label><input onchange='look("+itens+")' type='text' id='nomev"+itens+"' name='valor'/><label>Valor</label><input type='text' id='v"+itens+"' name='valor'/></div>";
	  divItens.innerHTML = html;
	  
	  nodecg.readReplicant('incentData', value => {
		 var nu = value.length;
		 if(nu == 0){
			 incId.value = 0;
		 }else{
			 if(editnum == 0){
				incId.value = parseInt(value[nu-1].id)+1;
			 }else{
				incId.value = editnum;
			 }
		 }
		 
	  });
  }
  
  function populate(){
	  var valid = document.getElementById('valid');
	  nodecg.readReplicant('runDataArray',speedcontrolBundle, value => {
			html = "";
			for(var i=0;i<value.length;i++){
				html +="<option value ="+value[i].id+">"+value[i].game+"</option>";
			}
			valid.innerHTML = html;
	  });
  }
  
  
  function setGame(id){
	  console.log(id);
	  
	  incGame.value = id.options[id.selectedIndex].text;
	  
  }
  
  
  function look (num){
	  const current = document.getElementById('nomev' + num);
	  if(current.value != ""){
		  const next = document.getElementById('item'+(num+1));
		  if(!next){
			  const divItens = document.getElementById('itens');
			  var html = "";
			  var cont = itens;
			  itens=0;
			  for(var i=0; i<= cont; i++){
				  var valNome = document.getElementById('nomev'+i);
				  var valval = document.getElementById('v'+i);
				  html+= "<div id='item"+i+"'><label>Nome</label><input onchange='look("+i+")' type='text' id='nomev"+i+"' name='valor' value='"+valNome.value+"'/><label>Valor</label><input type='text' id='v"+i+"' name='valor' value='"+valval.value+"'/></div>";
				  
				  itens++;
			  }
			  html += "<div id='item"+itens+"'><label>Nome</label><input onchange='look("+itens+")' type='text' id='nomev"+itens+"' name='valor'/><label>Valor</label><input type='text' id='v"+itens+"' name='valor'/></div>";
			  divItens.innerHTML = html;
		  }
	  }
  }
		
  
  function tipo(select){
	  
	const valor = document.getElementById('valor');
	const valores = document.getElementById('valores');
	
	  if(select == 'Mod'){
		  valor.style.display = "none";
		  valores.style.display = "block";
	  }else{
		  valor.style.display = "block";
		  valores.style.display = "none";
	  }
  }
  
  
	curIncentData.on('change', (newVal, oldVal) => {
		if (newVal){
		  nodecg.readReplicant('editIncentData', value => {
			if(value == true){
	             editIncentData.value = false; 
				 newBtn();
				 var incentivo = newVal;
		  
				  document.getElementById('incId').value = incentivo.id;
				  document.getElementById('incNome').value = incentivo.name;
				  
				  var incMod = document.getElementById('incMod');
				  var incArc = document.getElementById('incArc');
				  
				  incMod.checked = false;
				  incArc.checked = false;
				  
					const valor = document.getElementById('valor');
					const valores = document.getElementById('valores');

					if(incentivo.type  == 'Mod'){
						valor.style.display = "none";
						valores.style.display = "block";
					}else{
						valor.style.display = "block";
						valores.style.display = "none";
					}
				if(incentivo.type == "Mod"){
					incMod.checked = true;
					const divItens = document.getElementById('itens');
					var html = "";
					
					itens = incentivo.options.length;
					for(var i=0; i< incentivo.options.length; i++){
						var valNome = document.getElementById('nomev'+i);
						var valval = document.getElementById('v'+i);
						html += "<div id='item"+i+"'><label>Nome</label><input onchange='look("+i+")' type='text' id='nomev"+i+"' name='valor' value='"+incentivo.options[i].name+"'/><label>Valor</label><input type='text' id='v"+i+"' name='valor' value='"+(incentivo.options[i].value != "" ?incentivo.options[i].value:0)+"'/></div>";				
					}
					html += "<div id='item"+itens+"'><label>Nome</label><input onchange='look("+itens+")' type='text' id='nomev"+itens+"' name='valor'/><label>Valor</label><input type='text' id='v"+itens+"' name='valor'/></div>";
					divItens.innerHTML = html;
					  
					var valA = document.getElementById('valorA');
					var valB = document.getElementById('valorB');
					valA.value = "";
					valB.value = "";
					  
				  }else{
					incArc.checked = true;
					incentivo.type = "Arc";
					var valA = document.getElementById('valorA');
					var valB = document.getElementById('valorB');
					valA.value = incentivo.valueA;
					valB.value = incentivo.valueB;
					const divItens = document.getElementById('itens');
					divItens.InnerHTML = "";
				  }
				  
				var valid = document.getElementById('valid');
				
				
				valid.value = incentivo.runID;
				editnum = incentivo.id;
				incGame.value = incentivo.game;
		
			}
		  });
		}
	});
  
  
  function newBtn(){
	setup();
	var btn = document.getElementById('newBtn');
	var editForm = document.getElementById('editForm');
	
	editForm.style.display = "block";
	btn.style.display = "none";
	
  }
  
  function closeBtn(){
	  
	var btn = document.getElementById('newBtn');
	var editForm = document.getElementById('editForm');
	
	editForm.style.display = "none";
	btn.style.display = "block";
	
  }
  
  
  setup();
  populate();