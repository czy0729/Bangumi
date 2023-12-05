/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 10:10:28
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { Cover as CompCover } from '@_'
import { systemStore } from '@stores'
import { getCoverLarge, stl } from '@utils'
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
      setTimeout(
        () => {
          this.setState({
            isLoaded: true
          })
        },
        systemStore.setting.imageFadeIn ? 880 : 0
      )
    } catch (error) {}
  }

  get isLoaded() {
    const { $ } = this.context as Ctx
    if (typeof $.cover === 'string') {
      return SRC_LOADED[$.cover] || this.state.isLoaded
    }

    return this.state.isLoaded
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

    const { coverRadius } = systemStore.setting
    const { $ } = this.context as Ctx
    const { placeholder } = this.props
    return (
      <CompCover
        style={[
          this.styles.placeholder,
          this.styles.shadow,
          {
            borderRadius: coverRadius,
            opacity: this.isLoaded ? 0 : 1
          }
        ]}
        src={placeholder || IMG_DEFAULT}
        size={$.imageWidth}
        height={$.imageHeight}
        radius
        noDefault
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
        radius
        imageViewer
        imageViewerSrc={getCoverLarge(image || placeholder)}
        fadeDuration={0}
        skeleton={false}
        noDefault
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
    return (
      <View
        style={stl(this.styles.container, this.isLoaded && this.styles.shadow, {
          minWidth: $.imageWidth,
          minHeight: $.imageHeight,
          overflow: 'hidden',
          borderRadius: coverRadius + 2
        })}
      >
        {STORYBOOK ? (
          <>
            {this.renderPlaceholder()}
            {this.renderCover()}
          </>
        ) : (
          <>
            {this.renderCover()}
            {this.renderPlaceholder()}
          </>
        )}
        <Heatmap id='条目.封面图查看' />
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(Cover)
