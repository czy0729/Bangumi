/*
 * @Author: czy0729
 * @Date: 2019-03-26 05:09:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-03 22:41:18
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
import { TITLE_TOPIC } from '../../ds'
import IconHidden from '../icon/hidden'
import IconTopic from '../icon/topic'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Topic = memo(
  ({ navigation, styles, showTopic = true, subjectId = 0, topic, onSwitchBlock = FROZEN_FN }) => {
    const filterTopic = topic.filter(item => {
      const { nickname, username } = item.user
      return !getIsBlockedUser(
        rakuenStore.blockUserIds,
        nickname,
        username,
        `Subject|Topic|${subjectId}|${item.id}`
      )
    })
    const { list, onExpand } = useExpandLazy(filterTopic, 6)

    const elRight = useMemo(
      () => (showTopic ? <IconTopic /> : <IconHidden name={TITLE_TOPIC} value='showTopic' />),
      [showTopic]
    )

    const handleToggle = useCallback(() => onSwitchBlock('showTopic'), [onSwitchBlock])

    const elList = useMemo(
      () => (
        <>
          {list.map(item => {
            const { nickname, username } = item.user
            const flag = getIsBlockedUser(
              rakuenStore.blockUserIds,
              nickname,
              username,
              `Subject|Topic|${subjectId}|${item.id}`
            )
            if (flag) return null

            return (
              <ItemArticle
                key={item.id}
                style={styles.item}
                navigation={navigation}
                avatar={item.user.avatar.small}
                title={item.title}
                nickname={nickname}
                userId={username}
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
            )
          })}
        </>
      ),
      [list, navigation, styles, subjectId]
    )

    return (
      <InView
        style={stl(
          styles.container,
          list?.length >= 3 && styles.containerFull,
          !showTopic && styles.containerNotShow
        )}
      >
        <SectionTitle
          style={_.container.wind}
          right={elRight}
          icon={!showTopic && 'md-navigate-next'}
          splitStyles
          onPress={handleToggle}
        >
          {TITLE_TOPIC}
        </SectionTitle>

        {showTopic && !!list.length && (
          <View style={_.mt.sm}>
            {list.length <= 3 ? (
              elList
            ) : (
              <Expand checkLayout={false} onExpand={onExpand}>
                {elList}
              </Expand>
            )}
            <Heatmap id='条目.跳转' from='讨论版' />
          </View>
        )}
        <PreventTouchPlaceholder />
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Topic
