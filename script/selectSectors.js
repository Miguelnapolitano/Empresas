export function selectSectors(arr){

    const divDrop = document.querySelector('.selector');

    divDrop.innerHTML = "";

    divDrop.innerHTML = `
        <p class="tx-1">Selecionar setor</p>
        <button class="arrow-down pointer"><img  src="../../assets/arrow-down.png" alt=""></button>
        <ul class="sector-list bgc-blue fx cl ai-c jc-sb pd-1 mg-1 ls-none h-2">
    `
    const all = {uuid: '', description: 'Todos'}
    arr.push(all);
    arr.reverse();
 
    arr.forEach(elem => {
        const ul = document.querySelector('.sector-list');

        ul.insertAdjacentHTML('beforeend', `<li name="sector" class="tx-1 fx ai-c jc-c w-100 bdr-1 pointer">${elem.description}</li>`)        
    });
}






