/*
 * @Author: czy0729
 * @Date: 2022-04-07 01:08:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 11:53:46
 */
import { observable, computed } from 'mobx'
import store from '@utils/store'
import { DEV } from '@constants'
import { StoreConstructor, SubjectId } from '@types'
import { LOG_INIT } from '../ds'
import { LOADED, NAMESPACE, STATE } from './init'

type CacheKey = keyof typeof LOADED

class SMBStore extends store<typeof STATE> implements StoreConstructor<typeof STATE> {
  state = observable(STATE)

  private _loaded = LOADED

  init = (key: CacheKey) => {
    if (!key || this._loaded[key]) return true

    if (DEV && LOG_INIT) console.info('SMBStore /', key)

    this._loaded[key] = true
    return this.readStorage([key], NAMESPACE)
  }

  save = (key: CacheKey) => {
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

  replaceData = data => {
    const key = 'data'
    this.clearState(key, {
      data
    })
    this.save(key)
  }
}

const smbStore = new SMBStore()

export default smbStore
