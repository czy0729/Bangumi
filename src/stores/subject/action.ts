/*
 * @Author: czy0729
 * @Date: 2023-04-16 13:38:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-22 06:33:46
 */
import { getStorageValues, getTimestamp } from '@utils'
import { getBucketId } from '@utils/bucket'
import { get, update } from '@utils/kv'
import { getAllKeys } from '@utils/storage/utils'
import { decrypt, encrypt } from '@utils/thirdParty/crypto'
import { APP_ID } from '@constants'
import UserStore from '../user'
import Fetch from './fetch'
import { NAMESPACE } from './init'
import { getSubjectSnapshot } from './utils'

import type { ResultData } from '@utils/kv/type'
import type { Actions, Origin, SubjectId, SubjectType, UserId } from '@types'
import type { LayoutKey, SubjectLayout, SubjectSnapshot } from './types'

export default class Action extends Fetch {
  /** 获取条目信息快照, 尽可能在其他数据中组装条目信息 */
  getSubjectSnapshot = async (subjectId: SubjectId): Promise<SubjectSnapshot | undefined> => {
    let subjectSnapShot: SubjectSnapshot
    let flag = false
    if (!flag) {
      await this.initSubjectV2([subjectId])

      const subjectV2 = this.subjectV2(subjectId)
      if (subjectV2._loaded && subjectV2.jp) {
        flag = true
        subjectSnapShot = getSubjectSnapshot(
          subjectV2.date,
          subjectV2.image,
          subjectV2.jp,
          subjectV2.cn,
          subjectV2.rating?.score,
          subjectV2.rating?.total,
          subjectV2.rank
        )
      }
    }

    if (!flag) {
      const last = getBucketId(subjectId)
      const key = `subject${last}` as const
      await this.init(key)

      const subject = this.subject(subjectId)
      if (subject._loaded && subject.name) {
        flag = true
        subjectSnapShot = getSubjectSnapshot(
          subject.air_date,
          subject.images?.common,
          subject.name,
          subject.name_cn,
          subject.rating?.score,
          subject.rating?.total,
          subject.rank
        )
      }
    }

    if (!flag) {
      await this.init('subjectFromOSS')

      const subjectFromOSS = this.subjectFromOSS(subjectId)
      if (subjectFromOSS._loaded && subjectFromOSS.name) {
        flag = true
        subjectSnapShot = getSubjectSnapshot(
          subjectFromOSS.air_date,
          subjectFromOSS.images?.common,
          subjectFromOSS.name,
          subjectFromOSS.name_cn,
          subjectFromOSS.rating?.score,
          subjectFromOSS.rating?.total,
          subjectFromOSS.rank
        )
      }
    }

    return subjectSnapShot
  }

  /** 更新源头数据 */
  updateOrigin = (data: Origin) => {
    const key = 'origin'
    this.setState({
      [key]: data
    })
    this.save(key)
  }

  /** 上传源头数据到云端 */
  uploadOrigin = () => {
    const { id } = UserStore.userInfo
    const { origin } = this.state
    return update(
      `origin_${id}`,
      {
        content: encrypt(JSON.stringify(origin), APP_ID)
      },
      true,
      true
    )
  }

