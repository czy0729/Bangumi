/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:22:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-24 07:48:42
 */
import React from 'react'
import { Flex, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconSearch(props, { $ }) {
  if ($.isLimit) return null

  return (
    <Popover
      style={styles.touch}
      menuStyle={styles.menuStyle}
      data={$.onlineComicOrigins.map(item =>
        typeof item === 'object' ? item.name : item
      )}
      onSelect={$.onlineComicSelected}
    >
      <Flex style={styles.btn} justify='center'>
        <Iconfont name='md-airplay' size={18} />
      </Flex>
    </Popover>
  )
}

export default obc(IconSearch)

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
