export default class ApiError extends Error{

	/**
	 * @param {string} code 
	 * @param {string} message 
	 */
	constructor(code, message){
		super(message);
		this.code = code;
		this.name = this.constructor.name;
	}
}
