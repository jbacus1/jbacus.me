const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const { roles, projects } = window.portfolio;
const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
let reduced = reducedQuery.matches;
try { reduced = localStorage.getItem('portfolio-motion') === 'off' || reduced; } catch {}
function updateMotion() {
  document.body.classList.toggle('reduced-motion', reduced);
  $('#motion').setAttribute('aria-pressed', reduced);
  $('#motion').textContent = reduced ? 'Enable motion' : 'Reduce motion';
}
$('#motion').onclick = () => { reduced = !reduced; updateMotion(); try { localStorage.setItem('portfolio-motion', reduced ? 'off' : 'on'); } catch {} };
reducedQuery.addEventListener('change', e => { reduced = e.matches; updateMotion(); });
updateMotion();

// Named silhouettes with decorative stars along their contours. Only achievement stars are interactive.
const shapes = [
  { path:'M190 110 L520 110 L415 225 L520 340 L190 340 Z', points:[[190,110],[415,225],[190,340]], decoration:[[280,110],[400,110],[520,110],[467,168],[467,282],[520,340],[400,340],[280,340],[190,225]] },
  { path:'M78 125 C80 260 185 284 284 222 C314 202 334 217 350 232 C366 217 386 202 416 222 C515 284 620 260 622 125 C647 275 551 358 443 305 C402 286 373 270 350 264 C327 270 298 286 257 305 C149 358 53 275 78 125 Z', points:[[78,125],[190,268],[310,218],[390,218],[510,268],[622,125]], decoration:[[92,226],[135,281],[257,305],[350,264],[443,305],[565,281],[608,226]] },
  { path:'M145 300 L165 300 C165 205 216 144 305 132 L305 105 L395 105 L395 132 C484 144 535 205 535 300 L555 300 L555 335 Q350 365 145 335 Z M305 132 L305 278 M395 132 L395 278 M165 300 Q350 325 535 300 M215 278 C215 220 238 183 270 167 M485 278 C485 220 462 183 430 167', points:[[145,300],[230,164],[350,105],[470,164],[555,335]], decoration:[[165,247],[305,132],[395,132],[535,247],[350,350],[305,278],[395,278]] }
];
let roleIndex = 0;
function selectStar(index) {
  const role = roles[roleIndex], star = role.stars[index];
  $$('[data-star]').forEach(b => b.setAttribute('aria-pressed', Number(b.dataset.star) === index));
  $('#experience-detail').innerHTML = `<h2>${star[0]}</h2><p class="role">${role.role}</p><p class="period">${role.period}</p><p>${star[1]}</p>`;
}
function selectRole(index) {
  roleIndex = index;
  const shape = shapes[index];
  $$('[data-role]').forEach(b => b.setAttribute('aria-pressed', Number(b.dataset.role) === index));
  $('#constellation-art').innerHTML = `<path class="constellation-outline" d="${shape.path}"/>` + shape.decoration.map(([x,y]) => `<circle class="faint-star" cx="${x}" cy="${y}" r="1.8"/>`).join('');
  $('#stars').innerHTML = roles[index].stars.map((s,i) => `<button class="star-node" style="left:${shape.points[i][0]/7}%;top:${shape.points[i][1]/4.5}%" data-star="${i}" aria-label="${s[0]}" aria-pressed="false"><span class="tooltip">${s[0]}</span></button>`).join('');
  $$('[data-star]').forEach(b => b.onclick = () => selectStar(Number(b.dataset.star)));
  selectStar(0);
}
$('.role-tabs').innerHTML = roles.map((r,i) => `<button data-role="${i}" aria-pressed="false">${r.name}</button>`).join('');
$$('[data-role]').forEach(b => b.onclick = () => selectRole(Number(b.dataset.role)));
selectRole(0);

