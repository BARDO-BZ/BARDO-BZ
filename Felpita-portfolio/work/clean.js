const { chromium } = require('playwright');
const hide=()=>{for(const e of document.querySelectorAll('body *')){const c=getComputedStyle(e);if(c.position==='fixed'&&!e.closest('header')&&e.getBoundingClientRect().top>200)e.style.setProperty('display','none','important')}
 document.querySelectorAll('iframe').forEach(f=>{const r=f.getBoundingClientRect();if(r.width<500)f.style.display='none'})};
(async()=>{const b=await chromium.launch();
for(const [k,vp,dsf,shots] of [['cur',{width:1440,height:900},2,[0,1200,2900]],['cm',{width:390,height:844},3,[0,500,1250,1750]]]){
 const ctx=await b.newContext({viewport:vp,deviceScaleFactor:dsf,isMobile:k==='cm',hasTouch:k==='cm'});
 const p=await ctx.newPage();
 try{await p.goto('https://www.felpita.com.ar/',{waitUntil:'networkidle',timeout:45000})}catch(e){}
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);
 for(let y=0;y<H;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(250)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1500);
 for(const y of shots){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(2200);await p.evaluate(hide);await p.waitForTimeout(300);
  await p.screenshot({path:`${k}/y${y}.png`})}
 await ctx.close();}
await b.close()})();
