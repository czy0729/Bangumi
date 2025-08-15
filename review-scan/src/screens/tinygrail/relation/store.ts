/*
 * @Author: czy0729
 * @Date: 2020-10-29 20:49:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 15:48:10
 */
import { computed, observable } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import { t } from '@utils/fetch'
import store from '@utils/store'
import { LIST_EMPTY } from '@constants'
import {
  relation,
  SORT_DJ,
  SORT_DQJ,
  SORT_DQZD,
  SORT_GX,
  SORT_GXB,
  SORT_HYD,
  SORT_SC,
  SORT_SDGX,
  SORT_SDGXB,
  SORT_XFJL
} from '../_/utils'
import { STATE } from './ds'
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

export default class ScreenTinygrailRelation extends store<typeof STATE> {
  params: Params

  state = observable(STATE)

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
    this.saveStorage(NAMESPACE)
  }

  onLevelSelect = (level: any) => {
    this.setState({
      level
    })

    this.saveStorage(NAMESPACE)
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

    this.saveStorage(NAMESPACE)
  }
}
