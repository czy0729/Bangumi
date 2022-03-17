/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:22:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-09-28 13:51:48
 */
import React from 'react'
import { Flex, Text } from '@components'
import { IconExpand } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function Count({ epStatus, subjectId, subject }, { $ }) {
  const { expand } = $.$Item(subjectId)
  // 不能直接用API给的epStatus, 会把SP都加上
  // 需要根据userProgress和eps排除掉SP算

  const epsMap = {}
  $.eps(subjectId).forEach(item => {
    if (item.type !== 1) epsMap[item.id] = true // 排除SP
  })

  let count = 0
  Object.keys($.userProgress(subjectId)).forEach(item => {
    if (epsMap[item]) count += 1
  })

  // 主要是有些特殊情况, 会有意料不到的问题, 特殊处理
  // epStatus=1的时候, 优先使用count
  const countFixed = epStatus == 1 ? count || epStatus : epStatus || count
  return (
    <Flex style={styles.count}>
      <Text type='primary' size={20}>
        {countFixed}
        <Text type='sub' lineHeight={20}>
          {' '}
          / {subject.eps_count || '?'}
        </Text>
      </Text>
      <IconExpand style={styles.icon} expand={expand} />
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
