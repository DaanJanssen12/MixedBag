// let { PDFDocument, rgb, StandardFonts } = PDFLib

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
  $("#download").off("click").click(async function(){
    await downloadFillablePdf();
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
  $("input[name='race']").val($("#character-race", $("#cross-page-data-storage")).val());
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

    const response = await (await fetch('https://api.open5e.com/classes/?format=json')).json();
    var chosenClass = response.results.filter(f => f.name.toLowerCase() == c_class.toLowerCase())[0];
    console.log(chosenClass);
    if(chosenClass !== null){
      for (var i = 0; i < 2; i ++){
        var saveId = `${chosenClass.prof_saving_throws.split(',')[i]}-save-prof`.replace(" ", "");
        var inputElement = $(`input[name='${saveId}']`);
        var name = $(inputElement).attr("name").replace("-prof", "");
        $(inputElement).prop("checked", true);
        ToggleProficiency(name, true);
      }

      pickRandomSkillProficiencies(chosenClass.prof_skills);

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
	});

  //Clear
  $("#cross-page-data-storage").html("");
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
  else if(skills.includes("Choosefourfrom")){
    skills = skills.replace("Choosefourfrom", "");
    amount = 4;
  }
  var skillArr = skills.split(",");

  for (var i = 0; i < amount; i++){
    var skillId = getRandomInt(0, skillArr.length)
    proficiencies.push(skillArr[skillId]);

    skillArr.splice(skillId, 1);
  }

  console.log(proficiencies);
  for (var x = 0; x < amount; x++){
    var skillId = proficiencies[x];
    var profId = `${skillId}-prof`.replace(" ", "");
    console.log(profId);
    var inputElement = $(`input[name='${profId}']`);
    console.log(inputElement);
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
  async function downloadFillablePdf(){
    // Fetch the PDF with form fields
    const formUrl = './assets/DnD_5E_CharacterSheet_FormFillable.pdf'
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())

    // Load a PDF with form fields
    const pdfDoc = await PDFLib.PDFDocument.load(formPdfBytes)

    // Get the form containing all the fields
    const form = pdfDoc.getForm()

    // Get all fields in the PDF by their names
    await PageInputToPdf('CharacterName', 'charname', form);
    await PageInputToPdf('ClassLevel', 'classlevel', form);
    await PageInputToPdf('Race ', 'race', form);
    await PageInputToPdf('Background', 'background', form);

    //Stats
    await PageInputToPdf('STR', 'Strengthscore', form);
    await PageInputToPdf('STRmod', 'Strengthmod', form);
    await PageInputToPdf('DEX', 'Dexterityscore', form);
    await PageInputToPdf('DEXmod ', 'Dexteritymod', form);
    await PageInputToPdf('CON', 'Constitutionscore', form);
    await PageInputToPdf('CONmod', 'Constitutionmod', form);
    await PageInputToPdf('WIS', 'Wisdomscore', form);
    await PageInputToPdf('WISmod', 'Wisdommod', form);
    await PageInputToPdf('INT', 'Intelligencescore', form);
    await PageInputToPdf('INTmod', 'Intelligencemod', form);
    await PageInputToPdf('CHA', 'Charismascore', form);
    await PageInputToPdf('CHamod', 'Charismamod', form);

    //Saving Throws
    await PageInputToPdf('ST Strength', 'Strength-save', form);
    await PageCheckboxToPdf('Check Box 11', 'Strength-save-prof', form);
    await PageInputToPdf('ST Dexterity', 'Dexterity-save', form);
    await PageCheckboxToPdf('Check Box 18', 'Dexterity-save-prof', form);
    await PageInputToPdf('ST Constitution', 'Constitution-save', form);
    await PageCheckboxToPdf('Check Box 19', 'Constitution-save-prof', form);
    await PageInputToPdf('ST Wisdom', 'Wisdom-save', form);
    await PageCheckboxToPdf('Check Box 20', 'Wisdom-save-prof', form);
    await PageInputToPdf('ST Intelligence', 'Intelligence-save', form);
    await PageCheckboxToPdf('Check Box 21', 'Intelligence-save-prof', form);
    await PageInputToPdf('ST Charisma', 'Charisma-save', form);
    await PageCheckboxToPdf('Check Box 22', 'Charisma-save-prof', form);

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    var fileName = `${$(`input[name='charname']`).val()}_${$(`input[name='classlevel']`).val()}.pdf`.replace(" ", "").replace("-", "_");
    // Trigger the browser to download the PDF document
    download(pdfBytes, fileName, "application/pdf");
  }

  async function PageInputToPdf(formInputName, inputName, pdfForm){
    var pageInputVal = $(`input[name='${inputName}']`).val();
    const formField = pdfForm.getTextField(formInputName);
    formField.setText(pageInputVal);
  }

  async function PageCheckboxToPdf(formInputName, inputName, pdfForm){
    var pageInputVal = $(`input[name='${inputName}']`).is(":checked");
    const formField = pdfForm.getCheckBox(formInputName);
    if(pageInputVal){
      formField.check();
    }else{
      formField.uncheck();
    }
  }