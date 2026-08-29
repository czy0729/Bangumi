/*
 * @Author: czy0729
 * @Date: 2024-05-04 18:58:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 21:20:06
 */
import React from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { COMPONENT, HM, TEXT_GROUP } from './ds'

import type { Props } from './types'

function Header({ data, onSelect }: Props) {
  const navigation = useNavigation(COMPONENT)

  return (
    <HeaderV2
      title='VIB 数据月刊'
      hm={HM}
      headerRight={() => (
        <HeaderV2Popover
          name='md-menu'
          data={[TEXT_GROUP, ...data]}
          onSelect={title => {
            if (title === TEXT_GROUP) {
              navigation.push('Group', {
                groupId: 'qpz',
                _title: '评分与排名讨论会'
              })

              t('评分月刊.跳转', {
                to: 'Group'
              })
              return
            }

            const index = data.findIndex(item => item === title)
            onSelect(index)

            t('评分月刊.选择', {
              title: data[index]
            })
          }}
        />
      )}
    />
  )
}

export default observer(Header)
