/*
 * @Author: czy0729
 * @Date: 2023-04-12 09:06:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 18:32:14
 */
import React, { useEffect, useState } from 'react'
import { useObserver } from 'mobx-react'
import { _, systemStore } from '@stores'
import { STORYBOOK } from '@constants'
import { IMAGE_FADE_DURATION } from '../ds'
import { Skeleton as SkeletonComp } from '../../skeleton'

function Skeleton({ style, type, textOnly, placeholder, loaded }) {
  const [hide, setHide] = useState(loaded)
  useEffect(() => {
    if (!hide && loaded) {
      setTimeout(() => {
        setHide(true)
      }, IMAGE_FADE_DURATION + 20)
    }
  }, [loaded])

  return useObserver(() => {
    if (!systemStore.setting.imageSkeleton || STORYBOOK || textOnly || !placeholder || hide) {
      return null
    }

    const { width, height } = _.flatten(style)
    return <SkeletonComp type={type} width={width} height={height} />
  })
}

export default Skeleton
