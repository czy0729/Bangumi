/*
 * @Author: czy0729
 * @Date: 2022-03-15 22:50:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 16:27:51
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { COMPONENT, DATA, HM } from './ds'

function Header() {
  const navigation = useNavigation()
  return (
    <HeaderV2
      title='帖子聚合'
      alias='本地帖子'
      hm={HM}
      headerRight={() => (
        <HeaderV2Popover
          data={DATA}
          onSelect={title => {
            if (title === '说明') {
              navigation.push('Information', {
                title: '帖子聚合',
                advance: true,
                message: [
                  '能快速查看回复和贴贴信息，图 1 为普通用户示例，图 2 为会员示例支持同时显示更多自己的回复'
                ],
                images: [
                  'https://cdn.nlark.com/yuque/0/2024/png/386799/1718099312472-ca3d7ec4-ebc9-4091-891c-52a10241c0b0.png',
                  'https://cdn.nlark.com/yuque/0/2024/png/386799/1718099326689-d6f24f78-4f63-4bef-af1a-d9d21839b52b.png'
                ]
              })
            }
          }}
        />
      )}
    />
  )
}

export default ob(Header, COMPONENT)
