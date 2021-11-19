var commonRaces = ["Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", "Half-Orc", "Halfling", "Human", "Tiefling"];
var monsterRaces = ["Bugbear", "Centaur", "Goblin", "Grung", "Hobgoblin", "Kobold", "Lizardfolk", "Minotaur", "Orc", "Yuan-Ti"];
var exoticRaces = ["Aarakocra", "Aasimar", "Changeling", "Firbolg", "Genasi", "Gith", "Goliath", "Kalashtar", "Kenku", "Satyr", "Shifter", "Tabaxi", "Tortle", "Triton", "Warforged"];

var classes = ["Artificer", "Barbarian", "Bard", "Blood Hunter", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];
var ArtificerSub = [
	{name: "Alchemist", link: "http://dnd5e.wikidot.com/artificer:alchemist"}, 
	{name: "Armorer", link: "http://dnd5e.wikidot.com/artificer:armorer"}, 
	{name: "Artillerist", link: "http://dnd5e.wikidot.com/artificer:artillerist"}, 
	{name: "Battle Smith", link: "http://dnd5e.wikidot.com/artificer:battle-smith"}];
var BarbarianSub = [
	{name: "Path of the Ancestral Guardian", link: "http://dnd5e.wikidot.com/barbarian:ancestral-guardian"},
	{name: "Path of the Battlerager", link: "http://dnd5e.wikidot.com/barbarian:battlerager"},
	{name: "Path of the Beast", link: "http://dnd5e.wikidot.com/barbarian:beast"},
	{name: "Path of the Berserker", link: "http://dnd5e.wikidot.com/barbarian:berserker"},
	{name: "Path of the Storm Herald", link: "http://dnd5e.wikidot.com/barbarian:storm-herald"},
	{name: "Path of the Totem Warrior", link: "http://dnd5e.wikidot.com/barbarian:totem-warrior"},
	{name: "Path of Wild Magic", link: "http://dnd5e.wikidot.com/barbarian:wild-magic"},
	{name: "Path of the Zealot", link: "http://dnd5e.wikidot.com/barbarian:zealot"}];
