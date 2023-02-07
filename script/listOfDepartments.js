import { allDep, allCompanies} from "./requests.js"
import { admModaisDepartments } from "../../script/adminModais.js";

export async function listDep(token){
    
    const allComp = await allCompanies();    
    
    const arrDep = await allDep(token);  

    renderListOfDep(allComp, arrDep)
    
}


export async function filterListDep(token) {
    const select = document.querySelector('.companies');

    const allComp = await allCompanies();      
    
    const arrDep = await allDep(token); 

    select.addEventListener('click', () => {
            let idComp = select.options[select.selectedIndex].id;

            let newArrDep = [...arrDep.filter(item => item.companies.uuid == idComp)];

            if (newArrDep.length > 0){

                renderListOfDep(allComp, newArrDep);

            }else if (idComp == ''){
                renderListOfDep(allComp, arrDep);
            }
            else{
                renderEmptyListOfDep()
            }            
        admModaisDepartments(token)
    })
    
}


function renderListOfDep(arrComp, arrDep){
    const ul = document.querySelector('.dep-list');

    ul.innerHTML = "";
    
    arrDep.forEach(item => {
        ul.insertAdjacentHTML('beforeend', `
            <li id = "${item.uuid}" class="dep-item-list bgc-white fx cl gap-1 pd-1">
                <div class="fx cl gap-1 w-100">
                    <h3 class="tx-2">${item.name}</h3>
                    <span class="tx-10 ">${item.description}</span>
                    <span class="tx-10">${(arrComp.filter(el => el.uuid == item.companies.uuid))[0].name}</span>
                </div>
                <div class="figures fx w-100 ai-c jc-c gap-1">
                    <img id="eye" class="pointer" src="../../assets/eie.png" alt="">
                    <img id="dep-edit" class="pointer" src="../../assets/paint.png" alt="">
                    <img id="dep-trash" class="pointer" src="../../assets/trash.png" alt="">
                </div>
            </li>
        `)
    })
}

function renderEmptyListOfDep(){
    const ul = document.querySelector('.dep-list');

    ul.innerHTML = "";
    
    ul.insertAdjacentHTML('beforeend', `
            <h3 class="tx-5">Nenhum departamento vinculado por enquanto.</h3>
        `)

}