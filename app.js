var width = parseInt(d3.select('#scatter')
    .style("width"));

var height = width * 2/3;
var margin = 10;
var labelArea = 110;
var padding = 45;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "chart");

svg.append("g").attr("class", "xText");
var xText = d3.select(".xText");

var bottomTextX =  (width - labelArea)/2 + labelArea;
var bottomTextY = height - margin - padding;
xText.attr("transform",`translate(
    ${bottomTextX}, 
    ${bottomTextY})`
    );

xText.append("text")
    .attr("y", -16)
    .attr("data-name", "poverty")
    .attr("data-axis", "x")
    .attr("class","aText active x")
    .text("In Poverty (%)");

xText.append("text")
    .attr("y", 0)
    .attr("data-name", "age")
    .attr("data-axis", "x")
    .attr("class","aText inactive x")
    .text("Age (Median)");

xText.append("text")
    .attr("y", 16)
    .attr("data-name", "income")
    .attr("data-axis", "x")
    .attr("class","aText inactive x")
    .text("Household Income (Median)");

svg.append("g").attr("class", "yText");
var yText = d3.select(".yText");

var leftx =  margin + padding;
var lefty = (height + labelArea) / 2 - labelArea;
yText.attr("transform",`translate(
    ${leftx}, 
     ${lefty}
    )rotate(-90)`
    );


yText .append("text")
    .attr("y", -20)
    .attr("data-name", "obesity")
    .attr("data-axis", "y")
    .attr("class", "aText active y")
    .text("Obese (%)");

yText .append("text")
    .attr("y", 0)
    .attr("data-name", "smokes")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("Smokes (%)");

yText .append("text")
    .attr("y", 20)
    .attr("data-name", "healthcare")
    .attr("data-axis", "y")
    .attr("class", "aText inactive y")
    .text("Lacks Healthcare (%)");
    
var cRadius;
function adjustRadius() {
  if (width <= 500) {
    cRadius = 7;}
  else { 
    cRadius = 10;}
}
adjustRadius();

d3.csv("assets/data/data.csv").then(function(data) {
    visualize(data);
});

function visualize (csvData) {
   var xMin;
   var xMax;
   var yMin;
   var yMax;

   var c_x= "poverty";
   var c_y = "obesity";

   var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([40, -60])
      .html(function(d) {
        
            var stateLine = `<div>${d.state}</div>`;
            var yLine = `<div>${c_y}: ${d[c_y]}%</div>`;
            if (cx === "poverty") {
                xLine = `<div>${c_x}: ${d[c_x}%</div>`}          
            else {
                xLine = `<div>${c_x}: ${parseFloat(d[c_x]).toLocaleString("en")}</div>`;}             
            return stateLine + xLine + yLine  
        });

  