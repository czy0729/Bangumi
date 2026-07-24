/*
 * @Author: czy0729
 * @Date: 2022-01-19 10:32:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 05:41:38
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { IOS, WEB } from '@constants'
import { getShows } from '../../utils'
import CDNCover from './cdn-cover'
import CDNTest from './cdn-test'
import ImageFadeIn from './image-fade-in'
import ImageSkeleton from './image-skeleton'
import IOSImageCache from './ios-image-cache'
import { COMPONENT, TEXTS } from './ds'

import type { WithNavigation } from '@types'
import type { WithFilterProps } from '../../types'

/** 图片 */
function CDN({ navigation, filter }: WithNavigation<WithFilterProps>) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  if (!shows) return null

  return (
    <>
      <ItemSetting arrow highlight filter={filter} onPress={setTrue} {...TEXTS.cdn} />
      <ActionSheet
        show={state}
        title={TEXTS.cdn.hd}
        height={filter || WEB ? 440 : 640}
        onClose={setFalse}
      >
        {!WEB && shows.cover && (
          <CDNCover navigation={navigation} filter={filter} setFalse={setFalse} />
        )}
        {shows.imageSkeleton && <ImageSkeleton filter={filter} />}
        {shows.imageFadeIn && <ImageFadeIn />}
        {!WEB && shows.test && <CDNTest filter={filter} />}
        {IOS && shows.iOSImageCache && <IOSImageCache filter={filter} />}
      </ActionSheet>
    </>
  )
}

export default observer(CDN)
