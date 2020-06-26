/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-26 16:18:22
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Cover as CompCover } from '@screens/_'
import { getCoverMedium, getCoverLarge } from '@utils/app'
import { CDN_OSS_SUBJECT } from '@constants/cdn'
import { _ } from '@stores'
import { imageWidth, imageHeight } from './store'

export default
@observer
class Cover extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  }

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
    const { $ } = this.context
    const { image, placeholder } = this.props
    const { onLoad } = this.state
    return (
      <View style={[this.styles.container, onLoad && this.styles.shadow]}>
        {!!image && (
          <CompCover
            src={CDN_OSS_SUBJECT(getCoverMedium(image))}
            size={imageWidth}
            height={imageHeight}
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
          />
        )}
        {!onLoad && (
          <CompCover
            style={[this.styles.placeholder, this.styles.shadow]}
            src={placeholder}
            size={imageWidth}
            height={imageHeight}
            radius
            placeholder={false}
            noDefault
          />
        )}
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: _.space,
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
