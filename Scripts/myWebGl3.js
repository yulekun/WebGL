function drawMyGL(gl, program) {
    var pintsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pintsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)

    var localPos = gl.getAttribLocation(program, "a_Position");
    if (localPos < 0) {
        console.log(`--------->get a_Position error!`);
        return;
    }
    gl.vertexAttribPointer(localPos, 2, gl.FLOAT, false, points.BYTES_PER_ELEMENT * 4, 0)
    gl.enableVertexAttribArray(localPos);

    var a_TexCoord = gl.getAttribLocation(program, "a_TexCoord");
    if (a_TexCoord < 0) {
        console.log(`--------->get a_TexCoord error!`);
        return;
    }
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, points.BYTES_PER_ELEMENT * 4, points.BYTES_PER_ELEMENT * 2)
    gl.enableVertexAttribArray(a_TexCoord);

    // 旋轉矩陣
    // var localPosRoation = gl.getUniformLocation(program, `a_Rotaion`);
    // if (localPosRoation < 0) {
    //     console.log(`--------->get localPosRoation error!`);
    //     return;
    // }
    initTexture(gl, program, 4);
}

var initTexture = function (gl, program, n) {
    var texture = gl.createTexture();
    var texture2 = gl.createTexture();

    var u_Sampler = gl.getUniformLocation(program, `u_Sampler`);
    if (0 > u_Sampler) {
        console.log(`--> get u_Sampler error`);
        return;
    }

  

    var u_Sampler2 = gl.getUniformLocation(program, `u_Sampler2`);
    if (0 > u_Sampler2) {
        console.log(`--> get u_Sampler2 error`);
        return;
    }

    var image = new Image();
    image.onload = function () {
        loadTexture(gl, n, texture, texture2,u_Sampler, u_Sampler2,image);
    }
    image.src = `../resources/redflower.jpg`;
}

var loadTexture = function (gl, n, texture, texture2,u_Sampler, u_Sampler2,image) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAX_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler, 0);


    // 圖2
    var image2 = new Image();
    image2.onload= function()
    {
        loadTexture2(gl, n, texture2, u_Sampler2, image2);
    }
    image2.src = `../resources/circle.gif`;

}

var loadTexture2 = function (gl, n, texture, u_Sampler, image) {
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAX_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler, 1);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

}

var points = new Float32Array([
    -0.5, 0.5, 0.0, 1.0,
    -0.5, -0.5, 0.0, 0.0,
    0.5, 0.5, 1.0, 1.0,
    0.5, -0.5, 1.0, 0.0,
]);

var ANGLE = 0;


