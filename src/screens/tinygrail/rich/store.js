/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-25 17:27:03
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'

export const tabs = [
  {
    title: '1-100',
    key: '1/100'
  },
  {
    title: '股息',
    key: '1/100/0'
  },
  {
    title: '余额',
    key: '1/100/1'
  },
  {
    title: '初始',
    key: '1/100/3'
  }
]
const namespace = 'ScreenTinygrailRich'

export default class ScreenTinygrailRich extends store {
  state = observable({
    page: 0,
    _loaded: false
  })

  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - _loaded > 60

    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) {
      const { page } = this.state
      this.fetchRich(this.key(page))
    }

    return res
  }

  // -------------------- fetch --------------------
  fetchRich = key => tinygrailStore.fetchRich(key)

  // -------------------- get --------------------
  key(page) {
    return computed(() => tabs[page].key).get()
  }

  title(page) {
    return computed(() => tabs[page].title).get()
  }

  rich(key) {
    return computed(() => tinygrailStore.rich(key)).get()
  }

  // -------------------- page --------------------
  onChange = page => {
    if (page === this.state.page) {
      return
    }

    t('番市首富.标签页切换', {
      page
    })

    this.setState({
      page
    })
    this.setStorage(undefined, undefined, namespace)
    this.tabChangeCallback(page)
  }

  tabChangeCallback = page => {
    const key = this.key(page)
    const { _loaded } = this.rich(key)
    if (!_loaded) {
      this.fetchRich(key)
    }
  }
}
