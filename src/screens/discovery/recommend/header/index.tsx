/*
 * @Author: czy0729
 * @Date: 2023-05-24 11:13:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:52:31
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { WEB } from '@constants'
import { COMPONENT, DATA, HM } from './ds'

function Header() {
  const navigation = useNavigation()
  return (
    <HeaderV2
      title='AI 推荐'
      hm={HM}
      headerRight={() => {
        if (WEB) return null

        return (
          <HeaderV2Popover
            data={DATA}
            onSelect={title => {
              if (title === '说明') {
                navigation.push('Tips', {
                  key: 'hyrzz32whgurgg6t'
                })
              } else if (title === '帖子讨论') {
                navigation.push('Topic', {
                  topicId: 'group/382655'
                })
              }
            }}
          />
        )
      }}
    />
  )
}

export default ob(Header, COMPONENT)
