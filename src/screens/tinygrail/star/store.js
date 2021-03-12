/*
 * @Author: czy0729
 * @Date: 2020-03-08 20:48:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-12 13:58:00
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'

const namespace = 'ScreenTinygrailStar'
const excludeState = {
  hover: 0
}

export default class ScreenTinygrailStar extends store {
  state = observable({
    page: 1,
    limit: 100,
    label: '全局',
    ...excludeState,
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state,
      ...excludeState,
      _loaded: true
    })

    const { page, limit } = this.state
    this.fetchStar(page, limit)
    this.fetchStarLogs()
  }

  // -------------------- fetch --------------------
  fetchStar = (page, limit) => tinygrailStore.fetchStar(page, limit)

  fetchStarLogs = () => tinygrailStore.fetchStarLogs(1, 100)

  // -------------------- get --------------------
  @computed get star() {
    const { page, limit } = this.state
    return tinygrailStore.star(`${page}|${limit}`)
  }

  @computed get starLogs() {
    return tinygrailStore.starLogs
  }

  @computed get mergeListMap() {
    const { list } = tinygrailStore.mergeList
    const map = {}
    list.forEach(item => (map[item.id] = item))
    return map
  }

  // -------------------- page --------------------
  setHover = id =>
    this.setState({
      hover: id
    })

  setPage = async (page, limit) => {
    await this.fetchStar(page, limit)
    this.setState({
      page,
      limit
    })
    this.setStorage(undefined, undefined, namespace)
  }

  setLabel = label => {
    this.setState({
      label
    })
    this.setStorage(undefined, undefined, namespace)
  }
}
