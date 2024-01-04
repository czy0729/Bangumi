/*
 * @Author: czy0729
 * @Date: 2022-09-10 08:07:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 16:27:03
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, HorizontalList, Text } from '@components'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { INITIAL_RENDER_NUMS_XS } from '../../ds'
import CoverToday from '../cover-today'
import { COMPONENT_MAIN, DEFAULTP_ROPS } from './ds'

const Today = memo(
  ({ styles, todayBangumi }) => {
    return (
      <HorizontalList
        contentContainerStyle={styles.contentContainerStyle}
        data={todayBangumi}
        initialRenderNums={INITIAL_RENDER_NUMS_XS}
        renderItem={(item, index) => (
          <>
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
            <CoverToday key={item.id} data={item} />
          </>
        )}
      />
    )
  },
  DEFAULTP_ROPS,
  COMPONENT_MAIN
)

export default Today
