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
  })
});

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