/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 06:31:54
 */
import React from 'react'
import { Expand, Heatmap } from '@components'
import { InView, ItemArticle, SectionTitle } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { useExpandLazy } from '@utils/hooks'
import { TITLE_BLOG } from '../../ds'
import IconBlog from '../../icon/blog'
import IconHidden from '../../icon/hidden'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Blog = memo(
  ({ navigation, styles, showBlog, subjectId, blog, onSwitchBlock }) => {
    const { list, onExpand } = useExpandLazy(blog)
    return (
      <InView style={stl(styles.container, !showBlog && _.short)}>
        <SectionTitle
          style={styles.sectionTitle}
          right={showBlog ? <IconBlog /> : <IconHidden name={TITLE_BLOG} value='showBlog' />}
          icon={!showBlog && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showBlog')}
        >
          {TITLE_BLOG}
        </SectionTitle>
        {showBlog && (
          <>
            <Expand style={_.mt.sm} onExpand={onExpand}>
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
