/*
 * @Author: czy0729
 * @Date: 2021-12-29 17:25:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-29 17:37:00
 */
import { StyleSheet } from 'react-native'
import { _ } from '@stores'

export const defaultHitSlop = {
  top: _.device(3, 4),
  right: _.device(2, 4),
  bottom: _.device(3, 4),
  left: _.device(2, 4)
}

export const styles = StyleSheet.create({
  touchable: {
    ...StyleSheet.absoluteFill,
    zIndex: 1
  }
})

/**
 * 防止瞬间多次点击
 * @param {*} functionTobeCalled
 */
let isCalled = false
let timer
export function callOnceInInterval(functionTobeCalled, interval = 80) {
  if (!isCalled) {
    isCalled = true
    clearTimeout(timer)
    timer = setTimeout(() => (isCalled = false), interval)

    /**
     * 把点击事件放在requestAnimationFrame里面, 在安卓上面是两个完全不同的体验
     */
    return setTimeout(() => functionTobeCalled(), 0)
  }

  return false
}