function drawMyGL(gl, program) {
    var pintsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pintsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)

    var localPos = gl.getAttribLocation(program, "a_Position");
    if (localPos < 0) {
        console.log(`--------->get a_Position error!`);
        return;
    }
    gl.vertexAttribPointer(localPos, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(localPos);

    // 旋轉矩陣
    var localPosRoation = gl.getUniformLocation(program, `a_Rotaion`);
    if (localPosRoation < 0) {
        console.log(`--------->get localPosRoation error!`);
        return;
    }
    var tick = function () {
        darw(gl, localPosRoation);
        requestAnimationFrame(tick);
    }
    tick();
}

var darw = function (gl, localPosRoation) {
    ANGLE = (ANGLE + 1) % 360;
    var radian = Math.PI * ANGLE / 180.0;
    var cosB = Math.cos(radian);
    var sinB = Math.sin(radian);
    var roationMat = new Float32Array([
        cosB, sinB, 0.0, 0.0,
        -sinB, cosB, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.3, 0.3, 0.0, 1.0
    ]);
    gl.uniformMatrix4fv(localPosRoation, false, roationMat)
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

var points = new Float32Array([
    -0.9, 0, 0, -1, 0, 1
]);

var ANGLE = 0;


