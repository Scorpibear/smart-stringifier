function stringify(obj, outline) {
  outline = outline || 0;
  if(obj instanceof Map) {
    let map = obj;
    return stringify([...map], outline);
  }
  if(obj instanceof Array) {
    return stringifyArray(obj, outline);
  }
  if(obj instanceof Object) {
    return `{${stringifyProperties(obj, outline)}}`;
  }
  return JSON.stringify(obj, null);
}

function stringifyArray(arr, outline) {
  outline++;
  let lastWasArray = false;
  let result = `[${arr.map(item => {
    let strItem = "";
    if(item instanceof Object) {
      if(item instanceof Array && !lastWasArray) {
        lastWasArray = true;
      } else {
        strItem += "\n" + " ".repeat(outline);
        lastWasArray = item instanceof Array;
      }
    } else {
      lastWasArray = false;
    }
    strItem += stringify(item, outline);
    return strItem;
    }).join(",")}]`;
  outline--;
  return result;
}

function stringifyProperties(obj, outline) {
  let keys = Object.keys(obj);
  return keys.map(key => `"${key}": ${stringify(obj[key], outline)}`).join(", ");
}

module.exports.stringify = stringify;