/*
 * @Author: czy0729
 * @Date: 2022-06-08 11:00:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 15:52:20
 */
import React from 'react'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import ItemTemple from '@tinygrail/_/item-temple'
import ItemEdit from '../item-edit'
import { Ctx } from '../types'
import { styles } from './styles'

const EVENT = {
  id: '我的持仓.跳转'
} as const

function Item({ id, index, item }, { navigation }: Ctx) {
  if (id === 'temple') {
    return (
      <ItemTemple
        style={_.isPad && index % 3 === 0 && styles.marginLeft}
        {...item}
        onPress={() => {
          t('我的持仓.跳转', {
            to: 'TinygrailSacrifice',
            monoId: item.id
          })

          navigation.push('TinygrailSacrifice', {
            monoId: `character/${item.id}`
          })
        }}
      />
    )
  }

  return (
    <ItemEdit
      item={item}
      type={id}
      users={id === 'ico' ? 'ico' : undefined} // 这里api有bug
      event={EVENT}
    />
  )
}

export default obc(Item)
