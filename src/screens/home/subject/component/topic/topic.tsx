/*
 * @Author: czy0729
 * @Date: 2019-03-26 05:09:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 08:02:49
 */
import React from 'react'
import { Expand, Heatmap } from '@components'
import { InView, ItemArticle, SectionTitle } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { useExpandLazy } from '@utils/hooks'
import { TITLE_TOPIC } from '../../ds'
import IconHidden from '../../icon/hidden'
import IconTopic from '../../icon/topic'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Topic = memo(
  ({ navigation, styles, showTopic, subjectId, topic, onSwitchBlock }) => {
    const { list, onExpand } = useExpandLazy(topic, 4)
    return (
      <InView style={stl(styles.container, !showTopic && _.short)}>
        <SectionTitle
          style={_.container.wind}
          right={showTopic ? <IconTopic /> : <IconHidden name={TITLE_TOPIC} value='showTopic' />}
          icon={!showTopic && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showTopic')}
        >
          {TITLE_TOPIC}
        </SectionTitle>
        {showTopic && (
          <>
            <Expand style={_.mt.sm} onExpand={onExpand}>
              {list.map(item => (
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
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Topic
