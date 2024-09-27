/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:05:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-26 17:15:31
 */
import { subjectStore } from '@stores'
import { getTimestamp } from '@utils'
import { get } from '@utils/kv'
import { D7 } from '@constants'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 条目留言 */
  fetchSubjectComments = async (refresh?: boolean) => {
    return subjectStore.fetchSubjectComments(
      {
        subjectId: this.subjectId,
        interest_type: '',
        version: false
      },
      refresh
    )
  }

  /** 分词快照 */
  fetchSnapshot = async () => {
    try {
      const data = await get(`extract_${this.subjectId}`)
      if (data?.data?._loaded && data?.data?.list?.length) {
        const now = getTimestamp()
        if (now - Number(data.data._loaded) <= D7) {
          this.setState({
            data: {
              list: data.data.list,
              _loaded: now
            }
          })
          return true
        }
      }
    } catch (error) {}

    return false
  }
}
