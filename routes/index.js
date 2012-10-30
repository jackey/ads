
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: '广告系统' });
};