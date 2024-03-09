/*
 * @Author: czy0729
 * @Date: 2020-03-08 20:48:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-09 05:41:48
 */
import { computed, observable } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'
import { EXCLUD_STATE, NAMESPACE, STATE } from './ds'

export default class ScreenTinygrailStar extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUD_STATE,
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

  mergeListMap() {
    const { list } = tinygrailStore.mergeList
    const map = {}
    list.forEach((item: any) => (map[item.id] = item))
    return map
  }

  // -------------------- page --------------------
  setHover = (id: number) => {
    this.setState({
      hover: id
    })
    return
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
