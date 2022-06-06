/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:57:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-06 11:11:55
 */
import { observable, computed } from 'mobx'
import { rakuenStore } from '@stores'
import { desc } from '@utils'
import store from '@utils/store'

const excludeState = {
  ipt: '',
  filter: '',
  isFocused: true
}

export default class ScreenMine extends store {
  namespace = 'ScreenMine'

  state = observable({
    type: 'mine', // mine | all
    ...excludeState,
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage()
    this.setState({
      ...state,
      ...excludeState,
      _loaded: true
    })

    return rakuenStore.fetchMine()
  }

  // -------------------- get --------------------
  @computed get mine() {
    return {
      ...rakuenStore.mine,
      list: rakuenStore.mine.list.sort((a, b) => desc(a, b, item => item.num))
    }
  }

  // -------------------- page --------------------
  onChange = label => {
    if (label) {
      const { type } = this.state
      if (label === '我的' && type === 'mine') return
      if (label === '全部' && type === 'all') return
    }

    this.setState({
      type: label === '全部' ? 'all' : 'mine'
    })
    this.saveStorage()
  }

  onFilterChange = ipt => {
    const _ipt = ipt.trim()
    if (!_ipt) {
      this.setState({
        ipt: _ipt,
        filter: ''
      })
      return
    }

    this.setState({
      ipt: _ipt
    })
  }

  onSubmitEditing = () => {
    const { ipt } = this.state
    if (ipt && ipt.length) {
      this.setState({
        filter: ipt
      })
    }
  }
}
