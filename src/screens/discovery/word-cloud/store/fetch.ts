/*
 * @Author: czy0729
 * @Date: 2024-09-26 16:05:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 15:22:48
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
    const now = getTimestamp()
    const { data } = this.state
    if (data._loaded && data.list?.length) {
      if (now - Number(data._loaded) <= D7) return true
    }

    try {
      const snapshot = await get(`extract_${this.subjectId}`)
      if (snapshot?.data?._loaded && snapshot?.data?.list?.length) {
        if (now - Number(snapshot.data._loaded) <= D7) {
          this.setState({
            data: {
              list: snapshot.data.list,
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
