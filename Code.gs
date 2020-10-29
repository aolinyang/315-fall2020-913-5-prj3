function onInstall(e) {
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

function storeExperienceInfo(num,list1,list2) {
  var doc = DocumentApp.getActiveDocument();
  var docBody = doc.getBody();
  var displayText1 = "";
  var displayText2 = "";

  displayText1 = "Most Recent Experience\n";
  displayText1 = displayText1 + "company1:" + list1[0] + "\n";
  displayText1 = displayText1 + "position1:" + list1[1] + "\n";
  displayText1 = displayText1 + "description1:" + list1[2] + "\n\n";
  Logger.log(displayText1);

  if(num === 2){
    displayText2 = "Second Most Recent Experience\n";
    displayText2 = displayText2 + "company2:" + list2[0] + "\n";
    displayText2 = displayText2 + "position2:" + list2[1] + "\n";
    displayText2 = displayText2 + "description2:" + list2[2] + "\n\n";
  }

  Logger.log(displayText2);
  docBody.replaceText("box1", displayText1 + displayText2);
  // doc.saveAndClose();
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
