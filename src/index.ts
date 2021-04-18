import { mongo } from "mongoose";

const koa = require('koa');
const ejs = require('koa-ejs');
const serve = require('koa-static');
const path = require('path');
const Router = require('koa-router');
const mongoose = require('mongoose');

const app = new koa();
const router = new Router();

//EJS Settings
ejs(app, {
	root: path.join(__dirname, 'views'),
	viewExt: 'ejs',
	layout: false
});

//MongoDB
//지원중단 경고 수정
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const uri = 'mongodb://localhost:27017/testTable';
const db = mongoose.connect(uri, (err: any) => {
	if (err) {
		console.log(err.message);
	} else {
		console.log('MongoDB Linked!');
	}
});


//Router
//메인페이지 라우팅
router.get('/', async(ctx: any, next: Function) => {
	await ctx.render('main')
});
//게시글 작성 라우팅
router.get('/edit', async(ctx: any, next: Function) => {
	await ctx.render('edit')
});
//방명록 작성 라우팅
router.get('/board', async(ctx: any, next: Function) => {
	await ctx.render('./board/board')
});
//프로필 라우팅
router.get('/profile', async(ctx: any, next: Function) => {
	await ctx.render('profile')
});
//로그인 라우팅
router.get('/signin', async(ctx: any, next: Function) => {
	await ctx.render('./account/signin')
});

app.use(serve(__dirname));
//라우팅 미들웨어 사용
app.use(router.routes());
app.use(router.allowedMethods());

//Port Settings
const portNo: number = 4000;
app.listen(portNo, () => {
	console.log('Server Start! http://localhost:' + portNo);
});