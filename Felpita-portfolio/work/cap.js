const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();
const fonts=new Set();
for(const [k,vp,dsf] of [['d',{width:1440,height:900},2],['m',{width:390,height:844},3]]){
 const ctx=await b.newContext({viewport:vp,deviceScaleFactor:dsf,isMobile:k==='m',hasTouch:k==='m'});
 const p=await ctx.newPage();
 p.on('request',r=>{const u=r.url();if(/\.(woff2?|ttf|otf)(\?|$)/i.test(u))fonts.add(u)});
 try{await p.goto('https://www.felpita.com.ar/',{waitUntil:'networkidle',timeout:45000})}catch(e){}
 await p.waitForTimeout(3000);
 // close popups
 await p.keyboard.press('Escape').catch(()=>{});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);
 const step=Math.round(vp.height*0.8);let n=0;
 for(let y=0;y<H && n<25;y+=step){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(1200);
   await p.screenshot({path:`${k}/s_${String(n).padStart(2,'0')}.png`});n++}
 if(k==='d'){const info=await p.evaluate(()=>{const o={};for(const s of ['h1','h2','h3','p','a','button','body','.header__menu-item'])  {const e=document.querySelector(s);if(e){const c=getComputedStyle(e);o[s]=c.fontFamily+' | '+c.fontWeight+' | '+c.color+' | '+c.backgroundColor}}
  o.imgs=[...document.querySelectorAll('img')].map(i=>i.currentSrc||i.src).filter(Boolean).slice(0,80);
  o.svgs=[...document.querySelectorAll('header svg, .header__heading-logo, header img')].map(e=>e.outerHTML.slice(0,300));return o});
  require('fs').writeFileSync('info.json',JSON.stringify(info,null,1));}
 console.log(k,H,n);await ctx.close();}
console.log([...fonts].join('\n'));
await b.close()})();
