/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:36:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 14:04:48
 */
import React from 'react'
import { View } from 'react-native'
import { Expand, Heatmap } from '@components'
import { SectionTitle, ItemArticle } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { URL_DEFAULT_AVATAR } from '@constants'

function Blog({ style }, { $, navigation }) {
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
  if (!_blog.length) {
    return null
  }

  const styles = memoStyles()
  const { showBlog } = systemStore.setting
  return (
    <View style={[style, !showBlog && _.short]}>
      <SectionTitle
        style={styles.left}
        icon={!showBlog && 'right'}
        onPress={() => $.switchBlock('showBlog')}
      >
        日志
      </SectionTitle>
      {showBlog && (
        <>
          <Expand style={_.mt.sm} ratio={1.2}>
            {_blog.map((item, index) => (
              <ItemArticle
                key={item.id}
                style={styles.left}
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
                    subjectId: $.subjectId
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
}

export default obc(Blog)

const memoStyles = _.memoStyles(_ => ({
  left: {
    paddingLeft: _.wind
  }
}))
