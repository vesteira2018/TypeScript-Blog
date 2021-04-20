import { Context } from "koa";
import { Request, Response } from "koa";

const koa = require('koa');
const ejs = require('koa-ejs');
const serve = require('koa-static');
const path = require('path');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const db = require("./database/board");

const app = new koa();
const router = new Router();

//EJS Settings
ejs(app, {
	root: path.join(__dirname, 'views'),
	viewExt: 'ejs',
	layout: false
});

//koa-bodyparser
app.use(bodyParser());
app.use(serve(__dirname));
//라우팅 미들웨어 사용
app.use(router.routes());
app.use(router.allowedMethods());

//Router
//메인페이지 라우팅
router.get('/', async(ctx: Context) => {
	const board = await db.getBoard();
	console.log(`INDEX : ${board}`);
	await ctx.render('main', {board: board});
});
//게시글 작성 라우팅
router.get('/edit', async(ctx: Context) => {
	await ctx.render('./board/edit');
});
//방명록 작성 라우팅
router.get('/guest', async(ctx: Context) => {
	await ctx.render('./guest/guest');
});
//프로필 라우팅
router.get('/profile', async(ctx: Context) => {
	await ctx.render('profile');
});

//Port Settings
const portNo: number = 4000;
app.listen(portNo, () => {
	console.log(`Server Start! http://localhost:${portNo}`);
});