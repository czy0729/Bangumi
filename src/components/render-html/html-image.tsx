/*
 * @Author: czy0729
 * @Date: 2026-11-23 05:33:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-23 22:05:57
 *
 * vendor 自 react-native-render-html@4.1.1/src (上游已停更)
 * 原 patches/react-native-render-html+4.1.1.patch 的差异 (style 校验) 由 TS 类型取代
 * 本地差异: StyleSheet.flatten 取尺寸, 挂载时先置位 mounted
 */
import { PureComponent } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import type { ImageStyle, StyleProp } from 'react-native'

export interface HTMLImageProps {
  source: { uri: string }
  alt?: string
  height?: number | string
  width?: number | string
  style?: StyleProp<ImageStyle>
  imagesMaxWidth?: number
  imagesInitialDimensions?: { width: number; height: number }
}

interface HTMLImageState {
  width: number | string
  height: number | string
  error?: boolean
}

export default class HTMLImage extends PureComponent<HTMLImageProps, HTMLImageState> {
  private mounted?: boolean

  static defaultProps = {
    imagesInitialDimensions: {
      width: 100,
      height: 100
    }
  }

  constructor(props: HTMLImageProps) {
    super(props)
    this.state = {
      width: props.imagesInitialDimensions.width,
      height: props.imagesInitialDimensions.height
    }
  }

  componentDidMount() {
    // 先置位再取尺寸: 上游顺序会把首次尺寸结果挡在 mounted 判断外
    this.mounted = true
    this.getImageSize()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  UNSAFE_componentWillReceiveProps(nextProps: HTMLImageProps) {
    this.getImageSize(nextProps)
  }

  getDimensionsFromStyle(
    style: StyleProp<ImageStyle>,
    height?: number | string,
    width?: number | string
  ): { styleWidth?: number | string; styleHeight?: number | string } {
    let styleWidth: number | string
    let styleHeight: number | string

    if (height) {
      styleHeight = height
    }
    if (width) {
      styleWidth = width
    }
    const flattened: ImageStyle = StyleSheet.flatten(style)
    if (!width && flattened?.width) {
      styleWidth = flattened.width
    }
    if (!height && flattened?.height) {
      styleHeight = flattened.height
    }

    return { styleWidth, styleHeight }
  }

  getImageSize(props: HTMLImageProps = this.props) {
    const { source, imagesMaxWidth, style, height, width } = props
    const { styleWidth, styleHeight } = this.getDimensionsFromStyle(style, height, width)

    if (styleWidth && styleHeight) {
      return (
        this.mounted &&
        this.setState({
          width:
            typeof styleWidth === 'string' && styleWidth.search('%') !== -1
              ? styleWidth
              : parseInt(String(styleWidth), 10),
          height:
            typeof styleHeight === 'string' && styleHeight.search('%') !== -1
              ? styleHeight
              : parseInt(String(styleHeight), 10)
        })
      )
    }
    // Fetch image dimensions only if they aren't supplied or if with or height is missing
    Image.getSize(
      source.uri,
      (originalWidth, originalHeight) => {
        if (!imagesMaxWidth) {
          return this.mounted && this.setState({ width: originalWidth, height: originalHeight })
        }
        const optimalWidth = imagesMaxWidth <= originalWidth ? imagesMaxWidth : originalWidth
        const optimalHeight = (optimalWidth * originalHeight) / originalWidth
        this.mounted && this.setState({ width: optimalWidth, height: optimalHeight, error: false })
      },
      () => {
        this.mounted && this.setState({ error: true })
      }
    )
  }

  validImage(source: HTMLImageProps['source'], style: StyleProp<ImageStyle>) {
    return (
      <Image
        source={source}
        style={[
          style,
          { width: this.state.width, height: this.state.height, resizeMode: 'cover' } as ImageStyle
        ]}
      />
    )
  }

  get errorImage() {
    return (
      <View
        style={{
          width: 50,
          height: 50,
          borderWidth: 1,
          borderColor: 'lightgray',
          overflow: 'hidden',
          justifyContent: 'center'
        }}
      >
        {this.props.alt ? (
          <Text style={{ textAlign: 'center', fontStyle: 'italic' }}>{this.props.alt}</Text>
        ) : (
          false
        )}
      </View>
    )
  }

  render() {
    const { source, style } = this.props

    return !this.state.error ? this.validImage(source, style) : this.errorImage
  }
}
