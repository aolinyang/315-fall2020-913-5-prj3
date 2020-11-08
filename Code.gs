var props = PropertiesService.getScriptProperties();

function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Run', 'showSidebar')
      .addToUi();
  props.setProperty("skills", "[]");
  props.setProperty("header", "{\"fname\":\"\",\"lname\":\"\",\"email\":\"\",\"phone\":\"\",\"lkacc\":\"\",\"porturl\":\"\"}");
  props.setProperty("workExperience","{\"company\":\"\", \"position\":\"\", \"department\":\"\", \"description\":\"\", \"supervisor\":\"\", \"contactEmail\":\"\" }");
  props.setProperty("education","{\"school\":\"\",\"major\":\"\",\"GPA\":\"\",\"affil\":\"\"}");
  props.setProperty("honor","{\"awardedHonor\":\"\",\"awardedBy\":\"\",\"description\":\"\",\"awardedYear\":\"\", \"awardedType\":\"\"}");
}

function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('Resume Builder');
  DocumentApp.getUi().showSidebar(ui);
}

function putExperienceInfo(comp,pos,desc,dept,supvr,cntemail) {
  var doc = DocumentApp.getActiveDocument();
  var docBody = doc.getBody();
  var displayText1 = "";

  displayText1 = "Most Recent Experience\n\n";
  displayText1 = displayText1 + "company: " + comp + "\n";
  displayText1 = displayText1 + "position: " + pos + "\n";
  displayText1 = displayText1 + "description: " + desc + "\n";
  displayText1 = displayText1 + "department: " + dept + "\n";
  displayText1 = displayText1 + "supervisor: " + supvr + "\n";
  displayText1 = displayText1 + "contactEmail: " + cntemail + "\n\n";
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

// template 1 format
function insertTemplate1(){
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  // http://www.googleappsscript.org/home/create-table-in-google-document-using-apps-script
  // var table_style = {}
  // var table_cell = {}
  // var heading_style = {}
  // table_style[DocumentApp.Attribute.BORDER_COLOR] = "#34ebd5";

  var table = body.appendTable();
  table.setBorderColor("#ffffff");
  // row 1
  var row1 = table.appendTableRow();
  // cell 1
  var cell1 = row1.appendTableCell();
  var heading1 = cell1.appendParagraph("Your Name");
  heading1.setFontFamily("Arial").setFontSize(32).setBold(true).setForegroundColor("#ccccff"); //
  var content1 = cell1.appendParagraph("#header");
  content1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");
  // cell 2
  var cell2 = row1.appendTableCell();


  // row2
  var row2 = table.appendTableRow();
  // cell 3
  var cell3 = row2.appendTableCell();
  var heading3 = cell3.appendParagraph("Education");
  heading3.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#809fff");
  var content3 = cell3.appendParagraph("#education");
  content3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");

  // cell 4
  var cell4 = row2.appendTableCell();
  var content4 = cell4.appendParagraph("Sep 2018 - Jun 2022");
  content4.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");

  // row 3
  var row3 = table.appendTableRow();

  // cell 5
  var cell5 = row3.appendTableCell();
  var heading5 = cell5.appendParagraph("Experience");
  heading5.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#809fff");
  var content5 = cell5.appendParagraph("#experience");
  content5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");

  // cell 6
  var cell6 = row3.appendTableCell();
  var content6 = cell6.appendParagraph("Sep 2018 - Jun 2022");
  content6.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");


  // row 4
  var row4 = table.appendTableRow();

  // cell 7
  var cell7 = row4.appendTableCell();
  var heading7 = cell7.appendParagraph("Skills");
  heading7.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#809fff");
  var content7 = cell7.appendParagraph("#skills");
  content7.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");

  // cell 8
  var cell8 = row4.appendTableCell();
  var content8 = cell8.appendParagraph("Sep 2018 - Jun 2022");
  content8.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");


}


function showEducationDialog() {
  var html = HtmlService.createHtmlOutputFromFile('education')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'education');
}

function showHonorDialog() {
  var html = HtmlService.createHtmlOutputFromFile('honor')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'Honor & Award');
}

function showExperienceDialog() {
  var html = HtmlService.createHtmlOutputFromFile('experience')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'Experience');
}

function showEditDialog() {
  var html = HtmlService.createHtmlOutputFromFile('edit')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'Edit');
}


function showSurveyDialog() {
  var html = HtmlService.createHtmlOutputFromFile('survey')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'survey');
}

function showInstructionsDialog() {
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

function saveHeader(headerJSON) {
  Logger.log("SAVING: " + headerJSON);
  props.setProperty("header", headerJSON);
}

function saveExperience(experienceJSON){
  Logger.log("Saved:" + experienceJSON);
  // console.log("Saved:" + experienceJSON);
  props.setProperty("workExperience",experienceJSON);
}


function getExperience() {
  var exp = props.getProperty("workExperience");
  Logger.log("RETRIEVING: " + exp);
  // console.log("RETRIEVING: " + exp);
  return exp;
}


function getHeader() {
  var header = props.getProperty("header");
  Logger.log("RETRIEVING: " + header);
  return header;
}

function getEducation(){
  var edu = props.getProperty("education");
  return edu;
}

function saveEducation(eduJSON){
  Logger.log("Saved:" + eduJSON);
  props.setProperty("education",eduJSON);
}

function getHonor(){
  var honor = props.getProperty("honor");
  return honor;
}

function saveHonor(honorJSON){
  Logger.log("Saved:" + honorJSON);
  props.setProperty("honor",honorJSON);
}

function saveAllSkills(allSkills) {
  Logger.log("SAVING: " + allSkills);
  props.setProperty("skills", allSkills);
}



function getAllSkills() {
  var skills = props.getProperty("skills");
  Logger.log("RETRIEVING: " + skills);
  return skills;
}
