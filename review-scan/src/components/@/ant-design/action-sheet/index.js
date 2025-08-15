/*
 * @Author: czy0729
 * @Date: 2023-08-10 19:45:16
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-08-10 19:45:16
 */
import React from 'react'
import { ActionSheetIOS, Platform, Share } from 'react-native'
import Portal from '@ant-design/react-native/lib/portal'
import ActionSheetAndroidContainer from './AndroidContainer'

let instance

export default {
  showActionSheetWithOptions(config, callback) {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(config, callback)
      return
    }

    const key = Portal.add(
      <ActionSheetAndroidContainer
        visible
        ref={ref => (instance = ref)}
        onAnimationEnd={visible => {
          if (!visible) {
            Portal.remove(key)
          }
        }}
        config={config}
        callback={callback}
      />
    )
  },

  showShareActionSheetWithOptions(config, failureCallback, successCallback) {
    const content = {}
    const options = {}
    content.message = config.message
    if (config.title) {
      content.title = config.title
      options.dialogTitle = config.title
    }
    if (config.url) {
      content.url = config.url
    }
    if (config.excludedActivityTypes) {
      options.excludedActivityTypes = config.excludedActivityTypes
    }
    if (config.tintColor) {
      options.tintColor = config.tintColor
    }
    // promise is not called in Android
    // https://github.com/facebook/react-native/blob/master/Libraries/Share/Share.js#L80
    Share.share(content, options)
      .then(result => {
        if (result.action === Share.sharedAction) {
          // completed successCallback(completed, method)
          if (successCallback) {
            successCallback(true, result.activityType)
          }
        } else if (result.action === Share.dismissedAction) {
          if (successCallback) {
            successCallback(false)
          }
        }
      })
      .catch(error => {
        if (failureCallback) {
          failureCallback(error)
        }
      })
  },

  close() {
    if (instance) {
      instance.close()
    }
  }
}
