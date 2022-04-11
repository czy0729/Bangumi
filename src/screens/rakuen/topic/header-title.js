/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-11 11:48:12
 */
import React from 'react'
import { Flex, Text } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { memo, ob } from '@utils/decorators'
import { IMG_DEFAULT_AVATAR } from '@constants'

const imgWidth = 28
const defaultProps = {
  navigation: {},
  avatar: '',
  userId: '',
  userName: '',
  title: '',
  group: ''
}

const HeaderTitle = memo(({ navigation, avatar, userId, userName, title, group }) => {
  rerender('Topic.HeaderTitle.Main')

  return (
    <Flex style={styles.container}>
      {!!avatar && (
        <Avatar
          navigation={navigation}
          size={imgWidth}
          src={avatar}
          userId={userId}
          name={userName}
        />
      )}
      <Flex.Item style={_.ml.sm}>
        <Text size={13} numberOfLines={1}>
          {title}
        </Text>
        {!!(userName || group) && (
          <Text type='sub' size={10} bold numberOfLines={1}>
            {userName || group}
          </Text>
        )}
      </Flex.Item>
    </Flex>
  )
}, defaultProps)

export default ob(({ $, navigation }) => {
  rerender('Topic.HeaderTitle')

  return (
    <HeaderTitle
      navigation={navigation}
      avatar={$.avatar === IMG_DEFAULT_AVATAR ? $.groupThumb : $.avatar}
      userId={$.userId}
      userName={$.userName}
      title={$.title}
      group={$.group}
    />
  )
})

const styles = _.create({
  container: {
    marginTop: _.ios(4, 0),
    marginLeft: -_.sm,
    marginRight: _.lg
  }
})
