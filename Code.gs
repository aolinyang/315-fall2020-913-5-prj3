var props = PropertiesService.getScriptProperties();

function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  DocumentApp.getUi().createAddonMenu()
      .addItem('Run', 'showSidebar')
      .addToUi();
  props.setProperty("skills", "[]");
  props.setProperty("portfolio", "[]");
  props.setProperty("header", "{\"fname\":\"\",\"lname\":\"\",\"email\":\"\",\"phone\":\"\",\"lkacc\":\"\",\"porturl\":\"\"}");
  props.setProperty("workExperience","[]");
  props.setProperty("education","[]");
  props.setProperty("honor","[]");
  props.setProperty("sections","[]");
  props.setProperty("currTemplate","");
}

function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('Resume Builder');
  DocumentApp.getUi().showSidebar(ui);
}

// function putExperienceInfo(comp,pos,desc,dept,supvr,cntemail) {
//   var doc = DocumentApp.getActiveDocument();
//   var docBody = doc.getBody();
//   var displayText1 = "";
//
//   displayText1 = "Most Recent Experience\n\n";
//   displayText1 = displayText1 + "company: " + comp + "\n";
//   displayText1 = displayText1 + "position: " + pos + "\n";
//   displayText1 = displayText1 + "description: " + desc + "\n";
//   displayText1 = displayText1 + "department: " + dept + "\n";
//   displayText1 = displayText1 + "supervisor: " + supvr + "\n";
//   displayText1 = displayText1 + "contactEmail: " + cntemail + "\n\n";
//   Logger.log("displayed:"+displayText1);
//
//
//   var cells = [
//   [displayText1,""],
//   ["",""],
//   ["",""]
//   ];
//
//   // Build a table from the array.
//   docBody.appendTable(cells);
//   // doc.saveAndClose();
// }

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

  var header = JSON.parse(getHeader());
  var cell1 = row1.appendTableCell();
  var heading1 = cell1.appendParagraph(header.fname+" "+ header.lname);
  heading1.setFontFamily("Arial").setFontSize(32).setBold(true).setForegroundColor("#ccccff").setLineSpacing(0);
  var content1 = cell1.appendParagraph("");
  content1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);

  // cell 2

  var cell2 = row1.appendTableCell();


  var content2p1 = cell2.appendParagraph("email:" + header.email );
  content2p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
  var content2p2 = cell2.appendParagraph("phone:" + header.phone);
  content2p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
  var content2p3 = cell2.appendParagraph("linkedin:" + header.lkacc);
  content2p3.setFontFamily("Consolas").setFontSize(8).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
  var content2p4 = cell2.appendParagraph("portfolio:" + header.porturl);
  content2p4.setFontFamily("Consolas").setFontSize(8).setBold(false).setForegroundColor("#000080").setLineSpacing(0);

  // row2
  var row2 = table.appendTableRow();

  // ------------------------------- education -----------------------------

  //cell 3
  var cell3 = row2.appendTableCell();
  var eduList = JSON.parse(getEducation());

  var heading3 = cell3.appendParagraph("Education");
  heading3.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#809fff").setLineSpacing(0);

  // cell 4
  var cell4 = row2.appendTableCell();

  for (var i = 0; i < eduList.length; i++) {
    var edu = eduList[i];
    var content3p1 = cell3.appendParagraph("School: " + edu.school);
    content3p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    var content3p2 = cell3.appendParagraph("Department: " + edu.major);
    content3p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    var content3p3 = cell3.appendParagraph("GPA: " + edu.GPA);
    content3p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    var content3p4 = cell3.appendParagraph("Classification: " + edu.affiliation);
    content3p4.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    cell3.appendParagraph("");

    var content4 = cell4.appendParagraph(edu.startm + " - " + edu.starty + " - " + edu.endm + " - " + edu.endy);
    content4.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    for (var j = 0; j < 4; j++)
      cell4.appendParagraph("");
  }

  // row 3
  var row3 = table.appendTableRow();

  // ------------------------- experience ----------------------------

  // cell 5
  var expList = JSON.parse(getExperience());
  var cell5 = row3.appendTableCell();
  var heading5 = cell5.appendParagraph("Experience");
  heading5.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#809fff").setLineSpacing(0);

  var cell6 = row3.appendTableCell();

  for (var i = 0; i < expList.length; i++) {
    var exp = expList[i];
    var content5p1 = cell5.appendParagraph(exp.company);
    content5p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    var content5p2 = cell5.appendParagraph("Position: " + exp.position);
    content5p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    var content5p3 = cell5.appendParagraph("Department: " + exp.department);
    content5p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    var content5p4 = cell5.appendParagraph("Supervisor: " + exp.supervisor);
    content5p4.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);

    var content5p5 = cell5.appendParagraph("Contact Supervisor: " + exp.contactEmail);
    content5p5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);

    var content5p6 = cell5.appendParagraph(exp.description);
    content5p6.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    cell5.appendParagraph("");

    // cell 6
    var content6 = cell6.appendParagraph(exp.startDate + " - " + exp.endDate);
    content6.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    for (var j = 0; j < 5; j++) {
      cell6.appendParagraph("");
    }
  }
