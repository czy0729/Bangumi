/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-02 14:47:17
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { _ } from '@stores'
import { open } from '@utils'
import axios from '@utils/thirdParty/axios'
import { Flex } from '../flex'
import { Image } from '../image'
import { Touchable } from '../touchable'
import { Iconfont } from '../iconfont'
import { Text } from '../text'

const memoSize = {}
function getSize(url) {
  return new Promise(resolve => {
    if (url in memoSize) {
      resolve(memoSize[url])
      return
    }

    axios
      .head(url)
      .then(response => {
        if (response?.status !== 200) {
          memoSize[url] = 0
          resolve(memoSize[url])
          return
        }

        const length = response?.headers?.['content-length']
        memoSize[url] = parseInt(length / 1024)
        resolve(memoSize[url])
      })
      .catch(() => {
        memoSize[url] = 0
        resolve(memoSize[url])
      })
  })
}

export default
@observer
class ToggleImage extends React.Component {
  static defaultProps = {
    onImageFallback: Function.prototype
  }

  state = {
    show: this.props.show || false,
    loaded: false,
    size: '-'
  }

  async componentDidMount() {
    const { src } = this.props
    const size = await getSize(src)
    this.setState({
      size
    })
  }

  toggleShow = () => {
    const { show } = this.state
    this.setState({
      show: !show
    })
  }

  onLoadEnd = () =>
    this.setState({
      loaded: true
    })

  render() {
    // RN不使用第三方link包暂时不支持webp, 暂时使用浏览器跳转
    const { src, onImageFallback } = this.props
    const isRemote = typeof src === 'string'
    if (isRemote && src.includes('.webp')) {
      return (
        <Touchable style={this.styles.image} onPress={onImageFallback}>
          <Flex
            style={this.styles.imagePlaceholder}
            direction='column'
            justify='center'
          >
            <Text size={10} type='sub'>
              框架暂不支持webp图片, 使用浏览器打开
            </Text>
            {isRemote && (
              <Text
                style={this.styles.textSrc}
                size={10}
                type='sub'
                selectable
                numberOfLines={1}
              >
                {src}
              </Text>
            )}
          </Flex>
        </Touchable>
      )
    }

    const { show, loaded, size } = this.state
    const ext = src.includes('.jpg')
      ? 'jpg'
      : src.includes('.png')
      ? 'png'
      : src.includes('.gif')
      ? 'gif'
      : ''
    if (!show) {
      const text = []
      if (ext) text.push(`[${ext}]`)
      if (size === 0) {
        text.push('[获取信息失败]')
      } else {
        text.push(`[${size}kb]`)
      }
      return (
        <Touchable
          style={this.styles.image}
          onPress={this.toggleShow}
          onLongPress={() => open(src)}
        >
          <Flex
            style={this.styles.imagePlaceholder}
            direction='column'
            justify='center'
          >
            <Text size={12} type='sub' bold>
              {text.join(' ')}
            </Text>
            {isRemote && (
              <Text
                style={this.styles.textSrc}
                size={10}
                type='sub'
                selectable
                numberOfLines={1}
              >
                {src}
              </Text>
            )}
          </Flex>
        </Touchable>
      )
    }

    return (
      <Flex style={this.styles.image} justify='center'>
        <Image
          {...this.props}
          radius
          onLoadEnd={this.onLoadEnd}
          onError={this.onLoadEnd}
        />
        {!this.props.show && (
          <View style={this.styles.closeImageWrap}>
            <Touchable onPress={this.toggleShow} onLongPress={() => open(src)}>
              <Flex style={this.styles.closeImage} justify='center'>
                <Iconfont size={18} name='md-close' color={_.__colorPlain__} />
              </Flex>
            </Touchable>
          </View>
        )}
        {!loaded && (
          <Flex
            style={[
              StyleSheet.absoluteFill,
              {
                width: this.props.autoSize
              }
            ]}
            justify='center'
          >
            <ActivityIndicator size='small' color={_.colorIcon} />
          </Flex>
        )}
      </Flex>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(() => ({
  image: {
    marginVertical: _.sm
  },
  loading: {
    width: 32,
    height: 32
  },
  imagePlaceholder: {
    width: '100%',
    height: 96 * _.ratio,
    borderWidth: 1,
    borderColor: _.colorBorder
  },
  closeImageWrap: {
    position: 'absolute',
    zIndex: 1,
    top: 12,
    right: 8
  },
  closeImage: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    overflow: 'hidden'
  },
  textSrc: {
    maxWidth: '64%',
    marginTop: _.sm
  }
}))
