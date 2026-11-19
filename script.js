(function(){
  // Billing toggle: yearly = 10x monthly (2 months free)
  var btns=document.querySelectorAll('.billing button');
  function setBill(mode){
    btns.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.bill===mode)});
    document.querySelectorAll('.plan').forEach(function(p){
      var m=+p.dataset.m, per=mode==='yearly'?Math.round(m*10/12):m;
      p.querySelector('.amt').textContent=per;
      p.querySelector('.day').textContent=(per*12/365).toFixed(2);
      p.querySelector('.per').textContent=mode==='yearly'?'/month, billed yearly':'/month';
    });
  }
  btns.forEach(function(b){b.addEventListener('click',function(){setBill(b.dataset.bill)})});

  // Plan buttons preselect plan in audit form
  var sel=document.getElementById('planSelect');
  document.querySelectorAll('[data-plan]').forEach(function(a){
    a.addEventListener('click',function(){sel.value=a.dataset.plan});
  });

  // Audit form -> FormSubmit (free, no account), with a mailto fallback
  var f=document.getElementById('auditForm');
  f.addEventListener('submit',function(e){
    e.preventDefault();
    if(!f.reportValidity())return;
    var d=new FormData(f);
    if(d.get('_honey'))return;
    var btn=f.querySelector('button[type=submit]'),ok=document.getElementById('formOk');
    var body=['Name: '+d.get('name'),'Business: '+d.get('business'),'Email: '+d.get('email'),'Phone: '+(d.get('phone')||'-'),'Type: '+d.get('type'),'Interested in: '+d.get('plan'),'','What is eating my time:',d.get('msg')||'-'].join('\n');
    var subj='Free AI audit request: '+d.get('business');
    function fallback(){
      location.href='mailto:'+window.BRAND.email+'?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
      ok.textContent="Your email app should have opened with your details. Just press send. If it didn't, email "+window.BRAND.email+".";
      ok.style.display='block';
    }
    btn.disabled=true;btn.textContent='Sending…';
    fetch('https://formsubmit.co/ajax/'+window.BRAND.form,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify({_subject:subj,_template:'table',_replyto:d.get('email'),name:d.get('name'),business:d.get('business'),email:d.get('email'),phone:d.get('phone')||'-',type:d.get('type'),plan:d.get('plan'),message:d.get('msg')||'-'})})
    .then(function(r){return r.json()}).then(function(j){
      if(j&&(j.success===true||j.success==='true')){ok.style.display='block';f.reset();btn.textContent='Sent ✓';}
      else{btn.disabled=false;btn.textContent='Send me my free audit';fallback();}
    }).catch(function(){btn.disabled=false;btn.textContent='Send me my free audit';fallback();});
  });

  // Mobile sticky CTA after hero
  var cta=document.getElementById('mobileCta'),hero=document.querySelector('.hero'),audit=document.getElementById('audit');
  if('IntersectionObserver' in window){
    var heroVis=true,auditVis=false;
    function upd(){cta.classList.toggle('show',!heroVis&&!auditVis)}
    new IntersectionObserver(function(e){heroVis=e[0].isIntersecting;upd()}).observe(hero);
    new IntersectionObserver(function(e){auditVis=e[0].isIntersecting;upd()}).observe(audit);
  }
})();
