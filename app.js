const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  expanded: true
}));
app.use(express.static("public"));

let items = ["Wake up", "Freshen Up", "Read Articles"];
let workItems = [];

app.get("/", function(req, res) {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-IN", options);
  res.render("list", {
    listTitle: day,
    newItemsList: items
  });
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newItemsList: workItems
  });
});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
})


app.listen("3000", function() {
  console.log("The server is up and running at port 3000");
});
