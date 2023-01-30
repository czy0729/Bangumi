/*
 * @Author: czy0729
 * @Date: 2019-08-24 01:29:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-30 09:50:29
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, Heatmap, UserStatus } from '@components'
import { SectionTitle, Avatar, Stars, PreventTouchPlaceholder } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { useHorizontalLazy } from '@utils/hooks'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import IconHidden from '../icon/hidden'
import { styles } from './styles'
import { DEFAULT_PROPS } from './ds'

export default memo(
  ({ navigation, subjectId, showRecent, who, hideScore, onSwitchBlock }) => {
    global.rerender('Subject.Recent.Main')

    const { list, onScroll } = useHorizontalLazy(who)
    return (
      <View style={showRecent ? styles.container : styles.hide}>
        <SectionTitle
          style={_.container.wind}
          right={!showRecent && <IconHidden name='动态' value='showRecent' />}
          icon={!showRecent && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showRecent')}
        >
          动态
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
      </View>
    )
  },
  DEFAULT_PROPS
)
