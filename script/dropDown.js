export function dropDown(){
    const dropBtt = document.querySelector('#drop-btt');

    const divDrop = document.querySelector('.drop-down')

    dropBtt.addEventListener('click', (e) => {
        e.preventDefault();

        divDrop.classList.toggle('show');

        const divBtts = document.querySelector('#div-window-btt')

        divBtts.addEventListener('click', (e) => {
           let adress = e.target.id;
            
           window.location.assign(`../${adress}`)
            
        })
    })

    const close = document.querySelector('.btt-close');

        close.addEventListener('click', () => {

        divDrop.classList.toggle('show');
    })
}
