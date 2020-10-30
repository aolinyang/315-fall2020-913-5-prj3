function onInstall(e) {
  popExperience();
  onOpen(e);
}

function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Run', 'showSidebar')
      .addToUi();
}

function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('Resume Builder');
  DocumentApp.getUi().showSidebar(ui);
}

function storeExperienceInfo(comp,pos,desc) {
  var doc = DocumentApp.getActiveDocument();
  var docBody = doc.getBody();
  var displayText1 = "";

  displayText1 = "Most Recent Experience\n";
  displayText1 = displayText1 + "company1:" + comp + "\n";
  displayText1 = displayText1 + "position1:" + pos + "\n";
  displayText1 = displayText1 + "description1:" + desc + "\n\n";
  Logger.log("displayed:"+displayText1);


  var cells = [
  [displayText1,""],
  ["",""],
  ["",""]
  ];

  // Build a table from the array.
  docBody.appendTable(cells);
  // doc.saveAndClose();
}

function popExperience(){
  DocumentApp.getUi().createAddonMenu()
      .addItem('Run', 'showExperienceDialog')
      .addToUi();
}


function popInstructions(){
  DocumentApp.getUi().createAddonMenu()
      .addItem('Run', 'showInstructions')
      .addToUi();
}


function showExperienceDialog() {
  var html = HtmlService.createHtmlOutputFromFile('experience')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'experience');
}

function showInstructions() {
  var html = HtmlService.createHtmlOutputFromFile('instructions')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'instructions');
}

function showHeaderInputDialog() {
  var html = HtmlService.createHtmlOutputFromFile('headerInput')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'Input header information');
}

function showSkillSetDialog() {
  var html = HtmlService.createHtmlOutputFromFile('skillsetInput')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'Input Skills');
}
