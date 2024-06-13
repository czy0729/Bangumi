/*
 * @Author: czy0729
 * @Date: 2023-04-12 09:06:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-13 19:25:28
 */
import React, { useEffect, useRef, useState } from 'react'
import { useObserver } from 'mobx-react'
import { _, systemStore } from '@stores'
import { STORYBOOK } from '@constants'
import { Skeleton as SkeletonComp } from '../../skeleton'

function Skeleton({ style, type, textOnly, placeholder, loaded }) {
  const [show, setShow] = useState(true)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (!systemStore.setting.imageSkeleton || STORYBOOK || textOnly || !placeholder || loaded) {
      return
    }

    timeoutRef.current = setInterval(() => {
      timeoutRef.current = null
      setShow(false)
    }, 6400)

    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current)
    }
  }, [textOnly, placeholder, loaded])

  return useObserver(() => {
    if (
      !systemStore.setting.imageSkeleton ||
      STORYBOOK ||
      textOnly ||
      !placeholder ||
      loaded ||
      !show
    ) {
      return null
    }

    const { width, height } = _.flatten(style)
    return <SkeletonComp type={type} width={width} height={height} />
  })
}

export default Skeleton
