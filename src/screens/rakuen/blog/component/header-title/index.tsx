/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06 21:43:22
 */
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { Avatar } from '@_'
import { _, useStore } from '@stores'
import { COMPONENT, IMG_WIDTH } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function HeaderTitle() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return (
    <Flex style={styles.container}>
      {!!$.avatar && (
        <Avatar
          navigation={navigation}
          size={IMG_WIDTH}
          src={$.avatar}
          userId={$.userId}
          name={$.userName}
          radius={_.radiusXs}
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

export default observer(HeaderTitle)
