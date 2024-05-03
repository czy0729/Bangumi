/*
 * @Author: czy0729
 * @Date: 2022-05-06 21:11:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-03 07:43:52
 */
import React from 'react'
import { LayoutChangeEvent, View } from 'react-native'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { systemStore } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT_PROVIDER } from '../ds'
import { Flex } from '../../flex'
import { Text } from '../../text'
import { getKatakanaAlign } from './utils'
import { styles } from './styles'
import { Props as KatakanaProviderProps, State } from './types'

export { KatakanaProviderProps }

/** 片假名终结者包裹容器 */
export const KatakanaProvider = observer(
  class KatakanaProviderComponent extends React.Component<KatakanaProviderProps, State> {
    static defaultProps = {
      itemStyle: undefined,
      itemSecondStyle: undefined,
      active: false
    }

    static childContextTypes = {
      active: PropTypes.bool,

      /** 用于往嵌套 Text 传递需要增大行高的标记 */
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

    state: State = {
      /** 所有嵌套文字的计算数据 */
      fullTextConfig: [],

      /** 匹配并翻译后的片假名数据 */
      matches: [],

      /** 容器宽度, 用于计算渲染的罗马音是居中还是置左 */
      rootWidth: 0
    }

    private matchedCount = 0

    /** 获取子 Text 组件的参数和完整字符串用于测量匹配到的片假名具体位置, 只计算 1 次就够了 */
    caculateFullTextConfig = () => {
      try {
        const { fullTextConfig } = this.state
        if (fullTextConfig.length) return fullTextConfig

        const { children } = this.props
        const _fullTextConfig: State['fullTextConfig'] = []

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

    /** 收到匹配信号后, 测量文字的具体位置, 如何有片假名, 需要把文字行高设大 */
    onKatakana = ({ jp, en }: { jp: string; en: string }) => {
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

    onRootLayout = ({ nativeEvent }: LayoutChangeEvent) => {
      const { width } = nativeEvent.layout
      this.setState({
        rootWidth: width
      })
    }

    /** 计算当前片假名在整串带布局的文字里面的具体位置 */
    onLayout = ({ nativeEvent }: LayoutChangeEvent, node: { type: any; bold: any }, jp: string) => {
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

    /** 计算过位置的片假名数据 */
    get measuredKatakanas() {
      return this.state.matches.filter(item => !!item.width)
    }

    /**
     * 用于往嵌套 Text 传递需要增大行高的标记
     *  - 假如英文的 top 都为 0 不需要放大
     */
    get lineHeightIncrease() {
      return this.state.matches.some(item => item.top !== undefined && item.top !== 0) ? 4 : 0
    }

    /** 是否启用此功能 */
    get isOn() {
      return this.props.active || systemStore.setting.katakana
    }

    /** 使用所有嵌套 Text 数据, 因为要换行, 只能通过拆字渲染, 这样能有条件取得每一个文字的具体位置 */
    renderMeasureLayout() {
      const { fullTextConfig, matches } = this.state

      /**
       * 1. fullTextConfig 只有收到匹配到片假名后才会有数据
       * 2. 测量完所有数据就销毁
       */
      if (!fullTextConfig.length || this.matchedCount >= matches.length) return null

      // 在整串文字中, 取得每一个片假名的索引位置, 使用 onLayout 计算英文需要出现的位置
      return (
        <Flex
          style={stl(styles.measure, this.props.style)}
          wrap='wrap'
          onLayout={this.onRootLayout}
        >
          {fullTextConfig.map(node => {
            const jpIndexMap = {}
            matches.forEach(item => (jpIndexMap[node.text.indexOf(item.jp)] = item.jp))
            return node.text.split('').map((text: string, index: number) => (
              <Text
                key={index}
                size={node.size}
                lineHeight={node.lineHeight}
                bold={node.bold}
                lineHeightIncrease={0}
                onLayout={e => {
                  if (jpIndexMap[index]) this.onLayout(e, node, jpIndexMap[index])
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
      return this.measuredKatakanas.map(item => {
        const isLineFirst = item.top === 0
        return (
          <Text
            key={item.jp}
            style={stl(
              styles.katakana,
              {
                top: item.top,
                left: item.left,
                minWidth: item.width,
                marginTop: isLineFirst ? -10 : 0 // 这里还没解决好行高问题, 大概调到好看
              },
              this.props.itemStyle,
              !isLineFirst && this.props.itemSecondStyle
            )}
            type={item.type}
            size={9}
            lineHeight={9}
            lineHeightIncrease={0}
            numberOfLines={1}
            bold={item.bold}
            align={getKatakanaAlign(item, this.state.rootWidth)}
          >
            {item.en}
          </Text>
        )
      })
    }

    render() {
      r(COMPONENT_PROVIDER)

      const { children, ...other } = this.props
      if (!this.isOn) return <Text {...other}>{children}</Text>

      return (
        <View>
          {this.renderMeasureLayout()}
          {this.renderKatakanas()}
          <Text {...other} lineHeightIncrease={this.lineHeightIncrease}>
            {children}
          </Text>
        </View>
      )
    }
  }
)
