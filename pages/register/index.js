import { dropDown } from "../../script/dropDown.js";

import {createUser} from  "../../script/requests.js"

import {checkInput} from  "../../script/checkInput.js"

checkInput()

dropDown()

function register(){
    
    const bttRegister = document.querySelector('#register-go')

    bttRegister.addEventListener('click', async (e) => {
        
        e.preventDefault();       
        
        let newUser = {
            username: e.path[1].children[1].children[0].value,
            password: e.path[1].children[1].children[2].value,
            email: e.path[1].children[1].children[1].value,
            professional_level: e.path[1].children[1].children[3].value,
          }

          if (newUser.professional_level == 'Nível Profissional'){
            newUser.professional_level = null
          }

        await createUser(newUser)        
    })

}

register()

function goTo(){
  const bttGo = document.querySelector('#login-go');

  bttGo.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.assign('../login')
  })


  const bttLogin = document.querySelector('#login');

  bttLogin.addEventListener('click', () => {window.location.assign('../login')});

    const bttHome = document.querySelector('#home');

    bttHome.addEventListener('click', () => {window.location.assign('../home')})
}

goTo()
