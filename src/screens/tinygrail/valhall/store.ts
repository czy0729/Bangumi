/*
 * @Author: czy0729
 * @Date: 2019-11-29 21:58:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 11:31:13
 */
import { computed, observable } from 'mobx'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import { t } from '@utils/fetch'
import store from '@utils/store'
import { levelList, relation, sortList } from '@tinygrail/_/utils'
import { NAMESPACE, STATE } from './ds'

export default class ScreenTinygrailValhall extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60

    const state = await this.getStorage(NAMESPACE)
    this.setState({
      ...state,
      _loaded: needFetch ? current : _loaded
    })

    if (needFetch) this.fetchValhallList()
    return state
  }

  // -------------------- fetch --------------------
  /** 英灵殿 */
  fetchValhallList = () => {
    return tinygrailStore.fetchValhallList()
  }

  // -------------------- get --------------------
  /** 英灵殿 */
  @computed get valhallList() {
    return relation(tinygrailStore.valhallList)
  }

  @computed get computedList() {
    const { sort, level, direction } = this.state
    const list = this.valhallList
    if (!list._loaded) return list

    let _list = list
    if (level) {
      _list = {
        ..._list,
        list: levelList(level, _list.list)
      }
    }

    if (sort) {
      _list = {
        ..._list,
        list: sortList(sort, direction, _list.list)
      }
    }

    return _list
  }

  @computed get levelMap() {
    const { list } = this.valhallList
    const data = {}
    list.forEach(item => (data[item.level] ? (data[item.level] += 1) : (data[item.level] = 1)))
    return data
  }

  // -------------------- page --------------------
  /** 设置前往 */
  onSelectGo = (title: string) => {
    t('英灵殿.设置前往', {
      title
    })

    this.setState({
      go: title
    })
    this.saveStorage(NAMESPACE)
  }

  /** 筛选 */
  onLevelSelect = (level: any) => {
    t('英灵殿.筛选', {
      level
    })

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

      t('英灵殿.排序', {
        sort: nextSort,
        direction: nextDirection
      })

      this.setState({
        sort: nextSort,
        direction: nextDirection
      })
    } else {
      t('英灵殿.排序', {
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
