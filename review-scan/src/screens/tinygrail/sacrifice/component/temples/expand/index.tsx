/*
 * @Author: czy0729
 * @Date: 2024-03-08 16:09:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:20:18
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Expand() {
  const { $ } = useStore<Ctx>()
  const { showTemples, expand, unique } = $.state
  return (
    <Flex style={_.mt.md} justify='center'>
      <Touchable style={styles.touch} onPress={$.toggleTemples}>
        <Text type='tinygrailText'>[{showTemples ? '隐藏' : '显示'}板块]</Text>
      </Touchable>
      {showTemples && $.charaTemple.list.length > 6 && (
        <Touchable style={styles.text} onPress={$.toggleExpand}>
          <Text type='tinygrailText'>[{expand ? '收起' : '展开'}圣殿]</Text>
        </Touchable>
      )}
      {showTemples && (
        <Touchable style={styles.text} onPress={$.toggleUnique}>
          <Text type='tinygrailText'>[唯一封面: {unique ? '开' : '关'}]</Text>
        </Touchable>
      )}
    </Flex>
  )
}

export default ob(Expand)
