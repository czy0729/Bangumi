/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-09 23:47:35
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Avatar } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, IMG_WIDTH } from './ds'
import { styles } from './styles'

function HeaderTitle() {
  const { $, navigation } = useStore<Ctx>()
  return (
    <Flex style={styles.container}>
      {!!$.avatar && (
        <Avatar
          navigation={navigation}
          size={IMG_WIDTH}
          src={$.avatar}
          userId={$.userId}
          name={$.userName}
        />
      )}
      <Flex.Item style={_.ml.sm}>
        <Text size={13} numberOfLines={1}>
          {$.title}
        </Text>
        {!!$.userName && (
          <Text type='sub' size={10} bold numberOfLines={1}>
            {$.userName}
          </Text>
        )}
      </Flex.Item>
    </Flex>
  )
}

export default ob(HeaderTitle, COMPONENT)
