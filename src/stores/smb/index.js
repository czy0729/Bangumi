/*
 * @Author: czy0729
 * @Date: 2022-04-07 01:08:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-07 02:41:43
 */
import { observable, computed } from 'mobx'
import store from '@utils/store'
import { NAMESPACE } from './init'

class SMB extends store {
  state = observable({
    data: {
      data: []
    }
  })

  init = () => this.readStorage(['data'], NAMESPACE)

  subject(subjectId) {
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

const Store = new SMB()
Store.setup()

export default Store
