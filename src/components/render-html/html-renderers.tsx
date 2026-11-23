/*
 * @Author: czy0729
 * @Date: 2019-08-14 16:28:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-23 05:36:06
 *
 * vendor 自 react-native-render-html@4.1.1/src 的 HTMLRenderers (上游已停更)
 * 已深度本地化: WebView 链接渲染 / stl / IOS / androidTextFixedStyle
 */
import { Platform, Text, TouchableOpacity, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { stl } from '@utils/utils'
import { IOS } from '@constants/env'
import { androidTextFixedStyle } from '@styles'
import HTMLImage from './html-image'
import { _constructStyles, _getElementClassStyles } from './html-styles'

import type { GestureResponderEvent } from 'react-native'
import type { ReactNode } from '@types'
import type { HTMLAttribs } from './html-utils'
import type { PassProps, RNStyle } from './html-styles'

/** 列表前缀渲染器参数 (与 vendored 渲染器签名同形) */
type ListPrefixRenderer = (
  htmlAttribs: HTMLAttribs,
  children: ReactNode[] | undefined,
  convertedCSSStyles: RNStyle[] | undefined,
  passProps: RenderersPassProps
) => ReactNode

/** 渲染器透传参数 (html.jsx 构造, 在 html-styles 的 PassProps 基础上扩展渲染器所需字段) */
interface RenderersPassProps extends PassProps {
  /** React key */
  key?: string

  /** Text 是否随系统字体缩放 */
  allowFontScaling?: boolean

  /** 链接文本 (a 无子节点时的兜底内容) */
  data?: string

  /** 列表项序号 (ul/ol 渲染子项时回填) */
  index?: number

  /** 列表前缀渲染器 */
  listsPrefixesRenderers?: {
    ol?: ListPrefixRenderer
    ul?: ListPrefixRenderer
  }

  /** 列表索引 (生成列表 key 用) */
  nodeIndex?: number

  /** 链接点击回调 */
  onLinkPress?: (
    evt: GestureResponderEvent,
    href?: string,
    htmlAttribs?: HTMLAttribs
  ) => boolean | void

  /** 当前容器类型 (决定 a 的渲染分支) */
  parentWrapper?: 'Text' | 'View'

  /** 原始列表子节点 */
  rawChildren?: Array<{
    /** 子节点文本 */
    data?: string

    /** 父标签 */
    parentTag?: string

    /** 标签名 */
    tagName?: string
  }>

  /** Text 是否可长按选中 */
  selectable?: boolean

  /** iframe 等静态内容的最大宽度 */
  staticContentMaxWidth?: number

  /** 图片最大宽度 */
  imagesMaxWidth?: number

  /** 图片初始尺寸 */
  imagesInitialDimensions?: { width: number; height: number }
}

export function a(
  htmlAttribs: HTMLAttribs,
  children: ReactNode,
  _convertedCSSStyles: RNStyle[] | undefined,
  passProps: RenderersPassProps
) {
  const style = _constructStyles({
    tagName: 'a',
    htmlAttribs,
    passProps,
    styleSet: passProps.parentWrapper === 'Text' ? 'TEXT' : 'VIEW'
  })

  // !! This deconstruction needs to happen after the styles construction since
  // the passed props might be altered by it !!
  const { parentWrapper, onLinkPress, key, data } = passProps
  const handlePress = (evt: GestureResponderEvent) =>
    onLinkPress && htmlAttribs && htmlAttribs.href
      ? onLinkPress(evt, htmlAttribs.href, htmlAttribs)
      : undefined

  if (parentWrapper === 'Text') {
    return (
      <>
        <Text
          {...passProps}
          key={key}
          style={stl(!IOS && androidTextFixedStyle, style)}
          textBreakStrategy='simple'
          numberOfLines={0}
          onPress={handlePress}
        >
          {children || data}
        </Text>
        {(!!handlePress || htmlAttribs?.class?.includes('tag')) && (
          <Text key={`${key}-padding`} textBreakStrategy='simple' numberOfLines={0}>
            {' '}
          </Text>
        )}
      </>
    )
  }

  return (
    <TouchableOpacity key={key} onPress={handlePress}>
      {children || data}
    </TouchableOpacity>
  )
}

export function img(
  htmlAttribs: HTMLAttribs,
  _children: ReactNode,
  _convertedCSSStyles: RNStyle[] | undefined,
  passProps: RenderersPassProps = {}
) {
  if (!htmlAttribs.src) {
    return false
  }

  const style = _constructStyles({
    tagName: 'img',
    htmlAttribs,
    passProps,
    styleSet: 'IMAGE'
  })
  const { src, alt, width, height } = htmlAttribs
  const { imagesMaxWidth, imagesInitialDimensions } = passProps
  return (
    <HTMLImage
      source={{ uri: src }}
      alt={alt}
      width={width}
      height={height}
      style={style}
      imagesMaxWidth={imagesMaxWidth}
      imagesInitialDimensions={imagesInitialDimensions}
    />
  )
}

export function ul(
  htmlAttribs: HTMLAttribs,
  children: ReactNode[] | undefined,
  convertedCSSStyles: RNStyle[] | undefined,
  passProps: RenderersPassProps = {}
) {
  const style = _constructStyles({
    tagName: 'ul',
    htmlAttribs,
    passProps,
    styleSet: 'VIEW'
  })
  const { allowFontScaling, rawChildren, nodeIndex, key, baseFontStyle, listsPrefixesRenderers } =
    passProps
  const baseFontSize = baseFontStyle?.fontSize || 14

  children =
    children &&
    children.map((child, index) => {
      const rawChild = rawChildren[index]
      let prefix: ReactNode = false
      const rendererArgs: Parameters<ListPrefixRenderer> = [
        htmlAttribs,
        children,
        convertedCSSStyles,
        {
          ...passProps,
          index
        }
      ]

      if (rawChild) {
        if (rawChild.parentTag === 'ul' && rawChild.tagName === 'li') {
          prefix =
            listsPrefixesRenderers && listsPrefixesRenderers.ul ? (
              listsPrefixesRenderers.ul(...rendererArgs)
            ) : (
              <View
                style={{
                  marginRight: 10,
                  width: baseFontSize / 2.8,
                  height: baseFontSize / 2.8,
                  marginTop: baseFontSize / 2,
                  borderRadius: baseFontSize / 2.8,
                  backgroundColor: 'black'
                }}
              />
            )
        } else if (rawChild.parentTag === 'ol' && rawChild.tagName === 'li') {
          prefix =
            listsPrefixesRenderers && listsPrefixesRenderers.ol ? (
              listsPrefixesRenderers.ol(...rendererArgs)
            ) : (
              <Text
                allowFontScaling={allowFontScaling}
                style={stl(!IOS && androidTextFixedStyle, {
                  marginRight: 5,
                  fontSize: baseFontSize
                })}
                textBreakStrategy='simple'
                numberOfLines={0}
              >
                {index + 1})
              </Text>
            )
        }
      }
      return (
        <View
          key={`list-${nodeIndex}-${index}-${key}`}
          style={{ flexDirection: 'row', marginBottom: 10 }}
        >
          {prefix}
          <View style={{ flex: 1 }}>{child}</View>
        </View>
      )
    })
  return (
    <View style={style} key={key}>
      {children}
    </View>
  )
}
export const ol = ul

