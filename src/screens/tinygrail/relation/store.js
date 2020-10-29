/* eslint-disable no-await-in-loop, no-restricted-syntax */
/*
 * @Author: czy0729
 * @Date: 2020-10-29 20:49:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-29 22:07:19
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'
import {
  relation,
  SORT_SC,
  SORT_GX,
  SORT_GXB,
  SORT_SDGX,
  SORT_SDGXB,
  SORT_HYD,
  SORT_DQJ,
  SORT_DQZD,
  SORT_XFJL,
  SORT_DJ
} from '../_/utils'

export const sortDS = [
  SORT_SC,
  SORT_HYD,
  SORT_GX,
  SORT_SDGX,
  SORT_DQJ,
  SORT_DQZD,
  SORT_DJ,
  SORT_XFJL,
  SORT_GXB,
  SORT_SDGXB
]
const namespace = 'ScreenTinygrailRelation'

export default class ScreenTinygrailRelation extends store {
  state = observable({
    level: '',
    sort: '',
    direction: '',
    go: '买入',
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state,
      _loaded: false
    })

    const { ids } = this.params
    for (const id of ids) {
      await tinygrailStore.fetchCharacters([id])
    }

    this.setState({
      _loaded: getTimestamp()
    })
    return true
  }

  // -------------------- get --------------------
  @computed get list() {
    const { _loaded } = this.state
    if (!_loaded) {
      return LIST_EMPTY
    }

    const { ids } = this.params
    return relation({
      list: ids.map(id => tinygrailStore.characters(id)),
      pagination: {
        page: 1,
        pageTotal: 1
      },
      _loaded: getTimestamp()
    })
  }

  // -------------------- page --------------------
  onSelectGo = title => {
    t('关联角色.设置前往', {
      title
    })

    this.setState({
      go: title
    })
    this.setStorage(undefined, undefined, namespace)
  }

  onLevelSelect = level => {
    this.setState({
      level
    })

    this.setStorage(undefined, undefined, namespace)
  }

  onSortPress = item => {
    const { sort, direction } = this.state
    if (item === sort) {
      let nextSort = item
      let nextDirection = 'down'
      if (direction === 'down') {
        nextDirection = 'up'
      } else if (direction === 'up') {
        nextSort = ''
        nextDirection = ''
      }

      t('关联角色.排序', {
        sort: nextSort,
        direction: nextDirection
      })

      this.setState({
        sort: nextSort,
        direction: nextDirection
      })
    } else {
      t('关联角色.排序', {
        sort: item,
        direction: 'down'
      })

      this.setState({
        sort: item,
        direction: 'down'
      })
    }

    this.setStorage(undefined, undefined, namespace)
  }
}
