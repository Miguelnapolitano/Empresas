export function close(){
    const bttClose = document.querySelector('.btt-close');

    bttClose.addEventListener('click', (e) => {
        e.path[2].remove();
        window.location.reload()
    })
}