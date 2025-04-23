/*
 * @Author: czy0729
 * @Date: 2025-04-23 09:34:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-23 10:21:47
 */
import React, { useCallback, useState } from 'react'
import { useObserver } from 'mobx-react'
import { Avatar, Flex, Heatmap, Text, UserStatus } from '@components'
import { Name, UserAge } from '@_'
import { _, systemStore, useStore } from '@stores'
import { r } from '@utils/dev'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Author() {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()
  const [lines, setLines] = useState(1)
  const handleSetLines = useCallback(() => setLines(2), [])

  return useObserver(() => (
    <Flex style={styles.author}>
      {!!$.avatar && (
        <UserStatus userId={$.userId}>
          <Avatar
            navigation={navigation}
            size={40}
            src={$.avatar}
            userId={$.userId}
            name={$.userName}
            priority='high'
            event={$.event}
          />
        </UserStatus>
      )}
      {!!$.userId && (
        <Flex.Item style={_.ml.sm}>
          <Flex>
            <Name userId={$.userId} numberOfLines={1} bold>
              {$.userName}
            </Name>
            {systemStore.setting.userAge && <UserAge value={$.userId} avatar={$.avatar} />}
          </Flex>
          <Text style={_.mt.xs} type='sub' size={12} numberOfLines={lines} onPress={handleSetLines}>
            @{$.userId}
            {!!$.userSign && ` (${$.userSign.slice(1, $.userSign.length - 1)})`}
          </Text>
        </Flex.Item>
      )}
      <Heatmap id='帖子.跳转' to='Zone' alias='空间' />
    </Flex>
  ))
}

export default Author
