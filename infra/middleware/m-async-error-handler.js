import log from 'winston'
import ApiError from '../error/parent-errors/api-error';
import InternalError from '../error/internal-error-500';

export default function(err, req, res, next){

	// Returning known errors with the respective status and messages
	if(err instanceof ApiError){
		log.silly(err.stack);
		log.error(`${err.message} (Code ${err.code} Status ${err.status})`);

		return res.status(err.status).code(err.code).send(err.message);
	}
						
	log.error('Internal Unhandled Error: ', err);
	log.error(err.stack);

	// Returning a friendly error message if the error is unknown
	const friendly_error = new InternalError();
	return res.status(friendly_error.status).send(friendly_error.message);
};