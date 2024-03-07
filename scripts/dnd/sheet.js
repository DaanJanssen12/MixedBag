$(document).ready(function(){
  var self = this;
  $("input:text.stat").off("keyup").on("keyup", function(){
    var stat = $(this).attr("name");
    var score = $(this).val();
    ChangeModifier(stat, score);
  });
  $("input[name$='prof']").off("change").on("change", function(){
    var name = $(this).attr("name").replace("-prof", "");
    var checked = $(this).is(":checked");
    ToggleProficiency(name, checked);
  });
  checkCrossSiteStorage();
});

async function checkCrossSiteStorage(){
  var c_class = $("#character-class", $("#cross-page-data-storage")).val();
  if(c_class === null || c_class === "" || c_class === undefined){
    return;
  }
  if(c_class.includes("(")){
    c_class = c_class.substring(0, c_class.indexOf(" ("));
  }
  $("input[name='classlevel']").val(`${c_class} - 1`);
  $("input[name='proficiencybonus']").val("+2");
  $("input[name='background']").val($("#character-background", $("#cross-page-data-storage")).val());

  var c_race = $("#character-race", $("#cross-page-data-storage")).val();
  $("input[name='race']").val(c_race);
  var stats = $("#character-stats", $("#cross-page-data-storage")).val();

  var classes = [];
  readTextFile("data/classes.json", async function(data) {
		classes = JSON.parse(data);

    var statCounter = 1;
    stats.split(",").forEach(e => {
      var score = parseInt(e);
      var stat = getStat(classes, c_class, statCounter);
  
      setStatScore(stat, score);
      statCounter++;
    });

    const fetchClassesResponse = await (await fetch('https://api.open5e.com/classes/?format=json')).json();
    var chosenClass = fetchClassesResponse.results.filter(f => f.name.toLowerCase() == c_class.toLowerCase())[0];
    if(chosenClass !== null && chosenClass !== undefined){
      for (var i = 0; i < 2; i ++){
        var saveId = `${chosenClass.prof_saving_throws.split(',')[i]}-save-prof`.replace(" ", "");
        var inputElement = $(`input[name='${saveId}']`);
        var name = $(inputElement).attr("name").replace("-prof", "");
        $(inputElement).prop("checked", true);
        ToggleProficiency(name, true);
      }

      pickRandomSkillProficiencies(chosenClass.prof_skills);
      chooseStartingEquipment(chosenClass.equipment);

      var baseHp  = parseInt(chosenClass.hp_at_1st_level.substring(0, 2));
      var conMod = $("input[name='Constitutionmod']").val();
      var negativeConMod = conMod.includes('-');
      var conModInt = parseInt(conMod.replace("+", "").replace("-",""));
      var hp = baseHp;
      if(negativeConMod)
        hp = hp - conModInt;
      else
        hp = hp + conModInt;

      setInputVal("maxhp", hp);
      setInputVal("currenthp", hp);
    }

    const fetchRacesResponse = await (await fetch('https://api.open5e.com/races/?format=json')).json();
    var chosenRace = fetchRacesResponse.results.filter(f => f.name.toLowerCase() == c_race.toLowerCase())[0];
    if(chosenRace !== null && chosenRace !== undefined){
     handleChosenRace(chosenRace); 
    }
	});

  //Clear
  $("#cross-page-data-storage").html("");
}

