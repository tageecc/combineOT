const router = require('koa-router')();

const Combine = require('../models/combine');

router.get('/', async (ctx, next) => {
    let combine = await Combine.findAll();
    await ctx.render('combine', {
        title: '合并列表',
        combines: combine.map((item) => item.get({plain: true})),
        user:ctx.session.user
    });
});

/**
 * 添加申请
 */
router.post('/combine/add', async (ctx, next) => {
    let combine, error;
    try {
        combine = await Combine.create(ctx.request.body);
    } catch (e) {
        error = e;
    }
    ctx.body = combine ? {code: 100, message: '添加成功！'} : {code: -1, message: error.message};
});

/**
 * 更新申请状态
 */
router.post('/combine/update', async (ctx, next) => {
    let user, error;
    try {
        user = await User.destroy({where: {uid: ctx.request.body.uid}});
    } catch (e) {
        error = e;
    }
    console.log(user);
    ctx.body = user ? {code: 1, message: '删除成功！'} : {code: -1, message: error.message};
});

/**
 * 删除申请
 */
router.post('/combine/delete', async (ctx, next) => {
    let user, error;
    try {
        user = await User.destroy({where: {uid: ctx.request.body.uid}});
    } catch (e) {
        error = e;
    }
    console.log(user);
    ctx.body = user ? {code: 1, message: '删除成功！'} : {code: -1, message: error.message};
});

module.exports = router;