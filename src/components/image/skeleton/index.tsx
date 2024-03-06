/*
 * @Author: czy0729
 * @Date: 2023-04-12 09:06:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-06 12:58:01
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { _, systemStore } from '@stores'
import { STORYBOOK } from '@constants'
import { Skeleton as SkeletonComp } from '../../skeleton'

function Skeleton({ style, type, textOnly, placeholder, loaded }) {
  return useObserver(() => {
    if (!systemStore.setting.imageSkeleton || STORYBOOK || textOnly || !placeholder || loaded) {
      return null
    }

    const { width, height } = _.flatten(style)
    return <SkeletonComp type={type} width={width} height={height} />
  })
}

export default Skeleton
