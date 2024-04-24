/*
 * @Author: czy0729
 * @Date: 2022-01-19 10:32:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 05:34:02
 */
import React from 'react'
import { ActionSheet, Text } from '@components'
import { ItemSetting } from '@_'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import { IOS, STORYBOOK } from '@constants'
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

    const label = []
    if (!systemStore.setting.cdn) label.push('关闭')

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
          height={filter || STORYBOOK ? 400 : 640}
          onClose={setFalse}
        >
          {!STORYBOOK && shows.cover && (
            <CDNCover navigation={navigation} filter={filter} setFalse={setFalse} />
          )}
          {!STORYBOOK && shows.cdnAvatarV2 && <CDNAvatar filter={filter} />}
          {!STORYBOOK && shows.test && <CDNTest filter={filter} />}
          {shows.imageSkeleton && <ImageSkeleton filter={filter} />}
          {shows.imageFadeIn && <ImageFadeIn filter={filter} />}
          {IOS && shows.iOSImageCache && <IOSImageCache filter={filter} />}
        </ActionSheet>
      </>
    )
  })
}

export default CDN
