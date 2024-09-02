/*
 * @Author: czy0729
 * @Date: 2019-05-05 02:45:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:54:50
 */
import React from 'react'
import { findNodeHandle, StyleSheet, UIManager, View } from 'react-native'
import { systemStore } from '@stores'
import { s2t } from '@utils/thirdParty/open-cc'
import { FROZEN_FN } from '@constants'
import { Touchable } from '../../touchable'

/** Android 风格的弹出层, 这个官方文档是找不到的 */
export default class Popover extends React.Component<any> {
  static defaultProps = {
    data: [],
    hitSlop: undefined,
    onSelect: Function.prototype,
    onLongPress: Function.prototype
  }

  ref: any

  forwardRef = (ref: any) => {
    this.ref = ref
  }

  showPopupAndroid = () => {
    const { data } = this.props
    UIManager.showPopupMenu(
      findNodeHandle(this.ref),
      systemStore.setting.s2t
        ? data.map((item: string) => (typeof item === 'string' ? s2t(item) : item))
        : data,
      FROZEN_FN, // err callback
      this.onPopupItemPress
    )
  }

  onPopupItemPress = (_evt: any, index: string | number) => {
    if (index !== undefined) this.props.onSelect(this.props.data[index], index)
  }

  render() {
    const { style, hitSlop, onLongPress, children } = this.props
    return (
      <View>
        <View ref={this.forwardRef} style={styles.overflowView} pointerEvents='none' />
        <Touchable
          style={style}
          hitSlop={hitSlop}
          delayPressIn={onLongPress ? 1600 : undefined}
          onPress={this.showPopupAndroid}
          onLongPress={onLongPress}
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
