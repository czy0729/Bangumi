/*
 * @Author: czy0729
 * @Date: 2024-12-31 00:49:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-31 01:10:28
 */
import { computed } from 'mobx'
import { subjectStore, systemStore, tinygrailStore, userStore } from '@stores'
import { Id } from '@types'
import State from './state'

export default class Computed extends State {
  @computed get short() {
    return systemStore.setting.xsbShort
  }

  @computed get monoId() {
    const { monoId = '' } = this.params
    return monoId.replace('character/', '') as Id
  }

  @computed get chara() {
    return tinygrailStore.characters(this.monoId)
  }

  @computed get assets() {
    return tinygrailStore.assets
  }

  @computed get initial() {
    return tinygrailStore.initial(this.chara.id)
  }

  @computed get userInfo() {
    return userStore.userInfo
  }

  @computed get mono() {
    return subjectStore.mono(`character/${this.chara.monoId}`)
  }

  @computed get hm() {
    return [`tinygrail/ico/deal/${this.monoId}`, 'TinygrailICODeal']
  }
}
