/*
 * @Author: czy0729
 * @Date: 2019-07-19 00:04:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-19 00:19:49
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { Image } from '@components'
import _ from '@styles'

const imageWidth = 120

export default
@observer
class Cover extends React.Component {
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
            fadeDuration={0}
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
    top: _.wind,
    left: _.wind
  },
  placeholder: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0
  }
})
