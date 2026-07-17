(function(){
  'use strict';
  const toggle=document.querySelector('.nav-toggle');
  const nav=document.querySelector('.site-nav');
  const closeMenu=function(){
    if(!toggle||!nav)return;
    toggle.setAttribute('aria-expanded','false');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };
  if(toggle&&nav){
    toggle.addEventListener('click',function(){
      const open=toggle.getAttribute('aria-expanded')==='true';
      toggle.setAttribute('aria-expanded',String(!open));
      nav.classList.toggle('is-open',!open);
      document.body.classList.toggle('menu-open',!open);
    });
    nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',closeMenu);});
    window.addEventListener('resize',function(){if(window.innerWidth>980)closeMenu();});
  }

  const whatsapp=document.querySelector('[data-whatsapp]');
  if(whatsapp){
    const phone='79208433369';
    const desktopUrl='https://web.whatsapp.com/send?phone='+phone;
    const appUrl='whatsapp://send?phone='+phone;
    const fallbackUrl='https://wa.me/'+phone;
    const coarsePointer=window.matchMedia&&window.matchMedia('(pointer:coarse)').matches;
    const mobile=Boolean(
      (navigator.userAgentData&&navigator.userAgentData.mobile)||
      /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||
      (coarsePointer&&window.innerWidth<=900)
    );

    if(mobile){
      whatsapp.href=appUrl;
      whatsapp.removeAttribute('target');
      whatsapp.addEventListener('click',function(event){
        event.preventDefault();
        let fallbackTimer=window.setTimeout(function(){window.location.href=fallbackUrl;},1500);
        const cancelFallback=function(){
          if(document.hidden&&fallbackTimer){
            window.clearTimeout(fallbackTimer);
            fallbackTimer=null;
          }
        };
        document.addEventListener('visibilitychange',cancelFallback,{once:true});
        window.location.href=appUrl;
      });
    }else{
      whatsapp.href=desktopUrl;
      whatsapp.target='_blank';
      whatsapp.rel='noopener';
    }
  }
})();
