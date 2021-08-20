/*
 * @Author: czy0729
 * @Date: 2019-03-26 05:09:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-20 16:06:59
 */
import React from 'react'
import { View } from 'react-native'
import { Expand, Heatmap } from '@components'
import { SectionTitle, ItemArticle } from '@screens/_'
import { _, systemStore } from '@stores'
import { memo, obc } from '@utils/decorators'
import { URL_DEFAULT_AVATAR } from '@constants'
import IconTopic from './icon/topic'
import IconHidden from './icon/hidden'

const defaultProps = {
  navigation: {},
  subjectId: 0,
  showTopic: true,
  topic: [],
  onSwitchBlock: Function.prototype
}

const Topic = memo(({ navigation, showTopic, subjectId, topic, onSwitchBlock }) => {
  rerender('Subject.Topic.Main')

  return (
    <View style={[_.mt.lg, !showTopic && _.short]}>
      <SectionTitle
        style={_.container.wind}
        right={showTopic ? <IconTopic /> : <IconHidden name='帖子' value='showTopic' />}
        icon={!showTopic && 'md-navigate-next'}
        onPress={() => onSwitchBlock('showTopic')}
      >
        帖子
      </SectionTitle>
      {showTopic && (
        <>
          <Expand style={_.mt.sm} ratio={1.2}>
            {topic.map((item, index) => (
              <ItemArticle
                key={item.id}
                style={styles.item}
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
                    subjectId
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
}, defaultProps)

export default obc((props, { $, navigation }) => {
  rerender('Subject.Topic')

  const { showTopic } = systemStore.setting
  if (showTopic === -1) return null

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

  if (!_topic.length) return null

  return (
    <Topic
      navigation={navigation}
      showTopic={showTopic}
      subjectId={$.subjectId}
      topic={_topic}
      onSwitchBlock={$.switchBlock}
    />
  )
})

const styles = _.create({
  item: {
    paddingLeft: _.wind
  }
})
