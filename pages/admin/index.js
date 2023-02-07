import { allCompanies, createDep, listAllUsers, allDep } from "../../script/requests.js";
import { close } from "../../script/closeModal.js";
import { checkInput } from "../../script/checkInput.js";
import { listDep, filterListDep } from "../../script/listOfDepartments.js";
import { renderListUsers } from "../../script/listUsers.js";
import { admModaisUsers, admModaisDepartments } from "../../script/adminModais.js";

const token = localStorage.getItem('token');

function logout(){
    const bttOut = document.querySelector('#logout');

    bttOut.addEventListener('click', () => {
        localStorage.removeItem('token');

        window.location.assign('../home')
    })
}

logout();

async function selectCompanies(){
    const select = document.getElementsByTagName('select')[0];
    
    const arrCompanies = await allCompanies();

    arrCompanies.forEach(item =>{
        
        select.insertAdjacentHTML('beforeend', `
            <option id="${item.uuid}" value="${item.name}">${item.name}</option>
        `)})
}

selectCompanies();

function openModalCreateDep(){
    const createBtt = document.querySelector('#create');

    createBtt.addEventListener('click', async () => {
        const nav = document.getElementsByTagName('nav')[0]
        nav.scrollIntoView()

        const body = document.body;
        body.classList.add('overflow-h');

        body.insertAdjacentHTML('afterbegin', `
        <div class="modal-shadow">
            <div class="modal">
                <h2 class="tx-4">Criar Departamento</h2>
                <button class="bc-1 btt-close">X</button>

                <form class="fx cl  gap-1 w-90">
                    <input class="input-1" type="text" placeholder="Nome do departamento">
                    <input class="input-1" type="email" placeholder="Descrição">
                    <select class="input-2" type="password" placeholder="Selecione a empresa">
                        <option  class="input-2" value="Selecione a empresa">Selecione a empresa</option>
                    </select>
                    <button id="register-go" class="btt-blue w-100 not" disabled>Criar Departamento</button>
                </form>
            </div>
        </div>
        `)

        checkInput()
        
        selectCompanies()

        close()

        newDep()

    })
}

openModalCreateDep()

function newDep(){
    const bbtSend = document.querySelector('#register-go');


    bbtSend.addEventListener('click', (e) => {
        e.preventDefault();

        let obj = {
            name: e.path[1].children[0].value,
            description: e.path[1].children[1].value ,
            company_uuid: e.path[1].children[2].selectedOptions[0].id,
          }
        
        if (obj.company_uuid == ''){
            alert('Escolha a empresa')
        }else {
            createDep(token, obj);
            e.path[3].remove();
            setTimeout(() => {
                window.location.reload()
            }, 10);           
        }
    })
}

async function listDepartments(){
    await listDep(token);
    admModaisDepartments(token);
}
listDepartments()
filterListDep(token)

async function listUsers(){
    renderListUsers(await listAllUsers(token), await allDep(token)) 
    admModaisUsers(token)
}
listUsers()