async function chooseStartingEquipment(equipment){
  var startingEquipment = [];

  const fetchWeaponsResponse = await (await fetch('https://api.open5e.com/weapons/?format=json')).json();
  var weapons = fetchWeaponsResponse.results;

  var choices = equipment.split("\n*");
  for(var i = 1; i < choices.length; i++){
    var choice = choices[i];
    choice = replaceAll(choice, ' or ', ',');
    var options = 1;
    if(choice.includes("(*c*)")){
      options = 3;
    } else if(choice.includes("(*b*)")){
      options = 2;
    }
    choice = choice.replace("(*c*)", "");
    choice = choice.replace("(*b*)", "");
    choice = choice.replace("(*a*)", "");
    
    var x = getRandomInt(0, options);
    var chosenOption = choice.split(",")[x];
    console.log(chosenOption);

    if(chosenOption.includes(" and a ")){
      startingEquipment.push(chosenOption.split(" and a")[0]);
      startingEquipment.push(capitalizeFirstLetter(chosenOption.split(" and a")[1].trim()));
    }
    else if(chosenOption.includes("weapon"))
    {
      var isSimple = chosenOption.includes("simple");
      var isMartial = chosenOption.includes("martial");
      var isMelee = chosenOption.includes("melee");
      var isRanged = chosenOption.includes("ranged");

      if(chosenOption.includes("two"))
      {
        var w1 = chooseRandomWeapon(weapons, isSimple, isMartial, isMelee, isRanged);
        startingEquipment.push(w1.name);
        var w2 = chooseRandomWeapon(weapons, isSimple, isMartial, isMelee, isRanged);
        startingEquipment.push(w2.name);
      }
      else
      {
        var w1 = chooseRandomWeapon(weapons, isSimple, isMartial, isMelee, isRanged);
        startingEquipment.push(w1.name);
      }
    }
    else
    {
      startingEquipment.push(capitalizeFirstLetter(chosenOption.trim()));
    }
  }
  console.log(startingEquipment);

  var equipmentTextArea = $("textarea", $(".equipment"));
  $(equipmentTextArea).text(startingEquipment.join("\n"));
}

function chooseRandomWeapon(weapons, isSimple, isMartial, isMelee, isRanged){
  var filteredList = weapons;
  if(isSimple){
    filteredList = filteredList.filter(f => f.category.includes("Simple"));
  }else if(isMartial){
    filteredList = filteredList.filter(f => f.category.includes("Martial"));
  }

  if(isMelee){
    filteredList = filteredList.filter(f => f.category.includes("Melee"));
  }else if (isRanged)
  {
    filteredList = filteredList.filter(f => f.category.includes("Ranged"));
  }

  var i = getRandomInt(0, filteredList.length);
  return filteredList[i];
}

function handleChosenRace(chosenRace){
  var speed = chosenRace.speed.walk;
  setInputVal("speed", speed);
  handleRaceAsi(chosenRace.asi);
  if(chosenRace.subraces.length > 0){
    chooseSubRace(chosenRace.subraces);
  }
}

function chooseSubRace(subraces){
  var subRaceIndex = 0;
  if(subraces.length > 1){
    subRaceIndex = getRandomInt(0, subraces.length);
  }

  var subrace = subraces[subRaceIndex];
  if(subrace.asi.length > 0){
    handleRaceAsi(subrace.asi);
  }

  var c_race_name = getInputVal("race");
  c_race_name += ` (${subrace.name})`;
  setInputVal("race", c_race_name);
}

function handleRaceAsi(asi){
  for(var i = 0; i < asi.length; i++){
    var attrIndex = 0;
    
    var attributes = asi[i].attributes;
    if(asi[i].attributes.length === 1 && asi[i].attributes[0] === "Other")
    {
      attributes = ["Strength", "Dexterity", "Constitution", "Wisdom", "Intelligence", "Charisma"];
    }

    if(attributes.length > 1){
      attrIndex = getRandomInt(0, attributes.length);
    }

    var stat = `${attributes[attrIndex]}`;
    var score = parseInt($(`input[name='${stat}score']`).val());
    score = score + asi[i].value;
    setStatScore(stat, score);
  }
}

