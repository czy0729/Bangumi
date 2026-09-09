/*
 * @Author: czy0729
 * @Date: 2026-09-09 06:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 00:17:10
 */
import React from 'react'
import { getStorage, setStorage } from '@utils'
import { NAMESPACE } from '../ds'
import { useKeyboard, usePanelController, useReplyHistory, useTextareaValue } from '../hooks'
import { resetMaxKeyboardHeight } from '../utils'

import type { UsePanelControllerOptions, UseTextareaValueOptions } from '../types'

// RNTL 的 renderHook 因 ensure-peer-deps 严格校验 react-test-renderer 版本不可用,
// 故直接用 react-test-renderer 手写最小 harness; 该包无 TS 类型, requireActual 返回 any 规避
const TestRenderer = jest.requireActual('react-test-renderer')

// React 19 要求显式声明 act 测试环境, 否则 act 内状态更新不生效
;(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true

// jest node 环境无 requestAnimationFrame, 同步执行模拟 (setNativeProps 断言即时生效)
;(globalThis as any).requestAnimationFrame = (cb: (time: number) => void) => {
  cb(Date.now())
  return 0
}

// 屏蔽 react-test-renderer 官方弃用告警 (React 19 起弃用但仍可用), 保留其余错误输出
// eslint-disable-next-line no-console
const originalConsoleError = console.error
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
    if (String(args[0]).includes('react-test-renderer is deprecated')) return
    originalConsoleError(...args)
  })
})

function renderHook<P, T>(useHook: (props: P) => T, initialProps: P) {
  const result = { current: undefined as T }

  function Probe(props: P) {
    result.current = useHook(props)
    return null
  }

  let renderer: any
  TestRenderer.act(() => {
    renderer = TestRenderer.create(React.createElement(Probe, initialProps))
  })
  liveRenderers.push(renderer)

  return {
    result,
    rerender(props: P) {
      TestRenderer.act(() => {
        renderer.update(React.createElement(Probe, props))
      })
    },
    unmount() {
      TestRenderer.act(() => {
        renderer.unmount()
      })
    }
  }
}

/** 跨用例统一卸载遗留 renderer, 避免悬挂 setState 污染后续用例 */
const liveRenderers: any[] = []
afterEach(() => {
  while (liveRenderers.length) {
    const renderer = liveRenderers.pop()
    TestRenderer.act(() => {
      renderer.unmount()
    })
  }
})

function act(fn: () => void) {
  TestRenderer.act(fn)
}

/** 异步 act 必须等待返回的 Promise, 否则 act 作用域被污染影响后续用例 */
async function actAsync(fn: () => Promise<void>) {
  await TestRenderer.act(fn)
}

const createTextTensorRef = () => ({
  current: {
    focus: jest.fn(),
    blur: jest.fn(),
    setNativeProps: jest.fn()
  }
})

describe('useReplyHistory', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('保存回复历史: 头部插入并持久化', () => {
    const { result } = renderHook(() => useReplyHistory(), undefined)

    act(() => {
      result.current.saveReplyHistory('第一条')
    })

    expect(result.current.replyHistory).toEqual(['第一条'])
    expect(setStorage).toHaveBeenCalledWith(`${NAMESPACE}|replyHistory`, ['第一条'])
  })

  it('重复保存去重并置顶', () => {
    const { result } = renderHook(() => useReplyHistory(), undefined)

    act(() => {
      result.current.saveReplyHistory('a')
      result.current.saveReplyHistory('b')
      result.current.saveReplyHistory('a')
    })

    expect(result.current.replyHistory).toEqual(['a', 'b'])
  })

  it('锁定文本不在列表时补到头部', () => {
    const { result } = renderHook(() => useReplyHistory(), undefined)

    act(() => {
      result.current.onLockHistory('置顶')
      result.current.saveReplyHistory('新回复')
    })

    expect(result.current.replyHistory).toEqual(['置顶', '新回复'])
  })

  it('onLockHistory 切换锁定并返回 true', () => {
    const { result } = renderHook(() => useReplyHistory(), undefined)

    act(() => {
      expect(result.current.onLockHistory('a')).toBe(true)
    })
    expect(result.current.lockHistory).toBe('a')

    act(() => {
      expect(result.current.onLockHistory('a')).toBe(true)
    })
    expect(result.current.lockHistory).toBe('')
  })

  it('[问题] 锁定空文本不生效', () => {
    const { result } = renderHook(() => useReplyHistory(), undefined)

    act(() => {
      expect(result.current.onLockHistory('')).toBe(false)
    })
    expect(result.current.lockHistory).toBe('')
  })

  it('记录最近 bgm 表情并持久化', () => {
    const { result } = renderHook(() => useReplyHistory(), undefined)

    act(() => {
      result.current.setRecentUseBgm(20)
      result.current.setRecentUseBgm(38)
      result.current.setRecentUseBgm(20)
    })

    expect(result.current.history).toEqual([20, 38])
    expect(setStorage).toHaveBeenCalledWith(NAMESPACE, [20, 38].join())
  })

  it('[问题] 超出上限从尾部裁剪, 持久化内容同步裁剪', () => {
    const { result } = renderHook(() => useReplyHistory(), undefined)

    act(() => {
      for (let id = 0; id < 9; id++) {
        result.current.setRecentUseBgm(id)
      }
    })

    expect(result.current.history.length).toBe(7)
    expect(setStorage).toHaveBeenLastCalledWith(NAMESPACE, result.current.history.join())
  })

  it('挂载时读取存储, 异常时回退默认值', async () => {
    ;(getStorage as jest.Mock)
      .mockResolvedValueOnce(undefined)
      .mockRejectedValueOnce(new Error('fail'))

    const { result } = renderHook(() => useReplyHistory(), undefined)
    await actAsync(async () => {})

    expect(result.current.history).toEqual([])
    expect(result.current.replyHistory).toEqual([])
    expect(result.current.lockHistory).toBe('')
  })
})

