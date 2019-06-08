(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,function(e,t){function n(e){this.initialize=function(){this.buffer=e.createBuffer()},this.bind=function(){e.bindBuffer(e.ARRAY_BUFFER,this.buffer)},this.set=function(t){this.bind(),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW)},this.initialize()}e.exports.buildAttribs=function(e,t){var r={};for(var o in t)r[o]={buffer:new n(e),size:t[o]};return r},e.exports.getExtensions=function(e,t){for(var n={},r=0;r<t.length;r++){var o=e.getExtension(t[r]);if(null===o)throw Error("Extension "+t[r]+"not available.");n[t[r]]=o}return n},e.exports.Framebuffer=function(e,t,n,r){this.initialize=function(){if(this.fb=e.createFramebuffer(),this.bind(),t.length>1){for(var o=[],i=0;i<t.length;i++)o.push(r["COLOR_ATTACHMENT"+i+"_WEBGL"]);for(r.drawBuffersWEBGL(o),i=0;i<t.length;i++)e.framebufferTexture2D(e.FRAMEBUFFER,r["COLOR_ATTACHMENT"+i+"_WEBGL"],e.TEXTURE_2D,t[i].texture,0)}else e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t[0].texture,0);void 0!==n&&e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,n.texture,0)},this.bind=function(){e.bindFramebuffer(e.FRAMEBUFFER,this.fb)},this.initialize()},e.exports.Texture=function(e,t,n,r,o,i){(i=i||{}).target=i.target||e.TEXTURE_2D,i.mag=i.mag||e.NEAREST,i.min=i.min||e.NEAREST,i.wraps=i.wraps||e.CLAMP_TO_EDGE,i.wrapt=i.wrapt||e.CLAMP_TO_EDGE,i.internalFormat=i.internalFormat||e.RGBA,i.format=i.format||e.RGBA,i.type=i.type||e.UNSIGNED_BYTE,this.initialize=function(){this.index=t,this.activate(),this.texture=e.createTexture(),this.bind(),e.texImage2D(i.target,0,i.internalFormat,i.format,i.type,n),e.texParameteri(i.target,e.TEXTURE_MAG_FILTER,i.mag),e.texParameteri(i.target,e.TEXTURE_MIN_FILTER,i.min),e.texParameteri(i.target,e.TEXTURE_WRAP_S,i.wraps),e.texParameteri(i.target,e.TEXTURE_WRAP_T,i.wrapt),i.mag===e.NEAREST&&i.min===e.NEAREST||e.generateMipmap(i.target)},this.bind=function(){e.bindTexture(i.target,this.texture)},this.activate=function(){e.activeTexture(e.TEXTURE0+this.index)},this.reset=function(){this.activate(),this.bind(),e.texImage2D(i.target,0,i.internalFormat,r,o,0,i.format,i.type,n)},this.initialize()},e.exports.GLBuffer=n,e.exports.Renderable=function(e,t,n,r){this.primitiveCount=r,this.initialize=function(){},this.render=function(){for(var o in t.use(),n){var i=n[o].buffer,a=n[o].size;try{var s=t.attribs[o].location}catch(g){throw console.log("Could not find location for",o),g}i.bind(),e.enableVertexAttribArray(s),e.vertexAttribPointer(s,a,e.FLOAT,!1,0,0)}for(o in e.drawArrays(e.TRIANGLES,0,3*r),this.buffers)e.disableVertexAttribArray(t.attributes[o].location)},this.initialize()},e.exports.InstancedRenderable=function(e,t,n,r,o){this.initialize=function(){},this.render=function(){for(var i in t.use(),n){var a=n[i].buffer,s=n[i].size;try{var g=t.attribs[i].location}catch(c){throw console.log("Could not find location for",i),c}a.bind(),e.enableVertexAttribArray(g),e.vertexAttribPointer(g,s,e.FLOAT,!1,0,0),o.vertexAttribDivisorANGLE(g,n[i].divisor)}for(i in o.drawArraysInstancedANGLE(e.TRIANGLES,0,36,r),this.buffers)e.disableVertexAttribArray(t.attributes[i].location)},this.initialize()},e.exports.Program=function(e,t,n){this.initialize=function(){this.program=this.compileProgram(t,n),this.attribs=this.gatherAttribs(),this.uniforms=this.gatherUniforms()},this.use=function(){e.useProgram(this.program)},this.compileProgram=function(t,n){var r=this.compileShader(t,e.VERTEX_SHADER),o=this.compileShader(n,e.FRAGMENT_SHADER),i=e.createProgram();if(e.attachShader(i,r),e.attachShader(i,o),e.linkProgram(i),!e.getProgramParameter(i,e.LINK_STATUS))throw console.log(e.getProgramInfoLog(i)),new Error("Failed to compile program.");return i},this.compileShader=function(t,n){var r=e.createShader(n);if(e.shaderSource(r,t),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){var o=e.getShaderInfoLog(r),i=parseInt(o.split(":")[2]),a=t.split("\n");for(var s in a){var g=parseInt(s);console.log(g+"  "+a[s]),s===i-1&&console.warn(o)}var c=n===e.VERTEX_SHADER?"vertex":"fragment";throw Error("Failed to compile "+c+" shader.")}return r},this.setUniform=function(t,n,r){var o=Array.prototype.slice.call(arguments,2);this.use();try{var i=this.uniforms[t].location}catch(a){throw console.log(t),a}e["uniform"+n].apply(e,[i].concat(o))},this.gatherUniforms=function(){for(var t={},n=e.getProgramParameter(this.program,e.ACTIVE_UNIFORMS),r=0;r<n;r++){var o=e.getActiveUniform(this.program,r);t[o.name]={name:o.name,location:e.getUniformLocation(this.program,o.name),type:o.type,size:o.size}}return t},this.gatherAttribs=function(){for(var t={},n=e.getProgramParameter(this.program,e.ACTIVE_ATTRIBUTES),r=0;r<n;r++){var o=e.getActiveAttrib(this.program,r);t[o.name]={name:o.name,location:e.getAttribLocation(this.program,o.name),type:o.type,size:o.size}}return t},this.initialize()}},,,,function(e,t,n){var r=n(5);e.exports.loadProgram=function(e,t){return t=(t=t.replace("__noise4d__",'//\n  // GLSL textureless classic 4D noise "cnoise",\n  // with an RSL-style periodic variant "pnoise".\n  // Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n  // Version: 2011-08-22\n  //\n  // Many thanks to Ian McEwan of Ashima Arts for the\n  // ideas for permutation and gradient selection.\n  //\n  // Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n  // Distributed under the MIT license. See LICENSE file.\n  // https://github.com/ashima/webgl-noise\n  //\n  \n  vec4 mod289 (vec4 x)\n  {\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n  }\n  \n  vec4 permute (vec4 x)\n  {\n    return mod289(((x*34.0)+1.0)*x);\n  }\n  \n  vec4 taylorInvSqrt (vec4 r)\n  {\n    return 1.79284291400159 - 0.85373472095314 * r;\n  }\n  \n  vec4 fade (vec4 t) {\n    return t*t*t*(t*(t*6.0-15.0)+10.0);\n  }\n  \n  // Classic Perlin noise\n  float cnoise (vec4 P)\n  {\n    vec4 Pi0 = floor(P); // Integer part for indexing\n    vec4 Pi1 = Pi0 + 1.0; // Integer part + 1\n    Pi0 = mod289(Pi0);\n    Pi1 = mod289(Pi1);\n    vec4 Pf0 = fract(P); // Fractional part for interpolation\n    vec4 Pf1 = Pf0 - 1.0; // Fractional part - 1.0\n    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n    vec4 iy = vec4(Pi0.yy, Pi1.yy);\n    vec4 iz0 = vec4(Pi0.zzzz);\n    vec4 iz1 = vec4(Pi1.zzzz);\n    vec4 iw0 = vec4(Pi0.wwww);\n    vec4 iw1 = vec4(Pi1.wwww);\n  \n    vec4 ixy = permute(permute(ix) + iy);\n    vec4 ixy0 = permute(ixy + iz0);\n    vec4 ixy1 = permute(ixy + iz1);\n    vec4 ixy00 = permute(ixy0 + iw0);\n    vec4 ixy01 = permute(ixy0 + iw1);\n    vec4 ixy10 = permute(ixy1 + iw0);\n    vec4 ixy11 = permute(ixy1 + iw1);\n  \n    vec4 gx00 = ixy00 * (1.0 / 7.0);\n    vec4 gy00 = floor(gx00) * (1.0 / 7.0);\n    vec4 gz00 = floor(gy00) * (1.0 / 6.0);\n    gx00 = fract(gx00) - 0.5;\n    gy00 = fract(gy00) - 0.5;\n    gz00 = fract(gz00) - 0.5;\n    vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);\n    vec4 sw00 = step(gw00, vec4(0.0));\n    gx00 -= sw00 * (step(0.0, gx00) - 0.5);\n    gy00 -= sw00 * (step(0.0, gy00) - 0.5);\n  \n    vec4 gx01 = ixy01 * (1.0 / 7.0);\n    vec4 gy01 = floor(gx01) * (1.0 / 7.0);\n    vec4 gz01 = floor(gy01) * (1.0 / 6.0);\n    gx01 = fract(gx01) - 0.5;\n    gy01 = fract(gy01) - 0.5;\n    gz01 = fract(gz01) - 0.5;\n    vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);\n    vec4 sw01 = step(gw01, vec4(0.0));\n    gx01 -= sw01 * (step(0.0, gx01) - 0.5);\n    gy01 -= sw01 * (step(0.0, gy01) - 0.5);\n  \n    vec4 gx10 = ixy10 * (1.0 / 7.0);\n    vec4 gy10 = floor(gx10) * (1.0 / 7.0);\n    vec4 gz10 = floor(gy10) * (1.0 / 6.0);\n    gx10 = fract(gx10) - 0.5;\n    gy10 = fract(gy10) - 0.5;\n    gz10 = fract(gz10) - 0.5;\n    vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);\n    vec4 sw10 = step(gw10, vec4(0.0));\n    gx10 -= sw10 * (step(0.0, gx10) - 0.5);\n    gy10 -= sw10 * (step(0.0, gy10) - 0.5);\n  \n    vec4 gx11 = ixy11 * (1.0 / 7.0);\n    vec4 gy11 = floor(gx11) * (1.0 / 7.0);\n    vec4 gz11 = floor(gy11) * (1.0 / 6.0);\n    gx11 = fract(gx11) - 0.5;\n    gy11 = fract(gy11) - 0.5;\n    gz11 = fract(gz11) - 0.5;\n    vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);\n    vec4 sw11 = step(gw11, vec4(0.0));\n    gx11 -= sw11 * (step(0.0, gx11) - 0.5);\n    gy11 -= sw11 * (step(0.0, gy11) - 0.5);\n  \n    vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);\n    vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);\n    vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);\n    vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);\n    vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);\n    vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);\n    vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);\n    vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);\n    vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);\n    vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);\n    vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);\n    vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);\n    vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);\n    vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);\n    vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);\n    vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);\n  \n    vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));\n    g0000 *= norm00.x;\n    g0100 *= norm00.y;\n    g1000 *= norm00.z;\n    g1100 *= norm00.w;\n  \n    vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));\n    g0001 *= norm01.x;\n    g0101 *= norm01.y;\n    g1001 *= norm01.z;\n    g1101 *= norm01.w;\n  \n    vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));\n    g0010 *= norm10.x;\n    g0110 *= norm10.y;\n    g1010 *= norm10.z;\n    g1110 *= norm10.w;\n  \n    vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));\n    g0011 *= norm11.x;\n    g0111 *= norm11.y;\n    g1011 *= norm11.z;\n    g1111 *= norm11.w;\n  \n    float n0000 = dot(g0000, Pf0);\n    float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));\n    float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));\n    float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));\n    float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));\n    float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));\n    float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));\n    float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));\n    float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));\n    float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));\n    float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));\n    float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));\n    float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));\n    float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));\n    float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));\n    float n1111 = dot(g1111, Pf1);\n  \n    vec4 fade_xyzw = fade(Pf0);\n    vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);\n    vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);\n    vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);\n    vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);\n    float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);\n    return 2.2 * n_xyzw;\n  }\n  \n  // Classic Perlin noise, periodic version\n  float pnoise (vec4 P, vec4 rep)\n  {\n    vec4 Pi0 = mod(floor(P), rep); // Integer part modulo rep\n    vec4 Pi1 = mod(Pi0 + 1.0, rep); // Integer part + 1 mod rep\n    Pi0 = mod289(Pi0);\n    Pi1 = mod289(Pi1);\n    vec4 Pf0 = fract(P); // Fractional part for interpolation\n    vec4 Pf1 = Pf0 - 1.0; // Fractional part - 1.0\n    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n    vec4 iy = vec4(Pi0.yy, Pi1.yy);\n    vec4 iz0 = vec4(Pi0.zzzz);\n    vec4 iz1 = vec4(Pi1.zzzz);\n    vec4 iw0 = vec4(Pi0.wwww);\n    vec4 iw1 = vec4(Pi1.wwww);\n  \n    vec4 ixy = permute(permute(ix) + iy);\n    vec4 ixy0 = permute(ixy + iz0);\n    vec4 ixy1 = permute(ixy + iz1);\n    vec4 ixy00 = permute(ixy0 + iw0);\n    vec4 ixy01 = permute(ixy0 + iw1);\n    vec4 ixy10 = permute(ixy1 + iw0);\n    vec4 ixy11 = permute(ixy1 + iw1);\n  \n    vec4 gx00 = ixy00 * (1.0 / 7.0);\n    vec4 gy00 = floor(gx00) * (1.0 / 7.0);\n    vec4 gz00 = floor(gy00) * (1.0 / 6.0);\n    gx00 = fract(gx00) - 0.5;\n    gy00 = fract(gy00) - 0.5;\n    gz00 = fract(gz00) - 0.5;\n    vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);\n    vec4 sw00 = step(gw00, vec4(0.0));\n    gx00 -= sw00 * (step(0.0, gx00) - 0.5);\n    gy00 -= sw00 * (step(0.0, gy00) - 0.5);\n  \n    vec4 gx01 = ixy01 * (1.0 / 7.0);\n    vec4 gy01 = floor(gx01) * (1.0 / 7.0);\n    vec4 gz01 = floor(gy01) * (1.0 / 6.0);\n    gx01 = fract(gx01) - 0.5;\n    gy01 = fract(gy01) - 0.5;\n    gz01 = fract(gz01) - 0.5;\n    vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);\n    vec4 sw01 = step(gw01, vec4(0.0));\n    gx01 -= sw01 * (step(0.0, gx01) - 0.5);\n    gy01 -= sw01 * (step(0.0, gy01) - 0.5);\n  \n    vec4 gx10 = ixy10 * (1.0 / 7.0);\n    vec4 gy10 = floor(gx10) * (1.0 / 7.0);\n    vec4 gz10 = floor(gy10) * (1.0 / 6.0);\n    gx10 = fract(gx10) - 0.5;\n    gy10 = fract(gy10) - 0.5;\n    gz10 = fract(gz10) - 0.5;\n    vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);\n    vec4 sw10 = step(gw10, vec4(0.0));\n    gx10 -= sw10 * (step(0.0, gx10) - 0.5);\n    gy10 -= sw10 * (step(0.0, gy10) - 0.5);\n  \n    vec4 gx11 = ixy11 * (1.0 / 7.0);\n    vec4 gy11 = floor(gx11) * (1.0 / 7.0);\n    vec4 gz11 = floor(gy11) * (1.0 / 6.0);\n    gx11 = fract(gx11) - 0.5;\n    gy11 = fract(gy11) - 0.5;\n    gz11 = fract(gz11) - 0.5;\n    vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);\n    vec4 sw11 = step(gw11, vec4(0.0));\n    gx11 -= sw11 * (step(0.0, gx11) - 0.5);\n    gy11 -= sw11 * (step(0.0, gy11) - 0.5);\n  \n    vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);\n    vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);\n    vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);\n    vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);\n    vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);\n    vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);\n    vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);\n    vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);\n    vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);\n    vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);\n    vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);\n    vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);\n    vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);\n    vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);\n    vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);\n    vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);\n  \n    vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));\n    g0000 *= norm00.x;\n    g0100 *= norm00.y;\n    g1000 *= norm00.z;\n    g1100 *= norm00.w;\n  \n    vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));\n    g0001 *= norm01.x;\n    g0101 *= norm01.y;\n    g1001 *= norm01.z;\n    g1101 *= norm01.w;\n  \n    vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));\n    g0010 *= norm10.x;\n    g0110 *= norm10.y;\n    g1010 *= norm10.z;\n    g1110 *= norm10.w;\n  \n    vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));\n    g0011 *= norm11.x;\n    g0111 *= norm11.y;\n    g1011 *= norm11.z;\n    g1111 *= norm11.w;\n  \n    float n0000 = dot(g0000, Pf0);\n    float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));\n    float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));\n    float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));\n    float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));\n    float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));\n    float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));\n    float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));\n    float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));\n    float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));\n    float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));\n    float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));\n    float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));\n    float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));\n    float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));\n    float n1111 = dot(g1111, Pf1);\n  \n    vec4 fade_xyzw = fade(Pf0);\n    vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);\n    vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);\n    vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);\n    vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);\n    float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);\n    return 2.2 * n_xyzw;\n  }')).split("__split__"),new r.Program(e,t[0],t[1])}},,,function(e,t,n){e.exports=n.p+"static/media/twitter.680c9cf1.svg"},function(e,t,n){e.exports=n.p+"static/media/twitch.a9e33e1f.svg"},function(e,t,n){e.exports=n.p+"static/media/soundcloud.9a5d9da3.svg"},function(e,t,n){e.exports=n.p+"static/media/youtube.1aca2eff.svg"},,,function(e,t,n){e.exports=n(31)},,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t),function(e){var t=n(1),r=n(2),o=n(6),i=n(5),a=n(9),s=n(3),g=1e5;function c(e,t,n,r){for(var i,a=Math.pow(r.random(),4),s=[a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a,a],g=[[-e,-e,0],[e,-e,0],[e,e,0],[-e,-e,0],[e,e,0],[-e,e,0]],c=[],f=0;f<6;f++){var l=(i=t,function(e,t){var n=Math.acos(o.vec3.dot(e,t)),r=o.vec3.create();o.vec3.cross(r,e,t),o.vec3.normalize(r,r);var i=o.quat.create();return o.quat.setAxisAngle(i,r,n),i}(o.vec3.fromValues(0,0,-1),i));o.vec3.transformQuat(g[f],g[f],l),g[f][0]+=t[0]*n,g[f][1]+=t[1]*n,g[f][2]+=t[2]*n,c.push.apply(c,g[f])}return{position:c,color:s}}function f(e,t){var n=[-1,-1,-1,1,-1,-1,1,1,-1,-1,-1,-1,1,1,-1,-1,1,-1,1,-1,1,-1,-1,1,-1,1,1,1,-1,1,-1,1,1,1,1,1,1,-1,-1,1,-1,1,1,1,1,1,-1,-1,1,1,1,1,1,-1,-1,-1,1,-1,-1,-1,-1,1,-1,-1,-1,1,-1,1,-1,-1,1,1,-1,1,-1,1,1,-1,1,1,1,-1,1,-1,1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,-1,-1,-1,-1,1,1,-1,-1,-1,-1,-1],r=i.buildAttribs(e,{aPosition:3});r.aPosition.buffer.set(new Float32Array(n));var o=n.length/9;return new i.Renderable(e,t,r,o)}function l(e){var t=o.mat4.create();return o.mat4.rotateX(t,t,e.random()*Math.PI*2),o.mat4.rotateY(t,t,e.random()*Math.PI*2),o.mat4.rotateZ(t,t,e.random()*Math.PI*2),t}function v(e){var t=[0,0,1],n=l(e);return o.vec3.transformMat4(t,t,n),o.vec3.normalize(t,t),t}function u(e){for(var t=0,n=0;n<e.length;n++){t+=(n+1)*e.charCodeAt(n)}return t}e.exports=function(){function e(){Object(t.a)(this,e),this.canvas=document.createElement("canvas"),this.gl=this.canvas.getContext("webgl"),this.gl.enable(this.gl.BLEND),this.gl.blendFuncSeparate(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA,this.gl.ZERO,this.gl.ONE);var n="#version 100\n    precision highp float;\n    \n    uniform mat4 uModel;\n    uniform mat4 uView;\n    uniform mat4 uProjection;\n    \n    attribute vec3 aPosition;\n    varying vec3 pos;\n    \n    void main () {\n      gl_Position = uProjection * uView * uModel * vec4(aPosition, 1);\n      pos = (uModel * vec4(aPosition, 1)).xyz;\n    }\n    \n    \n    __split__\n    \n    \n    #version 100\n    precision highp float;\n    \n    uniform vec3 uColor;\n    uniform vec3 uOffset;\n    uniform float uScale;\n    uniform float uIntensity;\n    uniform float uFalloff;\n    \n    varying vec3 pos;\n    \n    __noise4d__\n    \n    float noise (vec3 p) {\n        return 0.5 * cnoise(vec4(p, 0)) + 0.5;\n    }\n    \n    float nebula (vec3 p) {\n      const int steps = 6;\n      float scale = pow(2.0, float(steps));\n      vec3 displace;\n      for (int i = 0; i < steps; i++) {\n        displace = vec3(\n          noise(p.xyz * scale + displace),\n          noise(p.yzx * scale + displace),\n          noise(p.zxy * scale + displace)\n        );\n        scale *= 0.5;\n      }\n      return noise(p * scale + displace);\n    }\n    \n    void main () {\n      vec3 posn = normalize(pos) * uScale;\n      float c = min(1.0, nebula(posn + uOffset) * uIntensity);\n      c = pow(c, uFalloff);\n      gl_FragColor = vec4(uColor, c);\n    }",r="#version 100\n    precision highp float;\n    \n    uniform mat4 uModel;\n    uniform mat4 uView;\n    uniform mat4 uProjection;\n    \n    attribute vec3 aPosition;\n    attribute vec3 aColor;\n    \n    varying vec3 color;\n    \n    void main () {\n      gl_Position = uProjection * uView * uModel * vec4(aPosition, 1);\n      color = aColor;\n    }\n    \n    \n    __split__\n    \n    \n    #version 100\n    precision highp float;\n    \n    \n    varying vec3 color;\n    \n    void main () {\n      gl_FragColor = vec4(color, 1.0);\n    }",l="#version 100\n    precision highp float;\n    \n    uniform mat4 uModel;\n    uniform mat4 uView;\n    uniform mat4 uProjection;\n    \n    attribute vec3 aPosition;\n    varying vec3 pos;\n    \n    void main () {\n      gl_Position = uProjection * uView * uModel * vec4(aPosition, 1);\n      pos = (uModel * vec4(aPosition, 1)).xyz;\n    }\n    \n    \n    __split__\n    \n    \n    #version 100\n    precision highp float;\n    \n    uniform vec3 uPosition;\n    uniform vec3 uColor;\n    uniform float uSize;\n    uniform float uFalloff;\n    \n    varying vec3 pos;\n    \n    void main () {\n      vec3 posn = normalize(pos);\n      float d = 1.0 - clamp(dot(posn, normalize(uPosition)), 0.0, 1.0);\n      float i = exp(-(d - uSize) * uFalloff);\n      float o = clamp(i, 0.0, 1.0);\n      gl_FragColor = vec4(uColor + i, o);\n    }",v="#version 100\n    precision highp float;\n    \n    uniform mat4 uModel;\n    uniform mat4 uView;\n    uniform mat4 uProjection;\n    \n    attribute vec3 aPosition;\n    varying vec3 pos;\n    \n    void main () {\n      gl_Position = uProjection * uView * uModel * vec4(aPosition, 1);\n      pos = (uModel * vec4(aPosition, 1)).xyz;\n    }\n    \n    \n    __split__\n    \n    \n    #version 100\n    precision highp float;\n    \n    uniform vec3 uPosition;\n    uniform vec3 uColor;\n    uniform float uSize;\n    uniform float uFalloff;\n    \n    varying vec3 pos;\n    \n    void main () {\n      vec3 posn = normalize(pos);\n      float d = clamp(dot(posn, normalize(uPosition)), 0.0, 1.0);\n      float c = smoothstep(1.0 - uSize * 32.0, 1.0 - uSize, d);\n      c += pow(d, uFalloff) * 0.5;\n      vec3 color = mix(uColor, vec3(1,1,1), c);\n      gl_FragColor = vec4(color, c);\n    }";n=n.toString("utf-8"),r=r.toString("utf-8"),l=l.toString("utf-8"),v=v.toString("utf-8"),this.pNebula=a.loadProgram(this.gl,n),this.pPointStars=a.loadProgram(this.gl,r),this.pStar=a.loadProgram(this.gl,l),this.pSun=a.loadProgram(this.gl,v);for(var m=new s.MT(u("best seed ever")+5e3),x=new Float32Array(18*g),d=new Float32Array(18*g),y=0;y<g;y++){l=c(.05,o.vec3.random(o.vec3.create(),1),128,m),x.set(l.position,18*y),d.set(l.color,18*y)}var h=i.buildAttribs(this.gl,{aPosition:3,aColor:3});h.aPosition.buffer.set(x),h.aColor.buffer.set(d);var w=x.length/9;this.rPointStars=new i.Renderable(this.gl,this.pPointStars,h,w),this.rNebula=f(this.gl,this.pNebula),this.rSun=f(this.gl,this.pSun),this.rStar=f(this.gl,this.pStar)}return Object(r.a)(e,[{key:"render",value:function(e){var t={};this.canvas.width=this.canvas.height=e.resolution,this.gl.viewport(0,0,e.resolution,e.resolution);for(var n=new s.MT(u(e.seed)+1e3),r=[];e.pointStars&&(r.push({rotation:l(n)}),!(n.random()<.2)););n=new s.MT(u(e.seed)+3e3);for(var i=[];e.stars&&(i.push({pos:v(n),color:[1,1,1],size:0,falloff:n.random()*Math.pow(2,20)+Math.pow(2,20)}),!(n.random()<.01)););n=new s.MT(u(e.seed)+2e3);for(var a=[];e.nebulae&&(a.push({scale:.5*n.random()+.25,color:[n.random(),n.random(),n.random()],intensity:.2*n.random()+.9,falloff:3*n.random()+3,offset:[2e3*n.random()-1e3,2e3*n.random()-1e3,2e3*n.random()-1e3]}),!(n.random()<.5)););n=new s.MT(u(e.seed)+4e3);var g=[];e.sun&&g.push({pos:v(n),color:[n.random(),n.random(),n.random()],size:1e-4*n.random()+1e-4,falloff:16*n.random()+8});var c={front:{target:[0,0,-1],up:[0,1,0]},back:{target:[0,0,1],up:[0,1,0]},left:{target:[-1,0,0],up:[0,1,0]},right:{target:[1,0,0],up:[0,1,0]},top:{target:[0,1,0],up:[0,0,1]},bottom:{target:[0,-1,0],up:[0,0,-1]}},f=o.mat4.create(),m=o.mat4.create(),x=o.mat4.create();o.mat4.perspective(x,Math.PI/2,1,.1,256);for(var d=Object.keys(c),y=0;y<d.length;y++){this.gl.clearColor(0,0,0,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT);var h=c[d[y]];o.mat4.lookAt(m,[0,0,0],h.target,h.up),this.pPointStars.use(),f=o.mat4.create(),this.pPointStars.setUniform("uView","Matrix4fv",!1,m),this.pPointStars.setUniform("uProjection","Matrix4fv",!1,x);for(var w=0;w<r.length;w++){var p=r[w];o.mat4.mul(f,p.rotation,f),this.pPointStars.setUniform("uModel","Matrix4fv",!1,f),this.rPointStars.render()}for(this.pStar.use(),this.pStar.setUniform("uView","Matrix4fv",!1,m),this.pStar.setUniform("uProjection","Matrix4fv",!1,x),this.pStar.setUniform("uModel","Matrix4fv",!1,f),w=0;w<i.length;w++){var P=i[w];this.pStar.setUniform("uPosition","3fv",P.pos),this.pStar.setUniform("uColor","3fv",P.color),this.pStar.setUniform("uSize","1f",P.size),this.pStar.setUniform("uFalloff","1f",P.falloff),this.rStar.render()}for(this.pNebula.use(),f=o.mat4.create(),w=0;w<a.length;w++){var z=a[w];this.pNebula.setUniform("uModel","Matrix4fv",!1,f),this.pNebula.setUniform("uView","Matrix4fv",!1,m),this.pNebula.setUniform("uProjection","Matrix4fv",!1,x),this.pNebula.setUniform("uScale","1f",z.scale),this.pNebula.setUniform("uColor","3fv",z.color),this.pNebula.setUniform("uIntensity","1f",z.intensity),this.pNebula.setUniform("uFalloff","1f",z.falloff),this.pNebula.setUniform("uOffset","3fv",z.offset),this.rNebula.render()}for(this.pSun.use(),this.pSun.setUniform("uView","Matrix4fv",!1,m),this.pSun.setUniform("uProjection","Matrix4fv",!1,x),this.pSun.setUniform("uModel","Matrix4fv",!1,f),w=0;w<g.length;w++){var b=g[w];this.pSun.setUniform("uPosition","3fv",b.pos),this.pSun.setUniform("uColor","3fv",b.color),this.pSun.setUniform("uSize","1f",b.size),this.pSun.setUniform("uFalloff","1f",b.falloff),this.rSun.render()}var S=document.createElement("canvas");S.width=S.height=e.resolution,S.getContext("2d").drawImage(this.canvas,0,0),t[d[y]]=S}return t}}]),e}()}.call(this,n(8)(e))},,,,function(e,t,n){"use strict";n.r(t),function(e){var t=n(1),r=n(2),o=n(6),i=n(5),a=n(9);e.exports=function(){function e(n){Object(t.a)(this,e),this.renderCanvas=n,this.gl=n.getContext("webgl2"),this.gl||console.log("WebGL 2.0 not supported."),this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,!0);var r="#version 100\n    precision highp float;\n    \n    uniform mat4 uModel;\n    uniform mat4 uView;\n    uniform mat4 uProjection;\n    \n    attribute vec3 aPosition;\n    attribute vec2 aUV;\n    \n    varying vec2 uv;\n    \n    void main () {\n      gl_Position = uProjection * uView * uModel * vec4(aPosition, 1);\n      uv = aUV;\n    }\n    \n    \n    __split__\n    \n    \n    #version 100\n    precision highp float;\n    \n    uniform sampler2D uTexture;\n    \n    varying vec2 uv;\n    \n    void main () {\n      gl_FragColor = texture2D(uTexture, uv);\n    }";r=r.toString("utf-8"),this.pSkybox=a.loadProgram(this.gl,r),this.rSkybox=function(e,t){var n=[-1,-1,-1,1,-1,-1,1,1,-1,-1,-1,-1,1,1,-1,-1,1,-1],r=i.buildAttribs(e,{aPosition:3,aUV:2});r.aPosition.buffer.set(new Float32Array(n)),r.aUV.buffer.set(new Float32Array([0,0,1,0,1,1,0,0,1,1,0,1]));var o=n.length/9;return new i.Renderable(e,t,r,o)}(this.gl,this.pSkybox),this.textures={}}return Object(r.a)(e,[{key:"setTextures",value:function(e){this.textures={};for(var t=Object.keys(e),n=0;n<t.length;n++){var r=e[t[n]];this.textures[t[n]]=new i.Texture(this.gl,0,r,r.width,r.height,{min:this.gl.LINEAR_MIPMAP_LINEAR,mag:this.gl.LINEAR})}}},{key:"render",value:function(e,t){this.gl.viewport(0,0,this.renderCanvas.width,this.renderCanvas.height);var n=o.mat4.create();this.pSkybox.use(),this.pSkybox.setUniform("uView","Matrix4fv",!1,e),this.pSkybox.setUniform("uProjection","Matrix4fv",!1,t),this.textures.front.bind(),this.pSkybox.setUniform("uModel","Matrix4fv",!1,n),this.rSkybox.render(),this.textures.back.bind(),o.mat4.rotateY(n,o.mat4.create(),Math.PI),this.pSkybox.setUniform("uModel","Matrix4fv",!1,n),this.rSkybox.render(),this.textures.left.bind(),o.mat4.rotateY(n,o.mat4.create(),Math.PI/2),this.pSkybox.setUniform("uModel","Matrix4fv",!1,n),this.rSkybox.render(),this.textures.right.bind(),o.mat4.rotateY(n,o.mat4.create(),-Math.PI/2),this.pSkybox.setUniform("uModel","Matrix4fv",!1,n),this.rSkybox.render(),this.textures.top.bind(),o.mat4.rotateX(n,o.mat4.create(),Math.PI/2),this.pSkybox.setUniform("uModel","Matrix4fv",!1,n),this.rSkybox.render(),this.textures.bottom.bind(),o.mat4.rotateX(n,o.mat4.create(),-Math.PI/2),this.pSkybox.setUniform("uModel","Matrix4fv",!1,n),this.rSkybox.render()}}]),e}()}.call(this,n(8)(e))},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),i=n(10),a=n.n(i),s=(n(24),n(1)),g=n(2),c=n(16),f=n(11),l=n(4),v=n(17),u=(n(25),n(12)),m=n.n(u),x=n(13),d=n.n(x),y=n(14),h=n.n(y),w=n(15),p=n.n(w),P=n(6),z=n(26),b=n(30),S=60;S=S/360*Math.PI*2;var _=(1e18*Math.random()).toString(36),E=1024,A=document.getElementById("render-canvas");A.width=window.innerWidth,A.height=window.innerHeight;var M=new b(A),T=new z(E),I=0,U=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(f.a)(t).call(this,e))).renderSpace=n.renderSpace.bind(Object(l.a)(n)),n.renderTextures(),n.renderSpace(),n}return Object(v.a)(t,e),Object(g.a)(t,[{key:"hideUnified",value:function(){document.getElementById("texture-canvas").style.display="none"}},{key:"hideSplit",value:function(){document.getElementById("texture-left").style.display="none",document.getElementById("texture-right").style.display="none",document.getElementById("texture-top").style.display="none",document.getElementById("texture-bottom").style.display="none",document.getElementById("texture-front").style.display="none",document.getElementById("texture-back").style.display="none"}},{key:"renderTextures",value:function(){var e=T.render({seed:_,pointStars:!0,stars:!0,sun:!0,nebulae:!0,unifiedTexture:!0,resolution:E});M.setTextures(e);var t=document.getElementById("texture-canvas");t.width=4*E,t.height=3*E;var n=t.getContext("2d");function r(e,t){var n=document.getElementById(t);n.width=n.height=E,n.getContext("2d").drawImage(e,0,0)}n.drawImage(e.left,0*E,1*E),n.drawImage(e.right,2*E,1*E),n.drawImage(e.front,1*E,1*E),n.drawImage(e.back,3*E,1*E),n.drawImage(e.top,1*E,0*E),n.drawImage(e.bottom,1*E,2*E),r(e.left,"texture-left"),r(e.right,"texture-right"),r(e.front,"texture-front"),r(e.back,"texture-back"),r(e.top,"texture-top"),r(e.bottom,"texture-bottom")}},{key:"renderSpace",value:function(){this.hideUnified(),this.hideSplit(),I+=375e-7;var e=P.mat4.create(),t=P.mat4.create();A.width=window.innerWidth,A.height=window.innerHeight,P.mat4.lookAt(e,[0,0,0],[Math.cos(I),Math.sin(.555*I),Math.sin(I)],[0,1,0]),P.mat4.perspective(t,S,A.width/A.height,.1,8),M.render(e,t),requestAnimationFrame(this.renderSpace)}},{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("div",{className:"information"},o.a.createElement("p",null,"OCTAVIA"),o.a.createElement("div",{className:"links"},o.a.createElement("a",{href:"https://twitter.com/octaviauwu",target:"_blank",rel:"noopener noreferrer"},o.a.createElement("img",{src:m.a,alt:"Twitter Link"})),o.a.createElement("a",{href:"https://www.twitch.tv/octayyvia",target:"_blank",rel:"noopener noreferrer"},o.a.createElement("img",{src:d.a,alt:"Twitch Link"})),o.a.createElement("a",{href:"https://www.soundcloud.com/octaviauwu",target:"_blank",rel:"noopener noreferrer"},o.a.createElement("img",{src:h.a,alt:"SoundCloud Link"})),o.a.createElement("a",{href:"https://www.youtube.com/channel/UCo5iJfS9rDGTNyZmSKKHy5w",target:"_blank",rel:"noopener noreferrer"},o.a.createElement("img",{src:p.a,alt:"YouTube Link"})))),o.a.createElement("div",{className:"heart"},o.a.createElement("p",null,"\u2661")),o.a.createElement("div",{className:"project-button"},o.a.createElement("button",{className:"button"},"PROJECTS")))}}]),t}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(o.a.createElement(U,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[18,1,2]]]);
//# sourceMappingURL=main.21df8b38.chunk.js.map