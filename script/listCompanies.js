export function listCompanies(arr){
    const ul = document.querySelector('.list');

    arr.forEach(item => {
        ul.insertAdjacentHTML('beforeend', `
            <li class="list-item fx cl jc-sb mg-1 pd-1 w-70 h-80 bgc-white">
                <h2 class="tx-2">${item.name}</h2>
                <div class="fx cl">
                    <span class="tx-3 pl-1">${item.opening_hours}</span>
                    <span class="span-sector">${item.sectors.description}</span>
                </div>
            </li>

        `)
    })
}