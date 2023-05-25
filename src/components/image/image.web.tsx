/*
 * @Author: czy0729
 * @Date: 2023-04-16 14:43:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-16 15:43:56
 */
import React, { useState, useRef, useEffect } from 'react'
import { Image as RNImage } from 'react-native'
import { IMG_DEFAULT } from '@constants'

const lazyloadedMap = new Map<string, boolean>()

export default function Image({ style, source, ...props }) {
  const ref = useRef(null)
  const { uri } = source
  const lazyloaded = lazyloadedMap.has(uri)
  const [opacity, setOpacity] = useState(lazyloaded ? 1 : 0)

  useEffect(() => {
    if (lazyloaded) return

    if (ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // 进入可视区域
            const div = ref.current.querySelector(':first-child')
            if (div) {
              // 使用 dom 预加载图片, 以便制做渐出效果
              preloadImage(uri, () => {
                div.style['background-image'] = `url("${uri}")`
                setTimeout(() => {
                  setOpacity(1)
                }, 0)
              })
            }

            // 停止对该图片的观察
            observer.unobserve(entry.target)

            // 标记已观察过
            lazyloadedMap.set(uri, true)
          }
        },
        {
          threshold: 0.1
        }
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
      style={[
        style,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          opacity,
          transition: 'opacity 0.32s ease-in-out'
        }
      ]}
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

function preloadImage(src: string, onLoaded: Function) {
  let image = new window.Image()
  image.src = src

  function load() {
    onLoaded()

    // 销毁图片对象
    image.onload = null
    image.onerror = null
    image.src = ''
    image = null
  }
  image.onload = load
  image.onerror = load
}
