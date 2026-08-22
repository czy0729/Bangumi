/*
 * @Author: czy0729
 * @Date: 2026-08-22 08:54:14
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-22 08:54:14
 */
import { filterWords, mergeWordMaps } from '../words'

describe('mergeWordMaps', () => {
  it('优先级 addon > alias > anime', () => {
    const cnMap = mergeWordMaps(
      { 芙莉莲: '1' },
      { 芙莉莲: '2', 我推的孩子: '3' },
      { 芙莉莲: '4', 我推的孩子: '5', 孤独摇滚: '6' }
    )

    expect(cnMap['芙莉莲']).toBe('1')
    expect(cnMap['我推的孩子']).toBe('3')
    expect(cnMap['孤独摇滚']).toBe('6')
  })

  it('低优先级缺失时回退到下一级', () => {
    const cnMap = mergeWordMaps({}, { 咒术回战: '7' }, { 咒术回战: '8' })
    expect(cnMap['咒术回战']).toBe('7')
  })
})

describe('filterWords', () => {
  it('保留正常长度的中文词', () => {
    expect(filterWords(['葬送的芙莉莲', '孤独摇滚'])).toEqual(['葬送的芙莉莲', '孤独摇滚'])
  })

  it('过滤超过 8 字的长词', () => {
    expect(filterWords(['Re:从零开始的异世界生活'])).toEqual([])
    expect(filterWords(['八个字六个两个字'])).toEqual(['八个字六个两个字'])
    expect(filterWords(['九个字九个字九个字啊'])).toEqual([])
  })

  it('过滤单字', () => {
    expect(filterWords(['歌'])).toEqual([])
  })

  it('过滤忽略名单中的词', () => {
    expect(filterWords(['人生', '日常', '音乐'])).toEqual([])
  })

  it('过滤带特殊符号的词', () => {
    expect(filterWords(['C++', 'a.b', '我推的孩子 第三季', '「芙莉莲」'])).toEqual([])
  })
})
