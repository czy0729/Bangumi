/* eslint-disable react/no-array-index-key */
/*
 * 带标签的回复框
 * @Author: czy0729
 * @Date: 2019-06-10 22:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-09 14:37:11
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { observer } from 'mobx-react'
import { TextareaItem } from '@ant-design/react-native'
import { _ } from '@stores'
import { getStorage, setStorage } from '@utils'
import { IOS } from '@constants'
import Text from './text'
import Bgm from './bgm'
import Flex from './flex'
import Iconfont from './iconfont'
import KeyboardSpacer from './keyboard-spacer'
import Touchable from './touchable'

const namespace = 'c-fixed-textarea'
const maxHistoryCount = 7 // 最大常用bgm表情数量

export default
@observer
class FixedTextarea extends React.Component {
  static defaultProps = {
    value: '',
    placeholder: '',
    simple: false,
    onClose: Function.prototype,
    onChange: Function.prototype,
    onSubmit: Function.prototype // value => {}
  }

  state = {
    value: this.props.value,
    showTextarea: false,
    showBgm: false,
    showReplyHistory: false,
    showKeyboardSpacer: false,
    keyboardHeight: 0,
    history: [],
    replyHistory: []
  }

  ref

  async componentDidMount() {
    try {
      const history = (await getStorage(namespace)) || '15'
      const bgmHistory = history
        .split(',')
        .filter(item => item !== '')
        .map(item => parseInt(item))
      const replyHistory = (await getStorage(`${namespace}|replyHistory`)) || []

      this.setState({
        history: bgmHistory,
        replyHistory
      })
    } catch (error) {
      warn('fixed-textarea', 'componentDidMount', error)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { value } = nextProps
    if (value !== this.state.value) {
      this.setState({
        value
      })
    }
  }

  onToggle = (open, keyboardHeight) => {
    if (open) {
      this.setState({
        showKeyboardSpacer: true,
        keyboardHeight
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
      this.ref.textAreaRef.focus()
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
      this.ref.textAreaRef.blur()
    }, 0)
  }

  onChange = value => {
    const { onChange } = this.props
    onChange(value)

    this.setState({
      value
    })
  }

  // @todo 暂时没有对选择了一段文字的情况做判断
  onAddSymbolText = symbol => {
    const ref = this.ref.textAreaRef
    ref.focus()

    const { value } = this.state
    const index = this.getSelection()

    // 插入值, 如[s]光标位置[/s]
    const left = `${value.slice(0, index)}[${symbol}]`
    const right = `[/${symbol}]${value.slice(index)}`
    this.setState({
      value: `${left}${right}`
    })

    this.setSelection(left.length)
  }

  // 选择bgm表情
  onSelectBgm = bgmIndex => {
    const { value } = this.state
    const index = this.getSelection()

    // 插入值, 如(bgm38), bgm名称跟文件名偏移量是23
    const left = `${value.slice(0, index)}(bgm${parseInt(bgmIndex) + 23})`
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
    if (value === '') {
      return
    }

    const { onSubmit } = this.props
    onSubmit(value)
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
    const ref = this.ref.textAreaRef
    const selection = ref._lastNativeSelection || null
    const { value } = this.state
    let index = value.length
    if (selection) {
      index = selection.start
    }
    return index
  }

  // 设定光标位置
  setSelection = start => {
    const ref = this.ref.textAreaRef
    setTimeout(() => {
      ref.setNativeProps({
        selection: {
          start,
          end: start
        }
      })
    })
  }

  showBgm = () => {
    // 安卓eject后, 键盘表现跟IOS不一致, 特殊处理
    if (IOS) {
      this.setState({
        showBgm: true,
        showReplyHistory: false
      })

      setTimeout(() => {
        const ref = this.ref.textAreaRef
        ref.blur()
      }, 0)
      return
    }

    setTimeout(() => {
      const ref = this.ref.textAreaRef
      ref.blur()

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
      const ref = this.ref.textAreaRef
      ref.focus()
    }, 0)
  }

  // 本地化最近使用bgm
  setRecentUseBgm = async bgmIndex => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    let history = [...this.state.history]
    if (history.includes(bgmIndex)) {
      history = history.filter(item => item !== bgmIndex)
      history.unshift(bgmIndex)
    } else {
      history.unshift(bgmIndex)
    }
    if (history.length > maxHistoryCount) {
      history = history.filter((item, index) => index < maxHistoryCount)
    }

    this.setState({
      history
    })
    setStorage(namespace, history.join())
  }

  // 本地化最近的回复
  setReplyHistory = async value => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    let replyHistory = [...this.state.replyHistory]
    if (replyHistory.includes(value)) {
      replyHistory = replyHistory.filter(item => item !== value)
      replyHistory.unshift(value)
    } else {
      replyHistory.unshift(value)
    }
    if (replyHistory.length > maxHistoryCount) {
      replyHistory = replyHistory.filter(
        (item, index) => index < maxHistoryCount
      )
    }

    this.setState({
      replyHistory
    })
    setStorage(`${namespace}|replyHistory`, replyHistory)
  }

  showReplyHistory = () => {
    // 安卓eject后, 键盘表现跟IOS不一致, 特殊处理
    if (IOS) {
      this.setState({
        showReplyHistory: true,
        showBgm: true
      })

      setTimeout(() => {
        const ref = this.ref.textAreaRef
        ref.blur()
      }, 0)
      return
    }

    setTimeout(() => {
      const ref = this.ref.textAreaRef
      ref.blur()

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
      const ref = this.ref.textAreaRef
      ref.focus()
    }, 0)
  }

  renderBtn(text, symbol) {
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
          <Text type={showBgm && !showReplyHistory ? 'main' : 'sub'} size={11}>
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
          <Text type={showReplyHistory ? 'main' : 'sub'} size={11}>
            {text}
          </Text>
        </Touchable>
      )
    }

    return (
      <Touchable
        style={this.styles.toolBarBtn}
        onPress={() => this.onAddSymbolText(symbol)}
      >
        <Text type='sub' size={11}>
          {text}
        </Text>
      </Touchable>
    )
  }

  renderToolBar() {
    const { showTextarea, showBgm } = this.state
    if (!(showTextarea || showBgm)) {
      return null
    }

    const { simple } = this.props
    return (
      <Flex style={this.styles.toolBar} wrap='wrap'>
        {this.renderBtn('BGM')}
        {!simple && this.renderBtn('加粗', 'b')}
        {!simple && this.renderBtn('斜体', 'i')}
        {!simple && this.renderBtn('下划', 'u')}
        {!simple && this.renderBtn('删除', 's')}
        {!simple && this.renderBtn('剧透', 'mask')}
        {!simple && this.renderBtn('图片', 'img')}
        {!simple && this.renderBtn('链接', 'url')}
        {this.renderBtn('历史')}
      </Flex>
    )
  }

  renderTextarea() {
    const { placeholder } = this.props
    const { value, showTextarea, showBgm } = this.state
    const canSend = value !== ''
    return (
      <View style={_.container.wind}>
        <Flex style={this.styles.textareaContainer} align='start'>
          <Flex.Item>
            <TextareaItem
              ref={ref => (this.ref = ref)}
              style={this.styles.textarea}
              value={value}
              placeholder={placeholder || '我要吐槽'}
              placeholderTextColor={_.colorDisabled}
              rows={showTextarea || showBgm ? 6 : 1}
              selectionColor={_.colorMain}
              clear
              onFocus={this.onFocus}
              onChange={this.onChange}
            />
          </Flex.Item>
          <Touchable style={this.styles.send} onPress={this.onSubmit}>
            <Iconfont
              name='navigation'
              color={canSend ? _.colorMain : _.colorIcon}
            />
          </Touchable>
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
    // 安卓eject后, 键盘表现跟IOS不一致, 特殊处理
    if (!IOS && !showBgm) {
      return null
    }

    if (!showTextarea || !keyboardHeight) {
      return null
    }

    return (
      <ScrollView
        style={{
          height: keyboardHeight - 2
        }}
        contentContainerStyle={this.styles.bgmContainer}
      >
        {showReplyHistory ? (
          <>
            {replyHistory.map((item, index) => (
              <Touchable
                key={index}
                style={this.styles.replyHistory}
                onPress={() => this.onChange(item)}
              >
                <Text lineHeight={22}>{item}</Text>
              </Touchable>
            ))}
          </>
        ) : (
          <>
            <Text style={_.container.wind} size={12} type='sub'>
              常用
            </Text>
            <Flex wrap='wrap'>
              {history.map((item, index) => (
                <Touchable
                  key={index}
                  style={this.styles.bgm}
                  onPress={() => this.onSelectBgm(item)}
                >
                  <Flex justify='center'>
                    <Bgm index={item} />
                  </Flex>
                </Touchable>
              ))}
            </Flex>
            <Text style={[_.container.wind, _.mt.sm]} size={12} type='sub'>
              全部
            </Text>
            <Flex wrap='wrap'>
              {Array.from(new Array(100)).map((item, index) => (
                <Touchable
                  key={index + 1}
                  style={this.styles.bgm}
                  onPress={() => this.onSelectBgm(index + 1)}
                >
                  <Flex justify='center'>
                    <Bgm index={index + 1} />
                  </Flex>
                </Touchable>
              ))}
            </Flex>
          </>
        )}
      </ScrollView>
    )
  }

  render() {
    const { children } = this.props
    const { showTextarea, showBgm, showKeyboardSpacer } = this.state
    return (
      <>
        {(showTextarea || showBgm) && (
          <Touchable
            style={this.styles.mask}
            withoutFeedback
            onPress={this.onBlur}
          />
        )}
        <View style={this.styles.container}>
          {children}
          {this.renderToolBar()}
          {this.renderTextarea()}
          {this.renderContent()}
        </View>
        {!showKeyboardSpacer && (
          <View style={{ display: 'none' }}>
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

const memoStyles = _.memoStyles(_ => ({
  mask: {
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: _.colorMask
  },
  container: {
    position: 'absolute',
    zIndex: 1001,
    right: 0,
    bottom: 0,
    left: 0,
    marginBottom: -4,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderTopWidth: _.select(_.hairlineWidth, 0),
    borderTopColor: _.colorBorder
  },
  toolBar: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind,
    marginLeft: -_.sm
  },
  toolBarBtn: {
    padding: 8
  },
  bgmContainer: {
    paddingVertical: _.sm
  },
  bgm: {
    width: '14.28%',
    paddingVertical: _.md
  },
  replyHistory: {
    paddingHorizontal: _.wind,
    paddingVertical: _.sm
  },
  textareaContainer: {
    borderBottomWidth: _.hairlineWidth,
    borderBottomColor: _.colorBorder
  },
  textarea: {
    paddingVertical: _.sm,
    paddingHorizontal: 0,
    marginBottom: -_.hairlineWidth,
    color: _.colorDesc,
    fontSize: 14 + _.fontSizeAdjust,
    lineHeight: 22,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1)
  },
  send: {
    padding: _.sm,
    marginTop: 3
  }
}))
