/*
 * 带标签的回复框
 * @Author: czy0729
 * @Date: 2019-06-10 22:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-23 04:57:07
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { observer } from 'mobx-react'
import TextareaItem from '@ant-design/react-native/lib/textarea-item'
import { _ } from '@stores'
import {
  date,
  desc,
  getStorage,
  getTimestamp,
  info,
  open,
  setStorage,
  stl
} from '@utils'
import { IOS, HOST_IMAGE_UPLOAD, SCROLL_VIEW_RESET_PROPS, WSA } from '@constants'
import { BlurView } from '../@/ant-design/modal/blur-view'
import { Text } from '../text'
import { Bgm } from '../bgm'
import { Flex } from '../flex'
import { Iconfont } from '../iconfont'
import { KeyboardSpacer } from '../keyboard-spacer'
import { Touchable } from '../touchable'
import {
  MAX_BGM_HISTORY_COUNT,
  MAX_HISTORY_COUNT,
  NAMESPACE,
  SOURCE_FLAG,
  SOURCE_TEXT
} from './ds'
import { memoStyles } from './styles'
import { Props as FixedTextareaProps } from './types'

export { FixedTextareaProps }

/** 内置键盘切换中、英文高度会变化
 *  因为各种原因，后续就一直用最大的那个值作为高度 */
let maxKeyboardHeight = 0

const BTN_ICONS = {
  加粗: 'icon-bold',
  斜体: 'icon-italic',
  下划: 'icon-underline',
  删除: 'icon-strikethrough',
  剧透: 'icon-hide',
  链接: 'icon-link',
  图片: 'icon-image',
  图床: 'icon-layer'
} as const

const BTN_TEXT = [
  'icon-bold',
  'icon-italic',
  'icon-underline',
  'icon-strikethrough'
] as const

