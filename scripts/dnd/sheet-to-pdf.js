import { SAVING_THROWS, SKILLS } from "../lib/constants.js";

export async function sheetToPdf(){
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

    await PageInputToPdf('HPMax', 'maxhp', form);
    await PageInputToPdf('HPCurrent', 'currenthp', form);
    await PageInputToPdf('AC', 'ac', form);
    await PageInputToPdf('Initiative', 'initiative', form);
    await PageInputToPdf('Speed', 'speed', form);

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
    SAVING_THROWS.forEach(async function(savingThrow){
      await PageInputToPdf(`ST ${savingThrow.name}`, `${savingThrow.name}-save`, form);
      await PageCheckboxToPdf(`Check Box ${savingThrow.checkBoxId}`, `${savingThrow.name}-save-prof`, form);
    });
    
    //Skills
    SKILLS.forEach(async function(skill){
        var inputName = skill.name;
        if(skill.alternativeFormName !== null && skill.alternativeFormName !== undefined){
            inputName = skill.alternativeFormName;
        }
        await PageInputToPdf(`${inputName}`, `${skill.name}`, form);
        await PageCheckboxToPdf(`Check Box ${skill.checkBoxId}`, `${skill.name}-prof`, form);
      });

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