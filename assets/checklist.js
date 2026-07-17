(function(){
  'use strict';

  const storageKey='marina-checklist-v1';
  const startButton=document.querySelector('[data-start-checklist]');
  const printButton=document.querySelector('[data-print-checklist]');
  const clearButton=document.querySelector('[data-clear-checklist]');
  const status=document.querySelector('[data-save-status]');
  const fields=Array.from(document.querySelectorAll('[data-answer]'));

  if(!fields.length)return;

  const showEditor=function(focusFirst){
    document.body.classList.add('editing');
    if(focusFirst)fields[0].focus();
  };

  const readAnswers=function(){
    try{
      const saved=window.localStorage.getItem(storageKey);
      return saved?JSON.parse(saved):{};
    }catch(error){
      return {};
    }
  };

  const collectAnswers=function(){
    return fields.reduce(function(answers,field){
      answers[field.id]=field.value;
      return answers;
    },{});
  };

  const saveAnswers=function(){
    try{
      window.localStorage.setItem(storageKey,JSON.stringify(collectAnswers()));
      if(status)status.textContent='Ответы сохранены в этом браузере';
    }catch(error){
      if(status)status.textContent='Браузер не разрешил локальное сохранение';
    }
  };

  const savedAnswers=readAnswers();
  fields.forEach(function(field){field.value=savedAnswers[field.id]||'';});
  if(fields.some(function(field){return field.value.trim()!=='';}))showEditor(false);

  if(startButton)startButton.addEventListener('click',function(){showEditor(true);});
  if(printButton)printButton.addEventListener('click',function(){window.print();});
  fields.forEach(function(field){field.addEventListener('input',saveAnswers);});

  if(clearButton){
    clearButton.addEventListener('click',function(){
      const confirmed=window.confirm('Удалить все ваши ответы из этого браузера?');
      if(!confirmed)return;
      try{window.localStorage.removeItem(storageKey);}catch(error){}
      fields.forEach(function(field){field.value='';});
      if(status)status.textContent='Ответы удалены';
      fields[0].focus();
    });
  }
})();
