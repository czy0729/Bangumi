/*
 * 图片查看器
 * @Doc: https://github.com/ascoders/react-native-image-viewer
 * @Author: czy0729
 * @Date: 2019-05-23 18:57:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-30 06:18:40
 */
import React from 'react'
import { Modal, View, StatusBar } from 'react-native'
import RNImageViewer from 'react-native-image-zoom-viewer'
import { observer } from 'mobx-react'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { open } from '@utils'
import { showActionSheet } from '@utils/ui'
import { IOS } from '@constants'
import { Touchable } from '../touchable'
import { Iconfont } from '../iconfont'
import { Text } from '../text'
import { styles } from './styles'

type Props = {
  index?: number
  visible?: boolean
  imageUrls?: any[]
  onCancel?: (arg0?: any) => any
}

const actionSheetDS = ['浏览器打开图片', '取消']

export const ImageViewer = observer(
  class ImageViewerComponent extends React.Component<Props> {
    static defaultProps = {
      index: 0,
      visible: false,
      imageUrls: [],
      onCancel: () => {}
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if (!IOS) StatusBar.setHidden(nextProps.visible)
    }

    onRequestClose = () => {
      const { onCancel } = this.props
      onCancel()
    }

    onMenus = () => {
      const { index, imageUrls, onCancel } = this.props
      return this.renderMenus(imageUrls[index]._url || imageUrls[index].url, onCancel)
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
      if (imageUrls.length <= 1) return null

      return (
        <Text
          style={styles.indicator}
          type='__plain__'
          align='center'
          // @ts-ignore
          pointerEvents='none'
        >
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
          hardwareAccelerated={false}
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
            <Touchable style={styles.close} useRN onPress={onCancel}>
              <Iconfont style={styles.iconfont} name='md-close' />
            </Touchable>
          </View>
        </Modal>
      )
    }
  }
)
