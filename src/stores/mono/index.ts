/*
 * 角色
 * @Author: czy0729
 * @Date: 2019-02-27 07:47:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-20 04:33:10
 */
import { observable, computed } from 'mobx'
import { getTimestamp } from '@utils'
import { fetchHTML } from '@utils/fetch'
import store from '@utils/store'
import {
  LIST_EMPTY,
  HTML_SUBJECT_CHARACTERS,
  HTML_SUBJECT_PERSONS,
  DEV
} from '@constants'
import { StoreConstructor, SubjectId } from '@types'
import { LOG_INIT } from '../ds'
import { LOADED, NAMESPACE, STATE } from './init'
import { cheerioCharacters, cheerioPersons } from './common'
import { Characters, Persons } from './types'

type CacheKey = keyof typeof LOADED

class MonoStore extends store implements StoreConstructor<typeof STATE> {
  state = observable(STATE)

  private _loaded = LOADED

  init = (key: CacheKey) => {
    if (!key || this._loaded[key]) return true

    if (DEV && LOG_INIT) console.info('MonoStore /', key)

    // this._loaded[key] = true
    return this.readStorage([key], NAMESPACE)
  }

  save = (key: CacheKey) => {
    return this.setStorage(key, undefined, NAMESPACE)
  }

  /** 更多角色 */
  characters(subjectId: SubjectId) {
    return computed<Characters>(() => {
      return this.state.characters[subjectId] || LIST_EMPTY
    }).get()
  }

  /** 更多制作人员 */
  persons(subjectId: SubjectId) {
    return computed<Persons>(() => {
      return this.state.persons[subjectId] || LIST_EMPTY
    }).get()
  }

  // -------------------- fetch --------------------
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

export default new MonoStore()
