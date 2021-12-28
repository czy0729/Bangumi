/*
 * Android风格的弹出层, 这个官方文档是找不到的
 * @Author: czy0729
 * @Date: 2019-05-05 02:45:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-28 22:42:26
 */
import React from 'react'
import { StyleSheet, UIManager, findNodeHandle, View } from 'react-native'
import { systemStore } from '@stores'
import { s2t } from '@utils/thirdParty/cn-char'
import { Touchable } from '../touchable'

export default class Popover extends React.Component {
  static defaultProps = {
    data: [],
    hitSlop: undefined,
    onSelect: Function.prototype,
    onLongPress: Function.prototype
  }

  ref

  showPopupAndroid = () => {
    const { data } = this.props
    const { s2t: _s2t } = systemStore.setting
    UIManager.showPopupMenu(
      findNodeHandle(this.ref),
      _s2t ? data.map(item => (typeof item === 'string' ? s2t(item) : item)) : data,
      Function.prototype, // err callback
      this.onPopupItemPress
    )
  }

  onPopupItemPress = (evt, index) => {
    const { data, onSelect } = this.props
    if (index !== undefined) {
      onSelect(data[index])
    }
  }

  render() {
    const { style, hitSlop, onLongPress, children } = this.props
    return (
      <View>
        <View ref={ref => (this.ref = ref)} style={styles.overflowView} />
        <Touchable
          style={style}
          hitSlop={hitSlop}
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
