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
  heading1.setFontFamily("Arial").setFontSize(32).setBold(true).setForegroundColor("#ccccff");
  var content1 = cell1.appendParagraph("");
  content1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");
  // cell 2
  var cell2 = row1.appendTableCell();
  var content2p1 = cell2.appendParagraph("email:   #header-email");
  content2p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");
  var content2p2 = cell2.appendParagraph("phone:   #header-phone");
  content2p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");
  var content2p3 = cell2.appendParagraph("linkedin:   #header-linkedin");
  content2p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");
  var content2p4 = cell2.appendParagraph("portfolio:   #header-portfolio");
  content2p4.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");


  // row2
  var row2 = table.appendTableRow();
  // cell 3
  var cell3 = row2.appendTableCell();
  var heading3 = cell3.appendParagraph("Education");
  heading3.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#809fff");

  var content3p1 = cell3.appendParagraph("#education-school ");
  content3p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");
  var content3p2 = cell3.appendParagraph("Major | #education-major");
  content3p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");
  var content3p3 = cell3.appendParagraph("current GPA: #education-gpa");
  content3p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");
  var content3p4 = cell3.appendParagraph("#education-affli");
  content3p4.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");

  // cell 4
  var cell4 = row2.appendTableCell();
  var content4 = cell4.appendParagraph("#monEdu1 #yearEdu1 - #monEdu2 #yearEdu2");
  content4.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");

  // row 3
  var row3 = table.appendTableRow();

  // cell 5
  var exp = JSON.parse(getExperience());
  var cell5 = row3.appendTableCell();
  var heading5 = cell5.appendParagraph("Experience");
  heading5.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#809fff");

  var content5p1 = cell5.appendParagraph(exp.company);
  content5p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");
  var content5p2 = cell5.appendParagraph("Position: " + exp.position);
  content5p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");
  var content5p3 = cell5.appendParagraph("Department: " + exp.department);
  content5p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");
  var content5p4 = cell5.appendParagraph("Supervisor: " + exp.supervisor);
  content5p4.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");

  var content5p5 = cell5.appendParagraph("Contact Supervisor: " + exp.contactEmail);
  content5p5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");

  var content5p6 = cell5.appendParagraph(exp.description);
  content5p6.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");

  // cell 6
  var cell6 = row3.appendTableCell();
  var content6 = cell6.appendParagraph(exp.startDate + " - " + exp.endDate);
  content6.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");


  // row 4
  var row4 = table.appendTableRow();

  // cell 7
  var skills = JSON.parse(getAllSkills());
  var cell7 = row4.appendTableCell();
  var heading7 = cell7.appendParagraph("Skills");
  heading7.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#809fff");
  for (var i = 0; i < skills.length; i++) {
    var content7 = cell7.appendParagraph(skills[i].name + ", proficiency: " + skills[i].level);
    content7.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");
  }

  // cell 8
  var cell8 = row4.appendTableCell();
  var content8 = cell8.appendParagraph("#monSkl1 #yearSkl1 - #monSkl2 #yearSkl2");
  content8.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");


  // row 5
  var row5 = table.appendTableRow();

  // cell 9
  var cell9 = row5.appendTableCell();
  var heading9 = cell9.appendParagraph("Honor");
  var honorInfo = JSON.parse(getHonor());
  heading9.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#809fff");

  var content9p1 = cell9.appendParagraph("Honor: "+ honorInfo.awardedHonor);
  content9p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");

  var content9p2 = cell9.appendParagraph("Awarded Institution: " + honorInfo.awardedBy);
  content9p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");

  var content9p3 = cell9.appendParagraph("Overview: " + honorInfo.description);
  content9p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");

  var content9p5 = cell9.appendParagraph(honorInfo.awardedType + "  |  " + honorInfo.awardedYear);
  content9p5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");

  // cell 10
  var cell10 = row5.appendTableCell();
  var content10 = cell10.appendParagraph(honorInfo.awardedYear);
  content10.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080");


}

function insertTemplate2() {

}

