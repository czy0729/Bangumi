/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 00:00:00
 */
import { HOST } from '@constants'
import { BGM_COUNT, getBgmMap } from '../utils'

describe('getBgmMap', () => {
  const bgm = getBgmMap()

  it('共 102 个表情', () => {
    expect(Object.keys(bgm)).toHaveLength(BGM_COUNT)
  })

  it('键为 1 到 102 的字符串', () => {
    expect(bgm['1']).toBeDefined()
    expect(bgm['102']).toBeDefined()
    expect(bgm['0']).toBeUndefined()
    expect(bgm['103']).toBeUndefined()
  })

  it('个位数索引补零为两位', () => {
    expect(bgm['1']).toBe(`${HOST}/img/smiles/tv/01.gif`)
    expect(bgm['5']).toBe(`${HOST}/img/smiles/tv/05.gif`)
    expect(bgm['9']).toBe(`${HOST}/img/smiles/tv/09.gif`)
  })

  it('两位数索引保持原样', () => {
    expect(bgm['10']).toBe(`${HOST}/img/smiles/tv/10.gif`)
    expect(bgm['102']).toBe(`${HOST}/img/smiles/tv/102.gif`)
  })
})
