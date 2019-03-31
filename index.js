import error_handler from './infra/middleware/m-async-error-handler'
import log from 'winston'
import express from 'express'
const app = express();
import router from './app/router'

require('./infra/startup/logging');
require('./infra/startup/config')();

if(process.env.NODE_ENV == 'test')
    require('./tests/testSetupFile');

app.use(express.json());
app.use('/api/v1/', router);
app.use(error_handler);



const port = process.env.PORT || 3000;
const server = app.listen(port, () => log.info(`listening on port ${port}...`));

module.exports = server;