/*
 * @Author: czy0729
 * @Date: 2026-08-18 06:00:23
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-18 06:00:23
 */

// 可变的 store 状态, 便于在用例中切换 cdn / avatarRound 等开关
// 工厂函数在模块加载时执行, 通过 getter 延迟读取, 避免闭包引用未初始化变量
global.__avatarMockStore__ = {
  _: { radiusSm: 8 },
  systemStore: {
    setting: { avatarRound: false, cdn: false },
    cdnAvatar: false
  },
  userStore: { usersInfo: () => ({ avatar: {} }) },
  usersStore: { customAvatar: '' }
}

jest.mock('@stores', () => ({
  get _() {
    return global.__avatarMockStore__._
  },
  get systemStore() {
    return global.__avatarMockStore__.systemStore
  },
  get userStore() {
    return global.__avatarMockStore__.userStore
  },
  get usersStore() {
    return global.__avatarMockStore__.usersStore
  }
}))

import {
  fixedAll,
  fixedHD,
  fixedSize,
  getAvatar,
  getCDNAvatar,
  getOnPress,
  getRadius
} from '../utils'

const t = require('@utils/fetch').t

const mockStore = () => global.__avatarMockStore__

describe('getRadius', () => {
  it('radius 为 false 返回 0', () => {
    expect(getRadius(false, false, 40)).toBe(0)
  })

  it('round 为 true 返回 size', () => {
    expect(getRadius(true, true, 40)).toBe(40)
  })

  it('全局开启圆形头像时返回 size', () => {
    mockStore().systemStore.setting.avatarRound = true
    expect(getRadius(true, false, 40)).toBe(40)
    mockStore().systemStore.setting.avatarRound = false
  })

  it('radius 为 true 时返回主题圆角', () => {
    expect(getRadius(true, false, 40)).toBe(8)
  })

  it('radius 为数值时返回原值', () => {
    expect(getRadius(12, false, 40)).toBe(12)
  })
})

describe('fixedSize', () => {
  it('cover 尺寸统一改为 l', () => {
    expect(fixedSize('https://lain.bgm.tv/r/200x400/pic/cover/s/x.jpg')).toBe(
      'https://lain.bgm.tv/r/200x400/pic/cover/l/x.jpg'
    )
  })

  it('非字符串原样返回', () => {
    expect(fixedSize(123)).toBe(123)
  })
})

describe('fixedHD', () => {
  it('HOST_IMAGE 地址追加 hd=1', () => {
    expect(fixedHD('https://lain.bgm.tv/pic/user/m/123.jpg?r=1')).toBe(
      'https://lain.bgm.tv/pic/user/m/123.jpg?r=1&hd=1'
    )
  })

  it('非 HOST_IMAGE 地址不追加', () => {
    expect(fixedHD('https://other.com/x.jpg?r=1')).toBe('https://other.com/x.jpg?r=1')
  })

  it('已含 hd= 不重复追加', () => {
    expect(fixedHD('https://lain.bgm.tv/pic/user/m/123.jpg?r=1&hd=1')).toBe(
      'https://lain.bgm.tv/pic/user/m/123.jpg?r=1&hd=1'
    )
  })

  it('// 开头补全 https', () => {
    expect(fixedHD('//lain.bgm.tv/pic/user/m/123.jpg?r=1')).toBe(
      'https://lain.bgm.tv/pic/user/m/123.jpg?r=1&hd=1'
    )
  })
})

describe('getCDNAvatar', () => {
  it('cdn 未开启返回原地址', () => {
    mockStore().systemStore.setting.cdn = false
    expect(getCDNAvatar('https://lain.bgm.tv/pic/user/12345_1.jpg?r=123456')).toBe(
      'https://lain.bgm.tv/pic/user/12345_1.jpg?r=123456'
    )
  })

  it('非用户头像路径不转换', () => {
    mockStore().systemStore.setting.cdn = true
    mockStore().systemStore.cdnAvatar = true
    expect(getCDNAvatar('https://lain.bgm.tv/pic/cover/l/1.jpg')).toBe(
      'https://lain.bgm.tv/pic/cover/l/1.jpg'
    )
  })

  it('匹配用户头像地址转为 CDN 路径', () => {
    mockStore().systemStore.setting.cdn = true
    mockStore().systemStore.cdnAvatar = true
    expect(getCDNAvatar('https://lain.bgm.tv/pic/user/12345_1.jpg?r=123456')).toBe(
      'https://cdn.example.com/pic/user/12345/123456.jpg/bgm_poster_100'
    )
  })
})

describe('getAvatar', () => {
  it('URL_DEFAULT_AVATAR 映射为本地默认头像', () => {
    expect(getAvatar('/icon.jpg')).toBe('IMG_AVATAR_DEFAULT')
  })

  it('URL_DEFAULT_MONO 映射为默认图', () => {
    expect(getAvatar('/info_only.png')).toBe('IMG_DEFAULT')
  })

  it('非字符串原样返回', () => {
    expect(getAvatar(123)).toBe(123)
  })
})

describe('getOnPress', () => {
  it('无 onPress 且无 navigation 与 userId 返回 undefined', () => {
    expect(getOnPress(undefined, {})).toBeUndefined()
  })

  it('存在 onPress 时优先执行 onPress', () => {
    const cb = jest.fn()
    const onPressFn = getOnPress(cb, {
      navigation: { push: jest.fn() } as any,
      userId: 123
    })
    onPressFn()
    expect(cb).toHaveBeenCalled()
    expect(t).not.toHaveBeenCalled()
  })

  it('有 userId 且可跳转时发送埋点并 push Zone', () => {
    const push = jest.fn()
    const onPressFn = getOnPress(undefined, {
      navigation: { push } as any,
      userId: 123,
      event: { id: '空间', data: { a: 1 } },
      src: 'x.jpg',
      name: 'n',
      params: { p: 2 }
    })
    onPressFn()
    expect(t).toHaveBeenCalledWith('空间', { to: 'Zone', userId: 123, a: 1 })
    expect(push).toHaveBeenCalledWith('Zone', {
      userId: 123,
      _id: 123,
      _image: 'x.jpg',
      _name: 'n',
      p: 2
    })
  })
})

describe('fixedAll', () => {
  it('非字符串原样返回', () => {
    expect(fixedAll(123, 40)).toBe(123)
  })

  it('字符串返回修复后的地址', () => {
    mockStore().systemStore.setting.cdn = false
    expect(fixedAll('https://lain.bgm.tv/pic/user/m/123.jpg?r=1', 40)).toBe(
      'https://lain.bgm.tv/pic/user/l/123.jpg?r=1&hd=1'
    )
  })
})
