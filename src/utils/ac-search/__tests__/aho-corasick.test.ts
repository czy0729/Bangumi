/*
 * @Author: czy0729
 * @Date: 2026-08-22 08:43:20
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-22 08:43:20
 */
import { AhoCorasick } from '../aho-corasick'

/** 确定性伪随机数, 保证对拍可复现 */
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** 排序副本, 用于无序比较 */
function sorted(arr: string[]) {
  return [...arr].sort()
}

/** 朴素子串匹配, 作为对拍基准 */
function naiveSearch(words: string[], text: string) {
  const set = new Set<string>()
  words.forEach(w => {
    if (w && text.includes(w)) set.add(w)
  })
  return sorted([...set])
}

describe('AhoCorasick', () => {
  describe('运行时结构符合类型定义', () => {
    it('search 返回 string[]', () => {
      const ac = new AhoCorasick()
      ac.addWords(['芙莉莲'])
      ac.build()
      const result = ac.search('葬送的芙莉莲')
      expect(Array.isArray(result)).toBe(true)
      result.forEach(item => expect(item).toEqual(expect.any(String)))
    })

    it('size 返回去重后的词数', () => {
      const ac = new AhoCorasick()
      ac.addWords(['芙莉莲', '芙莉莲', '我推的孩子'])
      expect(ac.size).toBe(2)
    })
  })

  describe('基础行为', () => {
    it('空字符串返回空数组', () => {
      const ac = new AhoCorasick()
      ac.addWords(['芙莉莲'])
      ac.build()
      expect(ac.search('')).toEqual([])
    })

    it('未构建时返回空数组而不是报错', () => {
      const ac = new AhoCorasick()
      ac.addWords(['芙莉莲'])
      expect(ac.search('葬送的芙莉莲')).toEqual([])
    })

    it('无命中返回空数组', () => {
      const ac = new AhoCorasick()
      ac.addWords(['咒术回战'])
      ac.build()
      expect(ac.search('葬送的芙莉莲')).toEqual([])
    })

    it('同一词多次出现只报告一次', () => {
      const ac = new AhoCorasick()
      ac.addWords(['芙莉莲'])
      ac.build()
      expect(ac.search('芙莉莲和芙莉莲和芙莉莲')).toEqual(['芙莉莲'])
    })

    it('[问题] 命中词的更短后缀词也应命中', () => {
      // 芙莉莲是「葬送的芙莉莲」的后缀, 失配链必须把两者都收集到
      const ac = new AhoCorasick()
      ac.addWords(['葬送的芙莉莲', '芙莉莲'])
      ac.build()
      const result = ac.search('葬送的芙莉莲')
      expect(sorted(result)).toEqual(sorted(['葬送的芙莉莲', '芙莉莲']))
    })

    it('[问题] 命中词的前缀词也应命中', () => {
      const ac = new AhoCorasick()
      ac.addWords(['孤独摇滚', '孤独摇滚剧场版'])
      ac.build()
      const result = ac.search('孤独摇滚剧场版')
      expect(sorted(result)).toEqual(sorted(['孤独摇滚', '孤独摇滚剧场版']))
    })

    it('构建后不能再添加词', () => {
      const ac = new AhoCorasick()
      ac.build()
      expect(() => ac.addWords(['芙莉莲'])).toThrow()
    })
  })

  describe('边界情况', () => {
    it('空词被忽略', () => {
      const ac = new AhoCorasick()
      ac.addWords(['', '芙莉莲'])
      ac.build()
      expect(ac.size).toBe(1)
      expect(ac.search('芙莉莲')).toEqual(['芙莉莲'])
    })

    it('单字词正常命中', () => {
      const ac = new AhoCorasick()
      ac.addWords(['歌'])
      ac.build()
      expect(ac.search('音乐是歌的歌')).toEqual(['歌'])
    })

    it('含正则特殊字符的词按字面匹配', () => {
      const ac = new AhoCorasick()
      ac.addWords(['C++', 'a.b'])
      ac.build()
      expect(sorted(ac.search('我会C++和a.b'))).toEqual(sorted(['C++', 'a.b']))
      expect(ac.search('Cxx和axb')).toEqual([])
    })

    it('[问题] 含增补平面字符(emoji)的词正常命中', () => {
      // addWords 与 search 必须同为 UTF-16 单元迭代, 否则代理对词永远无法命中
      const ac = new AhoCorasick()
      ac.addWords(['芙莉莲🎉', '👍👍'])
      ac.build()
      expect(ac.search('看了芙莉莲第二季')).toEqual([])
      expect(ac.search('看了芙莉莲🎉第二季')).toEqual(['芙莉莲🎉'])
      expect(ac.search('双击👍👍666')).toEqual(['👍👍'])
    })
  })

  describe('与朴素匹配器对拍', () => {
    const rand = mulberry32(20260822)

    /** 从小字符集生成随机词表与文本 */
    function genCase() {
      const chars = '芙莉葬送孤独摇滚孩子推咒术回战从零开始异世界生活冰结之绊加护女武神'
      const pick = n => {
        let s = ''
        for (let i = 0; i < n; i += 1) {
          s += chars[Math.floor(rand() * chars.length)]
        }
        return s
      }

      const words: string[] = []
      for (let i = 0; i < 60; i += 1) {
        words.push(pick(1 + Math.floor(rand() * 3)))
      }

      // 文本 = 随机字符 + 随机插入词表中的词
      let text = ''
      for (let i = 0; i < 80; i += 1) {
        text +=
          rand() < 0.5 ? pick(1 + Math.floor(rand() * 4)) : words[Math.floor(rand() * words.length)]
      }

      return { words: [...new Set(words)], text }
    }

    it('随机用例结果与朴素匹配一致', () => {
      for (let round = 0; round < 30; round += 1) {
        const { words, text } = genCase()

        const ac = new AhoCorasick()
        ac.addWords(words)
        ac.build()

        expect(sorted(ac.search(text))).toEqual(naiveSearch(words, text))
      }
    })

    it('分组构建多棵自动机合并结果与单棵一致', () => {
      const { words, text } = genCase()
      const merged = new Set<string>()

      // 模拟 utils.ts 的分片初始化
      for (let i = 0; i < words.length; i += 17) {
        const part = new AhoCorasick()
        part.addWords(words.slice(i, i + 17))
        part.build()
        part.search(text).forEach(item => merged.add(item))
      }

      expect(sorted([...merged])).toEqual(naiveSearch(words, text))
    })
  })
})
