/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-05 14:14:01
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

const imgWidth = 28

function HeaderTitle({ $, navigation }) {
  return (
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
  )
}

export default ob(HeaderTitle)

const styles = _.create({
  container: {
    marginTop: _.ios(4, 0),
    marginLeft: _.device(-_.md, -_.sm),
    marginRight: _.md
  }
})
