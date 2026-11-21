import"./Header.astro_astro_type_script_index_0_lang.DpSk27Y3.js";const q=`
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
  vec2 w = vec2(fbm(q*1.4 + vec2(tt, -tt*0.6)), fbm(q*1.4 + vec2(-tt*0.7, tt) + 5.2));
  float n = fbm(q*1.8 + 1.6*w + vec2(0.0, tt*0.5));
  float s = smoothstep(0.35, 0.95, n);
  col = base + ember*s*1.25 + brass*pow(s,2.2)*0.5*(0.45+glow) + brass*glow*0.22;
`,O=`
  vec2 b = mat2(0.825,-0.565,0.565,0.825) * q;
  float beams = 0.0;
  for (int i=0;i<4;i++){ float fi=float(i); float x = b.x + sin(tt*0.8 + fi*1.7)*0.35 + fi*0.45 - 0.7; beams += exp(-x*x*10.0) * (0.55 + 0.45*sin(tt*1.3 + fi*2.1)); }
  float dust = fbm(q*3.0 + vec2(tt*0.4, 0.0));
  beams *= 0.55 + 0.6*dust;
  float fall = smoothstep(1.5, 0.0, length(uv - vec2(1.0, 1.05)));
  col = base + brass*beams*fall*0.5 + ember*fall*0.28 + brass*glow*0.16;
`,U=`
  col = mix(base, col, u_intro);
  float v = length(uv - 0.5) * 1.25; col *= 1.0 - 0.5*v*v;
  col += (hash(gl_FragCoord.xy + fract(u_time)*100.0) - 0.5) * 0.02;
  gl_FragColor = vec4(col, 1.0);
}
`;function y(r,o,c){const n=r.createShader(o);return n?(r.shaderSource(n,c),r.compileShader(n),r.getShaderParameter(n,r.COMPILE_STATUS)?n:(r.deleteShader(n),null)):null}function k(){const r=document.querySelector("[data-talk]"),o=r?.querySelector(".talk__light");if(!r||!o)return;const c=new URLSearchParams(location.search).get("light")==="leak"?"leak":"smoke";r.dataset.light=c;const n=()=>{o.style.display="none"},e=o.getContext("webgl",{alpha:!1,antialias:!1,premultipliedAlpha:!1,powerPreference:"low-power"});if(!e)return n();const p=y(e,e.VERTEX_SHADER,q),b=y(e,e.FRAGMENT_SHADER,C+(c==="leak"?O:I)+U),a=e.createProgram();if(!p||!b||!a||(e.attachShader(a,p),e.attachShader(a,b),e.linkProgram(a),!e.getProgramParameter(a,e.LINK_STATUS)))return n();e.useProgram(a);const E=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,E),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW);const x=e.getAttribLocation(a,"a_pos");e.enableVertexAttribArray(x),e.vertexAttribPointer(x,2,e.FLOAT,!1,0,0);const F=e.getUniformLocation(a,"u_res"),L=e.getUniformLocation(a,"u_time"),M=e.getUniformLocation(a,"u_intro"),T=e.getUniformLocation(a,"u_light"),w=r.querySelector(".talk__john"),P=matchMedia("(prefers-reduced-motion: reduce)").matches;let h=[.7,.6];function m(){const t=Math.min(window.devicePixelRatio||1,1.5)*.5,i=o.getBoundingClientRect(),s=Math.max(1,Math.round(i.width*t)),_=Math.max(1,Math.round(i.height*t));if((o.width!==s||o.height!==_)&&(o.width=s,o.height=_),e.viewport(0,0,s,_),w&&i.width>0&&i.height>0){const u=w.getBoundingClientRect();h=[(u.left+u.width*.5-i.left)/i.width,1-(u.top+u.height*.32-i.top)/i.height]}}function v(t,i){e.uniform2f(F,o.width,o.height),e.uniform1f(L,t),e.uniform1f(M,i),e.uniform2f(T,h[0],h[1]),e.drawArrays(e.TRIANGLES,0,3)}if(m(),P){v(20,1),new ResizeObserver(()=>{m(),v(20,1)}).observe(o);return}let d=0,l=!1,A=!0,f=0,R=0;function S(t){if(d=requestAnimationFrame(S),t-R<33)return;R=t,f||(f=t);const i=Math.min((t-f)/1100,1),s=1-Math.pow(1-i,3);v((t-f)/1e3%3600,s)}function g(){const t=A&&!document.hidden;t&&!l?(l=!0,d=requestAnimationFrame(S)):!t&&l&&(l=!1,cancelAnimationFrame(d))}new ResizeObserver(()=>{m()}).observe(o),new IntersectionObserver(t=>{A=t[t.length-1].isIntersecting,g()}).observe(r),document.addEventListener("visibilitychange",g),g()}k();