  /** 恢复源头数据 */
  downloadOrigin = async () => {
    const { id } = UserStore.userInfo
    let content: string

    try {
      const data = await get<ResultData<{ content?: string }>>(`origin_${id}`)
      if (typeof data?.content === 'string') {
        content = data.content
      }
    } catch (error) {
      return false
    }
    if (!content) return false

    try {
      const data = JSON.parse(decrypt(content.toString(), APP_ID)) as Origin
      if (typeof data?.base === 'object' && typeof data?.custom === 'object') {
        const key = 'origin'
        this.setState({
          [key]: {
            base: data.base,
            custom: data.custom
          }
        })
        this.save(key)
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }

  /** 更新跳转数据 */
  updateActions = (data: Actions) => {
    const key = 'actions'
    this.setState({
      [key]: data
    })
    this.save(key)
  }

  /** 追踪TA的评论次数追踪 +1 */
  trackComment = async (userId: UserId, type: SubjectType) => {
    const STATE_KEY = 'commentTrack'
    await this.init(STATE_KEY)

    const ITEM_ARGS = [userId, type] as const
    const ITEM_KEY = ITEM_ARGS.join('|')
    const count = this[STATE_KEY](...ITEM_ARGS) + 1
    this.setState({
      [STATE_KEY]: {
        [ITEM_KEY]: count
      }
    })
    this.save(STATE_KEY)

    this.log('trackComment', {
      userId,
      type,
      count
    })
  }

  /**
   * 写入条目页单板块布局覆盖 (仅当前条目, 与全局默认互不影响)
   *  - value: true 展开 / false 折叠 / -1 隐藏
   *  - 以过滤后的有效覆盖为基: resetLayout 只推进时间戳, 桶内残留的失效覆盖不可读写
   */
  setLayoutBlock = async (subjectId: SubjectId, key: LayoutKey, value: boolean | -1) => {
    const STATE_KEY = `layout${getBucketId(subjectId)}` as const

    // save 落盘整个桶, 未读回的桶内存为空, 直接写会抹掉同桶其它条目
    await this.init(STATE_KEY)

    this.setState({
      [STATE_KEY]: {
        [subjectId]: {
          blocks: {
            ...this.layoutBlocks(subjectId),
            [key]: value
          },
          _loaded: getTimestamp()
        }
      }
    })
    this.save(STATE_KEY)
  }

  /** 重置单个条目的板块布局覆盖 (条目页「重置布局」, 恢复跟随全局默认) */
  resetLayoutItem = async (subjectId: SubjectId) => {
    const STATE_KEY = `layout${getBucketId(subjectId)}` as const

    await this.init(STATE_KEY)

    this.setState({
      [STATE_KEY]: {
        [subjectId]: {
          blocks: {},
          _loaded: getTimestamp()
        }
      }
    })
    this.save(STATE_KEY)
  }

  /** 重置所有条目的板块布局覆盖 (设置页「重置所有条目」联动) */
  resetLayout = () => {
    // 只推进重置时间, 旧覆盖由 layoutBlocks 读取时按 _loaded 过滤 (增量合并不吃空对象, 且未加载桶在 storage 里)
    this.setState({ layoutResetAt: getTimestamp() })
    this.save('layoutResetAt')
  }

  /**
   * 本地全部条目布局覆盖 (storage 按桶存, 需要汇总; 再叠上尚未落盘的内存写入)
   *  - 早于 layoutResetAt 的条目按墓碑过滤
   */
  private getLocalLayout = async (): Promise<{
    ok: boolean
    resetAt: number
    items: Record<SubjectId, SubjectLayout>
  }> => {
    const items: Record<SubjectId, SubjectLayout> = {}
    const RESET_KEY = `${NAMESPACE}|layoutResetAt|state`
    let resetAt = Number(this.state.layoutResetAt) || 0
    let ok = true

    try {
      const keys = (await getAllKeys()).filter(key => key.startsWith(`${NAMESPACE}|layout`))
      if (keys.length) {
        const values = await getStorageValues(keys)
        keys.forEach((key, index) => {
          const value = values[index]
          if (key !== RESET_KEY || !value) return
          resetAt = Math.max(resetAt, Number(JSON.parse(value)) || 0)
        })

        keys.forEach((key, index) => {
          const value = values[index]
          if (!value || key === RESET_KEY) return

          const bucket = JSON.parse(value) as Record<SubjectId, SubjectLayout>
          if (!bucket) return

          Object.keys(bucket).forEach(subjectId => {
            const item = bucket[subjectId]
            if (!item || Number(item._loaded) < resetAt) return
            items[subjectId] = item
          })
        })
      }
    } catch {
      ok = false
    }

    Object.keys(this.state).forEach(key => {
      if (!/^layout\d+$/.test(key)) return

      const bucket = this.state[key] as Record<SubjectId, SubjectLayout>
      Object.keys(bucket).forEach(subjectId => {
        const item = bucket[subjectId]
        if (!item || Number(item._loaded) < resetAt) return

        const current = items[subjectId]
        if (!current || Number(item._loaded) >= Number(current._loaded)) items[subjectId] = item
      })
    })

    return {
      ok,
      resetAt,
      items
    }
  }

  /** 各板块被多少个条目单独设置过 (设置页「页面布局」展示) */
  fetchLayoutStats = async () => {
    const stats: Partial<Record<LayoutKey, number>> = {}
    const { ok, items } = await this.getLocalLayout()
    if (!ok) return stats

    Object.keys(items).forEach(subjectId => {
      Object.keys(items[subjectId].blocks || {}).forEach(blockKey => {
        const layoutKey = blockKey as LayoutKey
        stats[layoutKey] = (stats[layoutKey] || 0) + 1
      })
    })
    return stats
  }

  /** 上传全部条目的布局覆盖到云端 */
  uploadLayoutSetting = async () => {
    const { id } = UserStore.userInfo
    if (!id) return false

    const { ok, resetAt, items } = await this.getLocalLayout()
    if (!ok) return false

    const result = await update(`subject_layout_${id}`, {
      resetAt,
      items
    })
    return !!result
  }

  /** 恢复云端的条目布局覆盖 (同一条目按 _loaded 取较新) */
  downloadLayoutSetting = async () => {
    const { id } = UserStore.userInfo
    if (!id) return false

    let data: { resetAt?: number; items?: Record<SubjectId, SubjectLayout> }
    try {
      data = await get(`subject_layout_${id}`)
    } catch {
      return false
    }
    if (!data || typeof data !== 'object') return false

    const local = await this.getLocalLayout()
    if (!local.ok) return false

    const resetAt = Math.max(local.resetAt, Number(data.resetAt) || 0)

    // 重置时间先落地: 云端早于它的条目读取时会被过滤
    this.setState({ layoutResetAt: resetAt })
    this.save('layoutResetAt')

    // 本地有效覆盖按桶分组: 写桶时以它为基, 避免 save 整桶覆盖掉同桶其它条目
    const localBuckets: Record<string, Record<SubjectId, SubjectLayout>> = {}
    Object.keys(local.items).forEach(subjectId => {
      const STATE_KEY = `layout${getBucketId(subjectId)}`
      localBuckets[STATE_KEY] = localBuckets[STATE_KEY] || {}
      localBuckets[STATE_KEY][subjectId] = local.items[subjectId]
    })

    const buckets: Record<string, Record<SubjectId, SubjectLayout>> = {}
    const cloudItems = data.items || {}
    Object.keys(cloudItems).forEach(subjectId => {
      const cloud = cloudItems[subjectId]
      if (!cloud || !cloud.blocks) return
      if (Number(cloud._loaded) < resetAt) return

      const current = local.items[subjectId]
      if (current && Number(current._loaded) >= Number(cloud._loaded)) return

      const blocks: SubjectLayout['blocks'] = {}
      Object.keys(cloud.blocks).forEach(blockKey => {
        const value = (cloud.blocks as Record<string, boolean | -1>)[blockKey]
        if (value !== true && value !== false && value !== -1) return
        blocks[blockKey as LayoutKey] = value
      })
      if (!Object.keys(blocks).length) return

      const STATE_KEY = `layout${getBucketId(subjectId)}`
      buckets[STATE_KEY] = buckets[STATE_KEY] || {}
      buckets[STATE_KEY][subjectId] = {
        blocks,
        _loaded: Number(cloud._loaded) || getTimestamp()
      }
    })

    Object.keys(buckets).forEach(STATE_KEY => {
      this.setState({
        [STATE_KEY]: {
          ...localBuckets[STATE_KEY],
          ...buckets[STATE_KEY]
        }
      })
      this.save(STATE_KEY as `layout${number}`)
    })

    return true
  }
}
