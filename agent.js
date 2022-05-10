class Agent{
    constructor(){

        var x = floor(random(0, width));
        var y = floor(random(0, height));
        this.pos = createVector(x, y);
        this.vel = p5.Vector.fromAngle(radians(random(-180, 180)));


        this.vel = createVector(0, 1);
        this.rotation_angle = radians(45); // Rotation angle
        

        this.sensor_offset = 9; // Sensor Distance
        this.sensor_angle = radians(45); // Sensor Angle
    }

    round_vector(vector){
        vector.x = round(vector.x);
        vector.y = round(vector.y);
        return vector;
    }

    borders_format(vector){
        if (vector.x < 0)  vector.x = width + (vector.x  % width);
        if (vector.y < 0)  vector.y = height + (vector.y % height);
        if (vector.x >= width) vector.x = vector.x % width;
        if (vector.y >= height) vector.y = vector.y % height;

        return vector;
    }

    move(grid){
        var n_pos =  p5.Vector.add(this.pos, this.vel);

        n_pos = this.round_vector(n_pos);
        n_pos = this.borders_format(n_pos);

        // If the agent doesn't move or collision
        if(grid[n_pos.x][n_pos.y]==1 | (n_pos.x == this.pos.x & n_pos.y == this.pos.y)){
            this.vel = p5.Vector.fromAngle(radians(random(-180, 180)));
            return false;
        }


        this.pos = n_pos;
        
        return true;
    }

    sense(grid){
        var sensor = createVector(this.vel.x, this.vel.y).setMag(this.sensor_offset);

        //Front Sensor
        var front_sensor = p5.Vector.add(this.pos, sensor);
        front_sensor = this.round_vector(front_sensor);
        front_sensor = this.borders_format(front_sensor);
        var F = grid[front_sensor.x][front_sensor.y];

        
        
        //Rigth Sensor
        var right_sensor = p5.Vector.add(this.pos,
                                p5.Vector.rotate(sensor, this.sensor_angle)); 
        right_sensor = this.round_vector(right_sensor);
        right_sensor = this.borders_format(right_sensor);
        var FR = grid[right_sensor.x][right_sensor.y];


        //Left Sensor
        var left_sensor = p5.Vector.add(this.pos, 
                                p5.Vector.rotate(sensor, -this.sensor_angle));
        left_sensor = this.round_vector(left_sensor);
        left_sensor = this.borders_format(left_sensor);
        var FL = grid[left_sensor.x][left_sensor.y]; 


        if(F > FL & F > FR) return;
        else if(F < FL & F < FR){
            if (Math.random() < 0.5) this.vel.rotate(this.rotation_angle);
            else this.vel.rotate(-this.rotation_angle);
        } 
        else if(FL < FR) this.vel.rotate(this.rotation_angle);
        else if(FL > FR) this.vel.rotate(-this.rotation_angle);
        else return;
    }
}