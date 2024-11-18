/*
 * @Author: czy0729
 * @Date: 2023-09-23 05:03:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:33:10
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderComp
      title='本地管理'
      hm={['smb', 'Smb']}
      headerRight={() => (
        <HeaderComp.Popover
          name='md-menu'
          data={['新增服务', '下载配置', '上传配置', '通用配置']}
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

              case '通用配置':
                $.onShowConfig()
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

export default ob(Header)
