/*
 * 图片查看器
 * @Doc: https://github.com/ascoders/react-native-image-viewer
 * @Author: czy0729
 * @Date: 2019-05-23 18:57:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-01 15:00:54
 */
import React from 'react'
import { StyleSheet, Modal, View } from 'react-native'
import RNImageViewer from 'react-native-image-zoom-viewer'
import { ActivityIndicator } from '@ant-design/react-native'
import { open } from '@utils'
import { showActionSheet } from '@utils/ui'
import { IOS } from '@constants'
import Touchable from './touchable'
import Iconfont from './iconfont'

export default class ImageViewer extends React.Component {
  static defaultProps = {
    visible: false,
    imageUrls: [],
    onCancel: Function.prototype
  }

  onRequestClose = () => {
    const { onCancel } = this.props
    onCancel()
  }

  renderMenus(url, onCancel) {
    // 不想涉及到权限问题, 暂时用浏览器打开图片来处理
    if (IOS) {
      showActionSheet(['浏览器打开图片', '取消'], index => {
        if (index === 0) {
          const result = open(url)
          if (result) {
            onCancel()
          }
        }
      })
    } else {
      // @issue 安卓的ActionSheet在这个Viewer的下面
      onCancel()
      showActionSheet(['浏览器打开图片', '取消'], index => {
        if (index === 0) {
          open(url)
        }
      })
    }

    return null
  }

  render() {
    const { visible, imageUrls, onCancel, ...other } = this.props
    return (
      <Modal
        visible={visible}
        transparent
        hardwareAccelerated
        animationType='fade'
        statusBarTranslucent
        // presentationStyle='fullScreen'
        onRequestClose={this.onRequestClose}
      >
        <View style={styles.container}>
          <View style={styles.activityIndicator}>
            <ActivityIndicator />
          </View>
          <RNImageViewer
            style={styles.viewer}
            imageUrls={imageUrls}
            backgroundColor='transparent'
            enableSwipeDown
            menus={() => this.renderMenus(imageUrls[0]._url, onCancel)}
            onCancel={onCancel}
            {...other}
          />
          <Touchable style={styles.close} onPress={onCancel}>
            <Iconfont style={styles.iconfont} name='close' size={24} />
          </Touchable>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.88)'
  },
  activityIndicator: {
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%'
  },
  viewer: {
    zIndex: 2
  },
  close: {
    position: 'absolute',
    zIndex: 3,
    top: 40,
    right: 0,
    padding: 16
  },
  iconfont: {
    color: '#fff'
  }
})
