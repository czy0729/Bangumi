/*
 * @Author: czy0729
 * @Date: 2020-09-11 11:49:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 13:20:29
 */
import { useEffect } from 'react'
import { FROZEN_FN } from '@constants/init'

/**
 * 自定义 Hook，用于在组件挂载时执行传入的函数。
 *
 * @param {() => void} [fn=FROZEN_FN] - 可选的函数，默认为 `FROZEN_FN`，即空函数
 */
export default function useMount(fn: () => void = FROZEN_FN) {
  useEffect(() => {
    fn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
