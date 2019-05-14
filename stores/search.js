/*
 * @Author: czy0729
 * @Date: 2019-05-14 22:06:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-14 22:07:43
 */
import { observable, computed } from 'mobx'
import { LIST_EMPTY } from '@constants'
import { API_CALENDAR } from '@constants/api'
import store from '@utils/store'

class Search extends store {
  state = observable({
    history: []
  })

  // -------------------- get --------------------

  // -------------------- fetch --------------------
}

export default new Search()
