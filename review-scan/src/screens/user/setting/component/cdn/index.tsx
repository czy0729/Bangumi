/*
 * @Author: czy0729
 * @Date: 2022-01-19 10:32:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-03 22:35:07
 */
import React from 'react'
import { ActionSheet, Text } from '@components'
import { ItemSetting } from '@_'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import { IOS, WEB } from '@constants'
import { getShows } from '../../utils'
import CDNAvatar from './cdn-avatar'
import CDNCover from './cdn-cover'
import CDNTest from './cdn-test'
import ImageFadeIn from './image-fade-in'
import ImageSkeleton from './image-skeleton'
import IOSImageCache from './ios-image-cache'
import { COMPONENT, TEXTS } from './ds'

/** 图片 */
function CDN({ navigation, filter }) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    const { cdn } = systemStore.setting
    const label = []
    if (!cdn) label.push('关闭')

    return (
      <>
        <ItemSetting
          hd='图片'
          ft={
            <Text type='sub' size={15}>
              {label.join('、')}
            </Text>
          }
          arrow
          highlight
          filter={filter}
          onPress={setTrue}
        />
        <ActionSheet
          show={state}
          title='图片'
          height={filter || WEB ? 440 : 640}
          onClose={setFalse}
        >
          {!WEB && shows.cover && (
            <CDNCover navigation={navigation} filter={filter} setFalse={setFalse} />
          )}
          {!WEB && shows.cdnAvatarV2 && cdn && <CDNAvatar filter={filter} />}
          {shows.imageSkeleton && <ImageSkeleton filter={filter} />}
          {shows.imageFadeIn && <ImageFadeIn filter={filter} />}
          {!WEB && shows.test && <CDNTest filter={filter} />}
          {IOS && shows.iOSImageCache && <IOSImageCache filter={filter} />}
        </ActionSheet>
      </>
    )
  })
}

export default CDN
