var rollwith = function(template, data) {

  var templateCode
  var templateRegex = /`([^`]+)?`/g
  var keyword = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g
  var functionCode = 'var r=[]\n'
  var index = 0

  var appendCode = function(line, isJavaScript) {
    if (isJavaScript) {
      if (line.match(keyword)) {
        functionCode += line + '\n'
      } else {
        functionCode += 'r.push(' + line.trim() + ')\n'
      }
    } else {
      functionCode += 'r.push("' + line.trim().replace(/"/g, '\\"') + '")\n'
    }
  }

  while (templateCode = templateRegex.exec(template)) {
    appendCode(template.slice(index, templateCode.index), false)
    appendCode(templateCode[1], true)
    index = templateCode.index + templateCode[0].length
  }

  appendCode(template.substr(index, template.length - index))
  functionCode += 'return r.join("")'
  return new Function(functionCode).apply(data)

}
