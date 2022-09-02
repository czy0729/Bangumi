/*
 * @Author: czy0729
 * @Date: 2020-05-02 21:04:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-02 14:26:28
 */
import { observable, computed } from 'mobx'
import { discoveryStore, collectionStore } from '@stores'
import store from '@utils/store'
import { HTML_CHANNEL, MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectType, SubjectTypeCn } from '@types'
import { Params } from './types'

export default class ScreenChannel extends store {
  params: Params

  state = observable({
    type: '' as SubjectType
  })

  init = () => {
    this.setState({
      type: this.type
    })
    this.fetchChannel()
  }

  // -------------------- get --------------------
  @computed get type() {
    const { type } = this.state
    return type || this.params.type
  }

  @computed get typeCn() {
    return MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(this.type)
  }

  /** 频道聚合 */
  @computed get channel() {
    return discoveryStore.channel(this.type)
  }

  @computed get url() {
    return HTML_CHANNEL(this.type)
  }

  @computed get userCollectionsMap() {
    return collectionStore.userCollectionsMap
  }

  // -------------------- fetch --------------------
  /** 频道聚合 */
  fetchChannel = () => {
    return discoveryStore.fetchChannel({
      type: this.type
    })
  }

  // -------------------- page --------------------
  toggleType = (type: SubjectType) => {
    this.setState({
      type
    })
    this.fetchChannel()
  }
}
