/*
 * @Author: czy0729
 * @Date: 2023-04-21 18:32:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-26 20:11:18
 */
import { monoStore, subjectStore, systemStore, tinygrailStore } from '@stores'
import { getTimestamp, omit } from '@utils'
import { get, update } from '@utils/kv'
import Computed from './computed'

export default class Fetch extends Computed {
  /** 人物信息和吐槽箱  */
  fetchMono = async () => {
    const result = await subjectStore.fetchMono({
      monoId: this.monoId
    })
    this.fetchPicTotal()
    return result
  }

  /** 角色信息 */
  fetchChara = async () => {
    if (!this.monoId.includes('character/')) return false

    const data = await tinygrailStore.fetchCharacters([this.id])
    this.setState({
      checkTinygrail: true
    })

    return data
  }

  /** 私有 CDN 的条目信息 */
  fetchMonoFormCDN = async () => {
    const { setting } = systemStore
    const { _loaded } = this.mono
    if (!setting.cdn || _loaded) return true

    return subjectStore.fetchMonoFormCDN(this.monoId)
  }

  /** 装载云端人物缓存数据 */
  fetchMonoFromOSS = async () => {
    if (this.mono._loaded) return

    try {
      const data = await get(`mono_${this.monoId.replace('/', '_')}`)

      // 云端没有数据存在, 本地计算后上传
      if (!data) {
        this.updateMonoThirdParty()
        return
      }

      const { ts, mono, comments } = data
      const _loaded = getTimestamp()
      if (typeof mono === 'object' && typeof comments === 'object') {
        this.setState({
          mono: {
            ...mono,
            _loaded: getTimestamp()
          },
          comments: {
            ...comments,
            _loaded: getTimestamp()
          }
        })
      }

      if (_loaded - ts >= 60 * 60 * 7) this.updateMonoThirdParty()
    } catch (error) {}
  }

  fetchPicTotal = () => {
    if (!this.monoId.includes('character')) return false

    return monoStore.fetchPicTotal(this.cn)
  }

  /** 更新人物缓存数据 */
  updateMonoThirdParty = () => {
    setTimeout(() => {
      const { _loaded } = this.mono

      // formhash 是登录并且可操作条目的用户的必有值
      if (!_loaded) return

      update(`mono_${this.monoId.replace('/', '_')}`, {
        mono: omit(this.mono, ['collectUrl', 'eraseCollectUrl', '_loaded']),
        comments: {
          list: this.monoComments.list
            .filter(item => !!item.userId)
            .filter((_item, index) => index < 8)
            .map(item => ({
              ...omit(item, ['replySub']),
              sub: item.sub
                .filter(i => !!i.userId)
                .filter((_i, idx) => idx < 8)
                .map(i => omit(i, ['replySub']))
            })),
          pagination: this.monoComments.pagination
        }
      })
    }, 10000)
  }
}
