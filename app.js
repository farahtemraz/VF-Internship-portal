var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();
var bodyparser = require("body-parser");
const { render, name } = require("ejs");
const { json } = require("body-parser");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", function (req, res) {
  res.render("login");
});

app.get("/registration", function (req, res) {
  res.render("registration");
});

app.get("/home", function (req, res) {
  var i = fs.readFileSync("projects.json");
  var projects = JSON.parse(i);
  res.render("home", {projects: projects});
});

app.get("/projectsLog", function (req, res) {
  res.render("projectsLog");
});

app.get("/myProjects", function (req, res) {
  res.render("myProjects");
});

app.get("/viewProjects", function (req, res) {
  res.render("viewProjects");
});

app.get("/editProjects", function (req, res) {
  res.render("editProjects");
});

app.get("/projectsLinks", function (req, res) {
  res.render("projectsLinks");
});

app.get("/projectInfo/:id", function (req, res) {

  var id = req.params.id;

  var i = fs.readFileSync("projects.json");
  var data = JSON.parse(i);
  var result = [];
    
    for(var i = 0; i<data.length;i++){
      if(data[i].projectID == id){
        result.push(data[i]);
      }
    }


  res.render("projectInfo", { result: result });
});

app.get("/editSpecificProject", function (req, res) {
  res.render("editSpecificProject");
});

app.post("/register", function (req, res) {
  var x = { user: req.body.username, password: req.body.password };
  if (!fs.existsSync("users.json")) {
    var users = new Array();
    var y = JSON.stringify(users);
    fs.writeFileSync("users.json", y);
  }
  var i = fs.readFileSync("users.json");
  var data = JSON.parse(i);
  var flag = false;
  for (var i = 0; i < data.length; i++) {
    if (data[i].user == x.user) {
      flag = true;
      res.render("alertRegistration");
      break;
    }
  }
  if (flag == false) {
    data.push(x);
    var y = JSON.stringify(data);
    fs.writeFileSync("users.json", y);
    var i = fs.readFileSync("projects.json");
    var projects = JSON.parse(i);
    res.render("home", {projects: projects});
  }
});

var ms1 = [
  {
    action1: "none",
    deliverDateMs1: "none",
    progress1: "0",
    weightToProject1: "0",
    ao1: "none",
  },
];
var ms2 = [
  {
    action2: "none",
    deliverDateMs2: "none",
    progress2: "0",
    weightToProject2: "0",
    ao2: "none",
  },
];
var ms3 = [
  {
    action3: "none",
    deliverDateMs3: "none",
    progress3: "0",
    weightToProject3: "0",
    ao3: "none",
  },
];
var ms4 = [
  {
    action4: "none",
    deliverDateMs4: "none",
    progress4: "0",
    weightToProject4: "0",
    ao4: "none",
  },
];
var ms5 = [
  {
    action5: "none",
    deliverDateMs5: "none",
    progress5: "0",
    weightToProject5: "0",
    ao5: "none",
  },
];
var ms6 = [
  {
    action6: "none",
    deliverDateMs6: "none",
    progress6: "0",
    weightToProject6: "0",
    ao6: "none",
  },
];
var ms7 = [
  {
    action7: "none",
    deliverDateMs7: "none",
    progress7: "0",
    weightToProject7: "0",
    ao7: "none",
  },
];

var avProgress = "0";

app.post("/projectsLog", function (req, res) {
  var url = "/projectInfo/";
  var id = 1;

  //get id of latest id from json, if empty json start from 1 else increment
  // khaly var x below
  //momken flag wl var x ba3d check el flag

  var jsonExist = -1; //false
  var id = "1";

  if (!fs.existsSync("projects.json")) {
    var projects = new Array();
    var y = JSON.stringify(projects);
    fs.writeFileSync("projects.json", y);
  } else {
    jsonExist = 0; //true
  }

  if (jsonExist == -1) {
    //first project
    id = "1";
  } else {
    //get it from latest item in json
    var i = fs.readFileSync("projects.json");
    var data = JSON.parse(i);
    var largestID = -1;
    for (var i = 0; i < data.length; i++) {
      if(largestID < parseInt(data[i].projectID)){
        largestID = parseInt(data[i].projectID)
      }
    }
    largestID++;
    id = largestID.toString();
  }

  var x = {
    projectID: id,
    projectName: req.body.projectName,
    projectState: req.body.state,
    projectOwner: req.body.projectOwner,
    projectDescription: req.body.projectDescription,
    startDate: req.body.startDate,
    deliveryDate: req.body.deliveryDate,
    Milestone1: ms1,
    Milestone2: ms2,
    Milestone3: ms3,
    Milestone4: ms4,
    Milestone5: ms5,
    Milestone6: ms6,
    Milestone7: ms7,
    ref: url+id,
    averageProgress: avProgress
  }; 

  var i = fs.readFileSync("projects.json");
  var data = JSON.parse(i);

  var projectFound = false;

  for(var i = 0; i < data.length; i++){
    if(data[i].projectName.toLowerCase() == req.body.projectName.toLowerCase()){
      res.render('alertProjectAlreadyExists');
      projectFound = true;
    }
  }
  
  if(projectFound == false){

      data.push(x); 
      var y = JSON.stringify(data);
      fs.writeFileSync("projects.json", y);
    
      res.render("alertProjectAdded");
  }
});

app.post("/myProjects", function (req, res) {
  var i = fs.readFileSync("projects.json");
  var data = JSON.parse(i);
  var ms1DataP1 = data[0].Milestone1;

  res.render("projectsLinks", { data: data });
});

app.post("/edit", function (req, res) {
  var i = fs.readFileSync("projects.json");
  var data = JSON.parse(i);

  res.render("editProjects", { data: data });
});

var detailsOfProjectToEdit = [];
var nameOfProjectToEdit = "";


app.post("/findProject", function (req, res) {

  nameOfProjectToEdit = req.body.projectToEdit;

  var i = fs.readFileSync("projects.json");
  var data = JSON.parse(i);

  var projectFound = false;

  for(var i = 0; i < data.length; i++){
    if(data[i].projectName.toLowerCase() == nameOfProjectToEdit.toLowerCase()){
      detailsOfProjectToEdit.push(data[i]);
      projectFound = true;
  
    }
  }

  if(projectFound){
    res.render("editSpecificProject", {detailsOfProjectToEdit: detailsOfProjectToEdit});
  }
  else{
    res.render("alertProjectNotFound");
  }
  
});

