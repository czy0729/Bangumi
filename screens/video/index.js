/*
 * @Author: czy0729
 * @Date: 2019-06-23 16:43:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-23 19:06:11
 */
import React from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import { ScreenOrientation, Video as ExpoVideo } from 'expo'
import VideoPlayer from 'expo-video-player'
import { Flex, Icon, Touchable } from '@components'
import { analysis } from '@utils/fetch'
import _ from '@styles'

export default class Video extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: navigation.state.params.hideHeader ? null : undefined
  })

  state = {
    show: false,
    isPortrait: true
  }

  // Only on this screen, allow landscape orientations
  componentDidMount() {
    analysis('video', '视频播放')

    ScreenOrientation.allow(ScreenOrientation.Orientation.ALL)
    Dimensions.addEventListener('change', this.orientationChangeHandler)
  }

  componentWillUnmount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
    Dimensions.removeEventListener('change', this.orientationChangeHandler)
  }

  orientationChangeHandler = dims => {
    const { width, height } = dims.window
    const isLandscape = width > height
    this.setState({ isPortrait: !isLandscape })
    this.props.navigation.setParams({ hideHeader: isLandscape })

    // TODO: Why?
    ScreenOrientation.allow(ScreenOrientation.Orientation.ALL)
  }

  switchToLandscape() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE)
  }

  switchToPortrait() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT)
  }

  show = () => {
    this.setState({
      show: true
    })
  }

  render() {
    const { navigation } = this.props
    const { url } = navigation.state.params
    const { show, isPortrait } = this.state
    return (
      <View style={[_.container.row, styles.container]}>
        {show ? (
          <VideoPlayer
            videoProps={{
              shouldPlay: true,
              resizeMode: ExpoVideo.RESIZE_MODE_CONTAIN,
              source: {
                uri: url
              }
            }}
            isPortrait={isPortrait}
            switchToLandscape={this.switchToLandscape}
            switchToPortrait={this.switchToPortrait}
          />
        ) : (
          <Touchable onPress={this.show}>
            <Flex justify='center' style={styles.wrap}>
              <Icon name='ios-play' color='#fff' size={48} />
            </Flex>
          </Touchable>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000'
  },
  wrap: {
    width: _.window.width,
    height: _.window.width * 0.56
  }
})
