/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-30 07:05:41
 */
import React from 'react'
import { observer } from 'mobx-react'
import { feedback, getStorage, setStorage } from '@utils'
import { r } from '@utils/dev'
import { FROZEN_FN, IOS, WEB } from '@constants'
import { KeyboardSpacer } from '../keyboard-spacer'
import { BBCODE_CONFIG, insertBBCode } from './bbcode'
import Container from './container'
import Content from './content'
import Mask from './mask'
import Textarea from './textarea'
import ToolBar from './tool-bar'
import {
  BGM_EMOJIS_GROUP_DATA,
  COMPONENT,
  MAX_BGM_HISTORY_COUNT,
  MAX_HISTORY_COUNT,
  NAMESPACE,
  SOURCE_FLAG,
  SOURCE_TEXT
} from './ds'

import type { TextInput } from 'react-native'
import type { Props as FixedTextareaProps } from './types'
export type { FixedTextareaProps }

/** 内置键盘切换中、英文高度会变化, 因为各种原因，后续就一直用最大的那个值作为高度 */
let maxKeyboardHeight = 0

/** 带表情的回复框 */
class FixedTextareaComponent extends React.Component<FixedTextareaProps> {
  static defaultProps: FixedTextareaProps = {
    marks: [],
    placeholder: '',
    simple: false,
    source: false,
    value: '',
    extraComponent: null,
    onClose: FROZEN_FN,
    onChange: FROZEN_FN,
    onSubmit: FROZEN_FN
  }

  state = {
    value: this.props.value,
    selection: {
      start: this.props.value.length,
      end: this.props.value.length
    },
    showBgm: false,
    showKeyboardSpacer: false,
    showReplyHistory: false,
    showSource: false,
    showSourceText: true,
    showTextarea: false,
    emojisGroupSelectedIndex: 0,
    keyboardHeight: 0,
    history: [],
    replyHistory: [],
    lockHistory: ''
  }

  ref: {
    textAreaRef: TextInput
  }

  private _focused: boolean = false

  async componentDidMount() {
    try {
      const [
        showSource,
        showSourceText,
        history,
        replyHistory,
        lockHistory,
        emojisGroupSelectedIndex
      ] = await Promise.all([
        getStorage(`${NAMESPACE}|showSource`),
        getStorage(`${NAMESPACE}|showSourceText`),
        getStorage(NAMESPACE),
        getStorage(`${NAMESPACE}|replyHistory`),
        getStorage(`${NAMESPACE}|lockHistory`),
        getStorage(`${NAMESPACE}|emojisGroupSelectedIndex`)
      ])

      this.setState({
        showSource: typeof showSource === 'boolean' ? showSource : false,
        showSourceText: typeof showSourceText === 'boolean' ? showSourceText : true,
        history: (history || '38').split(',').filter(Boolean).map(Number),
        replyHistory: replyHistory || [],
        lockHistory: lockHistory || '',
        emojisGroupSelectedIndex: emojisGroupSelectedIndex || 0
      })
    } catch {}
  }

  UNSAFE_componentWillReceiveProps(nextProps: { value: any }) {
    const { value } = nextProps
    if (value !== this.state.value) {
      this.setState({
        value
      })
    }
  }

  componentWillUnmount() {
    const { simple } = this.props
    if (!simple) this.checkIsNeedToSaveDraft()
  }

  /** 保存 Textarea 引用 */
  forwardRef = (ref: { textAreaRef: TextInput }) => {
    this.ref = ref
  }

  /** Textarea.blur */
  refBlur = () => {
    try {
      if (typeof this.ref?.textAreaRef?.blur === 'function' && this._focused) {
        this.ref.textAreaRef.blur()
        this._focused = false
      }
    } catch {}
  }

  /** Textarea.focus */
  refFocus = () => {
    if (this._focused) return

    try {
      if (typeof this.ref?.textAreaRef?.focus === 'function') {
        this.ref.textAreaRef.focus()
        this._focused = true
      }
    } catch {}
  }

