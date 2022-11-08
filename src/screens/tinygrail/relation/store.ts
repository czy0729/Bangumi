/*
 * @Author: czy0729
 * @Date: 2020-10-29 20:49:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-09 06:13:51
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
import { Params } from './types'

export const SORT_DS = [
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
] as const

const NAMESPACE = 'ScreenTinygrailRelation'

export default class ScreenTinygrailRelation extends store {
  params: Params

  state = observable({
    level: '',
    sort: '',
    direction: '' as '' | 'up' | 'down',
    go: '买入',
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(NAMESPACE)
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
    if (!_loaded) return LIST_EMPTY

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
  /** 设置前往 */
  onSelectGo = (title: string) => {
    t('关联角色.设置前往', {
      title
    })

    this.setState({
      go: title
    })
    this.setStorage(NAMESPACE)
  }

  onLevelSelect = (level: any) => {
    this.setState({
      level
    })

    this.setStorage(NAMESPACE)
  }

  /** 排序 */
  onSortPress = (item: string) => {
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

    this.setStorage(NAMESPACE)
  }
}