<<<<<<< HEAD


  // cell 6
  var cell6 = row3.appendTableCell();
  var content6 = cell6.appendParagraph(exp.startDate + " - " + exp.endDate);
  content6.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);


=======
 
>>>>>>> main
  // row 4
  var row4 = table.appendTableRow();

  // -------------------------- skills -----------------------

  // cell 7
  var skills = JSON.parse(getAllSkills());
  var cell7 = row4.appendTableCell();
  var heading7 = cell7.appendParagraph("Skills");
  heading7.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#809fff").setLineSpacing(0);
  for (var i = 0; i < skills.length; i++) {
    var content7 = cell7.appendParagraph(skills[i].name + ", proficiency: " + skills[i].level);
    content7.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
  }

  // cell 8
  var cell8 = row4.appendTableCell();
  var content8 = cell8.appendParagraph("#monSkl1 #yearSkl1 - #monSkl2 #yearSkl2");
  content8.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);


  // row 5
  var row5 = table.appendTableRow();

  // ---------------------- honors ---------------------

  // cell 9
  var cell9 = row5.appendTableCell();
  var heading9 = cell9.appendParagraph("Honors");
  heading9.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#809fff").setLineSpacing(0);

  // cell 10
  var cell10 = row5.appendTableCell();

  var honorsList = JSON.parse(getHonor());
  for (var i = 0; i < honorsList.length; i++) {
    var honorInfo = honorsList[i];

    var content9p1 = cell9.appendParagraph("Honor: "+ honorInfo.awardedHonor);
    content9p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);

    var content9p2 = cell9.appendParagraph("Awarded Institution: " + honorInfo.awardedBy);

    content9p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);

    var content9p3 = cell9.appendParagraph("Overview: " + honorInfo.description);
    content9p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
<<<<<<< HEAD

    var content9p5 = cell9.appendParagraph(honorInfo.awardedType+"  |  "+ honorInfo.awardedYear);

=======
  
    var content9p5 = cell9.appendParagraph(honorInfo.awardedType);
  
>>>>>>> main
    content9p5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);

    cell9.appendParagraph("");

    var content10 = cell10.appendParagraph(honorInfo.awardedYear);
    content10.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#000080").setLineSpacing(0);
    for (var j = 0; j < 4; j++) {
      cell10.appendParagraph("");
    }
  }



}

