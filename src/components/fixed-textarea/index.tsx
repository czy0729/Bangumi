/*
 * 带标签的回复框
 * @Author: czy0729
 * @Date: 2019-06-10 22:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-16 04:25:56
 */
import React from 'react'
import { ScrollView, View, TouchableWithoutFeedback } from 'react-native'
import { observer } from 'mobx-react'
import TextareaItem from '@ant-design/react-native/lib/textarea-item'
import { _ } from '@stores'
import { date, getStorage, setStorage, open, getTimestamp } from '@utils'
import { IOS, HOST_IMAGE_UPLOAD, SCROLL_VIEW_RESET_PROPS, WSA } from '@constants'
import { BlurView } from '../@/ant-design/modal/blur-view'
import { Text } from '../text'
import { Bgm } from '../bgm'
import { Flex } from '../flex'
import { Iconfont } from '../iconfont'
import { KeyboardSpacer } from '../keyboard-spacer'
import { Touchable } from '../touchable'
import { NAMESPACE, MAX_HISTORY_COUNT, SOURCE_FLAG, SOURCE_TEXT } from './ds'
import { memoStyles } from './styles'
import { Props as FixedTextareaProps } from './types'

export { FixedTextareaProps }

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
      keyboardHeight: 0,
      history: [],
      replyHistory: []
    }

    ref: { textAreaRef: any }

    selection = {
      start: this.props.value.length,
      end: this.props.value.length
    }

    async componentDidMount() {
      try {
        const showSource = (await getStorage(`${NAMESPACE}|showSource`)) || false
        const history = (await getStorage(NAMESPACE)) || '15' // 15 就是 bgm38
        const bgmHistory = history
          .split(',')
          .filter(item => item !== '')
          .map(item => parseInt(item))
        const replyHistory = (await getStorage(`${NAMESPACE}|replyHistory`)) || []

        this.setState({
          showSource,
          history: bgmHistory,
          replyHistory
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

    connectRef = (ref: { textAreaRef: any }) => (this.ref = ref)

    onRefBlur = () => {
      try {
        if (typeof this.ref?.textAreaRef?.blur === 'function') {
          this.ref.textAreaRef.blur()
        }
      } catch (error) {}
    }

    onToggle = (isOpen: boolean, keyboardHeight: number) => {
      if (isOpen) {
        this.setState({
          showKeyboardSpacer: true,
          keyboardHeight: keyboardHeight - (IOS ? 24 : 0)
        })
      }
    }

    onFocus = () => {
      this.setState({
        showTextarea: true,
        showBgm: false,
        showReplyHistory: false
      })

      setTimeout(() => {
        this.textAreaFocus()
      }, 0)
    }

    onBlur = () => {
      const { onClose } = this.props
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
      }, 0)
    }

    onChange = (value: string) => {
      const { onChange } = this.props
      onChange(value)

      // 安卓设置过光标后, 继续打字光标会闪回到上次设置的地方, 需要重置
      try {
        if (!IOS) {
          if (typeof this.ref?.textAreaRef?.setNativeProps === 'function') {
            this.ref.textAreaRef.setNativeProps({
              selection: {}
            })
          }
        }
      } catch (error) {}

      this.setState({
        value
      })
    }

    onSelectionChange = (event: { nativeEvent: any }) => {
      const { nativeEvent } = event
      this.selection = nativeEvent.selection
    }

    // @todo 暂时没有对选择了一段文字的情况做判断
    onAddSymbolText = (symbol: string, isText: boolean = false) => {
      this.textAreaFocus()

      try {
        const { value } = this.state
        const index = this.getSelection() || 0

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

    // 选择bgm表情
    onSelectBgm = (bgmIndex: number) => {
      const { value } = this.state
      const index = this.getSelection()

      // 插入值, 如(bgm38), bgm名称跟文件名偏移量是23
      const left = `${value.slice(0, index)}(bgm${Number(bgmIndex) + 23})`
      const right = `${value.slice(index)}`
      this.setState({
        value: `${left}${right}`
      })
      this.setSelection(left.length)
      this.setRecentUseBgm(bgmIndex)
    }

    // 提交 (完了要保存历史)
    onSubmit = () => {
      const { value } = this.state
      if (value === '') return

      const { onSubmit } = this.props
      onSubmit(this.value)
      this.setReplyHistory(value)

      this.clear()
      this.onBlur()
    }

    clear = () => {
      const { onClose } = this.props
      onClose()

      this.setState({
        value: '',
        showTextarea: false
      })
    }

    // 获取光标位置
    getSelection = () => {
      // @todo 失效?
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

    // 设定光标位置
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

    hideBgm = () => {
      this.setState({
        showBgm: false
      })

      setTimeout(() => {
        this.textAreaFocus()
      }, 0)
    }

    // 本地化最近使用 bgm
    setRecentUseBgm = async (bgmIndex: number) => {
      let history = [...this.state.history]
      if (history.includes(bgmIndex)) {
        history = history.filter(item => item !== bgmIndex)
        history.unshift(bgmIndex)
      } else {
        history.unshift(bgmIndex)
      }
      if (history.length > MAX_HISTORY_COUNT) {
        history = history.filter((item, index) => index < MAX_HISTORY_COUNT)
      }

      this.setState({
        history
      })
      setStorage(NAMESPACE, history.join())
    }

    // 本地化最近的回复
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

      this.setState({
        replyHistory
      })
      setStorage(`${NAMESPACE}|replyHistory`, replyHistory)
    }

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

    hideReplyHistory = () => {
      this.setState({
        showReplyHistory: false
      })

      setTimeout(() => {
        this.textAreaFocus()
      }, 0)
    }

    toggleSource = () => {
      const { showSource } = this.state
      const newShowSource = !showSource
      this.setState({
        showSource: newShowSource
      })
      setStorage(`${NAMESPACE}|showSource`, newShowSource)
    }

    textAreaFocus = () => {
      try {
        if (typeof this.ref?.textAreaRef?.focus === 'function') {
          this.ref.textAreaRef.focus()
        }
      } catch (error) {}
    }

    get value() {
      const { source } = this.props
      const { value, showSource } = this.state
      if (!source || !showSource || value.includes(SOURCE_FLAG)) return value
      return `${value}${SOURCE_TEXT}`
    }

    renderBtn(text: string, symbol?: string) {
      const size = _.window.width < 375 ? 10 : 11
      if (text === 'BGM') {
        const { showBgm, showReplyHistory } = this.state
        return (
          <Touchable
            style={this.styles.toolBarBtn}
            onPress={() => {
              if (showBgm) {
                this.hideBgm()
              } else {
                this.showBgm()
              }
            }}
          >
            <Text type={showBgm && !showReplyHistory ? 'main' : 'sub'} size={size}>
              {text}
            </Text>
          </Touchable>
        )
      }

      if (text === '历史') {
        const { showReplyHistory } = this.state
        return (
          <Touchable
            style={this.styles.toolBarBtn}
            onPress={() => {
              if (showReplyHistory) {
                this.hideReplyHistory()
              } else {
                this.showReplyHistory()
              }
            }}
          >
            <Text type={showReplyHistory ? 'main' : 'sub'} size={size} align='center'>
              {text}
            </Text>
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
            <Text type='sub' size={size} align='center'>
              {text}
            </Text>
          </Touchable>
        )
      }

      const isOpenInNew = text === '图床'
      return (
        <Touchable
          style={this.styles.toolBarBtn}
          onPress={() => {
            if (isOpenInNew) {
              open(HOST_IMAGE_UPLOAD)
            } else {
              this.onAddSymbolText(symbol)
            }
          }}
        >
          <Flex>
            <Text type='sub' size={size} align='center'>
              {text}
            </Text>
            {isOpenInNew && (
              <Iconfont style={_.ml.xxs} name='md-open-in-new' size={size + 1} />
            )}
          </Flex>
        </Touchable>
      )
    }

    renderToolBar() {
      const { showTextarea, showBgm } = this.state
      if (!(showTextarea || showBgm)) return null

      const { simple } = this.props
      return (
        <Flex
          style={this.styles.toolBar}
          wrap='wrap'
          justify={simple ? undefined : 'between'}
        >
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
          {this.renderBtn('历史')}
        </Flex>
      )
    }

    renderMarks() {
      const { marks } = this.props
      if (!marks?.length) return null

      return marks.map((item: string) => (
        <Touchable
          key={item}
          style={[this.styles.opacity, this.styles.toolBarBtn, _.mr.xs]}
          onPress={() => this.onAddSymbolText(item, true)}
        >
          <Text type='sub' size={11} align='center'>
            {item}
          </Text>
        </Touchable>
      ))
    }

    renderSource() {
      const { source } = this.props
      const { showTextarea, showSource } = this.state
      if (!source || !showTextarea) return null

      return (
        <Flex style={this.styles.source}>
          <Flex.Item>
            <Flex>
              {showSource && (
                <Text style={[this.styles.opacity, _.mr.sm]} size={10} type='sub'>
                  [来自Bangumi for {IOS ? 'iOS' : 'android'}]
                </Text>
              )}
              {this.renderMarks()}
            </Flex>
          </Flex.Item>
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
      return (
        <View style={this.styles.textareaContainer}>
          <Flex align='start'>
            <Flex.Item>
              <TextareaItem
                ref={this.connectRef}
                style={this.styles.textarea}
                value={value}
                placeholder={placeholder || '我要吐槽'}
                placeholderTextColor={_.colorDisabled}
                rows={showTextarea || showBgm ? 6 : 1}
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
                  size={18}
                  color={canSend ? _.colorMain : _.colorIcon}
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
        replyHistory
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
              {replyHistory.map((item, index) => (
                <Touchable
                  key={index}
                  style={this.styles.replyHistory}
                  onPress={() => this.onChange(item)}
                >
                  <Text lineHeight={18}>{item}</Text>
                </Touchable>
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
                    <Touchable onPress={() => this.onSelectBgm(item)}>
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
          <TouchableWithoutFeedback onPress={this.onBlur}>
            <View style={this.styles.mask} />
          </TouchableWithoutFeedback>
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
