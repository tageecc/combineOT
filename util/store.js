const session = require('koa-session-minimal');

module.exports = session({
    key: 'SESSION_ID'
});
