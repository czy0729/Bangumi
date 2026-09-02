/*
 * @Author: czy0729
 * @Date: 2026-09-03 00:12:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 00:14:13
 */
import { getHandlerSize, getNextToggleable, getOffset } from '../utils'

describe('getOffset', () => {
  it('返回容器总宽减去圆圈直径的净移动距离', () => {
    expect(getOffset(52, 32)).toBe(20)
  })

  it('width 与 height 相等时无移动距离', () => {
    expect(getOffset(32, 32)).toBe(0)
  })

  it('width 小于 height 时下限为 0, 避免开启态圆圈移出容器左侧', () => {
    expect(getOffset(32, 52)).toBe(0)
  })
})

describe('getHandlerSize', () => {
  it('返回容器高度减去上下留白后的圆圈直径', () => {
    expect(getHandlerSize(32)).toBe(28)
  })

  it('高度为 4 时圆圈直径为 0', () => {
    expect(getHandlerSize(4)).toBe(0)
  })

  it('高度小于留白时下限为 0, 避免生成负尺寸样式', () => {
    expect(getHandlerSize(2)).toBe(0)
  })
})

describe('getNextToggleable', () => {
  it('关闭状态向右拖 (切换方向) 允许切换', () => {
    expect(getNextToggleable(false, 5)).toBe(true)
  })

  it('关闭状态向右拖很远仍允许切换', () => {
    expect(getNextToggleable(false, 100)).toBe(true)
  })

  it('开启状态向左拖 (切换方向) 允许切换', () => {
    expect(getNextToggleable(true, -5)).toBe(true)
  })

  it('开启状态向左拖很远仍允许切换', () => {
    expect(getNextToggleable(true, -100)).toBe(true)
  })

  it('关闭状态向左 (反向) 拖未达到阈值仍允许切换', () => {
    expect(getNextToggleable(false, -9)).toBe(true)
  })

  it('开启状态向右 (反向) 拖未达到阈值仍允许切换', () => {
    expect(getNextToggleable(true, 9)).toBe(true)
  })

  it('反向拖动恰好达到 10px 取消阈值时禁止切换', () => {
    expect(getNextToggleable(false, -10)).toBe(false)
    expect(getNextToggleable(true, 10)).toBe(false)
  })

  it('未拖动 (dx 为 0) 时允许切换', () => {
    expect(getNextToggleable(false, 0)).toBe(true)
    expect(getNextToggleable(true, 0)).toBe(true)
  })
})
