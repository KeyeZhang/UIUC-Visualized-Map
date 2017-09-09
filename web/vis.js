"use strict";

/* Boilerplate jQuery */
$(function() {
  $.get("res/genderDiversity.csv")
   .done(function (csvData) {
     var data = d3.csvParse(csvData);
     visualize(data);
   })
   .fail(function (e) {
     alert("Failed to load CSV data!");
   });
});

/* Visualize the data in the visualize function */
var visualize = function(data) {
  console.log(data);

  // == BOILERPLATE ==
  var margin = { top: 50, right: 350, bottom: 50, left: 20 },
     width = 800,
     height = 930;

  var svg = d3.select("#chart")
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .style("width", width + margin.left + margin.right)
              .style("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    
    
  // == Your code! :) ==
    
    var xccordsScale = d3.scaleLinear()  // quantitative: scaleLinear
    .domain([0,100])
    .range([0,width]);
    
    // quantitative and categorical data : 2 types of data
    
    var yccordsScale = d3.scaleLinear()  // categorical: scalePoint
    .domain([0,150])   // domain don't need to be quant, it can be categorical
    .range([0,height]); // "height" can be just string! Only if you set the domain above!
    
 
    
    
    d3.select(".myCheckbox-A1").on("change",update);
    d3.select(".myCheckbox-A2").on("change",update);
    
    d3.select(".myCheckbox-B1").on("change",update);
    d3.select(".myCheckbox-B2").on("change",update);
    d3.select(".myCheckbox-B3").on("change",update);
    d3.select(".myCheckbox-B4").on("change",update);
    d3.select(".myCheckbox-B5").on("change",update);
    
    d3.select(".searcher").on("change",update);
    
    update();
    
    
    function update(){
    //update
        // college checkboxes
        var choices = [];
        //multiple check box, just just myCheckbox1,myCheckbox2
        
        d3.selectAll(".myCheckbox-B1").each(function(d){
          var cb1 = d3.select(this);
          if(cb1.property("checked")){
          choices.push(cb1.property("value"));
          }
          });
        
        d3.selectAll(".myCheckbox-B2").each(function(d){
          var cb2 = d3.select(this);
          if(cb2.property("checked")){
          choices.push(cb2.property("value"));
          }
          });
        
        d3.selectAll(".myCheckbox-B3").each(function(d){
        var cb3 = d3.select(this);
        if(cb3.property("checked")){
        choices.push(cb3.property("value"));
        }
        });
        
        d3.selectAll(".myCheckbox-B4").each(function(d){
        var cb4 = d3.select(this);
        if(cb4.property("checked")){
        choices.push(cb4.property("value"));
        }
        });
        
        d3.selectAll(".myCheckbox-B5").each(function(d){
        var cb5 = d3.select(this);
        if(cb5.property("checked")){
        choices.push(cb5.property("value"));
        }
        });
        
        console.log(choices);
        
        if(choices.length > 0){
            var newdata = data.filter(function(d,i){return choices.includes(d.College);});
        } else {
            var newdata = data;
        }
        
        
        //year checkboxes
        var updateyear = 0;
        d3.selectAll(".myCheckbox-A1").each(function(d){
        var cb = d3.select(this);       // v4 difference? need to add var: "var cb = "
        if(cb.property("checked")){
        updateyear = cb.property("value");
        }
        });
        
        d3.selectAll(".myCheckbox-A2").each(function(d){
        var cb = d3.select(this);
        if(cb.property("checked")){
        updateyear = cb.property("value");
        }
        });
        if (updateyear == 0)
            newdata = data;
        console.log(newdata);
        
        
    //tip
    var tip =d3.tip()
    .attr("class","d3-tip")
    .html(function(d){
          //return d["name"];
          
          
          return "<div>" + d["Major Name"] + "<br>" +"<br>"+ " Year: " +  updateyear + "</div>" +
          '<div class="row" style="text-align: center; margin-top: 5px; padding-top: 5px; margin-bottom: 5px; padding-bottom: 5px; border-top: dotted 1px black; border-bottom: dotted 1px black;">' +
          '<div class="col-xs-6">' +
          '<span style="font-size: 28px;">' + (100*d["%Female_"+ updateyear]).toFixed(2) + '%</span><br>' +
          '<span style="font-size: 14px;">' + "Female percentage" + '</span>' +
          '</div>' +
          '<div class="col-xs-6">' +
          '<span style="font-size: 28px;">' + d["Total_"+ updateyear] + '</span><br>' +
          '<span style="font-size: 14px;">' + "Total" + "<br>"+"students" + '</span>' +
          '</div>' +
          '</div>' +
          '<div style="text-align: center;">' + d["College"] + "</div>"
          
          
          })
    svg.call(tip);
    
    //
    
    // == VIZUALIZATION SHAPES ==
    var circle = svg.selectAll("circle")
    .data(newdata,function(d){return d;});  //all "circle"
    circle.exit().remove();
        
     circle
    .enter()
    .append("circle")
    .on("mouseover",tip.show)
    .on("mouseout",tip.hide)
    .attr("cx",function(d){
          return xccordsScale(d["xcoord"]);
          })
    .attr("cy", function(d){
          return yccordsScale(d["ycoord"]);
          //return 50;
          })
          //return 50;
          
        .attr("r",function(d){
              return Math.pow(d["Total_"+ updateyear]*100,1/3)/1.5;
              //return 50;
              })
    .attr("fill",function(d){
          //var x = Math.log(d["%Female_"+ updateyear]+800)/3.5+0.92;
          //var x = d["%Female_"+ updateyear]/1.2+0.2;
          var x = Math.pow(d["%Female_"+ updateyear],1/1.7);
          switch(d["College"]){  // in javascript we can switch strings
          //d.data["Degree']   formatted as object in webpage's "console"
          //d.data.Degree
          /*
          case "Engineering": return "rgba(60, 59, 92, 0.5)";
          case "Business": return "rgba(144, 12, 63, 0.5)";
          case "Art": return "rgba(88, 24, 69, 0.5)";
          case "Agriculture": return "rgba(39, 174, 96, 0.5)";
          case "Liberal Art": return "rgba(11, 123, 12, 0.4)";
          case "Computer Science": return "rgba(111, 123, 12, 0.4)";
          case "Statistics ": return "rgba(111, 123, 12, 0.4)";
           */
          
          case "Engineering": return "rgba(60, 59, 92,"+x+")";
          case "Business": return "rgba(144, 12, 63, "+x+")";
          case "Art": return "rgba(213, 57, 57, "+x+")";
          case "Agriculture": return "rgba(255, 181, 99, "+x+")";
          case "Liberal Art": return "rgba(11, 123, 12, "+x+")";
          case "Computer Science": return "rgba(111, 123, 12, "+x+")";
          case "Statistics ": return "rgba(111, 123, 12, "+x+")";
          }
          })
        .on("click", function(d){
            var url = d.website;
            //$(location).attr('href', url);
            //window.location = url;
            //in javascript                 //stay the same windows: windows.location = url
            window.open(url);           // open a new window!!   windows.open(url)
            });
        
    };
};
