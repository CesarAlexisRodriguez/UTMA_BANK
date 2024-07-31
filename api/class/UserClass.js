//registrar el usuario
//iniciar sesion
//cerrar sesion
//obtener info del usuario
//crear transacciones
//pedir prestamos
//borrar cuentas
//Actualizar

import UserModel from "../models/UserModel.js";
import ManagerAccount from "./AccountClass.js";
import ManagerCard from "./CardClass.js"

class ManagerUser{
    constructor(email, phone, name, lastName, isInSession, isAdmin, password){
        this.email = email;
        this.phone = phone;
        this.name = name;
        this.lastName = lastName;
        this.isInSession = isInSession;
        this.isAdmin = isAdmin;
        this.password = password;
    }

    async register(){
        try {
            const user = await UserModel.create({
                email : this.email,
                phone : this.phone,
                name : this.name,
                lastName : this.lastName,
                isInSession : this.isInSession,
                isAdmin : this.isAdmin,
                password : this.password
            });
            const MA = new ManagerAccount(user._id, 12345,'ahorro',10000);
            const currentAccount = await MA.createAccount();
            const MC = new ManagerCard(user._id, currentAccount._id, "16 digitos al azar", "bedito",
                "de la fecha actual sumar 3 años", "generar un codigo de 3 cifras ", "active");

                await MC.createCard();
                return user;
        } catch (error) {
            throw new Error(`Error al registrar usuario: ${error}`);            
        }
    }

    async Login(email,password){
        try {
            const user = await UserModel.findOne({email : email});
            if(!user){
                throw new Error("Usuario no registrado")
            }

            if(user.password !== password){
                throw new Error("contraseña incorrecta!")
            }
            return "Succeeded";
        } catch (error) {
            throw new Error(`Error al registrar usuario: ${error}`);
        }
    }

    async getUserInfo(id){
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (error) {
            throw new Error(`Error al obtener la informacion del usuario: ${error}`);
        }
    }

    async updateInfo(email, id){
        try {
            if(!email) {
                throw new Error(`correo invalido`);
            }
            await UserModel.findByIdAndUpdate(id,{
                $set:{email}
            })
            return "ok"
        } catch (error) {
            throw new Error(`Error al actualizar el correo: ${error}`);
        }
    }

    async updateInfo(phone, id){
        try {
            if(!phone) {
                throw new Error(`numero telefonico invalido`);
            }
            await UserModel.findByIdAndUpdate(id,{
                $set:{phone}
            })
            return "ok"
        } catch (error) {
            throw new Error(`Error al actualizar el numero telefonico: ${error}`);
        }
    }

    async updateInfo(password, id){
        try {
            if(!password) {
                throw new Error(`contraseña invalido`);
            }
            await UserModel.findByIdAndUpdate(id,{
                $set:{password}
            })
            return "ok"
        } catch (error) {
            throw new Error(`Error al actualizar la contraseña: ${error}`);
        }
    }
}

export default ManagerUser;