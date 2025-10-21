/*
 * @Author: czy0729
 * @Date: 2022-09-10 08:07:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-20 15:44:59
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Flex, HorizontalList, Text } from '@components'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { INITIAL_RENDER_NUMS_XS } from '../../ds'
import CoverToday from '../cover/today'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

import type { CalendarItemWithWeekday } from '../../types'

const Today = memo(
  ({ styles, todayBangumi = [] }) => {
    const handleEndReached = useCallback(() => {
      t('发现.滑动到边', {
        from: 'Today'
      })
    }, [])

    const renderItem = useCallback(
      (item: CalendarItemWithWeekday, index: number) => (
        <React.Fragment key={item.id}>
          {index === 2 && (
            <Flex style={styles.split} direction='column' justify='center'>
              <View style={styles.line} />
              <Text size={10} type='sub'>
                now
              </Text>
              <View
                style={[
                  styles.line,
                  {
                    marginTop: _.xs + 2
                  }
                ]}
              />
            </Flex>
          )}
          <CoverToday data={item} />
        </React.Fragment>
      ),
      [styles]
    )

    return (
      <HorizontalList
        contentContainerStyle={styles.contentContainerStyle}
        data={todayBangumi}
        initialRenderNums={INITIAL_RENDER_NUMS_XS}
        renderItem={renderItem}
        onEndReachedOnce={handleEndReached}
      />
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Today
