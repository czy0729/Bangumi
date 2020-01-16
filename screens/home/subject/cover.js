/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-16 18:06:18
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Image } from '@components'
import { getCoverLarge } from '@utils/app'
import { _ } from '@stores'

const imageWidth = 120

export default
@observer
class Cover extends React.Component {
  static contextTypes = {
    $: PropTypes.object
  }

  state = {
    onLoad: false
  }

  onLoad = () => {
    setTimeout(() => {
      this.setState({
        onLoad: true
      })
    }, 300)
  }

  render() {
    const { $ } = this.context
    const { image, placeholder } = this.props
    const { onLoad } = this.state
    return (
      <View style={styles.container}>
        {!!image && (
          <Image
            src={image}
            size={imageWidth}
            height={160}
            radius
            border
            shadow
            placeholder={false}
            imageViewer
            imageViewerSrc={getCoverLarge(image)}
            fadeDuration={0}
            event={{
              id: '条目.封面图查看',
              data: {
                subjectId: $.subjectId
              }
            }}
            onLoad={this.onLoad}
          />
        )}
        {!onLoad && (
          <Image
            style={styles.placeholder}
            src={placeholder}
            size={imageWidth}
            height={160}
            radius
            shadow
            border
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    top: _.wind,
    left: _.wind
  },
  placeholder: {
    position: 'absolute',
    zIndex: 11,
    top: 0,
    left: 0
  }
})
