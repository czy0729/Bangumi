/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 22:05:14
 */
import React from 'react'
import { Flex, Text, Image } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

const imgWidth = 28

function HeaderTitle({ $ }) {
  const { title } = $.groupInfo
  return (
    <Flex style={styles.container}>
      {!!$.groupThumb && <Image size={imgWidth} src={$.groupThumb} radius />}
      <Flex.Item style={_.ml.sm}>
        <Text size={13} numberOfLines={1}>
          {title}
        </Text>
      </Flex.Item>
    </Flex>
  )
}

export default ob(HeaderTitle)

const styles = _.create({
  container: {
    marginRight: _.md
  }
})