describe('useTextareaValue', () => {
  const createOptions = () => {
    const onChange = jest.fn()
    const focusInput = jest.fn()
    const onSelectRecentBgm = jest.fn()
    const textAreaRef = createTextTensorRef()
    const valueRef = { current: '' }

    return {
      options: {
        value: '',
        cursorEnd: undefined,
        onChange,
        valueRef,
        textAreaRef,
        focusInput,
        onSelectRecentBgm
      } as unknown as UseTextareaValueOptions,
      onChange,
      focusInput,
      onSelectRecentBgm,
      textAreaRef,
      valueRef
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('初始值为外部 value', () => {
    const { options } = createOptions()
    options.value = '初始'

    const { result } = renderHook(props => useTextareaValue(props), options)
    expect(result.current.value).toBe('初始')
  })

  it('handleChange 更新值, 通知 onChange, 并同步镜像 ref', () => {
    const { options, onChange, valueRef } = createOptions()
    const { result } = renderHook(props => useTextareaValue(props), options)

    act(() => {
      result.current.handleChange('新文本')
    })

    expect(onChange).toHaveBeenCalledWith('新文本')
    expect(result.current.value).toBe('新文本')
    expect(valueRef.current).toBe('新文本')
  })

  it('插入纯文本在光标处, 光标后移', () => {
    const { options, focusInput, valueRef } = createOptions()
    const { result } = renderHook(props => useTextareaValue(props), options)

    act(() => {
      result.current.handleChange('abc')
    })

    act(() => {
      result.current.addSymbolText('(bgm20)', true)
    })

    expect(focusInput).toHaveBeenCalled()
    expect(result.current.value).toBe('(bgm20)abc')
    expect(valueRef.current).toBe('(bgm20)abc')
  })

  it('插入非法 BBCode 符号不改变文本', () => {
    const { options, valueRef } = createOptions()
    const { result } = renderHook(props => useTextareaValue(props), options)

    act(() => {
      result.current.handleChange('abc')
    })

    act(() => {
      result.current.addSymbolText('not-exist')
    })

    expect(result.current.value).toBe('abc')
    expect(valueRef.current).toBe('abc')
  })

  it('选择 bgm 表情在光标处插入占位符并记录最近使用', () => {
    const { options, onSelectRecentBgm, valueRef } = createOptions()
    const { result } = renderHook(props => useTextareaValue(props), options)

    act(() => {
      result.current.handleChange('好文')
    })

    act(() => {
      result.current.selectBgm(705)
    })

    expect(result.current.value).toBe('(blake_05)好文')
    expect(valueRef.current).toBe('(blake_05)好文')
    expect(onSelectRecentBgm).toHaveBeenCalledWith(705)
  })

  it('外部 value 变化时同步文本', () => {
    const { options } = createOptions()
    const { result, rerender } = renderHook(props => useTextareaValue(props), options)

    rerender({ ...options, value: '外部插入' })

    expect(result.current.value).toBe('外部插入')
  })

  it('cursorEnd 变化时光标同步到末尾', () => {
    const { options } = createOptions()
    const { result, rerender } = renderHook(props => useTextareaValue(props), options)

    rerender({ ...options, value: '外部插入', cursorEnd: 1 })
    expect(result.current.selection).toEqual({ start: 4, end: 4 })
  })

  it('resetValue 清空文本并复位光标', () => {
    const { options, valueRef } = createOptions()
    const { result } = renderHook(props => useTextareaValue(props), options)

    act(() => {
      result.current.handleChange('abc')
    })

    act(() => {
      result.current.resetValue()
    })

    expect(result.current.value).toBe('')
    expect(valueRef.current).toBe('')
    expect(result.current.selection).toEqual({ start: 0, end: 0 })
  })
})

describe('usePanelController', () => {
  const createOptions = () => {
    const onClose = jest.fn()
    const saveDraft = jest.fn()
    const textAreaRef = createTextTensorRef()

    return {
      options: {
        textAreaRef,
        simple: false,
        onClose,
        saveDraft
      } as unknown as UsePanelControllerOptions,
      onClose,
      saveDraft,
      textAreaRef
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runAllTimers()
    jest.useRealTimers()
  })

  it('handleFocus 展开输入框, 延迟 640ms 聚焦', () => {
    const { options, textAreaRef } = createOptions()
    const { result } = renderHook(props => usePanelController(props), options)

    act(() => {
      result.current.handleFocus()
    })
    expect(result.current.showTextarea).toBe(true)
    expect(result.current.editing).toBe(true)
    expect(textAreaRef.current.focus).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(640)
    })
    expect(textAreaRef.current.focus).toHaveBeenCalledTimes(1)
  })

  it('handleBlur 保存草稿, 通知关闭并复位面板', () => {
    const { options, onClose, saveDraft } = createOptions()
    const { result } = renderHook(props => usePanelController(props), options)

    act(() => {
      result.current.handleFocus()
    })
    act(() => {
      result.current.handleBlur()
    })

    expect(saveDraft).toHaveBeenCalled()
    expect(onClose).toHaveBeenCalled()
    expect(result.current.showTextarea).toBe(false)
    expect(result.current.editing).toBe(false)
  })

  it('显示 bgm 面板后隐藏并重新聚焦', () => {
    const { options, textAreaRef } = createOptions()
    const { result } = renderHook(props => usePanelController(props), options)

    act(() => {
      result.current.handleShowBgm()
    })
    // jest 环境 IOS 为 undefined, 走安卓延迟路径
    act(() => {
      jest.runAllTimers()
    })
    expect(result.current.showBgm).toBe(true)

    act(() => {
      result.current.handleHideBgm()
    })
    expect(result.current.showBgm).toBe(false)

    act(() => {
      jest.runAllTimers()
    })
    expect(textAreaRef.current.focus).toHaveBeenCalled()
  })

  it('[问题] 卸载后遗留定时器被清理, 不再触发聚焦', () => {
    const { options, textAreaRef } = createOptions()
    const { result, unmount } = renderHook(props => usePanelController(props), options)

    act(() => {
      result.current.handleFocus()
    })
    unmount()

    act(() => {
      jest.runAllTimers()
    })
    expect(textAreaRef.current.focus).not.toHaveBeenCalled()
  })

  it('simple 模式 handleBlur 不保存草稿', () => {
    const { options, saveDraft } = createOptions()
    options.simple = true

    const { result } = renderHook(props => usePanelController(props), options)
    act(() => {
      result.current.handleBlur()
    })

    expect(saveDraft).not.toHaveBeenCalled()
  })
})

