/*
 * @Author: czy0729
 * @Date: 2026-08-10 11:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-10 11:00:00
 */
import { D, D3, D7 } from '@constants'
import { getStatusByDistance, getStatusByLast, getUserStatusByData } from '../utils'

describe('getStatusByDistance', () => {
  it('距离为 0 返回 success', () => {
    expect(getStatusByDistance(0)).toBe('success')
  })

  it('负数距离返回 success', () => {
    expect(getStatusByDistance(-1)).toBe('success')
  })

  it('距离小于 D 返回 success', () => {
    expect(getStatusByDistance(D - 1)).toBe('success')
  })

  it('距离等于 D 返回 warning', () => {
    expect(getStatusByDistance(D)).toBe('warning')
  })

  it('距离在 D 与 D3 之间返回 warning', () => {
    expect(getStatusByDistance(D3 - 1)).toBe('warning')
  })

  it('距离等于 D3 返回 disabled', () => {
    expect(getStatusByDistance(D3)).toBe('disabled')
  })

  it('距离大于 D3 返回 disabled', () => {
    expect(getStatusByDistance(D7)).toBe('disabled')
  })
})

describe('getStatusByLast', () => {
  it('距离超过 D7 不显示徽标', () => {
    expect(getStatusByLast(0, D7 + 1)).toEqual({ show: false, type: 'success' })
  })

  it('距离等于 D7 时显示徽标', () => {
    expect(getStatusByLast(0, D7)).toEqual({ show: true, type: 'disabled' })
  })

  it('最近在线返回 success', () => {
    expect(getStatusByLast(100, 101)).toEqual({ show: true, type: 'success' })
  })

  it('在线中段返回 warning', () => {
    expect(getStatusByLast(0, D + 1)).toEqual({ show: true, type: 'warning' })
  })
})

describe('getUserStatusByData', () => {
  it('onlineStatus 关闭返回 false', () => {
    expect(getUserStatusByData(false, 100, 200)).toBe(false)
  })

  it('无在线记录返回 false', () => {
    expect(getUserStatusByData(true, 0, 200)).toBe(false)
  })

  it('最近在线返回 Success', () => {
    expect(getUserStatusByData(true, 100, 101)).toBe('Success')
  })

  it('D 至 D3 之间返回 Warning', () => {
    expect(getUserStatusByData(true, 100, 100 + D + 1)).toBe('Warning')
  })

  it('超过 D3 返回 false', () => {
    expect(getUserStatusByData(true, 100, 100 + D3 + 1)).toBe(false)
  })

  it('[问题] 距离恰好 D3 时视为离线', () => {
    expect(getUserStatusByData(true, 100, 100 + D3)).toBe(false)
  })
})
