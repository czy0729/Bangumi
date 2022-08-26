/*
 * @Author: czy0729
 * @Date: 2019-03-26 05:09:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 10:49:53
 */
import React from 'react'
import { View } from 'react-native'
import { Expand, Heatmap } from '@components'
import { SectionTitle, ItemArticle } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import IconTopic from '../icon/topic'
import IconHidden from '../icon/hidden'
import { DEFAULT_PROPS } from './ds'

export default memo(
  ({ navigation, styles, showTopic, subjectId, topic, onSwitchBlock }) => {
    global.rerender('Subject.Topic.Main')

    return (
      <View style={[_.mt.lg, !showTopic && _.short]}>
        <SectionTitle
          style={_.container.wind}
          right={
            showTopic ? <IconTopic /> : <IconHidden name='帖子' value='showTopic' />
          }
          icon={!showTopic && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showTopic')}
        >
          帖子
        </SectionTitle>
        {showTopic && (
          <>
            <Expand style={_.mt.sm} ratio={1.2}>
              {topic.map(item => (
                <ItemArticle
                  key={item.id}
                  style={styles.item}
                  navigation={navigation}
                  avatar={item.user.avatar.small}
                  title={item.title}
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
            <Heatmap id='条目.跳转' from='讨论版' />
          </>
        )}
      </View>
    )
  },
  DEFAULT_PROPS
)
