import ApiError from './api-error'

export default class CodeError extends ApiError{
	
	/**
	  * Using HTTP Errors. The request errors will use 4xx Pattern
	  * for reference: https://pt.wikipedia.org/wiki/Lista_de_c%C3%B3digos_de_estado_HTTP
	  * 
	  * @param {number} status The number to be used when returning the error to the client
	  * @param {string} code The code of the message
	  * @param {string} message The message to send for the client
	  */
	constructor(status, code, message){
		super(code, message);
		this.code = code;
		this.status = status;
		this.name = this.constructor.name; 
	}
}
