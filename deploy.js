const ghpages = require('gh-pages');
 
ghpages.publish('dist', {
    branch: 'gh-pages',
    repo: 'https://github.com/KomAnw/sber.git'
}, function(err) {
    console.error(err);
});