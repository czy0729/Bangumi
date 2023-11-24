/*
 * @Author: czy0729
 * @Date: 2023-09-23 05:03:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 11:06:53
 */
import React from 'react'
import { Header as CompHeader, Flex } from '@components'
import { info } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import './index.scss'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title='本地管理'
      mode='float'
      fixed
      hm={['smb', 'Smb']}
      headerRight={() => (
        <Flex>
          <CompHeader.Popover
            name='md-menu'
            data={['新增服务', '通用配置', '清空所有数据']}
            onSelect={key => {
              switch (key) {
                case '新增服务':
                  $.onShow()
                  break

                case '通用配置':
                  $.onShowConfig()
                  break

                case '清空所有数据':
                  info('待开发')
                  break

                default:
                  break
              }
            }}
          />
        </Flex>
      )}
    />
  )
}

export default obc(Header)
