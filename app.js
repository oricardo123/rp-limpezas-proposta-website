(()=>{'use strict';
const menu=document.querySelector('.menu-toggle'),nav=document.getElementById('nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open')}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){menu.setAttribute('aria-expanded','false');nav.classList.remove('is-open');menu.focus()}});
const tabs=[...document.querySelectorAll('[role="tab"]')];
function activate(id,focus=false){tabs.forEach(tab=>{const selected=tab.dataset.service===id;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;document.getElementById(tab.getAttribute('aria-controls')).hidden=!selected;if(selected&&focus)tab.focus()})}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>activate(tab.dataset.service));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(index+1)%tabs.length;if(e.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();activate(tabs[next].dataset.service,true)}})});
document.querySelectorAll('[data-open-service]').forEach(link=>link.addEventListener('click',()=>activate(link.dataset.openService)));
const form=document.getElementById('request-form'),service=document.getElementById('service'),space=document.getElementById('space'),need=document.getElementById('need'),summary=document.getElementById('summary'),text=document.getElementById('summary-text');
form.addEventListener('submit',e=>e.preventDefault());
form.addEventListener('input',()=>{summary.hidden=true});form.addEventListener('change',()=>{summary.hidden=true});
document.querySelectorAll('[data-choose-service]').forEach(link=>link.addEventListener('click',()=>{service.value=link.dataset.chooseService;summary.hidden=true}));
document.getElementById('make-summary').addEventListener('click',()=>{text.textContent=`Área: ${service.value}\nEspaço: ${space.value||'Ainda por indicar'}\nDescrição: ${need.value.trim()||'Ainda por descrever'}`;summary.hidden=false});
})();
