/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-27 15:41:10
 */
import React from 'react'
import { Flex, Image, Text } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT, COVER_WIDTH } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function HeaderTitle() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <Flex style={styles.container}>
      {!!$.groupThumb && <Image size={COVER_WIDTH} src={$.groupThumb} radius={_.radiusSm} />}
      <Flex.Item style={_.ml.sm}>
        <Text size={13} numberOfLines={1}>
          {$.groupInfo.title}
        </Text>
      </Flex.Item>
    </Flex>
  ))
}

export default HeaderTitle
