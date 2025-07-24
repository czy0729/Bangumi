/*
 * @Author: czy0729
 * @Date: 2025-07-24 02:26:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-24 23:15:40
 */
import React from 'react'
import { HeaderV2Popover } from '@components'
import { _, userStore } from '@stores'
import { useNavigation, useObserver } from '@utils/hooks'
import { createDateComparatorDesc, objectToArray } from './utils'

function RelatedPM({ userId }) {
  const navigation = useNavigation()

  return useObserver(() => {
    const list = objectToArray(userStore.pmMap(userId)).sort(createDateComparatorDesc())
    if (list?.length <= 1) return null

    const data = list.map(item => `${item.name} (${item.time.slice(2, 20)})`)
    return (
      <HeaderV2Popover
        style={_.mr.xxs}
        data={data}
        name='md-read-more'
        color={_.colorTitle}
        onSelect={title => {
          if (navigation) {
            const index = data.findIndex(item => item === title)
            if (index !== -1) {
              const item = list[index]
              navigation.push('PM', {
                id: item.id,
                _userId: userId
              })
            }
          }
        }}
      />
    )
  })
}

export default RelatedPM
