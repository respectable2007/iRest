/**
 * 样式
 */
import '../src/styles/index.scss'
/* 步骤条实例 */
import '../src/package/steps'
import { Step } from '../src/package/steps';
/* rest-cookies 未完待续*/
// import Cookies from  '../src/rest-cookie/rest-cookie.js'
new Step( {
  active: 0,
  titles: ['步骤1', '步骤2', '步骤3']
})