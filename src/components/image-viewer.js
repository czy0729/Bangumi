/*
 * 图片查看器
 * @Doc: https://github.com/ascoders/react-native-image-viewer
 * @Author: czy0729
 * @Date: 2019-05-23 18:57:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-18 15:05:22
 */
import React from 'react'
import { StyleSheet, Modal, View, StatusBar } from 'react-native'
import RNImageViewer from 'react-native-image-zoom-viewer'
import { ActivityIndicator } from '@ant-design/react-native'
import { _ } from '@stores'
import { open } from '@utils'
import { showActionSheet } from '@utils/ui'
import { IOS } from '@constants'
import Touchable from './touchable'
import Iconfont from './iconfont'
import Text from './text'

const actionSheetDS = ['浏览器打开图片', '取消']

export default class ImageViewer extends React.Component {
  static defaultProps = {
    index: 0,
    visible: false,
    imageUrls: [],
    onCancel: Function.prototype
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!IOS) {
      StatusBar.setHidden(nextProps.visible)
    }
  }

  onRequestClose = () => {
    const { onCancel } = this.props
    onCancel()
  }

  onMenus = () => {
    const { index, imageUrls, onCancel } = this.props
    return this.renderMenus(
      imageUrls[index]._url || imageUrls[index].url,
      onCancel
    )
  }

  renderMenus(url, onCancel) {
    // 不想涉及到权限问题, 暂时用浏览器打开图片来处理
    if (IOS) {
      showActionSheet(actionSheetDS, index => {
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
      showActionSheet(actionSheetDS, index => {
        if (index === 0) {
          open(url)
        }
      })
    }

    return null
  }

  renderIndicator = (currentIndex, allSize) => {
    const { imageUrls } = this.props
    if (imageUrls.length <= 1) {
      return null
    }

    return (
      <Text style={styles.indicator} align='center' pointerEvents='none'>
        {currentIndex} / {allSize}
      </Text>
    )
  }

  render() {
    const { index, visible, imageUrls, onCancel, ...other } = this.props
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
            index={index}
            imageUrls={imageUrls}
            backgroundColor='transparent'
            enableSwipeDown
            menus={this.onMenus}
            renderIndicator={this.renderIndicator}
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
    minHeight: _.window.height,
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
  },
  indicator: {
    position: 'absolute',
    zIndex: 10,
    top: _.appBarHeight + 14,
    right: 0,
    left: 0
  }
})
