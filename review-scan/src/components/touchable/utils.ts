/*
 * @Author: czy0729
 * @Date: 2021-12-29 17:25:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-31 07:18:13
 */
import { StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { _ } from '@stores'
import { IOS } from '@constants'
import { Fn } from '@types'

export const defaultHitSlop = {
  top: _.device(3, 4),
  right: _.device(2, 4),
  bottom: _.device(3, 4),
  left: _.device(2, 4)
}

export const styles = _.create({
  touchable: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1
  }
})

let isCalled = false
let timer: any

/** 防止瞬间多次点击 */
export function callOnceInInterval(
  /** 执行方法 */
  functionTobeCalled: Fn,

  /** 两次执行最小间隔 */
  interval = 80
) {
  if (isCalled) return false

  isCalled = true
  clearTimeout(timer)
  timer = setTimeout(() => (isCalled = false), interval)

  /** 把点击事件放在队列里面, 不阻塞 UI */
  if (IOS) {
    requestAnimationFrame(() => {
      functionTobeCalled()
    })
  } else {
    setTimeout(() => functionTobeCalled(), 0)
  }

  return true
}

/** 分离出 containerStyle */
export function separateStyles<T extends ViewStyle | TextStyle>(
  styles: StyleProp<T>
): {
  containerStyle: T
  style: T
} {
  const {
    width,
    height,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginHorizontal,
    marginVertical,
    borderWidth,
    borderColor,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    overflow,
    ...otherStyle
  } = (StyleSheet.flatten(styles) as T) || {}
  const containerStyle = {
    width,
    height,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginHorizontal,
    marginVertical,
    borderWidth,
    borderColor,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    overflow
  } as T

  const style = { ...otherStyle } as T
  if (typeof width === 'number') style.width = width
  if (typeof height === 'number') style.height = height

  return {
    containerStyle,
    style
  }
}
