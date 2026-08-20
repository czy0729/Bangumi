/*
 * @Author: czy0729
 * @Date: 2026-08-19 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-19 20:04:27
 */
import {
  clamp,
  createImageSizeList,
  fitImageSize,
  getFlipDirection,
  getHorizontalMax,
  getPositionX,
  getRenderImageProps,
  getVerticalMax,
  updateImageSize
} from '../utils'

import type { ImageInfo, ImageSize } from '../types'

describe('clamp', () => {
  it('越界值钳制到区间内', () => {
    expect(clamp(11, 0, 10)).toBe(10)
    expect(clamp(-1, 0, 10)).toBe(0)
    expect(clamp(5, 0, 10)).toBe(5)
  })
})

describe('getPositionX', () => {
  it('LTR 下标对应的位移为负值 (第 N 页左移 N 屏)', () => {
    expect(getPositionX(0, 100, false)).toBeCloseTo(0)
    expect(getPositionX(2, 100, false)).toBe(-200)
  })

  it('RTL 下标对应的位移为正值', () => {
    expect(getPositionX(2, 100, true)).toBe(200)
  })
})

describe('fitImageSize', () => {
  it('等比缩放到不超出视口', () => {
    const result = fitImageSize(2000, 1000, 100, 300)
    expect(result.width).toBe(100)
    expect(result.height).toBe(50)
  })

  it('宽高都超时按更小的比例缩放', () => {
    const result = fitImageSize(2000, 3000, 100, 100)
    expect(result.width).toBeCloseTo(66.67, 2)
    expect(result.height).toBeCloseTo(100, 2)
  })

  it('小于视口时不缩放', () => {
    const result = fitImageSize(50, 50, 100, 100)
    expect(result).toEqual({ width: 50, height: 50 })
  })
})

describe('getHorizontalMax / getVerticalMax', () => {
  it('横向最大位移随缩放增大而增大 (内容单位)', () => {
    expect(getHorizontalMax(100, 1, 100)).toBe(0)
    expect(getHorizontalMax(100, 2, 100)).toBe(25)
  })

  it('纵向最大位移随缩放增大而增大', () => {
    expect(getVerticalMax(100, 1, 100)).toBe(0)
    expect(getVerticalMax(100, 2, 100)).toBe(25)
  })
})

describe('getFlipDirection', () => {
  it('横向位移超过阈值判定翻页', () => {
    expect(
      getFlipDirection({
        positionXNumber: -110,
        standardPositionX: 0,
        vx: 0,
        isRTL: false,
        flipThreshold: 80
      })
    ).toBe('next')
    expect(
      getFlipDirection({
        positionXNumber: 110,
        standardPositionX: 0,
        vx: 0,
        isRTL: false,
        flipThreshold: 80
      })
    ).toBe('back')
  })

  it('甩动速度超过阈值优先翻页', () => {
    expect(
      getFlipDirection({
        positionXNumber: -10,
        standardPositionX: 0,
        vx: -1,
        isRTL: false,
        flipThreshold: 80
      })
    ).toBe('next')
    expect(
      getFlipDirection({
        positionXNumber: 10,
        standardPositionX: 0,
        vx: 1,
        isRTL: false,
        flipThreshold: 80
      })
    ).toBe('back')
  })

  it('位移与速度都不足时复位', () => {
    expect(
      getFlipDirection({
        positionXNumber: -50,
        standardPositionX: 0,
        vx: 0,
        isRTL: false,
        flipThreshold: 80
      })
    ).toBe('reset')
  })

  it('RTL 下方向取反', () => {
    expect(
      getFlipDirection({
        positionXNumber: 110,
        standardPositionX: 0,
        vx: 0,
        isRTL: true,
        flipThreshold: 80
      })
    ).toBe('next')
  })
})

describe('createImageSizeList', () => {
  it('初始化全部为 loading, 宽高读自带值', () => {
    const list = createImageSizeList([{ url: 'a' }, { url: 'b', width: 100, height: 200 }])
    expect(list).toEqual([
      { width: 0, height: 0, status: 'loading' },
      { width: 100, height: 200, status: 'loading' }
    ])
  })
})

describe('updateImageSize', () => {
  it('已非 loading 的尺寸不覆盖 (防止竞态覆写)', () => {
    const sizes: ImageSize[] = [{ width: 0, height: 0, status: 'loading' }]
    const first = updateImageSize(sizes, 0, { width: 100, height: 100, status: 'success' })
    const second = updateImageSize(first, 0, { width: 999, height: 999, status: 'success' })
    expect(second[0].width).toBe(100)
  })

  it('loading 时写入并生成新数组', () => {
    const sizes: ImageSize[] = [{ width: 0, height: 0, status: 'loading' }]
    const next = updateImageSize(sizes, 0, { width: 100, height: 200, status: 'success' })
    expect(next).not.toBe(sizes)
    expect(next[0]).toMatchObject({ width: 100, height: 200, status: 'success' })
  })

  it('index 越界返回原数组', () => {
    const sizes: ImageSize[] = [{ width: 0, height: 0, status: 'loading' }]
    expect(updateImageSize(sizes, 5, { width: 100, height: 100, status: 'success' })).toBe(sizes)
  })
})

describe('getRenderImageProps', () => {
  it('合并 source 与缩放后尺寸 (不突变原 props)', () => {
    const image: ImageInfo = {
      url: 'https://bgm.tv/a.jpg',
      props: {
        source: { uri: 'https://bgm.tv/override.jpg', headers: { Referer: 'https://bgm.tv' } },
        style: { borderRadius: 4 }
      }
    }
    const result = getRenderImageProps(image, 100, 200)
    expect(result).toEqual({
      source: { uri: 'https://bgm.tv/override.jpg', headers: { Referer: 'https://bgm.tv' } },
      style: { borderRadius: 4, width: 100, height: 200 }
    })
    expect(image.props?.source).toEqual({
      uri: 'https://bgm.tv/override.jpg',
      headers: { Referer: 'https://bgm.tv' }
    })
  })

  it('require 资源 source 为数字时原样保留', () => {
    const image: ImageInfo = { url: 'https://bgm.tv/a.jpg', props: { source: 123 } }
    expect(getRenderImageProps(image, 100, 200).source).toBe(123)
  })

  it('无 props 时以 url 作为 source', () => {
    const result = getRenderImageProps({ url: 'https://bgm.tv/a.jpg' }, 100, 200)
    expect(result).toEqual({ source: { uri: 'https://bgm.tv/a.jpg' }, style: { width: 100, height: 200 } })
  })
})
