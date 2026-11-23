/*
 * @Author: czy0729
 * @Date: 2026-11-23 05:36:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-23 22:08:07
 *
 * vendor 自 react-native-render-html@4.1.1/src (上游已停更)
 * 本地差异: ignoredStyles 缺省兜底, !important 剥离后统一返回处理值
 */
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import type { HTMLAttribs, HTMLNode, StyleSet } from './html-utils'
import { generateDefaultBlockStyles, generateDefaultTextStyles } from './html-default-styles'
import { ABSOLUTE_FONT_SIZE, PERC_SUPPORTED_STYLES, stylePropTypes, STYLESETS } from './html-utils'

export type RNStyle = ViewStyle & TextStyle & ImageStyle

export type StyleMap = Record<string, RNStyle>

export interface PassProps {
  allowedStyles?: string[]
  baseFontStyle?: RNStyle
  classesStyles?: StyleMap
  defaultTextStyles?: StyleMap
  emSize?: number
  ignoredStyles?: string[]
  parentTag?: string
  ptSize?: number
  tagsStyles?: StyleMap
  [key: string]: unknown
}

export interface ConstructStylesParams {
  tagName: string
  htmlAttribs: HTMLAttribs
  passProps: PassProps
  additionalStyles?: RNStyle | RNStyle[]
  styleSet?: 'VIEW' | 'TEXT' | 'IMAGE'
  baseFontSize?: number
}

/**
 * Converts a html style string to an object
 * @param str: the style string
 * @return the style as an obect
 */
export function cssStringToObject(str: string): Record<string, string> {
  return str
    .split(';')
    .map(prop => prop.split(':'))
    .reduce((acc, prop) => {
      if (prop.length === 2) {
        acc[prop[0].trim()] = prop[1].trim()
      }

      return acc
    }, {})
}

export function cssObjectToString(obj: Record<string, string>): string {
  let string = ''
  Object.keys(obj).forEach(style => {
    string += `${style}:${obj[style]};`
  })

  return string
}

/**
 * Helper that composes styles with the default style for a tag, the "style" attribute and
 * any given addiitional style. Checks everything against the style sets of views, images,
 * or texts with prop-types.
 * @export
 * @param {any} { tagName, htmlAttribs, passProps, additionalStyles, styleSet = 'VIEW' }
 * @returns {object}
 */
export function _constructStyles({
  tagName,
  htmlAttribs,
  passProps,
  additionalStyles,
  styleSet = 'VIEW',
  baseFontSize
}: ConstructStylesParams): (RNStyle | undefined)[] {
  const defaultTextStyles = generateDefaultTextStyles(baseFontSize)
  const defaultBlockStyles = generateDefaultBlockStyles(baseFontSize)

  ;(passProps.ignoredStyles || []).forEach(ignoredStyle => {
    htmlAttribs[ignoredStyle] && delete htmlAttribs[ignoredStyle]
  })

  let style: (RNStyle | undefined)[] = [
    (styleSet === 'VIEW' ? defaultBlockStyles : defaultTextStyles)[tagName],
    passProps.tagsStyles ? passProps.tagsStyles[tagName] : undefined,
    _getElementClassStyles(htmlAttribs, passProps.classesStyles),
    htmlAttribs.style
      ? cssStringToRNStyle(htmlAttribs.style, STYLESETS[styleSet], {
          ...passProps,
          parentTag: tagName
        })
      : undefined
  ]

  if (additionalStyles) {
    style = style.concat(
      (Array.isArray(additionalStyles) && additionalStyles.length
        ? additionalStyles
        : [additionalStyles]) as (RNStyle | undefined)[]
    )
  }

  return style.filter(item => item !== undefined)
}

/**
 * Computes the styles of a text node
 * @export
 * @param {any} element parsed DOM node of text
 * @param {any} passProps set of props from the HTML component
 * @returns {object} react-native styles
 */
export function computeTextStyles(element: HTMLNode, passProps: PassProps): RNStyle {
  const finalStyle: Record<string, unknown> = {}

  // Construct an array with the styles of each level of the text node, ie :
  // [element, parent1, parent2, parent3...]
  const parentStyles = _recursivelyComputeParentTextStyles(element, passProps)

  // Only merge the keys that aren't yet applied to the final object. ie:
  // if fontSize is already set in the first iteration, ignore the fontSize that
  // we got from the 3rd iteration because of a class for instance, hence
  // respecting the proper style inheritance
  parentStyles.forEach(styles => {
    const entries = Object.entries(styles) as [string, unknown][]
    entries.forEach(([styleKey, styleValue]) => {
      if (!finalStyle[styleKey]) {
        finalStyle[styleKey] = styleValue
      }
    })
  })

  // Finally, try to add the baseFontStyle values to add pontentially missing
  // styles to each text node
  return { ...passProps.baseFontStyle, ...finalStyle } as RNStyle
}

