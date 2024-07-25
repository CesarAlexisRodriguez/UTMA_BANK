//crar una tarjeta 
//obtener una tarjeta
//obtener tarjetas
import CardModel from "../models/CardModel.js";
class ManageCard{
    constructor(
    userId,
    accountId,
    cardNumer,
    cardType,
    expirationDate,
    securityCode,
    status){
        this.userId = userId;
        this.accountId = accountId;
        this.cardNumer = cardNumer;
        this.cardType = cardType;
        this.expirationDate = expirationDate;
        this.securityCode = securityCode;
        this.status = status;
    }

    async createCard(){
        try {
            await CardModel.create({
                userId: this.userId,
                accountId: this.accountId,
                cardNumer: this.cardNumer,
                cardType: this.cardType,
                expirationDate: this.expirationDate,
                securityCode: this.securityCode,
                status: this.status
            });
            return "ok";
        } catch (error) {
            throw new Error(`Error al crear tarjeta: ${error}`);
        }
    }

    async getCards(){
        try {
            const cards = await  AccountModel.find();
            return cards;
        } catch (error) {
            throw new Error(`Error al obtener cuentas ${error}`);
        }
    }


    async getCard(id){
        try {
            const card = await AccountModel.findById(id);
            return card;
        } catch (error) {
            throw new Error(`Error al obtener cuenta: ${error}`);
        }
    }
}

export default CardModel;