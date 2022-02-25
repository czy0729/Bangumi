/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:57:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-02-25 14:01:46
 */
import React from 'react'
import { observable, computed } from 'mobx'
import { rakuenStore } from '@stores'
import { desc } from '@utils'
import store from '@utils/store'
import Extra from './extra'

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

  setParams = navigation => {
    navigation.setParams({
      extra: <Extra $={this} />
    })
  }

  // -------------------- get --------------------
  @computed get mine() {
    return {
      ...rakuenStore.mine,
      list: rakuenStore.mine.list.sort((a, b) => desc(a, b, item => item.num))
    }
  }

  // -------------------- page --------------------
  onChange = title => {
    this.setState({
      type: title === '全部' ? 'all' : 'mine'
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
