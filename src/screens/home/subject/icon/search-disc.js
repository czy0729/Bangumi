/*
 * @Author: czy0729
 * @Date: 2021-08-31 18:58:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-31 19:16:37
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { Popover } from '@screens/_'
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
  menuStyle: {
    width: _.device(240, 320)
  },
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    paddingVertical: 2,
    paddingHorizontal: 4
  },
  icon: {
    padding: _.sm,
    marginRight: -_.sm,
    marginLeft: _.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
