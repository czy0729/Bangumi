/*
 * 小圣杯
 * @Author: czy0729
 * @Date: 2019-08-24 23:18:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-09 20:10:30
 */
import Action from './action'

const tinygrailStore = new Action()
setTimeout(() => {
  tinygrailStore.init('cookie')
  tinygrailStore.init('hash')
}, 2000)

export default tinygrailStore
