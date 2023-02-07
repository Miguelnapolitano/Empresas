import { close } from "./closeModal.js";
import { usersUnemployed, hireUnemployed, listAllUsers, dismiss } from "./requests.js";


export function modalLookDep(token){

    const bttLook = [...document.querySelectorAll('#eye')];

    bttLook.forEach(item => item.addEventListener('click', (e) => {
        
        const nav = document.getElementsByTagName('nav')[0]
        nav.scrollIntoView()

        const body = document.body;
        body.classList.add('overflow-h');

        body.insertAdjacentHTML('afterbegin', `
        <div class="modal-shadow">
            <div id="${e.path[2].id}" class="modal-2 gap-1">
                <button class="bc-1 btt-close">X</button>
                <h2 class="tx-4">${e.path[2].children[0].children[0].innerText}</h2>
                <div class=" fx ai-c jc-sb w-100 h-50">
                    <div class="fx cl gap-1">
                        <h3 class="tx-2">${e.path[2].children[0].children[1].innerText}</h3>
                        <span class="tx-3">${e.path[2].children[0].children[2].innerText}</span>
                    </div>
                    <div class="fx cl gap-1 w-40 ai-fe">
                        <select class="w-100 input-2">
                            <option class="w-100 input-2" value="Selecionar o usuário">Selecionar o usuário</option>
                        </select>
                        <button class="btt-green">Contratar</button>
                    </div>
                </div> 
                <section class="w-100">
                    <ul class="list fx w-100 bgc-grey">
                        
                    </ul>
                </section>           
            </div>
        </div>
         
        `)
        close();
        listUsersUnemployed(token);
        hireUser(token);
        renderEmployees(token, e.path[2].id);
    }))  
}

async function listUsersUnemployed(token){
    const select = document.getElementsByTagName('select')[0];

    select.innerHTML = "";
    
    const arrCompanies = await usersUnemployed(token);

    arrCompanies.forEach(item =>{
        
        select.insertAdjacentHTML('beforeend', `
            <option id="${item.uuid}" value="${item.username}">${item.username}</option>
        `)})
}

async function hireUser(token){
    const select = document.getElementsByTagName('select')[0];
    const hireBtt = document.querySelector('.btt-green');

    hireBtt.addEventListener('click', async (e) => {
        
        let obj = {
        user_uuid: select.options[select.selectedIndex].id,
        department_uuid:e.path[3].id
      }

      await hireUnemployed(token, obj);
      await renderEmployees(token, e.path[3].id);
      listUsersUnemployed(token)
      
    })
}

async function renderEmployees(token, id){

    const ul = document.querySelector('.list');

    ul.innerHTML = "";

    const arrEmployees = (await listAllUsers(token)).filter(el => el.department_uuid == id)

    arrEmployees.forEach(item => {
        ul.insertAdjacentHTML('beforeend', `
            <li id="${item.uuid}" class="list-item fx cl jc-sb mg-1 pd-1 w-1 h-80 bgc-white gap-1">
                <h2 class="tx-2">${item.username}</h2>
                <div class="fx cl">
                    <span class="tx-3 pl-1">${item.professional_level}</span>
                </div>
                <button class="btt-red">Desligar</button>
            </li>
    `)
    })
    turnOff(token);  
}

function turnOff(token){
    const turnOffBtt = [...document.querySelectorAll('.btt-red')];

    turnOffBtt.forEach(item => {
        item.addEventListener('click', (e) => {
            
            const body = document.body;

            body.insertAdjacentHTML('afterbegin', `
                <div class="final-modal-shadow">
                    <div id="${e.path[4].id}" class="final-modal">
                        <h2 class="tx-4 pd-1 w-100 tx-align mg-top-1">Deseja realmente desligar <b class="blue">${e.path[1].children[0].innerText}</b> do <b class="blue">${e.path[4].children[1].innerText}</b> da empresa <b class="blue">${e.path[4].children[2].children[0].children[1].innerText}</b></h2> 
                        <button class="bc-1 btt-close">X</button>

                        <button id= "${e.path[1].id}" class="btt-green w-50 mg-btm-1">Remover</button>
                    </div>
                </div> 
            `)
        close();
        confirmTurnOff(token);
        })
    })
}

async function confirmTurnOff(token){
    const removeBtt = document.querySelector('.btt-green');

    removeBtt.addEventListener('click', async (e) => {
    
       await dismiss(token, e.target.id);
      
       await renderEmployees(token, e.path[1].id);
       listUsersUnemployed(token)

       setTimeout(() => {e.path[2].remove()}, 5010)

    
    })
    
}