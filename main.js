/*
 * Auto-generated content from the Brackets New Project extension.  Enjoy!
 */
//var canvas; 
//var gl; 
var canvas; 
var gl;
function createGLContext(canvas) {
    var names = ["webgl", "experimental-webgl"];
    var context = null; 
    for (var i = 0; i < names.length; i++) {
        try {
            context = canvas.getContext(names[i]); 
        }
        catch(e) {}
        if (context != null) {
            break; 
        }
    }
    
    if (context != null) {
        context.viewportWidth = canvas.width; 
        context.viewportHeight = canvas.height; 
    }
    else {
        alert("Failed to create a WebGL context."); 
    }
    
    return context; 
    
}

function loadShaderFromDOM(id) {
  var shaderScript = document.getElementById(id);
  
  // If we don't find an element with the specified id
  // we do an early exit 
  if (!shaderScript) {
    return null;
  }
  
  // Loop through the children for the found DOM element and
  // build up the shader source code as a string
  var shaderSource = "";
  var currentChild = shaderScript.firstChild;
  while (currentChild) {
    if (currentChild.nodeType == 3) { // 3 corresponds to TEXT_NODE
      shaderSource += currentChild.textContent;
    }
    currentChild = currentChild.nextSibling;
  }
 
  var shader;
  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;
  }
 
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
 
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  } 
  return shader;
}

function setupShaders() {
  vertexShader = loadShaderFromDOM("shader-vs");
  fragmentShader = loadShaderFromDOM("shader-fs");
  
  shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert("Failed to setup shaders");
  }

  gl.useProgram(shaderProgram);
  shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

  shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
  gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
}

function setupBuffers() {
  vertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
  var triangleVertices = [
    //blue
      
    //top rectangle  
    2.0, 15.0, 0.0,
    2.0, 17.0, 0.0,
    15.0, 17.0, 0.0,
    15.0, 17.0, 0.0,
    15.0, 15.0, 0.0,
    2.0, 15.0, 0.0,
      
    //left rect
    3.0, 7,0, 0.0,
    3.0, 15.0, 0.0,
    6.0, 7.0, 0.0,
    3.0, 15.0, 0.0,
    6.0, 7.0, 0.0,
    6.0, 15.0, 0.0,

    //left mini rect
    6.0, 9.0, 0.0,
    7.0, 9.0, 0.0,
    6.0, 13.0, 0.0,
    7.0, 9.0, 0.0,
    6.0, 13.0, 0.0,
    7.0, 13.0, 0.0,
      
    //right rectangle
    11.0, 7.0, 0.0,
    11.0, 15.0, 0.0,
    14.0, 15.0, 0.0,
    14.0, 15.0, 0.0,
    11.0, 7.0, 0.0,
    14.0, 7.0, 0.0, 
      
    //right mini rect
    10.0, 9.0, 0.0,
    11.0, 9.0, 0.0,
    11.0, 13.0, 0.0,
    10.0, 9.0, 0.0,
    11.0, 13.0, 0.0,
    10.0, 13.0, 0.0,
      
    //orange
    3.0, 5.0, 0.0,
    3.0, 6.0, 0.0,
    4.0, 6.0, 0.0,
    3.0, 5.0, 0.0,
    4.0, 6.0, 0.0,
    4.0, 4.0, 0.0,
      
    5.0, 4.0, 0.0,
    5.0, 6.0, 0.0,
    6.0, 6.0, 0.0,
    5.0, 4.0, 0.0,
    6.0, 6.0, 0.0,
    6.0, 3.0, 0.0,

    7.0, 3.0, 0.0,
    7.0, 6.0, 0.0,
    8.0, 6.0, 0.0,
    7.0, 3.0, 0.0,
    8.0, 6.0, 0.0,
    8.0, 2.0, 0.0,
      
    9.0, 2.0, 0.0,
    10.0, 3.0, 0.0,
    10.0, 6.0, 0.0,
    9.0, 2.0, 0.0,
    10.0, 6.0, 0.0,
    9.0, 6.0, 0.0,
      
    11.0, 3.0, 0.0,
    12.0, 4.0, 0.0,
    12.0, 6.0, 0.0,
    11.0, 3.0, 0.0,
    12.0, 6.0, 0.0,
    11.0, 6.0, 0.0,
      
    13.0, 4.0, 0.0,
    14.0, 5.0, 0.0,
    14.0, 6.0, 0.0,
    13.0, 4.0, 0.0,
    14.0, 6.0, 0.0,
    13.0, 6.0, 0.0

          
  ];
    
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
  vertexPositionBuffer.itemSize = 3;
  vertexPositionBuffer.numberOfItems = 66;
    
  vertexColorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  var colors = [
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
      
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
      
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
      
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
      
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
      
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
      
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
      
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
      
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
      
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0,
        1.0, 0.0, 0.0, 1.0
        
        
    ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
  vertexColorBuffer.itemSize = 4;
  vertexColorBuffer.numItems = 66;  
}

function draw() { 
  gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  
    
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 
                         vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 
                            vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
  gl.drawArrays(gl.TRIANGLES, 0, vertexPositionBuffer.numberOfItems);
}


 function startup() {
    canvas = document.getElementById("illini"); 
    gl = createGLContext(canvas); 
    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    console.log("hello"); 

    
}




