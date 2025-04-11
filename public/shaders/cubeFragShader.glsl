precision mediump float;

varying vec2 vUv;

void main(){
    float strengthX = step(0.9, mod(vUv.x * 10.0+1.0, 1.0));
    strengthX *= step(0.2, mod(vUv.y * 10.0, 1.0));

    float strengthY = step(0.2, mod(vUv.x * 10.0, 1.0));
    strengthY *=  step(0.9, mod(vUv.y * 10.0, 1.0));
    
    float strength = strengthX + strengthY;
    // float strength = strengthX;


    gl_FragColor = vec4(strength, strength,strength, 1.0); 
}