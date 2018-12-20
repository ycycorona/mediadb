const _ = require('lodash');

function merge_test() {
  const destination = {name: 'ycy'}
  const source = {name: 'whh', age: 12}
  _.mergeWith(destination, source, (desValue, srcValue) => {
    console.log(1)
    return srcValue
  })
  console.log(2)
}

merge_test()