const projectDescriptions = {
  'GroupTrip.ai':'A collaborative trip planner with AI-assisted recommendations for flights, hotels, and activities.',
  'Survival Shooter':'A third-person arcade shooter with endless enemy waves, randomized power-ups, and scaling difficulty.'
};
function selectProject(index) {
  const p = projects[index];
  $$('[data-project]').forEach(b => b.setAttribute('aria-pressed', Number(b.dataset.project) === index));
  const links=[{url:p.url,link:p.link},...(p.extraLinks||[])];
  $('#project-detail').innerHTML = `<h2>${p.name}</h2><p class="project-meta">${p.date} · ${p.stack}</p><p>${projectDescriptions[p.name] || p.description}</p><ul>${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul><div class="project-links">${links.map(({url,link}) => `<a class="text-link" href="${url}" ${url.startsWith('https') ? 'target="_blank" rel="noopener"' : ''}>${link.replace('Enter the repository','View source').replace('Inspect the source','View source')} ↗</a>`).join('')}</div>`;
}
$('#project-list').innerHTML = projects.map((p,i) => `<button data-project="${i}" aria-pressed="false">${p.name}</button>`).join('');
$$('[data-project]').forEach(b => b.onclick = () => { selectProject(Number(b.dataset.project)); if(innerWidth<701) $('#project-detail').scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'}); });
selectProject(0);
const skills = {
  languages:['Languages', [['Programming','C# · C · Java · Python<br>JavaScript · TypeScript · SQL<br>HTML · CSS · Bash'],['Spoken languages','English<br>Arabic (conversational)']]],
  tools:['Tools & Technologies', [['Web & AI','React · Tailwind CSS · Supabase<br>LangGraph · RAG · LLM integration<br>Agent harnesses · Skill creation'],['Interactive systems','Unity3D · Revit<br>Tobii eye tracking · ANTLR'],['Development','Git · Agile development<br>API integration · Algorithm design'],['Leadership','Project scoping · Mentorship<br>Cross-functional collaboration']]],
  courses:['Coursework', [['Computer Science','Algorithms<br>Machine Learning & Statistical Analysis<br>Software Design & Implementation<br>Principles of Programming Languages<br>Web Development'],['Foundations','Object-Oriented Programming<br>Foundations of Applied CS<br>Discrete Math'],['Middle Eastern Studies','Morocco Language Study Abroad<br>Arabic Drill Instructor']]],
  interests:['Interests', [['Outdoors','Snowboarding · Hiking · Travel'],['Languages & culture','Middle Eastern Studies<br>Conversational Arabic'],['Music','Dartmouth Glee Club'],['Community','Zeta Psi President<br>Class Council<br>Dartmouth Advising and Research for Tech Startups (DARTS)<br>Quiz Bowl']]]
};
function selectSkill(key) {
  $$('[data-school]').forEach(b => b.setAttribute('aria-pressed', b.dataset.school === key));
  const [name, groups] = skills[key];
  $('#skill-detail').innerHTML = `<h2>${name}</h2><div class="skill-grid">${groups.map(([title,text]) => `<div><h3>${title}</h3><p>${text}</p></div>`).join('')}</div>`;
}
$$('[data-school]').forEach(b => b.onclick = () => selectSkill(b.dataset.school));
selectSkill('languages');

const radial = $('.radial');
let chosen = null;
function choose(direction) {
  chosen = direction;
  radial.dataset.active = direction || '';
  const offsets = {north:[0,14],south:[0,-14],west:[22,0],east:[-22,0]};
  const [x,y] = offsets[direction] || [0,0];
  radial.style.setProperty('--rx', `${x}px`);
  radial.style.setProperty('--ry', `${y}px`);
  radial.style.setProperty('--rz', direction ? '1.08' : '1');
  $$('.direction').forEach(a => a.classList.toggle('active', a.dataset.direction === direction));
}
radial.addEventListener('pointermove', e => {
  if(e.pointerType==='touch') return;
  const r=radial.getBoundingClientRect(), x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2;
  choose(Math.hypot(x,y)<30 ? null : Math.abs(x)>Math.abs(y)*1.9 ? (x>0?'east':'west') : (y>0?'south':'north'));
});
radial.addEventListener('pointerleave', () => choose(null));
$$('.direction').forEach(a => a.addEventListener('focus', () => choose(a.dataset.direction)));
radial.addEventListener('click', e => { if(!e.target.closest('a') && chosen) location.hash=$(`[data-direction=${chosen}]`).hash; });

let view='home', transitionID=0, resumeOrigin='home';
const aliases={inventory:'projects',magic:'skills',map:'more'};
const titles={home:'Jacob Bacus',projects:'Projects',skills:'Skills & Interests',experience:'Experience',more:'More',resume:'Résumé'};
async function route(initial=false) {
  let next=location.hash.slice(1)||'home';
  if(next==='main'){ $('#main').focus(); return; }
  next=aliases[next]||next;
  if(!titles[next]) next='home';
  if(next===view&&!initial&&document.body.dataset.view===next) return;
  const ticket=++transitionID;
  const previous=$(`#${view}`), incoming=$(`#${next}`);
  if(next==='resume'&&view!=='resume') resumeOrigin=view;
  // Side menus scoot the UI; vertical destinations move the camera between scenes.
  // Reversing the endpoints also reverses the entire Back animation.
  const positions={home:[0,0],skills:[-90,0],projects:[90,0],experience:[0,-innerHeight],more:[0,innerHeight],resume:[0,0]};
  const from=positions[view], to=positions[next];
  const x=from[0]-to[0], y=from[1]-to[1];
  $$('.view').forEach(el=>{
    el.getAnimations().forEach(a=>a.cancel());
    el.classList.remove('view-leaving');
    el.hidden=el!==incoming;
    el.inert=el!==incoming;
  });
  view=next;
  document.body.dataset.view=next;
  $('.back').hidden=next==='home';
  $('.back').href=`#${next==='resume'?resumeOrigin:'home'}`;
  $('.back').setAttribute('aria-label', `Back to ${titles[next==='resume'?resumeOrigin:'home']}`);
  $('#motion').hidden=next!=='home';
  $('.resume-link').hidden=next==='resume';
  document.title=next==='home'?'Jacob Bacus':`${titles[next]} · Jacob Bacus`;
  window.scrollTo(0,0);
  if(!initial&&!reduced&&previous!==incoming) {
    document.body.classList.add('transitioning');
    previous.hidden=false;
    previous.classList.add('view-leaving');
    const timing={duration:650,easing:'cubic-bezier(.22,.7,.25,1)',fill:'both'};
    const outgoing=previous.animate([{opacity:1,transform:'translate(0,0)'},{opacity:0,transform:`translate(${x}px,${y}px)`}],timing);
    const entering=incoming.animate([{opacity:0,transform:`translate(${-x}px,${-y}px)`},{opacity:1,transform:'translate(0,0)'}],timing);
    await Promise.all([outgoing.finished,entering.finished]).catch(()=>{});
    if(ticket!==transitionID) return;
    previous.hidden=true;
    previous.classList.remove('view-leaving');
    outgoing.cancel();
    entering.cancel();
  }
  document.body.classList.remove('transitioning');
  if(!initial) (next==='home'?$('.north'):incoming.querySelector('h1')).focus({preventScroll:true});
}
window.addEventListener('hashchange',()=>route());
// Prevent the browser's native fragment jump from racing the animated transition.
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();if(a.hash==='#main'){$('#main').focus();return;}history.pushState(null,'',a.hash);route();}));
window.addEventListener('popstate',()=>route());
route(true);
document.addEventListener('keydown',e=>{
  if(e.ctrlKey||e.altKey||e.metaKey||/INPUT|TEXTAREA/.test(e.target.tagName))return;
  if(e.key==='Escape'&&view!=='home'){history.pushState(null,'',$('.back').hash);route();}
  const dirs={ArrowUp:'north',ArrowDown:'south',ArrowLeft:'west',ArrowRight:'east'};
  if(view==='home'&&dirs[e.key]){e.preventDefault();choose(dirs[e.key]);$(`[data-direction=${chosen}]`).focus({preventScroll:true});}
});
document.addEventListener('pointermove',e=>{if(reduced||e.pointerType==='touch')return;document.documentElement.style.setProperty('--mx',`${(e.clientX/innerWidth-.5)*-17}px`);document.documentElement.style.setProperty('--my',`${(e.clientY/innerHeight-.5)*-12}px`);});

const canvas=$('#sky'), ctx=canvas.getContext('2d');
let stars=[], frame=0;
function resize(){const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=innerWidth*dpr;canvas.height=innerHeight*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);let seed=42;const rand=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};stars=Array.from({length:230},()=>({x:rand()*innerWidth,y:rand()*innerHeight,r:rand()*1.2+.2,phase:rand()*6.28}));draw(0);}
function draw(time){ctx.clearRect(0,0,innerWidth,innerHeight);for(const s of stars){ctx.fillStyle=`rgba(205,227,245,${.25+.45*(.5+.5*Math.sin((reduced?0:time/2600)+s.phase))})`;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();}}
let last=0;
function animate(time){if(time-last>45){draw(time);last=time;}frame=requestAnimationFrame(animate);}
resize();window.addEventListener('resize',resize);frame=requestAnimationFrame(animate);
document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(frame);if(!document.hidden)frame=requestAnimationFrame(animate);});
