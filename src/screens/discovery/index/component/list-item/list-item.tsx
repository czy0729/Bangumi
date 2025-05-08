/*
 * @Author: czy0729
 * @Date: 2022-09-09 21:52:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:03:07
 */
import React from 'react'
import { HorizontalList } from '@components'
import { InView } from '@_'
import { _, usersStore } from '@stores'
import { findSubjectCn, getCoverLarge } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { FROZEN_ARRAY, IMG_DEFAULT, MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { INITIAL_RENDER_NUMS_XS } from '../../ds'
import CoverLg from '../cover/lg'
import CoverSm from '../cover/sm'
import CoverXs from '../cover/xs'
import SectionTitle from '../section-title'
import { COMPONENT_MAIN, DEFAULT_PROPS, INITIAL_RENDER_NUMS_SM, ITEM_HEIGHT } from './ds'

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
    return (
      <InView y={_.window.height * 0.64 + index * ITEM_HEIGHT}>
        <SectionTitle title={title} type={type} />
        <CoverLg
          title={title}
          src={getCoverLarge(list[0].cover) || IMG_DEFAULT}
          cn={findSubjectCn(list[0].title, list[0].subjectId)}
          data={list[0]}
        />
        <HorizontalList
          style={style}
          contentContainerStyle={styles.contentContainerStyle}
          data={list.filter((_item, index) => index > 0)}
          initialRenderNums={INITIAL_RENDER_NUMS_SM}
          renderItem={item => (
            <CoverSm
              key={item.subjectId}
              title={title}
              src={item.cover || IMG_DEFAULT}
              cn={findSubjectCn(item.title, item.subjectId)}
              data={item}
            />
          )}
          onEndReachedOnce={() => {
            t('发现.滑动到边', {
              from: `CoverSm|${type}`
            })
          }}
        />
        {!!friendsChannel.length && (
          <HorizontalList
            contentContainerStyle={styles.contentContainerStyleSm}
            data={friendsChannel.filter(item => (item.cover as string) !== '/img/no_img.gif')}
            initialRenderNums={INITIAL_RENDER_NUMS_XS}
            renderItem={item => (
              <CoverXs
                key={`${item.userId}|${item.id}`}
                title={title}
                avatar={usersStore.friendsMap[item.userId]?.avatar}
                data={item}
              />
            )}
            onEndReachedOnce={() => {
              t('发现.滑动到边', {
                from: `CoverXs|${type}`
              })
            }}
          />
        )}
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default ListItem
