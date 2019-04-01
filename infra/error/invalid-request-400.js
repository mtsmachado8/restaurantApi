import RequestError from "./parent-errors/request-error";

export default class InvalidRequest extends RequestError{

	/**
	 * @param {string} message 
	 */
	constructor(message = 'Invalid request'){
		super(400, 'INVALID_REQUEST', message);
		this.name = this.constructor.name; 
	}
}