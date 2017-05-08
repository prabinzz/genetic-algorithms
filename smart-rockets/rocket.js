var count = 0;
function rocket(dna_a){
	this.pos = createVector(width/2, height);
	this.accl = createVector();
	this.vel = createVector();
	this.completed = false;
	this.crashed = false;
	this.crashed_obstacle = false;
	this.colr = round(random(255));
	this.colg = round(random(255));
	this.colb = round(random(255));
	if (dna_a) {
		this.dna = dna_a;
	}else{
		this.dna = new dna();	
	}
	this.fitness = 0;
	this.applyForce = function(force){
		this.accl.add(force);
	}

	this.calc_fitness = function(){
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);
		this.fitness =  map(d, 0, width, width, 0);
		if(d<300 && d>60){
			this.fitness * population_size*3;
		}
		if (this.completed){
			this.fitness * population_size*4;
		}
		if (this.crashed){
			this.fitness /= population_size*2;
		}
		// if(d> 500 && !this.crashed){
		// 	this.fitness /= population_size;
		// }
	}
	this.update = function(){
		d = dist(this.pos.x,this.pos.y,target.x,target.y);
		if(d<60){
			this.completed = true;
			this.pos = target.copy();
		}
		if(this.pos.x > ox && this.pos.x < ox+ow && this.pos.y > oy && this.pos.y< oy+oh){
			this.crashed = true;
			this.crashed_obstacle = true;
		}
		if(this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height){
			this.crashed = true;
		}
		this.applyForce(this.dna.genes[count]);
		if(!this.completed && !this.crashed){
			this.vel.add(this.accl);
			this.pos.add(this.vel);
			this.accl.mult(0);
		}
	}

	this.show = function(){
		push();
		// this.calc_fitness();
		// text(round(this.fitness,2), this.pos.x, this.pos.y, 10)
		translate(this.pos.x, this.pos.y);
		rotate(this.vel.heading());
		rectMode(CENTER);
		noStroke();
		if (this.completed){
			fill(100,220,50,200);
		}
		else if (this.crashed){
			fill(255,0,0,200);
		}else{
			fill(this.colr,this.colg,this.colb,150);
		}
		rect(0, 0, 50, 8);
		pop();
	}
}