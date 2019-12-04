
// declare the const  variables
const mapChart_margin = { top:0 , left:0, bottom:30,right:0}
const mapChart_h = 0.6 * window.innerHeight - (mapChart_margin.top + mapChart_margin.bottom);
const mapChart_w = 0.3 * window.innerWidth - (mapChart_margin.left + mapChart_margin.right);
var node = d3.select("#svgMap")

var mapChart = d3.select("#svgMap").append("g")
    //  .attr("transform", "translate(,-45)")
     .attr('height', mapChart_h + mapChart_margin.top + mapChart_margin.bottom)
     .attr('width', mapChart_w + mapChart_margin.left + mapChart_margin.right )
	 .attr("transform", "translate(" + mapChart_margin.left + ", " + mapChart_margin.top + ")");
	// .attr("fill", "red");

// Label : Idiom legend
var readingtime_title = mapChart.append("text")
.attr("x", (width + margin_lines.right* 2)/ 2 )
.attr("y", 20)
.attr("font-size", "18px")
.style("text-anchor", "middle")
.style("fill", "#AAA")
.text("Average Time Spent Reading");


// const initRadarChart = () => {

// 	const height = 0.5 * window.innerHeight + 20;
// 	const width = 0.3 * window.innerWidth - 20;




// }

// d3.json("content/data/time_spend_reading.json", function(error, data) {





    
// 	// initRadarChart();
// });

/*

		// Color list
		 var color_list = ["#fef0d9","#fdcc8a","#fc8d59","#e34a33","#b30000"];

			//Width and height
			//var w = 600;
			//var h = 400;

			//Define map projection

*/          // Color list
var color_list = ["#fef0d9","#fdcc8a","#fc8d59","#e34a33","#b30000"];

var countryList = [];

var projection = d3.geoMercator() //utiliser une projection standard pour aplatir les pôles, voir D3 projection plugin
						.center([ 40, 60 ]) //comment centrer la carte, longitude, latitude
						.translate([ mapChart_w/2 + 150 , mapChart_h/2.7 ]) // centrer l'image obtenue dans le svg
						.scale([ mapChart_w/1.4])// zoom, plus la valeur est petit plus le zoom est gros 
					.rotate([0,0,-2.7]);

//Define path generator
var geo_path = d3.geoPath()
					.projection(projection);


//Create SVG
// var svg = d3.select("#container")
// 			.append("svg")
// 			.attr("width", w)
// 			.attr("height", h);

//Load in GeoJSON data
d3.json("content/data/us-10m.v1.json").then( function(json) {
		console.log("Ola estou aqui");
	//Bind data and create one path per GeoJSON feature
	mapChart.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("d", geo_path)
		.on("mouseover", function(d){ 
			this.style["fill"]="rgba(8, 81, 156, 0.2)";
			// Specify where to put label of text
            /*svg.append("text").attr({
				id: "t" + d.x + "-" + d.y + "-" + i,  // Create an id for text so we can select it later for removing on mouseout
				 x: function() { return xScale(d.x) - 30; },
				 y: function() { return yScale(d.y) - 15; }
			 })
			 .text(function() {
			   return [d.x, d.y];  // Value of the text
			 });*/
		})
		.on("mouseout", function(d, i){ this.style["fill"] = color_list[i%5]; })
		.on("click", function(d, i){ 
			var name = json.features[i].properties.NAME;
			var index = countryList.indexOf(name);
			if(index > -1){
				this.style["stroke"] = "#AAA"; 
				countryList.splice(index, 1);
			} else {
				countryList.push(name);
				this.style["stroke"]="rgba(1, 1, 1, 0.2)";
			}
			console.log(countryList);
			})
	//    .attr("stroke", "rgba(8, 81, 156, 0.2)")
	//    .attr("stroke", "white")
		.attr("stroke", "#AAA")
		.attr("fill", function(d,i){ return color_list[i%5];  })
	//    .attr("fill", "rgba(8, 81, 156, 0.6)")

		;

}).catch( function(err){
	console.log(err);
}
);





