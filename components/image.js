/*
 * @Author: czy0729
 * @Date: 2019-03-15 06:17:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-23 15:39:50
 */
import React from 'react'
import { StyleSheet, View, Image as RNImage } from 'react-native'
import {
  CacheManager,
  Image as AnimateImage
} from 'react-native-expo-image-cache'
import { IOS, IMG_EMPTY } from '@constants'
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
    onPress: undefined,
    onLongPress: undefined
  }

  state = {
    uri: undefined
  }

  componentDidMount() {
    this.cache(this.props.src)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.cache(nextProps.src)
    }
  }

  cache = async src => {
    // @issue 安卓无法使用? 并且安卓貌似自带缓存
    if (IOS) {
      let uri
      if (typeof src === 'string') {
        let _src = src.replace('http://', 'https://')
        if (_src.indexOf('https:') === -1) {
          _src = `https:${_src}`
        }
        const path = await CacheManager.get(_src).getPath()
        if (path) {
          uri = path
        } else {
          uri = _src
        }
        this.setState({
          uri
        })
      }
    } else {
      let _src = src
      if (typeof _src === 'string') {
        _src = src.replace('http://', 'https://')
        if (_src.indexOf('https:' === -1)) {
          _src = `https:${_src}`
        }
      }
      this.setState({
        uri: _src
      })
    }
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
      onPress,
      onLongPress,
      ...other
    } = this.props
    const { uri } = this.state
    const _wrap = []
    const _image = []
    if (size) {
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
    if (typeof src === 'string' || typeof src === 'undefined') {
      if (uri) {
        image = (
          <AnimateImage
            style={_image}
            tint='light'
            preview={IMG_EMPTY}
            uri={uri}
            {...other}
          />
        )
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
  }
})
