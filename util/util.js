function isEmpty(obj) {
  // because Object.keys(new Date()).length === 0;
  // we have to do some additional check
  return (
    obj && // null and undefined check
    Object.keys(obj).length === 0 &&
    obj.constructor === Object
  );
}

function objContainsVal(obj, value) {
  return Object.values(obj).indexOf(value) > -1;
}

module.exports = { isEmpty, objContainsVal };
