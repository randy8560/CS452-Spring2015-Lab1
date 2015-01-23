/*
Author: Randy Parisi
Assignment: HW1
Last Modified: 1/23/15
*/

var gl;

var delay = 100;

var index = 0;
var numberOfShapes = 3;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var square = [
        vec2(  0,  1 ),
        vec2(  1,  0 ),
        vec2( -1,  0 ),
        vec2(  0, -1 )
    ];
	
	var triangle = [
        vec2(  -1,  -1 ),
        vec2(  0,  1 ),
        vec2( 1,  -1 ),
    ];
	
	var  oct= [
		vec2(  0,  1 ),
		vec2(  .75,  .75 ),
		
        vec2(  1,  0 ),
		vec2(  .75,  -.75 ),
		
		vec2(  0, -1 ),
		vec2( -.75,  -.75 ),
		
		vec2( -1,  0 ),
		vec2( -.75,  .75 ),				
    ];

    // Load the data into the GPU    
  	var vBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(square), gl.STATIC_DRAW);
		
	var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);	

    document.getElementById("Next").onclick = function () {
	        index = ++index % numberOfShapes;
			if(index == 0){
				gl.bufferData(gl.ARRAY_BUFFER, flatten(square), gl.STATIC_DRAW);
			}
			else if(index == 1){
				gl.bufferData(gl.ARRAY_BUFFER, flatten(triangle), gl.STATIC_DRAW);
			}
			else{
				gl.bufferData(gl.ARRAY_BUFFER, flatten(oct), gl.STATIC_DRAW);
			}
    };
    render();
};

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );

	if(index == 0){
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}
	else if(index == 1){
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
	}
	else {
		gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);
	}

    setTimeout(
        function (){requestAnimFrame(render);}, delay
    );
}
