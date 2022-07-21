/*
** Slime Mold Simulation (Physarum polycephalum)
* Cristian Rojas Cardenas, May 2022
* Algorithm based on the paper by Jeff Jones: “Characteristics of pattern 
* formation and evolution in approximations of Physarum transport networks.”
* See the paper here: 
* http://eprints.uwe.ac.uk/15260/1/artl.2010.16.2.pdf
* 
* The algorithm runs in an environment defined by a grid of pixels, the environment 
* is populated by a set of agents which interact with the environment through their 
* sensors. Each time that an agent moves it leaves a deposit in the new position. 
* Those deposits can be sensed by other agents in order to decide their steer. 
* However, the deposits decay with time until they fade away from the environment.
* The agent follows the next algorithm [Motor Stage]:
* 
* 		-	Attempt move forwards in the current direction
* 		-	If (move forwards successfully)
* 				Deposit trail in new location
* 		-	Else
* 				Choose new random direction
* 
* Then the agents sense the environment [Sensory Stage] through 3 sensors, the 
* first aiming forward the sensor distance, the right and left sensors aim to a 
* positive and negative angle (sensor angle) with respect to the central sensor:
* 			
*      		  		        \   |   /
* 		    		         \  |  /
* 				             	O 
* 			
* The FL, F, and FR values are detected in the grid through the sensor, then the 
* agent decides the next steer following the next algorithm:
* 
* 		-	Sample trail map values.
* 		-	 If (F > FL) && (F > FR)
* 				Stay facing the same direction
* 				Return
* 		-	Else if (F < FL) && (F < FR)
* 				Rotate randomly left or right
* 		-	Else if (FL < FR)
* 				Rotate right by RA
* 		-	Else if (FL > FR)
* 				Rotate left by RA
* 		-	Else
* 				Continue facing the same direction
* 
* After the Motor and Sensory Stages, the map decays the trail state, and the 
* process is repeated. All the parameters and in-depth explanations can be found 
* in the paper:
* 
*/

let play = true;
let n;
let decayT = 0.1;

// Settings, values used in the algorithm execution
let settings = { 
	Play: function(){ play=true; },
	Pause: function(){ play=false; },
	Reset: function(){ init()},
	p: 9,
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

	// frameRate(1);

	n = round(width*height*settings.p/100);

	init();
}

function init(){
	map_ = new Map();
}

function draw() {
	if (play){
		map_.compute();
		map_.render();
	}
}