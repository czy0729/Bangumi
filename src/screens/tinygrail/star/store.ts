/*
 * @Author: czy0729
 * @Date: 2020-03-08 20:48:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-09 06:47:53
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'

const NAMESPACE = 'ScreenTinygrailStar'
const EXCLUD_ESTATE = {
  hover: 0
}

export default class ScreenTinygrailStar extends store {
  state = observable({
    page: 1,
    limit: 100,
    label: '全局',
    ...EXCLUD_ESTATE,
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(NAMESPACE)
    this.setState({
      ...state,
      ...EXCLUD_ESTATE,
      _loaded: true
    })

    const { page, limit } = this.state
    this.fetchStar(page, limit)
    this.fetchStarLogs()
  }

  // -------------------- fetch --------------------
  /** 通天塔(α) */
  fetchStar = (page: number, limit: number) => {
    return tinygrailStore.fetchStar(page, limit)
  }

  /** 通天塔(α)记录 */
  fetchStarLogs = () => {
    return tinygrailStore.fetchStarLogs(1, 100)
  }

  // -------------------- get --------------------
  /** 通天塔(α) */
  @computed get star() {
    const { page, limit } = this.state
    return tinygrailStore.star(`${page}|${limit}`)
  }

  /** 通天塔(α)记录 */
  @computed get starLogs() {
    return tinygrailStore.starLogs
  }

  @computed get mergeListMap() {
    const { list } = tinygrailStore.mergeList
    const map = {}
    list.forEach((item: any) => (map[item.id] = item))
    return map
  }

  // -------------------- page --------------------
  setHover = (id: number) => {
    return this.setState({
      hover: id
    })
  }

  setPage = async (page: number, limit: number) => {
    await this.fetchStar(page, limit)
    this.setState({
      page,
      limit
    })
    this.setStorage(NAMESPACE)
  }

  setLabel = (label: string) => {
    this.setState({
      label
    })
    this.setStorage(NAMESPACE)
  }
}
