var lifespan = 500;
var maxForce = 0.3;

function dna(genes){
	//Dna class
	if (genes) {
		this.genes = genes // if genes are given as argument
	}
	else{
		this.genes = []; // else

		for (var i = 0; i < lifespan; i++) {
			this.genes[i] = p5.Vector.random2D();
			this.genes[i].setMag(random(maxForce));
		}
	}

	this.crossover =  function(partner){

		// Create child dna from this dna and partner dna given as argument;
		
		midpoint = floor(random(partner.genes.length));
		newgenes = [];
		if (random(1)<0.2){
			// 1/8 possibility to re-orient genes with both parents
			for (var i = 0; i < this.genes.length; i++) {
				if(i%2 == 1){
					newgenes[i] = this.genes[i];
				}else{
					newgenes[i] = partner.genes[i];
				}
			};
				
		}else{
			// if not use genes of both parents
			for (var i = 0; i < this.genes.length; i++) {
				if(i<midpoint){
					newgenes[i] = this.genes[i];
				}else{
					newgenes[i] = partner.genes[i];
				}
			};
		}

		return new dna(newgenes); // return new dna object;
	}
	
	this.mutate = function(){
		// mutate genes 
		for(var i=0; i<this.genes.length; i++){
			if(random(1) < mutationRate){ // posssibility = 1/(mutationRate*100)
				this.genes[i] = p5.Vector.random2D();
				this.genes[i].setMag(maxForce);
			}
		}
	}
}