function insertTemplate2() {
  //*************** table setting, please use this table setting otherwise it 's corresponding with the styling of other templates *********
  // the table format & style is already set
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var table = body.appendTable();
  table.setBorderColor("#ffffff");
  // ***********************************************************************************************************

  // row 1, already set up the color and text
  var row1 = table.appendTableRow();
  var cell1 = row1.appendTableCell();
  var heading1 = cell1.appendParagraph("Education");
  // replace this line below with education info
  var content1p1 = cell1.appendParagraph("(education contents, replace this line)...");
  // add more content1pN ...
  //  var content1p2, var content1p3 ...etc

  // row 1, cell2(same row)
  var cell2 = row1.appendTableCell();
  var heading2 = cell2.appendParagraph("Honor & Awards");
  // replace this line below with honor info
  var content2p1 = cell2.appendParagraph("honor content...");
  // add more centent2pN
  // var content2p2, var content2p3 ...etc

  //**************************New row 1 styling *********************
  //styling for regular heading & content on the left column
  // alignment to the right, color set
  heading1.setFontFamily("Arial").setFontSize(18).setBold(true).setForegroundColor("#999966").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setItalic(false).setLineSpacing(0);
  content1p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#404040").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setItalic(true).setLineSpacing(0);


  // styling for regular heading & content on the right column
  // alignment to the left, color set,
  heading2.setFontFamily("Arial").setFontSize(18).setBold(true).setForegroundColor("#2F4F4F").setAlignment(DocumentApp.HorizontalAlignment.LEFT).setItalic(false).setLineSpacing(0);
  content2p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#404040").setAlignment(DocumentApp.HorizontalAlignment.LEFT).setItalic(true).setLineSpacing(0);

  // *****************************************************************

  // row 2, cell3
  var row2 = table.appendTableRow();
  var cell3 = row2.appendTableCell();
  var heading3 = cell3.appendParagraph("Experience");
  var content3p1 = cell3.appendParagraph("experience content1..");
  // add more content
  // var content3p2, var content3p3 ...etc

  // row 2, cell 4, Name(main heading)
  var cell4 = row2.appendTableCell();
  var heading4 = cell4.appendParagraph("#Firstname #Lastname");
  var content4p1 = cell4.appendParagraph("header content1...");
  // add more content..
  // var content4p2, var content4p3... etc

  //**************************New row 2 styling *********************
  //styling for regular heading & content on the left column
  // alignment to the right, color set
  heading3.setFontFamily("Arial").setFontSize(18).setBold(true).setForegroundColor("#2F4F4F").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setItalic(false).setLineSpacing(0);
  content3p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#404040").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setItalic(true).setLineSpacing(0);


  // styling for FIRST NAME LAST NAME & header
  // alignment to the left, color set,
  heading4.setFontFamily("Arial").setFontSize(32).setBold(true).setForegroundColor("#669999").setAlignment(DocumentApp.HorizontalAlignment.LEFT).setItalic(false).setLineSpacing(0);
  content4p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#404040").setAlignment(DocumentApp.HorizontalAlignment.LEFT).setItalic(true).setLineSpacing(0);

  // *****************************************************************

  // row 3
  var row3 = table.appendTableRow();
  var cell5 = row3.appendTableCell();
  var heading5 = cell5.appendParagraph("Skills")
  var content5p1 = cell5.appendParagraph("skill 1...");
  var content5p2 = cell5.appendParagraph("skill 2...");

  //********************** row 3 styling ********************
  // alignment to the right
  heading5.setFontFamily("Arial").setFontSize(18).setBold(true).setForegroundColor("#999966").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setItalic(false).setLineSpacing(0);
  content5p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#404040").setAlignment(DocumentApp.HorizontalAlignment.RIGHT).setItalic(true).setLineSpacing(0);
  // *****************************************************

  // image or leave cell6 empty or some other info
  var cell6 = row3.appendTableCell();



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

  var heading1 = cell1.appendParagraph(headerInfo.fname + " " + headerInfo.lname);

  //var content1p1 = cell1.appendParagraph("");
  var content1p1 = cell1.appendParagraph(headerInfo.email + " | " + headerInfo.phone + " | " + headerInfo.lkacc); //("#header-email | #header-phone | #header-linkedin");
  var content1p2 = cell1.appendParagraph("| "+headerInfo.porturl+" |");
  heading1.setFontFamily("Arial").setFontSize(32).setBold(true).setForegroundColor("#008080").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
  content1p1.setFontFamily("Consolas").setFontSize(10).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
  content1p2.setFontFamily("Consolas").setFontSize(8).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);

  // ------------- education --------------------

  var row2 = table.appendTableRow();
  var cell3 = row2.appendTableCell();
  var eduList = JSON.parse(getEducation());

  var heading3 = cell3.appendParagraph("Education");
  heading3.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#2d8659").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);

  for (var i = 0; i < eduList.length; i++) {
    var edu = eduList[i];
    var content3p1 = cell3.appendParagraph("School: " + edu.school);
    content3p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content3p2 = cell3.appendParagraph("Department: " + edu.major);
    content3p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content3p3 = cell3.appendParagraph("GPA: " + edu.GPA);
    content3p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content3p4 = cell3.appendParagraph("Classification: " + edu.affiliation);
    content3p4.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    cell3.appendParagraph("");
  }


  var row4 = table.appendTableRow();
  var cell4 = row4.appendTableCell();

  // -------------- experience ---------------------

  var expList = JSON.parse(getExperience());
  for (var i = 0; i < expList.length; i++) {
    var exper = expList[i];
    var heading4 = cell4.appendParagraph("Experience");
    heading4.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#2d8659").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content4p1 = cell4.appendParagraph(exper.company);
    content4p1.setFontFamily("Consolas").setFontSize(16).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content4p2 = cell4.appendParagraph("Position: " + exper.position);
    content4p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content4p3 = cell4.appendParagraph("Department: "+ exper.department);
    content4p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content4p4 = cell4.appendParagraph("Supervisor: " + exper.supervisor);
    content4p4.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content4p5 = cell4.appendParagraph("Contact Supervisor: " + exper.contactEmail);
    content4p5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content4p6 = cell4.appendParagraph("Overview: " + exper.description);
    content4p6.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    cell4.appendParagraph("");
  }

  // ----------------- skills

  var row5 = table.appendTableRow();
  var cell5 = row5.appendTableCell();
  var skills = JSON.parse(getAllSkills());
  var heading5 = cell5.appendParagraph("Skills");
  heading5.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#2d8659").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
  // modify to what ever that fits later
  for (var i = 0; i < skills.length; i++) {
    var content5 = cell5.appendParagraph(skills[i].name + ", proficiency: " + skills[i].level);
    content5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
  }

  // var content5 = cell5.appendParagrap("#skill-type" + ", proficiency: " + "#skill proficiency");
  // content5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER);

  // ----------------------------- honors ----------------------------

  var row6 = table.appendTableRow();
  var cell6 = row6.appendTableCell();
  var honorList = JSON.parse(getHonor());
  var heading6 = cell6.appendParagraph("Honor & Awards");
  heading6.setFontFamily("Arial").setFontSize(20).setBold(true).setForegroundColor("#2d8659").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
  for (var i = 0; i < honorList.length; i++) {
    var honorInfo = honorList[i];
    var content6p1 = cell6.appendParagraph("Honor Title: " + honorInfo.awardedHonor);
    content6p1.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content6p2 = cell6.appendParagraph("Institution: " + honorInfo.awardedBy);
    content6p2.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content6p3 = cell6.appendParagraph("Overview: " + honorInfo.description);
    content6p3.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    var content6p5 = cell6.appendParagraph(honorInfo.awardedType + "  |  " + honorInfo.awardedYear);
    content6p5.setFontFamily("Consolas").setFontSize(12).setBold(false).setForegroundColor("#003300").setAlignment(DocumentApp.HorizontalAlignment.CENTER).setLineSpacing(0);
    cell6.appendParagraph("");
  }
}

