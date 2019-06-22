/*
 * 图片查看器
 * @Doc: https://github.com/ascoders/react-native-image-viewer
 * @Author: czy0729
 * @Date: 2019-05-23 18:57:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-22 14:17:00
 */
import React from 'react'
import { Modal } from 'react-native'
import RNImageViewer from 'react-native-image-zoom-viewer'
import { open } from '@utils'
import { showActionSheet } from '@utils/ui'
import { IOS } from '@constants'

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
      <Modal visible={visible} transparent onRequestClose={this.onRequestClose}>
        <RNImageViewer
          imageUrls={imageUrls}
          backgroundColor='rgba(0, 0, 0, 0.88)'
          enableSwipeDown
          menus={() => this.renderMenus(imageUrls[0]._url, onCancel)}
          onCancel={onCancel}
          {...other}
        />
      </Modal>
    )
  }
}
