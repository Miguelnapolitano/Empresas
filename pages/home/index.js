import { dropDown } from "../../script/dropDown.js";
import {allSectors, allCompanies, companiesOfSector} from "../../script/requests.js"
import {selectSectors} from "../../script/selectSectors.js"
import {listCompanies} from "../../script/listCompanies.js"

dropDown();

function goTo(){ 
  
  
    const bttLogin = document.querySelector('#login');
  
    bttLogin.addEventListener('click', () => {window.location.assign('../login')});
  
      const bttRegister = document.querySelector('#register');
  
      bttRegister.addEventListener('click', () => {window.location.assign('../register')})
  }
  
  goTo()

function openSelector(){
    const arrArrow = [document.querySelector('.arrow-down'), document.querySelector('.selector-p')]

    arrArrow.forEach(item => {
        item.addEventListener('click', async (e) => {
            e.preventDefault()
            selectSectors(await allSectors());
            closeSelector();
            filterSector();
        })
    })
    
}

openSelector();

function closeSelector(){
    const arrArrow = [document.querySelector('.arrow-down'), document.querySelector('.selector')];

    arrArrow.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault()
            const divDrop = document.querySelector('.selector');

            divDrop.innerHTML = "";
    
            divDrop.innerHTML = `
            <p class="tx-1 w-100 selector-p pointer">Selecionar setor</p>
            <button class="arrow-down pointer"><img  src="../../assets/arrow-down.png" alt=""></button>`  
            
            openSelector();
    })
})

}

async function companies(){
    const comp = await allCompanies();
    
    listCompanies(comp)
}

companies()


function filterSector(){
    let sectors = [...document.getElementsByName('sector')];
    
    sectors.forEach(item => {
        item.addEventListener('click', async (e) => {
            let sector = e.target.innerText;

            if(sector === 'Todos'){
                let arrSector = await allCompanies();

                const ul = document.querySelector('.list');
                ul.innerHTML = "";
                
                listCompanies(arrSector);

                const divDrop = document.querySelector('.selector');

                divDrop.innerHTML = "";
        
                divDrop.innerHTML = `
                <p class="tx-1 w-100 selector-p pointer">Selecionar setor</p>
                <button class="arrow-down pointer"><img  src="../../assets/arrow-down.png" alt=""></button>`;
                
            }else{
                let arrSector = await companiesOfSector(sector);

                const ul = document.querySelector('.list');
                ul.innerHTML = "";
                
                listCompanies(arrSector);

                const divDrop = document.querySelector('.selector');

                divDrop.innerHTML = "";
        
                divDrop.innerHTML = `
                <p class="tx-1 w-100 selector-p pointer">Selecionar setor</p>
                <button class="arrow-down pointer"><img  src="../../assets/arrow-down.png" alt=""></button>`;
            }     

            openSelector();

        })
    });
}
