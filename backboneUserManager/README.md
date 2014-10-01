My first attempt at learning backbone, following the tutorial from: https://www.youtube.com/watch?v=FZSjvWtUxYk


Backbone.js Beginner Video Tutorial
Links

Link to client repo
Link to server repo
cdnjs
My homepage
Example RESTful Documentation

A deployed CORS enabled version of this server is available at

http://backbonejs-beginner.herokuapp.com

The server code base can be found here.

The example runs against this server which exposes the API shown below

Used for populating our users collection

GET /users - Returns an array of user objects e.g. [{firstname: 'Thomas', lastname: 'Davis', age: 12}]

Used for populating our user model

GET /users/:id - _Returns a single user object e.g. {id: 'xxxx', firstname: 'Thomas', lastname: 'Davis', age: 12}

POST /users - Creates a user based off the payload and returns the new user object e.g. {id: 'xxxx', firstname: 'Thomas', lastname: 'Davis', age: 12}

PUT /users/:id - Updates the given user with the given payload and returns the newly updated user object

DELETE /users/:id - Deletes the given user from the server

Extra Snippets

Ajax Prefilter

Ajax prefilters are useful for hooking into all AJAX request. In this case, we want to send all our AJAX request off to a remote server instead of the same domain. So we use a prefilter to hook in before the request is sent and prepend our custom origin server.

$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
  options.url = 'http://backbonejs-beginner.herokuapp.com' + options.url;
});
jQuery SerializeObject

By default jQuery doesn't allow us to convert our forms into Javascript Objects, someone wrote this snippet on Stack Overflow that I have been using for years. Simply call it via $(form).serializeObject() and get a object returned.

$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
      if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  });
  return o;
};
Preventing XSS

As always you need to protect your users by encoding input and output, here is some simple methods for doing so.

function htmlEncode(value){
  return $('<div/>').text(value).html();
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}
