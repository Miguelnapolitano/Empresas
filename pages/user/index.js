import { userInform, editUser, listCoWorkers, allCompanies } from "../../script/requests.js";
import {close} from "../../script/closeModal.js";

async function renderUserInf(){
    const token = localStorage.getItem('token');

    let userInf = await userInform(token);
    
    const sectionInf = document.querySelector('#info');

    sectionInf.innerHTML ="";

        if( userInf.kind_of_work === null){
            userInf.kind_of_work = "Nenhum"
        }

        sectionInf.insertAdjacentHTML('beforeend', `
        <h2 class="tx-5">${userInf.username}</h2>
        <div class="fx ai-c jc-sb ">
            <span class="tx-6">Email: ${userInf.email}</span>
            <span class="tx-6">${userInf.professional_level}</span>
            <span class="tx-6">${userInf.kind_of_work}</span>
            <img id="edit" src="../../assets/blue-paint.png" alt="">
        </div>
        `)

        openModalEdit(userInf.username, userInf.email)

        if (userInf.department_uuid === null){

            const main = document.querySelector('#main')

            main.insertAdjacentHTML('beforeend', `
                <h2 class="tx-7 h-2 fx ai-c">Você ainda não foi contratrado.</h2>
            `)
        }else{

            const depart = (await listCoWorkers(token))[0]
                        
            const company = ((await allCompanies()).find(item => item.uuid == depart.company_uuid));          
            
            const main = document.querySelector('#main');

            main.insertAdjacentHTML('beforeend', `
            <h2 class="title tx-8 bgc-blue">${company.name} - Departamento: ${depart.name}</h2>        
            <ul class="cw ls-none w-100 pd-1 fx wrap gap-3 jc-c ai-c">
                            
            </ul>
            `)

            const coworkers = (await listCoWorkers(token))[0].users
            
            renderCoWorkers(coworkers)
        }
}

renderUserInf();

function renderCoWorkers(arr){
    const ul = document.querySelector('.cw');

    arr.forEach(item => {
        ul.insertAdjacentHTML('beforeend', `
            <li class="fx cl gap-1 pd-1 w-30 h-fit">
                <h3 class="tx-9">${item.username}</h3>
                <span class="tx-3">${item.professional_level}
                </span>
            </li>            
        `)
    })
}

function logout(){
    const bttOut = document.querySelector('#logout');

    bttOut.addEventListener('click', () => {
        localStorage.removeItem('token');

        window.location.assign('../home')
    })
}

logout();

function openModalEdit(name, email){
    const pencil = document.querySelector('#edit');

    pencil.addEventListener('click', () => {
        const body = document.body;

        body.insertAdjacentHTML('afterbegin', `
            <div class="modal-shadow">
                <div class="modal">
                    <h2 class="tx-4">Editar Perfil</h2>
                    <button class="bc-1 btt-close">X</button>
                    <form class="fx cl  gap-1 w-90">
                        <input class="input-1" type="text" value="${name}">
                        <input class="input-1" type="email" value="${email}">
                        <input id="password" class="input-1" type="text" placeholder="Nova senha">
                        <button id="edit" class="btt-blue w-100 not" disabled>Editar Perfil</button>
                    </form>
                </div>
            </div>
        `)

        close()
        editUserInf()
    })
    
}

function editUserInf(){
    const token = localStorage.getItem('token');       
    const bttEdit = document.querySelector('#edit');
    const passwordInput = document.querySelector('#password');

    passwordInput.addEventListener('keyup', () => {
        if(passwordInput.value > 0){
            bttEdit.classList.remove('not');
            bttEdit.removeAttribute('disabled')
        }else{
            bttEdit.classList.add('not');
            bttEdit.setAttribute('disabled', true)
        }
    })
     
    bttEdit.addEventListener('click', async (e) => {
        e.preventDefault()
       
        const dbName = (e.path[4].children[2].children[0].innerText)

        const dbEmail = ((e.path[4].children[2].children[1].children[0].innerText).slice(7))

            if (e.path[1].children[0].value == dbName && e.path[1].children[1].value == dbEmail){
                let obj = {
                    password: e.path[1].children[2].value,
                }

                await editUser(token, obj);
                
            }else if (e.path[1].children[0].value == dbName){
                let obj = {
                    password: e.path[1].children[2].value,
                    email: e.path[1].children[1].value
                }

                await editUser(token, obj);
                
            }else if (e.path[1].children[1].value == dbEmail){
                let obj = {
                    username: e.path[1].children[0].value,
                    password: e.path[1].children[2].value,
                }

                await editUser(token, obj);
                
            }else{
                let obj = {
                    username: e.path[1].children[0].value,
                    password: e.path[1].children[2].value,
                    email: e.path[1].children[1].value
                }

                await editUser(token, obj);
                
            }
    })
}
