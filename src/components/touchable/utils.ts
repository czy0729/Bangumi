/*
 * @Author: czy0729
 * @Date: 2021-12-29 17:25:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-28 19:40:13
 */
import { _ } from '@stores'

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

/**
 * 防止瞬间多次点击
 * @param {*} functionTobeCalled
 */
export function callOnceInInterval(
  functionTobeCalled: (event?: any) => any,
  interval = 80
) {
  if (!isCalled) {
    isCalled = true
    clearTimeout(timer)
    timer = setTimeout(() => (isCalled = false), interval)

    functionTobeCalled()
    /** 把点击事件放在 requestAnimationFrame 里面, 在安卓上面是两个完全不同的体验 */
    // return setTimeout(() => functionTobeCalled(), 0)
  }

  return false
}

/**
 * 分离出 containerStyle
 * @param {*} styles
 */
export function separateStyles(styles) {
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
  } = _.flatten(styles) || {}
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
  }
  const style = { ...otherStyle }
  if (typeof width === 'number') style.width = width
  if (typeof height === 'number') style.height = height
  return {
    containerStyle,
    style
  }
}
