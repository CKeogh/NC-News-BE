exports.createRefTable = (arrayOfObjects, name, id) => arrayOfObjects.reduce((endObj, currObj) => {
  endObj[currObj[name]] = currObj[id];
  return endObj;
}, {});
