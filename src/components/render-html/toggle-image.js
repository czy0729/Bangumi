/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-10 00:38:28
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { ActivityIndicator } from '@ant-design/react-native'
import { HOST } from '@constants'
import { _ } from '@stores'
import Flex from '../flex'
import Image from '../image'
import Touchable from '../touchable'
import Iconfont from '../iconfont'
import Text from '../text'

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
        <Touchable style={_.mt.sm} onPress={onImageFallback}>
          <Flex
            style={this.styles.imagePlaceholder}
            direction='column'
            justify='center'
          >
            <Text size={12} type='sub'>
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
        <Touchable style={_.mt.sm} onPress={this.toggleShow}>
          <Flex
            style={this.styles.imagePlaceholder}
            direction='column'
            justify='center'
          >
            <Text size={12} type='sub'>
              点击显示图片
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
      <Flex style={_.mt.sm} justify='center'>
        <Image
          {...this.props}
          headers={{
            Referer: HOST
          }}
          onLoadEnd={this.onLoadEnd}
          onError={this.onLoadEnd}
        />
        {!this.props.show && (
          <Touchable
            style={this.styles.closeImageWrap}
            onPress={this.toggleShow}
          >
            <Flex style={this.styles.closeImage} justify='center'>
              <Iconfont size={13} name='close' color={_.__colorPlain__} />
            </Flex>
          </Touchable>
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
  loading: {
    width: 32,
    height: 32
  },
  imagePlaceholder: {
    width: '100%',
    height: 106,
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
