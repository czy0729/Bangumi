/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:06:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 04:29:38
 */
import { getTimestamp } from '@utils'
import { extract, update } from '@utils/kv'
import Fetch from './fetch'
import { FILTER_WORD } from './ds'

export default class Action extends Fetch {
  /** 批量获取吐槽 */
  batch = async () => {
    const { pagination, _loaded } = this.comment
    if (_loaded) {
      if (pagination.page >= 5) return
      if (pagination.pageTotal && pagination.page >= pagination.pageTotal) return
    }

    this.setState({
      fetching: 1
    })

    try {
      const data = await this.fetchSubjectComments(true)
      const pageTotal = data?.[this.subjectId]?.pagination?.pageTotal || 0
      for (let i = 2; i <= Math.min(5, pageTotal); i += 1) {
        this.setState({
          fetching: i
        })
        await this.fetchSubjectComments()
      }

      await this.cut()
    } catch (error) {}

    this.setState({
      fetching: 0
    })
  }

  /** 分词 */
  cut = async () => {
    const result = await extract(this.plainText)
    if (result) {
      const data = {
        list: result.filter(item => !FILTER_WORD.includes(item[0])),
        _loaded: getTimestamp()
      }
      this.setState({
        data
      })
      this.save()

      if (data.list.length >= 40) {
        update(`extract_${this.subjectId}`, {
          data
        })
      }
    }

    return true
  }

  /** 分词点击 */
  onWordPress = (title: string) => {
    this.setState({
      title,
      show: true
    })
  }

  /** 收起吐槽列表 */
  onClose = () => {
    this.setState({
      show: false
    })
  }
}
