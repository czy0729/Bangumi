/*
 * @Author: czy0729
 * @Date: 2026-08-22 08:55:11
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-22 08:55:11
 */

/**
 * 紧凑版 AC 自动机
 * - 单棵 trie, Map 转移表, BFS 构建失配指针
 * - 搜索时沿失配链收集终态, 以状态集合去重, 无 output 数组复制
 */

/** 已访问状态戳记, 模块级跨实例复用 */
let seenStamp = new Int32Array(1024)

/** 当前代数, 自增以失效旧戳记 */
let generation = 0

export class AhoCorasick {
  /** 每个状态的字符转移表 */
  private goto: Map<string, number>[]

  /** 失配指针 */
  private fail: number[]

  /** 终态对应的词 id, -1 表示非终态 */
  private outWord: number[]

  /** 词表, id 与插入顺序对应 */
  private words: string[]

  /** 终态集合, 用于插入去重 */
  private terminal: Set<number>

  /** 是否已构建失配指针 */
  private built: boolean

  constructor() {
    this.goto = [new Map<string, number>()]
    this.fail = [0]
    this.outWord = [-1]
    this.words = []
    this.terminal = new Set<number>()
    this.built = false
  }

  /** 批量添加词, 重复词只保留一个; 构建完成后不可再添加 */
  public addWords(ws: string[]) {
    if (this.built) throw new Error('AhoCorasick 已构建, 不能再添加词')

    for (const w of ws) {
      if (!w) continue

      let s = 0
      // 按 UTF-16 单元迭代, 与 search 的 str[i] 保持一致, 含 emoji 等增补平面字符的词才能命中
      for (let i = 0; i < w.length; i += 1) {
        const ch = w[i]
        let next = this.goto[s].get(ch)
        if (next === undefined) {
          next = this.goto.length
          this.goto.push(new Map<string, number>())
          this.fail.push(0)
          this.outWord.push(-1)
          this.goto[s].set(ch, next)
        }
        s = next
      }

      if (!this.terminal.has(s)) {
        this.terminal.add(s)
        this.outWord[s] = this.words.length
        this.words.push(w)
      }
    }
  }

  /** BFS 构建失配指针, 完成后才能搜索 */
  public build() {
    const queue: number[] = []
    for (const [, s] of this.goto[0]) {
      this.fail[s] = 0
      queue.push(s)
    }

    for (let head = 0; head < queue.length; head += 1) {
      const r = queue[head]
      for (const [ch, s] of this.goto[r]) {
        queue.push(s)

        let f = this.fail[r]
        while (f > 0 && !this.goto[f].has(ch)) {
          f = this.fail[f]
        }

        const fs = this.goto[f].get(ch)
        this.fail[s] = fs && fs !== s ? fs : 0
      }
    }

    this.built = true
  }

  /**
   * 搜索文本, 返回命中的词数组 (去重)
   * - 命中的词是文本的子串, 与出现位置无关
   * - seen 用模块级 Int32Array 戳记 + generation 计数, 跨调用复用零分配
   */
  public search(str: string): string[] {
    if (!this.built || !str) return []

    const results: string[] = []
    const { goto, fail, outWord, words } = this

    // 容量不足时倍增; generation 自增使旧戳记全部失效, 等效于清空 Set
    if (seenStamp.length < goto.length + 1) {
      const next = new Int32Array(Math.max(1024, (goto.length + 1) << 1))
      next.set(seenStamp)
      seenStamp = next
    }
    generation += 1

    let s = 0
    for (let i = 0; i < str.length; i += 1) {
      const ch = str[i]
      while (s > 0 && !goto[s].has(ch)) {
        s = fail[s]
      }

      const next = goto[s].get(ch)
      s = next === undefined ? 0 : next

      // 沿失配链收集该位置的所有后缀命中, 每个状态全局只访问一次
      for (let t = s; t > 0 && seenStamp[t] !== generation; t = fail[t]) {
        const wordId = outWord[t]
        if (wordId >= 0) results.push(words[wordId])
        seenStamp[t] = generation
      }
    }

    return results
  }

  /** 已添加的去重词数 */
  public get size() {
    return this.words.length
  }
}
