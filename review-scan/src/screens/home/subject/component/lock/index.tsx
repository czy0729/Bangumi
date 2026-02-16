/*
 * @Author: czy0729
 * @Date: 2019-12-28 15:16:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:04:26
 */
import React from 'react'
import { Component, Flex, Mesume, Text } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { memoStyles } from './styles'

function Lock() {
  const { $ } = useStore<Ctx>()
  if (!$.lock) return null

  const styles = memoStyles()
  return (
    <Component id='screen-subject-lock'>
      <Flex style={styles.container}>
        <Mesume index={2} size={72} />
        <Flex.Item>
          <Text type='main' size={16} bold>
            条目已锁定
          </Text>
          <Text style={_.mt.sm} type='sub'>
            不符合收录原则，条目及相关收藏、讨论、关联等内容将会随时被移除
          </Text>
        </Flex.Item>
      </Flex>
    </Component>
  )
}

export default ob(Lock)