function showEducationDialog() {
  var html = HtmlService.createHtmlOutputFromFile('education')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'education');
}

function showSectionDialog() {
  var html = HtmlService.createHtmlOutputFromFile("freeSection")
      .setWidth(800)
  .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html,"section");
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

function showPortfolioDialog() {
  var html = HtmlService.createHtmlOutputFromFile('portfolio')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi().showModalDialog(html, 'Image Portfolio');
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

function getSections() {
  var sections = props.getProperty("sections");
  return sections;
}

function saveSections(sec){
  props.setProperty("sections", sec);
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
  Logger.log("RETRIEVING: " + edu);
  return edu;
}

function saveEducation(educationJSON){
  Logger.log("SAVING:" + educationJSON);
  props.setProperty("education",educationJSON);

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

function savePortfolio(images) {
  Logger.log("saving portfolio");
  props.setProperty("portfolio", images);
}

function getCurrTemplate(){
  var currTp = props.getProperty("currTemplate");
  return currTp;
}

function setCurrTemplate(Tp){
  if (Tp != "1" || Tp != "2" || Tp != "3" || Tp != ""){
    DocumentApp.getUi().alert("Template not valid. Set to template 3");
    props.setProperty("currTemplate", "3");
  }
  props.setProperty("currTemplate", Tp);
}
