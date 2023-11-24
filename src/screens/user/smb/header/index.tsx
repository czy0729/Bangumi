/*
 * @Author: czy0729
 * @Date: 2023-09-23 05:03:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 10:40:59
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title='本地管理'
      hm={['smb', 'Smb']}
      headerRight={() => (
        <CompHeader.Popover
          name='md-menu'
          data={['新增服务', '下载配置', '上传配置']}
          onSelect={key => {
            switch (key) {
              case '新增服务':
                $.onShow()
                break

              case '下载配置':
                $.download()
                break

              case '上传配置':
                $.upload()
                break

              default:
                break
            }
          }}
        />
      )}
    />
  )
}

export default obc(Header)
