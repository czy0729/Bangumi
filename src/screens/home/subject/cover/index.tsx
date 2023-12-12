/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 19:24:49
 */
import React from 'react'
import { View } from 'react-native'
import { Squircle, Cover as CompCover, Heatmap } from '@components'
import { systemStore } from '@stores'
import { getCoverLarge } from '@utils'
import { obc } from '@utils/decorators'
import { rerender } from '@utils/dev'
import { IMG_DEFAULT, STORYBOOK } from '@constants'
import { Ctx } from '../types'
import { memoStyles } from './styles'
import { Props } from './types'

const SRC_LOADED = {}

class Cover extends React.Component<Props> {
  state = {
    isLoaded: false
  }

  onLoad = () => {
    const { $ } = this.context as Ctx
    if (typeof $.cover === 'string') SRC_LOADED[$.cover] = true

    try {
      const duration = systemStore.setting.imageFadeIn ? 880 : 0
      setTimeout(() => {
        this.setState({
          isLoaded: true
        })
      }, duration)
    } catch (error) {}
  }

  get isLoaded() {
    const { $ } = this.context as Ctx
    return (typeof $.cover === 'string' && SRC_LOADED[$.cover]) || this.state.isLoaded
  }

  get event() {
    const { $ } = this.context as Ctx
    return {
      id: '条目.封面图查看',
      data: {
        subjectId: $.subjectId
      }
    } as const
  }

  renderPlaceholder() {
    if (!STORYBOOK && this.isLoaded) return null

    const { $ } = this.context as Ctx
    const { placeholder } = this.props
    return (
      <CompCover
        style={[
          this.styles.placeholder,
          {
            opacity: this.isLoaded ? 0 : 1
          }
        ]}
        src={placeholder || IMG_DEFAULT}
        size={$.imageWidth}
        height={$.imageHeight}
        noDefault
        radius={false}
        skeleton={false}
      />
    )
  }

  renderCover() {
    const { $ } = this.context as Ctx
    const { image, placeholder } = this.props
    if (!image) return null

    return (
      <CompCover
        src={$.cover}
        size={$.imageWidth}
        height={$.imageHeight}
        noDefault
        radius={false}
        skeleton={false}
        imageViewer
        imageViewerSrc={getCoverLarge(image || placeholder)}
        fadeDuration={0}
        sync
        event={this.event}
        onLoad={this.onLoad}
      />
    )
  }

  render() {
    rerender('Subject.Cover')

    const { $ } = this.context as Ctx
    const { coverRadius } = systemStore.setting
    const width = $.imageWidth
    const height = $.imageHeight
    return (
      <Squircle
        style={this.styles.container}
        width={width}
        height={height}
        radius={coverRadius}
      >
        <View
          style={{
            minWidth: width,
            minHeight: height
          }}
        >
          {STORYBOOK && this.renderPlaceholder()}
          {this.renderCover()}
          {!STORYBOOK && this.renderPlaceholder()}
          <Heatmap id='条目.封面图查看' />
        </View>
      </Squircle>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(Cover)
