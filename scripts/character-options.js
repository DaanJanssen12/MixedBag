var commonRaces = ["Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", "Half-Orc", "Halfling", "Human", "Tiefling"];
var monsterRaces = ["Bugbear", "Centaur", "Goblin", "Grung", "Hobgoblin", "Kobold", "Lizardfolk", "Minotaur", "Orc", "Yuan-Ti"];
var exoticRaces = ["Aarakocra", "Aasimar", "Changeling", "Firbolg", "Genasi", "Gith", "Goliath", "Kalashtar", "Kenku", "Satyr", "Shifter", "Tabaxi", "Tortle", "Triton", "Warforged"];

var classes = [];

var backgrounds = ["Acolyte", "Anthropologist", "Archaeologist", "Charlatan", "City Watch", "Cloistered Sholar", "Courtier", "Criminal", "Entertainer", "Faceless", "Faction Agent", "Far Traveler", 
	"Folk Hero", "Gladiator", "Guild Artisan", "Guild Merchant", "Haunted One", "House Agent", "Hermit", "Inheritor", "Investigator", "Knight", "Knight of the Order", "Mercenary Veteran", "Noble", "Outlander", 
	"Pirate", "Sage", "Sailor", "Soldier", "Spy", "Urban Bounty Hunter", "Urchin", "Uthgardt Tribe Member", "Waterdhavian Noble", "Grinner", "Volstrucker Agent"];

function myFunction() {
	var race = getRace();
	var raceElem = `<a href='http://dnd5e.wikidot.com/${race.toLowerCase().replace(" ", "-")}' target='_blank'>${race}</a>`;
	var _class = getClass();
	var classElem = `<a href='${_class.link}' target='_blank'>${_class.id}</a>`;
	var includeSubclass = $("#subclassSwitch")[0].checked;
	var subclass = "";
	if(includeSubclass){
		subclass = getSubclass(_class, $("#HbSwitch")[0].checked);
		classElem += ` (<a href='${subclass.link}' target='_blank'>${subclass.id}</a>)`;
	}
	var background = getBackground();
	var backgroundElem = `<a href='http://dnd5e.wikidot.com/background:${background.toLowerCase().replace(" ", "-")}' target='_blank'>${background}</a>`;
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
}
function getRace(){
	var min = 1;
	var max = 4;
	if($("#raceSwitch")[0].checked == false){
		max--;
	}
	var group = getRandomInt(min, max + 1);
	switch(group){
		case 1:
			return commonRaces[getRandomInt(0, commonRaces.length)];
			break;
		case 2:
			return monsterRaces[getRandomInt(0, monsterRaces.length)];
			break;
		case 3:
			return exoticRaces[getRandomInt(0, exoticRaces.length)];
			break;
		case 4:
			return "Custom Origin";
			break;
		default:
			return commonRaces[getRandomInt(0, commonRaces.length)];
			break;
	}
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
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
$(document).ready(function(){
	readTextFile("data/classes.json", (data) => {
		classes = JSON.parse(data);
	});
});