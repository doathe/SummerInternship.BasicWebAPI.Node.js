import DB from '../src/db/db';

DB.start().then(() => {

}).catch((err) => {
    console.log(err);
    process.exit(1);
}).finally(() => {
    console.log('Boot completed.');
});