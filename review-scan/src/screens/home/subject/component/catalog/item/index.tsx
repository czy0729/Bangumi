/*
 * @Author: czy0729
 * @Date: 2023-07-03 07:18:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 01:36:03
 */
import React from 'react'
import { Cover, Flex, Text, Touchable } from '@components'
import { fixedAll } from '@components/avatar/utils'
import { _, useStore } from '@stores'
import { HTMLDecode, x18 } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function Item({ item }) {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const title = HTMLDecode(item.title)
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
        <Cover
          src={fixedAll(item.avatar, _.r(40))}
          size={_.r(40)}
          radius
          type='目录'
          cdn={!x18($.subjectId)}
        />
        <Flex.Item style={_.ml.md}>
          <Text style={styles.text} size={9} lineHeight={12} bold numberOfLines={2}>
            {title}
            {title.length <= 6 ? '\n' : ' '}
            <Text size={9} lineHeight={12} type='sub'>
              {HTMLDecode(item.name)}
            </Text>
          </Text>
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

export default ob(Item)
