/*
 * RN渲染HTML
 * @Doc https://github.com/archriss/react-native-render-html
 * @Author: czy0729
 * @Date: 2019-04-29 19:54:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-28 02:41:16
 */
import React from 'react'
import { View, Image as RNImage, Text as RNText } from 'react-native'
import HTML from 'react-native-render-html'
import { open } from '@utils'
import { HOST } from '@constants'
import _ from '@styles'
import { bgm } from '../bgm'
import MaskText from './mask-text'
import QuoteText from './quote-text'
import LineThroughtText from './line-throught-text'
import HiddenText from './hidden-text'
import Li from './li'
import ToggleImage from './toggle-image'

// 一些超展开内容文本样式的标记
const spanMark = {
  mask: 'background-color:#555;',
  bold: 'font-weight:bold;',
  lineThrough: 'line-through;',
  hidden: 'visibility:hidden;'
}

export default class RenderHtml extends React.Component {
  static defaultProps = {
    style: undefined,
    baseFontStyle: {
      fontSize: 16,
      lineHeight: 26,
      color: _.colorTitle
    },
    imagesMaxWidth: _.window.width - 2 * _.wind,
    html: '',
    autoShowImage: false,
    onLinkPress: Function.prototype
  }

  /**
   * 为使bgm表情能与文字在同一行里显示, 在检测下一个节点是bgm表情的时候
   * 先把文字保存到textWithBgmImage里, 并在表情显示的时候在图片前加入这段文字
   * 当碰到连续表情的时候, 用checkNextIsBgmImage()判断有多少个连续表情
   * 用continuousBgmImagesCount保存连续个数
   * 显示图片的时候, 当bgmImagesCount不为0时, 把图片先缓存到bgmImagesTemp里
   * 在最后一个表情渲染的时候统一渲染
   * @todo 暂时只处理了一行中第一个表情与之前的问题同行, 后面的暂时想不到办法处理
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
    imagesMaxWidth: _.window.width,
    baseFontStyle,
    tagsStyles: {
      a: {
        paddingRight: _.sm,
        color: _.colorMain,
        textDecorationColor: _.colorMain
      }
    },
    textSelectable: true,

    // 渲染文字前的回调
    alterData: node => {
      const { type, next = {}, data } = node
      if (type === 'text') {
        // 检测下一个节点是不是表情
        if (!this.textWithBgmImage && this.checkNextIsBgmImage(next)) {
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
        const props = {
          key: passProps.key
        }

        // bgm表情, 表情调用本地资源
        if (alt.indexOf('(bgm') !== -1) {
          const index = parseInt(alt.replace(/\(bgm|\)/g, '')) - 23 // 偏移量
          props.style = {
            width: 16,
            height: 16
          }
          props.source =
            parseInt(index) <= 100 ? bgm[index] : { uri: `${HOST}/${src}` }
          props.resizeMode = 'stretch'

          // 当后面还有连续表情的时候
          if (this.continuousBgmImagesCount) {
            this.bgmImagesTemp.push(<RNImage selectable {...props} />)
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
            <RNText key={passProps.key} allowFontScaling={false} selectable>
              {!!text && (
                <RNText
                  style={baseFontStyle}
                  allowFontScaling={false}
                  selectable
                >
                  {text}
                </RNText>
              )}
              {_bgmImagesTemp}
              <RNImage selectable {...props} />{' '}
            </RNText>
          )
        }

        // 普通图片
        const { autoShowImage } = this.props
        props.src = src
        props.style = {
          marginTop: 4
        }
        props.autoSize = imagesMaxWidth
        props.placeholder = false
        props.imageViewer = true
        return <ToggleImage {...props} show={autoShowImage} />
      },
      span: (
        { style = '' },
        children,
        convertedCSSStyles,
        { rawChildren, key, baseFontStyle }
      ) => {
        // @todo 暂时没有对样式混合情况作出正确判断, 以重要程度优先(剧透 > 删除 > 隐藏 > 其他)
        // 防剧透字
        if (style.includes(spanMark.mask)) {
          let text = ''
          const target = rawChildren[0]
          if (target) {
            // 当mask里面有bgm标签的时候, 结构不一样
            // @issue 暂时只处理了mask里面有一个bgm的情况
            if (target.attribs.alt) {
              if (target.parent && target.parent.children[0]) {
                const currentTarget = target.parent.children[0]
                text = currentTarget.data || ''

                if (
                  currentTarget.next &&
                  currentTarget.next.next &&
                  currentTarget.next.next.data
                ) {
                  text += currentTarget.next.next.data
                }
              }
            } else {
              text = target.data || ''
            }
          }
          return (
            <MaskText key={key} style={baseFontStyle}>
              {text}
            </MaskText>
          )
        }

        // 删除字
        if (style.includes(spanMark.lineThrough)) {
          const target = rawChildren[0]
          const text =
            (target &&
              target.parent &&
              target.parent.children[0] &&
              target.parent.children[0].data) ||
            ''
          return (
            <LineThroughtText key={key} style={baseFontStyle}>
              {text}
            </LineThroughtText>
          )
        }

        // 隐藏字
        if (style.includes(spanMark.hidden)) {
          const target = rawChildren[0]
          const text = (target && target.data) || ''
          return (
            <HiddenText key={key} style={baseFontStyle}>
              {text}
            </HiddenText>
          )
        }

        return children
      },
      q: (attrs, children, convertedCSSStyles, { key }) => (
        <QuoteText key={key}>{children}</QuoteText>
      ),
      li: (attrs, children, convertedCSSStyles, { key }) => (
        <Li key={key}>{children}</Li>
      )
    }
  })

  onLinkPress = (evt, href) => {
    const { onLinkPress } = this.props
    if (onLinkPress) {
      onLinkPress(href)
    } else {
      open(href)
    }
  }

  render() {
    const {
      style,
      baseFontStyle,
      imagesMaxWidth,
      html,
      autoShowImage,
      onLinkPress,
      ...other
    } = this.props
    // @todo 给纯文字包上span, 可能可以解决连续表情问题?
    // let _html = `<div>${html}</div>`
    // const match = _html.match(/>[^<>]+?</g)
    // if (match) {
    //   match.forEach(item => {
    //     _html = _html.replace(item, `><span${item}/span><`)
    //   })
    // }

    // 鬼知道CDN那边加了什么
    const _html = html.replace(/data-cfsrc=/g, 'src=')
    return (
      <View style={style}>
        <HTML
          html={_html}
          baseFontStyle={baseFontStyle}
          onLinkPress={this.onLinkPress}
          {...this.generateConfig(imagesMaxWidth, baseFontStyle)}
          {...other}
        />
      </View>
    )
  }
}