function insertTemplate3() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var table = body.appendTable();
  table.setBorderColor("#ffffff");

  // row 1
  var row1 = table.appendTableRow();
  var cell1 = row1.appendTableCell();
  var headerInfo = JSON.parse(getHeader());
  var heading1 = cell1.appendParagraph("Your Name");
  //var content1p1 = cell1.appendParagraph("");
  var content1p1 = cell1.appendParagraph("#header-email | #header-phone | #header-linkedin");
  var content1p2 = cell1.appendParagraph("| #header-portfolio |");
  heading1.setFontFamily("Arial").setFontSize(32).setBold(true).setForegroundColor("#008080").setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  content1p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  content1p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER);

  //var row2 = table.appendTableRow();
  //var cell2 = row2.appendTableCell();
  //var content2p1 = cell2.appendParagraph("#header-email | #header-phone | #header-linkedin");
  //var content2p2 = cell2.appendParagraph("| #header-portfolio |");
  //content2p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300");
  //content2p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300");

  var row3 = table.appendTableRow();
  var cell3 = row3.appendTableCell();
  var heading3 = cell3.appendParagraph("Education");
  heading3.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#2d8659").setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var content3p1 = cell3.appendParagraph("#education-school" + " | " + "#education-major");
  content3p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var content3p2 = cell3.appendParagraph("GPA: " + "#education-gpa");
  content3p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var content3p3 = cell3.appendParagraph("#education-affli");
  content3p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER);

  var row4 = table.appendTableRow();
  var cell4 = row4.appendTableCell();
  var heading4 = cell4.appendParagraph("Experience");
  heading4.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#2d8659").setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var content4p1 = cell4.appendParagraph("#exp-company");
  content4p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var content4p2 = cell4.appendParagraph("Position: #exp-position");
  content4p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var content4p3 = cell4.appendParagraph("Department: #exp-department");
  content4p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var content4p4 = cell4.appendParagraph("Supervisor: #exp-supervisor");
  content4p4.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var content4p5 = cell4.appendParagraph("Contact Supervisor: #exp-contactEmail");
  content4p5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var content4p6 = cell4.appendParagraph("#exp-description");
  content4p6.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER);



  var row5 = table.appendTableRow();
  var cell5 = row5.appendTableCell();
  var heading5 = cell5.appendParagraph("Skills");
  heading5.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#2d8659").setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  // modify to what ever that fits later
  var content5 = cell5.appendParagraph("#skill-type" + ", proficiency: " + "#skill proficiency");
  content5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER);


  var row6 = table.appendTableRow();
  var cell6 = row6.appendTableCell();
  var heading6 = cell6.appendParagraph("Honor & Awards");
  heading6.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#2d8659").setAlignment(DocumentApp.HorizontalAlignment.CENTER);

  var content6p1 = cell6.appendParagraph("Honor:  #honor-awardedHonor");
  content6p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var content6p2 = cell6.appendParagraph("#honor-awardedBy");
  content6p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var content6p3 = cell6.appendParagraph("#honor-description");
  content6p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  var content6p5 = cell6.appendParagraph("#honor-awardedType  |  #honor-awardedYear");
  content6p5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER);

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

function showDeleteDialog() {
  var html = HtmlService.createHtmlOutputFromFile('delete')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'Delete');
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

function getHeader() {
  var header = props.getProperty("header");
  Logger.log("RETRIEVING: " + header);
  return header;
}

function saveHeader(headerJSON) {
  Logger.log("SAVING: " + headerJSON);
  props.setProperty("header", headerJSON);
}

function getExperience() {
  var exp = props.getProperty("workExperience");
  Logger.log("RETRIEVING: " + exp);
  // console.log("RETRIEVING: " + exp);
  return exp;
}

function saveExperience(experienceJSON){
  Logger.log("SAVING:" + experienceJSON);
  // console.log("Saved:" + experienceJSON);
  props.setProperty("workExperience",experienceJSON);
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

function getAllSkills() {
  var skills = props.getProperty("skills");
  Logger.log("RETRIEVING: " + skills);
  return skills;
}

function saveAllSkills(allSkills) {
  Logger.log("SAVING: " + allSkills);
  props.setProperty("skills", allSkills);
}
