/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:22:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-21 16:18:42
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
    <Flex style={styles.count}>
      <Text type='primary' size={20}>
        {epStatus || _epStatus}
        <Text type='sub' lineHeight={20}>
          {' '}
          / {subject.eps_count || '?'}{' '}
        </Text>
      </Text>
      <Iconfont
        style={styles.icon}
        name={expand ? 'md-keyboard-arrow-up' : 'md-navigate-next'}
        size={22}
        color={_.colorIcon}
      />
    </Flex>
  )
}

export default obc(Count)

const styles = _.create({
  count: {
    marginTop: -2
  },
  icon: {
    marginTop: 5
  }
})
