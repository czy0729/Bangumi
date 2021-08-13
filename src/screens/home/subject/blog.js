/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-13 09:05:25
 */
import React from 'react'
import { View } from 'react-native'
import { Expand, Heatmap } from '@components'
import { SectionTitle, ItemArticle } from '@screens/_'
import { _, systemStore } from '@stores'
import { memo, obc } from '@utils/decorators'
import { URL_DEFAULT_AVATAR } from '@constants'
import IconBlog from './icon/blog'

const defaultProps = {
  navigation: {},
  showBlog: true,
  subjectId: 0,
  blog: [],
  onSwitchBlock: Function.prototype
}

const Blog = memo(
  ({ navigation, showBlog, subjectId, blog, onSwitchBlock }) => {
    rerender('Subject.Blog.Main')

    return (
      <View style={[_.mt.lg, !showBlog && _.short]}>
        <SectionTitle
          style={{ paddingHorizontal: _.wind }}
          icon={!showBlog && 'md-navigate-next'}
          right={<IconBlog />}
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
                  style={{
                    paddingLeft: _.wind
                  }}
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

  const { blog } = $.subject
  let _blog = blog || []
  if ($.filterDefault || $.isLimit) {
    _blog = _blog.filter(item => {
      if (item?.user?.avatar?.small.includes(URL_DEFAULT_AVATAR)) {
        return false
      }
      return true
    })
  }
  if (!_blog.length) return null

  return (
    <Blog
      navigation={navigation}
      showBlog={systemStore.setting.showBlog}
      subjectId={$.subjectId}
      blog={_blog}
      onSwitchBlock={$.switchBlock}
    />
  )
})
