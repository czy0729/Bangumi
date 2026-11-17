/*
 * @Author: czy0729
 * @Date: 2026-11-18 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-18 04:32:26
 *
 * Android 存储权限统一入口契约
 *  - API 29+ 阈值直接放行, 不触碰 PermissionsAndroid
 *  - API 28-: check / request 分支与 guided 引导行为
 */
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native'
import { hasAndroidStoragePermission } from '../index'

const checkSpy = jest.spyOn(PermissionsAndroid, 'check')
const requestSpy = jest.spyOn(PermissionsAndroid, 'request')
const alertSpy = jest.spyOn(Alert, 'alert')
const openSettingsSpy = jest.spyOn(Linking, 'openSettings')

/** 模拟 Android 平台与 API 版本 */
function useAndroid(version: number) {
  ;(Platform as any).OS = 'android'
  ;(Platform as any).Version = version
}

afterEach(() => {
  // 还原 mock 平台状态, 避免后续用例产生顺序依赖
  ;(Platform as any).OS = 'ios'
  delete (Platform as any).Version
})

beforeEach(() => {
  jest.clearAllMocks()
  checkSpy.mockResolvedValue(false)
  requestSpy.mockResolvedValue('granted')
})

describe('hasAndroidStoragePermission', () => {
  it('API 29+: 直接放行, 不触发权限检查', async () => {
    useAndroid(29)
    await expect(hasAndroidStoragePermission()).resolves.toBe(true)
    expect(checkSpy).not.toHaveBeenCalled()
    expect(requestSpy).not.toHaveBeenCalled()
  })

  it('API 28 已授权: 直接放行, 不再重复申请', async () => {
    useAndroid(28)
    checkSpy.mockResolvedValueOnce(true)
    await expect(hasAndroidStoragePermission()).resolves.toBe(true)
    expect(requestSpy).not.toHaveBeenCalled()
  })

  it('API 28 被拒且非 guided: 返回 false, 不弹设置引导', async () => {
    useAndroid(28)
    requestSpy.mockResolvedValueOnce('denied')
    await expect(hasAndroidStoragePermission()).resolves.toBe(false)
    expect(alertSpy).not.toHaveBeenCalled()
  })

  it('API 28 被拒且 guided: 弹设置引导, 取消后返回 false', async () => {
    useAndroid(28)
    requestSpy.mockResolvedValueOnce('denied')
    const pending = hasAndroidStoragePermission(true)
    // 等内部 check / request 微任务链跑完再断言
    await new Promise(resolve => setTimeout(resolve, 0))
    expect(alertSpy).toHaveBeenCalledTimes(1)
    // 模拟用户点「取消」
    const buttons = alertSpy.mock.calls[0][2] as {
      text: string
      onPress: () => void
    }[]
    buttons[0].onPress()
    await expect(pending).resolves.toBe(false)
    expect(openSettingsSpy).not.toHaveBeenCalled()
  })

  it('API 28 被拒且 guided: 点「去设置」触发 openSettings 后返回 false', async () => {
    useAndroid(28)
    requestSpy.mockResolvedValueOnce('denied')
    const pending = hasAndroidStoragePermission(true)
    await new Promise(resolve => setTimeout(resolve, 0))
    const buttons = alertSpy.mock.calls[0][2] as {
      text: string
      onPress: () => void
    }[]
    buttons[1].onPress()
    await expect(pending).resolves.toBe(false)
    expect(openSettingsSpy).toHaveBeenCalledTimes(1)
  })

  it('非 Android 平台: 直接放行', async () => {
    ;(Platform as any).OS = 'ios'
    await expect(hasAndroidStoragePermission()).resolves.toBe(true)
    expect(checkSpy).not.toHaveBeenCalled()
  })
})
