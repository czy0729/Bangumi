/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-11 18:31:32
 */
import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { ActionSheetIOS, Platform, Share, Text, TouchableHighlight, View } from 'react-native'
import { observer } from 'mobx-react'
import { syncThemeStore } from '@utils/async'
import { IOS } from '@constants/constants'
import { androidTextFixedStyle } from '@styles'
import { ModalView } from '../modal-view'
import { Portal } from '../portal'
import { memoStyles } from './api-styles'

let instance: { close: () => void } | null = null

/**
 * 静态 ActionSheet 调用入口 (废弃中), Android 端通过 ModalView 弹出
 */
export const AntmActionSheet = {
  showActionSheetWithOptions(config: any, callback: any) {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(config, callback)
      return
    }

    const key = Portal.add(
      <AndroidActionSheet
        visible
        ref={ref => (instance = ref)}
        onAnimationEnd={visible => {
          if (!visible) Portal.remove(key)
        }}
        config={config}
        callback={callback}
      />
    )
  },

  showShareActionSheetWithOptions(config: any, failureCallback: any, successCallback: any) {
    const content: any = {}
    const options: any = {}
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
    Share.share(content, options)
      .then(result => {
        if (result.action === Share.sharedAction) {
          if (successCallback) successCallback(true, result.activityType)
        } else if (result.action === Share.dismissedAction) {
          if (successCallback) successCallback(false)
        }
      })
      .catch(error => {
        if (failureCallback) failureCallback(error)
      })
  },

  close() {
    if (instance) instance.close()
  }
}

export default AntmActionSheet

export const AndroidActionSheet = observer(
  forwardRef(function AndroidActionSheet(
    {
      visible,
      config,
      onAnimationEnd,
      callback
    }: {
      visible?: boolean
      config: any
      onAnimationEnd?: (visible: boolean) => void
      callback?: (index: number) => void
    },
    ref
  ) {
    const [show, setShow] = useState(!!visible)
    const _ = syncThemeStore()
    const styles = memoStyles()

    useImperativeHandle(ref, () => ({
      close: () => setShow(false)
    }))

    const handlePress = useCallback(
      (index: number) => {
        if (callback) callback(index)
        setShow(false)
      },
      [callback]
    )

    const { title, message, options = [], destructiveButtonIndex, cancelButtonIndex } = config

    const elTitle = !!title && (
      <View style={styles.title} key='0'>
        <Text
          style={IOS ? styles.titleText : [androidTextFixedStyle, styles.titleText]}
          textBreakStrategy='simple'
          numberOfLines={0}
        >
          {title}
        </Text>
      </View>
    )

    const elContent = options.map((item: string, index: number) => (
      <View key={index} style={cancelButtonIndex === index && styles.cancelBtn}>
        <TouchableHighlight
          style={[
            styles.btn,
            {
              paddingVertical: 12,
              backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
              borderTopWidth: index ? _.hairlineWidth : 0,
              borderTopColor: _.select('rgba(0, 0, 0, 0.12)', 'rgba(255, 255, 255, 0.12)')
            }
          ]}
          underlayColor={_.select(_.colorBg, _._colorDarkModeLevel1)}
          onPress={() => handlePress(index)}
        >
          <Text
            style={[
              !IOS && androidTextFixedStyle,
              destructiveButtonIndex === index ? styles.destructiveBtn : styles.btnText,
              {
                color: _.colorDesc
              }
            ]}
            textBreakStrategy='simple'
            numberOfLines={0}
          >
            {item}
          </Text>
        </TouchableHighlight>
        {cancelButtonIndex === index ? <View style={styles.cancelBtnMask} /> : null}
      </View>
    ))

    return (
      <ModalView
        animationDuration={200}
        animateAppear
        visible={show}
        onAnimationEnd={onAnimationEnd}
        style={styles.content}
        animationType='slide-up'
        maskClosable
        wrapStyle={{
          justifyContent: 'flex-end',
          alignItems: 'stretch'
        }}
        onClose={() => handlePress(cancelButtonIndex === undefined ? -1 : cancelButtonIndex)}
      >
        <View>
          {elTitle}
          {!!message && (
            <View style={styles.message} key='1'>
              <Text
                style={!IOS && androidTextFixedStyle}
                textBreakStrategy='simple'
                numberOfLines={0}
              >
                {message}
              </Text>
            </View>
          )}
          <View>{elContent}</View>
        </View>
      </ModalView>
    )
  })
)
