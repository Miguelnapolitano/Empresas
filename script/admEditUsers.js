import { close } from "./closeModal.js";
import { admEditUser } from "./requests.js";


export function modalEditUser(token){

    const bttEdit = [...document.querySelectorAll('#user-edit')];

    bttEdit.forEach(item => item.addEventListener('click', (e) => {

        const nav = document.getElementsByTagName('nav')[0]
        nav.scrollIntoView()

        const body = document.body;
        body.classList.add('overflow-h');
        
        body.insertAdjacentHTML('afterbegin', `
        <div class="modal-shadow">
            <div class="modal">
                <h2 class="tx-4">Editar ${e.path[2].children[0].children[0].innerText}</h2>
                <button class="bc-1 btt-close">X</button>

                <form class="fx cl  gap-1 w-90">
                    <select name="modalitie" class="input-2">
                        <option class="input-2" value="presencial">Presencial</option>
                        <option class="input-2" value="hibrido">Híbrido</option>
                        <option class="input-2" value="home office">Home Office</option>
                    </select>
                    <select name="level" class="input-2">
                        <option class="input-2" value="sênior">Sênior</option>
                        <option class="input-2" value="pleno">Pleno</option>
                        <option class="input-2" value="júnior">Júnior</option>
                        <option class="input-2" value="estágio">Estagiário</option>
                    </select>
                    <button id= "${e.path[2].id}" class="btt-blue w-100">Editar</button>
                </form>
            </div>
        </div> 
        `)
        close();
        confirmEditUser(token);
    }))  
}

function confirmEditUser(token){
    const confirmEditBtt = document.querySelector('.btt-blue');

    confirmEditBtt.addEventListener('click', async (e) => {
        e.preventDefault()
        let userId = e.target.id;

        let obj = {
            kind_of_work: e.path[1].children[0].value,
            professional_level: e.path[1].children[1].value
          }

        await admEditUser(token, userId, obj);
        
    })
}
