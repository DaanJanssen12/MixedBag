$(document).ready(function(){
  var self = this;
  var doc = new jsPDF();
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
  $("#download").off("click").on("click", function(){
    const quality = 10 // Higher the better but larger file
    var padding = 10;
    html2canvas(document.querySelector('body'),
        { scale: quality }
    ).then(canvas => {
        // Set Ignore items invisible
        $(".ignore-in-pdf").hide();

        // Get x and y coordinates
        var coordinates = document.getElementsByClassName('charsheet')[0].getBoundingClientRect();
        var x1 = coordinates.left - padding;
        var x2 = coordinates.right + padding;
        var y1 = coordinates.top - padding;
        var y2 = coordinates.bottom + padding;

        // calc the size -- but no larger than the html2canvas size!
        var width = Math.min(canvas.width,Math.abs(x2-x1));
        var height = Math.min(canvas.height,Math.abs(y2-y1));

        // create a new avatarCanvas with the specified size
        var avatarCanvas = document.createElement('canvas');
        avatarCanvas.width=width;
        avatarCanvas.height=height;
        avatarCanvas.id = 'avatarCanvas';

        // put avatarCanvas into document body
        document.body.appendChild(avatarCanvas);

        // use the clipping version of drawImage to draw
        // a clipped portion of html2canvas's canvas onto avatarCanvas
        var avatarCtx = avatarCanvas.getContext('2d');
        avatarCtx.drawImage(canvas,x1,y1,width,height,0,0,width,height);

        //Create PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(avatarCtx.canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);

        var d = new Date();
        var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
        var charName = $("input[name='charname']").val();
        pdf.save(`${charName}_${strDate}.pdf`);

        document.body.removeChild(avatarCanvas);

        // Set Ignore items visible again
        $(".ignore-in-pdf").show();
    });
  });
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

function RecalculateSkillProficiencies(){
  var profBonus = parseInt($("input[name='proficiencybonus']").val().replace("+",""));
  $("input[name$='prof']").each(function(){
    if($(this).is(":checked")){

    }
  });
}