function _recursivelyComputeParentTextStyles(
  element: HTMLNode,
  passProps: PassProps,
  styles: RNStyle[] = []
): RNStyle[] {
  const { attribs, name } = element
  const { classesStyles, tagsStyles, defaultTextStyles } = passProps

  // Construct every style for this node
  const HTMLAttribsStyles =
    attribs && attribs.style ? cssStringToRNStyle(attribs.style, STYLESETS.TEXT, passProps) : {}
  const classStyles = _getElementClassStyles(attribs, classesStyles)
  const userTagStyles = tagsStyles[name]
  const defaultTagStyles = defaultTextStyles[name]

  // Merge those according to their priority level
  const mergedStyles = {
    ...defaultTagStyles,
    ...userTagStyles,
    ...classStyles,
    ...HTMLAttribsStyles
  }

  styles.push(mergedStyles)

  if (element.parent) {
    // Keep looping recursively if this node has parents
    return _recursivelyComputeParentTextStyles(element.parent, passProps, styles)
  }

  return styles
}

/**
 * Creates a set of style from an array of classes asosciated to a node.
 * @export
 * @param {any} htmlAttribs
 * @param {any} [classesStyles={}]
 * @returns {object}
 */
export function _getElementClassStyles(
  htmlAttribs: HTMLAttribs,
  classesStyles: StyleMap = {}
): RNStyle {
  const elementClasses = _getElementCSSClasses(htmlAttribs)
  let styles: RNStyle = {}
  elementClasses.forEach(className => {
    if (classesStyles[className]) {
      styles = { ...styles, ...classesStyles[className] }
    }
  })

  return styles
}

/**
 * Simple helper that returns an array of classes of a node.
 * @export
 * @param {any} htmlAttribs
 * @returns {array}
 */
export function _getElementCSSClasses(htmlAttribs?: HTMLAttribs): string[] {
  if (!htmlAttribs || !htmlAttribs.class) {
    return []
  }

  return htmlAttribs.class.split(' ')
}

/**
 * Converts a html style to its equavalent react native style
 * @param {object} css: object of key value css strings
 * @param {string} styleset: the styleset to convert the styles against
 * @param {object} { parentTag, emSize, ignoredStyles }
 * @returns {object}
 */
function cssToRNStyle(
  css: Record<string, string>,
  styleset: StyleSet,
  { emSize, ptSize, ignoredStyles, allowedStyles }: PassProps = {}
): RNStyle {
  const styleProps = stylePropTypes[styleset]
  return Object.keys(css)
    .filter(key => (allowedStyles ? allowedStyles.indexOf(key) !== -1 : true))
    .filter(key => (ignoredStyles || []).indexOf(key) === -1)
    .map(key => [key, css[key]] as [string, string])
    .map(
      ([key, value]) =>
        [
          key
            .split('-')
            .map((item, index) => (index === 0 ? item : item[0].toUpperCase() + item.substr(1)))
            .join(''),
          value
        ] as [string, string]
    )
    .map(([key, value]): [string, string | number] | undefined => {
      if (styleProps.indexOf(key) === -1) {
        return undefined
      }

      if (typeof value === 'string') {
        if (
          value.search('inherit') !== -1 ||
          value.search('calc') !== -1 ||
          value.search('normal') !== -1
        ) {
          return undefined
        }

        const nextValue = value.replace('!important', '')
        // See if we can use the percentage directly
        if (nextValue.search('%') !== -1 && PERC_SUPPORTED_STYLES.indexOf(key) !== -1) {
          return [key, nextValue]
        }
        if (nextValue.search('em') !== -1) {
          const pxSize = parseFloat(nextValue.replace('em', '')) * emSize
          return [key, pxSize]
        }
        if (nextValue.search('pt') !== -1) {
          const pxSize = parseFloat(nextValue.replace('pt', '')) * ptSize
          return [key, pxSize]
        }
        // See if we can convert a 20px to a 20 automagically
        const numericValue = parseFloat(nextValue.replace('px', ''))
        if (key !== 'fontWeight' && !isNaN(numericValue)) {
          if (styleProps.indexOf(key) !== -1) {
            return [key, numericValue]
          }
        }
        if (key === 'fontSize') {
          return mapAbsoluteFontSize(key, nextValue)
        }

        return [key, nextValue]
      }

      return [key, value]
    })
    .filter((prop): prop is [string, string | number] => prop !== undefined)
    .reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {} as RNStyle)
}

/**
 * @param {string} key: the key of style
 * @param {string} value: the value of style
 * @return {array}
 */
function mapAbsoluteFontSize(key: string, value: string): [string, string | number] {
  let fontSize: string | number | null = value
  if (ABSOLUTE_FONT_SIZE.hasOwnProperty(value)) {
    fontSize = ABSOLUTE_FONT_SIZE[value]
  }

  return [key, fontSize]
}

/**
 * @param str: the css style string
 * @param styleset=STYLESETS.TEXT: the styleset to convert the styles against
 * @return a react native style object
 */
export function cssStringToRNStyle(
  str: string,
  styleset: StyleSet = STYLESETS.TEXT,
  options?: PassProps
): RNStyle {
  return cssToRNStyle(cssStringToObject(str), styleset, options)
}
