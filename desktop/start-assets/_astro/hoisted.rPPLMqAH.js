import"./Header.astro_astro_type_script_index_0_lang.GtdH_7Gp.js";const P=`
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`,C=`
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_res;
uniform float u_time;
uniform float u_intro;
uniform vec2 u_light;

float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p=p*2.02+vec2(1.7,9.2); a*=0.5; } return v; }

const vec3 base = vec3(0.059,0.051,0.043);
const vec3 brass = vec3(0.788,0.651,0.420);
const vec3 ember = vec3(0.23,0.16,0.09);

void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 q = (gl_FragCoord.xy - 0.5*u_res) / min(u_res.x, u_res.y);
  float tt = u_time * 0.035;
  float d = length((uv - u_light) * vec2(u_res.x/min(u_res.x,u_res.y), u_res.y/min(u_res.x,u_res.y)));
  float glow = exp(-d*d*2.2);
  vec3 col;
`,I=`
  vec2 b = mat2(0.825,-0.565,0.565,0.825) * q;
  float beams = 0.0;
  for (int i=0;i<4;i++){ float fi=float(i); float x = b.x + sin(tt*0.8 + fi*1.7)*0.35 + fi*0.45 - 0.7; beams += exp(-x*x*10.0) * (0.55 + 0.45*sin(tt*1.3 + fi*2.1)); }
  float dust = fbm(q*3.0 + vec2(tt*0.4, 0.0));
  beams *= 0.55 + 0.6*dust;
  float fall = smoothstep(1.5, 0.0, length(uv - vec2(1.0, 1.05)));
  col = base + brass*beams*fall*0.5 + ember*fall*0.28 + brass*glow*0.16;
`,q=`
  col = mix(base, col, u_intro);
  float v = length(uv - 0.5) * 1.25; col *= 1.0 - 0.5*v*v;
  col += (hash(gl_FragCoord.xy + fract(u_time)*100.0) - 0.5) * 0.02;
  gl_FragColor = vec4(col, 1.0);
}
`;function y(o,r,a){const e=o.createShader(r);return e?(o.shaderSource(e,a),o.compileShader(e),o.getShaderParameter(e,o.COMPILE_STATUS)?e:(o.deleteShader(e),null)):null}function O(){const o=document.querySelector("[data-talk]"),r=o?.querySelector(".talk__light");if(!o||!r)return;const a=()=>{r.style.display="none"},e=r.getContext("webgl",{alpha:!1,antialias:!1,premultipliedAlpha:!1,powerPreference:"low-power"});if(!e)return a();const _=y(e,e.VERTEX_SHADER,P),p=y(e,e.FRAGMENT_SHADER,C+I+q),n=e.createProgram();if(!_||!p||!n||(e.attachShader(n,_),e.attachShader(n,p),e.linkProgram(n),!e.getProgramParameter(n,e.LINK_STATUS)))return a();e.useProgram(n);const S=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,S),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);const b=e.getAttribLocation(n,"a_pos");e.enableVertexAttribArray(b),e.vertexAttribPointer(b,2,e.FLOAT,!1,0,0);const F=e.getUniformLocation(n,"u_res"),E=e.getUniformLocation(n,"u_time"),L=e.getUniformLocation(n,"u_intro"),T=e.getUniformLocation(n,"u_light"),x=o.querySelector(".talk__john"),M=matchMedia("(prefers-reduced-motion: reduce)").matches;let u=[.7,.6];function h(){const t=Math.min(window.devicePixelRatio||1,1.5)*.5,i=r.getBoundingClientRect(),s=Math.max(1,Math.round(i.width*t)),g=Math.max(1,Math.round(i.height*t));if((r.width!==s||r.height!==g)&&(r.width=s,r.height=g),e.viewport(0,0,s,g),x&&i.width>0&&i.height>0){const l=x.getBoundingClientRect();u=[(l.left+l.width*.5-i.left)/i.width,1-(l.top+l.height*.32-i.top)/i.height]}}function m(t,i){e.uniform2f(F,r.width,r.height),e.uniform1f(E,t),e.uniform1f(L,i),e.uniform2f(T,u[0],u[1]),e.drawArrays(e.TRIANGLES,0,3)}if(h(),M){m(20,1),new ResizeObserver(()=>{h(),m(20,1)}).observe(r);return}let d=0,c=!1,A=!0,f=0,R=0;function w(t){if(d=requestAnimationFrame(w),t-R<33)return;R=t,f||(f=t);const i=Math.min((t-f)/1100,1),s=1-Math.pow(1-i,3);m((t-f)/1e3%3600,s)}function v(){const t=A&&!document.hidden;t&&!c?(c=!0,d=requestAnimationFrame(w)):!t&&c&&(c=!1,cancelAnimationFrame(d))}new ResizeObserver(()=>{h()}).observe(r),new IntersectionObserver(t=>{A=t[t.length-1].isIntersecting,v()}).observe(o),document.addEventListener("visibilitychange",v),v()}O();
