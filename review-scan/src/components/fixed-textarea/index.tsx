/*
 * @Author: czy0729
 * @Date: 2019-06-10 22:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-14 18:15:39
 */
import React from 'react'
import { TextInput } from 'react-native'
import { observer } from 'mobx-react'
import { getStorage, info, setStorage } from '@utils'
import { r } from '@utils/dev'
import { FROZEN_FN, IOS, WEB } from '@constants'
import { KeyboardSpacer } from '../keyboard-spacer'
import Container from './container'
import Content from './content'
import Mask from './mask'
import Textarea from './textarea'
import ToolBar from './tool-bar'
import {
  COMPONENT,
  MAX_BGM_HISTORY_COUNT,
  MAX_HISTORY_COUNT,
  NAMESPACE,
  SOURCE_FLAG,
  SOURCE_TEXT
} from './ds'
import { Props as FixedTextareaProps } from './types'

export { FixedTextareaProps }

/** 内置键盘切换中、英文高度会变化, 因为各种原因，后续就一直用最大的那个值作为高度 */
let maxKeyboardHeight = 0

/** 带表情的回复框 */
export const FixedTextarea = observer(
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
      showBgm: false,
      showKeyboardSpacer: false,
      showReplyHistory: false,
      showSource: false,
      showSourceText: true,
      showTextarea: false,
      keyboardHeight: 0,
      history: [],
      replyHistory: [],
      lockHistory: ''
    }

    ref: {
      textAreaRef: TextInput
    }

    selection = {
      start: this.props.value.length,
      end: this.props.value.length
    }

    private _focused: boolean = false

    async componentDidMount() {
      try {
        const [
          showSource = false,
          showSourceText = true,
          history = '15', // 15 就是 (bgm38)
          replyHistory = [],
          lockHistory = ''
        ] = await Promise.all([
          getStorage(`${NAMESPACE}|showSource`),
          getStorage(`${NAMESPACE}|showSourceText`),
          getStorage(NAMESPACE),
          getStorage(`${NAMESPACE}|replyHistory`),
          getStorage(`${NAMESPACE}|lockHistory`)
        ])

        this.setState({
          showSource,
          showSourceText: typeof showSourceText === 'boolean' ? showSourceText : true,
          history: history.split(',').filter(Boolean).map(Number),
          replyHistory,
          lockHistory
        })
      } catch (error) {
        console.error('fixed-textarea', 'componentDidMount', error)
      }
    }

    UNSAFE_componentWillReceiveProps(nextProps: { value: any }) {
      const { value } = nextProps
      if (value !== this.state.value) {
        this.setState({
          value
        })
      }
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
      } catch (error) {}
    }

    /** Textarea.focus */
    refFocus = () => {
      if (this._focused) return

      try {
        if (typeof this.ref?.textAreaRef?.focus === 'function') {
          this.ref.textAreaRef.focus()
          this._focused = true
        }
      } catch (error) {}
    }

    /** 失去焦点回调 */
    onBlur = () => {
      const { simple, onClose } = this.props
      onClose()

      this.setState({
        showTextarea: false,
        showBgm: false,
        showReplyHistory: false,
        showKeyboardSpacer: false
      })

      setTimeout(() => {
        this.refBlur()
        this.setState({
          showTextarea: false,
          showBgm: false
        })
        if (!simple) this.clear()
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
      } catch (error) {}

      this.setState({
        value
      })
    }

    /** 光标改变回调 */
    onSelectionChange = (event: { nativeEvent: any }) => {
      const { nativeEvent } = event
      this.selection = nativeEvent.selection
    }

    /** 模拟 BBCode 输入 */
    onAddSymbolText = (symbol: string, isText: boolean = false) => {
      this.refFocus()

      try {
        const { value } = this.state
        const index = this.getSelection() || 0

        // @todo 暂时没有对选择了一段文字的情况做判断
        // 插入值, 如[s]光标位置[/s], [url=光标位置]链接描述[/url]
        let left: string
        let right: string
        if (isText) {
          left = `${value.slice(0, index)}${symbol}`
          right = `${value.slice(index)}`
        } else if (symbol === 'url') {
          left = `${value.slice(0, index)}[url=`
          right = `]链接描述[/url]${value.slice(index)}`
        } else {
          left = `${value.slice(0, index)}[${symbol}]`
          right = `[/${symbol}]${value.slice(index)}`
        }

        this.setState({
          value: `${left}${right}`
        })
        this.setSelection(left.length)
      } catch (error) {}
    }

    /** 选择 bgm 表情 */
    onSelectBgm = (bgmIndex: number, updateRecent: boolean = true) => {
      const { value } = this.state
      const index = this.getSelection()

      // 插入值, 如 (bgm38), bgm 名称跟文件名偏移量是 23
      const left = `${value.slice(0, index)}(bgm${Number(bgmIndex) + 23})`
      const right = `${value.slice(index)}`
      this.setState({
        value: `${left}${right}`
      })
      this.setSelection(left.length)
      if (updateRecent) this.setRecentUseBgm(bgmIndex)
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

    /** @todo 获取光标位置 */
    getSelection = () => {
      // const ref = this.ref.textAreaRef
      // const selection = ref._lastNativeSelection || null
      // const { value } = this.state
      // let index = value.length
      // if (selection) {
      //   index = selection.start
      // }
      // return index
      return this.selection.end
    }

    /** 设定光标位置 */
    setSelection = (start: number) => {
      const { textAreaRef } = this.ref
      setTimeout(() => {
        try {
          const selection = {
            start,
            end: start
          }

          textAreaRef.setNativeProps({
            selection
          })
          this.selection = selection
        } catch (error) {}
      }, 0)
    }

    /** 本地化最近使用 bgm 表情 */
    setRecentUseBgm = async (bgmIndex: number) => {
      let history = [...this.state.history]
      if (history.includes(bgmIndex)) {
        history = history.filter(item => item !== bgmIndex)
        history.unshift(bgmIndex)
      } else {
        history.unshift(bgmIndex)
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
    lockHistory = (text: string) => {
      if (!text) return false

      const { lockHistory } = this.state
      const value = lockHistory === text ? '' : text
      this.setState({
        lockHistory: value
      })
      setStorage(`${NAMESPACE}|lockHistory`, value)
    }

    /** 检查草稿是否未发送, 收起输入框时保存草稿到回复历史中 */
    checkIsNeedToSaveDraft = () => {
      const { value } = this.state
      if (value) {
        this.setReplyHistory(value)
        info('草稿已保存到历史回复中')
      }
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
        showBgm,
        showReplyHistory,
        showSource,
        showSourceText,
        showTextarea,
        keyboardHeight,
        history,
        replyHistory,
        lockHistory
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
            onChange={this.onChange}
            onSelectBgm={this.onSelectBgm}
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
)

export default FixedTextarea