app.post("/editedAttributes", function (req, res) {

  var editedState = req.body.editedState;
  
  var editedMs1Action = req.body.editedMs1Action;
  var editedMs1DeliverDate = req.body.editedMs1DeliverDate;
  var editedMs1Progress = req.body.editedMs1Progress;
  var editedMs1Weight = req.body.editedMs1Weight;
  var editedMs1AO = req.body.editedMs1AO;

  var editedMs2Action = req.body.editedMs2Action;
  var editedMs2DeliverDate = req.body.editedMs2DeliverDate;
  var editedMs2Progress = req.body.editedMs2Progress;
  var editedMs2Weight = req.body.editedMs2Weight;
  var editedMs2AO = req.body.editedMs2AO;
  
  var editedMs3Action = req.body.editedMs3Action;
  var editedMs3DeliverDate = req.body.editedMs3DeliverDate;
  var editedMs3Progress = req.body.editedMs3Progress;
  var editedMs3Weight = req.body.editedMs3Weight;
  var editedMs3AO = req.body.editedMs3AO;

  var editedMs4Action = req.body.editedMs4Action;
  var editedMs4DeliverDate = req.body.editedMs4DeliverDate;
  var editedMs4Progress = req.body.editedMs4Progress;
  var editedMs4Weight = req.body.editedMs4Weight;
  var editedMs4AO = req.body.editedMs4AO;

  var editedMs5Action = req.body.editedMs5Action;
  var editedMs5DeliverDate = req.body.editedMs5DeliverDate;
  var editedMs5Progress = req.body.editedMs5Progress;
  var editedMs5Weight = req.body.editedMs5Weight;
  var editedMs5AO = req.body.editedMs5AO;

  var editedMs6Action = req.body.editedMs6Action;
  var editedMs6DeliverDate = req.body.editedMs6DeliverDate;
  var editedMs6Progress = req.body.editedMs6Progress;
  var editedMs6Weight = req.body.editedMs6Weight;
  var editedMs6AO = req.body.editedMs6AO;

  var editedMs7Action = req.body.editedMs7Action;
  var editedMs7DeliverDate = req.body.editedMs7DeliverDate;
  var editedMs7Progress = req.body.editedMs7Progress;
  var editedMs7Weight = req.body.editedMs7Weight;
  var editedMs7AO = req.body.editedMs7AO;

  var recalculatedAvgProgress = 0;

  var i = fs.readFileSync("projects.json");
  var data = JSON.parse(i);

  var ms1Weight = 0;
  var ms2Weight = 0;
  var ms3Weight = 0;
  var ms4Weight = 0;
  var ms5Weight = 0;
  var ms6Weight = 0;
  var ms7Weight = 0;
  var totalWeight = 0;

  for(var i = 0; i < data.length; i++){
    if(data[i].projectName.toLowerCase() == nameOfProjectToEdit.toLowerCase()){ //to find desired project to edit
      
      //1

      if(editedState != ""){
        data[i].projectState = editedState;
      }

      //2

      if(editedMs1Action != ""){
        data[i].Milestone1[0].action1 = editedMs1Action;
      }

      //3

      if(editedMs1DeliverDate != ""){
        data[i].Milestone1[0].deliverDateMs1 = editedMs1DeliverDate;
      }

      //4

      if(editedMs1Progress != ""){
        if(isNaN(editedMs1Progress)){
          res.render("alertNotANumber");
        }
        else{
          data[i].Milestone1[0].progress1 = editedMs1Progress;
        }
        
      }

      //5

      if(editedMs1Weight != ""){
        if(isNaN(editedMs1Weight)){
          res.render("alertNotANumber");
        }
        else{
          data[i].Milestone1[0].weightToProject1 = editedMs1Weight;
        }
      }

      //6

      if(editedMs1AO != ""){
        data[i].Milestone1[0].ao1 = editedMs1AO;
      }

      //7

      if(editedMs2Action != ""){
        data[i].Milestone2[0].action2 = editedMs2Action;
      }

      //8

      if(editedMs2DeliverDate != ""){
        data[i].Milestone2[0].deliverDateMs2 = editedMs2DeliverDate;
      }

      //9

      if(editedMs2Progress != ""){
        if(isNaN(editedMs2Progress)){
          res.render("alertNotANumber");
        }
        else{
          data[i].Milestone2[0].progress2 = editedMs2Progress;
        }
      }

      //10

      if(editedMs2Weight != ""){
        if(isNaN(editedMs2Weight)){
          res.render("alertNotANumber");
        }
        else{
          data[i].Milestone2[0].weightToProject2 = editedMs2Weight;
        }
        
      }

      //11

      if(editedMs2AO != ""){
        data[i].Milestone2[0].ao2 = editedMs2AO;
      }

      //12

      if(editedMs3Action != ""){
        data[i].Milestone3[0].action3 = editedMs3Action;
      }

      //13

      if(editedMs3DeliverDate != ""){
        data[i].Milestone3[0].deliverDateMs3 = editedMs3DeliverDate;
      }

      //14

      if(editedMs3Progress != ""){
        if(isNaN(editedMs3Progress)){
          res.render("alertNotANumber");
        }
        else{
          data[i].Milestone3[0].progress3 = editedMs3Progress;
        }
      }

      //15

      if(editedMs3Weight != ""){
        if(isNaN(editedMs3Weight)){
          res.render("alertNotANumber");
        }
        else{
          data[i].Milestone3[0].weightToProject3 = editedMs3Weight;
        }
      }

      //16

      if(editedMs3AO != ""){
        data[i].Milestone3[0].ao3 = editedMs3AO;
      }

      //17

      if(editedMs4Action != ""){
        data[i].Milestone4[0].action4 = editedMs4Action;
      }

      //18

      if(editedMs4DeliverDate != ""){
        data[i].Milestone4[0].deliverDateMs4 = editedMs4DeliverDate;
      }

      //19

      if(editedMs4Progress != ""){
        if(isNaN(editedMs4Progress)){
          res.render("alertNotANumber");
        }
        else{
          data[i].Milestone4[0].progress4 = editedMs4Progress;
        }
      }

      //20

      if(editedMs4Weight != ""){
        if(isNaN(editedMs4Weight)){
          res.render("alertNotANumber");
        }
        else{
          data[i].Milestone4[0].weightToProject4 = editedMs4Weight;
        }
      }

      //21

      if(editedMs4AO != ""){
        data[i].Milestone4[0].ao4 = editedMs4AO;
      }

      //22

      if(editedMs5Action != ""){
        data[i].Milestone5[0].action5 = editedMs5Action;
      }

      //23

      if(editedMs5DeliverDate != ""){
        data[i].Milestone5[0].deliverDateMs5 = editedMs5DeliverDate;
      }

      //24

      if(editedMs5Progress != ""){
        if(isNaN(editedMs5Progress)){
          res.render("alertNotANumber");
        }
        else{
          data[i].Milestone5[0].progress5 = editedMs5Progress;
        }
      }

      //25

      if(editedMs5Weight != ""){
        if(isNaN(editedMs5Weight)){
          res.render("alertNotANumber");
        }
        else{
          data[i].Milestone5[0].weightToProject5 = editedMs5Weight;
        }
      }

      //26

      if(editedMs5AO != ""){
        data[i].Milestone5[0].ao5 = editedMs5AO;
      }

      //27

      if(editedMs6Action != ""){
        data[i].Milestone6[0].action6 = editedMs6Action;
      }

      //28

      if(editedMs6DeliverDate != ""){
        data[i].Milestone6[0].deliverDateMs6 = editedMs6DeliverDate;
      }

      //29

      if(editedMs6Progress != ""){
        if(isNaN(editedMs6Progress)){
          res.render("alertNotANumber");
        }
        else{
          data[i].Milestone6[0].progress6 = editedMs6Progress;
        }
      }

      //30

      if(editedMs6Weight != ""){
        if(isNaN(editedMs6Weight)){
          res.render("alertNotANumber");
        }
        else{
          data[i].Milestone6[0].weightToProject6 = editedMs6Weight;
        }
      }

      //31

      if(editedMs6AO != ""){
        data[i].Milestone6[0].ao6 = editedMs6AO;
      }

       //32

       if(editedMs7Action != ""){
        data[i].Milestone7[0].action7 = editedMs7Action;
      }

      //33

      if(editedMs7DeliverDate != ""){
        data[i].Milestone7[0].deliverDateMs7 = editedMs7DeliverDate;
      }

      //34

      if(editedMs7Progress != ""){
        if(isNaN(editedMs7Progress)){
          res.render("alertNotANumber");
        }
        else{
          data[i].Milestone7[0].progress7 = editedMs7Progress;
        }
      }

      //35

      if(editedMs7Weight != ""){
        if(isNaN(editedMs7Weight)){
          res.render("alertNotANumber");
        }
        else{
          data[i].Milestone7[0].weightToProject7 = editedMs7Weight;
        }
      }

      //36

      if(editedMs7AO != ""){
        data[i].Milestone7[0].ao7 = editedMs7AO;
      }

      //recalculating average progress of project

      ms1Progress = parseInt(data[i].Milestone1[0].progress1) / 100;
      ms2Progress = parseInt(data[i].Milestone2[0].progress2) / 100;
      ms3Progress = parseInt(data[i].Milestone3[0].progress3) / 100;
      ms4Progress = parseInt(data[i].Milestone4[0].progress4) / 100;
      ms5Progress = parseInt(data[i].Milestone5[0].progress5) / 100;
      ms6Progress = parseInt(data[i].Milestone6[0].progress6) / 100;
      ms7Progress = parseInt(data[i].Milestone7[0].progress7) / 100;

      ms1Weight = parseInt(data[i].Milestone1[0].weightToProject1) / 100;
      ms2Weight = parseInt(data[i].Milestone2[0].weightToProject2) / 100;
      ms3Weight = parseInt(data[i].Milestone3[0].weightToProject3) / 100;
      ms4Weight = parseInt(data[i].Milestone4[0].weightToProject4) / 100;
      ms5Weight = parseInt(data[i].Milestone5[0].weightToProject5) / 100;
      ms6Weight = parseInt(data[i].Milestone6[0].weightToProject6) / 100;
      ms7Weight = parseInt(data[i].Milestone7[0].weightToProject7) / 100;

      recalculatedAvgProgress = ((ms1Progress * ms1Weight) + (ms2Progress * ms2Weight) + 
      (ms3Progress * ms3Weight) + (ms4Progress * ms4Weight) + (ms5Progress * ms5Weight) + 
      (ms6Progress * ms6Weight) + (ms7Progress * ms7Weight)) * 100;

      recalculatedAvgProgress = recalculatedAvgProgress.toFixed(0);

      data[i].averageProgress = recalculatedAvgProgress;

      totalWeight = ms1Weight + ms2Weight + ms3Weight + ms4Weight + ms5Weight + ms6Weight + ms7Weight

    }
  }

  if(totalWeight > 1){
    res.render("alertWeightExceeded");
  }
  else if(recalculatedAvgProgress < 100 && editedState == "delivered"){
    res.render("alertNotCompletedYet");
  }
  else{
    var y = JSON.stringify(data);
    fs.writeFileSync("projects.json", y);
  
    res.render("alertProjectEdited");
  }
});

