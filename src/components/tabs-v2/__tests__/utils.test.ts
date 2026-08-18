/*
 * @Author: czy0729
 * @Date: 2026-08-18 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 10:00:00
 */
import { createScenes, getTabWidth } from '../utils'

describe('tabs-v2/utils', () => {
  describe('getTabWidth', () => {
    it('数量小于 10 时均分窗口宽度', () => {
      expect(getTabWidth(5, 500)).toBe(100)
    })

    it('数量为 10 及以上时按固定比例', () => {
      expect(getTabWidth(10, 500)).toBe(500 / 3.6)
    })

    it('数量为 0 时回退整宽, 避免除零', () => {
      expect(getTabWidth(0, 500)).toBe(500)
    })
  })

  describe('createScenes', () => {
    it('为路由构建场景表', () => {
      const scenes = createScenes(
        [
          { key: 'a', title: 'A' },
          { key: 'b', title: 'B' }
        ],
        () => null
      )
      expect(Object.keys(scenes)).toEqual(['a', 'b'])
    })

    it('渲染时以路由与索引调用 renderItem', () => {
      const renderItem = jest.fn(() => null)
      const scenes = createScenes([{ key: 'a' }], renderItem)
      scenes.a()
      expect(renderItem).toHaveBeenCalledTimes(1)
      expect(renderItem).toHaveBeenCalledWith({ key: 'a' }, 0)
    })
  })
})
