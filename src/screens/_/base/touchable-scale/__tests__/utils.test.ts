/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:26:48
 */
import {
  COMMIT_LOCK,
  HOLD_DELAY,
  NAVIGATE_DELAY,
  PRESS_TIMINGS,
  RESTORE_DELAY,
  TAP_DIP_DURATION,
  TAP_RESTORE_DURATION
} from '../ds'
import { createPressController, resetCommitLock } from '../utils'

/** 可断言的注入动作 */
type MockActions = {
  pressDown: jest.Mock
  springBack: jest.Mock
  timedBack: jest.Mock
  tapPulse: jest.Mock
  commit: jest.Mock
  isScrolling: jest.Mock
}

/** 构造可断言的注入动作 (isScrolling 可动态改变) */
function createActions(scrolling: boolean = false): MockActions {
  return {
    pressDown: jest.fn(),
    springBack: jest.fn(),
    timedBack: jest.fn(),
    tapPulse: jest.fn(),
    commit: jest.fn(),
    isScrolling: jest.fn(() => scrolling)
  }
}

beforeEach(() => {
  jest.useFakeTimers()
  resetCommitLock()
})

afterEach(() => {
  jest.useRealTimers()
})

describe('createPressController', () => {
  it('按住时间不足 HOLD_DELAY 就抬手: 不缩放也不跳转', () => {
    const actions = createActions()
    const ctrl = createPressController(actions)

    ctrl.pressIn()
    jest.advanceTimersByTime(HOLD_DELAY - 1)
    ctrl.pressOut()
    jest.advanceTimersByTime(1000)

    expect(actions.pressDown).not.toHaveBeenCalled()
    expect(actions.springBack).not.toHaveBeenCalled()
    expect(actions.tapPulse).not.toHaveBeenCalled()
    expect(actions.commit).not.toHaveBeenCalled()
  })

  it('按住超过 HOLD_DELAY 后缩小, 抬手时回弹', () => {
    const actions = createActions()
    const ctrl = createPressController(actions)

    ctrl.pressIn()
    jest.advanceTimersByTime(HOLD_DELAY)
    expect(actions.pressDown).toHaveBeenCalledTimes(1)

    ctrl.pressOut()
    jest.advanceTimersByTime(RESTORE_DELAY)
    expect(actions.springBack).toHaveBeenCalledTimes(1)
  })

  it('列表滚动中按住不缩放, 避免一滑就抖', () => {
    const actions = createActions(true)
    const ctrl = createPressController(actions)

    ctrl.pressIn()
    jest.advanceTimersByTime(HOLD_DELAY + 500)

    expect(actions.pressDown).not.toHaveBeenCalled()
  })

  it('滑动列表接管手势 (只有 pressOut 没有 press): 已按下则回弹, 不跳转', () => {
    const actions = createActions()
    const ctrl = createPressController(actions)

    ctrl.pressIn()
    jest.advanceTimersByTime(HOLD_DELAY)
    ctrl.pressOut()
    jest.advanceTimersByTime(1000)

    expect(actions.springBack).toHaveBeenCalledTimes(1)
    expect(actions.commit).not.toHaveBeenCalled()
  })

  it('未按下就被取消 (滑动过程中抬手): 不做任何动画', () => {
    const actions = createActions()
    const ctrl = createPressController(actions)

    ctrl.pressIn()
    ctrl.pressOut()
    jest.advanceTimersByTime(1000)

    expect(actions.pressDown).not.toHaveBeenCalled()
    expect(actions.springBack).not.toHaveBeenCalled()
  })

  it('轻点: 播放下压 → 回弹, 动画播完才跳转', () => {
    const actions = createActions()
    const ctrl = createPressController(actions)
    const evt = { pageX: 12, pageY: 34 }

    ctrl.pressIn()
    ctrl.pressOut()
    ctrl.press(evt)

    expect(actions.tapPulse).toHaveBeenCalledTimes(1)
    expect(actions.springBack).not.toHaveBeenCalled()
    expect(actions.commit).not.toHaveBeenCalled()

    jest.advanceTimersByTime(TAP_DIP_DURATION + TAP_RESTORE_DURATION + NAVIGATE_DELAY - 1)
    expect(actions.commit).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1)
    expect(actions.commit).toHaveBeenCalledTimes(1)
    expect(actions.commit).toHaveBeenCalledWith(evt)
  })

  it('轻点时抬手后的回弹计时被取消, 不会先回弹再下压', () => {
    const actions = createActions()
    const ctrl = createPressController(actions)

    ctrl.pressIn()
    ctrl.pressOut()
    ctrl.press()
    jest.advanceTimersByTime(RESTORE_DELAY)

    expect(actions.springBack).not.toHaveBeenCalled()
  })

  it('按住再抬手: 定长回弹结束后跳转, 且不播轻点脉冲', () => {
    const actions = createActions()
    const ctrl = createPressController(actions)
    const evt = { pageX: 1 }

    ctrl.pressIn()
    jest.advanceTimersByTime(HOLD_DELAY)
    ctrl.pressOut()
    ctrl.press(evt)

    expect(actions.timedBack).toHaveBeenCalledTimes(1)
    expect(actions.tapPulse).not.toHaveBeenCalled()
    expect(actions.commit).not.toHaveBeenCalled()

    jest.advanceTimersByTime(TAP_RESTORE_DURATION + NAVIGATE_DELAY)
    expect(actions.commit).toHaveBeenCalledTimes(1)
    expect(actions.commit).toHaveBeenCalledWith(evt)
  })

  it('同一次按压内重复 pressIn 不会重复缩小', () => {
    const actions = createActions()
    const ctrl = createPressController(actions)

    ctrl.pressIn()
    ctrl.pressIn()
    jest.advanceTimersByTime(HOLD_DELAY)

    expect(actions.pressDown).toHaveBeenCalledTimes(1)
  })

  it('press 触发的跳转只可能发生一次 (计时器不叠加)', () => {
    const actions = createActions()
    const ctrl = createPressController(actions)

    ctrl.pressIn()
    ctrl.pressOut()
    ctrl.press()
    ctrl.press()
    jest.advanceTimersByTime(TAP_DIP_DURATION + TAP_RESTORE_DURATION + NAVIGATE_DELAY)

    expect(actions.commit).toHaveBeenCalledTimes(1)
  })

  it('全局跳转锁: 锁窗口内跨卡片连点只跳转一次', () => {
    const actionsA = createActions()
    const actionsB = createActions()
    const ctrlA = createPressController(actionsA)
    const ctrlB = createPressController(actionsB)

    // 两张卡先后被轻点, 各自的动画都会播完
    ctrlA.pressIn()
    ctrlA.pressOut()
    ctrlA.press()
    ctrlB.pressIn()
    ctrlB.pressOut()
    ctrlB.press()
    jest.advanceTimersByTime(TAP_DIP_DURATION + TAP_RESTORE_DURATION + NAVIGATE_DELAY)

    expect(actionsA.commit).toHaveBeenCalledTimes(1)
    expect(actionsB.commit).not.toHaveBeenCalled()
  })

  it('超过锁窗口后可以再次跳转', () => {
    const actionsA = createActions()
    const actionsB = createActions()
    const ctrlA = createPressController(actionsA)
    const ctrlB = createPressController(actionsB)

    ctrlA.pressIn()
    ctrlA.pressOut()
    ctrlA.press()
    jest.advanceTimersByTime(TAP_DIP_DURATION + TAP_RESTORE_DURATION + NAVIGATE_DELAY)
    expect(actionsA.commit).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(COMMIT_LOCK)
    ctrlB.pressIn()
    ctrlB.pressOut()
    ctrlB.press()
    jest.advanceTimersByTime(TAP_DIP_DURATION + TAP_RESTORE_DURATION + NAVIGATE_DELAY)

    expect(actionsB.commit).toHaveBeenCalledTimes(1)
  })

  it('dispose 清掉所有挂起计时: 不再缩放与跳转', () => {
    const actions = createActions()
    const ctrl = createPressController(actions)

    ctrl.pressIn()
    ctrl.dispose()
    jest.advanceTimersByTime(1000)
    expect(actions.pressDown).not.toHaveBeenCalled()

    ctrl.press()
    ctrl.dispose()
    jest.advanceTimersByTime(1000)
    expect(actions.commit).not.toHaveBeenCalled()
  })

  it('支持注入自定义时序 (便于按手感调参)', () => {
    const actions = createActions()
    const ctrl = createPressController(actions, {
      ...PRESS_TIMINGS,
      holdDelay: 10
    })

    ctrl.pressIn()
    jest.advanceTimersByTime(9)
    expect(actions.pressDown).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1)
    expect(actions.pressDown).toHaveBeenCalledTimes(1)
  })
})
