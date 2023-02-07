import { toastfy, toastfyBody, toastfyRed } from "./toast.js";

const baseURL = 'http://localhost:6278/'

async function allSectors(){
   try{
        const request = await fetch(baseURL + 'sectors');
        const response = await request.json();

        return response
   } catch(err){
        console.log(err)
   }
}

async function allCompanies(){
     try{
          const request = await fetch(baseURL + 'companies');
            
          return await request.json();
     } catch(err){
          console.log(err)
     }
}

async function companiesOfSector(sector){
     try{
          const request = await fetch(baseURL + 'companies/' + sector);
          const response = await request.json();
  
          return response

     } catch(err){
          console.log(err)
     }
}

async function createUser(body){
     try {
          const request = await fetch(baseURL + 'auth/register', {
               method: "POST",
               headers: {

                    "Content-Type": "application/json",
               },
               body: JSON.stringify(body),
          })
          
          if (request.ok === true){
               toastfy('Novo usuário cadastrado! Faça login');

               setTimeout(() => {
                    window.location.assign("../login");
                  }, 5010);

          }else{
               toastfyRed('Usuário ou e-mail já existem.');
          }


     } catch (err) {
          console.log(err);

     }
}

async function login(body){
     try {
          const request = await fetch(baseURL + 'auth/login', {
               method: "POST",
               headers: {

                    "Content-Type": "application/json",
               },
               body: JSON.stringify(body),
          })
          
          if (request.ok === true){
               const response = await request.json()

               localStorage.setItem('token', response.token);
               
               userOrAdm(response.token)

          }else{
               toastfyRed('Email ou senha incorretos.');
          }


     } catch (err) {
          console.log(err);
          

     }
}

async function userOrAdm(token){
     try {
          const request = await fetch(baseURL + 'auth/validate_user', {
               method: "GET",
               headers: {

                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
               },
          })

          const response = await request.json();
          
          if (response.is_admin === true){

               window.location.assign('../admin')             

          }else{

               window.location.assign('../user')
          }


     } catch (err) {
          console.log(err);

     }
}

async function userInform(token){
     try {
          const request = await fetch(baseURL + 'users/profile', {
               method: "GET",
               headers: {

                    "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`,
               },
          })
          
               const response = await request.json()

               return response

     } catch (err) {
          console.log(err);

     }
}

async function editUser(token, body){
     try {
          const request = await fetch(baseURL + 'users', {
               method: "PATCH",
               headers: {

                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
               },
               body: JSON.stringify(body)
          })   

          console.log(await request.json())

               toastfyBody('Informações atualizadas com sucesso!');
               setTimeout(() => {window.location.reload()}, 5010)
         
     } catch (err) {
          console.log(err);

          console.log(await request.json())

     }
}

async function listCoWorkers(token){
     try {
          const request = await fetch(baseURL + 'users/departments/coworkers', {
               method: "GET",
               headers: {

                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
               },
          })

          return await request.json();

     } catch (err) {
          console.log(err);

     }
}

async function allDep(token){
     try {
          const request = await fetch(baseURL + 'departments', {
               method: "GET",
               headers: {

                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
               },
          })

          return await request.json();

     } catch (err) {
          console.log(err);

     }
}

async function createDep(token, body){
     try {
          await fetch(baseURL + 'departments', {
               method: "POST",
               headers: {

                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
               },
               body: JSON.stringify(body),
          })

               toastfyBody('Departamento criado com sucesso!');
               setTimeout(() => {window.location.reload()}, 5010)

     } catch (err) {
          console.log(err);

     }
}

async function listAllUsers(token){
     try {
          const request = await fetch(baseURL + 'users', {
               method: "GET",
               headers: {

                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
               },
          })

          return await request.json();

     } catch (err) {
          console.log(err);

     }
}

async function deleteUser(token, id){
     try {
          const request = await fetch(baseURL + 'admin/delete_user/' + id, {
               method: "DELETE",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
               },
          })

          if (request.ok === true){

               toastfyBody('Usuário excluído com sucesso!');
               setTimeout(() => {window.location.reload()}, 5010)

          }

     } catch (err) {
          console.log(err);

     }
}

async function admEditUser(token, id, body){
     try {
          const request = await fetch(baseURL + 'admin/update_user/' + id, {
               method: "PATCH",
               headers: {

                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
               },
               body: JSON.stringify(body)
          })

          if (request.ok === true){

               toastfyBody('Usuário atualizado com sucesso!');
               setTimeout(() => {window.location.reload()}, 5010)

          }
         
     } catch (err) {
          console.log(err);

     }
}

async function deleteDepart(token, id){
     try {
          const request = await fetch(baseURL + 'departments/' + id, {
               method: "DELETE",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
               },
          })

          if (request.ok === true){

               toastfyBody('Departamento excluído com sucesso!');
               setTimeout(() => {window.location.reload()}, 5010)

          }

     } catch (err) {
          console.log(err);

     }
}

async function admEditDep(token, id, body){
     try {
          const request = await fetch(baseURL + 'departments/' + id, {
               method: "PATCH",
               headers: {

                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
               },
               body: JSON.stringify(body)
          })

          if (request.ok === true){

               toastfyBody('Departamento atualizado!');
               setTimeout(() => {window.location.reload()}, 5010)

          }
         
     } catch (err) {
          console.log(err);

     }
}

async function usersUnemployed(token){
     try {
          const request = await fetch(baseURL + 'admin/out_of_work', {
               method: "GET",
               headers: {

                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
               },
          })

          return await request.json();

     } catch (err) {
          console.log(err);

     }
}

async function hireUnemployed(token, body){
     try {
          const request = await fetch(baseURL + 'departments/hire/', {
               method: "PATCH",
               headers: {

                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
               },
               body: JSON.stringify(body)
          })

     } catch (err) {
          console.log(err);

     }
}

async function dismiss(token, id){
     try {
          const request = await fetch(baseURL + 'departments/dismiss/' + id, {
               method: "PATCH",
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
               },
          })

          if (request.ok === true){

               toastfyBody('Funcionário demitido com sucesso!');
               
          }

     } catch (err) {
          console.log(err);

     }
}

export {allSectors, allCompanies, companiesOfSector, createUser, login, userInform, editUser, allDep, createDep, listAllUsers, deleteUser, admEditUser, deleteDepart, admEditDep, usersUnemployed, hireUnemployed, dismiss, listCoWorkers}