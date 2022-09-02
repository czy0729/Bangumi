/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 04:26:16
 */
import React from 'react'
import { Flex, Text, Image } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

const COVER_WIDTH = 28

function HeaderTitle({ $ }: Ctx) {
  const { title } = $.groupInfo
  return (
    <Flex style={styles.container}>
      {!!$.groupThumb && <Image size={COVER_WIDTH} src={$.groupThumb} radius />}
      <Flex.Item style={_.ml.sm}>
        <Text size={13} numberOfLines={1}>
          {title}
        </Text>
      </Flex.Item>
    </Flex>
  )
}

export default ob(HeaderTitle)
