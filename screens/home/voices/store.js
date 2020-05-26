/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-26 14:31:59
 *
 * @Params: monoId person/{Int}
 * @Params: name   {String}
 */
import { observable, computed } from 'mobx'
import { subjectStore } from '@stores'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { HTML_MONO_VOICES } from '@constants/html'

const namespace = 'ScreenVoices'
const excludeState = {
  position: '' // 默认全部
}

export default class ScreenVoices extends store {
  state = observable({
    ...excludeState,
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state,
      ...excludeState,
      _loaded: true
    })

    return this.fetchMonoVoices(true)
  }

  onHeaderRefresh = () => this.fetchMonoVoices(true)

  // -------------------- get --------------------
  @computed get monoId() {
    const { monoId = '' } = this.params
    return monoId
  }

  @computed get monoVoices() {
    return subjectStore.monoVoices(this.monoId)
  }

  @computed get url() {
    const { position, order } = this.state
    return HTML_MONO_VOICES(this.monoId, position, order)
  }

  // -------------------- fetch --------------------
  fetchMonoVoices = refresh => {
    const { position } = this.state
    return subjectStore.fetchMonoVoices(
      {
        monoId: this.monoId,
        position
      },
      refresh
    )
  }

  // -------------------- page --------------------
  onFilterSelect = async (label, data) => {
    t('角色.职位选择', {
      label: label.split(' ')[0]
    })

    const { value = '' } = data.find(item => item.title === label) || {}
    this.setState({
      position: value
    })

    this.fetchMonoVoices(true)
    this.setStorage(undefined, undefined, namespace)
  }
}
