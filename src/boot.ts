import App from './app';

App.init().then(() => {
    console.log('Boot success.');
    App.listen();
}).catch((err: Error) => {
    console.log('Boot error.');
    process.exit(2);
});