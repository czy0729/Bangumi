/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-07 10:50:03
 */
import React from 'react'
import { View } from 'react-native'
import { Expand, Heatmap } from '@components'
import { SectionTitle, ItemArticle } from '@screens/_'
import { _, systemStore } from '@stores'
import { memo, obc } from '@utils/decorators'
import { URL_DEFAULT_AVATAR } from '@constants'
import IconBlog from './icon/blog'
import IconHidden from './icon/hidden'

const defaultProps = {
  navigation: {},
  styles: {},
  showBlog: true,
  subjectId: 0,
  blog: [],
  onSwitchBlock: Function.prototype
}

const Blog = memo(
  ({ navigation, styles, showBlog, subjectId, blog, onSwitchBlock }) => {
    rerender('Subject.Blog.Main')

    return (
      <View style={[_.mt.lg, !showBlog && _.short]}>
        <SectionTitle
          style={styles.sectionTitle}
          right={showBlog ? <IconBlog /> : <IconHidden name='日志' value='showBlog' />}
          icon={!showBlog && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showBlog')}
        >
          日志
        </SectionTitle>
        {showBlog && (
          <>
            <Expand style={_.mt.sm} ratio={1.2}>
              {blog.map((item, index) => (
                <ItemArticle
                  key={item.id}
                  style={styles.item}
                  navigation={navigation}
                  index={index}
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
            <Heatmap
              id='条目.跳转'
              data={{
                from: '评论'
              }}
            />
          </>
        )}
      </View>
    )
  },
  defaultProps
)

export default obc((props, { $, navigation }) => {
  rerender('Subject.Blog')

  const { showBlog } = systemStore.setting
  if (showBlog === -1) return null

  const { blog } = $.subject
  let _blog = blog || []
  if ($.filterDefault || $.isLimit) {
    _blog = _blog.filter(item => {
      if (item?.user?.avatar?.small.includes(URL_DEFAULT_AVATAR)) return false
      return true
    })
  }
  if (!_blog.length) return null

  return (
    <Blog
      navigation={navigation}
      styles={memoStyles()}
      showBlog={showBlog}
      subjectId={$.subjectId}
      blog={_blog}
      onSwitchBlock={$.switchBlock}
    />
  )
})

const memoStyles = _.memoStyles(() => ({
  sectionTitle: {
    paddingHorizontal: _.wind
  },
  item: {
    paddingLeft: _.wind
  }
}))
