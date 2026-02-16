/*
 * @Author: czy0729
 * @Date: 2019-08-24 01:29:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 07:02:02
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Heatmap, Text, UserStatus } from '@components'
import { Avatar, InView, PreventTouchPlaceholder, SectionTitle, Stars } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { useHorizontalLazy } from '@utils/hooks'
import { FROZEN_ARRAY, FROZEN_FN, SCROLL_VIEW_RESET_PROPS } from '@constants'
import { TITLE_RECENT } from '../../ds'
import IconHidden from '../icon/hidden'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

const Recent = memo(
  ({
    navigation,
    subjectId = 0,
    showRecent = true,
    who = FROZEN_ARRAY,
    hideScore = false,
    onSwitchBlock = FROZEN_FN
  }) => {
    const { list, onScroll } = useHorizontalLazy(who)
    return (
      <InView style={showRecent ? styles.container : styles.hide}>
        <SectionTitle
          style={_.container.wind}
          right={!showRecent && <IconHidden name={TITLE_RECENT} value='showRecent' />}
          icon={!showRecent && 'md-navigate-next'}
          splitStyles
          onPress={() => onSwitchBlock('showRecent')}
        >
          {TITLE_RECENT}
        </SectionTitle>
        {showRecent && (
          <>
            <ScrollView
              style={_.mt.md}
              contentContainerStyle={_.container.wind}
              horizontal
              {...SCROLL_VIEW_RESET_PROPS}
              scrollEventThrottle={16}
              onScroll={onScroll}
            >
              {list.map(item => (
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
                    <Flex>
                      <Text size={13} bold>
                        {item.name}
                      </Text>
                      {!hideScore && <Stars style={_.ml.xs} value={item.star} simple />}
                    </Flex>
                    <Text style={_.mt.xs} size={10} type='sub'>
                      {item.status}
                    </Text>
                  </View>
                </Flex>
              ))}
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
