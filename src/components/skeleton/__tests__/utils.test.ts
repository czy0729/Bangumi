/*
 * @Author: czy0729
 * @Date: 2026-08-10 22:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-10 23:50:40
 */
import { _colorTinygrailBorder, _colorTinygrailIcon } from '@styles/colors'
import { getShimmerColorsByMode } from '../utils'

const palette = {
  colorBg: '#ffffff',
  colorIcon: '#cccccc',
  darkLevel1: '#222222',
  darkLevel2: '#333333'
}

describe('getShimmerColorsByMode', () => {
  it('浅色模式返回 背景/图标/背景', () => {
    expect(getShimmerColorsByMode('app', false, palette)).toEqual(['#ffffff', '#cccccc', '#ffffff'])
  })

  it('浅色模式 tinygrail 同样返回浅色系', () => {
    expect(getShimmerColorsByMode('tinygrail', false, palette)).toEqual([
      '#ffffff',
      '#cccccc',
      '#ffffff'
    ])
  })

  it('深色模式 app 返回深色层级色', () => {
    expect(getShimmerColorsByMode('app', true, palette)).toEqual(['#222222', '#333333', '#222222'])
  })

  it('深色模式 tinygrail 返回小圣杯固定色', () => {
    expect(getShimmerColorsByMode('tinygrail', true, palette)).toEqual([
      _colorTinygrailBorder,
      _colorTinygrailIcon,
      _colorTinygrailBorder
    ])
  })
})
