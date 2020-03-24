/*
 * @Author: czy0729
 * @Date: 2020-03-24 20:00:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-24 20:02:38
 */
import { observable } from 'mobx'
import store from '@utils/store'

export default class ScreenComic extends store {
  state = observable({
    _loaded: false
  })

  init = () => {}

  // -------------------- get --------------------

  // -------------------- page --------------------

  // -------------------- action --------------------
}
