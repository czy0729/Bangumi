/*
 * @Author: czy0729
 * @Date: 2023-04-24 14:16:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-28 00:57:58
 */
import { getTimestamp } from '@utils'
import { fetchHTML } from '@utils/fetch'
import { get } from '@utils/kv'
import hash from '@utils/thirdParty/hash'
import { HTML_SUBJECT_CHARACTERS, HTML_SUBJECT_PERSONS } from '@constants'
import { SubjectId } from '@types'
import { cheerioCharacters, cheerioPersons } from './common'
import Computed from './computed'

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

  /** 画集数 */
  fetchPicTotal = async (name: string = '') => {
    if (!name) return false

    const STATE_KEY = 'picTotal'
    const ITEM_KEY = hash(name).slice(0, 4)
    if (!ITEM_KEY || this[STATE_KEY](ITEM_KEY) !== undefined) return

    let value = 0
    try {
      value = Number(await get(`pic_total_${name}`))
    } catch (error) {}
    this.updatePicTotal(name, value)

    return this[STATE_KEY](ITEM_KEY)
  }

  updatePicTotal = (name: string = '', value: number = 0) => {
    const STATE_KEY = 'picTotal'
    const ITEM_KEY = hash(name).slice(0, 4)
    this.setState({
      [STATE_KEY]: {
        [ITEM_KEY]: value
      }
    })
    this.save(STATE_KEY)
  }
}
