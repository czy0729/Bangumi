/*
 * @Author: czy0729
 * @Date: 2020-03-08 20:48:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 17:58:13
 */
import { computed, observable } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class ScreenTinygrailStar extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    this.setState({
      ...(await this.getStorage(NAMESPACE)),
      ...EXCLUDE_STATE,
      _loaded: true
    })

    const { page, limit } = this.state
    return this.fetchStar(page, limit)
  }

  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }

  // -------------------- fetch --------------------
  /** 通天塔(β) */
  fetchStar = (page: number, limit: number) => {
    return tinygrailStore.fetchStar(page, limit)
  }

  /** 通天塔指数 */
  fetchStarIndex = async () => {
    const { list } = await tinygrailStore.fetchStar(1, 100)
    const starIndexWeight = list.reduce((sum, char) => {
      return sum + char.rate || 0
    }, 0)
    if (starIndexWeight) {
      this.setState({
        starIndexWeight: Math.floor(starIndexWeight)
      })
      this.save()
    }
  }

  // -------------------- get --------------------
  /** 通天塔(β) */
  @computed get star() {
    const { page, limit } = this.state
    return tinygrailStore.star(`${page}|${limit}`)
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
    this.save()
  }

  setLabel = (label: string) => {
    this.setState({
      label
    })
    this.save()
  }
}
