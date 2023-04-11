/*
 * @Author: czy0729
 * @Date: 2020-01-23 17:40:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 12:58:43
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Flex } from '../../flex'
import { Text } from '../../text'

function Error() {
  return (
    <Flex style={_.container.inner} justify='center' direction='column'>
      <Text style={_.mt.sm} type='sub' align='center' size={13}>
        网页结构解释错误
      </Text>
    </Flex>
  )
}

export default observer(Error)
