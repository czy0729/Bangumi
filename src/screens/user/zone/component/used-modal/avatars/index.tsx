/*
 * @Author: czy0729
 * @Date: 2026-08-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-08 08:13:54
 */
import React, { useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Image, ScrollView, Text, Touchable } from '@components'
import { _ } from '@stores'
import { LIMIT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function Avatars({ avatar }: Props) {
  const [limit, setLimit] = useState(LIMIT)

  const list = avatar.slice(0, limit)
  const count = avatar.length - limit

  const styles = memoStyles()

  return (
    <ScrollView contentContainerStyle={styles.avatars} horizontal showMask={false}>
      {list.map((item, index) => (
        <Flex key={item.uri || index} style={_.mr.sm} direction='column'>
          <Image src={item.uri} size={64} radius={32} placeholder={false} />
          {!!item.time && (
            <Text style={_.mt.xs} type='sub' size={11} lineHeight={12} bold>
              {item.time}
            </Text>
          )}
        </Flex>
      ))}
      {count > 0 && (
        <Flex style={styles.more} direction='column'>
          <Touchable style={styles.moreTouch} onPress={() => setLimit(limit + LIMIT)}>
            <View style={styles.moreCircle}>
              <Text type='sub' bold>
                +{count}
              </Text>
            </View>
          </Touchable>
          <Text style={_.mt.xs} type='sub' size={11} lineHeight={12} bold>
            更多
          </Text>
        </Flex>
      )}
    </ScrollView>
  )
}

export default observer(Avatars)
