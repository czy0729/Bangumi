/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:23:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-15 20:46:01
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { Name, UserAge, VerticalAlign } from '@_'
import { _, systemStore } from '@stores'
import { correctAgo } from '@utils'
import { useObserver } from '@utils/hooks'
import { BASE_TEXT_PROPS } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function Detail({ time, groupCn, userName, userId, avatar }: Props) {
  const [name, setName] = useState(userName)

  const handleHit = useCallback(
    (removeSpecText: string) => {
      setName(removeSpecText)
    },
    [setName]
  )

  return useObserver(() => (
    <Flex style={_.mt.xs}>
      <View style={systemStore.setting.userAge && styles.name}>
        <VerticalAlign {...BASE_TEXT_PROPS} text={userName} onHit={handleHit}>
          <Text {...BASE_TEXT_PROPS}>
            {time ? correctAgo(time) : ''}
            {groupCn && time ? ' / ' : ''}
          </Text>
          <Text {...BASE_TEXT_PROPS}>{groupCn}</Text>
          {!!name && (
            <>
              <Text {...BASE_TEXT_PROPS}> / </Text>
              <Name {...BASE_TEXT_PROPS} userId={userId} showFriend disabled>
                {name}
              </Name>
            </>
          )}
        </VerticalAlign>
      </View>
      {systemStore.setting.userAge && (
        <Flex.Item>
          <UserAge style={styles.userAge} value={userId} avatar={avatar} />
        </Flex.Item>
      )}
    </Flex>
  ))
}

export default Detail
