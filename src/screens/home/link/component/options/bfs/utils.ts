/*
 * @Author: czy0729
 * @Date: 2025-12-17 00:53:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-17 02:19:30
 */
import type { NodeItem, RelateMap } from '../../../types'

/**
 * 查找两个节点之间的最短关联路径（返回完整节点数据）
 * @param startId 起始节点ID
 * @param endId 目标节点ID
 * @param nodes 所有节点数据数组
 * @param relate 关联数据数组
 * @param maxDepth 最大搜索深度（默认10）
 * @returns 路径信息，如果找不到则返回null
 */
export function findRelationPath(
  startId: string | number,
  endId: string | number,
  nodes: NodeItem[],
  relate: RelateMap['relate'],
  maxDepth: number = 10
): {
  nodes: NodeItem[]
  relates: (string | number)[]
  distance: number
  pathDescription: string
} | null {
  // 创建节点ID到节点数据的映射，便于快速查找
  const nodeMap = new Map<string | number, NodeItem>()
  nodes.forEach(node => {
    nodeMap.set(node.id, node)
  })

  // 检查起点和终点是否存在
  if (!nodeMap.has(startId) || !nodeMap.has(endId)) {
    return null
  }

  // 如果起点和终点相同
  if (startId === endId) {
    const node = nodeMap.get(startId)!
    return {
      nodes: [node],
      relates: [],
      distance: 0,
      pathDescription: `${node.nameCN || node.name}（起点）`
    }
  }

  // 构建邻接表（双向）
  const adjacencyList = new Map<
    string | number,
    Array<{ neighbor: string | number; relate: string | number }>
  >()

  relate.forEach(r => {
    // 只添加两个节点都存在的关联
    if (nodeMap.has(r.src) && nodeMap.has(r.dst)) {
      // 添加 src -> dst
      if (!adjacencyList.has(r.src)) {
        adjacencyList.set(r.src, [])
      }
      adjacencyList.get(r.src)!.push({
        neighbor: r.dst,
        relate: r.relate
      })

      // 添加 dst -> src（双向搜索）
      if (!adjacencyList.has(r.dst)) {
        adjacencyList.set(r.dst, [])
      }
      adjacencyList.get(r.dst)!.push({
        neighbor: r.src,
        relate: r.relate
      })
    }
  })

  // BFS搜索
  const queue: Array<{
    node: string | number
    path: (string | number)[]
    relates: (string | number)[]
    distance: number
  }> = []

  const visited = new Set<string | number>()

  // 起始节点
  queue.push({
    node: startId,
    path: [startId],
    relates: [],
    distance: 0
  })
  visited.add(startId)

  while (queue.length > 0) {
    const current = queue.shift()!

    // 超过最大深度，跳过
    if (current.distance >= maxDepth) continue

    // 找到目标节点
    if (current.node === endId) {
      // 将节点ID转换为完整节点数据
      const fullNodes = current.path.map(id => nodeMap.get(id)!)

      // 生成路径描述
      const pathDesc = fullNodes
        .map((node, index) => {
          const nodeName = node.nameCN || node.name
          if (index === 0) return `${nodeName}（起点）`
          if (index === fullNodes.length - 1) return `${nodeName}（终点）`

          const relation = current.relates[index - 1]
          return `${nodeName}（${relation}）`
        })
        .join(' → ')

      return {
        nodes: fullNodes,
        relates: current.relates,
        distance: current.distance,
        pathDescription: pathDesc
      }
    }

    // 遍历邻居节点
    const neighbors = adjacencyList.get(current.node) || []

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.neighbor)) {
        visited.add(neighbor.neighbor)

        queue.push({
          node: neighbor.neighbor,
          path: [...current.path, neighbor.neighbor],
          relates: [...current.relates, neighbor.relate],
          distance: current.distance + 1
        })
      }
    }
  }

  // 没有找到路径
  return null
}