app.post("/", function (req, res) {
  var i = fs.readFileSync("projects.json");
  var projects = JSON.parse(i);
  var x = { user: req.body.username, password: req.body.password };
  var y = fs.readFileSync("users.json");
  var data = JSON.parse(y);
  var userexists = false;
  for (var i = 0; i < data.length; i++) {
    if (data[i].user == x.user) {
      userexists = true;
      if (data[i].password == x.password) {
        res.render("home", {projects: projects});
        break;
      } else {
        res.render("alertPassword");
      }
    }
  }
  if (userexists == false) {
    res.render("alertLoginUsername");
  }
});


// TENDERS

app.get("/myTenders", function (req, res) {
  res.render("myTenders");
});

app.get("/tendersLog", function (req, res) {
  res.render("tendersLog");
});

app.get("/tendersLinks", function (req, res) {
  res.render("tendersLinks");
});

app.get("/tendersSummary", function (req, res) {
  var i = fs.readFileSync("tenders.json");
  var tenders = JSON.parse(i);
  res.render("tendersSummary", {tenders: tenders});
});

app.get("/tenderInfo/:id", function (req, res) {

  var id = req.params.id;

  var i = fs.readFileSync("tenders.json");
  var data = JSON.parse(i);
  var result = [];
    
    for(var i = 0; i<data.length;i++){
      if(data[i].tenderID == id){
        result.push(data[i]);
      }
    }


  res.render("tenderInfo", { result: result });
});

