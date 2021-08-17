/*
 * @Author: czy0729
 * @Date: 2020-06-12 10:43:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-17 16:05:55
 */
import React from 'react'
import { FadeIn, Flex, Text } from '@components'
import { Avatar } from '@screens/_'
import Stores, { _ } from '@stores'
import { urlStringify } from '@utils'
import { memo, ob } from '@utils/decorators'

const routeName = 'Topic'
const imgWidth = 28
const defaultProps = {
  navigation: {},
  showHeaderTitle: false,
  avatar: '',
  userId: '',
  userName: '',
  title: '',
  group: ''
}

const HeaderTitle = memo(
  ({ navigation, showHeaderTitle, avatar, userId, userName, title, group }) => {
    rerender('Topic.HeaderTitle.Main')

    return (
      <FadeIn show={showHeaderTitle}>
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
      </FadeIn>
    )
  },
  defaultProps
)

export default ob(({ navigation }) => {
  rerender('Topic.HeaderTitle')

  const { state = {} } = navigation
  const { params = {} } = state
  const { topicId } = params
  const screenKey = `${routeName}?${urlStringify({
    topicId
  })}`
  const $ = Stores.get(screenKey)
  if (!$) return null

  const { showHeaderTitle } = $.state
  return (
    <HeaderTitle
      navigation={navigation}
      showHeaderTitle={showHeaderTitle}
      avatar={$.avatar}
      userId={$.userId}
      userName={$.userName}
      title={$.title}
      group={$.group}
    />
  )
})

const styles = _.create({
  container: {
    marginLeft: _.device(-_.md, -_.sm),
    marginRight: _.md
  }
})
