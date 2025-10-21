/*
 * @Author: czy0729
 * @Date: 2022-09-09 21:52:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-20 17:28:09
 */
import React, { useCallback } from 'react'
import { HorizontalList } from '@components'
import { InView } from '@_'
import { _, usersStore } from '@stores'
import { findSubjectCn, getCoverLarge } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { FROZEN_ARRAY, IMG_DEFAULT, MODEL_SUBJECT_TYPE } from '@constants'
import { INITIAL_RENDER_NUMS_XS } from '../../ds'
import CoverLg from '../cover/lg'
import CoverSm from '../cover/sm'
import CoverXs from '../cover/xs'
import SectionTitle from '../section-title'
import { COMPONENT_MAIN, DEFAULT_PROPS, INITIAL_RENDER_NUMS_SM, ITEM_HEIGHT } from './ds'

import type { HomeItem } from '@stores/calendar/types'
import type { ChannelFriendsItem } from '@stores/discovery/types'
import type { SubjectTypeCn } from '@types'

const ListItem = memo(
  ({
    styles,
    style,
    index = 0,
    type = 'anime',
    list = FROZEN_ARRAY,
    friendsChannel = FROZEN_ARRAY
  }) => {
    const title = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
    const first = list[0]
    const rest = list.slice(1)

    const handleEndReachedSm = useCallback(() => {
      t('发现.滑动到边', { from: `CoverSm|${type}` })
    }, [type])

    const handleEndReachedXs = useCallback(() => {
      t('发现.滑动到边', { from: `CoverXs|${type}` })
    }, [type])

    const renderCoverSm = useCallback(
      (item: HomeItem) => (
        <CoverSm
          key={item.subjectId}
          title={title}
          src={item.cover || IMG_DEFAULT}
          cn={findSubjectCn(item.title, item.subjectId)}
          data={item}
        />
      ),
      [title]
    )

    const renderCoverXs = useCallback(
      (item: ChannelFriendsItem) => (
        <CoverXs
          key={`${item.userId}|${item.id}`}
          title={title}
          avatar={usersStore.friendsMap[item.userId]?.avatar}
          data={item}
        />
      ),
      [title]
    )

    const validFriends = friendsChannel.filter(item => item.cover !== '/img/no_img.gif')

    return (
      <InView y={Math.floor(_.window.height * 0.64) + index * ITEM_HEIGHT}>
        <SectionTitle title={title} type={type} />

        {!!first && (
          <CoverLg
            title={title}
            src={getCoverLarge(first.cover) || IMG_DEFAULT}
            cn={findSubjectCn(first.title, first.subjectId)}
            data={first}
          />
        )}

        {!!rest.length && (
          <HorizontalList
            style={style}
            contentContainerStyle={styles.contentContainerStyle}
            data={rest}
            initialRenderNums={INITIAL_RENDER_NUMS_SM}
            renderItem={renderCoverSm}
            onEndReachedOnce={handleEndReachedSm}
          />
        )}

        {!!validFriends.length && (
          <HorizontalList
            contentContainerStyle={styles.contentContainerStyleSm}
            data={validFriends}
            initialRenderNums={INITIAL_RENDER_NUMS_XS}
            renderItem={renderCoverXs}
            onEndReachedOnce={handleEndReachedXs}
          />
        )}
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default ListItem
