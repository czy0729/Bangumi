/*
 * @Author: czy0729
 * @Date: 2023-04-25 14:44:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-30 04:59:58
 */
import { computed } from 'mobx'
import { StoreConstructor } from '@types'
import State from './state'
import { STATE } from './init'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  @computed get tapXY() {
    return this.state.tapXY
  }

  @computed get popableSubject() {
    return this.state.popableSubject
  }

  @computed get likesGrid() {
    return this.state.likesGrid
  }

  @computed get likesUsers() {
    return this.state.likesUsers
  }

  @computed get manageModal() {
    return this.state.manageModal
  }

  @computed get flip() {
    return this.state.flip
  }
}
