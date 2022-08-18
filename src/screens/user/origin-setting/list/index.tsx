/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:16:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 07:23:15
 */
import React from 'react'
import { View } from 'react-native'
import { Divider } from '@components'
import { obc } from '@utils/decorators'
import Title from '../title'
import Item from '../item'
import Create from '../create'
import { TYPES_DS } from '../ds'
import { Ctx } from '../types'
import { styles } from './styles'

function List(props, { $ }: Ctx) {
  const { active } = $.state
  return (
    <>
      {TYPES_DS.map((item, index) => (
        <View key={item.type}>
          {!!index && <Divider />}
          <Title type={item.type} name={item.name} />
          <View style={styles.list}>
            {($.data[item.type] as any)
              .filter(i => (active ? true : i.active))
              .map(i => (
                <Item key={`${i.id}|${i.uuid}`} {...i} type={item.type} />
              ))}
            <Create type={item.type} name={item.name} />
          </View>
        </View>
      ))}
    </>
  )
}

export default obc(List)
