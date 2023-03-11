/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-11 18:23:15
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { Cover as CompCover } from '@_'
import { systemStore } from '@stores'
import { getCoverLarge, matchCoverUrl } from '@utils'
import { obc } from '@utils/decorators'
import { IMG_DEFAULT } from '@constants'
import { Ctx } from '../types'
import { memoStyles } from './styles'
import { Props } from './types'

const SRC_LOADED = {}

class Cover extends React.Component<Props> {
  state = {
    isLoaded: false
  }

  onLoad = () => {
    if (typeof this.src === 'string') SRC_LOADED[this.src] = true

    this.setState({
      isLoaded: true
    })
  }

  get src() {
    const { $ }: Ctx = this.context
    const { _imageForce } = $.params
    const { image } = this.props
    const src = _imageForce || matchCoverUrl(image) || IMG_DEFAULT
    return src
  }

  get isLoaded() {
    if (typeof this.src === 'string') return SRC_LOADED[this.src] || this.state.isLoaded
    return this.state.isLoaded
  }

  get event() {
    const { $ }: Ctx = this.context
    return {
      id: '条目.封面图查看',
      data: {
        subjectId: $.subjectId
      }
    } as const
  }

  renderPlaceholder() {
    if (this.isLoaded) return null

    const { coverRadius } = systemStore.setting
    const { $ }: Ctx = this.context
    const { placeholder } = this.props
    return (
      <CompCover
        style={[
          this.styles.placeholder,
          this.styles.shadow,
          {
            borderRadius: coverRadius
          }
        ]}
        src={placeholder || IMG_DEFAULT}
        size={$.imageWidth}
        height={$.imageHeight}
        radius
        noDefault
      />
    )
  }

  renderCover() {
    const { $ }: Ctx = this.context
    const { image, placeholder } = this.props
    if (!image) return null

    return (
      <CompCover
        src={this.src}
        size={$.imageWidth}
        height={$.imageHeight}
        radius
        imageViewer
        imageViewerSrc={getCoverLarge(image || placeholder)}
        fadeDuration={0}
        event={this.event}
        noDefault
        sync
        onLoad={this.onLoad}
      />
    )
  }

  render() {
    global.rerender('Subject.Cover')

    const { coverRadius } = systemStore.setting
    return (
      <View
        style={[
          this.styles.container,
          this.isLoaded && this.styles.shadow,
          {
            borderRadius: coverRadius + 2
          }
        ]}
      >
        {this.renderCover()}
        {this.renderPlaceholder()}
        <Heatmap id='条目.封面图查看' />
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(Cover)
