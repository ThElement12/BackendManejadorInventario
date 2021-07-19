const morgan = require('morgan');
const app = require('./app');
require('./database');

async function main(){

    app.set("port", 8082);

    await app.listen(app.get('port'), () => {
        
        console.log(`Server on port ${app.get('port')}`);
    });
}

main();
