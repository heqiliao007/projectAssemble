export function getwidth (wid) {
  console.log(wid)
  var userAgent = navigator.userAgent
  if (wid < 950) {
    if (userAgent.indexOf('Firefox') > -1) {
      document.getElementsByClassName('test')[0].style.transform = 'scale(' + wid / 750 + ')'
      document.getElementsByClassName('test')[0].style.transformOrigin = 'top'
    } else {
      document.getElementsByClassName('test')[0].style.zoom = wid / 750
    }
  }
}
