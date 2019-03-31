import InvalidRequest from '../error/invalid-request-400'

module.exports = (validator) => {
	return (req, res, next) => {
		const { error } = validator(req.body);
		if(error) 
			throw new InvalidRequest(error.details[0].message);
		next();
	}
};