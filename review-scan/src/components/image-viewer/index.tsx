/*
 * @Author: czy0729
 * @Date: 2019-05-23 18:57:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-10 17:22:51
 */
import React from 'react'
import { Modal, View } from 'react-native'
import { observer } from 'mobx-react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { open, showActionSheet, stl } from '@utils'
import { r } from '@utils/dev'
import { FROZEN_FN, HOST_DOGE, IOS } from '@constants'
import { Component } from '../component'
import RNImageViewer from '../@/react-native-image-zoom-viewer/image-viewer.component'
import { Iconfont } from '../iconfont'
import { Image } from '../image'
import { Text } from '../text'
import { Touchable } from '../touchable'
import { ACTION_SHEET_DS, COMPONENT } from './ds'
import { styles } from './styles'
import { Props as ImageViewerProps } from './types'

export { ImageViewerProps }

/**
 * 图片相册查看器
 * @doc https://github.com/ascoders/react-native-image-viewer
 */
export const ImageViewer = observer(
  class ImageViewerComponent extends React.Component<ImageViewerProps> {
    static defaultProps: ImageViewerProps = {
      index: 0,
      visible: false,
      imageUrls: [],
      mini: false,
      useRN: false,
      onCancel: FROZEN_FN
    }

    onRequestClose = () => {
      const { onCancel } = this.props
      if (typeof onCancel === 'function') onCancel()
    }

    onMenus = () => {
      const { index, imageUrls, onCancel } = this.props
      return this.renderMenus(imageUrls[index]._url || imageUrls[index].url, onCancel)
    }

    renderMenus(url: string, onCancel: any) {
      if (typeof url === 'string' && url.includes(HOST_DOGE)) return

      if (IOS) {
        // 不想涉及到权限问题, 暂时用浏览器打开图片来处理
        showActionSheet(ACTION_SHEET_DS, (index: number) => {
          if (index === 0) open(url)
        })
      } else {
        // @issue 安卓的 ActionSheet 在这个 Viewer 的下面
        onCancel()
        showActionSheet(ACTION_SHEET_DS, (index: number) => {
          if (index === 0) open(url)
        })
      }

      return null
    }

    renderIndicator = (currentIndex: number, allSize: number) => {
      const { imageUrls } = this.props
      if (imageUrls.length <= 1) return null

      return (
        <Text style={styles.indicator} type='__plain__' align='center' pointerEvents='none'>
          {currentIndex} / {allSize}
        </Text>
      )
    }

    renderImage = (props: any) => {
      if (!(props?.style?.width || props?.style?.height)) return null

      const { imageUrls } = this.props
      return (
        <Image
          src={props?.source?.uri}
          width={props?.style?.width}
          height={props?.style?.height}
          headers={imageUrls?.[0]?.headers}
          placeholder={false}
          skeleton={false}
        />
      )
    }

    render() {
      r(COMPONENT)

      const { index, visible, imageUrls, mini, useRN, onCancel, ...other } = this.props
      return (
        <Component id='component-image-viewer'>
          <Modal
            visible={visible}
            transparent
            hardwareAccelerated={false}
            animationType='fade'
            statusBarTranslucent
            onRequestClose={this.onRequestClose}
          >
            <View style={styles.container}>
              <View style={styles.activityIndicator}>
                <ActivityIndicator />
              </View>
              <View style={stl(styles.viewerContainer, mini && styles.viewerMini)}>
                <RNImageViewer
                  style={styles.viewer}
                  // tofix
                  index={IOS ? 0 : index}
                  imageUrls={imageUrls}
                  backgroundColor='transparent'
                  enableSwipeDown={!mini}
                  enableImageZoom={!mini}
                  menus={this.onMenus}
                  saveToLocalByLongPress={false}
                  renderIndicator={this.renderIndicator}
                  renderImage={useRN ? undefined : this.renderImage}
                  onCancel={onCancel}
                  {...other}
                />
              </View>
              <Touchable style={styles.close} useRN onPress={onCancel}>
                <Iconfont style={styles.iconfont} name='md-close' />
              </Touchable>
            </View>
          </Modal>
        </Component>
      )
    }
  }
)

export default ImageViewer
