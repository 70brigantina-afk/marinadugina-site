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
  const whatsappLinks=document.querySelectorAll('[data-whatsapp-link]');
  const mobileDevice=(navigator.userAgentData&&navigator.userAgentData.mobile)||/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const whatsappUrl=mobileDevice?'whatsapp://send?phone=79208433369':'https://web.whatsapp.com/send?phone=79208433369';
  whatsappLinks.forEach(function(link){link.setAttribute('href',whatsappUrl);});
})();
