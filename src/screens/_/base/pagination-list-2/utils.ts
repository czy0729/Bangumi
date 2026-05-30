/*
 * @Author: czy0729
 * @Date: 2026-05-31 00:35:37
 * @Last Modified by: imagebuilder1837
 * @Last Modified time: 2026-05-31 00:35:37
 */

export function setRef(ref: any, value: any) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    ref.current = value
  }
}

export function nextFrame() {
  return new Promise(resolve => {
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(resolve)
      return
    }

    setTimeout(resolve, 0)
  })
}
