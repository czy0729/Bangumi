/*
 * @Author: czy0729
 * @Date: 2024-07-06 12:46:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-06 12:49:18
 */
import React from 'react'
import { Text, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'

function IconVersion(_props, { $ }: Ctx) {
  if (!$.subjectComments.version) return null

  const { filterVersion } = $.state
  return (
    <Touchable style={styles.touch} onPress={$.toggleVersion}>
      <Text type={filterVersion ? 'main' : 'icon'} size={13} bold>
        {filterVersion ? '当前' : '全部'}版本
      </Text>
    </Touchable>
  )
}

export default obc(IconVersion)

const styles = _.create({
  touch: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 4
  },
  reverse: {
    transform: [
      {
        rotateX: '180deg'
      }
    ]
  }
})
