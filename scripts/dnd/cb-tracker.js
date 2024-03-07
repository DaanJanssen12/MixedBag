var combat = [];
$(document).ready(function(){
	var self = this;

	var cbCookieVal = getCookie("combat");
	if(cbCookieVal === undefined){
		combat = [];
	} else{
		combat = JSON.parse(cbCookieVal); 
		populateTable(combat);
	}
	
	$("button[add-to-initiative]").off("click")
		.on("click", function(){
			var name = $("#name").val();
			var initiative = $("#initiative").val();
			combat.push({ name: name, initiative: initiative, order: combat.length + 1 });
			setCookie('combat', JSON.stringify(combat), 1);
			populateTable(combat);
		});
		
	$("button[recalc]").off("click")
		.on("click", function(){
			recalculate(combat);
		});
});

function populateTable(){
	$("#combat-tracker tbody tr").remove();
	for (let i = 0; i < combat.length; i++){
		var elem = combat.find(f => f.order == i+1)
		addRow(elem.name, elem.initiative, i == 0);
	}
	initTableButtons();
}

function initTableButtons(){
	$("button[move-up]").off("click")
		.on("click", function(){
			var name = $(this).data("name");
			var creature = combat.find(f => f.name == name);
			if(creature.order > 1){
			  var newOrder = creature.order - 1;
			  creature.order = newOrder;
			  var oldCreature = combat.find(f => f.order == newOrder);
			  oldCreature.order = oldCreature.order + 1;
			  setCookie('combat', JSON.stringify(combat), 1);
			}
			populateTable();
		});
	$("button[move-down]").off("click")
		.on("click", function(){
			var name = $(this).data("name");
			var creature = combat.find(f => f.name == name);
			if(creature.order < combat.length){
			  var newOrder = creature.order + 1;
			  creature.order = newOrder;
			  var oldCreature = combat.find(f => f.order == newOrder);
			  oldCreature.order = oldCreature.order - 1;
			  setCookie('combat', JSON.stringify(combat), 1);
			}
			populateTable();
		});
	$("button[remove-row]").off("click")
		.on("click", function(){
			var name = $(this).data("name");
			$("#row-"+name).remove();
			combat = combat.filter(f => f.name !== name);
			setCookie('combat', JSON.stringify(combat), 1);
			populateTable(combat);
		});
}
function recalculate(){
	combat.sort(function(a, b) {
	  return b.initiative - a.initiative;
	});
	combat.forEach((creature, i) => {
	  creature.order = i+1;
	});
	setCookie('combat', JSON.stringify(combat), 1);
	populateTable(combat);
}
function addRow(name, initiative, isFirstRow){	
	// Find a <table> element with id="combat-tracker":
	var table = document.getElementById("combat-tracker").getElementsByTagName('tbody')[0];

	// Create an empty <tr> element and add it to the 1st position of the table:
	var row = table.insertRow(table.rows.length);
	row.setAttribute("id", "row-"+name)

	// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
	var cell = row.insertCell(0);
	var cell1 = row.insertCell(1);
	var cell2 = row.insertCell(2);
	var cell3 = row.insertCell(3);

	// Add some text to the new cells:
	cell.innerHTML = "";
	if(isFirstRow){
		cell.innerHTML = ">";
		cell.setAttribute("data-selected", "1");
	}
	cell1.innerHTML = name;
	cell2.innerHTML = initiative;
	cell3.innerHTML = getDeleteRowBtn(name) + getMoveDownBtn(name) + getMoveUpBtn(name);
}

function getDeleteRowBtn(name){
	return `<button remove-row class="btn btn-sm btn-primary" style="padding: unset !important; margin-left: 5px; height: 30px;width: 30px;float:right;" data-name='${name}'"><i class="fa fa-times"></i></button>`;
}

function getMoveUpBtn(name){
	return `<button move-up class="btn btn-sm btn-primary" style="padding: unset !important; margin-left: 5px; height: 30px;width: 30px;float:right;" data-name='${name}'"><i class="fa fa-arrow-up"></i></button>`;
}

function getMoveDownBtn(name){
	return `<button move-down class="btn btn-sm btn-primary" style="padding: unset !important; margin-left: 5px; height: 30px;width: 30px;float:right;" data-name='${name}'"><i class="fa fa-arrow-down"></i></button>`;
}

function nextTurn(){
	var i = $("td[data-selected='1']").parent().index();
	var table = document.getElementById("combat-tracker").getElementsByTagName('tbody')[0];;
	if(table.rows.length > 1){
		if(i == table.rows.length - 1){
			table.rows[i].cells[0].innerHTML = "";
			table.rows[i].cells[0].setAttribute("data-selected", "0");
			table.rows[0].cells[0].innerHTML = ">";
			table.rows[0].cells[0].setAttribute("data-selected", "1");
		}else{
			table.rows[i].cells[0].innerHTML = "";
			table.rows[i].cells[0].setAttribute("data-selected", "0");
			table.rows[i+1].cells[0].innerHTML = ">";
			table.rows[i+1].cells[0].setAttribute("data-selected", "1");
		}
	}
}