  /** 失去焦点回调 */
  onBlur = () => {
    const { simple, onClose } = this.props
    if (!simple) this.checkIsNeedToSaveDraft()

    onClose()
    this.setState({
      showTextarea: false,
      showBgm: false,
      showReplyHistory: false,
      showKeyboardSpacer: false
    })
    setTimeout(() => {
      this.refBlur()
    }, 0)
  }

  /** 获取焦点回调 */
  onFocus = () => {
    this.setState({
      showTextarea: true,
      showBgm: false,
      showReplyHistory: false
    })

    setTimeout(() => {
      this.refFocus()
      // 延迟是为了等待键盘动画结束
    }, 640)
  }

  /** 展开 / 收起键盘 */
  onToggleKeyboard = (isOpen: boolean, keyboardHeight: number) => {
    if (isOpen) {
      let height = keyboardHeight - (IOS ? 24 : 0)
      if (height > maxKeyboardHeight) {
        maxKeyboardHeight = height
      } else {
        height = maxKeyboardHeight
      }

      this.setState({
        showKeyboardSpacer: true,
        keyboardHeight: IOS
          ? Math.max(336, height) // iOS 弹出第三方键盘会慢一拍, 但是可以肯定至少是 336 高度
          : height
      })
    }
  }

  /** 文字改变回调 */
  onChange = (value: string) => {
    const { onChange } = this.props
    onChange(value)

    // 安卓设置过光标后, 继续打字光标会闪回到上次设置的地方, 需要重置
    try {
      if (!IOS && typeof this.ref?.textAreaRef?.setNativeProps === 'function') {
        this.ref.textAreaRef.setNativeProps({
          selection: {}
        })
      }
    } catch {}

    this.setState({
      value
    })
  }

  /** 光标改变回调 */
  onSelectionChange = (event: any) => {
    const selection = event.nativeEvent.selection
    this.setState({
      selection
    })
  }

  /** 模拟 BBCode 输入 */
  onAddSymbolText = (symbol: string, isText: boolean = false) => {
    this.refFocus()

    const { value, selection } = this.state
    const { start, end } = selection

    // 纯文本
    if (isText) {
      const before = value.slice(0, start)
      const after = value.slice(end)
      const nextValue = before + symbol + after
      const cursor = start + symbol.length

      this.setState({
        value: nextValue
      })
      this.setSelection(cursor)
      return
    }

    // BBCode
    const config = BBCODE_CONFIG[symbol]
    if (!config) return

    const result = insertBBCode(value, selection, config.insert)
    this.setState({
      value: result.value
    })
    this.setSelection(result.cursor)
  }
  /** 选择 bgm 表情 */
  onSelectBgm = (key: string | number, updateRecent: boolean = true) => {
    const { value, selection } = this.state
    const id = Number(key)
    const index = selection.end

    // 计算表情占位符文本
    let label = ''
    if (id >= 700) {
      // 700-799 -> (blake_00) - (blake_99)
      const subId = String(id % 100).padStart(2, '0')
      label = `(blake_${subId})`
    } else if (id >= 600) {
      // 600-699 -> (musume_00) - (musume_99)
      const subId = String(id % 100).padStart(2, '0')
      label = `(musume_${subId})`
    } else {
      // 其他 -> (bgm01), (bgm123) 等
      label = `(bgm${id})`
    }

    // 插入内容
    const left = `${value.slice(0, index)}${label}`
    const right = value.slice(index)

    this.setState({
      value: `${left}${right}`
    })
    this.setSelection(left.length)
    if (updateRecent) this.setRecentUseBgm(id)
  }

  /** 遮罩点击 */
  onMask = () => {
    const { simple } = this.props
    if (!simple) this.checkIsNeedToSaveDraft()
    setTimeout(() => {
      this.onBlur()
    }, 0)
  }

  /** 提交, 之后保存历史 */
  onSubmit = () => {
    const { value } = this.state
    if (value === '') return

    const { onSubmit } = this.props
    onSubmit(this.value)
    this.setReplyHistory(value)
    this.clear()
    this.onBlur()
  }

