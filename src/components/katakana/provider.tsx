/*
 * @Author: czy0729
 * @Date: 2022-05-06 21:11:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 04:29:37
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { stl } from '@utils'
import { Override, TextStyle } from '@types'
import { Flex } from '../flex'
import { Text, TextProps } from '../text'
import { styles } from './styles'

type Props = Override<
  TextProps,
  {
    /** 所有katakana的样式 */
    itemStyle?: TextStyle

    /** 非第一行katakana的样式 */
    itemSecondStyle?: TextStyle

    /** props可强制启动 */
    active?: boolean
  }
>

export const KatakanaProvider = observer(
  class KatakanaProviderComponent extends React.Component<Props> {
    static defaultProps = {
      itemStyle: undefined,
      itemSecondStyle: undefined,
      active: false
    }

    static childContextTypes = {
      active: PropTypes.bool,

      /** 用于往嵌套Text传递需要增大行高的标记 */
      lineHeightIncrease: PropTypes.number,

      /** 接受到匹配到片假名 */
      onKatakana: PropTypes.func
    }

    getChildContext() {
      return {
        active: this.props.active,
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

        ;(Array.isArray(children) ? children : [children])
          .filter(item => !!item)
          .forEach(item =>
            (Array.isArray(item) ? item : [item]).forEach((node: any) => {
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
      return matches.length
        ? matches.some(item => item.top !== undefined && item.top !== 0)
          ? 4
          : 0
        : 0
    }

    get isOn() {
      const { katakana } = systemStore.setting
      const { active } = this.props
      return katakana || active
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
        <Flex style={style ? [styles.measure, style] : styles.measure} wrap='wrap'>
          {fullTextConfig.map(node => {
            const jpIndexMap = {}
            matches.forEach(item => (jpIndexMap[node.text.indexOf(item.jp)] = item.jp))
            return node.text.split('').map((text, index) => (
              <Text
                key={index}
                size={node.size}
                lineHeight={node.lineHeight}
                bold={node.bold}
                lineHeightIncrease={0}
                onLayout={e => {
                  if (jpIndexMap[index]) {
                    this.onLayout(e, node, jpIndexMap[index])
                  }
                }}
              >
                {text}
              </Text>
            ))
          })}
        </Flex>
      )
    }

    renderKatakanas() {
      const { itemStyle, itemSecondStyle } = this.props
      return this.measuredKatakanas.map(item => {
        const isLineFirst = item.top === 0

        // @TODO: 暂时不显示第二行, 位置把握不住, 待以后优化
        if (!isLineFirst) return null

        return (
          <Text
            key={item.jp}
            style={stl(
              styles.katakana,
              {
                top: item.top,
                left: item.left,
                minWidth: item.width,
                marginTop: isLineFirst ? -11 : -3 // 这里还没解决好行高问题, 大概调到好看
              },
              itemStyle,
              !isLineFirst && itemSecondStyle
            )}
            type={item.type}
            size={9}
            lineHeight={9}
            lineHeightIncrease={0}
            numberOfLines={1}
            align='center'
            bold={item.bold}
          >
            {item.en}
          </Text>
        )
      })
    }

    render() {
      const { children, ...other } = this.props
      if (!this.isOn) return <Text {...other}>{children}</Text>

      return (
        <View>
          {this.renderMeasureLayout()}
          {this.renderKatakanas()}
          <Text {...other}>{children}</Text>
        </View>
      )
    }
  }
)
