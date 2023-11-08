/*
 * @Author: czy0729
 * @Date: 2023-11-08 14:01:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-08 14:02:53
 */
import { useEffect, useRef } from 'react'

export default function useDom(cls: string) {
  const ref = useRef(null)
  useEffect(() => {
    if (cls) ref.current.classList.add(cls)
  }, [cls])
  return ref
}
