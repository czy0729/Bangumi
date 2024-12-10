/*
 * @Author: czy0729
 * @Date: 2024-06-04 15:34:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-01 13:25:55
 */
import { info } from '@utils'
import { gets } from '@utils/kv'
import { CollectRankSort, Types } from '../types'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 切换 Tab */
  onIndexChange = (page: number) => {
    this.setState({
      page
    })
    this.save()
  }

  /** 切换类型 */
  onValueChange = (title: Types) => {
    this.setState({
      type: title
    })
    this.save()
  }

  /** 加载一页云端帖子数据 */
  onPage = async (data: string[]) => {
    if (!data.length) return true

    const keys = []
    data.forEach(item => {
      const key = `favor_${item.replace('/', '_')}`
      keys.push(key)
    })
    if (!keys.length) return true

    const datas = await gets(keys)
    this.setState({
      topics: datas
    })
    this.save()
  }

  /** 加载一页云端帖子数据 */
  onPageMemo = async (data: string[]) => {
    if (!data.length) return true

    const keys = []
    data.forEach(item => {
      const key = `favor_${item.replace('/', '_')}`
      if (!this.state.topics[key]) keys.push(key)
    })
    if (!keys.length) return true

    const datas = await gets(keys)
    this.setState({
      topics: datas
    })
    this.save()
  }

  /** 上一页 */
  prev = async () => {
    const { replyPage } = this.state
    if (replyPage === 1) return

    this.setState({
      replyPage: replyPage - 1,
      show: false,
      ipt: String(replyPage - 1)
    })
    this.fetchGroup()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.save()
    }, 400)
  }

  /** 下一页 */
  next = async () => {
    const { replyPage } = this.state
    this.setState({
      replyPage: replyPage + 1,
      show: false,
      ipt: String(replyPage + 1)
    })
    this.fetchGroup()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.save()
    }, 400)
  }

  /** 页码输入框改变 */
  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      ipt: text
    })
  }

  /** 切换热门排序 */
  onCollectRankSortChange = (title: CollectRankSort) => {
    this.setState({
      collectRankSort: title
    })
    this.save()
  }

  /** 页码跳转 */
  doSearch = () => {
    const { ipt } = this.state
    const _ipt = ipt === '' ? 1 : parseInt(ipt)
    if (_ipt < 1) {
      info('请输入正确页码')
      return
    }

    this.setState({
      replyPage: _ipt,
      show: false,
      ipt: String(_ipt)
    })
    this.fetchGroup()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.save()
    }, 400)
  }
}
