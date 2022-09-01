/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 11:05:31
 */
import { observable, computed } from 'mobx'
import { subjectStore } from '@stores'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { HTML_MONO_VOICES } from '@constants'
import { NAMESPACE, EXCLUDE_STATE } from './ds'
import { Params } from './types'

export default class ScreenVoices extends store {
  params: Params

  state = observable({
    ...EXCLUDE_STATE,
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchMonoVoices()
  }

  onHeaderRefresh = () => {
    return this.fetchMonoVoices()
  }

  // -------------------- get --------------------
  @computed get monoId() {
    const { monoId } = this.params
    return monoId
  }

  /** 人物饰演的角色 */
  @computed get monoVoices() {
    return subjectStore.monoVoices(this.monoId)
  }

  @computed get url() {
    const { position } = this.state
    return HTML_MONO_VOICES(this.monoId, position)
  }

  // -------------------- fetch --------------------
  /** 人物角色 */
  fetchMonoVoices = () => {
    const { position } = this.state
    return subjectStore.fetchMonoVoices({
      monoId: this.monoId,
      position
    })
  }

  // -------------------- page --------------------
  /** 职位选择 */
  onFilterSelect = async (label: string, data: any[]) => {
    t('角色.职位选择', {
      label: label.split(' ')[0]
    })

    const { value = '' } = data.find(item => item.title === label) || {}
    this.setState({
      position: value
    })

    this.fetchMonoVoices()
    this.setStorage(NAMESPACE)
  }
}
