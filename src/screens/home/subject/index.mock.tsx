/*
 * @Author: czy0729
 * @Date: 2023-04-08 06:07:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-08 06:54:53
 */
import { subjectStore } from '@stores'
import { getInt } from '@stores/subject'
import { getTimestamp } from '@utils'
import { subject, subjectFromHTML } from '@assets/mock/screens/subject_376703'

export function init() {
  const subjectId = 376703
  const last = getInt(subjectId)
  subjectStore.setState({
    [`subject${last}`]: {
      [subjectId]: {
        ...subject,
        _loaded: getTimestamp()
      }
    },
    [`subjectFormHTML${last}`]: {
      [subjectId]: {
        ...subjectFromHTML,
        _loaded: getTimestamp()
      }
    }
  })
}
