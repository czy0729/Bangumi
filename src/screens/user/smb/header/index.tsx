/*
 * @Author: czy0729
 * @Date: 2023-09-23 05:03:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 21:05:25
 */
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { useStore } from '@stores'
import { DATA, HM } from './ds'

import type { Ctx } from '../types'

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

export default observer(Header)
