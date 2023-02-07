import { modalRemoveUser } from "./deleteUsers.js";
import { modalEditUser } from "../../script/admEditUsers.js";
import { modalRemoveDep } from "./deleteDepart.js";
import { modalEditDep } from "./aditDepart.js";
import { modalLookDep } from "./lookDepart.js";

export async function admModaisUsers(token){
    modalRemoveUser(token);
    modalEditUser(token);
}


export async function admModaisDepartments(token){
    modalRemoveDep(token);
    modalEditDep(token);
    modalLookDep(token);
}
