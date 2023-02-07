import { close } from "./closeModal.js";
import { admEditDep } from "./requests.js";


export function modalEditDep(token){

    const bttEdit = [...document.querySelectorAll('#dep-edit')];

    bttEdit.forEach(item => item.addEventListener('click', (e) => {

        const nav = document.getElementsByTagName('nav')[0]
        nav.scrollIntoView()

        const body = document.body;
        body.classList.add('overflow-h');

        body.insertAdjacentHTML('afterbegin', `
            <div class="modal-shadow">
                <div class="modal">
                    <button class="bc-1 btt-close">X</button>
                    <h2 class="tx-4">Editar ${e.path[2].children[0].children[0].innerText}</h2>

                    <form class="fx cl gap-1 w-90">
                    
                        <textarea class="input-3">${e.path[2].children[0].children[1].innerText}</textarea>
                        
                        <button id="${e.path[2].id}" class="btt-blue w-100">Editar Departamento</button>
                    </form>
                </div>
            </div>
         
        `)
        
        close();
        confirmEditDep(token);
    }))  
}

function confirmEditDep(token){
    const confirmEditBtt = document.querySelector('.btt-blue');

    confirmEditBtt.addEventListener('click', async (e) => {
        e.preventDefault()
        let userId = e.target.id;

        let obj = {
            description: e.path[1].children[0].value,            
          }

        await admEditDep(token, userId, obj);
        
    })
}