var ms1 = [
  {
    action1: "none",
    deliverDateMs1: "none",
    progress1: "0",
    weightToProject1: "0",
    ao1: "none",
  },
];
var ms2 = [
  {
    action2: "none",
    deliverDateMs2: "none",
    progress2: "0",
    weightToProject2: "0",
    ao2: "none",
  },
];
var ms3 = [
  {
    action3: "none",
    deliverDateMs3: "none",
    progress3: "0",
    weightToProject3: "0",
    ao3: "none",
  },
];
var ms4 = [
  {
    action4: "none",
    deliverDateMs4: "none",
    progress4: "0",
    weightToProject4: "0",
    ao4: "none",
  },
];
var ms5 = [
  {
    action5: "none",
    deliverDateMs5: "none",
    progress5: "0",
    weightToProject5: "0",
    ao5: "none",
  },
];
var ms6 = [
  {
    action6: "none",
    deliverDateMs6: "none",
    progress6: "0",
    weightToProject6: "0",
    ao6: "none",
  },
];
var ms7 = [
  {
    action7: "none",
    deliverDateMs7: "none",
    progress7: "0",
    weightToProject7: "0",
    ao7: "none",
  },
];
var ms8 = [
  {
    action8: "none",
    deliverDateMs8: "none",
    progress8: "0",
    weightToProject8: "0",
    ao8: "none",
  },
];
var ms9 = [
  {
    action9: "none",
    deliverDateMs9: "none",
    progress9: "0",
    weightToProject9: "0",
    ao9: "none",
  },
];
var ms10 = [
  {
    action10: "none",
    deliverDateMs10: "none",
    progress10: "0",
    weightToProject10: "0",
    ao10: "none",
  },
];
var ms11 = [
  {
    action11: "none",
    deliverDateMs11: "none",
    progress11: "0",
    weightToProject11: "0",
    ao11: "none",
  },
];
var ms12 = [
  {
    action12: "none",
    deliverDateMs12: "none",
    progress12: "0",
    weightToProject12: "0",
    ao12: "none",
  },
];
var ms13 = [
  {
    action13: "none",
    deliverDateMs13: "none",
    progress13: "0",
    weightToProject13: "0",
    ao13: "none",
  },
];
var ms14 = [
  {
    action14: "none",
    deliverDateMs14: "none",
    progress14: "0",
    weightToProject14: "0",
    ao14: "none",
  },
];
var ms15 = [
  {
    action15: "none",
    deliverDateMs15: "none",
    progress15: "0",
    weightToProject15: "0",
    ao15: "none",
  },
];
var ms16 = [
  {
    action16: "none",
    deliverDateMs16: "none",
    progress16: "0",
    weightToProject16: "0",
    ao16: "none",
  },
];
var ms17 = [
  {
    action17: "none",
    deliverDateMs17: "none",
    progress17: "0",
    weightToProject17: "0",
    ao17: "none",
  },
];
var ms18 = [
  {
    action18: "none",
    deliverDateMs18: "none",
    progress18: "0",
    weightToProject18: "0",
    ao18: "none",
  },
];

var tenderAvgProgress = 0;

app.post("/tendersLog", function (req, res) {
  var url = "/tenderInfo/";
  var id = 1;

  var jsonExist = -1; //false
  var id = "1";

  if (!fs.existsSync("tenders.json")) {
    var tenders = new Array();
    var y = JSON.stringify(tenders);
    fs.writeFileSync("tenders.json", y);
  } else {
    jsonExist = 0; //true
  }

  if (jsonExist == -1) {
    //first project
    id = "1";
  } else {
    //get it from latest item in json
    var i = fs.readFileSync("tenders.json");
    var data = JSON.parse(i);
    var largestID = -1;
    for (var i = 0; i < data.length; i++) {
      if(largestID < parseInt(data[i].tenderID)){
        largestID = parseInt(data[i].tenderID)
      }
    }
    largestID++;
    id = largestID.toString();
  }

  var x = {
    tenderID: id,
    tenderName: req.body.tenderName,
    tenderOwner: req.body.tenderOwner,
    tenderDescription: req.body.tenderDescription,
    submissionDate: req.body.submissionDate,
    Milestone1: ms1,
    Milestone2: ms2,
    Milestone3: ms3,
    Milestone4: ms4,
    Milestone5: ms5,
    Milestone6: ms6,
    Milestone7: ms7,
    Milestone8: ms8,
    Milestone9: ms9,
    Milestone10: ms10,
    Milestone11: ms11,
    Milestone12: ms12,
    Milestone13: ms13,
    Milestone14: ms14,
    Milestone15: ms15,
    Milestone16: ms16,
    Milestone17: ms17,
    Milestone18: ms18,
    ref: url+id,
    averageProgress: tenderAvgProgress
  }; 

  var i = fs.readFileSync("tenders.json");
  var data = JSON.parse(i);

  var tenderFound = false;

  for(var i = 0; i < data.length; i++){
    if(data[i].tenderName.toLowerCase() == req.body.tenderName.toLowerCase()){
      res.render('alertTenderAlreadyExists');
      tenderFound = true;
    }
  }
  
  if(tenderFound == false){

      data.push(x); 
      var y = JSON.stringify(data);
      fs.writeFileSync("tenders.json", y);
    
      res.render("alertTenderAdded");
  }
});

app.post("/myTenders", function (req, res) {
  var i = fs.readFileSync("tenders.json");
  var data = JSON.parse(i);

  res.render("tendersLinks", { data: data });
});

app.post("/editTender", function (req, res) {
  var i = fs.readFileSync("tenders.json");
  var data = JSON.parse(i);

  res.render("editTenders", { data: data });
});

var detailsOfTenderToEdit = [];
var nameOfProjectToEdit = "";