export function iframe(
  htmlAttribs: HTMLAttribs,
  _children: ReactNode,
  _convertedCSSStyles: RNStyle[] | undefined,
  passProps: RenderersPassProps
) {
  const { staticContentMaxWidth, tagsStyles, classesStyles } = passProps

  const tagStyleHeight = tagsStyles.iframe && tagsStyles.iframe.height
  const tagStyleWidth = tagsStyles.iframe && tagsStyles.iframe.width

  const classStyles = _getElementClassStyles(htmlAttribs, classesStyles)
  const classStyleWidth = classStyles.width
  const classStyleHeight = classStyles.height

  const attrHeight = htmlAttribs.height ? parseInt(htmlAttribs.height) : false
  const attrWidth = htmlAttribs.width ? parseInt(htmlAttribs.width) : false

  const height = attrHeight || classStyleHeight || tagStyleHeight || 200
  const width = attrWidth || classStyleWidth || tagStyleWidth || staticContentMaxWidth

  const style = _constructStyles({
    tagName: 'iframe',
    htmlAttribs,
    passProps,
    styleSet: 'VIEW',
    additionalStyles: [{ height, width }]
  })

  const source = htmlAttribs.srcdoc ? { html: htmlAttribs.srcdoc } : { uri: htmlAttribs.src }

  return <WebView key={passProps.key} source={source} style={style} />
}

export function pre(
  _htlmAttribs: HTMLAttribs,
  children: ReactNode,
  _convertedCSSStyles: RNStyle[] | undefined,
  passProps: RenderersPassProps
) {
  return (
    <Text
      key={passProps.key}
      style={stl(!IOS && androidTextFixedStyle, {
        fontFamily: Platform.OS === 'android' ? 'monospace' : 'Menlo'
      })}
      textBreakStrategy='simple'
      numberOfLines={0}
    >
      {children}
    </Text>
  )
}

export function br(
  _htlmAttribs: HTMLAttribs,
  _children: ReactNode,
  _convertedCSSStyles: RNStyle[] | undefined,
  passProps: RenderersPassProps
) {
  return (
    <Text
      key={passProps.key}
      allowFontScaling={passProps.allowFontScaling}
      style={stl(!IOS && androidTextFixedStyle, {
        height: 1.2 * passProps.emSize,
        flex: 1
      })}
      textBreakStrategy='simple'
      numberOfLines={0}
    >
      {'\n'}
    </Text>
  )
}

export function textwrapper(
  _htmlAttribs: HTMLAttribs,
  children: ReactNode,
  convertedCSSStyles: RNStyle[] | undefined,
  { allowFontScaling, key, selectable }: RenderersPassProps
) {
  return (
    <Text
      key={key}
      selectable={selectable}
      allowFontScaling={allowFontScaling}
      style={stl(!IOS && androidTextFixedStyle, convertedCSSStyles)}
      textBreakStrategy='simple'
      numberOfLines={0}
    >
      {children}
    </Text>
  )
}
