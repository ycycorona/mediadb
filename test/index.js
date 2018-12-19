const test = require('ava');
const path = require('path');
require(path.join(process.cwd(), 'production.js'));

test('eee', t => {
  const a = think.model('users');
  console.log('123')
})
