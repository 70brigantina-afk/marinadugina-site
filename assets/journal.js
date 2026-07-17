(function(){
  'use strict';
  const storageKey='marina-journal-v1';
  const panels=Array.from(document.querySelectorAll('.day-panel'));
  const navButtons=Array.from(document.querySelectorAll('[data-day-button]'));
  const progress=document.getElementById('journal-progress');
  const progressText=document.getElementById('progress-text');
  const status=document.getElementById('save-status');
  let state={};
  let timer;

  try{state=JSON.parse(localStorage.getItem(storageKey)||'{}')||{};}catch(error){state={};}

  function fieldsFor(day){return panels[day-1].querySelectorAll('textarea,input[type="checkbox"]');}
  function hydrate(){
    panels.forEach(function(panel,index){
      const day=String(index+1); const values=state[day]||{};
      fieldsFor(index+1).forEach(function(field){
        if(field.type==='checkbox')field.checked=Boolean(values[field.name]);
        else field.value=values[field.name]||'';
      });
    });
    updateProgress();
  }
  function collect(day){
    const values={};
    fieldsFor(day).forEach(function(field){values[field.name]=field.type==='checkbox'?field.checked:field.value;});
    state[String(day)]=values;
  }
  function save(day){
    collect(day);
    try{
      localStorage.setItem(storageKey,JSON.stringify(state));
      status.textContent='Сохранено только на этом устройстве';
    }catch(error){status.textContent='Не удалось сохранить. Возможно, в браузере запрещено локальное хранилище.';}
    updateProgress();
  }
  function queueSave(day){
    status.textContent='Сохраняю…';
    clearTimeout(timer);
    timer=setTimeout(function(){save(day);},350);
  }
  function updateProgress(){
    const complete=panels.filter(function(panel){return panel.querySelector('input[type="checkbox"]').checked;}).length;
    const percent=Math.round(complete/7*100);
    progress.style.width=percent+'%';
    progress.parentElement.setAttribute('aria-valuenow',String(percent));
    progressText.textContent=complete+' из 7';
    navButtons.forEach(function(button,index){button.classList.toggle('is-done',panels[index].querySelector('input[type="checkbox"]').checked);});
  }
  function showDay(day,moveFocus){
    const safe=Math.min(7,Math.max(1,Number(day)||1));
    panels.forEach(function(panel,index){panel.hidden=index!==safe-1;});
    navButtons.forEach(function(button,index){button.setAttribute('aria-pressed',String(index===safe-1));});
    history.replaceState(null,'','#day-'+safe);
    if(moveFocus)panels[safe-1].querySelector('h2').focus();
  }
  navButtons.forEach(function(button){button.addEventListener('click',function(){showDay(button.dataset.dayButton,true);});});
  panels.forEach(function(panel,index){
    panel.addEventListener('input',function(){queueSave(index+1);});
    panel.querySelectorAll('[data-next-day]').forEach(function(button){button.addEventListener('click',function(){save(index+1);showDay(button.dataset.nextDay,true);window.scrollTo({top:0,behavior:'smooth'});});});
  });
  document.getElementById('delete-journal').addEventListener('click',function(){
    if(!window.confirm('Удалить все записи и отметки прохождения с этого устройства? Восстановить их будет нельзя.'))return;
    localStorage.removeItem(storageKey); state={};
    panels.forEach(function(panel){panel.querySelectorAll('textarea').forEach(function(field){field.value='';});panel.querySelector('input[type="checkbox"]').checked=false;});
    updateProgress(); status.textContent='Все записи удалены с этого устройства'; showDay(1,true);
  });
  hydrate();
  const initial=(location.hash.match(/day-(\d)/)||[])[1]||1;
  showDay(initial,false);
})();
