/*
 * @Author: czy0729
 * @Date: 2025-01-26 13:38:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-26 13:39:50
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Popover } from '../../../base'
import { styles } from './styles'

function Menu({ data, avatar, userId, userName, comment, relatedId, onSelect }) {
  return (
    <Popover
      style={styles.touch}
      data={data}
      onSelect={title => {
        onSelect(
          title,
          {
            avatar,
            userId,
            userName
          },
          comment,
          relatedId
        )
      }}
    >
      <Flex style={styles.icon} justify='center'>
        <Iconfont style={_.ml.md} name='md-more-vert' size={18} />
      </Flex>
    </Popover>
  )
}

export default ob(Menu)
