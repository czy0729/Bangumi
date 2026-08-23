/*
 * Store 主实现 —— 浅响应入库, 接口数据不再深度代理
 * 与 LegacyStore 的差异仅在本文件的成员; 其余成员见 base.ts
 * @Author: czy0729
 * @Date: 2026-08-23 15:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-23 17:50:42
 */
import { isObservable, observable, runInAction, toJS } from 'mobx'
import fetch from '../fetch'
import { fetchSubjectV0 } from '../fetch.v0'
import BaseStore from './base'
import { buildMergeData, ingestRef, normalizeFetchConfig, plainClone } from './utils'

import type { Loaded } from '@types'
import type { FetchAPIArgs } from '../fetch/types'
import type { FetchOtherConfig, FetchStateKey, StoreState, WritableState } from './types'

/** 状态公共继承(主实现) */
export default class Store<T extends StoreState> extends BaseStore<T> {
  /**
   * 请求并将响应并入状态, 成功后写入 _loaded 时间戳; 失败由底层按 retryCb 自动重试
   * - 数据以 observable.ref 浅响应挂载, 隐含约定入库数据不可变(1500 条载荷实测入库 ~10000x 提速)
   * - 已有缓存且本次请求出错时保留旧数据
   * - 单键入库为整体替换(不做逐键合并), 需增量请先取旧值拼接
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
     * 未定型网络边界: 上游 fetchAPI 声明为 Promise<any>, 本方法返回值的宽松形态
     * (消费端直接取 result.data / result.list 等) 依赖该 any 传导。
     * 若在此定型, 返回类型随之收窄, 将破坏全部消费端 —— 根治需先为 utils/fetch
     * 建立响应泛型并迁移消费端, 届时删除下方 disable 即可。
     */
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return */
    const { list, storage, namespace } = otherConfig
    const mergeConfig = normalizeFetchConfig(fetchConfig)
    mergeConfig.retryCb = () => this.fetch(fetchConfig, stateKey, otherConfig)

    let data = await fetch(mergeConfig)

    // 20220216 以下旧 API 不再响应 NSFW 条目, 暂时使用请求网页代替
    if (mergeConfig.info === '条目信息' && !data?.id) {
      data = await fetchSubjectV0(fetchConfig as { url: string })
    }

    const mergeData = buildMergeData(data, list)

    const error: string = data?.error || ''
    const state = this.state as WritableState
    if (Array.isArray(stateKey)) {
      // 若之前已缓存过数据, 若出现 token 过期等情况, 不把缓存覆盖以尽可能显示既有数据
      if (
        error &&
        (this.state?.[stateKey[0]] as Record<string | number, { _loaded?: Loaded }> | undefined)?.[
          stateKey[1]
        ]?._loaded
      )
        return mergeData

      // 浅响应入库: 父容器缺失/非对象/非观测时, 以浅可观测容器重建并回填已有兄弟键,
      // 保证后续同父键写入可被追踪; 子值仍不代理, 维持浅响应语义
      // (重建与挂载同处一个 action, 避免根状态键变更在 strict-mode 下刷警告)
      const outerKey = String(stateKey[0])
      const innerKey = String(stateKey[1])
      runInAction(() => {
        let parent = state[outerKey]
        if (!parent || typeof parent !== 'object' || !isObservable(parent)) {
          parent = observable(Object.assign({}, parent) as Record<string, unknown>, undefined, {
            deep: false
          }) as WritableState
          ingestRef(state, outerKey, parent)
        }

        ingestRef(parent as WritableState, innerKey, mergeData)
      })
    } else if (stateKey) {
      // 缓存保护逻辑同元组分支
      if (error && (this.state?.[stateKey] as { _loaded?: Loaded } | undefined)?._loaded)
        return mergeData

      const key = String(stateKey)
      runInAction(() => {
        ingestRef(state, key, mergeData || state[key])
      })
    }

    if (storage) {
      const key = Array.isArray(stateKey) ? stateKey[0] : stateKey

      this.setStorage(key as string, undefined, namespace)
    }

    return mergeData
  }

  /**
   * 导出状态的独立副本(深拷贝), 修改返回值不影响状态
   * @param key 状态键
   */
  toJS = <State extends object>(key: string): State => {
    const value = (this.state as WritableState)[key] || this.state

    // 观测数据由 mobx 深拷贝; 浅响应入库的是原始对象, mobx toJS 会恒等返回活引用,
    // 需手动克隆保证独立副本
    if (!isObservable(value)) {
      return plainClone(value) as State
    }

    // 可观测树中可能混有 ref 入库的原始成员(toJS 对其恒等透传),
    // 统一二次克隆保证整棵树均为独立副本; 代价为大状态导出双遍历, 属可接受取舍
    return plainClone(toJS(value)) as State
  }
}
