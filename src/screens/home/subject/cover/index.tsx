/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-08 03:47:45
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { Cover as CompCover } from '@_'
import { systemStore } from '@stores'
import { getCoverLarge, stl } from '@utils'
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
    const { $ }: Ctx = this.context
    if (typeof $.cover === 'string') SRC_LOADED[$.cover] = true

    setTimeout(
      () => {
        this.setState({
          isLoaded: true
        })
      },
      systemStore.setting.imageFadeIn ? 880 : 0
    )
  }

  get isLoaded() {
    const { $ }: Ctx = this.context
    if (typeof $.cover === 'string') {
      return SRC_LOADED[$.cover] || this.state.isLoaded
    }

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
        skeleton={false}
      />
    )
  }

  renderCover() {
    const { $ }: Ctx = this.context
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
        event={this.event}
        noDefault
        skeleton={false}
        sync
        onLoad={this.onLoad}
      />
    )
  }

  render() {
    // global.rerender('Subject.Cover')

    const { coverRadius } = systemStore.setting
    return (
      <View
        style={stl(this.styles.container, this.isLoaded && this.styles.shadow, {
          borderRadius: coverRadius + 2
        })}
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
