/*
 * @Author: czy0729
 * @Date: 2022-01-19 10:32:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 12:00:00
 */
import { observer } from 'mobx-react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { WEB } from '@constants'
import { getShows } from '../../utils'
import { IconImage } from '../icons'
import AvatarRound from './avatar-round'
import CDNCover from './cdn-cover'
import CDNTest from './cdn-test'
import CoverThings from './cover-things'
import ImageFadeIn from './image-fade-in'
import ImageSkeleton from './image-skeleton'
import Squircle from './squircle'
import { COMPONENT, TEXTS } from './ds'

import type { WithFilterProps } from '../../types'

/** 图片 */
function CDN({ filter }: WithFilterProps) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  if (!shows) return null

  return (
    <>
      <ItemSetting
        icon={<IconImage />}
        arrow
        highlight
        filter={filter}
        onPress={setTrue}
        {...TEXTS.cdn}
      />
      <ActionSheet
        show={state}
        title={TEXTS.cdn.hd}
        height={filter || WEB ? 440 : 760}
        onClose={setFalse}
      >
        {shows.coverThings && <CoverThings filter={filter} />}
        {shows.avatarRound && <AvatarRound filter={filter} />}
        {!WEB && (
          <>
            shows.cover && <CDNCover filter={filter} setFalse={setFalse} />
            shows.test && <CDNTest filter={filter} />
          </>
        )}
        {shows.imageSkeleton && <ImageSkeleton filter={filter} />}
        {shows.imageFadeIn && <ImageFadeIn />}
        {shows.squircle && <Squircle filter={filter} />}
      </ActionSheet>
    </>
  )
}

export default observer(CDN)
