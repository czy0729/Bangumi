/*
 * 图片
 * 1. 支持各种样式设置
 * 2. 支持本地和远端图片
 * 3. 图片缓存到本地, @todo 安卓
 * 4. 远端图片自动获取高度
 * 5. 错误处理
 * 6. 自动选择Bangumi图片质量
 * @Author: czy0729
 * @Date: 2019-03-15 06:17:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-17 22:12:22
 */
import React from 'react'
import { StyleSheet, View, Image as RNImage } from 'react-native'
import { CacheManager } from 'react-native-expo-image-cache'
import { systemStore } from '@stores'
import { IOS, IMG_ERROR } from '@constants'
import { colorBg, radiusXs, shadow } from '@styles'
import Touchable from './touchable'

export default class Image extends React.Component {
  static defaultProps = {
    style: undefined,
    imageStyle: undefined, // 强制传递给图片的样式
    src: undefined,
    size: 40, // 大小|宽度
    height: undefined, // 高度
    border: false, // 边框
    radius: false, // 圆角
    shadow: false, // 阴影
    placeholder: true, // 是否有底色
    autoSize: 0, // 支持自动计算远端图片高度, 传递图片的宽度, 高度适应比例
    onPress: undefined,
    onLongPress: undefined
  }

  state = {
    error: false,
    uri: undefined,
    width: 0,
    height: 0
  }

  errorCount = 0

  async componentDidMount() {
    const { src, autoSize } = this.props
    await this.cache(src)
    if (autoSize) {
      this.getSize()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.cache(nextProps.src)
    }
  }

  cache = async src => {
    let res
    let uri
    let quality = false
    if (systemStore.isWifi) {
      quality = true
    }

    // @issue 安卓还没调试出怎么使用, 并且安卓貌似自带缓存?
    if (IOS) {
      try {
        if (typeof src === 'string') {
          let _src = src.replace('http://', 'https://')
          if (_src.indexOf('https:') === -1) {
            _src = `https:${_src}`
          }

          // 全局控制图片质量的设置
          if (quality) {
            _src = _src.replace(/\/m\/|\/g\/|\/s\//, '/l/')
          }

          res = CacheManager.get(_src).getPath()
          const path = await res
          if (path) {
            uri = path
          } else {
            uri = _src
          }
          this.setState({
            uri
          })
        }
      } catch (e) {
        // 图片是不是会下载失败, 当错误次数大于3就认为是错误
        if (this.errorCount < 3) {
          setTimeout(() => {
            this.errorCount += 1
            this.cache(src)
          }, 1600)
        } else {
          this.setState({
            error: true
          })
        }
      }
    } else {
      uri = src
      if (typeof uri === 'string') {
        uri = src.replace('http://', 'https://')
        if (uri.indexOf('https:') === -1) {
          uri = `https:${uri}`
        }
      }
      this.setState({
        uri
      })
    }

    return res
  }

  getSize = () => {
    const { autoSize } = this.props
    const { uri } = this.state
    if (typeof uri !== 'string' || typeof autoSize !== 'number') {
      return
    }

    RNImage.getSize(uri, (width, height) => {
      let _width
      let _height

      // 假如图片本身的宽度没有超过给定的最大宽度, 直接沿用图片原尺寸
      if (width < autoSize) {
        _width = width
        _height = height
      } else {
        _width = autoSize
        _height = Math.floor((autoSize / width) * height)
      }
      this.setState({
        width: _width,
        height: _height
      })
    })
  }

  render() {
    const {
      style,
      imageStyle,
      src,
      size,
      height,
      border,
      radius,
      shadow,
      placeholder,
      autoSize,
      onPress,
      onLongPress,
      ...other
    } = this.props
    const { error, uri, width: _width, height: _height } = this.state
    const _wrap = []
    const _image = []

    // 以state里面的width和height优先
    if (autoSize) {
      _image.push({
        width: _width || 160,
        height: _height || 160
      })
    } else if (size) {
      _image.push({
        width: size,
        height: height || size
      })
    }
    if (border) {
      if (typeof border === 'string') {
        _image.push({
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: border
        })
      } else {
        _image.push(styles.border)
      }
    }
    if (radius) {
      _wrap.push(styles.radius)
      _image.push(styles.radius)
    }
    if (shadow) {
      _wrap.push(styles.shadow)
    }
    if (placeholder) {
      _wrap.push(styles.placeholder)
    }
    if (style) {
      _wrap.push(style)
    }
    if (imageStyle) {
      _wrap.push(imageStyle)
      _image.push(imageStyle)
    }

    let image
    if (error) {
      image = (
        <RNImage style={[_image, styles.error]} source={IMG_ERROR} {...other} />
      )
    } else if (typeof src === 'string' || typeof src === 'undefined') {
      if (uri) {
        // image = (
        //   <AnimateImage
        //     style={_image}
        //     tint='light'
        //     preview={IMG_EMPTY}
        //     uri={uri}
        //     {...other}
        //   />
        // )
        image = <RNImage style={_image} source={{ uri }} {...other} />
      } else {
        image = <View style={_image} />
      }
    } else {
      image = <RNImage style={_image} source={src} {...other} />
    }

    if (onPress || onLongPress) {
      return (
        <Touchable
          style={_wrap}
          highlight={IOS}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          {image}
        </Touchable>
      )
    }

    return <View style={_wrap}>{image}</View>
  }
}

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)'
  },
  radius: {
    borderRadius: radiusXs
  },
  shadow,
  placeholder: {
    backgroundColor: colorBg
  },
  error: {
    padding: 4
  }
})
