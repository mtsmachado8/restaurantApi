import ISale from './i-sale'

export default class PercentageSale extends ISale{
    constructor(name, isActive = true){
        super(name, isActive);
    }
    _isParticipating(){}
    getDiscount(){}
}