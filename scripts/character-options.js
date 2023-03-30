var classes = [];
var races = [];
var backgrounds = [];

function myFunction() {
	var race = getRace();
	var raceElem = `<a id='race-link' href='http://dnd5e.wikidot.com/${race.toLowerCase().replace(" ", "-")}' target='_blank'>${race}</a>`;
	var _class = getClass();
	var classElem = `<a id='class-link' href='${_class.link}' target='_blank'>${_class.id}</a>`;
	var includeSubclass = $("#subclassSwitch")[0].checked;
	var subclass = "";
	if(includeSubclass){
		subclass = getSubclass(_class, $("#HbSwitch")[0].checked);
		classElem += ` (<a href='${subclass.link}' target='_blank'>${subclass.id}</a>)`;
	}
	var background = getBackground();
	var backgroundElem = `<a id='background-link' href='http://dnd5e.wikidot.com/background:${background.toLowerCase().replace(" ", "-")}' target='_blank'>${background}</a>`;
	document.getElementById("race").innerHTML = raceElem;
	document.getElementById("class").innerHTML = classElem;
	document.getElementById("background").innerHTML = backgroundElem;
	if(race.includes("Elf")){
		race = race.replace("Elf", "Elven");
	}
	if(race.includes("Dwarf")){
		race = race.replace("Dwarf", "Dwarven");
	}
	
	var combineWord = "a";
	if(['a', 'e', 'i', 'u', 'o', 'y'].includes(background.charAt(0).toLowerCase())){
		combineWord = "an";
	}
	document.getElementById("total").innerHTML = `You are playing a <text style="color: red">${race}</text> <text style="color: green">${_class.id}</text>${includeSubclass ? ` (<text style="color:darkgreen">${subclass.id}</text>)` : ``}, who has the background of ${combineWord} <text style="color: blue">${background}</text>`;
	$("#result").css("display", "");
	$("#result-img").css("display", "none");
	rollForStats();

	$("#backstory-container").show();
}
function getRace(){
	var realisticMode = $("#raceSwitch")[0].checked;
	var list = races;
	if(realisticMode){
		var x = getRandomInt(0, 100);
		if(x <= 67){
			list = races.filter(f => f.type == "Common");
		}else{
			list = races.filter(f => f.type != "Common");
		}
	}
	return races[getRandomInt(0, list.length)].id;
}
function getClass(){
	return classes[getRandomInt(0, classes.length)];
}
function getSubclass(_class, includeHB){
	var list = classes.filter(f => f.id == _class.id)[0].subclasses;
	if(!includeHB){
		list = jQuery.grep(list, function(value){
			return !value.isHomebrew;
		});
	}
	return list[getRandomInt(0, list.length)];
}
function getBackground(){
	return backgrounds[getRandomInt(0, backgrounds.length)];
}
function rollForStats(){
	var stats = [rollStat(), rollStat(), rollStat(), rollStat(), rollStat(), rollStat()];
	stats.sort(function(a, b) {
		return a - b;
	});
	$("#stats").html(`${stats[0]}, ${stats[1]}, ${stats[2]}, ${stats[3]}, ${stats[4]}, ${stats[5]}`);
}

function rollStat(){
	var rolls = [getRandomInt(1,7), getRandomInt(1,7), getRandomInt(1,7), getRandomInt(1,7)];

	Array.min = function( array ){
		return Math.min.apply( Math, array );
	};
	var min = Array.min(rolls);
	return rolls.reduce((a, b) => a + b, 0) - min;
}
$(document).ready(function(){
	readTextFile("data/classes.json", (data) => {
		classes = JSON.parse(data);
	});
	readTextFile("data/races.json", (data) => {
		races = JSON.parse(data);
	});
	readTextFile("data/backgrounds.json", (data) => {
		backgrounds = JSON.parse(data);
	});
});