app.post("/findTender", function (req, res) {

  nameOfTenderToEdit = req.body.tenderToEdit;

  var i = fs.readFileSync("tenders.json");
  var data = JSON.parse(i);

  var tenderFound = false;

  for(var i = 0; i < data.length; i++){
    if(data[i].tenderName.toLowerCase() == nameOfTenderToEdit.toLowerCase()){
      detailsOfTenderToEdit.push(data[i]);
      tenderFound = true;
  
    }
  }

  if(tenderFound){
    res.render("editSpecificTender", {detailsOfTenderToEdit: detailsOfTenderToEdit});
  }
  else{
    res.render("alertTenderNotFound");
  }
  
});


app.post("/editedAttributesTender", function (req, res) {
  
  var editedMs1Action = req.body.editedMs1Action;
  var editedMs1DeliverDate = req.body.editedMs1DeliverDate;
  var editedMs1Progress = req.body.editedMs1Progress;
  var editedMs1Weight = req.body.editedMs1Weight;
  var editedMs1AO = req.body.editedMs1AO;

  var editedMs2Action = req.body.editedMs2Action;
  var editedMs2DeliverDate = req.body.editedMs2DeliverDate;
  var editedMs2Progress = req.body.editedMs2Progress;
  var editedMs2Weight = req.body.editedMs2Weight;
  var editedMs2AO = req.body.editedMs2AO;
  
  var editedMs3Action = req.body.editedMs3Action;
  var editedMs3DeliverDate = req.body.editedMs3DeliverDate;
  var editedMs3Progress = req.body.editedMs3Progress;
  var editedMs3Weight = req.body.editedMs3Weight;
  var editedMs3AO = req.body.editedMs3AO;

  var editedMs4Action = req.body.editedMs4Action;
  var editedMs4DeliverDate = req.body.editedMs4DeliverDate;
  var editedMs4Progress = req.body.editedMs4Progress;
  var editedMs4Weight = req.body.editedMs4Weight;
  var editedMs4AO = req.body.editedMs4AO;

  var editedMs5Action = req.body.editedMs5Action;
  var editedMs5DeliverDate = req.body.editedMs5DeliverDate;
  var editedMs5Progress = req.body.editedMs5Progress;
  var editedMs5Weight = req.body.editedMs5Weight;
  var editedMs5AO = req.body.editedMs5AO;

  var editedMs6Action = req.body.editedMs6Action;
  var editedMs6DeliverDate = req.body.editedMs6DeliverDate;
  var editedMs6Progress = req.body.editedMs6Progress;
  var editedMs6Weight = req.body.editedMs6Weight;
  var editedMs6AO = req.body.editedMs6AO;

  var editedMs7Action = req.body.editedMs7Action;
  var editedMs7DeliverDate = req.body.editedMs7DeliverDate;
  var editedMs7Progress = req.body.editedMs7Progress;
  var editedMs7Weight = req.body.editedMs7Weight;
  var editedMs7AO = req.body.editedMs7AO;

  var editedMs8Action = req.body.editedMs8Action;
  var editedMs8DeliverDate = req.body.editedMs8DeliverDate;
  var editedMs8Progress = req.body.editedMs8Progress;
  var editedMs8Weight = req.body.editedMs8Weight;
  var editedMs8AO = req.body.editedMs8AO;

  var editedMs9Action = req.body.editedMs9Action;
  var editedMs9DeliverDate = req.body.editedMs9DeliverDate;
  var editedMs9Progress = req.body.editedMs9Progress;
  var editedMs9Weight = req.body.editedMs9Weight;
  var editedMs9AO = req.body.editedMs9AO;

  var editedMs10Action = req.body.editedMs10Action;
  var editedMs10DeliverDate = req.body.editedMs10DeliverDate;
  var editedMs10Progress = req.body.editedMs10Progress;
  var editedMs10Weight = req.body.editedMs10Weight;
  var editedMs10AO = req.body.editedMs10AO;

  var editedMs11Action = req.body.editedMs11Action;
  var editedMs11DeliverDate = req.body.editedMs11DeliverDate;
  var editedMs11Progress = req.body.editedMs11Progress;
  var editedMs11Weight = req.body.editedMs11Weight;
  var editedMs11AO = req.body.editedMs11AO;

  var editedMs12Action = req.body.editedMs12Action;
  var editedMs12DeliverDate = req.body.editedMs12DeliverDate;
  var editedMs12Progress = req.body.editedMs12Progress;
  var editedMs12Weight = req.body.editedMs12Weight;
  var editedMs12AO = req.body.editedMs12AO;

  var editedMs13Action = req.body.editedMs13Action;
  var editedMs13DeliverDate = req.body.editedMs13DeliverDate;
  var editedMs13Progress = req.body.editedMs13Progress;
  var editedMs13Weight = req.body.editedMs13Weight;
  var editedMs13AO = req.body.editedMs13AO;

  var editedMs14Action = req.body.editedMs14Action;
  var editedMs14DeliverDate = req.body.editedMs14DeliverDate;
  var editedMs14Progress = req.body.editedMs14Progress;
  var editedMs14Weight = req.body.editedMs14Weight;
  var editedMs14AO = req.body.editedMs14AO;

  var editedMs15Action = req.body.editedMs15Action;
  var editedMs15DeliverDate = req.body.editedMs15DeliverDate;
  var editedMs15Progress = req.body.editedMs15Progress;
  var editedMs15Weight = req.body.editedMs15Weight;
  var editedMs15AO = req.body.editedMs15AO;

  var editedMs16Action = req.body.editedMs16Action;
  var editedMs16DeliverDate = req.body.editedMs16DeliverDate;
  var editedMs16Progress = req.body.editedMs16Progress;
  var editedMs16Weight = req.body.editedMs16Weight;
  var editedMs16AO = req.body.editedMs16AO;

  var editedMs17Action = req.body.editedMs17Action;
  var editedMs17DeliverDate = req.body.editedMs17DeliverDate;
  var editedMs17Progress = req.body.editedMs17Progress;
  var editedMs17Weight = req.body.editedMs17Weight;
  var editedMs17AO = req.body.editedMs17AO;

  var editedMs18Action = req.body.editedMs18Action;
  var editedMs18DeliverDate = req.body.editedMs18DeliverDate;
  var editedMs18Progress = req.body.editedMs18Progress;
  var editedMs18Weight = req.body.editedMs18Weight;
  var editedMs18AO = req.body.editedMs18AO;

  var recalculatedAvgProgress = 0;

  var i = fs.readFileSync("tenders.json");
  var data = JSON.parse(i);

  var ms1Weight = 0;
  var ms2Weight = 0;
  var ms3Weight = 0;
  var ms4Weight = 0;
  var ms5Weight = 0;
  var ms6Weight = 0;
  var ms7Weight = 0;
  var ms8Weight = 0;
  var ms9Weight = 0;
  var ms10Weight = 0;
  var ms11Weight = 0;
  var ms12Weight = 0;
  var ms13Weight = 0;
  var ms14Weight = 0;
  var ms15Weight = 0;
  var ms16Weight = 0;
  var ms17Weight = 0;
  var ms18Weight = 0;
  var totalWeight = 0;

  for(var i = 0; i < data.length; i++){
    if(data[i].tenderName.toLowerCase() == nameOfTenderToEdit.toLowerCase()){ //to find desired project to edit
      
      //2

      if(editedMs1Action != ""){
        data[i].Milestone1[0].action1 = editedMs1Action;
      }

      //3

      if(editedMs1DeliverDate != ""){
        data[i].Milestone1[0].deliverDateMs1 = editedMs1DeliverDate;
      }

      //4

      if(editedMs1Progress != ""){
        if(isNaN(editedMs1Progress)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone1[0].progress1 = editedMs1Progress;
        }
        
      }

      //5

      if(editedMs1Weight != ""){
        if(isNaN(editedMs1Weight)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone1[0].weightToProject1 = editedMs1Weight;
        }
      }

      //6

      if(editedMs1AO != ""){
        data[i].Milestone1[0].ao1 = editedMs1AO;
      }

      //7

      if(editedMs2Action != ""){
        data[i].Milestone2[0].action2 = editedMs2Action;
      }

      //8

      if(editedMs2DeliverDate != ""){
        data[i].Milestone2[0].deliverDateMs2 = editedMs2DeliverDate;
      }

      //9

      if(editedMs2Progress != ""){
        if(isNaN(editedMs2Progress)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone2[0].progress2 = editedMs2Progress;
        }
      }

      //10

      if(editedMs2Weight != ""){
        if(isNaN(editedMs2Weight)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone2[0].weightToProject2 = editedMs2Weight;
        }
        
      }

      //11

      if(editedMs2AO != ""){
        data[i].Milestone2[0].ao2 = editedMs2AO;
      }

      //12

      if(editedMs3Action != ""){
        data[i].Milestone3[0].action3 = editedMs3Action;
      }

      //13

      if(editedMs3DeliverDate != ""){
        data[i].Milestone3[0].deliverDateMs3 = editedMs3DeliverDate;
      }

      //14

      if(editedMs3Progress != ""){
        if(isNaN(editedMs3Progress)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone3[0].progress3 = editedMs3Progress;
        }
      }

      //15

      if(editedMs3Weight != ""){
        if(isNaN(editedMs3Weight)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone3[0].weightToProject3 = editedMs3Weight;
        }
      }

      //16

      if(editedMs3AO != ""){
        data[i].Milestone3[0].ao3 = editedMs3AO;
      }

      //17

      if(editedMs4Action != ""){
        data[i].Milestone4[0].action4 = editedMs4Action;
      }

      //18

      if(editedMs4DeliverDate != ""){
        data[i].Milestone4[0].deliverDateMs4 = editedMs4DeliverDate;
      }

      //19

      if(editedMs4Progress != ""){
        if(isNaN(editedMs4Progress)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone4[0].progress4 = editedMs4Progress;
        }
      }

      //20

      if(editedMs4Weight != ""){
        if(isNaN(editedMs4Weight)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone4[0].weightToProject4 = editedMs4Weight;
        }
      }

      //21

      if(editedMs4AO != ""){
        data[i].Milestone4[0].ao4 = editedMs4AO;
      }

      //22

      if(editedMs5Action != ""){
        data[i].Milestone5[0].action5 = editedMs5Action;
      }

      //23

      if(editedMs5DeliverDate != ""){
        data[i].Milestone5[0].deliverDateMs5 = editedMs5DeliverDate;
      }

      //24

      if(editedMs5Progress != ""){
        if(isNaN(editedMs5Progress)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone5[0].progress5 = editedMs5Progress;
        }
      }

      //25

      if(editedMs5Weight != ""){
        if(isNaN(editedMs5Weight)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone5[0].weightToProject5 = editedMs5Weight;
        }
      }

      //26

      if(editedMs5AO != ""){
        data[i].Milestone5[0].ao5 = editedMs5AO;
      }

      //27

      if(editedMs6Action != ""){
        data[i].Milestone6[0].action6 = editedMs6Action;
      }

      //28

      if(editedMs6DeliverDate != ""){
        data[i].Milestone6[0].deliverDateMs6 = editedMs6DeliverDate;
      }

      //29

      if(editedMs6Progress != ""){
        if(isNaN(editedMs6Progress)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone6[0].progress6 = editedMs6Progress;
        }
      }

      //30

      if(editedMs6Weight != ""){
        if(isNaN(editedMs6Weight)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone6[0].weightToProject6 = editedMs6Weight;
        }
      }

      //31

      if(editedMs6AO != ""){
        data[i].Milestone6[0].ao6 = editedMs6AO;
      }

       //32

       if(editedMs7Action != ""){
        data[i].Milestone7[0].action7 = editedMs7Action;
      }

      //33

      if(editedMs7DeliverDate != ""){
        data[i].Milestone7[0].deliverDateMs7 = editedMs7DeliverDate;
      }

      //34

      if(editedMs7Progress != ""){
        if(isNaN(editedMs7Progress)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone7[0].progress7 = editedMs7Progress;
        }
      }

      //35

      if(editedMs7Weight != ""){
        if(isNaN(editedMs7Weight)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone7[0].weightToProject7 = editedMs7Weight;
        }
      }

      //36

      if(editedMs7AO != ""){
        data[i].Milestone7[0].ao7 = editedMs7AO;
      }

      if(editedMs8Action != ""){
        data[i].Milestone8[0].action8 = editedMs8Action;
      }

      //33

      if(editedMs8DeliverDate != ""){
        data[i].Milestone8[0].deliverDateMs8 = editedMs8DeliverDate;
      }

      //34

      if(editedMs8Progress != ""){
        if(isNaN(editedMs8Progress)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone8[0].progress8 = editedMs8Progress;
        }
      }

      //35

      if(editedMs8Weight != ""){
        if(isNaN(editedMs8Weight)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone8[0].weightToProject8 = editedMs8Weight;
        }
      }

      //36

      if(editedMs8AO != ""){
        data[i].Milestone8[0].ao8 = editedMs8AO;
      }

      if(editedMs9Action != ""){
        data[i].Milestone9[0].action9 = editedMs9Action;
      }

      //33

      if(editedMs9DeliverDate != ""){
        data[i].Milestone9[0].deliverDateMs9 = editedMs9DeliverDate;
      }

      //34

      if(editedMs9Progress != ""){
        if(isNaN(editedMs9Progress)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone9[0].progress9 = editedMs9Progress;
        }
      }

      //35

      if(editedMs9Weight != ""){
        if(isNaN(editedMs9Weight)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone9[0].weightToProject9 = editedMs9Weight;
        }
      }

      //36

      if(editedMs9AO != ""){
        data[i].Milestone9[0].ao9 = editedMs9AO;
      }

      if(editedMs10Action != ""){
        data[i].Milestone10[0].action10 = editedMs10Action;
      }

      //33

      if(editedMs10DeliverDate != ""){
        data[i].Milestone10[0].deliverDateMs10 = editedMs10DeliverDate;
      }

      //34

      if(editedMs10Progress != ""){
        if(isNaN(editedMs10Progress)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone10[0].progress10 = editedMs10Progress;
        }
      }

      //35

      if(editedMs10Weight != ""){
        if(isNaN(editedMs10Weight)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone10[0].weightToProject10 = editedMs10Weight;
        }
      }

      //36

      if(editedMs10AO != ""){
        data[i].Milestone10[0].ao10 = editedMs10AO;
      }

      if(editedMs11Action != ""){
        data[i].Milestone11[0].action11 = editedMs11Action;
      }

      //33

      if(editedMs11DeliverDate != ""){
        data[i].Milestone11[0].deliverDateMs11 = editedMs11DeliverDate;
      }

      //34

      if(editedMs11Progress != ""){
        if(isNaN(editedMs11Progress)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone11[0].progress11 = editedMs11Progress;
        }
      }

      //35

      if(editedMs11Weight != ""){
        if(isNaN(editedMs11Weight)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone11[0].weightToProject11 = editedMs11Weight;
        }
      }

      //36

      if(editedMs11AO != ""){
        data[i].Milestone11[0].ao10 = editedMs11AO;
      }

      if(editedMs12Action != ""){
        data[i].Milestone12[0].action12 = editedMs12Action;
      }

      //33

      if(editedMs12DeliverDate != ""){
        data[i].Milestone12[0].deliverDateMs12 = editedMs12DeliverDate;
      }

      //34

      if(editedMs12Progress != ""){
        if(isNaN(editedMs12Progress)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone12[0].progress12 = editedMs12Progress;
        }
      }

      //35

      if(editedMs12Weight != ""){
        if(isNaN(editedMs12Weight)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone12[0].weightToProject12 = editedMs12Weight;
        }
      }

      //36

      if(editedMs12AO != ""){
        data[i].Milestone12[0].ao12 = editedMs12AO;
      }

      if(editedMs13Action != ""){
        data[i].Milestone13[0].action13 = editedMs13Action;
      }

      //33

      if(editedMs13DeliverDate != ""){
        data[i].Milestone13[0].deliverDateMs13 = editedMs13DeliverDate;
      }

      //34

      if(editedMs13Progress != ""){
        if(isNaN(editedMs13Progress)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone13[0].progress13 = editedMs13Progress;
        }
      }

      //35

      if(editedMs13Weight != ""){
        if(isNaN(editedMs13Weight)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone13[0].weightToProject13 = editedMs13Weight;
        }
      }

      //36

      if(editedMs13AO != ""){
        data[i].Milestone13[0].ao13 = editedMs13AO;
      }

      if(editedMs14Action != ""){
        data[i].Milestone14[0].action14 = editedMs14Action;
      }

      //33

      if(editedMs14DeliverDate != ""){
        data[i].Milestone14[0].deliverDateMs14 = editedMs14DeliverDate;
      }

      //34

      if(editedMs14Progress != ""){
        if(isNaN(editedMs14Progress)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone14[0].progress14 = editedMs14Progress;
        }
      }

      //35

      if(editedMs14Weight != ""){
        if(isNaN(editedMs14Weight)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone14[0].weightToProject14 = editedMs14Weight;
        }
      }

      //36

      if(editedMs14AO != ""){
        data[i].Milestone14[0].ao14 = editedMs14AO;
      }

      if(editedMs15Action != ""){
        data[i].Milestone15[0].action15 = editedMs15Action;
      }

      //33

      if(editedMs15DeliverDate != ""){
        data[i].Milestone15[0].deliverDateMs15 = editedMs15DeliverDate;
      }

      //34

      if(editedMs15Progress != ""){
        if(isNaN(editedMs15Progress)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone15[0].progress15 = editedMs15Progress;
        }
      }

      //35

      if(editedMs15Weight != ""){
        if(isNaN(editedMs15Weight)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone15[0].weightToProject15 = editedMs15Weight;
        }
      }

      //36

      if(editedMs15AO != ""){
        data[i].Milestone15[0].ao15 = editedMs15AO;
      }

      if(editedMs16Action != ""){
        data[i].Milestone16[0].action16 = editedMs16Action;
      }

      //33

      if(editedMs16DeliverDate != ""){
        data[i].Milestone16[0].deliverDateMs16 = editedMs16DeliverDate;
      }

      //34

      if(editedMs16Progress != ""){
        if(isNaN(editedMs16Progress)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone16[0].progress16 = editedMs16Progress;
        }
      }

      //35

      if(editedMs16Weight != ""){
        if(isNaN(editedMs16Weight)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone16[0].weightToProject16 = editedMs16Weight;
        }
      }

      //36

      if(editedMs16AO != ""){
        data[i].Milestone16[0].ao16 = editedMs16AO;
      }

      if(editedMs17Action != ""){
        data[i].Milestone17[0].action17 = editedMs17Action;
      }

      //33

      if(editedMs17DeliverDate != ""){
        data[i].Milestone17[0].deliverDateMs17 = editedMs17DeliverDate;
      }

      //34

      if(editedMs17Progress != ""){
        if(isNaN(editedMs17Progress)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone17[0].progress17 = editedMs17Progress;
        }
      }

      //35

      if(editedMs17Weight != ""){
        if(isNaN(editedMs17Weight)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone17[0].weightToProject17 = editedMs17Weight;
        }
      }

      //36

      if(editedMs17AO != ""){
        data[i].Milestone17[0].ao10 = editedMs17AO;
      }

      if(editedMs18Action != ""){
        data[i].Milestone18[0].action18 = editedMs18Action;
      }

      //33

      if(editedMs18DeliverDate != ""){
        data[i].Milestone18[0].deliverDateMs18 = editedMs18DeliverDate;
      }

      //34

      if(editedMs18Progress != ""){
        if(isNaN(editedMs18Progress)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone18[0].progress18 = editedMs18Progress;
        }
      }

      //35

      if(editedMs18Weight != ""){
        if(isNaN(editedMs18Weight)){
          res.render("alertNotANumberTenders");
        }
        else{
          data[i].Milestone18[0].weightToProject18 = editedMs18Weight;
        }
      }

      //36

      if(editedMs18AO != ""){
        data[i].Milestone18[0].ao18 = editedMs18AO;
      }

      //recalculating average progress of project

      ms1Progress = parseInt(data[i].Milestone1[0].progress1) / 100;
      ms2Progress = parseInt(data[i].Milestone2[0].progress2) / 100;
      ms3Progress = parseInt(data[i].Milestone3[0].progress3) / 100;
      ms4Progress = parseInt(data[i].Milestone4[0].progress4) / 100;
      ms5Progress = parseInt(data[i].Milestone5[0].progress5) / 100;
      ms6Progress = parseInt(data[i].Milestone6[0].progress6) / 100;
      ms7Progress = parseInt(data[i].Milestone7[0].progress7) / 100;
      ms8Progress = parseInt(data[i].Milestone8[0].progress8) / 100;
      ms9Progress = parseInt(data[i].Milestone9[0].progress9) / 100;
      ms10Progress = parseInt(data[i].Milestone10[0].progress10) / 100;
      ms11Progress = parseInt(data[i].Milestone11[0].progress11) / 100;
      ms12Progress = parseInt(data[i].Milestone12[0].progress12) / 100;
      ms13Progress = parseInt(data[i].Milestone13[0].progress13) / 100;
      ms14Progress = parseInt(data[i].Milestone14[0].progress14) / 100;
      ms15Progress = parseInt(data[i].Milestone15[0].progress15) / 100;
      ms16Progress = parseInt(data[i].Milestone16[0].progress16) / 100;
      ms17Progress = parseInt(data[i].Milestone17[0].progress17) / 100;
      ms18Progress = parseInt(data[i].Milestone18[0].progress18) / 100;

      ms1Weight = parseInt(data[i].Milestone1[0].weightToProject1) / 100;
      ms2Weight = parseInt(data[i].Milestone2[0].weightToProject2) / 100;
      ms3Weight = parseInt(data[i].Milestone3[0].weightToProject3) / 100;
      ms4Weight = parseInt(data[i].Milestone4[0].weightToProject4) / 100;
      ms5Weight = parseInt(data[i].Milestone5[0].weightToProject5) / 100;
      ms6Weight = parseInt(data[i].Milestone6[0].weightToProject6) / 100;
      ms7Weight = parseInt(data[i].Milestone7[0].weightToProject7) / 100;
      ms8Weight = parseInt(data[i].Milestone8[0].weightToProject8) / 100;
      ms9Weight = parseInt(data[i].Milestone9[0].weightToProject9) / 100;
      ms10Weight = parseInt(data[i].Milestone10[0].weightToProject10) / 100;
      ms11Weight = parseInt(data[i].Milestone11[0].weightToProject11) / 100;
      ms12Weight = parseInt(data[i].Milestone12[0].weightToProject12) / 100;
      ms13Weight = parseInt(data[i].Milestone13[0].weightToProject13) / 100;
      ms14Weight = parseInt(data[i].Milestone14[0].weightToProject14) / 100;
      ms15Weight = parseInt(data[i].Milestone15[0].weightToProject15) / 100;
      ms16Weight = parseInt(data[i].Milestone16[0].weightToProject16) / 100;
      ms17Weight = parseInt(data[i].Milestone17[0].weightToProject17) / 100;
      ms18Weight = parseInt(data[i].Milestone18[0].weightToProject18) / 100;

      recalculatedAvgProgress = ((ms1Progress * ms1Weight) + (ms2Progress * ms2Weight) + 
      (ms3Progress * ms3Weight) + (ms4Progress * ms4Weight) + (ms5Progress * ms5Weight) + 
      (ms6Progress * ms6Weight) + (ms7Progress * ms7Weight) + (ms8Progress * ms8Weight) +
      (ms9Progress * ms9Weight) + (ms10Progress * ms10Weight) + (ms11Progress * ms11Weight) +
      (ms12Progress * ms12Weight) + (ms13Progress * ms13Weight) + (ms14Progress * ms14Weight) + 
      (ms15Progress * ms15Weight) + (ms16Progress * ms16Weight) + (ms17Progress * ms17Weight) +
      (ms18Progress * ms18Weight)) * 100;

      recalculatedAvgProgress = recalculatedAvgProgress.toFixed(0);

      data[i].averageProgress = recalculatedAvgProgress;

      totalWeight = ms1Weight + ms2Weight + ms3Weight + ms4Weight + ms5Weight + ms6Weight + ms7Weight
      + ms8Weight + ms9Weight + ms10Weight + ms11Weight + ms12Weight + ms13Weight + ms14Weight + ms15Weight
      + ms16Weight + ms17Weight + ms18Weight

    }
  }

  if(totalWeight > 1){
    res.render("alertWeightExceededTenders");
  }
  else{
    var y = JSON.stringify(data);
    fs.writeFileSync("tenders.json", y);
  
    res.render("alertTenderEdited");
  }
});

if (process.env.port) {
  app.listen(process.env.port, function () {
    console.log("server started");
  });
} else {
  app.listen(3000, function () {
    console.log("server started on port 3000");
  });
}
