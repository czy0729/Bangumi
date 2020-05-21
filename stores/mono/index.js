/*
 * 角色
 * @Author: czy0729
 * @Date: 2019-02-27 07:47:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-21 20:24:47
 */
import { observable } from 'mobx'
import { getTimestamp } from '@utils'
import { fetchHTML } from '@utils/fetch'
import store from '@utils/store'
import { LIST_EMPTY } from '@constants'
import { HTML_SUBJECT_CHARACTERS, HTML_SUBJECT_PERSONS } from '@constants/html'
import { NAMESPACE } from './init'
import { cheerioCharacters, cheerioPersons } from './common'

class Mono extends store {
  state = observable({
    /**
     * 更多角色
     * @param {*} subjectId
     */
    characters: {
      0: LIST_EMPTY // <INIT_CHARACTERS_ITEM>
    },

    /**
     * 更多制作人员
     * @param {*} subjectId
     */
    persons: {
      0: LIST_EMPTY // <INIT_PERSONS_ITEM>
    }
  })

  init = () => this.readStorage(['characters', 'persons'], NAMESPACE)

  // -------------------- fetch --------------------
  /**
   * 更多角色
   */
  fetchCharacters = async ({ subjectId } = {}) => {
    const key = 'characters'
    const html = await fetchHTML({
      url: HTML_SUBJECT_CHARACTERS(subjectId)
    })
    const list = cheerioCharacters(html)
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
    this.setStorage(key, undefined, NAMESPACE)

    return this[key](subjectId)
  }

  /**
   * 更多制作人员
   */
  fetchPersons = async ({ subjectId } = {}) => {
    const key = 'persons'
    const html = await fetchHTML({
      url: HTML_SUBJECT_PERSONS(subjectId)
    })
    const list = cheerioPersons(html)
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
    this.setStorage(key, undefined, NAMESPACE)

    return this[key](subjectId)
  }
}

const Store = new Mono()
Store.setup()

export default Store
