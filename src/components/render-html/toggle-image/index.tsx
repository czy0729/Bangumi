/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-16 08:47:14
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { _, rakuenStore } from '@stores'
import { open } from '@utils'
import { Flex } from '../../flex'
import { Image } from '../../image'
import { Touchable } from '../../touchable'
import { Text } from '../../text'
import { Iconfont } from '../../iconfont'
import { memoStyles } from './styles'
import { getSize } from './utils'
import { Props, State } from './types'

class ToggleImage extends React.Component<Props, State> {
  static defaultProps = {
    onImageFallback: () => {}
  }

  state = {
    show: this.props.show || false,
    loaded: false,
    size: '-'
  }

  async componentDidMount() {
    const { src } = this.props
    const size = await getSize(src as string)
    this.setState(
      {
        size: size || '?'
      },
      () => {
        if (rakuenStore.setting.autoLoadImage) {
          this.setState({
            show: true
          })
        }
      }
    )
  }

  toggleShow = () => {
    const { show } = this.state
    this.setState({
      show: !show
    })
  }

  onLoadEnd = () => {
    return this.setState({
      loaded: true
    })
  }

  get src() {
    const { src } = this.props
    if (typeof src !== 'string') return src
    return src.replace(/ /g, '%20')
  }

  get isIcon() {
    if (typeof this.src !== 'string') return false

    if (this.src.includes('https://static.saraba1st.com/image/smiley/')) {
      return true
    }

    const { size } = this.state
    if (typeof size === 'number' && size <= 50) return true
  }

  render() {
    // RN 不使用第三方 link 包暂时不支持 webp, 暂时使用浏览器跳转
    const { onImageFallback } = this.props
    const { show, loaded, size } = this.state

    if (!this.isIcon) {
      const isRemote = typeof this.src === 'string'
      if (isRemote && (this.src as string).includes('.webp')) {
        return (
          <Touchable style={this.styles.image} onPress={onImageFallback}>
            <Flex
              style={this.styles.imagePlaceholder}
              direction='column'
              justify='center'
            >
              <Text size={10} type='sub'>
                框架暂不支持webp, 使用浏览器打开
              </Text>
              {isRemote && (
                <Text
                  style={this.styles.textSrc}
                  size={10}
                  type='sub'
                  selectable
                  numberOfLines={1}
                >
                  {this.src as string}
                </Text>
              )}
            </Flex>
          </Touchable>
        )
      }

      let ext = ''
      if (isRemote) {
        ext = (this.src as string).includes('.jpg')
          ? 'jpg'
          : (this.src as string).includes('.png')
          ? 'png'
          : (this.src as string).includes('.gif')
          ? 'gif'
          : ''
      }

      if (!show) {
        const text = []
        if (ext) text.push(`[${ext}]`)
        if (typeof size === 'number' && size === 0) {
          text.push('[获取大小失败]')
        } else {
          text.push(`[${size}kb]`)
        }
        return (
          <Touchable
            style={[this.styles.image, this.styles.isLoad]}
            onPress={this.toggleShow}
            onLongPress={() => open(this.src as string)}
          >
            <Flex
              style={this.styles.imagePlaceholder}
              direction='column'
              justify='center'
            >
              <Text size={11} type='sub' bold>
                {text.join(' ')}
              </Text>
              {isRemote && (
                <Text
                  style={this.styles.textSrc}
                  size={9}
                  lineHeight={10}
                  type='sub'
                  align='center'
                  // selectable
                  numberOfLines={2}
                >
                  {this.src as string}
                </Text>
              )}
            </Flex>
          </Touchable>
        )
      }
    }

    let _autoSize: number | boolean
    if (typeof this.props.autoSize === 'number' && this.props.autoSize) {
      _autoSize = this.props.autoSize - _.sm
    }
    return (
      <Flex
        style={!loaded ? [this.styles.image, this.styles.isLoad] : this.styles.image}
        justify={this.isIcon ? 'start' : 'center'}
      >
        <Image
          {...this.props}
          autoSize={_autoSize}
          radius={_.radiusXs}
          fallback
          onLoadEnd={this.onLoadEnd}
          onError={this.onLoadEnd}
        />
        <View style={this.styles.closeImageWrap}>
          <Touchable
            onPress={this.toggleShow}
            onLongPress={() => open(this.src as string)}
          >
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
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default observer(ToggleImage)
