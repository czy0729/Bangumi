/*
 * @Doc https://github.com/archriss/react-native-render-html
 * @Author: czy0729
 * @Date: 2019-04-29 19:54:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-05 02:20:44
 */
import React from 'react'
import { StyleSheet, View, Image as RNImage, Text } from 'react-native'
import HTML from 'react-native-render-html'
import { WebBrowser } from 'expo'
import { HOST } from '@constants'
import {
  window,
  wind,
  sm,
  colorPlain,
  colorTitle,
  colorSub,
  colorMain,
  colorPrimaryLight,
  colorDesc,
  colorBorder
} from '@styles'
import Image from './image'

// 一些超展开内容文本样式的标记
const spanMark = {
  mask: 'background-color:#555;',
  bold: 'font-weight:bold;',
  lineThrough: 'text-decoration: line-through;'
}

export default class RenderHtml extends React.Component {
  static defaultProps = {
    baseFontStyle: {
      fontSize: 16,
      lineHeight: 26,
      color: colorTitle
    },
    imagesMaxWidth: window.width - 2 * wind,
    html: ''
  }

  /**
   * 为使bgm表情能与文字在同一行里显示, 在检测下一个节点是bgm表情的时候
   * 先把文字保存到textWithBgmImage里, 并在表情显示的时候在图片前加入这段文字
   * 当碰到连续表情的时候, 用checkNextIsBgmImage()判断有多少个连续表情
   * 用continuousBgmImagesCount保存连续个数
   * 显示图片的时候, 当bgmImagesCount不为0时, 把图片先缓存到bgmImagesTemp里
   * 在最后一个表情渲染的时候统一渲染
   */
  textWithBgmImage = '' // 用于下一个节点是表情的时候, 保存当前文字
  continuousBgmImagesCount = 0 // 后面还有多少个节点是表情
  bgmImagesTemp = [] // 存放连续表情
  checkNextIsBgmImage = next => {
    if (
      next &&
      next.name === 'img' &&
      next.attribs &&
      (next.attribs.alt || '').indexOf('(bgm') !== -1
    ) {
      if (this.checkNextIsBgmImage(next.next)) {
        this.continuousBgmImagesCount += 1
      }
      return true
    }
    return false
  }

  /**
   * 生成render-html配置
   */
  generateConfig = (imagesMaxWidth, baseFontStyle) => ({
    imagesMaxWidth: window.width,
    baseFontStyle,
    tagsStyles: {
      a: {
        paddingRight: sm,
        color: colorMain,
        textDecorationColor: colorMain
      }
    },
    textSelectable: true,

    // 渲染文字前的回调
    alterData: node => {
      const { type, next = {}, data } = node

      if (type === 'text') {
        // 检测下一个节点是不是表情
        if (this.checkNextIsBgmImage(next)) {
          this.textWithBgmImage = data

          // 这里应该是库的问题, 不能返回空字符串会被当成不处理, 导致多出了一空行
          return ' '
        }
      }
      return data
    },

    // 渲染定义tag前回调
    renderers: {
      img: (
        { src = '', alt = '' },
        children,
        convertedCSSStyles,
        passProps
      ) => {
        const props = {}

        // bgm表情
        if (alt.indexOf('(bgm') !== -1) {
          props.source = { uri: `${HOST}/${src}` }
          props.style = {
            width: 20,
            height: 20
          }

          // 当后面还有连续表情的时候
          if (this.continuousBgmImagesCount) {
            this.bgmImagesTemp.push(<RNImage key={passProps.key} {...props} />)
            this.continuousBgmImagesCount -= 1
            return null
          }

          let text
          if (this.textWithBgmImage) {
            text = this.textWithBgmImage
            this.textWithBgmImage = ''
          }

          let _bgmImagesTemp
          if (this.bgmImagesTemp.length) {
            _bgmImagesTemp = this.bgmImagesTemp
            this.bgmImagesTemp = []
          }

          return (
            <Text key={passProps.key}>
              {!!text && <Text style={baseFontStyle}>{text}</Text>}
              {_bgmImagesTemp}
              <RNImage {...props} />
            </Text>
          )
        }

        // 普通图片
        props.src = src
        props.style = {
          marginTop: 4
        }
        props.autoSize = imagesMaxWidth
        props.border = colorBorder
        return <Image key={passProps.key} {...props} />
      },
      span: ({ style = '' }, children, convertedCSSStyles, passProps) => {
        // @todo 暂时没有对样式混合的情况作出正确的判断
        // 隐藏字
        if (style.indexOf(spanMark.mask) !== -1) {
          const text =
            (passProps.rawChildren[0] && passProps.rawChildren[0].data) || ''
          return (
            <MaskText key={passProps.key} style={passProps.baseFontStyle}>
              {text}
            </MaskText>
          )
        }

        // 删除字
        if (style.indexOf(spanMark.lineThrough) !== -1) {
          const text =
            (passProps.rawChildren[0] &&
              passProps.rawChildren[0].parent &&
              passProps.rawChildren[0].parent.children[0] &&
              passProps.rawChildren[0].parent.children[0].data) ||
            ''
          return (
            <Text
              key={passProps.key}
              style={[passProps.baseFontStyle, styles.lineThrought]}
            >
              {text}
            </Text>
          )
        }

        return children
      },
      q: (attrs, children, convertedCSSStyles, passProps) => (
        <QuoteText key={passProps.key}>{children}</QuoteText>
      )
    }
  })

  onLinkPress = (evt, href) => {
    const { onLinkPress } = this.props
    if (onLinkPress) {
      onLinkPress(href)
    } else {
      WebBrowser.openBrowserAsync(href)
    }
  }

  render() {
    const { style, baseFontStyle, imagesMaxWidth, html, ...other } = this.props
    return (
      <View style={style}>
        <HTML
          html={html}
          baseFontStyle={baseFontStyle}
          onLinkPress={this.onLinkPress}
          {...this.generateConfig(imagesMaxWidth, baseFontStyle)}
          {...other}
        />
      </View>
    )
  }
}

class MaskText extends React.Component {
  state = {
    show: false
  }

  toggle = () => {
    const { show } = this.state
    this.setState({
      show: !show
    })
  }

  render() {
    const { style, children } = this.props
    const { show } = this.state
    return (
      <Text
        style={[style, show ? styles.blockTextShow : styles.blockText]}
        onPress={this.toggle}
      >
        {children}
      </Text>
    )
  }
}

class QuoteText extends React.Component {
  state = {
    show: false
  }

  show = () =>
    this.setState({
      show: true
    })

  render() {
    const { children } = this.props
    const { show } = this.state
    if (!show) {
      return (
        <Text style={styles.quoteTextPlaceholder} onPress={this.show}>
          ...
        </Text>
      )
    }
    return <Text style={styles.quoteText}>{children}</Text>
  }
}

const styles = StyleSheet.create({
  blockText: {
    color: colorDesc,
    backgroundColor: colorDesc
  },
  blockTextShow: {
    color: colorPlain,
    backgroundColor: colorDesc
  },
  quoteTextPlaceholder: {
    paddingBottom: 8,
    marginTop: -8,
    color: colorSub,
    textAlign: 'center'
  },
  quoteText: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 4,
    backgroundColor: colorPrimaryLight,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colorBorder,
    transform: [{ scale: 0.92 }]
  },
  lineThrought: {
    textDecorationLine: 'line-through'
  }
})
