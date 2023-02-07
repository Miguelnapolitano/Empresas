function ableButton(value){
    const buttonRegister = document.querySelector('#register-go');

    if(value.length > 0){

        buttonRegister.classList.remove('not');
        buttonRegister.removeAttribute('disabled')

    }else if (value.length == 0){

        buttonRegister.classList.add('not')
        buttonRegister.setAttribute('disabled', true)
}}



export function checkInput(){

    let arrInputs = [...document.getElementsByTagName('input')];

    arrInputs.forEach(item => item.addEventListener('keyup', () => {
        arrInputs.forEach(item => ableButton(item.value))
    }));
}
