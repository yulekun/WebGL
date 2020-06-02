function main() {
    var canvas = document.getElementById("example");
    if (!canvas) {
        console.log("----------->no canvas");
        return;
    }
    // var ctx = canvas.getContext(`2d`);
    // ctx.fillStyle = `rgba(0,0,255,1.0)`;
    // ctx.fillRect(120,10,150,150);
    var gl = canvas.getContext(`webgl`);
    if (!gl) {
        console.log(`======>no webgl`);
        return;
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var program = gl.createProgram();
    if (!program) {
        console.log(`->no program`);
        return;
    }
    // ====VSHADER
    var vShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vShader) {
        console.log(`---->no vShader`);
        return;
    }
    gl.shaderSource(vShader, VSHARDER_SOURCE);
    gl.compileShader(vShader);
    var status = gl.getShaderParameter(vShader, gl.COMPILE_STATUS);
    if (!status) {
        var error = gl.getShaderInfoLog(vShader);
        console.log(`---->compileShader vShader error:${error}`);
        gl.deleteShader(vShader);
    }
    // ========
    var fShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fShader) {
        console.log(`---->no fShader`);
        return;
    }
    gl.shaderSource(fShader, FSHARDER_SOURCE);
    gl.compileShader(fShader);
    var status = gl.getShaderParameter(fShader, gl.COMPILE_STATUS);
    if (!status) {
        var error = gl.getShaderInfoLog(fShader);
        console.log(`---->compileShader vShader error:${error}`);
        gl.deleteShader(fShader);
    }
    // ===
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        var error = gl.getProgramInfoLog(program);
        console.log('Failed to link program: ' + error);
        gl.deleteProgram(program);
        gl.deleteShader(vShader);
        gl.deleteShader(fShader);
    }
    gl.useProgram(program);
    drawMyGL(gl,program);
}