/*
 * @Author: czy0729
 * @Date: 2023-02-13 15:54:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-10 18:33:59
 */
import React from 'react'
import { Flex, Heatmap } from '@components'
import { ItemBangumiList } from '@_'
import { useStore } from '@stores'
import { cnjp } from '@utils'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../../types'
import { EVENT } from './ds'
import { Props } from './types'

function Item({ item, title }: Props) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    if (!$.state.expand[title]) return null

    return (
      <Flex wrap='wrap' align='start'>
        {item.list
          .filter((_item, index) => index < 20)
          .map(item => (
            <ItemBangumiList
              key={item.id}
              subjectId={item.id}
              image={item.images?.medium}
              name={cnjp(item.name_cn, item.name)}
              event={EVENT}
            />
          ))}
        {title.includes('在看') && <Heatmap id='空间.跳转' to='Subject' alias='条目' />}
      </Flex>
    )
  })
}

export default Item
