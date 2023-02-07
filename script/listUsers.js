export async function renderListUsers(arrUsers, arrDep){

    arrUsers.forEach(item => {
        if (item.department_uuid == null){            
            item.department_uuid = 'Sem vínculo com empresa.';

        }else{
            let uuid_dep = item.department_uuid;
           item.department_uuid = ( arrDep.find(item => item.uuid === uuid_dep).companies.name);            
        }
    })

    const ul = document.querySelector('.users-list');

    arrUsers.forEach(item => {

        if (item.username != 'ADMIN'){
            ul.insertAdjacentHTML('beforeend', `
                <li id="${item.uuid}" class="dep-item-list bgc-white fx cl gap-1 pd-1">
                    <div class="fx cl gap-1 w-100">
                        <h3 class="tx-2">${item.username}</h3>
                        <span class="tx-10 ">${item.professional_level}</span>
                        <span class="tx-10">${item.department_uuid}</span>
                    </div>
                    <div class="figures fx w-100 ai-c jc-c gap-3">
                        <img id="user-edit" class="pointer" src="../../assets/paint.png" alt="">
                        <img id="user-trash" class="pointer" src="../../assets/trash.png" alt="">
                    </div>
                </li>  
            `)
        }  
})
}
