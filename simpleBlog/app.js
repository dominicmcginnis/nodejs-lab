var bogart   = require('bogart');
var Q        = require('promised-io/promise');
var mongoose = require('mongoose');
 
var PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  comments: [ CommentSchema ]
});
 
var CommentSchema = new mongoose.Schema({
  author: String,
  body: String
});
 
var Post = mongoose.model('PostSchema', PostSchema);
 
var app = bogart.router(function(get, post, put, destroy) {
 
  var client     = mongoose.connect('mongodb://localhost/test')
    , viewEngine = bogart.viewEngine('mustache');
 
  get('/posts', function(req) {
    return Q.execute(Post.find.bind(Post)).then(function(docs) {
      return viewEngine.respond('posts.html', {
        locals: {
          posts: docs,
          title: 'Blog Home'
        }
      })
    });
  });
 
  get('/posts/new', function(req) {
    return viewEngine.respond('new-post.html', {
      locals: {
        title: 'New Post'
      }
    });
  });
  
  post('/posts', function(req) {
    var post = new Post(req.params);
    
    return Q.execute(post.save.bind(post)).then(function() {
      return bogart.redirect('/posts');
    });
  });
 
  get('/posts/:id', function(req) {
    console.log('getting post');
 
    return Q.execute(Post.findById.bind(Post), req.params.id).then(function(post) {
      return viewEngine.respond('post.html', { locals: post });
    });
  });
 
  post('/posts/:id/comments', function(req) {
    var comment = req.params;
 
    return Q.execute(Post.findById.bind(Post), req.params.id).then(function(post) {
      post.comments = post.comments || [];
      post.comments.push(comment);
 
      return Q.execute(post.save.bind(post)).then(function() {
        return bogart.redirect('/posts/'+req.params.id);
      });
    });
  });
});
 
// Add ParseForm middleware to automatically process the parameters
// of form submissions into a JSON object that is easily usable (req.body, req.params).
app = bogart.middleware.ParseForm(app);
 
// Start the JSGI server.
bogart.start(app);