  /** 显示 bgm 表情选择块 */
  onShowBgm = () => {
    // 安卓 eject 后, 键盘表现跟 IOS 不一致, 特殊处理
    if (IOS) {
      this.setState({
        showBgm: true,
        showReplyHistory: false
      })

      setTimeout(() => {
        this.refBlur()
      }, 0)
      return
    }

    setTimeout(() => {
      this.refBlur()

      setTimeout(() => {
        this.setState({
          showBgm: true,
          showReplyHistory: false
        })
      }, 0)
    }, 0)
  }

  /** 隐藏 bgm 表情选择块 */
  onHideBgm = () => {
    this.setState({
      showBgm: false
    })

    setTimeout(() => {
      this.refFocus()
    }, 0)
  }

  /** 显示最近回复历史框 */
  onShowReplyHistory = () => {
    // 安卓 eject 后, 键盘表现跟 IOS 不一致, 特殊处理
    if (IOS) {
      this.setState({
        showReplyHistory: true,
        showBgm: true
      })

      setTimeout(() => {
        this.refBlur()
      }, 0)
      return
    }

    setTimeout(() => {
      this.refBlur()

      setTimeout(() => {
        this.setState({
          showReplyHistory: true,
          showBgm: true
        })
      }, 0)
    }, 0)
  }

  /** 收起最近回复历史框 */
  onHideReplyHistory = () => {
    this.setState({
      showReplyHistory: false
    })

    setTimeout(() => {
      this.refFocus()
    }, 0)
  }

  /** 显示 / 隐藏右下角宣传文案 */
  onToggleSource = () => {
    const { showSource } = this.state
    const value = !showSource
    this.setState({
      showSource: value
    })
    setStorage(`${NAMESPACE}|showSource`, value)
  }

  /** 显示 / 隐藏左下角宣传文案实际内容 */
  onToggleSourceText = () => {
    const { showSourceText } = this.state
    const value = !showSourceText
    this.setState({
      showSourceText: value
    })
    setStorage(`${NAMESPACE}|showSourceText`, value)
  }

  /** 清空文字 */
  clear = () => {
    const { onClose } = this.props
    onClose()

    this.setState({
      value: '',
      showTextarea: false
    })
    this.setSelection(0)
  }

  /** 设定光标位置 */
  setSelection = (start: number) => {
    const { textAreaRef } = this.ref
    const selection = { start, end: start }
    this.setState({
      selection
    })

    requestAnimationFrame(() => {
      try {
        textAreaRef?.setNativeProps?.({
          selection
        })
      } catch {}
    })
  }

  /** 本地化最近使用 bgm 表情 */
  setRecentUseBgm = async (id: number) => {
    let history = [...this.state.history]
    if (history.includes(id)) {
      history = history.filter(item => item !== id)
      history.unshift(id)
    } else {
      history.unshift(id)
    }
    if (history.length > MAX_BGM_HISTORY_COUNT) {
      history = history.filter((_item, index) => index < MAX_BGM_HISTORY_COUNT)
    }

    this.setState({
      history
    })
    setStorage(NAMESPACE, history.join())
  }

  /** 本地化最近的回复 */
  setReplyHistory = async (value: string) => {
    let replyHistory = [...this.state.replyHistory]
    if (replyHistory.includes(value)) {
      replyHistory = replyHistory.filter(item => item !== value)
      replyHistory.unshift(value)
    } else {
      replyHistory.unshift(value)
    }

    if (replyHistory.length > MAX_HISTORY_COUNT) {
      replyHistory = replyHistory.filter((_item, index) => index < MAX_HISTORY_COUNT)
    }

    const { lockHistory } = this.state
    if (lockHistory && !replyHistory.includes(lockHistory)) {
      replyHistory.unshift(lockHistory)
    }

    this.setState({
      replyHistory
    })
    setStorage(`${NAMESPACE}|replyHistory`, replyHistory)
  }

