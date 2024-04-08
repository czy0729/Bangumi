/*
 * @Author: czy0729
 * @Date: 2023-02-13 15:54:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-08 10:17:29
 */
import React from 'react'
import { Flex, Heatmap } from '@components'
import { ItemBangumiList } from '@_'
import { CollectionsItem } from '@stores/user/types'
import { cnjp } from '@utils'
import { obc } from '@utils/decorators'
import { CollectionStatusCn } from '@types'
import { Ctx } from '../../../types'
import { EVENT } from './ds'

function Item(
  {
    item,
    title
  }: {
    item: CollectionsItem
    title: CollectionStatusCn
  },
  { $, navigation }: Ctx
) {
  if (!$.state.expand[title]) return null

  return (
    <Flex wrap='wrap' align='start'>
      {item.list
        .filter((item, index) => index < 15)
        .map(item => (
          <ItemBangumiList
            key={item.id}
            navigation={navigation}
            subjectId={item.id}
            image={item.images?.small}
            name={cnjp(item.name_cn, item.name)}
            event={EVENT}
          />
        ))}
      {title.includes('在看') && <Heatmap id='空间.跳转' to='Subject' alias='条目' />}
    </Flex>
  )
}

export default obc(Item)
