/*
 * @Author: czy0729
 * @Date: 2022-04-07 01:08:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-27 16:53:31
 */
import { observable, computed } from 'mobx'
import store from '@utils/store'
import { DEV } from '@constants'
import { StoreConstructor, SubjectId } from '@types'
import { LOG_INIT } from '../ds'
import { NAMESPACE } from './init'

const state = {
  data: {
    data: []
  }
}

class SMBStore extends store implements StoreConstructor<typeof state> {
  state = observable(state)

  private _loaded = {
    data: false
  }

  init = (key: keyof typeof this._loaded) => {
    if (!key || this._loaded[key]) return true

    if (DEV && LOG_INIT) console.info('SMBStore /', key)

    this._loaded[key] = true
    return this.readStorage([key], NAMESPACE)
  }

  save = (key: keyof typeof this._loaded) => {
    return this.setStorage(key, undefined, NAMESPACE)
  }

  // -------------------- get --------------------
  @computed get data() {
    return this.state.data.data
  }

  subject(subjectId: SubjectId) {
    return computed(() => {
      try {
        let find
        let smb
        this.data.forEach(item => {
          if (find) return
          find = item.list.find(i => i.ids.includes(Number(subjectId)))
          if (find) smb = item.smb
        })

        if (!find) return null

        return {
          smb,
          folder: find
        }
      } catch (error) {
        return null
      }
    }).get()
  }

  updateData = data => {
    const key = 'data'
    this.setState({
      [key]: {
        data
      }
    })
    this.save(key)
  }
}

export default new SMBStore()
