/*
 * @Author: czy0729
 * @Date: 2023-07-03 07:18:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-03 07:22:36
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { fixedAll } from '@components/avatar/utils'
import { Cover } from '@_'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function Item({ item }, { navigation }: Ctx) {
  const styles = memoStyles()
  return (
    <Touchable
      style={styles.item}
      animate
      onPress={() => {
        t('条目.跳转', {
          to: 'CatalogDetail',
          from: '条目',
          catalogId: item.id
        })

        navigation.push('CatalogDetail', {
          catalogId: item.id
        })
      }}
    >
      <Flex>
        <Cover src={fixedAll(item.avatar, _.r(40))} size={_.r(40)} radius shadow type='目录' />
        <Flex.Item style={_.ml.md}>
          <Text style={styles.text} size={11} lineHeight={12} bold numberOfLines={1}>
            {HTMLDecode(item.title)}
          </Text>
          <Text size={10} lineHeight={11} type='sub' numberOfLines={1}>
            {HTMLDecode(item.name)}
          </Text>
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

export default obc(Item)
