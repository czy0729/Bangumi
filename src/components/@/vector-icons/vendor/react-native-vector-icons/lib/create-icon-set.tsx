/*
 * @Author: czy0729
 * @Date: 2026-09-19 07:23:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 08:01:45
 */
import { PureComponent } from 'react'
import { PixelRatio, Platform, processColor, Text } from 'react-native'
import createIconSourceCache from './create-icon-source-cache'
import ensureNativeModuleAvailable from './ensure-native-module-available'
import createIconButtonComponent from './icon-button'

import type { ComponentClass } from 'react'
import type { ColorValue, TextStyle } from 'react-native'
import type { IconButtonProps, IconComponentProps } from './icon-button'

export const DEFAULT_ICON_SIZE = 12
export const DEFAULT_ICON_COLOR = 'black'

/** glyphmap: 图标名 → 字体码点 */
export type GlyphMap<G extends string> = { [K in G]: number | string }

/** getImageSource 渲染出的位图信息 */
export type IconImageSource = {
  uri: string
  width?: number
  height?: number
  scale: number
}

export default function createIconSet<G extends string, FN extends string>(
  glyphMap: GlyphMap<G>,
  fontFamily: FN,
  fontFile: string | null,
  fontStyle?: TextStyle
) {
  // Android doesn't care about actual fontFamily name, it will only look in fonts folder.
  const fontBasename = fontFile ? fontFile.replace(/\.(otf|ttf)$/, '') : fontFamily

  const fontReference = Platform.select({
    windows: `/Assets/${fontFile}#${fontFamily}`,
    android: fontBasename,
    web: fontBasename,
    default: fontFamily as string
  })

  class Icon extends PureComponent<IconComponentProps> {
    root = null

    static defaultProps = {
      size: DEFAULT_ICON_SIZE,
      allowFontScaling: false
    }

    render() {
      const { name, size, color, style, children, ...props } = this.props

      let glyph = name ? glyphMap[name as G] || '?' : ''
      if (typeof glyph === 'number') {
        glyph = String.fromCodePoint(glyph)
      }

      const styleDefaults: TextStyle = { fontSize: size, color }
      const styleOverrides: TextStyle = {
        fontFamily: fontReference,
        fontWeight: 'normal',
        fontStyle: 'normal'
      }

      return (
        <Text
          selectable={false}
          {...props}
          style={[styleDefaults, style, styleOverrides, fontStyle]}
        >
          {glyph}
          {children}
        </Text>
      )
    }
  }

  const imageSourceCache = createIconSourceCache<IconImageSource>()

  function resolveGlyph(name: string) {
    const glyph = (glyphMap as Record<string, number | string>)[name] || '?'
    if (typeof glyph === 'number') {
      return String.fromCodePoint(glyph)
    }
    return glyph
  }

  function getImageSourceSync(
    name: G,
    size: number = DEFAULT_ICON_SIZE,
    color: ColorValue = DEFAULT_ICON_COLOR
  ): IconImageSource {
    const api = ensureNativeModuleAvailable()

    const glyph = resolveGlyph(name)
    const processedColor = processColor(color)
    const cacheKey = `${glyph}:${size}:${String(processedColor)}`

    if (imageSourceCache.has(cacheKey)) {
      return imageSourceCache.get(cacheKey) as IconImageSource
    }
    try {
      const imagePath = api.getImageForFontSync(fontReference, glyph, size, processedColor)
      const value: IconImageSource = { uri: imagePath, scale: PixelRatio.get() }
      imageSourceCache.setValue(cacheKey, value)
      return value
    } catch (error) {
      imageSourceCache.setError(cacheKey, error)
      throw error
    }
  }

  async function getImageSource(
    name: G,
    size: number = DEFAULT_ICON_SIZE,
    color: ColorValue = DEFAULT_ICON_COLOR
  ): Promise<IconImageSource> {
    const api = ensureNativeModuleAvailable()

    const glyph = resolveGlyph(name)
    const processedColor = processColor(color)
    const cacheKey = `${glyph}:${size}:${String(processedColor)}`

    if (imageSourceCache.has(cacheKey)) {
      return imageSourceCache.get(cacheKey) as IconImageSource
    }
    try {
      const imagePath = await api.getImageForFont(fontReference, glyph, size, processedColor)
      const value: IconImageSource = { uri: imagePath, scale: PixelRatio.get() }
      imageSourceCache.setValue(cacheKey, value)
      return value
    } catch (error) {
      imageSourceCache.setError(cacheKey, error)
      throw error
    }
  }

  async function loadFont(file: string | null = fontFile) {
    if (Platform.OS === 'ios') {
      const api = ensureNativeModuleAvailable()
      if (!file) {
        throw new Error('Unable to load font, because no file was specified. ')
      }
      await api.loadFontWithFileName(...file.split('.'))
    }
  }

  function hasIcon(name: string) {
    return Object.prototype.hasOwnProperty.call(glyphMap, name)
  }

  function getRawGlyphMap() {
    return glyphMap
  }

  function getFontFamily() {
    return fontReference as FN
  }

  interface IconStatics {
    Button: ComponentClass<IconButtonProps<G>>
    getImageSource: typeof getImageSource
    getImageSourceSync: typeof getImageSourceSync
    loadFont: typeof loadFont
    hasIcon: typeof hasIcon
    getRawGlyphMap: typeof getRawGlyphMap
    getFontFamily: typeof getFontFamily
  }

  const IconWithStatics = Icon as unknown as typeof Icon & IconStatics

  IconWithStatics.Button = createIconButtonComponent<G>(Icon)
  IconWithStatics.getImageSource = getImageSource
  IconWithStatics.getImageSourceSync = getImageSourceSync
  IconWithStatics.loadFont = loadFont
  IconWithStatics.hasIcon = hasIcon
  IconWithStatics.getRawGlyphMap = getRawGlyphMap
  IconWithStatics.getFontFamily = getFontFamily

  return IconWithStatics
}
