/*
 * @Author: czy0729
 * @Date: 2023-04-16 14:43:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-03 08:19:29
 */
import React, { useEffect, useRef, useState } from 'react'
import { Image as RNImage } from 'react-native'
import { _ } from '@stores'
import { stl } from '@utils'
import { DOGE_CDN_IMG_DEFAULT, IMG_DEFAULT } from '@constants'
import { Component } from '../../../components'
import './index.scss'

const memo = new Map<string, boolean>()
memo.set(DOGE_CDN_IMG_DEFAULT, true)

export default function Image({ style, source, autoSize, autoHeight, fadeDuration, ...props }) {
  const ref = useRef(null)
  const { uri, headers } = source
  const lazyloaded = memo.has(uri)
  const [opacity, setOpacity] = useState(lazyloaded ? 1 : 0)

  const renderDOM = !!(headers?.Referer && !headers.Referer.includes('bgm.tv'))
  useEffect(() => {
    if (renderDOM) return

    if (ref.current && autoSize) {
      const img = ref.current?.querySelector('img')
      if (img) img.src = uri
    }

    if (lazyloaded) {
      setTimeout(() => {
        if (!opacity) setOpacity(1)
      }, 0)
      return
    }

    if (ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // 进入可视区域
            const div = ref.current?.querySelector(':first-child')
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

            // 标记已观察过, 延迟是为了防止页面同时出现这个图片多次而后面的不执行逻辑
            setTimeout(() => {
              memo.set(uri, true)
            }, 800)
          }
        },
        {
          threshold: 0
        }
      )

      observer.observe(ref.current)
      return () => {
        observer.disconnect()
      }
    }
  }, [renderDOM, autoSize, lazyloaded, opacity, uri])

  if (renderDOM) {
    return (
      <img
        style={stl({
          ..._.flatten(style || {}),
          width: autoSize || style?.width || 'auto',
          height: autoHeight || style?.height || 'auto'
        })}
        src={uri}
        rel='noreferrer'
        referrerPolicy='no-referrer'
        alt=''
      />
    )
  }

  const el = (
    <RNImage
      ref={ref}
      {...props}
      style={[
        style,
        {
          opacity,
          transition: fadeDuration === 0 ? undefined : 'opacity 0.12s ease-in-out'
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

  return autoSize ? (
    <Component id='component-image-image' data-auto-size={true}>
      {el}
    </Component>
  ) : (
    el
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
  // image.onerror = load
}
