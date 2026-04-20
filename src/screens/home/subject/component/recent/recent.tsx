/*
 * @Author: czy0729
 * @Date: 2019-08-24 01:29:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 21:46:47
 */
import React, { useCallback, useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Heatmap, Text, UserStatus } from '@components'
import { Avatar, InView, PreventTouchPlaceholder, SectionTitle, Segment, Stars } from '@_'
import { _ } from '@stores'
import { getVisualLength, stl } from '@utils'
import { memo } from '@utils/decorators'
import { useHorizontalLazy } from '@utils/hooks'
import { FROZEN_FN, SCROLL_VIEW_RESET_PROPS } from '@constants'
import { TITLE_RECENT } from '../../ds'
import IconHidden from '../icon/hidden'
import { COMPONENT_MAIN, DATA, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

const Recent = memo(
  ({
    navigation,
    subjectId = 0,
    showRecent = true,
    subjectRecentType,
    who,
    hideScore = false,
    onSwitchBlock = FROZEN_FN,
    onSwitchSubjectRecentType = FROZEN_FN
  }) => {
    const { list, onScroll } = useHorizontalLazy(who)

    const elRight = useMemo(
      () =>
        showRecent ? (
          <Segment
            data={DATA}
            selectedIndex={DATA.findIndex(item => item === subjectRecentType)}
            onSelect={onSwitchSubjectRecentType}
          />
        ) : (
          <IconHidden name={TITLE_RECENT} value='showRecent' />
        ),
      [onSwitchSubjectRecentType, showRecent, subjectRecentType]
    )

    const handleToggle = useCallback(() => onSwitchBlock('showRecent'), [onSwitchBlock])

    return (
      <InView style={stl(styles.container, !showRecent && styles.containerNotShow)}>
        <SectionTitle
          style={_.container.wind}
          right={elRight}
          icon={!showRecent && 'md-navigate-next'}
          splitStyles
          onPress={handleToggle}
        >
          {TITLE_RECENT}
        </SectionTitle>

        {showRecent && (
          <>
            <ScrollView
              key={subjectRecentType}
              style={_.mt.md}
              contentContainerStyle={_.container.wind}
              horizontal
              {...SCROLL_VIEW_RESET_PROPS}
              scrollEventThrottle={16}
              onScroll={onScroll}
            >
              {list.map(item => {
                const text = item.name
                const visualLength = getVisualLength(text)
                const size = visualLength >= 10 ? 11 : visualLength >= 6 ? 12 : 13

                return (
                  <Flex key={item.userId} style={styles.item}>
                    <UserStatus userId={item.userId}>
                      <Avatar
                        navigation={navigation}
                        userId={item.userId}
                        name={item.name}
                        src={item.avatar}
                        event={{
                          id: '条目.跳转',
                          data: {
                            from: '用户动态',
                            subjectId
                          }
                        }}
                      />
                    </UserStatus>
                    <View style={_.ml.sm}>
                      <Text size={size} lineHeight={13} bold>
                        {item.name}
                      </Text>
                      <Flex style={_.mt.xs}>
                        <Text type='sub' size={10}>
                          {item.status}
                        </Text>
                        {!hideScore && <Stars style={_.ml.xs} value={item.star} simple />}
                      </Flex>
                    </View>
                  </Flex>
                )
              })}
            </ScrollView>

            <Heatmap id='条目.跳转' from='用户动态' />
          </>
        )}
        <PreventTouchPlaceholder />
      </InView>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Recent
