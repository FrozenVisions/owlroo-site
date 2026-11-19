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

  // Audit form -> mailto (no account needed). TODO: replace with a form service.
  var f=document.getElementById('auditForm');
  f.addEventListener('submit',function(e){
    e.preventDefault();
    if(!f.reportValidity())return;
    var d=new FormData(f),body=['Name: '+d.get('name'),'Business: '+d.get('business'),'Email: '+d.get('email'),'Phone: '+(d.get('phone')||'-'),'Type: '+d.get('type'),'Interested in: '+d.get('plan'),'','What is eating my time:',d.get('msg')||'-'].join('\n');
    location.href='mailto:'+window.BRAND.email+'?subject='+encodeURIComponent('Free AI audit request: '+d.get('business'))+'&body='+encodeURIComponent(body);
    document.getElementById('formOk').style.display='block';
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
