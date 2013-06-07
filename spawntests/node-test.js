
console.log("starting up...");

var yourfunc = function(url) {
  console.log("Running custom function");
  var phantom = require('child_process').spawn('phantomjs', ['phantom-test.js', url]);
  phantom.stdout.setEncoding('utf8');
  phantom.stdout.on('data', function(data) {
    //parse or echo data
    var str_phantom_output = data.toString();
    // The above will get triggered one or more times, so you'll need to
    // add code to parse for whatever info you're expecting from the browser
    console.log("got some data: " + str_phantom_output);
  });
  phantom.stderr.on('data', function(data) {
    // do something with error data
    console.log("got some data: " + data);
  });
  phantom.on('exit', function(code) {
    if (code !== 0) {
      console.log('phantomjs exited with code ' +code);
    } else {
      // clean exit: do something else such as a passed-in callback
      console.log("Clean exit");
    }
  });
}
console.log("Running");
yourfunc("http://www.google.com");
