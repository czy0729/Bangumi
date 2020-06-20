/*
 *  <Katakana> 片假名上方显示英文
 *  - 可匹配嵌套<Text>内的片假名
 *  - 百度翻译得到英文
 *  - 容器<Provider>统一管理英文需要插入的具体位置
 *  - 本地缓存片假名->英文的结果
 *  #todo 短时间合并多个翻译请求
 *  #todo 富文本内文字支持
 *
 * @Author: czy0729
 * @Date: 2020-06-16 13:53:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-20 21:56:17
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
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
    cache = await getStorage(cacheKey)
  } catch (error) {
    //
  } finally {
    inited = true
  }
})()

const katakana = /[\u30A1-\u30FA\u30FD-\u30FF][\u3099\u309A\u30A1-\u30FF]*[\u3099\u309A\u30A1-\u30FA\u30FC-\u30FF]|[\uFF66-\uFF6F\uFF71-\uFF9D][\uFF65-\uFF9F]*[\uFF66-\uFF9F]/

@observer
class KatakanaProvider extends React.Component {
  static childContextTypes = {
    lineHeightIncrease: PropTypes.number, // 用于往嵌套Text传递需要增大行高的标记
    onKatakana: PropTypes.func //  接受到匹配到片假名
  }

  getChildContext() {
    const { fullTextConfig } = this.state
    return {
      lineHeightIncrease: fullTextConfig.length ? 8 : 0,
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
    matches[index].fontSize = node.fontSize || 14
    matches[index].lineHeight = node.lineHeight || 14
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
   * 使用所有嵌套Text数据, 因为要换行, 只能通过拆字渲染, 这样能有条件取得每一个文字的具体位置
   */
  renderMeasureLayout() {
    const { fullTextConfig, matches } = this.state

    /**
     * 1. fullTextConfig只有收到匹配到片假名后才会有数据
     * 2. 测量完所有数据就销毁
     */
    // if (
    //   !fullTextConfig.length ||
    //   fullTextConfig.length === this.measuredKatakanas.length
    // ) {
    //   return null
    // }

    // 在整串文字中, 取得每一个片假名的索引位置, 使用onLayout计算英文需要出现的位置
    return (
      <Flex style={styles.measure} wrap='wrap'>
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
    return this.measuredKatakanas.map(item => (
      <Text
        key={item.jp}
        style={[
          styles.katakana,
          {
            top: item.top,
            left: item.left,
            minWidth: item.width,
            marginTop:
              -(item.lineHeight || item.fontSize) *
              (12 / item.lineHeight || item.fontSize)
          }
        ]}
        size={10}
        align='justify'
        type={item.type}
        bold={item.bold}
      >
        {item.en}
      </Text>
    ))
  }

  render() {
    const { children, ...other } = this.props
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

    const match = this.text.match(katakana)
    if (!match) {
      return
    }

    this.jp = match[0]
    if (cache[this.jp]) {
      const { onKatakana } = this.context
      if (onKatakana) {
        onKatakana({
          jp: this.jp,
          en: cache[this.jp]
        })
      }
      return
    }

    const response = await baiduTranslate(this.jp, 'en')
    const { trans_result: transResult } = JSON.parse(response)
    if (Array.isArray(transResult)) {
      const en = transResult[0].dst
      cache[this.jp] = en
      setStorage(cacheKey, cache)

      const { onKatakana } = this.context
      if (onKatakana) {
        onKatakana({
          jp: this.jp,
          en
        })
      }
    }
  }

  get text() {
    const { children } = this.props
    if (typeof children === 'string') {
      return children
    }
    return children.map(item => item || '').join('')
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
    marginTop: 0,
    width: '100%',
    opacity: 0
  },
  katakana: {
    position: 'absolute',
    zIndex: 1
  }
})
