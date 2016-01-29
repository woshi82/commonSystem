var express = require('express'),
	path = require('path'),
    app = express();

// 根目录
var basePath = process.cwd();
app.use(express.static(basePath));
// 首页为 index_dev.html
app.get('/', function (req, res) {
	var page = req.query.page;
	console.log(page);
    res.sendFile('index.html');
});

var port = process.env.PORT || 3020;
app.listen(port, function () {
    console.log(' app listening on port ' + port);
});