  /** 锁定某个最近的回复, 不会被替代 */
  onLockHistory = (text: string) => {
    if (!text) return false

    const { lockHistory } = this.state
    const value = lockHistory === text ? '' : text
    this.setState({
      lockHistory: value
    })
    feedback(true)
    setStorage(`${NAMESPACE}|lockHistory`, value)
  }

  /** 选择表情组 */
  onEmojisGroupChange = (label: string) => {
    let emojisGroupSelectedIndex = BGM_EMOJIS_GROUP_DATA.findIndex(item => item === label)
    if (emojisGroupSelectedIndex === -1) emojisGroupSelectedIndex = 0

    this.setState({
      emojisGroupSelectedIndex
    })
    setStorage(`${NAMESPACE}|emojisGroupSelectedIndex`, emojisGroupSelectedIndex)
  }

  /** 检查草稿是否未发送, 收起输入框时保存草稿到回复历史中 */
  checkIsNeedToSaveDraft = () => {
    const { value } = this.state
    if (value) this.setReplyHistory(value)
  }

  get value() {
    const { source } = this.props
    const { value, showSource } = this.state
    if (!source || !showSource || value.includes(SOURCE_FLAG)) return value
    return `${value}${SOURCE_TEXT}`
  }

  get editing() {
    const { showTextarea, showBgm } = this.state
    return showTextarea || showBgm
  }

  renderBody() {
    const { placeholder, simple, source, marks, children, extraComponent } = this.props
    const {
      value,
      selection,
      showBgm,
      showReplyHistory,
      showSource,
      showSourceText,
      showTextarea,
      keyboardHeight,
      history,
      replyHistory,
      lockHistory,
      emojisGroupSelectedIndex
    } = this.state

    return (
      <>
        {children}
        <ToolBar
          simple={simple}
          showBgm={showBgm}
          showReplyHistory={showReplyHistory}
          showTextarea={showTextarea}
          onAddSymbolText={this.onAddSymbolText}
          onHideBgm={this.onHideBgm}
          onHideReplyHistory={this.onHideReplyHistory}
          onShowBgm={this.onShowBgm}
          onShowReplyHistory={this.onShowReplyHistory}
        />
        <Textarea
          forwardRef={this.forwardRef}
          simple={simple || !extraComponent}
          marks={marks}
          source={source}
          placeholder={placeholder}
          value={value}
          selection={selection}
          editing={this.editing}
          showSource={showSource}
          showSourceText={showSourceText}
          showTextarea={showTextarea}
          onAddSymbolText={this.onAddSymbolText}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onSelectionChange={this.onSelectionChange}
          onSubmit={this.onSubmit}
          onToggleSource={this.onToggleSource}
          onToggleSourceText={this.onToggleSourceText}
        />
        <Content
          keyboardHeight={keyboardHeight}
          history={history}
          replyHistory={replyHistory}
          lockHistory={lockHistory}
          showBgm={showBgm}
          showReplyHistory={showReplyHistory}
          showTextarea={showTextarea}
          emojisGroupSelectedIndex={emojisGroupSelectedIndex}
          onChange={this.onChange}
          onSelectBgm={this.onSelectBgm}
          onLockHistory={this.onLockHistory}
          onEmojisGroupChange={this.onEmojisGroupChange}
        />
      </>
    )
  }

  render() {
    r(COMPONENT)

    if (WEB) return null

    const { extraComponent } = this.props
    const { showTextarea, showBgm, showReplyHistory, showKeyboardSpacer } = this.state
    return (
      <>
        <Mask showTextarea={showTextarea} showBgm={showBgm} onMask={this.onMask} />
        <Container>
          {this.renderBody()}
          <KeyboardSpacer
            animate={!(showBgm || showReplyHistory) && !showKeyboardSpacer}
            onToggle={this.onToggleKeyboard}
          />
        </Container>
        {!this.editing && extraComponent}
      </>
    )
  }
}

/** 带表情的回复框 */
const FixedTextarea = observer(FixedTextareaComponent)

export { FixedTextarea }

export default FixedTextarea

/** 提取出类的实例类型 */
export type FixedTextareaInstance = InstanceType<typeof FixedTextareaComponent>
