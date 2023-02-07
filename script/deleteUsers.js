import { close } from "./closeModal.js";
import { deleteUser } from "./requests.js";


export function modalRemoveUser(token){

    const btttrash = [...document.querySelectorAll('#user-trash')];

    btttrash.forEach(item => item.addEventListener('click', (e) => {

        const nav = document.getElementsByTagName('nav')[0]
        nav.scrollIntoView()

        const body = document.body;
        body.classList.add('overflow-h');

        body.insertAdjacentHTML('afterbegin', `
            <div class="modal-shadow">
                <div class="modal">
                    <h2 class="tx-4 pd-1 w-100 tx-align mg-top-1">Deseja realmente remover o usuário ${e.path[2].children[0].children[0].innerText}</h2>
                    <button class="bc-1 btt-close">X</button>

                    <button id= "${e.path[2].id}" class="btt-green w-50 mg-btm-1">Remover</button>
                </div>
            </div> 
        `)
        close();
        confirmDeleteUser(token);
    }))  
}

function confirmDeleteUser(token){
    const delelteBtt = document.querySelector('.btt-green');

    delelteBtt.addEventListener('click', async (e) => {
        let userId = e.target.id;

        await deleteUser(token, userId);
        
    })
}
