/*
 * @Author: czy0729
 * @Date: 2022-03-10 21:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-06 19:36:37
 */
import { IOS } from '@constants/constants'
import { FROZEN_FN } from '@constants/init'
import useMount from './useMount'

/** 一个相同参数的页面只执行一次 */
export default function useRunAfter(
  fn = FROZEN_FN,

  /** @ts-ignore 唯一标识 (web only) */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  name?: string
) {
  return useMount(() => {
    setTimeout(
      () => {
        requestAnimationFrame(() => fn())
      },
      IOS ? 400 : 520
    )
  })
}
