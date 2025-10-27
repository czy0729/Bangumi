/*
 * @Author: czy0729
 * @Date: 2023-09-23 05:03:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 21:05:25
 */
import React from 'react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { DATA, HM } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2
      title='本地管理'
      hm={HM}
      headerRight={() => (
        <HeaderV2Popover
          name='md-menu'
          data={DATA}
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
