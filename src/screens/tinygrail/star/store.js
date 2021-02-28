/*
 * @Author: czy0729
 * @Date: 2020-03-08 20:48:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-28 17:50:08
 */
import { observable, computed } from 'mobx'
import { tinygrailStore } from '@stores'
import store from '@utils/store'

export default class ScreenTinygrailStar extends store {
  state = observable({
    page: 1,
    limit: 100,
    hover: 0,
    _loaded: false
  })

  init = () => {
    this.fetchStar()
    this.fetchStarLogs()
  }

  // -------------------- fetch --------------------
  fetchStar = () => {
    const { page, limit } = this.state
    return tinygrailStore.fetchStar(page, limit)
  }

  fetchStarLogs = () => tinygrailStore.fetchStarLogs(1, 100)

  // -------------------- get --------------------
  @computed get star() {
    const { page, limit } = this.state
    return tinygrailStore.star(`${page}|${limit}`)
  }

  @computed get starLogs() {
    return tinygrailStore.starLogs
  }

  // -------------------- page --------------------
  setHover = id =>
    this.setState({
      hover: id
    })
}
