// slime mold simulation (Physarum polycephalum)
// based on 2010 paper by Jeff Jones, “Characteristics of pattern formation and evolution in approximations of Physarum transport networks.”
// http://eprints.uwe.ac.uk/15260/1/artl.2010.16.2.pdf

let n;
let decayT = 0.1;

// Settings, values used in the algorithm execution
let settings = { 
	Play: function(){ play=true; },
	Pause: function(){ play=false; },
	Reset: function(){ init()},
	p: 5,
  };

function gui(){
    // Adding the GUI menu
    var gui = new dat.GUI();
    gui.width = 150;
    gui.add(settings,'Play');
    gui.add(settings,'Pause');
    gui.add(settings,'Reset');
    gui.add(settings,'p', 3, 15).step(1);
}

function setup() {
	gui();
	createCanvas(720, 400);
	background(255);
	pixelDensity(1);

	n = floor(width*height*settings.p/100);

	init();
}

function init(){
	map_ = new Map();
}

function draw() {
	background(255);
	map_.compute();
	map_.render();
}