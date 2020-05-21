/*
 * 角色
 * @Author: czy0729
 * @Date: 2019-02-27 07:47:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-21 16:35:45
 */
import { observable } from 'mobx'
import {} from '@constants/api'
import {} from '@constants/cdn'
import { getTimestamp } from '@utils'
import { fetchHTML } from '@utils/fetch'
import {} from '@utils/html'
import store from '@utils/store'
import { LIST_EMPTY } from '@constants'
import { HTML_SUBJECT_CHARACTERS } from '@constants/html'
import { NAMESPACE } from './init'
import { cheerioCharacters } from './common'

class Mono extends store {
  state = observable({
    /**
     * 更多角色
     * @param {*} subjectId
     */
    characters: {
      0: LIST_EMPTY // <INIT_CHARACTERS_ITEM>
    }
  })

  init = () => this.readStorage(['characters'], NAMESPACE)

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

    log(this[key](subjectId))
    return this[key](subjectId)
  }
}

const Store = new Mono()
Store.setup()

export default Store
