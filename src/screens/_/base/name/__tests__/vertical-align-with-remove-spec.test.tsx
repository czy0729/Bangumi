/*
 * @Author: czy0729
 * @Date: 2026-10-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-08 04:31:01
 *
 * 安卓用户名渲染 (列表复用组件实例时, 用户名必须跟随新的数据)
 */
import { act, render } from '@testing-library/react-native'
import VerticalAlignWithRemoveSpec from '../vertical-align-with-remove-spec'

/**
 * 宿主 Text 替身与样式替身
 *  - 只验证文本随 props 更新, 不引入真实 Text / 主题链路
 */
jest.mock('mobx-react', () => ({ observer: (component: unknown) => component }), {
  virtual: true
})

jest.mock(
  '@components',
  () => ({
    Text: 'Text'
  }),
  { virtual: true }
)

jest.mock(
  '../styles',
  () => ({
    memoStyles: () => ({ highlight: {} })
  }),
  { virtual: true }
)

/**
 * jest 平台为 ios, ../../vertical-align 默认解析到 no-op 实现, onHit 永不触发,
 * 命中分支就测不到; 替身成会回调 onHit 的版本, 覆盖安卓真实链路
 */
jest.mock(
  '../../vertical-align',
  () => {
    const React = require('react')

    // 复用生产实现, 生产改了特殊字符口径时测试会跟着变
    const { removeSpecCharacters } = jest.requireActual('../../vertical-align/utils')

    return {
      VerticalAlign: ({ text, onHit, children }: any) => {
        const [hit, setHit] = React.useState(false)

        React.useEffect(() => {
          const raw = String(text ?? '')
          const removed = removeSpecCharacters(raw)

          // 真实实现只在命中 (memo 或测量) 时回调, 未命中不得回调;
          // 回调发生在渲染之后的布局测量阶段, 用宏任务对齐时序
          if (removed === raw) return

          const timer = setTimeout(() => {
            onHit?.(removed)
            setHit(true)
          }, 0)
          return () => clearTimeout(timer)
        }, [text])

        return React.createElement('Text', { testID: hit ? 'hit' : 'no-hit' }, children)
      }
    }
  },
  { virtual: true }
)

/** 等待布局测量回调 (真实链路回调发生在渲染之后) */
async function flushLayout() {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0))
  })
}

describe('VerticalAlignWithRemoveSpec', () => {
  it('text 变化时显示的文本随之更新', () => {
    const { getByText, queryByText, rerender } = render(
      <VerticalAlignWithRemoveSpec text='Bingo' size={14} lineHeight={14} />
    )

    expect(getByText('Bingo')).toBeTruthy()

    rerender(<VerticalAlignWithRemoveSpec text='XBan' size={14} lineHeight={14} />)

    expect(getByText('XBan')).toBeTruthy()
    expect(queryByText('Bingo')).toBeNull()
  })

  it('命中特殊字符时显示去除后的文本', async () => {
    const { getByText } = render(
      <VerticalAlignWithRemoveSpec text={'A\u0f01B'} size={14} lineHeight={14} />
    )

    await flushLayout()

    expect(getByText('AB')).toBeTruthy()
  })

  it('未命中文本变化时不回调 onHit', async () => {
    const { getByTestId, getByText, rerender } = render(
      <VerticalAlignWithRemoveSpec text='Bingo' size={14} lineHeight={14} />
    )

    await flushLayout()
    expect(getByTestId('no-hit')).toBeTruthy()

    rerender(<VerticalAlignWithRemoveSpec text='XBan' size={14} lineHeight={14} />)

    await flushLayout()
    expect(getByText('XBan')).toBeTruthy()
    expect(getByTestId('no-hit')).toBeTruthy()
  })

  it('text 变为含特殊字符的文本时, 由 onHit 回调去除', async () => {
    const { getByText, rerender } = render(
      <VerticalAlignWithRemoveSpec text='Bingo' size={14} lineHeight={14} />
    )

    expect(getByText('Bingo')).toBeTruthy()

    rerender(<VerticalAlignWithRemoveSpec text={'X\u0f01Ban'} size={14} lineHeight={14} />)

    await flushLayout()

    expect(getByText('XBan')).toBeTruthy()
  })

  it('命中后 text 变化, 回落到当前 text 而不是命中记录', async () => {
    const { getByText, queryByText, rerender } = render(
      <VerticalAlignWithRemoveSpec text={'A\u0f01B'} size={14} lineHeight={14} />
    )

    await flushLayout()
    expect(getByText('AB')).toBeTruthy()

    rerender(<VerticalAlignWithRemoveSpec text='horo' size={14} lineHeight={14} />)

    expect(getByText('horo')).toBeTruthy()
    expect(queryByText('AB')).toBeNull()
  })
})
