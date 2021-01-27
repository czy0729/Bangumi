/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 21:02:45
 */
import React from 'react'
import { FadeIn, Flex, Text, Image } from '@components'
import Stores, { _ } from '@stores'
import { urlStringify } from '@utils'
import { ob } from '@utils/decorators'

const routeName = 'Group'
const imgWidth = 28

function HeaderTitle({ navigation }) {
  const { state = {} } = navigation
  const { params = {} } = state
  const { groupId } = params
  const screenKey = `${routeName}?${urlStringify({
    groupId
  })}`
  const $ = Stores.get(screenKey)
  if (!$) {
    return null
  }

  const { showHeaderTitle } = $.state
  const { title } = $.groupInfo
  return (
    <FadeIn show={showHeaderTitle}>
      <Flex style={styles.container}>
        {!!$.groupThumb && <Image size={imgWidth} src={$.groupThumb} radius />}
        <Flex.Item style={_.ml.sm}>
          <Text size={13} numberOfLines={1}>
            {title}
          </Text>
        </Flex.Item>
      </Flex>
    </FadeIn>
  )
}

export default ob(HeaderTitle)

const styles = _.create({
  container: {
    marginLeft: -_.md,
    marginRight: _.md
  }
})
