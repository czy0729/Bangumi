/*
 * Store V1 遗留实现 —— 仅覆写与主实现存在行为差异的成员
 * 差异: fetch 深度代理入库 / toJS mobx 直通
 * @Author: czy0729
 * @Date: 2026-08-23 15:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-23 17:50:46
 */
import { toJS } from 'mobx'
import fetch from '../fetch'
import { fetchSubjectV0 } from '../fetch.v0'
import BaseStore from './base'
import { buildMergeData, normalizeFetchConfig } from './utils'

import type { DeepPartial, Loaded } from '@types'
import type { FetchAPIArgs } from '../fetch/types'
import type { FetchOtherConfig, FetchStateKey, StoreState, WritableState } from './types'

/** 状态公共继承 (V1 遗留) */
export default class LegacyStore<T extends StoreState> extends BaseStore<T> {
  /**
   * 请求并入 Store(V1 历史行为), 成功后写入 _loaded 时间戳; 失败由底层按 retryCb 自动重试
   * 与主实现的差异: 数据深度代理入库; 条目信息降级沿用历史双判断结构
   * @param fetchConfig 请求配置或 url 字符串
   * @param stateKey 入库位置, ['a', 'b'] 表示 state.a.b
   * @param otherConfig 附加配置: storage 本地化 / list 列表包裹 / namespace 命名空间
   */
  fetch = async (
    fetchConfig: FetchAPIArgs | string,
    stateKey?: FetchStateKey<T>,
    otherConfig: FetchOtherConfig = {}
  ) => {
    /*
     * 未定型网络边界: 说明同 index.ts 的 Store#fetch
     */
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return */
    const { list, storage, namespace } = otherConfig
    const mergeConfig = normalizeFetchConfig(fetchConfig)
    mergeConfig.retryCb = () => this.fetch(fetchConfig, stateKey, otherConfig)

    let data = await fetch(mergeConfig)

    // 20220216 以下旧 API 不再响应 NSFW 条目, 暂时使用请求网页代替
    if (mergeConfig?.info === '条目信息') {
      switch (mergeConfig?.info) {
        case '条目信息':
          if (!data?.id) data = await fetchSubjectV0(fetchConfig as { url: string })
          break

        default:
          break
      }
    }

    const mergeData = buildMergeData(data, list)

    const error: string = data?.error || ''
    if (Array.isArray(stateKey)) {
      // 若之前已缓存过数据, 若出现 token 过期等情况, 不把缓存覆盖以尽可能显示既有数据
      if (
        error &&
        (this.state?.[stateKey[0]] as Record<string | number, { _loaded?: Loaded }> | undefined)?.[
          stateKey[1]
        ]?._loaded
      )
        return mergeData

      this.setState({
        [stateKey[0]]: {
          [stateKey[1]]: mergeData
        }
      } as DeepPartial<T>)
    } else if (stateKey) {
      // 缓存保护逻辑同元组分支
      if (error && (this.state?.[stateKey] as { _loaded?: Loaded } | undefined)?._loaded)
        return mergeData

      this.setState({
        [stateKey]: mergeData || this.state[stateKey]
      } as DeepPartial<T>)
    }

    if (storage) {
      const key = Array.isArray(stateKey) ? stateKey[0] : stateKey

      this.setStorage(key as string, undefined, namespace)
    }

    return mergeData
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return */
  }

  /**
   * 导出状态的独立副本(深拷贝), 修改返回值不影响状态
   * 与主实现的差异: 状态均为观测数据, 直接走 mobx 深拷贝
   * @param key 状态键
   */
  toJS = <State extends object>(key: string): State =>
    toJS((this.state as WritableState)[key] || this.state) as State
}