describe('useKeyboard', () => {
  beforeEach(() => {
    resetMaxKeyboardHeight()
    jest.clearAllMocks()
  })

  it('键盘展开时记录归一后的高度', () => {
    const { result } = renderHook(() => useKeyboard(), undefined)

    act(() => {
      result.current.onToggleKeyboard(true, 800)
    })

    expect(result.current.showKeyboardSpacer).toBe(true)
    // jest 环境 @constants 未提供 IOS, 走 Android 分支直接使用原始高度
    expect(result.current.keyboardHeight).toBe(800)
  })

  it('键盘收起回调被忽略', () => {
    const { result } = renderHook(() => useKeyboard(), undefined)

    act(() => {
      result.current.onToggleKeyboard(false, 800)
    })

    expect(result.current.showKeyboardSpacer).toBe(false)
    expect(result.current.keyboardHeight).toBe(0)
  })

  it('复位后占位状态回到未展示', () => {
    const { result } = renderHook(() => useKeyboard(), undefined)

    act(() => {
      result.current.onToggleKeyboard(true, 800)
    })
    expect(result.current.showKeyboardSpacer).toBe(true)

    act(() => {
      result.current.resetKeyboardSpacer()
    })
    expect(result.current.showKeyboardSpacer).toBe(false)
    expect(result.current.keyboardHeight).toBe(800)
  })
})
