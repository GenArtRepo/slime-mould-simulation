class Map{
    constructor(){
        this.agents = [];

        this.grid = [];

        for (let i = 0; i < width; i++) {
            this.grid[i] = [];
            for (let j = 0; j < height; j++) {
                this.grid[i][j] = 0;
            }
        }
    
        for (let i = 0; i < n; i++) {
            var nm = i / n;
            var agent = new Agent(nm);
            this.agents.push(agent);
        }
    }

    compute(){

        // Move
        for(let agent of this.agents){ 
            if(agent.move(this.grid)){
                // Deposit
                this.grid[agent.pos.x][agent.pos.y] = 1;
            }
        }    

        // Sense
        for(let agent of this.agents){
            agent.sense(this.grid);
        }

        //Decay
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                this.grid[i][j] -= decayT;
                if(this.grid[i][j] < 0) this.grid[i][j]=0;
            }
        }

        //Diffusion

    }

    render(){
        loadPixels();        
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) { 
    			var level = map(this.grid[i][j], 0, 1, 0, 255);
                this.setPixels(i, j, level);
            }
        }
        updatePixels();
    }
    
    setPixels(i, j, level){
        var pixel = 4*(i + j*width);
        pixels[pixel] = level;
        pixels[pixel+1] = level;
        pixels[pixel+2] = level;
        pixels[pixel+3] = 255;
    }

    
}