/**
 * viser-vue组件主题
 *
 * tips:
 *  1. 此处只包含viser-theme-ui组件主题
 *  2. 要达到整站主题修改效果, 只需要改变[import theme from './[shine]/theme.js']
 */

import theme from './shine/theme.js'

// 注册主题
const { Global } = window.G2
Global.registerTheme('myTheme', theme)
//注册完后，设置主题
Global.setTheme('myTheme')