/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 17:06:03
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

const imgWidth = 28

function HeaderTitle({ $, navigation }: Ctx) {
  return (
    <Flex style={styles.container}>
      {!!$.avatar && (
        <Avatar
          navigation={navigation}
          size={imgWidth}
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

export default ob(HeaderTitle)
