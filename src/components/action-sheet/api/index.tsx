/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 03:40:44
 */
import { useCallback, useEffect, useState } from 'react'
import { ActionSheetIOS, Platform, Share, Text, TouchableHighlight, View } from 'react-native'
import { observer } from 'mobx-react'
import { syncThemeStore } from '@utils/async'
import { IOS } from '@constants/env'
import { androidTextFixedStyle } from '@styles'
import { ModalView } from '../../modal-view'
import { Portal } from '../../portal'
import { memoStyles } from './styles'

import type { ShareActionSheetIOSOptions, ShareContent, ShareOptions } from 'react-native'
import type { ActionSheetCallback, ActionSheetConfig } from './types'
export type { ActionSheetCallback, ActionSheetConfig, ActionSheetConfigOptions } from './types'

/** 暴露给调用方的关闭方法 */
type ActionSheetApi = { close: () => void }

let instance: ActionSheetApi | null = null

/**
 * 静态 ActionSheet 调用入口, Android 端通过 ModalView 弹出
 */
export const ActionSheetStatic = {
  showActionSheetWithOptions(config: ActionSheetConfig, callback: ActionSheetCallback) {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(config, callback)
      return
    }

    const key: number = Portal.add(
      <AndroidActionSheet
        visible
        onRef={api => {
          instance = api
        }}
        onAnimationEnd={visible => {
          if (!visible) Portal.remove(key)
        }}
        config={config}
        callback={callback}
      />
    )
  },

  showShareActionSheetWithOptions(
    config: ShareActionSheetIOSOptions,
    failureCallback?: (error: Error) => void,
    successCallback?: (success: boolean, method?: string) => void
  ) {
    const { message, url, excludedActivityTypes } = config
    const content: ShareContent = url ? { message, url } : { message: message || '' }
    const options: ShareOptions = {
      excludedActivityTypes
    }
    Share.share(content, options)
      .then(result => {
        if (result.action === Share.sharedAction) {
          if (successCallback) successCallback(true, result.activityType ?? undefined)
        } else if (result.action === Share.dismissedAction) {
          if (successCallback) successCallback(false)
        }
      })
      .catch((error: Error) => {
        if (failureCallback) failureCallback(error)
      })
  },

  close() {
    if (instance) instance.close()
  }
}

export default ActionSheetStatic

/**
 * 安卓 ActionSheet
 *
 * 关闭方法通过 onRef 回调交给调用方, 刻意不用 forwardRef + useImperativeHandle:
 * 本组件外层是 observer (mobx-react 的包裹层通过 reaction.track 执行渲染),
 * 与 imperative handle 组合时线上出现过 "Rendered more hooks than during the previous render",
 * 而本组件只有 Portal.add 一个调用点, 用回调 prop 完全等价且更稳
 */
export const AndroidActionSheet = observer(function AndroidActionSheet({
  visible,
  config,
  onAnimationEnd,
  callback,
  onRef
}: {
  visible?: boolean
  config: ActionSheetConfig
  onAnimationEnd?: (visible: boolean) => void
  callback?: ActionSheetCallback
  onRef?: (api: ActionSheetApi | null) => void
}) {
  const [show, setShow] = useState(!!visible)
  const _ = syncThemeStore()
  const styles = memoStyles()

  /** 交出 close 方法, 卸载时置空 (与原 useImperativeHandle 的清理语义一致) */
  useEffect(() => {
    onRef?.({ close: () => setShow(false) })

    return () => onRef?.(null)
  }, [onRef])

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
