/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-11 13:17:16
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { _ } from '@stores'
import { open } from '@utils'
import axios from '@utils/thirdParty/axios'
import { Flex } from '../../flex'
import { Image } from '../../image'
import { Props as ImageProps } from '../../image/types'
import { Touchable } from '../../touchable'
import { Text } from '../../text'
import { Iconfont } from '../../iconfont'
import { memoStyles } from './styles'

type Props = ImageProps & {
  show?: boolean
  onImageFallback?: (arg0?: any) => any
}

type State = {
  show: boolean
  loaded: boolean | number
  size: string | number
}

const memoSize = {}
function getSize(url): Promise<number> {
  return new Promise(resolve => {
    if (url in memoSize) {
      resolve(memoSize[url])
      return
    }

    axios
      // @ts-ignore
      .head(url)
      .then(response => {
        if (response?.status !== 200) {
          memoSize[url] = 0
          resolve(memoSize[url])
          return
        }

        const length = response?.headers?.['content-length']
        memoSize[url] = parseInt(String(length / 1024))
        resolve(memoSize[url])
      })
      .catch(() => {
        memoSize[url] = 0
        resolve(memoSize[url])
      })
  })
}

class ToggleImage extends React.Component<Props, State> {
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

  get isIcon() {
    const { src } = this.props
    if (typeof src !== 'string') return false
    if (src.includes('https://static.saraba1st.com/image/smiley/')) return true

    const { size } = this.state
    if (typeof size === 'number' && size <= 50) return true
  }

  render() {
    // RN不使用第三方link包暂时不支持webp, 暂时使用浏览器跳转
    const { src, onImageFallback } = this.props
    const { show, loaded, size } = this.state

    if (!this.isIcon) {
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
                  {src}
                </Text>
              )}
            </Flex>
          </Touchable>
        )
      }

      let ext = ''
      if (isRemote) {
        ext = src.includes('.jpg')
          ? 'jpg'
          : src.includes('.png')
          ? 'png'
          : src.includes('.gif')
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
            onLongPress={() => open(src)}
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
    }

    let _autoSize
    if (typeof this.props.autoSize === 'number' && this.props.autoSize) {
      _autoSize = this.props.autoSize - _.sm
    }
    return (
      <Flex
        style={[this.styles.image, !loaded && this.styles.isLoad]}
        justify={this.isIcon ? 'start' : 'center'}
      >
        <Image
          {...this.props}
          autoSize={_autoSize}
          radius
          fallback
          onLoadEnd={this.onLoadEnd}
          onError={this.onLoadEnd}
        />
        {!loaded && (
          <>
            <View style={this.styles.closeImageWrap}>
              <Touchable onPress={this.toggleShow} onLongPress={() => open(src)}>
                <Flex style={this.styles.closeImage} justify='center'>
                  <Iconfont size={16} name='md-close' color={_.colorSub} />
                </Flex>
              </Touchable>
            </View>
            <Flex style={this.styles.loading} justify='center'>
              <ActivityIndicator
                size='small'
                // @ts-ignore
                color={_.colorIcon}
              />
            </Flex>
          </>
        )}
      </Flex>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default observer(ToggleImage)
