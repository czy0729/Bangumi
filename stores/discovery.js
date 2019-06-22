/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:44:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-22 21:09:55
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import fetch from '@utils/fetch'
import store from '@utils/store'
import { LIST_EMPTY } from '@constants'

const namespace = 'Discovery'

class Discovery extends store {
  state = observable({
    random: LIST_EMPTY
  })

  async init() {}

  // -------------------- get --------------------

  // -------------------- fetch --------------------
  async fetchRandom() {
    const data = await fetch({
      method: 'POST',
      url: 'https://www.ningmoe.com/api/get_random_bangumi'
    })

    if (data.code === 200) {
      // log(data.data)
    }
  }
}

export default new Discovery()
