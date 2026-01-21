/*
 * @Author: czy0729
 * @Date: 2019-05-05 02:45:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-12 01:39:33
 */
import React from 'react'
import { findNodeHandle, StyleSheet, UIManager, View } from 'react-native'
import { systemStore } from '@stores'
import { s2t } from '@utils/thirdParty/open-cc'
import { FROZEN_FN } from '@constants'
import { Fn } from '@types'
import { Touchable } from '../../touchable'

/** Android 风格的弹出层, 这个官方文档是找不到的 */
export default class Popover extends React.Component<any> {
  static defaultProps = {
    data: [],
    hitSlop: undefined,
    activateOn: 'tap',
    onSelect: FROZEN_FN,
    onLongPress: FROZEN_FN
  }

  ref: any

  forwardRef = (ref: any) => {
    this.ref = ref
  }

  showPopupAndroid = evt => {
    const { data } = this.props

    // @ts-expect-error
    UIManager.showPopupMenu(
      findNodeHandle(this.ref),
      systemStore.setting.s2t
        ? data.map((item: string) => (typeof item === 'string' ? s2t(item) : item))
        : data,
      FROZEN_FN, // err callback
      (event, index) => this.onPopupItemPress(event, index, evt)
    )
  }

  onPopupItemPress = (_evt: any, index: string | number, evt) => {
    if (index !== undefined) this.props.onSelect(this.props.data[index], index, evt)
  }

  render() {
    const { style, hitSlop, activateOn, onLongPress, children } = this.props
    let delayPressIn: number
    let handlePress: Fn
    let handleLongPress: Fn
    if (activateOn === 'hold') {
      handleLongPress = this.showPopupAndroid
    } else {
      delayPressIn = 1600
      handlePress = this.showPopupAndroid
      handleLongPress = onLongPress
    }

    return (
      <View>
        <View ref={this.forwardRef} style={styles.overflowView} pointerEvents='none' />
        <Touchable
          style={style}
          hitSlop={hitSlop}
          delayPressIn={delayPressIn}
          onPress={handlePress}
          onLongPress={handleLongPress}
        >
          {children}
        </Touchable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  overflowView: {
    position: 'absolute',
    top: -8,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent'
  }
})
