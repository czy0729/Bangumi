/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-22 17:10:39
 */
import React from 'react'
import { View } from 'react-native'
import { Cover as CoverComp, Heatmap, Squircle } from '@components'
import { systemStore } from '@stores'
import { getCoverLarge, postTask } from '@utils'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import { IMG_DEFAULT, WEB } from '@constants'
import { COMPONENT_MAIN } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

const memoLoaded = new Map<string, boolean>()

class Cover extends React.Component<Props> {
  state = {
    isLoaded: false
  }

  onLoad = () => {
    const { image } = this.props
    if (typeof image === 'string') memoLoaded.set(image, true)

    try {
      postTask(() => {
        this.setState({
          isLoaded: true
        })
      }, (systemStore.setting.imageFadeIn ? 880 : 0) + 800)
    } catch (error) {}
  }

  get isLoaded() {
    const { image } = this.props
    return (typeof image === 'string' && memoLoaded.get(image)) || this.state.isLoaded
  }

  get event() {
    return {
      id: '条目.封面图查看',
      data: {
        subjectId: this.props.subjectId
      }
    } as const
  }

  renderPlaceholder() {
    if (!WEB && this.isLoaded && this.props.image) return null

    return (
      <CoverComp
        style={[
          this.styles.placeholder,
          {
            opacity: this.isLoaded ? 0 : 1
          }
        ]}
        src={this.props.placeholder || IMG_DEFAULT}
        size={this.props.width}
        height={this.props.height}
        noDefault
        radius={false}
        skeleton={false}
      />
    )
  }

  renderCover() {
    const { image } = this.props
    if (!image) return null

    return (
      <CoverComp
        src={image}
        size={this.props.width}
        height={this.props.height}
        noDefault
        radius={false}
        skeleton={false}
        imageViewer
        imageViewerSrc={getCoverLarge(image || this.props.placeholder)}
        fadeDuration={0}
        sync
        event={this.event}
        onLoad={this.onLoad}
      />
    )
  }

  render() {
    r(COMPONENT_MAIN)

    const { width, height } = this.props
    return (
      <Squircle
        style={this.styles.container}
        width={width}
        height={height}
        radius={systemStore.coverRadius}
      >
        <View
          style={{
            minWidth: width,
            minHeight: height
          }}
        >
          {WEB && this.renderPlaceholder()}
          {this.renderCover()}
          {!WEB && this.renderPlaceholder()}
          <Heatmap id='条目.封面图查看' />
        </View>
      </Squircle>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default ob(Cover)
