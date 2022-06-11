/*
 * @Author: czy0729
 * @Date: 2021-08-31 18:58:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-24 08:04:56
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconSearchDisc(props, { $ }) {
  return (
    <Popover
      style={styles.touch}
      menuStyle={styles.menuStyle}
      data={$.onlineDiscOrigins.map(item =>
        typeof item === 'object' ? item.name : item
      )}
      onSelect={$.onlineDiscSelected}
    >
      <Flex style={styles.btn} justify='center'>
        <Iconfont name='md-airplay' size={18} />
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
