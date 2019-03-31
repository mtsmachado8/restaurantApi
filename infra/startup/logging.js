import config from 'config'
import log from 'winston'

// levels that can be set (only before this level will be logged)
// error
// warn
// info
// verbose
// debug
// silly

export default function(){
	const env_logging_level = config.get('logging_level');

	const terminal = new log.transports.Console({colorize: true, prettyPrint: true, level: env_logging_level});
	const file = new log.transports.File({ filename: 'logfile.log', level: env_logging_level});
	const unhandledErrorConsole = new log.transports.Console({colorize: true, prettyPrint: true, level: env_logging_level});

	log.handleExceptions(unhandledErrorConsole);

	log.configure({
		transports: [
			terminal,
			file
		]
	});
	
};