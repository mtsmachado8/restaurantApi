export default class ISale{
    constructor(name, isActive = true){
        this.name = name;
        this.isActive = isActive;
    }
    
    _isParticipating(){}
    
    disableSale(){
        this.isActive = false;
    }

    enableSale(){
        this.isActive = true;
    }
}