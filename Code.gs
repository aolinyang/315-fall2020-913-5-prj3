function myFunction() {
  Logger.log("Hello World!");
  Logger.log("Hi!");
  doGet()
}


function getExperienceHTML() {
  url = "https://docs.google.com/document/d/18Vm7BKzr5nkgkxhu92fq4Dk-22c8YxvYzxiDLh0Vl_o/edit"
  var mydoc = DocumentApp.getActiveDocument();
  return HtmlService.createHtmlOutputFromFile('experience');
}

function showHeaderInputDialog() {
  var html = HtmlService.createHtmlOutputFromFile('headerInput')
      .setWidth(800)
      .setHeight(600);
  DocumentApp.getUi()
      .showModalDialog(html, 'Input header information');
}