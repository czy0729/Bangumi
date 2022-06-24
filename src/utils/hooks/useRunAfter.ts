/*
 * @Author: czy0729
 * @Date: 2022-03-10 21:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-25 03:29:00
 */
import useMount from './useMount'

export default function useRunAfter(fn = () => {}) {
  return useMount(() => {
    setTimeout(() => {
      requestAnimationFrame(() => fn())
    }, 240)
  })
}
