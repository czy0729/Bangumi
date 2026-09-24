/*
 * @Author: czy0729
 * @Date: 2024-03-25 23:32:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-24 11:27:52
 */
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { FONT_BASE } from '../../ds'
import { ITEMS } from './ds'
import { styles } from './styles'

function Section3() {
  return (
    <>
      <Text style={_.mv.md} size={16} bold align='center'>
        支持者的额外权益
      </Text>
      {ITEMS.map(item => (
        <Flex key={item.label} style={_.mt.sm} align='start'>
          <Text style={styles.label} type='sub' bold {...FONT_BASE}>
            {item.label}
          </Text>
          <Flex.Item>
            <Text {...FONT_BASE}>{item.desc}</Text>
          </Flex.Item>
        </Flex>
      ))}
      <Text style={_.mt.sm} type='sub' {...FONT_BASE}>
        还有很多不写了，罗列完整也并不会促使去尝试使用，该用到的时候自然会用到。其实绝大部分日常功能根本不会碰到这些限制。
      </Text>
    </>
  )
}

export default observer(Section3)
