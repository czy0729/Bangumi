/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:40:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-17 22:18:21
 */
import { computed } from 'mobx'
import State from './state'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

export default class Computed extends State {
  /** 本地化 */
  save = () => {
    return this.saveStorage(this.namespace, EXCLUDE_STATE)
  }

  /** 关系节点 ID */
  @computed get nodeId() {
    return Number(this.params.nodeId) || 0
  }

  /** 条目唯一 ID */
  @computed get subjectId() {
    return Number(this.params._subjectId) || 0
  }

  /** 本地化数据键名 */
  @computed get namespace() {
    return [NAMESPACE, this.nodeId || this.subjectId, this.params.extra ? 'extra' : '']
      .filter(Boolean)
      .join('|')
  }

  /** 关联数据 */
  @computed get map() {
    const { extra, type } = this.params
    const { map } = this.state
    if (!extra) return map

    const { node, relate } = map

    // 1. 先根据类型和平台过滤节点
    const finalNode = node.filter(item => Number(item.type) === Number(type))

    // 2. 过滤关联（基于原始关联，但两端节点都在过滤后节点中）
    const validNodeIds = new Set(finalNode.map(n => n.id))
    const filteredRelate = relate.filter(r => validNodeIds.has(r.src) && validNodeIds.has(r.dst))

    return {
      ...map,
      node: finalNode,
      relate: filteredRelate
    }
  }

  /** 过滤后的数据 */
  @computed get filterMap() {
    const { hideTypes, hidePlatforms, hideRelates } = this.state

    // 没有任何过滤
    if (!hideTypes.length && !hidePlatforms.length && !hideRelates.length) {
      return this.map
    }

    const { node, relate } = this.map

    // 1. 先根据类型和平台过滤节点
    const filteredNodeByType = node.filter(
      item => !hideTypes.includes(item.type) && !hidePlatforms.includes(item.platform)
    )

    // 2. 过滤关联（基于原始关联，但两端节点都在过滤后节点中）
    const validNodeIds = new Set(filteredNodeByType.map(n => n.id))
    let filteredRelate = relate.filter(r => validNodeIds.has(r.src) && validNodeIds.has(r.dst))

    // 3. 如果有 hideRelates，进一步过滤关联
    if (hideRelates.length) {
      filteredRelate = filteredRelate.filter(r => !hideRelates.includes(r.relate))
    }

    // 4. 如果有 hideRelates，移除孤立节点
    let finalNode = filteredNodeByType
    if (hideRelates.length) {
      const connectedIds = new Set<string | number>()
      filteredRelate.forEach(r => {
        connectedIds.add(r.src)
        connectedIds.add(r.dst)
      })

      finalNode = filteredNodeByType.filter(item => connectedIds.has(item.id))

      // 再次确保关联的两端节点都存在
      filteredRelate = filteredRelate.filter(
        r => finalNode.some(n => n.id === r.src) && finalNode.some(n => n.id === r.dst)
      )
    } else {
      finalNode = filteredNodeByType
    }

    return {
      ...this.map,
      node: finalNode,
      relate: filteredRelate
    }
  }

  /** 用于强制组件刷新 */
  @computed get key() {
    const { hideTypes, hidePlatforms, hideRelates } = this.state

    return JSON.stringify({
      ids: this.filterMap.node.map(item => item.id),
      hideTypes,
      hidePlatforms,
      hideRelates
    })
  }

  @computed get hm() {
    return [`subject-link/${this.subjectId}`, 'SubjectLink'] as const
  }
}
