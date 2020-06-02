var FSHARDER_SOURCE = `
precision mediump  float;
uniform sampler2D u_Sampler;
uniform sampler2D u_Sampler2;
varying vec2 v_TexCoord;
    void main()
    {
        gl_FragColor.rgb = texture2D(u_Sampler,v_TexCoord).rgb;
        gl_FragColor.a = texture2D(u_Sampler2,v_TexCoord).r;
    }
`;