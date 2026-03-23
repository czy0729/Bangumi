/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:16:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-23 19:46:22
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Divider, Flex } from '@components'
import { useStore } from '@stores'
import { TYPES_DS } from '../../ds'
import Create from '../create'
import Item from '../item'
import Title from '../title'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'

function List({ onScrollIntoViewIfNeeded }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <>
      {TYPES_DS.map((item, index) => {
        const data = $.data[item.type]

        return (
          <View key={item.type}>
            {!!index && <Divider />}
            <Title type={item.type} name={item.name} />
            <Flex style={styles.list} align='start' wrap='wrap'>
              {data
                .filter(i => ($.state.active ? true : i.active))
                .map(i => (
                  <Item
                    key={`${i.id}|${i.uuid}`}
                    {...i}
                    type={item.type}
                    onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
                  />
                ))}
            </Flex>
            <Create
              type={item.type}
              name={item.name}
              onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
            />
          </View>
        )
      })}
    </>
  )
}

export default observer(List)
