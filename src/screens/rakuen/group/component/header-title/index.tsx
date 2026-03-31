/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-01 06:58:50
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Image, Text } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT, COVER_WIDTH } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function HeaderTitle() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <Flex style={styles.container}>
      {!!$.groupThumb && <Image size={COVER_WIDTH} src={$.groupThumb} radius={_.radiusXs} />}
      <Flex.Item style={_.ml.sm}>
        <Text size={13} numberOfLines={1}>
          {$.groupInfo.title}
        </Text>
      </Flex.Item>
    </Flex>
  )
}

export default observer(HeaderTitle)