var BardSub = [
	{name: "College of Creation", link: "http://dnd5e.wikidot.com/bard:creation"},
	{name: "College of Eloquence", link: "http://dnd5e.wikidot.com/bard:eloquence"},
	{name: "College of Glamour", link: "http://dnd5e.wikidot.com/bard:glamour"},
	{name: "College of Lore", link: "http://dnd5e.wikidot.com/bard:lore"},
	{name: "College of Spirits", link: "http://dnd5e.wikidot.com/bard:spirits"},
	{name: "College of Swords", link: "http://dnd5e.wikidot.com/bard:swords"},
	{name: "College of Valor", link: "http://dnd5e.wikidot.com/bard:valor"},
	{name: "College of Whispers", link: "http://dnd5e.wikidot.com/bard:whispers"}
];
var BloodHunterSub = [
	{name: "Order of the Ghostslayer", link: "http://dnd5e.wikidot.com/blood-hunter:ghostslayer"},
	{name: "Order of the Lycan", link: "http://dnd5e.wikidot.com/blood-hunter:lycan"},
	{name: "Order of the Mutant", link: "http://dnd5e.wikidot.com/blood-hunter:mutant"},
	{name: "Order of the Profane Soul", link: "http://dnd5e.wikidot.com/blood-hunter:profane-soul"}
];
var ClericSub = [
	{name: "Arcana Domain", link: "http://dnd5e.wikidot.com/cleric:arcana"},
	{name: "Death Domain", link: "http://dnd5e.wikidot.com/cleric:death"},
	{name: "Forge Domain", link: "http://dnd5e.wikidot.com/cleric:forge"},
	{name: "Grave Domain", link: "http://dnd5e.wikidot.com/cleric:grave"},
	{name: "Knowledge Domain", link: "http://dnd5e.wikidot.com/cleric:knowledge"},
	{name: "Life Domain", link: "http://dnd5e.wikidot.com/cleric:life"},
	{name: "Light Domain", link: "http://dnd5e.wikidot.com/cleric:light"},
	{name: "Nature Domain", link: "http://dnd5e.wikidot.com/cleric:nature"},
	{name: "Order Domain", link: "http://dnd5e.wikidot.com/cleric:order"},
	{name: "Peace Domain", link: "http://dnd5e.wikidot.com/cleric:peace"},
	{name: "Tempest Domain", link: "http://dnd5e.wikidot.com/cleric:tempest"},
	{name: "Trickery Domain", link: "http://dnd5e.wikidot.com/cleric:trickery"},
	{name: "Twilight Domain", link: "http://dnd5e.wikidot.com/cleric:twilight"},
	{name: "War Domain", link: "http://dnd5e.wikidot.com/cleric:war"}
];
var DruidSub = [
	{name: "Circle of Dreams", link: "http://dnd5e.wikidot.com/druid:dreams"},
	{name: "Circle of the Land", link: "http://dnd5e.wikidot.com/druid:land"},
	{name: "Circle of the Moon", link: "http://dnd5e.wikidot.com/druid:moon"},
	{name: "Circle of the Shepherd", link: "http://dnd5e.wikidot.com/druid:shepherd"},
	{name: "Circle of Spores", link: "http://dnd5e.wikidot.com/druid:spores"},
	{name: "Circle of Stars", link: "http://dnd5e.wikidot.com/druid:stars"},
	{name: "Circle of Wildfire", link: "http://dnd5e.wikidot.com/druid:wildfire"}
];
var FighterSub = [
	{name: "Arcane Archer", link: "http://dnd5e.wikidot.com/fighter:arcane-archer"},
	{name: "Banneret", link: "http://dnd5e.wikidot.com/fighter:banneret"},
	{name: "Battle Master", link: "http://dnd5e.wikidot.com/fighter:battle-master"},
	{name: "Cavalier", link: "http://dnd5e.wikidot.com/fighter:cavalier"},
	{name: "Champion", link: "http://dnd5e.wikidot.com/fighter:champion"},
	{name: "Echo Knight", link: "http://dnd5e.wikidot.com/fighter:echo-knight"},
	{name: "Eldritch Knight", link: "http://dnd5e.wikidot.com/fighter:eldritch-knight"},
	{name: "Psi Warrior", link: "http://dnd5e.wikidot.com/fighter:psi-warrior"},
	{name: "Rune Knight", link: "http://dnd5e.wikidot.com/fighter:rune-knight"},
	{name: "Samurai", link: "http://dnd5e.wikidot.com/fighter:samurai"}
];
var MonkSub = [
	{name: "Way of Mercy", link: "http://dnd5e.wikidot.com/monk:mercy"},
	{name: "Way of the Astral Self", link: "http://dnd5e.wikidot.com/monk:astral-self"},
	{name: "Way of the Drunken Master", link: "http://dnd5e.wikidot.com/monk:drunken-master"},
	{name: "Way of the Four Elements", link: "http://dnd5e.wikidot.com/monk:four-elements"},
	{name: "Way of the Kensei", link: "http://dnd5e.wikidot.com/monk:kensei"},
	{name: "Way of the Long Death", link: "http://dnd5e.wikidot.com/monk:long-death"},
	{name: "Way of the Open Hand", link: "http://dnd5e.wikidot.com/monk:open-hand"},
	{name: "Way of Shadow", link: "http://dnd5e.wikidot.com/monk:shadow"},
	{name: "Way of the Sun Soul", link: "http://dnd5e.wikidot.com/monk:sun-soul"}
];
var PaladinSub = [
	{name: "Oath of the Ancients", link: "http://dnd5e.wikidot.com/paladin:ancients"},
	{name: "Oath of Conquest", link: "http://dnd5e.wikidot.com/paladin:conquest"},
	{name: "Oath of the Crown", link: "http://dnd5e.wikidot.com/paladin:crown"},
	{name: "Oath of Devotion", link: "http://dnd5e.wikidot.com/paladin:devotion"},
	{name: "Oath of Glory", link: "http://dnd5e.wikidot.com/paladin:glory"},
	{name: "Oath of Redemption", link: "http://dnd5e.wikidot.com/paladin:redemption"},
	{name: "Oath of Vengeance", link: "http://dnd5e.wikidot.com/paladin:vengeance"},
	{name: "Oath of the Watchers", link: "http://dnd5e.wikidot.com/paladin:watchers"},
	{name: "Oathbreaker", link: "http://dnd5e.wikidot.com/paladin:oathbreaker"}
];
var RangerSub = [
	{name: "Beast Master Conclave", link: "http://dnd5e.wikidot.com/ranger:beast-master"},
	{name: "Fey Wanderer", link: "http://dnd5e.wikidot.com/ranger:fey-wanderer"},
	{name: "Gloom Stalker Conclave", link: "http://dnd5e.wikidot.com/ranger:gloom-stalker"},
	{name: "Horizon Walker Conclave", link: "http://dnd5e.wikidot.com/ranger:horizon-walker"},
	{name: "Hunter Conclave", link: "http://dnd5e.wikidot.com/ranger:hunter"},
	{name: "Monster Slayer Conclave", link: "http://dnd5e.wikidot.com/ranger:monster-slayer"},
	{name: "Swarmkeeper", link: "http://dnd5e.wikidot.com/ranger:swarmkeeper"}
];
var RogueSub = [
	{name: "Arcane Trickster", link: "http://dnd5e.wikidot.com/rogue:arcane-trickster"},
	{name: "Assassin", link: "http://dnd5e.wikidot.com/rogue:assassin"},
	{name: "Inquisitive", link: "http://dnd5e.wikidot.com/rogue:inquisitive"},
	{name: "Mastermind", link: "http://dnd5e.wikidot.com/rogue:mastermind"},
	{name: "Phantom", link: "http://dnd5e.wikidot.com/rogue:phantom"},
	{name: "Scout", link: "http://dnd5e.wikidot.com/rogue:scout"},
	{name: "Soulknife", link: "http://dnd5e.wikidot.com/rogue:soulknife"},
	{name: "Swashbuckler", link: "http://dnd5e.wikidot.com/rogue:swashbuckler"},
	{name: "Thief", link: "http://dnd5e.wikidot.com/rogue:thief"}
];
var SorcererSub = [
	{name: "Abberant Mind", link: "http://dnd5e.wikidot.com/sorcerer:abberant-mind"},
	{name: "Clockwork Soul", link: "http://dnd5e.wikidot.com/sorcerer:clockwork-soul"},
	{name: "Droconic Bloodline", link: "http://dnd5e.wikidot.com/sorcerer:draconic-bloodline"},
	{name: "Divine Soul", link: "http://dnd5e.wikidot.com/sorcerer:divine-soul"},
	{name: "Shadow Magic", link: "http://dnd5e.wikidot.com/sorcerer:shadow-magic"},
	{name: "Storm Sorcery", link: "http://dnd5e.wikidot.com/sorcerer:storm-sorcery"},
	{name: "Wild Magic", link: "http://dnd5e.wikidot.com/sorcerer:wild-magic"}
];
var WarlockSub = [
	{name: "Archfey", link: "http://dnd5e.wikidot.com/warlock:archfey"},
	{name: "Celestial", link: "http://dnd5e.wikidot.com/warlock:celestial"},
	{name: "Fathomless", link: "http://dnd5e.wikidot.com/warlock:fathomless"},
	{name: "Fiend", link: "http://dnd5e.wikidot.com/warlock:fiend"},
	{name: "The Genie", link: "http://dnd5e.wikidot.com/warlock:the-genie"},
	{name: "Great Old One", link: "http://dnd5e.wikidot.com/warlock:great-old-one"},
	{name: "Hexblade", link: "http://dnd5e.wikidot.com/warlock:hexblade"},
	{name: "Undead", link: "http://dnd5e.wikidot.com/warlock:undead"},
	{name: "Undying", link: "http://dnd5e.wikidot.com/warlock:undying"}
];
var WizardSub = [
	{name: "School of Abjuration", link: "http://dnd5e.wikidot.com/wizard:abjuration"},
	{name: "School of Bladesinging", link: "http://dnd5e.wikidot.com/wizard:bladesinging"},
	{name: "School of Chronurgy", link: "http://dnd5e.wikidot.com/wizard:chronurgy"},
	{name: "School of Conjuration", link: "http://dnd5e.wikidot.com/wizard:conjuration"},
	{name: "School of Divination", link: "http://dnd5e.wikidot.com/wizard:divination"},
	{name: "School of Enchantment", link: "http://dnd5e.wikidot.com/wizard:enchantment"},
	{name: "School of Evocation", link: "http://dnd5e.wikidot.com/wizard:evocation"},
	{name: "School of Graviturgy", link: "http://dnd5e.wikidot.com/wizard:graviturgy"},
	{name: "School of Illusion", link: "http://dnd5e.wikidot.com/wizard:illusion"},
	{name: "School of Necromancy", link: "http://dnd5e.wikidot.com/wizard:necromancy"},
	{name: "Order of Scribes", link: "http://dnd5e.wikidot.com/wizard:order-of-scribes"},
	{name: "School of Transmutation", link: "http://dnd5e.wikidot.com/wizard:transmutation"},
	{name: "School of War Magic", link: "http://dnd5e.wikidot.com/wizard:war-magic"},
];
var HomebrewSubclasses = [
	{mainClass: "Monk", name: "Way of the Siren", link: "https://homebrewery.naturalcrit.com/share/0K2krc1LO"},
	{mainClass: "Rogue", name: "Alchemist", link: "https://homebrewery.naturalcrit.com/share/H1m1-auowr"},
	{mainClass: "Wizard", name: "School of Nature", link: "https://homebrewery.naturalcrit.com/share/4Qk5nSceV"},
	{mainClass: "Warlock", name: "The Gambler", link: "https://homebrewery.naturalcrit.com/share/V-Q520LHC"},
	{mainClass: "Fighter", name: "Illusion Warrior", link: "https://homebrewery.naturalcrit.com/share/s2WHWXY11"},
	{mainClass: "Paladin", name: "Oath of Mockery", link: "https://homebrewery.naturalcrit.com/share/veVzAw6Kq"},
	{mainClass: "Paladin", name: "Oath of the Open Sea", link: "http://dnd5e.wikidot.com/paladin:open-sea"},
	{mainClass: "Monk", name: "Way of the Cobalt Soul", link: "http://dnd5e.wikidot.com/monk:cobalt-soul"},
	{mainClass: "Bard", name: "College of the Maestro", link: "http://dnd5e.wikidot.com/bard:maestro"},
	{mainClass: "Fighter", name: "Gunslinger", link: "http://dnd5e.wikidot.com/fighter:gunslinger"},
	{mainClass: "Cleric", name: "Blood Domain", link: "http://dnd5e.wikidot.com/cleric:blood"},
	{mainClass: "", name: "", link: "http://dnd5e.wikidot.com/"}
];

