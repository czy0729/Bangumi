/*
 * @Author: czy0729
 * @Date: 2022-03-10 21:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 01:23:33
 */
import useMount from './useMount'

/** 一个相同参数的页面只执行一次 */
export default function useRunAfter(
  fn = () => {},
  /** @ts-ignore 唯一标识 (web only) */
  name?: string
) {
  return useMount(() => {
    setTimeout(() => {
      requestAnimationFrame(() => fn())
    }, 400)
  })
}
