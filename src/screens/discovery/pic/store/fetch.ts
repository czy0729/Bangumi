/*
 * @Author: czy0729
 * @Date: 2025-06-09 14:51:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-11 23:42:35
 */
import { getTimestamp, info } from '@utils'
import { Id } from '@types'
import { ItemInfo } from '../types'
import { processImages, src, tag } from '../utils'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 获取列表数据 */
  fetchList = async () => {
    if (this.list.length) return true

    if (this.state.fetching) {
      info('请先等待上次请求结束')
      return false
    }

    this.setState({
      fetching: true
    })

    const { page } = this.state
    const result = await tag(this.keyword, page, this.onListProgress, this.onSrcsProgress)
    if (!result) {
      this.setState({
        fetching: false,
        empty: true
      })
      return false
    }

    const { list, pagination } = result
    this.setState({
      list: {
        [page]: processImages(list),
        _loaded: getTimestamp()
      },
      pageTotal: pagination.pageTotal,
      fetching: false
    })
    this.save()
  }

  /** 获取实际地址 */
  fetchSrcs = async (ids?: Id[]) => {
    const fetchIds =
      ids || this.list.filter(item => !this.image(item.id)).map(item => item.id) || []
    if (!fetchIds.length) return true

    if (this.state.fetching) {
      info('请先等待上次请求结束')
      return false
    }

    this.setState({
      fetching: true
    })

    const srcs = await src(fetchIds, this.onSrcsProgress)
    this.setState({
      srcs,
      fetching: false
    })
    this.save()
  }

  /** 提前更新列表数据 */
  onListProgress = (data: ItemInfo[]) => {
    this.setState({
      list: {
        [this.state.page]: processImages(data),
        _loaded: getTimestamp()
      }
    })
  }

  /** 提前更新实际地址数据 */
  onSrcsProgress = (data: Record<Id, string>) => {
    this.setState({
      srcs: data
    })
    this.save()
  }
}
