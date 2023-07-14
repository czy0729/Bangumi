/*
 * @Author: czy0729
 * @Date: 2023-05-24 11:13:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-13 07:04:42
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { obc } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import { Ctx } from '../types'

function Header(props, { navigation }: Ctx) {
  return (
    <CompHeader
      title='AI 推荐'
      hm={['recommend', 'Recommend']}
      headerRight={() => {
        if (STORYBOOK) return null

        return (
          <CompHeader.Popover
            data={['说明', '帖子讨论']}
            onSelect={key => {
              if (key === '说明') {
                navigation.push('Tips', {
                  key: 'hyrzz32whgurgg6t'
                })
              } else if (key === '帖子讨论') {
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

export default obc(Header)
