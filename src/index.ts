const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('body-parser');

const app = new Koa();
const router = new Router();

router.get('/', (ctx: any, next: any) => {
	ctx.body = 'HOME';
});

app.use(router.routes());
app.use(router.allowedMethods());

//Port Settings
const portNo = 4000;
app.listen(portNo, () => {
	console.log('Server Start! http://localhost:' + portNo);
});