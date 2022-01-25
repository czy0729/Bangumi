/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-23 20:16:16
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

export default
@obc
class Cover extends React.Component {
  state = {
    onLoad: false
  }

  onLoad = () =>
    setTimeout(() => {
      this.setState({
        onLoad: true
      })
    }, 400)

  render() {
    rerender('Subject.Cover')

    const { coverRadius } = systemStore.setting
    const { $ } = this.context
    const { _imageForce } = $.params
    const { image, placeholder } = this.props
    const { onLoad } = this.state
    const src = _imageForce || CDN_OSS_SUBJECT(getCoverMedium(image)) || IMG_DEFAULT
    return (
      <View
        style={[
          this.styles.container,
          onLoad && this.styles.shadow,
          {
            borderRadius: coverRadius
          }
        ]}
      >
        {!!image && (
          <CompCover
            src={src}
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
        {!onLoad && (
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
