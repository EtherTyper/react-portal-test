const path = require('path');

require('serve')(path.join(__dirname, 'build'), {
  port: 5003,
  open: true
});