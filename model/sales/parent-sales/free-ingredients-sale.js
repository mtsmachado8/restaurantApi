import ISale from './i-sale'

export default class FreeIngredientsSale extends ISale{
    constructor(name, isActive = true){
        super(name, isActive);
    }
    _isParticipating(){}
    
    getFreeIngredients(){}
}