/*
 * @Author: czy0729
 * @Date: 2019-03-16 10:54:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-16 11:31:39
 */
import React from 'react'
import {
  StyleSheet,
  Platform,
  findNodeHandle,
  NativeModules,
  View,
  TouchableOpacity
} from 'react-native'
import { Popover as Pop } from 'react-native-modal-popover'

export default class Popover extends React.PureComponent {
  state = {
    anchor: { x: 0, y: 0, width: 0, height: 0 }
  }
  setAnchor = () => {
    const handle = findNodeHandle(this.child)
    if (handle) {
      NativeModules.UIManager.measure(handle, (x0, y0, width, height, x, y) => {
        this.setState({ anchor: { x, y, width, height } })
      })
    }
  }
  render() {
    const { style, visible, overlay, children, onShow, onClose } = this.props
    const { anchor } = this.state
    return (
      <View style={style}>
        <TouchableOpacity
          ref={ref => {
            this.child = ref
          }}
          onPress={onShow}
          onLayout={this.setAnchor}
        >
          {children}
        </TouchableOpacity>
        <Pop
          visible={visible}
          fromRect={anchor}
          placement='auto'
          duration={0}
          supportedOrientations={['portrait', 'landscape']}
          popoverStyle={styles.popover}
          contentStyle={styles.content}
          arrowStyle={styles.arrow}
          backgroundStyle={styles.background}
          onClose={onClose}
        >
          {overlay}
        </Pop>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  popover: {
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { height: 16 },
        shadowOpacity: 0.12,
        shadowRadius: 16
      }
    })
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 0,
    elevation: 3
  },
  arrow: {
    borderTopColor: '#ffffff'
  },
  background: {
    // backgroundColor: 'transparent'
  }
})
