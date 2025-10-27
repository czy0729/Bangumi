/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-18 11:33:55
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { _, rakuenStore } from '@stores'
import { open, stl } from '@utils'
import { FROZEN_FN } from '@constants'
import { Flex } from '../../flex'
import { Iconfont } from '../../iconfont'
import { Image } from '../../image'
import { Text } from '../../text'
import { Touchable } from '../../touchable'
import { getSize } from './utils'
import { memoStyles } from './styles'
import { Props, State } from './types'

class ToggleImage extends React.Component<Props, State> {
  static defaultProps = {
    onImageFallback: FROZEN_FN
  }

  static displayName = 'ToggleImage'

  state = {
    show: this.props.show || false,
    loaded: false,
    size: ''
  }

  async componentDidMount() {
    const size = await getSize(this.props.src as string)
    this.setState(
      {
        size: size || '',
        loaded: Boolean(size)
      },
      () => {
        const limit = Number(rakuenStore.setting.autoLoadImageV2 || 0)
        if (limit && (limit === 10000 || (size && limit >= size))) {
          this.setState({
            show: true
          })
        }
      }
    )
  }

  toggleShow = () => {
    this.setState({
      show: !this.state.show
    })
  }

  handleLoadEnd = () => {
    this.setState({
      loaded: true
    })
  }

  handleLongPress = () => {
    open(this.src)
  }

  get src() {
    const { src } = this.props
    if (typeof src !== 'string') return src

    return src.replace(/ /g, '%20')
  }

  get isRemote() {
    return typeof this.src === 'string'
  }

  get isIcon() {
    if (typeof this.src !== 'string') return false

    if (this.src.includes('https://static.saraba1st.com/image/smiley/')) return true

    const { size } = this.state
    if (typeof size === 'number' && size <= 2) return true
  }

  get ext() {
    let ext = ''
    if (this.isRemote) {
      ext = (this.src as string).includes('.jpg')
        ? 'jpg'
        : (this.src as string).includes('.png')
        ? 'png'
        : (this.src as string).includes('.gif')
        ? 'gif'
        : 'img'
    }
    return ext
  }

  get info() {
    const text = []
    if (this.ext) text.push(this.ext)

    const { size } = this.state
    if (typeof size === 'number' && size === 0) {
      text.push('获取大小失败')
    } else if (size) {
      text.push(`${size}kb`)
    }

    return text.join('·')
  }

  get autoSize() {
    let autoSize: number | boolean
    if (typeof this.props.autoSize === 'number' && this.props.autoSize) {
      autoSize = this.props.autoSize - 24
    }
    return autoSize
  }

  render() {
    const { show } = this.state
    if (!this.isIcon && !show) {
      return (
        <Touchable
          style={stl(this.styles.image, this.styles.isLoad)}
          onPress={this.toggleShow}
          onLongPress={() => open(this.src as string)}
        >
          <Flex style={this.styles.imagePlaceholder} direction='column' justify='center'>
            <Text size={11} type='sub' bold>
              {this.info}
            </Text>
            {this.isRemote && (
              <Text
                style={this.styles.textSrc}
                size={9}
                lineHeight={10}
                type='sub'
                align='center'
                numberOfLines={2}
              >
                {this.src as string}
              </Text>
            )}
          </Flex>
        </Touchable>
      )
    }

    const { loaded } = this.state
    return (
      <View style={this.styles.image}>
        <Flex style={stl(!loaded && this.styles.isLoad)} justify={this.isIcon ? 'start' : 'center'}>
          {show && (
            <View style={this.styles.remoteImage}>
              <Image
                {...this.props}
                autoSize={this.autoSize}
                radius={_.radiusXs}
                withoutFeedback
                imageViewer={typeof this.src === 'string'}
                imageViewerSrc={typeof this.src === 'string' ? this.src : undefined}
                onLoadEnd={this.handleLoadEnd}
                onError={this.handleLoadEnd}
                onLongPress={this.handleLongPress}
              />
            </View>
          )}
          <View style={this.styles.closeImageWrap}>
            <Touchable style={this.styles.closeImageTouch} onPress={this.toggleShow}>
              <Flex style={this.styles.closeImage} justify='center'>
                <Iconfont size={16} name='md-close' color={_.colorIcon} />
              </Flex>
            </Touchable>
          </View>
          {!loaded && (
            <Flex style={this.styles.loading} justify='center'>
              <ActivityIndicator size='small' color={_.colorIcon} />
            </Flex>
          )}
        </Flex>
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default observer(ToggleImage)
