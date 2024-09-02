/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 18:11:49
 */
import React from 'react'
import { Flex, Image, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, COVER_WIDTH } from './ds'
import { styles } from './styles'

function HeaderTitle({ $ }: Ctx) {
  return (
    <Flex style={styles.container}>
      {!!$.groupThumb && <Image size={COVER_WIDTH} src={$.groupThumb} radius={_.radiusSm} />}
      <Flex.Item style={_.ml.sm}>
        <Text size={13} numberOfLines={1}>
          {$.groupInfo.title}
        </Text>
      </Flex.Item>
    </Flex>
  )
}

export default ob(HeaderTitle, COMPONENT)
