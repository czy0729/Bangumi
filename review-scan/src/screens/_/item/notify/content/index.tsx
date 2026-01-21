/*
 * @Author: czy0729
 * @Date: 2024-01-19 17:23:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-19 17:36:00
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _, timelineStore } from '@stores'
import { ob } from '@utils/decorators'
import { Name } from '../../../base'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Content({ userId, userName, title, message, message2, href }) {
  const styles = memoStyles()

  let sayTitle: string
  const notifyId = String(href).split('/status/')?.[1]
  if (notifyId) {
    const say = timelineStore.say(notifyId)
    if (say.list.length) sayTitle = say.list[0]?.text
  }

  return (
    <>
      <Name userId={userId} showFriend size={13} type='title' bold>
        {userName}
      </Name>
      <Text style={_.mt.xxs} size={13} lineHeight={15}>
        {message}
        <Text size={13} lineHeight={15} type='main' bold>
          {title}
        </Text>
        {message2}
      </Text>
      {!!sayTitle && (
        <Flex>
          <Text style={styles.info} type='sub' size={12} numberOfLines={1} bold>
            描述：{sayTitle}
          </Text>
        </Flex>
      )}
    </>
  )
}

export default ob(Content, COMPONENT)
