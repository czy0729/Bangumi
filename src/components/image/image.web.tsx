/*
 * @Author: czy0729
 * @Date: 2023-04-16 14:43:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-16 15:43:56
 */
import React, { useRef, useEffect } from 'react'
import { Image as RNImage } from 'react-native'
import { IMG_DEFAULT } from '@constants'

const lazyloadedMap = new Map<string, boolean>()

export default function Image({ source, ...props }) {
  const ref = useRef(null)
  const { uri } = source
  const lazyloaded = lazyloadedMap.has(uri)

  useEffect(() => {
    if (lazyloaded) return

    if (ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // 进入可视区域
            const div = ref.current.querySelector(':first-child')
            if (div) div.style['background-image'] = `url("${uri}")`

            // 停止对该图片的观察
            observer.unobserve(entry.target)

            lazyloadedMap.set(uri, true)
          }
        },
        { threshold: 0.1 }
      )

      observer.observe(ref.current)
      return () => {
        observer.disconnect()
      }
    }
  }, [lazyloaded, uri])

  return (
    <RNImage
      ref={ref}
      {...props}
      source={
        lazyloaded
          ? source
          : {
              uri: IMG_DEFAULT
            }
      }
    />
  )
}

export async function clearCache() {
  // void
}
