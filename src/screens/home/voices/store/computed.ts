/*
 * @Author: czy0729
 * @Date: 2024-09-16 20:49:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 20:50:43
 */
import { computed } from 'mobx'
import { subjectStore } from '@stores'
import { MonoVoices } from '@stores/subject/types'
import { HTML_MONO_VOICES, LIST_EMPTY } from '@constants'
import State from './state'

export default class Computed extends State {
  @computed get monoId() {
    return this.params.monoId
  }

  /** 云快照 */
  @computed get ota() {
    return this.state.ota[this.thirdPartyKey]
  }

  @computed get thirdPartyKey() {
    const query = [this.monoId, this.state.position].join('_')
    return `voices_${query}`.replace('/', '_')
  }

  /** 人物饰演的角色 */
  @computed get monoVoices(): MonoVoices {
    const monoVoices = subjectStore.monoVoices(this.monoId)
    if (!monoVoices._loaded) {
      if (!this.ota) return LIST_EMPTY

      return {
        ...this.ota,
        pagination: {
          page: 1,
          pageTotal: 10
        }
      }
    }

    return monoVoices
  }

  @computed get url() {
    return HTML_MONO_VOICES(this.monoId, this.state.position)
  }

  @computed get hm() {
    return [this.url, 'Voices']
  }
}
