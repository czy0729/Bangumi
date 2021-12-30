/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-30 08:22:46
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { _ } from '@stores'
import { open } from '@utils'
import { Flex } from '../flex'
import { Image } from '../image'
import { Touchable } from '../touchable'
import { Iconfont } from '../iconfont'
import { Text } from '../text'

export default
@observer
class ToggleImage extends React.Component {
  static defaultProps = {
    onImageFallback: Function.prototype
  }

  state = {
    show: this.props.show || false,
    loaded: false
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

    const { show, loaded } = this.state
    if (!show) {
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
            <Text size={10} type='sub'>
              点击显示图片，长按浏览器打开
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
        <Image {...this.props} onLoadEnd={this.onLoadEnd} onError={this.onLoadEnd} />
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

const memoStyles = _.memoStyles(_ => ({
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
    top: _.sm,
    right: _.sm
  },
  closeImage: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    overflow: 'hidden'
  },
  textSrc: {
    maxWidth: '64%',
    marginTop: _.sm
  }
}))