var backgrounds = ["Acolyte", "Anthropologist", "Archaeologist", "Charlatan", "City Watch", "Cloistered Sholar", "Courtier", "Criminal", "Entertainer", "Faceless", "Faction Agent", "Far Traveler", 
	"Folk Hero", "Gladiator", "Guild Artisan", "Guild Merchant", "Haunted One", "House Agent", "Hermit", "Inheritor", "Investigator", "Knight", "Knight of the Order", "Mercenary Veteran", "Noble", "Outlander", 
	"Pirate", "Sage", "Sailor", "Soldier", "Spy", "Urban Bounty Hunter", "Urchin", "Uthgardt Tribe Member", "Waterdhavian Noble", "Grinner", "Volstrucker Agent"];

function myFunction() {
	var race = getRace();
	var raceElem = `<a href='http://dnd5e.wikidot.com/${race.toLowerCase().replace(" ", "-")}' target='_blank'>${race}</a>`;
	var _class = getClass();
	var classElem = `<a href='http://dnd5e.wikidot.com/${_class.toLowerCase().replace(" ", "-")}' target='_blank'>${_class}</a>`;
	var includeSubclass = $("#subclassSwitch")[0].checked;
	var subclass = "";
	if(includeSubclass){
		subclass = getSubclass(_class, $("#HbSwitch")[0].checked);
		classElem += ` (<a href='${subclass.link}' target='_blank'>${subclass.name}</a>)`;
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
	document.getElementById("total").innerHTML = `You are playing a <text style="color: red">${race}</text> <text style="color: green">${_class}</text>${includeSubclass ? ` (<text style="color:darkgreen">${subclass.name}</text>)` : ``}, who has the background of ${combineWord} <text style="color: blue">${background}</text>`;
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
	var list = [];
	switch(_class){
		case "Artificer":
			list = ArtificerSub;
			break;
		case "Barbarian":
			list = BarbarianSub;
			break;
		case "Bard":
			list = BardSub;
			break;
		case "Blood Hunter":
			list = BloodHunterSub;
			break;
		case "Cleric":
			list = ClericSub;
			break;
		case "Druid":
			list = DruidSub;
			break;
		case "Fighter":
			list = FighterSub;
			break;
		case "Monk":
			list = MonkSub;
			break;
		case "Paladin":
			list = PaladinSub;
			break;
		case "Ranger":
			list = RangerSub;
			break;
		case "Rogue":
			list = RogueSub;
			break;
		case "Sorcerer":
			list = SorcererSub;
			break;
		case "Warlock":
			list = WarlockSub;
			break;
		case "Wizard":
			list = WizardSub;
			break;
		default:
			break;
	}
	if(includeHB){
		if(HomebrewSubclasses.filter(f => f.mainClass === _class).length > 0){
			list = list.concat(HomebrewSubclasses.filter(f => f.mainClass === _class).map(hb => ({name: hb.name, link: hb.link})));
		}
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