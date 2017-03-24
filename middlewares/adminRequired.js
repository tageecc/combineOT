const request = require('request');

module.exports = async (ctx, next) => {

    let token = ctx.query.token;
    console.log("user:"+ctx.session.user);
    console.log("token:"+token);
    //如果本站已经存在凭证，便不需要去鉴权
    if (ctx.session.user) {
        await next();
        return;
    }
    //如果没有本站信息，又没有token，则去用户中心登录鉴权
    if (!token) {
        ctx.redirect('http://a.com/login?redirect_uri=' + encodeURIComponent('http://b.com'));
        return;
    }

    request.post('http://localhost:3000/login/validate', {form: {token: token}}, async (error, response, body) => {
        //存在token的情况下，去passport主站检查该token对应用户是否存在，存在并返回对应userid
        if (!error && response.statusCode === 200) {
            body = JSON.parse(body);
            if (body.code === 1) {
                ctx.session.user = body.data.user;
                console.log("ctx.session.user");
                console.log(ctx.session.user);
            } else {
                //验证失败，跳转
                ctx.redirect('http://a.com/login?redirect_uri=' + encodeURIComponent('http://b.com'));
            }
        } else {
            ctx.redirect('http://a.com/login?redirect_uri=' + encodeURIComponent('http://b.com'));
        }
        await next();
    });
};