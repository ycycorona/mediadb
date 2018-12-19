const test = require('ava');
const path = require('path');
require(path.join(process.cwd(), 'production.js'));

test('getUserByAuthTypeAndIdentifier', async t => {
  const authType = 'passwd';
  const identifier = 'root'
  const users = think.model('users');
  const userInfo = await users.getUserByAuthTypeAndIdentifier(authType, identifier)
  t.is(userInfo.user_name, identifier)
})

test('getUserInfo', async t => {
  const user_name = 'root'
  const users = think.model('users');
  const userInfo = await users.getUserInfoByUserName(user_name)
  t.is(userInfo.user_name, user_name)
})
