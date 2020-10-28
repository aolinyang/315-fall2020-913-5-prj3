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