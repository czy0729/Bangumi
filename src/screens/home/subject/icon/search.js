/*
 * @Author: czy0729
 * @Date: 2021-01-16 17:22:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-07 12:55:44
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function IconSearch(props, { $ }) {
  if ($.isLimit || $.hd) return null

  return (
    <Popover
      style={styles.touch}
      menuStyle={styles.menuStyle}
      data={$.onlineComicOrigins}
      onSelect={$.onlineComicSelected}
    >
      <Flex style={styles.btn} justify='center'>
        <Iconfont name='md-search' size={18} />
        <Text style={_.ml.xs} size={13} type='sub'>
          源头
        </Text>
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
