/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:22:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 15:32:16
 */
import React from 'react'
import { Flex, Iconfont, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function Count({ epStatus, subjectId, subject }, { $ }) {
  const { expand } = $.$Item(subjectId)
  let _epStatus = epStatus
  if (!_epStatus) {
    const userProgress = $.userProgress(subjectId)
    _epStatus = Object.keys(userProgress).length ? 1 : 0
  }
  return (
    <Flex>
      <Text type='primary' size={20}>
        {epStatus || _epStatus}
        <Text type='sub' size={13} lineHeight={20}>
          {' '}
          / {subject.eps_count || '?'}{' '}
        </Text>
        <Iconfont
          name={expand ? 'down' : 'up'}
          size={13}
          lineHeight={(20 + _.fontSizeAdjust) * _.lineHeightRatio}
          color={_.colorIcon}
        />
      </Text>
    </Flex>
  )
}

export default obc(Count)
