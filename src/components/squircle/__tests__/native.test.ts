/*
 * @Author: czy0729
 * @Date: 2026-09-16 00:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 01:16:50
 *
 * 说明: native.ts 在模块顶层就会读平台常量并尝试注册原生视图,
 * 因此每个用例都要重置模块注册表, 再用 doMock 声明平台常量与 UIManager, 最后重新 require
 */

type LoadOptions = {
  /** 是否安卓环境 */
  android: boolean

  /** 原生视图是否已注册 */
  registered?: boolean

  /** UIManager 取值是否抛异常 */
  throws?: boolean
}

/** 在受控环境下加载 native 模块 */
function loadNative({ android, registered = false, throws = false }: LoadOptions) {
  jest.resetModules()

  jest.doMock('@constants', () => ({ ANDROID: android }), { virtual: true })

  const hasViewManagerConfig = jest.fn(() => {
    if (throws) throw new Error('UIManager 取值失败')
    return registered
  })
  const requireNativeComponent = jest.fn(() => 'NativeSquircleMock')
  jest.doMock('react-native', () => ({
    UIManager: { hasViewManagerConfig },
    requireNativeComponent
  }))

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const native = require('../native')

  return { native, hasViewManagerConfig, requireNativeComponent }
}

describe('isNativeSquircleAvailable', () => {
  it('非安卓直接返回 false, 且不触碰 UIManager (iOS 新架构下取值会打 console.error)', () => {
    const { native, hasViewManagerConfig } = loadNative({ android: false })

    expect(native.isNativeSquircleAvailable()).toBe(false)
    expect(hasViewManagerConfig).not.toHaveBeenCalled()
    expect(native.NativeSquircle).toBeNull()
  })

  it('安卓 + 原生视图未注册时不可用 (尚未重新编译原生包的情况)', () => {
    const { native, hasViewManagerConfig } = loadNative({ android: true, registered: false })

    expect(native.isNativeSquircleAvailable()).toBe(false)
    expect(hasViewManagerConfig).toHaveBeenCalledWith('BangumiSquircle')
    expect(native.NativeSquircle).toBeNull()
  })

  it('安卓 + 原生视图已注册时可用, 并按视图名注册组件', () => {
    const { native, requireNativeComponent } = loadNative({ android: true, registered: true })

    expect(native.isNativeSquircleAvailable()).toBe(true)
    expect(requireNativeComponent).toHaveBeenCalledWith('BangumiSquircle')
    expect(native.NativeSquircle).toBe('NativeSquircleMock')
  })

  it('UIManager 取值抛异常时安全降级, 不向外抛', () => {
    const { native } = loadNative({ android: true, throws: true })

    expect(() => native.isNativeSquircleAvailable()).not.toThrow()
    expect(native.isNativeSquircleAvailable()).toBe(false)
    expect(native.NativeSquircle).toBeNull()
  })
})

describe('NATIVE_SQUIRCLE_NAME', () => {
  it('与原生 SquircleViewManager.REACT_CLASS 保持一致 (改名会静默降级, 用测试锁住)', () => {
    const { native } = loadNative({ android: true, registered: true })

    expect(native.NATIVE_SQUIRCLE_NAME).toBe('BangumiSquircle')
  })
})
