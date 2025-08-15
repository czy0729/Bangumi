/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:23:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-26 18:25:18
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { Name, UserAge, VerticalAlign } from '@_'
import { _, systemStore } from '@stores'
import { correctAgo } from '@utils'
import { useObserver } from '@utils/hooks'
import { styles } from './styles'

function Detail({ time, groupCn, userName, userId, avatar }) {
  const [name, setName] = useState(userName)
  const handleHit = useCallback(
    (removeSpecText: string) => {
      setName(removeSpecText)
    },
    [setName]
  )
  const textProps = {
    type: 'sub',
    size: 11,
    lineHeight: 13,
    numberOfLines: 1
  } as const

  return useObserver(() => (
    <Flex style={_.mt.xs}>
      <View style={systemStore.setting.userAge && styles.name}>
        <VerticalAlign {...textProps} text={userName} onHit={handleHit}>
          <Text {...textProps}>
            {time ? correctAgo(time) : ''}
            {groupCn && time ? ' / ' : ''}
          </Text>
          <Text {...textProps}>{groupCn}</Text>
          {!!name && (
            <>
              <Text {...textProps}> / </Text>
              <Name {...textProps} userId={userId} showFriend disabled>
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
