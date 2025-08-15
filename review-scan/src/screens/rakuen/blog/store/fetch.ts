/*
 * @Author: czy0729
 * @Date: 2024-06-21 05:13:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-21 05:13:36
 */
import { rakuenStore } from '@stores'
import { getTimestamp, omit } from '@utils'
import { get, update } from '@utils/kv'
import Computed from './computed'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED = []

export default class Fetch extends Computed {
  /** 获取日志内容和留言 */
  fetchBlog = async () => {
    this.fetchThirdParty()

    const { blog } = await rakuenStore.fetchBlog({
      blogId: this.blogId
    })

    if (
      blog.title &&
      // 只有明确知道云快照没有这个 key 的数据, 才主动更新云快照数据
      this.thirdPartyKey in this.state.ota
    ) {
      const ts = this.ota?.ts || 0
      const _loaded = getTimestamp()
      if (_loaded - ts >= 60 * 60 * 24 * 7) this.updateThirdParty()
    }

    return blog
  }

  /** 获取云快照 */
  fetchThirdParty = async () => {
    if (!this.ota && !this.blog._loaded) {
      const data = await get(this.thirdPartyKey)
      if (!data) {
        // 就算没有数据也插入 key, 用于判断是否需要更新云数据
        this.setState({
          ota: {
            [this.thirdPartyKey]: {
              _loaded: 0
            }
          }
        })
        return
      }

      this.setState({
        ota: {
          [this.thirdPartyKey]: {
            ...data,
            _loaded: getTimestamp()
          }
        }
      })
    }
  }

  /** 上传预数据 */
  updateThirdParty = async () => {
    if (THIRD_PARTY_UPDATED.includes(this.thirdPartyKey)) return

    setTimeout(() => {
      update(this.thirdPartyKey, {
        ...omit(this.blog, ['formhash'])
      })
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }
}
