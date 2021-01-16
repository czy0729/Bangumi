/*
 * @Author: czy0729
 * @Date: 2019-03-26 05:09:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 01:35:55
 */
import React from 'react'
import { View } from 'react-native'
import { Expand, Heatmap } from '@components'
import { SectionTitle, ItemArticle } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { URL_DEFAULT_AVATAR } from '@constants'

function Topic({ style }, { $, navigation }) {
  const { topic } = $.subject
  let _topic = topic || []
  if ($.filterDefault || $.isLimit) {
    _topic = _topic.filter(item => {
      if (item?.user?.avatar?.small.includes(URL_DEFAULT_AVATAR)) {
        return false
      }
      return true
    })
  }
  if (!_topic.length) {
    return null
  }

  const { showTopic } = systemStore.setting
  return (
    <View style={[style, !showTopic && _.short]}>
      <SectionTitle
        style={{ paddingLeft: _.wind }}
        icon={!showTopic && 'right'}
        onPress={() => $.switchBlock('showTopic')}
      >
        帖子
      </SectionTitle>
      {showTopic && (
        <>
          <Expand style={_.mt.sm} ratio={1.2}>
            {_topic.map((item, index) => (
              <ItemArticle
                key={item.id}
                style={{
                  paddingLeft: _.wind
                }}
                navigation={navigation}
                index={index}
                avatar={item.user.avatar.small}
                title={item.title}
                summary={item.summary}
                nickname={item.user.nickname}
                userId={item.user.username}
                timestamp={item.timestamp}
                replies={item.replies}
                url={item.url}
                event={{
                  id: '条目.跳转',
                  data: {
                    from: '讨论版',
                    subjectId: $.subjectId
                  }
                }}
              />
            ))}
          </Expand>
          <Heatmap
            id='条目.跳转'
            data={{
              from: '讨论版'
            }}
          />
        </>
      )}
    </View>
  )
}

export default obc(Topic)
