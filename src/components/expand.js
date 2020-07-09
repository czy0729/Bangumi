/*
 * 收缩展开框
 * @Author: czy0729
 * @Date: 2019-05-09 16:49:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-09 14:52:59
 */
import React, { useState, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { useObserver } from 'mobx-react-lite'
import { LinearGradient } from 'expo-linear-gradient'
import { _ } from '@stores'
import Iconfont from './iconfont'
import Touchable from './touchable'

const size = 216 // 1个比例的最大高度

function Expand({ style, ratio, children }) {
  const [state, setState] = useState({
    layouted: false,
    expand: false,
    height: 0,
    maxHeight: 0
  })
  const onExpand = useCallback(() => {
    setState({
      ...state,
      expand: true
    })
  }, [state])
  return useObserver(() =>
    state.layouted ? (
      <View
        style={[
          styles.container,
          style,
          {
            height: state.expand ? 'auto' : state.maxHeight || state.height
          }
        ]}
      >
        <View
          style={{
            height: state.height
          }}
        >
          {children}
        </View>
        {!state.expand && (
          <>
            <LinearGradient
              style={styles.linear}
              colors={[
                `rgba(${_.colorPlainRaw.join()}, 0.16)`,
                `rgba(${_.colorPlainRaw.join()}, 1)`,
                `rgba(${_.colorPlainRaw.join()}, 1)`
              ]}
            />
            <Touchable style={styles.more} onPress={onExpand}>
              <Iconfont name='down' size={20} />
            </Touchable>
          </>
        )}
      </View>
    ) : (
      <View
        style={styles.layout}
        onLayout={({ nativeEvent }) => {
          const { height } = nativeEvent.layout
          const maxHeight = ratio * size
          const needExpand = height > maxHeight
          setState({
            layouted: true,
            expand: !needExpand,
            height,
            maxHeight: needExpand ? maxHeight : height
          })
        }}
      >
        {children}
      </View>
    )
  )
}

Expand.defaultProps = {
  style: undefined,
  ratio: 0.8 // 比例
}

export default Expand

const styles = StyleSheet.create({
  layout: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    opacity: 0
  },
  container: {
    overflow: 'hidden'
  },
  linear: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    height: 64,
    marginBottom: -2
  },
  more: {
    position: 'absolute',
    left: '50%',
    bottom: 0,
    padding: _.sm,
    marginLeft: -16
  }
})
