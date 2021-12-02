/*
 * @Author: czy0729
 * @Date: 2020-09-11 11:49:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-02 08:38:35
 */
import { useEffect } from 'react'

export default function useMount(fn) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(() => fn(), [])
}
