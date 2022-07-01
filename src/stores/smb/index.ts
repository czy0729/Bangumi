/*
 * @Author: czy0729
 * @Date: 2022-04-07 01:08:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-01 22:03:48
 */
import { observable, computed } from 'mobx'
import store from '@utils/store'
import { StoreConstructor, SubjectId } from '@types'
import { NAMESPACE } from './init'

const state = {
  data: {
    data: []
  }
}

class SMBStore extends store implements StoreConstructor<typeof state> {
  state = observable(state)

  init = () => this.readStorage(['data'], NAMESPACE)

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
    this.setStorage(key, undefined, NAMESPACE)
  }
}

export default new SMBStore()
