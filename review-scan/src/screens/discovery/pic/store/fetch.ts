/*
 * @Author: czy0729
 * @Date: 2025-06-09 14:51:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-15 20:31:49
 */
import { monoStore } from '@stores'
import { getTimestamp, info } from '@utils'
import { get, update } from '@utils/kv'
import { D7 } from '@constants'
import { Id } from '@types'
import { TEXT_FETCHING_ABORT, TEXT_FETCHING_WAIT } from '../ds'
import { List, Srcs } from '../types'
import { processImages, src, tag } from '../utils'
import Computed from './computed'

/** 此功能必须完成一次完整的请求流程, 才允许进行下一次流程 */
let globalFetching = false

export default class Fetch extends Computed {
  checkGlobalFetching = () => {
    return globalFetching
  }

  /** 获取列表数据 */
  fetchList = async (forceRefresh: boolean = false) => {
    if (!forceRefresh && this.list.length) {
      if (this.list.every(item => !!item.tags)) return true
    }

    if (this.state.fetching) {
      info(TEXT_FETCHING_WAIT)
      return false
    }

    if (globalFetching) {
      info(TEXT_FETCHING_ABORT)
      return false
    }

    const { page } = this.state
    const key = `pic_error_${this.keyword}`
    if (!forceRefresh) {
      const check = await get(key)
      if (check?.ts && Number(check.ts) && getTimestamp() - Number(check.ts) <= D7) {
        this.setState({
          empty: true
        })
        if (page === 1) monoStore.updatePicTotal(this.keyword, 0)
        return false
      }
    }

    this.setState({
      fetching: true
    })

    globalFetching = true
    const result = await tag(
      this.keyword,
      page,
      this.onListProgress,
      this.onSrcsProgress,
      forceRefresh
    )
    globalFetching = false

    if (!result) {
      this.setState({
        fetching: false,
        empty: true
      })

      if (page === 1) {
        update(key, {
          ts: getTimestamp()
        })
        monoStore.updatePicTotal(this.keyword, 0)
      }
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
      info(TEXT_FETCHING_WAIT)
      return false
    }

    if (globalFetching) {
      info(TEXT_FETCHING_ABORT)
      return false
    }

    this.setState({
      fetching: true
    })

    globalFetching = true
    const srcs = await src(fetchIds, this.onSrcsProgress)
    globalFetching = false

    this.setState({
      srcs,
      fetching: false
    })
    this.save()
  }

  /** 提前更新列表数据 */
  onListProgress = (data: List) => {
    this.setState({
      list: {
        [this.state.page]: processImages(data),
        _loaded: getTimestamp()
      }
    })
  }

  /** 提前更新实际地址数据 */
  onSrcsProgress = (data: Srcs) => {
    this.setState({
      srcs: data
    })
    this.save()
  }
}
