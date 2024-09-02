/*
 * @Author: czy0729
 * @Date: 2020-09-11 11:49:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 13:20:29
 */
import { useEffect } from 'react'
import { FROZEN_FN } from '@constants/init'

export default function useMount(fn = FROZEN_FN) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(() => fn(), [])
}
