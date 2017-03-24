const router = require('koa-router')();

const Combine = require('../models/combine');
const adminRequired = require('../middlewares/adminRequired');

router.get('/',adminRequired, async (ctx, next) => {
    console.log(111);
    console.log(ctx.session.user);
    let combine = await Combine.findAll();
    await ctx.render('combine', {
        title: '合并列表',
        combines: combine.map((item) => item.get({plain: true}))
    });
});


module.exports = router;