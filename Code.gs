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
function insertTemplate(){
  var doc = DocumentApp.getActiveDocument();
  var doc_body = doc.getBody();
  // http://www.googleappsscript.org/home/create-table-in-google-document-using-apps-script
  var table_style = {}
  var table_cell = {}
  var heading_style = {}
  table_style[DocumentApp.Attribute.BORDER_COLOR] = "#34ebd5";
  heading_style[DocumentApp.Attribute.HEADING] = 1;
  heading_style[DocumentApp.Attribute.FONT_FAMILY] = COMFORTAA;
  heading_style[DocumentApp.Attribute.BOLD] = true;
  var table = body.appendTable();

  for(var i=0; i<5; i++){
    var tr = table.appendTableRow();

    for(var j=0; j<2; j++){
      var td = tr.appendTableCell('Cell '+i+j);
      //Apply the para style to each paragraph in cell
      var paraInCell = td.getChild(0).asParagraph();
      paraInCell.setAttributes(heading_style);
    }
  }


}


function showEducationDialog() {
  var html = HtmlService.createHtmlOutputFromFile('education')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'education');
}

function showExperienceDialog() {
  var html = HtmlService.createHtmlOutputFromFile('experience')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'experience');
}

function showEditDialog() {
  var html = HtmlService.createHtmlOutputFromFile('edit')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'edit');
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

function saveAllSkills(allSkills) {
  Logger.log("SAVING: " + allSkills);
  props.setProperty("skills", allSkills);
}

function getAllSkills() {
  var skills = props.getProperty("skills");
  Logger.log("RETRIEVING: " + skills);
  return skills;
}
