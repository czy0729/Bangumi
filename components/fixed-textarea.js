/*
 * 带标签的回复框
 * @Author: czy0729
 * @Date: 2019-06-10 22:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-08 02:29:10
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { observer } from 'mobx-react'
import { TextareaItem } from '@ant-design/react-native'
import { _ } from '@stores'
import { getStorage, setStorage } from '@utils'
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
    showKeyboardSpacer: false,
    keyboardHeight: 0,
    history: []
  }

  ref

  async componentDidMount() {
    const storage = (await getStorage(namespace)) || '15'
    const history = storage
      .split(',')
      .filter(item => item !== '')
      .map(item => parseInt(item))
    this.setState({
      history
    })
  }

  componentWillReceiveProps(nextProps) {
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
      showBgm: false
    })

    setTimeout(() => {
      const ref = this.ref.textAreaRef
      ref.focus()
    }, 0)
  }

  onBlur = () => {
    const { onClose } = this.props
    onClose()

    this.setState({
      showTextarea: false,
      showBgm: false,
      showKeyboardSpacer: false
    })

    setTimeout(() => {
      const ref = this.ref.textAreaRef
      ref.blur()
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

  onSubmit = () => {
    const { value } = this.state
    if (value === '') {
      return
    }

    const { onSubmit } = this.props
    onSubmit(value)
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
    setTimeout(() => {
      const ref = this.ref.textAreaRef
      ref.blur()

      setTimeout(() => {
        this.setState({
          showBgm: true
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

  // 本地化最近使用bgm, 最多7个
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

  renderBtn(text, symbol) {
    if (text === 'BGM') {
      const { showBgm } = this.state
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
          <Text type={showBgm ? 'main' : 'sub'}>{text}</Text>
        </Touchable>
      )
    }

    return (
      <Touchable
        style={this.styles.toolBarBtn}
        onPress={() => this.onAddSymbolText(symbol)}
      >
        <Text type='sub'>{text}</Text>
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
      <Flex style={this.styles.toolBar}>
        {this.renderBtn('BGM')}
        {!simple && this.renderBtn('加粗', 'b')}
        {!simple && this.renderBtn('斜体', 'i')}
        {!simple && this.renderBtn('下划线', 'u')}
        {!simple && this.renderBtn('删除线', 's')}
        {!simple && this.renderBtn('防剧透', 'mask')}
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
              placeholder={placeholder || '不吐槽一下吗'}
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

  renderBgm() {
    const { showTextarea, showBgm, keyboardHeight, history } = this.state
    if (!showBgm) {
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
        <Text style={_.container.wind} size={12} type='sub'>
          常用
        </Text>
        <Flex wrap='wrap'>
          {history.map((item, index) => (
            <Touchable
              // eslint-disable-next-line react/no-array-index-key
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
              // eslint-disable-next-line react/no-array-index-key
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
      </ScrollView>
    )
  }

  render() {
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
          {this.renderToolBar()}
          {this.renderTextarea()}
          {this.renderBgm()}
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
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: _.colorMask
  },
  container: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    marginBottom: -4,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
    borderTopWidth: _.hairlineWidth,
    borderTopColor: _.colorBorder
  },
  toolBar: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind,
    marginLeft: -_.sm
  },
  toolBarBtn: {
    padding: _.sm,
    marginRight: _.sm
  },
  bgmContainer: {
    paddingVertical: _.sm
  },
  bgm: {
    width: '14.28%',
    paddingVertical: _.md
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
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2)
  },
  send: {
    padding: _.sm,
    marginTop: 3
  }
}))
