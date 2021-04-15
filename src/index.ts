const koa = require('koa');
const ejs = require('koa-ejs');
const path = require('path');
const Router = require('koa-router');

const app = new koa();
const router = new Router();

//EJS Settings
ejs(app, {
	root: path.join(__dirname, 'views'),
	viewExt: 'ejs',
	layout: false
});

//Router
router.get('/', async(ctx: any, next: Function) => {
	await ctx.render('main')
});

app.use(router.routes());
app.use(router.allowedMethods());

//Port Settings
const portNo: number = 4000;
app.listen(portNo, () => {
	console.log('Server Start! http://localhost:' + portNo);
});