/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 21:00:38
 */
import React from 'react'
import { FadeIn, Flex, Text } from '@components'
import { Avatar } from '@screens/_'
import Stores, { _ } from '@stores'
import { urlStringify } from '@utils'
import { ob } from '@utils/decorators'

const routeName = 'Blog'
const imgWidth = 24

function HeaderTitle({ navigation }) {
  const { state = {} } = navigation
  const { params = {} } = state
  const { blogId } = params
  const screenKey = `${routeName}?${urlStringify({
    blogId
  })}`
  const $ = Stores.get(screenKey)
  if (!$) {
    return null
  }

  const { showHeaderTitle } = $.state
  return (
    <FadeIn show={showHeaderTitle}>
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
          {!!($.userName || $.group) && (
            <Text type='sub' size={10} bold numberOfLines={1}>
              {$.userName || $.group}
            </Text>
          )}
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
