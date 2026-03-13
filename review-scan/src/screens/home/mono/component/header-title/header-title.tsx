/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:14:57
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Cover } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

const HeaderTitle = memo(
  ({ tinygrail = false, cover = '', nameTop = '', nameBottom = '' }) => {
    return (
      <Flex style={stl(styles.container, tinygrail && styles.containerTinygrail)}>
        {!!cover && <Cover size={styles.container.height} src={cover} radius />}
        <Flex.Item style={_.ml.sm}>
          <Text size={13} numberOfLines={1}>
            {nameTop}
          </Text>
          {!!nameBottom && (
            <Text type='sub' size={10} lineHeight={12} numberOfLines={1}>
              {nameBottom}
            </Text>
          )}
        </Flex.Item>
      </Flex>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default HeaderTitle
