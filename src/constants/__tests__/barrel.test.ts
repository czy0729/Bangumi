/*
 * @Author: czy0729
 * @Date: 2026-09-03 23:05:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:05:25
 *
 * barrel 与 jest 虚拟 mock 一致性兜底
 *
 * jest/setup.js 为 '@constants' 注册了 virtual mock, 与真实导出平行维护。
 * 本测试确保 mock 用到的 key 始终能在真实 barrel 中找到, 防止常量重命名/删除后 mock 静默漂移。
 */
import * as mockedConstants from '@constants'

/* eslint-disable @typescript-eslint/no-explicit-any */
// 裸 '@constants' 在 jest.config moduleNameMapper 中无映射(仅靠 jest/setup.js 的 virtual mock 解析),
// requireActual('@constants') 会抛 Cannot find module, 故用相对路径解析真实 barrel
const realConstants = jest.requireActual('../index') as Record<string, any>

describe('@constants jest 虚拟 mock 与真实导出一致性', () => {
  // virtual mock 工厂未声明 __esModule, babel interop 会在命名空间上附加 default 键,
  // 真实 barrel 无 default 导出, 该键是 interop 假象而非漂移, 过滤掉
  const mockedKeys = Object.keys(mockedConstants as Record<string, unknown>).filter(
    key => key !== 'default'
  )

  it('虚拟 mock 存在且包含若干 key', () => {
    expect(mockedKeys.length).toBeGreaterThan(0)
  })

  it('虚拟 mock 的每个 key 都存在于真实 barrel', () => {
    for (const key of mockedKeys) {
      expect(realConstants).toHaveProperty(key)
    }
  })

  it('数值型 mock 与真实值一致', () => {
    for (const key of mockedKeys) {
      const mockedValue = (mockedConstants as Record<string, any>)[key]
      if (typeof mockedValue === 'number') {
        expect(realConstants[key]).toBe(mockedValue)
      }
    }
  })
})