export const FixedTextarea = observer(
  class FixedTextareaComponent extends React.Component<FixedTextareaProps> {
    static defaultProps: FixedTextareaProps = {
      value: '',
      placeholder: '',
      simple: false,
      source: false,
      marks: [],
      onClose: () => {},
      onChange: () => {},
      onSubmit: () => {}
    }

    state = {
      value: this.props.value,
      showTextarea: false,
      showBgm: false,
      showReplyHistory: false,
      showKeyboardSpacer: false,
      showSource: false,
      showSourceText: true,
      keyboardHeight: 0,
      history: [],
      replyHistory: [],
      lockHistory: ''
    }

    ref: {
      textAreaRef: any
    }

    selection = {
      start: this.props.value.length,
      end: this.props.value.length
    }

    _focused: boolean = false

    async componentDidMount() {
      try {
        const showSource: boolean =
          (await getStorage(`${NAMESPACE}|showSource`)) || false

        let showSourceText: boolean = await getStorage(`${NAMESPACE}|showSourceText`)
        if (typeof showSourceText !== 'boolean') showSourceText = true

        // 15 就是 bgm38
        const history: string = (await getStorage(NAMESPACE)) || '15'
        const bgmHistory = history
          .split(',')
          .filter(item => item !== '')
          .map(item => parseInt(item))
        const replyHistory: string[] =
          (await getStorage(`${NAMESPACE}|replyHistory`)) || []
        const lockHistory: string[] =
          (await getStorage(`${NAMESPACE}|lockHistory`)) || ''

        this.setState({
          showSource,
          showSourceText,
          history: bgmHistory,
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
    connectRef = (ref: { textAreaRef: any }) => {
      return (this.ref = ref)
    }

    /** Textarea.blur */
    onRefBlur = () => {
      try {
        if (typeof this.ref?.textAreaRef?.blur === 'function' && this._focused) {
          this.ref.textAreaRef.blur()
          this._focused = false
        }
      } catch (error) {}
    }

    /** Textarea.focus */
    onRefFocus = () => {
      try {
        if (typeof this.ref?.textAreaRef?.focus === 'function') {
          this.ref.textAreaRef.focus()
          this._focused = true
        }
      } catch (error) {}
    }

    /** 获取焦点回调 */
    onFocus = () => {
      this.setState({
        showTextarea: true,
        showBgm: false,
        showReplyHistory: false
      })

      setTimeout(() => {
        this.onRefFocus()
      }, 0)
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
        this.onRefBlur()
        this.setState({
          showTextarea: false,
          showBgm: false
        })
        if (!simple) this.clear()
      }, 0)
    }

    /** 展开 / 收起键盘 */
    onToggle = (isOpen: boolean, keyboardHeight: number) => {
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
            ? // iOS 弹出第三方键盘会慢一拍, 但是可以肯定至少是 336 高度
              Math.max(336, height)
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
      this.onRefFocus()

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

    /** 获取光标位置 (@todo 失效?) */
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

    /** 显示 bgm 表情选择块 */
    showBgm = () => {
      // 安卓 eject 后, 键盘表现跟 IOS 不一致, 特殊处理
      if (IOS) {
        this.setState({
          showBgm: true,
          showReplyHistory: false
        })

        setTimeout(() => {
          this.onRefBlur()
        }, 0)
        return
      }

      setTimeout(() => {
        this.onRefBlur()

        setTimeout(() => {
          this.setState({
            showBgm: true,
            showReplyHistory: false
          })
        }, 0)
      }, 0)
    }

    /** 隐藏 bgm 表情选择块 */
    hideBgm = () => {
      this.setState({
        showBgm: false
      })

      setTimeout(() => {
        this.onRefFocus()
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
        history = history.filter((item, index) => index < MAX_BGM_HISTORY_COUNT)
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
        replyHistory = replyHistory.filter((item, index) => index < MAX_HISTORY_COUNT)
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

    /** 显示最近回复历史框 */
    showReplyHistory = () => {
      // 安卓 eject 后, 键盘表现跟 IOS 不一致, 特殊处理
      if (IOS) {
        this.setState({
          showReplyHistory: true,
          showBgm: true
        })

        setTimeout(() => {
          this.onRefBlur()
        }, 0)
        return
      }

      setTimeout(() => {
        this.onRefBlur()

        setTimeout(() => {
          this.setState({
            showReplyHistory: true,
            showBgm: true
          })
        }, 0)
      }, 0)
    }

    /** 收起最近回复历史框 */
    hideReplyHistory = () => {
      this.setState({
        showReplyHistory: false
      })

      setTimeout(() => {
        this.onRefFocus()
      }, 0)
    }

    /** 显示 / 隐藏右下角宣传文案 */
    toggleSource = () => {
      const { showSource } = this.state
      const value = !showSource
      this.setState({
        showSource: value
      })
      setStorage(`${NAMESPACE}|showSource`, value)
    }

    /** 显示 / 隐藏左下角宣传文案实际内容 */
    toggleSourceText = () => {
      const { showSourceText } = this.state
      const value = !showSourceText
      this.setState({
        showSourceText: value
      })
      setStorage(`${NAMESPACE}|showSourceText`, value)
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

    renderBtn(text: string, symbol?: string) {
      const textSize = _.window.width < 375 ? 10 : 11
      if (text === 'BGM') {
        const { showBgm, showReplyHistory } = this.state
        return (
          <Touchable
            style={[this.styles.toolBarBtn, _.ml.xs]}
            onPress={() => {
              showBgm ? this.hideBgm() : this.showBgm()
            }}
          >
            <Flex style={this.styles.iconContainer} justify='center'>
              <Iconfont
                name='icon-more-grid'
                color={showBgm && !showReplyHistory ? _.colorMain : _.colorSub}
              />
            </Flex>
          </Touchable>
        )
      }

      if (text === '历史') {
        const { showReplyHistory } = this.state
        return (
          <Touchable
            style={this.styles.toolBarBtn}
            onPress={() => {
              showReplyHistory ? this.hideReplyHistory() : this.showReplyHistory()
            }}
          >
            <Flex style={this.styles.iconContainer} justify='center'>
              <Iconfont
                name='icon-history'
                color={showReplyHistory ? _.colorMain : _.colorSub}
                size={20}
              />
            </Flex>
          </Touchable>
        )
      }

      if (text === '时间') {
        return (
          <Touchable
            style={this.styles.toolBarBtn}
            onPress={() => {
              this.onAddSymbolText(`[${date('Y-m-d H:i', getTimestamp())}] `, true)
            }}
          >
            <Flex style={this.styles.iconContainer} justify='center'>
              <Iconfont name='md-access-time' color={_.colorSub} size={20} />
            </Flex>
          </Touchable>
        )
      }

      const isOpenInNew = text === '图床'
      const iconName = BTN_ICONS[text]
      return (
        <Touchable
          style={stl(
            this.styles.toolBarBtn,
            BTN_TEXT.includes(iconName) && this.styles.iconText
          )}
          onPress={() => {
            isOpenInNew ? open(HOST_IMAGE_UPLOAD) : this.onAddSymbolText(symbol)
          }}
        >
          {iconName ? (
            <Flex style={this.styles.iconContainer} justify='center'>
              <Iconfont name={iconName} color={_.colorSub} size={18} />
            </Flex>
          ) : (
            <Text type='sub' size={textSize} align='center'>
              {text}
            </Text>
          )}
        </Touchable>
      )
    }

    renderToolBar() {
      const { showTextarea, showBgm } = this.state
      if (!(showTextarea || showBgm)) return null

      const { simple } = this.props
      return (
        <Flex style={this.styles.toolBar} wrap='wrap' justify='between'>
          {this.renderBtn('BGM')}
          {simple ? (
            <>{this.renderBtn('时间')}</>
          ) : (
            <>
              {this.renderBtn('加粗', 'b')}
              {this.renderBtn('斜体', 'i')}
              {this.renderBtn('下划', 'u')}
              {this.renderBtn('删除', 's')}
              {this.renderBtn('剧透', 'mask')}
              {this.renderBtn('链接', 'url')}
              {this.renderBtn('图片', 'img')}
            </>
          )}
          {this.renderBtn('图床', 'imgchr')}
          {/* 空占位 */}
          {simple && (
            <>
              <View />
              <View />
              <View />
              <View />
              <View />
              <View />
              <View />
              <View />
              <View />
            </>
          )}
          {this.renderBtn('历史')}
        </Flex>
      )
    }

    renderMarks() {
      const { marks } = this.props
      if (!marks?.length) return null

      const { showSource, showSourceText } = this.state
      return marks
        .filter((item, index) => {
          if (!showSourceText) return index < (showSource ? 3 : 10)
          return index < (showSource ? 2 : 10)
        })
        .map((item: string) => (
          <Touchable
            key={item}
            style={[this.styles.opacity, this.styles.toolBarBtn, _.mr.md]}
            onPress={() => this.onAddSymbolText(item, true)}
          >
            <Text type='sub' size={12} align='center'>
              {item}
            </Text>
          </Touchable>
        ))
    }

    renderCount() {
      const { value } = this.state
      if (!value.length) return null

      return (
        <Text style={_.mr.sm} type='sub' size={11} align='center'>
          {value.length}
        </Text>
      )
    }

    renderSource() {
      const { source } = this.props
      const { showTextarea, showSource, showSourceText } = this.state
      if (!source || !showTextarea) return null

      return (
        <Flex style={this.styles.source}>
          <Flex.Item>
            <Flex>
              {showSource && showSourceText && (
                <Text style={this.styles.opacity} size={11} type='sub'>
                  [来自Bangumi for {IOS ? 'iOS' : 'android'}]
                </Text>
              )}
              {showSource && (
                <Touchable
                  style={[
                    this.styles.opacity,
                    this.styles.toolBarBtnSm,
                    _.mr.md,
                    !showSourceText && _.ml._xs
                  ]}
                  onPress={this.toggleSourceText}
                >
                  <Iconfont
                    name={showSourceText ? 'md-navigate-before' : 'md-navigate-next'}
                    color={_.colorSub}
                    size={18}
                  />
                </Touchable>
              )}
              {this.renderMarks()}
            </Flex>
          </Flex.Item>
          {this.renderCount()}
          <Touchable style={this.styles.touchSource} onPress={this.toggleSource}>
            <Flex>
              <Iconfont
                name={showSource ? 'md-check-circle' : 'md-radio-button-off'}
                size={11}
                color={showSource ? _.colorMain : _.colorSub}
              />
              <Text style={_.ml.xs} type='sub' size={11}>
                宣传语
              </Text>
            </Flex>
          </Touchable>
        </Flex>
      )
    }

    renderTextarea() {
      const { placeholder } = this.props
      const { value, showTextarea, showBgm } = this.state
      const canSend = value !== ''
      const editing = showTextarea || showBgm
      return (
        <View style={this.styles.textareaContainer}>
          <Flex align='start'>
            <Flex.Item style={editing && this.styles.textareaBody}>
              <TextareaItem
                key={String(showTextarea)}
                ref={this.connectRef}
                style={this.styles.textarea}
                value={value}
                placeholder={placeholder || '我要吐槽'}
                placeholderTextColor={_.colorDisabled}
                rows={editing ? 8 : 1}
                selectionColor={_.colorMain}
                clear
                onFocus={this.onFocus}
                onChange={this.onChange}
                onSelectionChange={this.onSelectionChange}
              />
            </Flex.Item>
            <Touchable style={this.styles.touchSend} onPress={this.onSubmit}>
              <Flex style={this.styles.send} justify='center'>
                <Iconfont
                  name='md-send'
                  size={16}
                  color={canSend ? _.colorMain : _.colorSub}
                />
              </Flex>
            </Touchable>
            {this.renderSource()}
          </Flex>
        </View>
      )
    }

    renderContent() {
      const {
        showTextarea,
        showBgm,
        showReplyHistory,
        keyboardHeight,
        history,
        replyHistory,
        lockHistory
      } = this.state
      // 安卓 eject 后, 键盘表现跟 IOS 不一致, 特殊处理
      if (!IOS && !showBgm) return null
      if (!showTextarea || (!WSA && !keyboardHeight)) return null

      return (
        <ScrollView
          style={{
            height: (WSA ? 280 : keyboardHeight) + 1
          }}
          contentContainerStyle={this.styles.bgmContainer}
          {...SCROLL_VIEW_RESET_PROPS}
        >
          {showReplyHistory ? (
            <>
              {replyHistory
                .slice()
                .sort((a, b) =>
                  desc(lockHistory === a ? 1 : 0, lockHistory === b ? 1 : 0)
                )
                .map((item, index) => (
                  <Flex key={index} style={this.styles.replyHistory}>
                    <Flex.Item>
                      <Touchable
                        style={this.styles.replyHistoryItem}
                        onPress={() => this.onChange(item)}
                      >
                        <Text lineHeight={18}>{item}</Text>
                      </Touchable>
                    </Flex.Item>
                    <Touchable
                      style={this.styles.replyHistoryLock}
                      onPress={() => {
                        this.lockHistory(item)
                      }}
                    >
                      <Iconfont
                        name='md-vertical-align-top'
                        color={lockHistory === item ? _.colorMain : _.colorSub}
                        size={18}
                      />
                    </Touchable>
                  </Flex>
                ))}
            </>
          ) : (
            <>
              <Text style={_.container.wind} size={12} type='sub'>
                常用
              </Text>
              <Flex style={this.styles.bgms} wrap='wrap'>
                {history.map((item, index) => (
                  <View key={index} style={this.styles.bgm}>
                    <Touchable onPress={() => this.onSelectBgm(item, false)}>
                      <Flex justify='center'>
                        <Bgm index={item} />
                      </Flex>
                    </Touchable>
                  </View>
                ))}
              </Flex>
              <Text style={[_.container.wind, _.mt.sm]} size={12} type='sub'>
                全部
              </Text>
              <Flex style={this.styles.bgms} wrap='wrap'>
                {Array.from(new Array(100)).map((item, index) => (
                  <View key={index + 1} style={this.styles.bgm}>
                    <Touchable onPress={() => this.onSelectBgm(index + 1)}>
                      <Flex justify='center'>
                        <Bgm index={index + 1} />
                      </Flex>
                    </Touchable>
                  </View>
                ))}
              </Flex>
            </>
          )}
        </ScrollView>
      )
    }

    renderMask() {
      const { showTextarea, showBgm } = this.state
      if (!(showTextarea || showBgm)) return null

      return (
        <View style={this.styles.maskContainer}>
          <Touchable
            withoutFeedback
            onPress={() => {
              const { simple } = this.props
              if (!simple) this.checkIsNeedToSaveDraft()
              this.onBlur()
            }}
          >
            <View style={this.styles.mask} />
          </Touchable>
        </View>
      )
    }

    renderBody() {
      const { children } = this.props
      return (
        <>
          {children}
          {this.renderToolBar()}
          {this.renderTextarea()}
          {this.renderContent()}
        </>
      )
    }

    render() {
      const { showKeyboardSpacer } = this.state
      return (
        <>
          {this.renderMask()}
          {IOS ? (
            <BlurView style={this.styles.container}>{this.renderBody()}</BlurView>
          ) : (
            <View style={[this.styles.container, this.styles.plain]}>
              {this.renderBody()}
            </View>
          )}
          {!showKeyboardSpacer && (
            <View style={this.styles.hide}>
              <KeyboardSpacer onToggle={this.onToggle} />
            </View>
          )}
        </>
      )
    }

    get styles() {
      return memoStyles()
    }
  }
)
