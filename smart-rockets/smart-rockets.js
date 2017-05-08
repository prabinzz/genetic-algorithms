var popn;  // population
var target; // target 
var population_size = 200; // total population size
var completed = 0; // Target hit
var mutationRate = 0.05;
var generation = 1;
var high_score = 0;
var alive = 0;
var dead = 0;

// obstacle variables;
var ow
var ox
var oy
var oh

function setup(){
	// __init__ function of p5js framework
	createCanvas(600,600); 
	popn = new population(); //create new population
	target =  createVector(width/2, 50);
	
	// obstacles veriables
	ow = 300;
	ox = (width/2)-(ow/2);
	oy = height/2.5;
	oh = 10;
}

function draw(){
	// iterate over and over to draw in canvus
	background(51); // background
	popn.run();
	count++;
	if (count == lifespan || dead+completed == population_size){
		// start new generation
		count = 0;
		generation++;
		popn.evaluate();
		popn.selection();
	}
	fill(255,150);
	ellipse(target.x, target.y, 100,100);
	fill(200);
	stroke(0);
	rect(ox,oy,ow,oh);
	// statistic
	textSize(18);
	noStroke();
	fill(255);
	text(completed, target.x-5, target.y+5, 2);
	noFill();
	stroke(0,255,0,155);
	ellipse(target.x, target.y , 350, 350);
	fill(133,223,192);
	// stats
	stat_show(10,height-100,"Generation",generation,100);
	stat_show(10,height-80,"Population",population_size,100);
	stat_show(10,height-60,"Dead",dead,100);
	stat_show(10,height-40,"Alive",alive,100);
	stat_show(10,height-20,"Best",high_score,100);

}

function stat_show(x,y,label,val,gap){
	textSize(15);
	text(label+": ",x,y,gap);
	text(val,x+gap,y,gap);
}

function population(){
	this.rockets = [];
	this.matingpool = [];

	for (var i = 0; i < population_size; i++) {
		this.rockets[i] = new rocket();
	};
	this.run = function(){
		var temp = 0;
		var temp_d = 0; // temp for alive
		var temp_a = 0; // temp for dead
		for (var i = 0; i < this.rockets.length; i++) {
			this.rockets[i].update();
			this.rockets[i].show();
			if(this.rockets[i].crashed){
				temp_d++;
			}else{
				temp_a++;
			} 
			if (this.rockets[i].completed){
				temp++;
			}
		};
		completed = temp;
		dead = temp_d;
		alive =  temp_a;

		if(high_score < completed){
			high_score = completed;
		}
	}

	this.selection = function(){
		var newRockets = [];
		var fitest = new rocket();
		for(var i=0; i< this.rockets.length*0.70; i++){
			parentA = random(this.matingpool).dna;
			parentB = random(this.matingpool).dna;
			child = parentA.crossover(parentB);
			child.mutate();
			newRockets.push(new rocket(child));
		}
		for(var i=0; i< this.rockets.length*0.30; i++){
			parentA = random(this.matingpool).dna;
			parentB = random(this.matingpool).dna;
			child = parentB.crossover(parentA);
			newRockets.push(new rocket(child));
		}
		
		// random select
		while(newRockets.length < population_size){
			newRockets.push(new rocket());
		}
		population_size = this.rockets.length;
		this.rockets = newRockets;
	}

	this.evaluate = function(){
		this.maxfit = 0;
		this.matingpool = [];
		for (var i = 0; i < population_size; i++) {
			this.rockets[i].calc_fitness();
			if (this.rockets[i].fitness > this.maxfit) {
				this.maxfit = this.rockets[i].fitness;
			};
		};

		for (var i = 0; i < population_size; i++) {
			this.rockets[i].fitness /= this.maxfit;
		}
		
		for (var i = 0; i < population_size; i++) {
			fitness = this.rockets[i].fitness;
			n = this.rockets[i].fitness*1000;
			for (var j = 0; j < n; j++) {
				this.matingpool.push(this.rockets[i]);
			};
		}		
	}
}