function pickRandomSkillProficiencies(possibleSkills){
  if(possibleSkills.includes("Animal, Handling"))
  {
    possibleSkills = possibleSkills.replace("Animal, Handling", "Animal Handling")
  }
  var amount = 1;
  var skillArr = [];
  var proficiencies = [];
  var skills = possibleSkills;
  skills = skills.replace("and ", " ");
  skills = replaceAll(skills, " ", "");
  if(skills.includes("Choosetwofrom")){
    skills = skills.replace("Choosetwofrom", "");
    amount = 2;
  }
  else if(skills.includes("Choosetwoskillsfrom")){
    skills = skills.replace("Choosetwoskillsfrom", "");
    amount = 2;
  }
  else if(skills.includes("Choosethreefrom")){
    skills = skills.replace("Choosethreefrom", "");
    amount = 3;
  }
  else if(skills.includes("Choosethreeskillsfrom")){
    skills = skills.replace("Choosethreeskillsfrom", "");
    amount = 3;
  }
  else if(skills.includes("Choosefourfrom")){
    skills = skills.replace("Choosefourfrom", "");
    amount = 4;
  }
  else if(skills.includes("Choosefourskillsfrom")){
    skills = skills.replace("Choosefourskilssfrom", "");
    amount = 4;
  }
  else if(skills.includes("Chooseanythree")){
    amount = 3;
    skills = "Acrobatics,Animal Handling,Arcana,Athletics,Deception,History,Insight,Intimidation,Investigation,Medicine,Nature,Perception,Performance,Persuasion,Religion,Sleight of Hand,Stealth,Survival";
  }
  var skillArr = skills.split(",");

  for (var i = 0; i < amount; i++){
    var skillId = getRandomInt(0, skillArr.length)
    proficiencies.push(skillArr[skillId]);

    skillArr.splice(skillId, 1);
  }

  for (var x = 0; x < amount; x++){
    var skillId = proficiencies[x];
    var profId = `${skillId}-prof`.replace(" -", "-");
    var inputElement = $(`input[name='${profId}']`);
    var name = $(inputElement).attr("name").replace("-prof", "");
    $(inputElement).prop("checked", true);
    ToggleProficiency(name, true);
  }
}

function getInputVal(inputName){
  return $(`input[name='${inputName}']`).val();
}
function setInputVal(inputName, inputVal){
  $(`input[name='${inputName}']`).val(inputVal);  
}

function getStat(classes, className, importanceIndex){
  var c_class = classes.filter(f => f.id.toLowerCase() === className.toLowerCase())[0];
  if(c_class !== null){
    return c_class.stat_destribution[importanceIndex - 1];
  }
  return "";
}

function setStatScore(stat, score){
  $(`input[name='${stat}score']`).val(score);
  ChangeModifier(stat, score);
}

function ChangeModifier(stat, score){
  var modifier = Math.floor((score - 10)/2);
  var modStr = modifier <= 0 ? modifier : "+"+modifier;

  stat = stat.replace("score", "");
  $(`input[name='${stat}mod']`).val(modStr);
  $(`.${stat}-skill`).each(function(){
    var skill = $(this).attr("name");
    skillMod = parseInt(modifier);
    if($(`input[name="${skill}-prof"]`).is(":checked")){
      var profBonus = $("input[name='proficiencybonus']").val().replace("+","");
      skillMod += parseInt(profBonus);
    }
    $(this).val(skillMod <= 0 ? skillMod : "+"+skillMod);
  });
}

function ToggleProficiency(name, checked){
  var val = parseInt($(`input[name='${name}']`).val().replace("+", ""));
  var profBonus = parseInt($("input[name='proficiencybonus']").val().replace("+",""));
  if(checked) {
    val += profBonus;
  }
  else {
    val -= profBonus;
  }
  $(`input[name='${name}']`).val(val <= 0 ? val : "+"+val);
}

function RecalculateSkillProficiencies(){
  var profBonus = parseInt($("input[name='proficiencybonus']").val().replace("+",""));
  $("input[name$='prof']").each(function(){
    if($(this).is(":checked")){

    }
  });
}