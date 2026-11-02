/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:16:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 20:34:29
 *
 * 按源头分类渲染条目列表
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { useStore } from '@stores'
import { TYPES_DS } from '../../ds'
import Create from '../create'
import Item from '../item'
import Title from '../title'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function List({ onScrollIntoViewIfNeeded }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { active } = $.state

  return (
    <>
      {TYPES_DS.map(item => (
        <View key={item.type} style={styles.section}>
          <Title type={item.type} name={item.name} />
          <Flex style={styles.list} align='start' wrap='wrap'>
            {$.data[item.type]
              .filter(i => active || i.active)
              .map(i => (
                <Item
                  key={i.id || i.uuid}
                  {...i}
                  type={item.type}
                  onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
                />
              ))}
            <Create
              type={item.type}
              name={item.name}
              onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
            />
          </Flex>
        </View>
      ))}
    </>
  )
}

export default observer(List)
