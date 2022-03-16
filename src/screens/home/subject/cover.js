/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 20:26:42
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { Cover as CompCover } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { getCoverMedium, getCoverLarge } from '@utils/app'
import { IMG_DEFAULT } from '@constants'
import { CDN_OSS_SUBJECT } from '@constants/cdn'

const srcLoaded = {}

export default
@obc
class Cover extends React.Component {
  state = {
    isLoaded: false
  }

  onLoad = () => {
    if (typeof this.src === 'string') srcLoaded[this.src] = true

    setTimeout(() => {
      this.setState({
        isLoaded: true
      })
    }, 80)
  }

  get src() {
    const { $ } = this.context
    const { _imageForce } = $.params
    const { image } = this.props
    const src = _imageForce || CDN_OSS_SUBJECT(getCoverMedium(image)) || IMG_DEFAULT
    return src
  }

  get isLoaded() {
    if (typeof this.src === 'string') return srcLoaded[this.src] || this.state.isLoaded
    return this.state.isLoaded
  }

  render() {
    rerender('Subject.Cover')

    const { coverRadius } = systemStore.setting
    const { $ } = this.context
    const { image, placeholder } = this.props
    return (
      <View
        style={[
          this.styles.container,
          this.isLoaded && this.styles.shadow,
          {
            borderRadius: coverRadius
          }
        ]}
      >
        {!!image && (
          <CompCover
            src={this.src}
            size={$.imageWidth}
            height={$.imageHeight}
            radius
            placeholder={false}
            imageViewer
            imageViewerSrc={getCoverLarge(image || placeholder)}
            fadeDuration={0}
            event={{
              id: '条目.封面图查看',
              data: {
                subjectId: $.subjectId
              }
            }}
            noDefault
            onLoad={this.onLoad}
            textOnly={false}
          />
        )}
        {!this.isLoaded && (
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
            placeholder={false}
            noDefault
            textOnly={false}
          />
        )}
        <Heatmap id='条目.封面图查看' />
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(() => ({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: _.space + 2,
    left: _.wind
  },
  placeholder: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0
  },
  shadow: {
    backgroundColor: _.colorBg,
    borderRadius: _.radiusXs,
    shadowColor: _.colorShadow,
    shadowOffset: {
      height: 4
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 16
  }
}))
