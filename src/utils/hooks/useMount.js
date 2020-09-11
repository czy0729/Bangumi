/*
 * @Author: czy0729
 * @Date: 2020-09-11 11:49:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-11 11:51:32
 */
import { useEffect } from 'react'

export default function useMount(fn) {
  return useEffect(() => fn(), [])
}
