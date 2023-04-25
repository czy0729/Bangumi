/*
 * @Author: czy0729
 * @Date: 2023-04-24 14:16:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-24 14:17:24
 */
import { getTimestamp } from '@utils'
import { fetchHTML } from '@utils/fetch'
import { HTML_SUBJECT_CHARACTERS, HTML_SUBJECT_PERSONS } from '@constants'
import { SubjectId } from '@types'
import Computed from './computed'
import { cheerioCharacters, cheerioPersons } from './common'

export default class Fetch extends Computed {
  /** 更多角色 */
  fetchCharacters = async (args: { subjectId: SubjectId }) => {
    const { subjectId } = args || {}
    const html = await fetchHTML({
      url: HTML_SUBJECT_CHARACTERS(subjectId)
    })

    const list = cheerioCharacters(html)
    const key = 'characters'
    this.setState({
      [key]: {
        [subjectId]: {
          list,
          pagination: {
            page: 1,
            pageTotal: 1
          },
          _loaded: getTimestamp()
        }
      }
    })
    return this[key](subjectId)
  }

  /** 更多制作人员 */
  fetchPersons = async (args: { subjectId: SubjectId }) => {
    const { subjectId } = args || {}
    const html = await fetchHTML({
      url: HTML_SUBJECT_PERSONS(subjectId)
    })

    const list = cheerioPersons(html)
    const key = 'persons'
    this.setState({
      [key]: {
        [subjectId]: {
          list,
          pagination: {
            page: 1,
            pageTotal: 1
          },
          _loaded: getTimestamp()
        }
      }
    })
    return this[key](subjectId)
  }
}
