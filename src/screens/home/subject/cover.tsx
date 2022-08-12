/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-12 11:21:37
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { Cover as CompCover } from '@_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { getCoverLarge, matchCoverUrl } from '@utils/app'
import { IMG_DEFAULT } from '@constants'
import { Ctx } from './types'

const srcLoaded = {}

class Cover extends React.Component<{
  image?: string
  placeholder?: string
}> {
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
    const { $ }: Ctx = this.context
    const { _imageForce } = $.params
    const { image } = this.props
    const src = _imageForce || matchCoverUrl(image) || IMG_DEFAULT
    return src
  }

  get isLoaded() {
    if (typeof this.src === 'string') return srcLoaded[this.src] || this.state.isLoaded
    return this.state.isLoaded
  }

  render() {
    global.rerender('Subject.Cover')

    const { coverRadius } = systemStore.setting
    const { $ }: Ctx = this.context
    const { image, placeholder } = this.props
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

export default obc(Cover)

const memoStyles = _.memoStyles(() => ({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: _.md + 6,
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
      width: 1,
      height: 4
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 12
  }
}))
