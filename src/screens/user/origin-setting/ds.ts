/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:09:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 20:34:29
 *
 * 页面标识与源头分类 (预设站点数据见 sites.ts)
 */
export const COMPONENT = 'OriginSetting'

export const TYPES_DS = [
  {
    type: 'anime',
    name: '动画',
    test: {
      CN: '电锯人',
      JP: 'チェンソーマン',
      ID: 321885
    }
  },
  {
    type: 'hanime',
    name: 'NSFW',
    test: {
      CN: '缘之空',
      JP: 'ヨスガノソラ',
      ID: 7157
    }
  },
  {
    type: 'manga',
    name: '漫画',
    test: {
      CN: '蓦然回首',
      JP: 'ルックバック',
      ID: 342254
    }
  },
  {
    type: 'wenku',
    name: '小说',
    test: {
      CN: '来自新世界',
      JP: '新世界より',
      ID: 37782
    }
  },
  {
    type: 'music',
    name: '音乐',
    test: {
      CN: 'One Last Kiss',
      JP: 'One Last Kiss',
      ID: 321924
    }
  },
  {
    type: 'game',
    name: '游戏',
    test: {
      CN: '艾尔登法环',
      JP: 'ELDEN RING',
      ID: 284100
    }
  },
  {
    type: 'real',
    name: '三次元',
    test: {
      CN: '边缘世界',
      JP: 'The Peripheral',
      ID: 403404
    }
  }
] as const
