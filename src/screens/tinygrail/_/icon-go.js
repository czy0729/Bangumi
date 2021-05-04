/*
 * @Author: czy0729
 * @Date: 2020-02-14 03:17:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-05-04 16:49:35
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text, Iconfont } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'

const data = ['资产重组', '买入', '卖出', 'K线']

function IconGo({ $ }) {
  const { go } = $.state
  return (
    <Popover style={styles.touch} data={data} onSelect={$.onSelectGo}>
      <Flex>
        <Iconfont name='md-read-more' size={24} color={_.colorTinygrailPlain} />
        <Text style={_.ml.xs} type='tinygrailPlain' size={13} bold>
          {go}
        </Text>
      </Flex>
    </Popover>
  )
}

export default observer(IconGo)

const styles = _.create({
  touch: {
    padding: _.sm,
    marginRight: -_.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
