/*
 *  <Katakana> 片假名上方显示英文
 *  - 可匹配嵌套<Text>内的片假名
 *  - 百度翻译得到英文
 *  - 容器<Provider>统一管理英文需要插入的具体位置
 *  - 本地缓存片假名=>英文的结果
 *  - 短时间合并多个翻译请求
 *  #todo 富文本内文字支持 (没有思路, 暂不支持)
 *
 * @Author: czy0729
 * @Date: 2020-06-16 13:53:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-30 20:12:33
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { setStorage, getStorage } from '@utils'
import { baiduTranslate } from '@utils/fetch'
import Flex from './flex'
import Text from './text'

const namespace = 'ComponentKatakana'
const cacheKey = `${namespace}|cache`
let cache = {}
let inited = false

// eslint-disable-next-line semi-style
;(async () => {
  try {
    cache = (await getStorage(cacheKey)) || {}
  } catch (error) {
    //
  } finally {
    inited = true
  }
})()

const katakana = /[\u30A1-\u30FA\u30FD-\u30FF][\u3099\u309A\u30A1-\u30FF]*[\u3099\u309A\u30A1-\u30FA\u30FC-\u30FF]|[\uFF66-\uFF6F\uFF71-\uFF9D][\uFF65-\uFF9F]*[\uFF66-\uFF9F]/g
export function matchKatakanas(str) {
  return str.match(katakana)
}

const interval = 6400
let jps = [] // 用于收集日文, 合并多个翻译请求用
let cbs = []
export async function translate(jp, cb = Function.prototype) {
  // jp不是字符串直接抛弃
  if (typeof jp !== 'string') {
    return
  }

  // 命中缓存马上回调
  if (cache[jp]) {
    cb(cache)
    return
  }

  cbs.push(cb)
  if (jps.includes(jp)) {
    return
  }

  if (!jps.length) {
    setTimeout(() => {
      doTranslate()
    }, interval)
  }
  jps.push(jp)
}

async function doTranslate() {
  try {
    const text = jps.join('\n')
    jps = []
    const response = await baiduTranslate(text, 'en')
    const { trans_result: transResult } = JSON.parse(response)
    if (Array.isArray(transResult)) {
      // [{ dst: 'Studio pulp', src: 'スタジオパルプ' }]
      transResult.forEach(item => (cache[item.src] = item.dst))
      setStorage(cacheKey, cache)
    }

    cbs.forEach(cb => cb(cache))
  } catch (error) {
    //
  } finally {
    cbs = []
  }
}

export async function translateAll(str) {
  try {
    const match = matchKatakanas(str)
    if (!match) {
      return null
    }

    const needTranslate = match.filter(jp => !cache[jp])
    if (needTranslate.length) {
      const response = await baiduTranslate(needTranslate.join('\n'), 'en')
      const { trans_result: transResult } = JSON.parse(response)
      if (Array.isArray(transResult)) {
        transResult.forEach(item => (cache[item.src] = item.dst))
        setStorage(cacheKey, cache)
      }
    }

    const result = {}
    match.forEach(jp => (result[jp] = cache[jp]))
    return result
  } catch (error) {
    return null
  }
}

@observer
class KatakanaProvider extends React.Component {
  static childContextTypes = {
    lineHeightIncrease: PropTypes.number, // 用于往嵌套Text传递需要增大行高的标记
    onKatakana: PropTypes.func //  接受到匹配到片假名
  }

  getChildContext() {
    return {
      lineHeightIncrease: this.lineHeightIncrease,
      onKatakana: this.onKatakana
    }
  }

  state = {
    // 所有嵌套文字的计算数据
    fullTextConfig: [],

    /**
     * 匹配并翻译后的片假名数据
     * {
     *    jp: String,
     *    en: String,
     *    top: Number,
     *    left: Number,
     *    width: Number,
     *    type: String,
     *    bold: Boolean
     * }
     */
    matches: []
  }

  matchedCount = 0

  /**
   * 获取子Text组件的参数和完整字符串用于测量匹配到的片假名具体位置
   * 只计算1次就够了
   */
  caculateFullTextConfig = () => {
    try {
      const { fullTextConfig } = this.state
      if (fullTextConfig.length) {
        return fullTextConfig
      }

      const { children } = this.props
      const _fullTextConfig = []

      // eslint-disable-next-line semi-style
      ;(Array.isArray(children) ? children : [children])
        .filter(item => !!item)
        .forEach(item =>
          (Array.isArray(item) ? item : [item]).forEach(node => {
            if (node.props && node.props.children) {
              const { children } = node.props
              _fullTextConfig.push({
                text: Array.isArray(children) ? children.join('') : children,
                size: node.props.size,
                lineHeight: node.props.lineHeight,
                bold: node.props.bold,
                type: node.props.type
              })
            } else if (typeof node === 'string') {
              _fullTextConfig.push({
                text: node,
                size: this.props.size || 14,
                lineHeight: this.props.lineHeight || 14,
                bold: this.props.bold,
                type: this.props.type
              })
            }
          })
        )
      return _fullTextConfig
    } catch (error) {
      return []
    }
  }

  /**
   * 收到匹配信号后, 测量文字的具体位置
   * 如何有片假名, 需要把文字行高设大
   * @param {*} katakana { jp: String, en: String }
   */
  onKatakana = ({ jp, en }) => {
    const { matches } = this.state

    // 当一串文字有相同的片假名, 只在首个上面显示
    if (matches.findIndex(item => item.jp === jp) === -1) {
      this.setState({
        fullTextConfig: this.caculateFullTextConfig(),
        matches: [
          ...matches,
          {
            jp,
            en
          }
        ]
      })
    }
  }

  /**
   * 计算当前片假名在整串带布局的文字里面的具体位置
   * @param {*} e
   * @param {*} node
   * @param {*} jp
   */
  onLayout = ({ nativeEvent }, node, jp) => {
    const { matches } = this.state
    const index = matches.findIndex(item => item.jp === jp)
    const { x, y, width } = nativeEvent.layout
    matches[index].top = y
    matches[index].left = x
    matches[index].width = jp.length * width // 并不能精准计算片假名的宽度, 大概猜测
    matches[index].type = node.type
    matches[index].bold = node.bold
    this.matchedCount += 1
    this.setState({
      matches
    })
  }

  /**
   * 计算过位置的片假名数据
   */
  get measuredKatakanas() {
    const { matches } = this.state
    return matches.filter(item => !!item.width)
  }

  /**
   * 用于往嵌套Text传递需要增大行高的标记
   *  - 假如英文的top都为0不需要放大
   */
  get lineHeightIncrease() {
    const { matches } = this.state
    return matches.length ? (matches.some(item => item.top !== 0) ? 4 : 0) : 0
  }

  get isOn() {
    const { katakana } = systemStore.setting
    return katakana
  }

  /**
   * 使用所有嵌套Text数据, 因为要换行, 只能通过拆字渲染, 这样能有条件取得每一个文字的具体位置
   */
  renderMeasureLayout() {
    const { fullTextConfig, matches } = this.state

    /**
     * 1. fullTextConfig只有收到匹配到片假名后才会有数据
     * 2. 测量完所有数据就销毁
     */
    if (!fullTextConfig.length || this.matchedCount >= matches.length) {
      return null
    }

    // 在整串文字中, 取得每一个片假名的索引位置, 使用onLayout计算英文需要出现的位置
    const { style } = this.props
    return (
      <Flex style={[styles.measure, style]} wrap='wrap'>
        {fullTextConfig.map(node => {
          const jpIndexMap = {}
          matches.forEach(
            item => (jpIndexMap[node.text.indexOf(item.jp)] = item.jp)
          )
          return node.text.split('').map((text, index) => (
            <Text
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              size={node.size}
              lineHeight={node.lineHeight}
              bold={node.bold}
              lineHeightIncrease={0}
              onLayout={
                jpIndexMap[index]
                  ? e => this.onLayout(e, node, jpIndexMap[index])
                  : undefined
              }
            >
              {text}
            </Text>
          ))
        })}
      </Flex>
    )
  }

  renderKatakanas() {
    const { itemStyle } = this.props
    return this.measuredKatakanas.map(item => {
      const isLineFirst = item.top === 0
      return (
        <Text
          key={item.jp}
          style={[
            styles.katakana,
            {
              top: item.top,
              left: item.left,
              minWidth: item.width,
              marginTop: isLineFirst ? -9 : -3 // 这里还没解决好行高问题, 大概调到好看
            },
            itemStyle
          ]}
          size={10}
          align='center'
          type={item.type}
          bold={item.bold}
          numberOfLines={1}
          lineHeightIncrease={0}
        >
          {item.en}
        </Text>
      )
    })
  }

  render() {
    const { children, ...other } = this.props
    if (!this.isOn) {
      return <Text {...other}>{children}</Text>
    }

    return (
      <View>
        {this.renderMeasureLayout()}
        {this.renderKatakanas()}
        <Text {...other}>{children}</Text>
      </View>
    )
  }
}

