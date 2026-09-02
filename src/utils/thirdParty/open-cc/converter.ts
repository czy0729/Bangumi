/*
 * @Author: czy0729
 * @Date: 2026-09-03 05:16:47
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-03 05:16:47
 *
 * 简繁转换引擎, 移植自 nk2028/opencc-js 的 core.js (MIT License, 详见同目录 LICENSE)
 * 仅保留项目所需子集: 序列化字典 ("源串 目标串|源串 目标串") 构建 Trie,
 * 按最长前缀匹配切分转换, 多个字典组按顺序链式套用
 */

/** 转换函数 */
export type Converter = (str: string) => string

interface MatchResult {
  end: number
  value: string
}

interface TrieNode {
  children: Map<number, TrieNode>
  value?: string
}

function createNode(): TrieNode {
  return { children: new Map() }
}

function getCodePointLength(s: string, i: number): number {
  return s.codePointAt(i)! > 0xffff ? 2 : 1
}

function getIdeographicDescriptionArity(cp: number): number {
  if (cp >= 0x2ff0 && cp <= 0x2ff1) return 2
  if (cp >= 0x2ff2 && cp <= 0x2ff3) return 3
  if (cp >= 0x2ff4 && cp <= 0x2fff) return 2
  return 0
}

function getIdeographicDescriptionSequenceEnd(s: string, i: number): number {
  const cp = s.codePointAt(i)!
  const arity = getIdeographicDescriptionArity(cp)
  if (arity === 0) {
    return 0
  }

  let end = i + getCodePointLength(s, i)
  for (let n = 0; n < arity; n += 1) {
    if (end >= s.length) {
      return 0
    }
    const childEnd = getIdeographicDescriptionSequenceEnd(s, end)
    end = childEnd || end + getCodePointLength(s, end)
  }
  return end
}

function getUnmatchedLength(s: string, i: number): number {
  const idsEnd = getIdeographicDescriptionSequenceEnd(s, i)
  if (idsEnd > i) {
    return idsEnd - i
  }
  return getCodePointLength(s, i)
}

class Trie {
  private root = createNode()

  /** 将一项数据加入字典树 */
  private addWord(s: string, v: string) {
    let node = this.root
    for (const c of s) {
      const cp = c.codePointAt(0)!
      let next = node.children.get(cp)
      if (!next) {
        next = createNode()
        node.children.set(cp, next)
      }
      node = next
    }
    node.value = v
  }

  /** 读取序列化字典 */
  loadDict(d: string) {
    for (const line of d.split('|')) {
      const [l, r] = line.split(' ')
      if (typeof r !== 'string') {
        throw new TypeError('Invalid dictionary entry: expected "source replacement" format.')
      }
      this.addWord(l, r)
    }
  }

  /** 读取多份字典, 倒序加载使先列出的词条优先覆盖 (与上游 loadDictGroup 一致) */
  loadDictGroup(group: readonly string[]) {
    group
      .slice()
      .reverse()
      .forEach(d => {
        this.loadDict(d)
      })
  }

  private matchPrefix(s: string, i: number): MatchResult | null {
    const n = s.length
    let node = this.root
    let k = 0
    let v: string | undefined
    for (let j = i; j < n; ) {
      const x = s.codePointAt(j)!
      j += x > 0xffff ? 2 : 1

      const next = node.children.get(x)
      if (!next) {
        break
      }
      node = next

      if (node.value !== undefined) {
        k = j
        v = node.value
      }
    }
    if (k > 0) {
      return { end: k, value: v! }
    }
    return null
  }

  convert(s: string): string {
    const n = s.length
    const arr: string[] = []
    let origI: number | null = null
    for (let i = 0; i < n; ) {
      const matched = this.matchPrefix(s, i)
      if (matched) {
        if (origI !== null) {
          arr.push(s.slice(origI, i))
          origI = null
        }
        arr.push(matched.value)
        i = matched.end
      } else {
        if (origI === null) {
          origI = i
        }
        i += getUnmatchedLength(s, i)
      }
    }
    if (origI !== null) {
      arr.push(s.slice(origI, n))
    }
    return arr.join('')
  }
}

/**
 * 创建转换器: 每个字典组构建一棵 Trie, 转换时按顺序链式套用
 * @param groups 字典组列表, 每组为若干序列化字典 (组内先列出的词条优先)
 */
export function createConverter(groups: readonly (readonly string[])[]): Converter {
  const tries = groups.map(grp => {
    const t = new Trie()
    t.loadDictGroup(grp)
    return t
  })
  return (str: string) => tries.reduce((res, t) => t.convert(res), str)
}
