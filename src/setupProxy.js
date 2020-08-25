const proxy = require("http-proxy-middleware");
module.exports = function(app){
    app.use(proxy('/',{ target: 'https://monopolbank.herokuapp.com/'}));
}