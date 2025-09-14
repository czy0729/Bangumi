/*
 * @Author: czy0729
 * @Date: 2021-11-20 12:26:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-20 12:28:11
 */
import { useRef, useEffect } from 'react'

export default function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
