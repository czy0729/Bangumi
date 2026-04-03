/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-03 22:36:59
 */
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Expand, Heatmap } from '@components'
import { InView, ItemArticle, PreventTouchPlaceholder, SectionTitle } from '@_'
import { _, rakuenStore } from '@stores'
import { getIsBlockedUser, stl } from '@utils'
import { memo } from '@utils/decorators'
import { useExpandLazy } from '@utils/hooks'
import { FROZEN_FN } from '@constants'
import { TITLE_BLOG } from '../../ds'
import IconBlog from '../icon/blog'
import IconHidden from '../icon/hidden'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Blog = memo(
  ({ navigation, styles, showBlog = true, subjectId = 0, blog, onSwitchBlock = FROZEN_FN }) => {
    const filterBlog = blog.filter(item => {
      const { nickname, username } = item.user
      return !getIsBlockedUser(
        rakuenStore.blockUserIds,
        nickname,
        username,
        `Subject|Blog|${subjectId}|${item.id}`
      )
    })
    const { list, onExpand } = useExpandLazy(filterBlog)

    const elRight = useMemo(
      () => (showBlog ? <IconBlog /> : <IconHidden name={TITLE_BLOG} value='showBlog' />),
      [showBlog]
    )

    const handleToggle = useCallback(() => onSwitchBlock('showBlog'), [onSwitchBlock])

    const elList = useMemo(
      () => (
        <>
          {list.map(item => (
            <ItemArticle
              key={item.id}
              style={styles.item}
              navigation={navigation}
              avatar={item.user.avatar.small}
              title={item.title}
              summary={item.summary.replace(/\r\n/g, '').trim()}
              nickname={item.user.nickname}
              userId={item.user.username}
              timestamp={item.timestamp}
              replies={item.replies}
              url={item.url}
              event={{
                id: '条目.跳转',
                data: {
                  from: '评论',
                  subjectId
                }
              }}
            />
          ))}
        </>
      ),
      [list, navigation, styles, subjectId]
    )

    return (
      <InView
        style={stl(
          styles.container,
          list.length >= 2 && styles.containerFull,
          !showBlog && styles.containerNotShow
        )}
      >
        <SectionTitle
          style={styles.sectionTitle}
          right={elRight}
          icon={!showBlog && 'md-navigate-next'}
          splitStyles
          onPress={handleToggle}
        >
          {TITLE_BLOG}
        </SectionTitle>

        {showBlog && !!list.length && (
          <View style={_.mt.sm}>
            {list.length <= 1 ? (
              elList
            ) : (
              <Expand checkLayout={false} onExpand={onExpand}>
                {elList}
              </Expand>
            )}
            <Heatmap id='条目.跳转' from='评论' />
          </View>
        )}
        <PreventTouchPlaceholder />
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Blog
