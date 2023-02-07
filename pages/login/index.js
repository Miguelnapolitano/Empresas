import { dropDown } from "../../script/dropDown.js";
import { login } from "../../script/requests.js";
import { checkInput } from "../../script/checkInput.js";

checkInput()
dropDown()



function sendLogin(){
    
    const bttLogin = document.querySelector('#register-go');

    bttLogin.addEventListener('click', async (e) => {
        e.preventDefault();

        let user = {
            email: e.path[1].children[0].value,
            password: e.path[1].children[1].value,
        }
        
        await login(user)
        
    })
}

sendLogin()

function goTo(){
    const bttGoto = document.querySelector('#goto');

    bttGoto.addEventListener('click', () => {window.location.assign('../register')});

    const bttRegister = document.querySelector('#register');

    bttRegister.addEventListener('click', () => {window.location.assign('../register')});

    const bttHome = document.querySelector('#home');

    bttHome.addEventListener('click', () => {window.location.assign('../home')})
}

goTo()