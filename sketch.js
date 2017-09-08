let v1; // Start
let v2; // End
let vM; // Middle value
let vB; // Calculation "between" point

let addNoise = true;

let noiseOffset = 0.0;

function setup() {
    createCanvas(400, 400);

    v1 = new p5.Vector(100, 300);
    v2 = new p5.Vector(300, 100);
    vM = new p5.Vector(100, 100);
}

function draw() {
    background(50);

    // Add noise to points
    if (addNoise) {
        v1.y += (noise(noiseOffset) - 0.5) * 2;
        v2.y += (noise(noiseOffset + 5000) - 0.5) * 2;
    }

    // Draw main vector points
    stroke(255);
    strokeWeight(8);

    point(v1.x, v1.y);
    point(v2.x, v2.y);

    stroke(20, 120, 120);
    point(vM.x, vM.y);

    // Line between main points
    strokeWeight(1);
    stroke(150, 50, 0);
    line(v1.x, v1.y, v2.x, v2.y);

    // Move noise along
    noiseOffset += 0.05;
}