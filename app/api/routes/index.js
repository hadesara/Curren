module.exports = {
  index: function(req, res) {
    console.log(currentDir + 'app/public/client/views/index');
    res.render(currentDir + 'app/public/client/views/index');
  }
};
  