/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-10 03:04:09
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Cover } from '@_'
import { _ } from '@stores'
import { getMonoCoverSmall, stl } from '@utils'
import { memo } from '@utils/decorators'
import { DEFAULT_PROPS } from './ds'
import { styles } from './styles'

export default memo(({ tinygrail, cover, nameTop, nameBottom }) => {
  // global.rerender('Mono.HeaderTitle.Main')

  return (
    <Flex style={stl(styles.container, tinygrail && styles.containerTinygrail)}>
      {!!cover && (
        <Cover size={styles.container.height} src={getMonoCoverSmall(cover)} radius />
      )}
      <Flex.Item style={_.ml.sm}>
        <Text size={13} numberOfLines={1}>
          {nameTop}
        </Text>
        {!!nameBottom && (
          <Text type='sub' size={10} numberOfLines={1}>
            {nameBottom}
          </Text>
        )}
      </Flex.Item>
    </Flex>
  )
}, DEFAULT_PROPS)
