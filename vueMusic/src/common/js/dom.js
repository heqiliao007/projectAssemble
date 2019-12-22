// es6 js 动态添加class封装
// 关于addClass()方法的说明，因为该方法是直接进行DOM操作，所以该方法是单独放在一个js文件中
export function hasClass(el, className) {
  // 是否存在该类名
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  // el.className 获取class
  return reg.test(el.className)
}

export function addClass(el, className) {
  // 该DOM对象有这个类名时，什么都不做
  if (hasClass(el, className)) {
    return
  }
  // 获取类名
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

// 删除class
export function removeClass(el, className) {
  // 先判断是否含有这个class，含有时，才继续
  if (!hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ') // 分割class字符串为class数组
  // findIndex返回的是索引下标
  let index = newClass.findIndex((item) => { // 找到指定的class在class数组中的索引
    return item === className
  })
  newClass.splice(index, 1) // 删除索引中的这项
  el.className = newClass.join(' ') // 将class数组以空格为连接符连接成class字符串
}
export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
