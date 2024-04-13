/*
 * @Author: czy0729
 * @Date: 2019-05-05 02:45:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-13 17:42:32
 */
import React from 'react'
import { findNodeHandle, StyleSheet, UIManager, View } from 'react-native'
import { systemStore } from '@stores'
import { s2t } from '@utils/thirdParty/open-cc'
import { Touchable } from '../../touchable'

/** Android 风格的弹出层, 这个官方文档是找不到的 */
export default class Popover extends React.Component<any> {
  static defaultProps = {
    data: [],
    hitSlop: undefined,
    onSelect: Function.prototype,
    onLongPress: Function.prototype
  }

  ref

  forwardRef = ref => {
    this.ref = ref
  }

  showPopupAndroid = () => {
    const { data } = this.props
    const { s2t: _s2t } = systemStore.setting
    UIManager.showPopupMenu(
      findNodeHandle(this.ref),
      _s2t ? data.map(item => (typeof item === 'string' ? s2t(item) : item)) : data,
      () => {}, // err callback
      this.onPopupItemPress
    )
  }

  onPopupItemPress = (evt, index) => {
    const { data, onSelect } = this.props
    if (index !== undefined) onSelect(data[index], index)
  }

  render() {
    const { style, hitSlop, onLongPress, children } = this.props
    return (
      <View>
        <View ref={this.forwardRef} style={styles.overflowView} />
        <Touchable
          style={style}
          withoutFeedback
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
