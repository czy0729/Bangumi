/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:23:12
 */
import React from 'react'
import { Expand, Heatmap } from '@components'
import { InView, ItemArticle, SectionTitle } from '@_'
import { _, rakuenStore } from '@stores'
import { getIsBlockedUser, stl } from '@utils'
import { memo } from '@utils/decorators'
import { useExpandLazy } from '@utils/hooks'
import { FROZEN_ARRAY, FROZEN_FN } from '@constants'
import { TITLE_BLOG } from '../../ds'
import IconBlog from '../icon/blog'
import IconHidden from '../icon/hidden'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Blog = memo(
  ({
    navigation,
    styles,
    showBlog = true,
    subjectId = 0,
    blog = FROZEN_ARRAY,
    onSwitchBlock = FROZEN_FN
  }) => {
    const { list, onExpand } = useExpandLazy(blog)
    return (
      <InView style={stl(styles.container, !showBlog && _.short)}>
        <SectionTitle
          style={styles.sectionTitle}
          right={showBlog ? <IconBlog /> : <IconHidden name={TITLE_BLOG} value='showBlog' />}
          icon={!showBlog && 'md-navigate-next'}
          splitStyles
          onPress={() => onSwitchBlock('showBlog')}
        >
          {TITLE_BLOG}
        </SectionTitle>
        {showBlog && (
          <>
            <Expand key={String(blog?.length)} style={_.mt.sm} onExpand={onExpand}>
              {list.map(item => {
                const { nickname, username } = item.user
                const flag = getIsBlockedUser(
                  rakuenStore.blockUserIds,
                  nickname,
                  username,
                  `Subject|Blog|${subjectId}|${item.id}`
                )
                if (flag) return null

                return (
                  <ItemArticle
                    key={item.id}
                    style={styles.item}
                    navigation={navigation}
                    avatar={item.user.avatar.small}
                    title={item.title}
                    summary={item.summary.replace(/\r\n/g, '').trim()}
                    nickname={nickname}
                    userId={username}
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
                )
              })}
            </Expand>
            <Heatmap id='条目.跳转' from='评论' />
          </>
        )}
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Blog
