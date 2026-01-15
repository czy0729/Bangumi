/*
 * @Author: czy0729
 * @Date: 2022-06-08 11:00:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-25 22:16:16
 */
import React from 'react'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import TinygrailItemTemple from '@tinygrail/_/item-temple'
import { getCharaItemSortText } from '@tinygrail/_/utils'
import ItemEdit from '../item-edit'
import { COMPONENT, EVENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({ id, index, item }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (id === 'temple') {
      return (
        <TinygrailItemTemple
          style={_.isPad && index % 3 === 0 && styles.marginLeft}
          {...item}
          state={$.amount(item.id)}
          extra={getCharaItemSortText(
            {
              ...item,
              sort: $.state.templeSort
            },
            true
          )}
          showStatus
          onPress={() => {
            navigation.push('TinygrailSacrifice', {
              monoId: `character/${item.id}`
            })

            t('我的持仓.跳转', {
              to: 'TinygrailSacrifice',
              monoId: item.id
            })
          }}
          onItem={() => {
            $.onShowModal(item.id)
          }}
        />
      )
    }

    return (
      <ItemEdit
        item={item}
        type={id}
        users={id === 'ico' ? 'ico' : undefined} // 这里 api 有 bug
        event={EVENT}
      />
    )
  })
}

export default Item
