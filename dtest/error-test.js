function errtest() {
  throw 'error'
}

function errtest_1() {
  throw Error('错误')
}

try{
  errtest()
  errtest_1()
} catch (e) {
  console.log(e)
  try {
    errtest_1()
  } catch (e) {
    console.log(e)
  }

}
