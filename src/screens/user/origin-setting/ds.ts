/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:09:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 07:11:49
 */
export const NAMESPACE = 'ScreenOriginSetting'

export const TYPES_DS = [
  {
    type: 'anime',
    name: '动画',
    test: {
      CN: '擅长捉弄的高木同学 第三季',
      JP: 'からかい上手の高木さん③',
      ID: 347887
    }
  },
  {
    type: 'hanime',
    name: 'H',
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
      CN: '半泽直树 2',
      JP: '半沢直樹 2',
      ID: 108596
    }
  }
] as const