export default
@observer
class Katakana extends React.Component {
  static Provider = KatakanaProvider

  static contextTypes = {
    onKatakana: PropTypes.func
  }

  componentDidMount() {
    this.init()
  }

  componentWillReceiveProps() {
    this.init()
  }

  init = () => {
    if (!this.isOn) {
      return
    }

    if (inited) {
      this.translate()
    } else {
      setTimeout(() => {
        this.init()
      }, 200)
    }
  }

  translate = async () => {
    const { children } = this.props
    if (
      !children ||
      !(typeof children === 'string' || Array.isArray(children))
    ) {
      return
    }

    const match = matchKatakanas(this.text)
    if (!match) {
      return
    }

    match.forEach(jp =>
      translate(jp, cache => {
        const en = cache[jp]
        if (en) {
          const { onKatakana } = this.context
          if (onKatakana) {
            onKatakana({
              jp,
              en
            })
          }
        }
      })
    )
  }

  get text() {
    const { children } = this.props
    if (typeof children === 'string') {
      return children
    }
    return children.map(item => item || '').join('')
  }

  get isOn() {
    const { katakana } = systemStore.setting
    return katakana
  }

  render() {
    return <Text {...this.props} />
  }
}

const styles = StyleSheet.create({
  measure: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: '100%',
    opacity: 0
  },
  katakana: {
    position: 'absolute',
    zIndex: 10
  }
})
