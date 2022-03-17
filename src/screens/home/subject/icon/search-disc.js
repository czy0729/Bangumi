/*
 * @Author: czy0729
 * @Date: 2021-08-31 18:58:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-07 12:56:16
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconSearchDisc(props, { $ }) {
  return (
    <Popover
      style={styles.touch}
      menuStyle={styles.menuStyle}
      data={$.onlineDiscOrigins}
      onSelect={$.onlineDiscSelected}
    >
      <Flex style={styles.btn} justify='center'>
        <Iconfont name='md-search' size={20} />
        <Text style={_.ml.xs} size={13} type='sub'>
          源头
        </Text>
      </Flex>
    </Popover>
  )
}

export default obc(IconSearchDisc)

const styles = _.create({
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  menuStyle: {
    width: _.device(240, 320)
  },
  btn: {
    paddingVertical: 2,
    paddingHorizontal: 4
  }
})
