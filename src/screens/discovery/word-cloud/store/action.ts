/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:06:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 18:34:59
 */
import { getTimestamp } from '@utils'
import { t } from '@utils/fetch'
import { extract, update } from '@utils/kv'
import { MAX_PAGE } from '../ds'
import Fetch from './fetch'
import { FILTER_WORD } from './ds'

export default class Action extends Fetch {
  /** 批量获取吐槽 */
  batchSubject = async (refresh: boolean = false) => {
    if (this.state.fetching) return

    if (refresh) {
      t('词云.刷新', {
        id: this.subjectId || this.topicId
      })
    }

    if (!refresh) {
      if (this.state.data._loaded) return

      if (this.comment._loaded) {
        const { pagination } = this.comment
        if (
          pagination.page >= MAX_PAGE ||
          (pagination.pageTotal && pagination.page >= pagination.pageTotal)
        ) {
          return this.cut()
        }
      }
    }

    this.setState({
      fetching: 1
    })
    try {
      const data = await this.fetchSubjectComments(true)
      const pageTotal = data?.[this.subjectId]?.pagination?.pageTotal || 0
      for (let i = 2; i <= Math.min(MAX_PAGE, pageTotal); i += 1) {
        this.setState({
          fetching: i
        })
        await this.fetchSubjectComments()
      }
    } catch (error) {}
    this.setState({
      fetching: 0
    })

    return this.cut()
  }

  /** 帖子 */
  cutTopic = async () => {
    await this.fetchTopic()
    await this.cut()
    return true
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
        update(this.snapshotId, {
          data
        })
      }
    }

    t('词云.分词', {
      id: this.subjectId || this.topicId
    })

    return true
  }

  /** 分词点击 */
  onWordPress = (title: string) => {
    this.setState({
      title,
      show: true
    })

    t('词云.点击', {
      id: this.subjectId || this.topicId,
      title
    })
  }

  /** 收起吐槽列表 */
  onClose = () => {
    this.setState({
      show: false
    })
  }
}
