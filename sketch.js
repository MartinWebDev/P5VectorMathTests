let v1; // Start
let v2; // End
let vM; // Middle value
let vB; // Calculation "between" point

let anchorA; // This will be the "before" anchor
let anchorB; // This will be the "after" anchor

let addNoise = true;

let noiseOffset = 0.0;

function setup() {
    createCanvas(400, 400);

    v1 = new p5.Vector(100, 300);
    v2 = new p5.Vector(300, 100);
    vM = new p5.Vector(200, 120);
}

function draw() {
    background(50);

    // Add noise to points
    if (addNoise) {
        v1.y += (noise(noiseOffset) - 0.5) * 2;
        v2.y += (noise(noiseOffset + 50000) - 0.5) * 6;
    }

    // Calculate between details
    vB = p5.Vector.sub(v2, v1);
    noStroke();
    fill(255);
    text(vB.heading().toFixed(6), 20, 20);
    text((vB.heading() * (180 / PI)).toFixed(6), 20, 40);
    text(vB.mag().toFixed(6), 20, 60);
    vB.normalize();
    text(vB.mag().toFixed(6), 20, 80);
    vB.setMag(20);
    text(vB.mag().toFixed(6), 20, 100);
    noFill();

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

    // Base the magnitude on each side around the difference betwen the mid and the point it's pointing at. Then constrain it so it doesn't go crazy!
    // Draw anchor points around mid point
    strokeWeight(6);

    vB.setMag(constrain(v1.y - vM.y, 20, 50));
    anchorA = p5.Vector.sub(vM, vB);

    vB.setMag((constrain(vM.y - v2.y, 20, 50)));
    anchorB = p5.Vector.add(vM, vB);

    stroke(255, 0, 0);
    point(anchorA.x, anchorA.y);
    stroke(0, 255, 0);
    point(anchorB.x, anchorB.y);

    // Draw bezier using those new anchor points
    stroke(255);
    strokeWeight(2);
    bezier(
        v1.x, v1.y,
        anchorA.x, anchorA.y,
        anchorB.x, anchorB.y,
        v2.x, v2.y
    );

    // Move noise along
    noiseOffset += 0.05;
}