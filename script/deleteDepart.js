import { close } from "./closeModal.js";
import { deleteDepart } from "./requests.js";


export function modalRemoveDep(token){

    const btttrash = [...document.querySelectorAll('#dep-trash')];

    btttrash.forEach(item => item.addEventListener('click', (e) => {

        const nav = document.getElementsByTagName('nav')[0]
        nav.scrollIntoView()

        const body = document.body;
        body.classList.add('overflow-h');

        body.insertAdjacentHTML('afterbegin', `
            <div class="modal-shadow">
                <div class="modal">
                    <h2 class="tx-4 pd-1 w-100 tx-align mg-top-1">Deseja realmente remover o departamento <b class="blue">${e.path[2].children[0].children[0].innerText}</b> da empresa <b class="blue">${e.path[2].children[0].children[2].innerText}</b></h2>
                    <button class="bc-1 btt-close">X</button>

                    <button id= "${e.path[2].id}" class="btt-green w-50 mg-btm-1">Remover</button>
                </div>
            </div> 
        `)
        close();
        confirmDeleteDepartr(token)
    }))  
}

function confirmDeleteDepartr(token){
    const delelteBtt = document.querySelector('.btt-green');

    delelteBtt.addEventListener('click', async (e) => {
        let userId = e.target.id;

        await deleteDepart(token, userId);
        
    })
}