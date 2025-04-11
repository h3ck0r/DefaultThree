#define SHADER_TYPE RawShaderMaterial
#define SHADER_NAME

attribute vec3 position; 
attribute vec2 uv; 

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

varying mediump vec2 vUv;

void main(){
    
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    
    vUv = uv;
}
