/*
 * @Author: czy0729
 * @Date: 2023-09-23 05:03:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-26 17:45:05
 */
import React from 'react'
import { Header as CompHeader, Flex } from '@components'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import './index.scss'

function Header(props, { $, navigation }: Ctx) {
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
            data={['新增服务', '通用配置', '扩展刮削词', '用户令牌', '教程']}
            onSelect={key => {
              switch (key) {
                case '新增服务':
                  $.onShow()
                  break

                case '通用配置':
                  $.onShowConfig()
                  break

                case '扩展刮削词':
                  $.onShowExtendsJA()
                  break

                case '用户令牌':
                  navigation.push('LoginToken')
                  break

                case '教程':
                  open(
                    'https://www.yuque.com/chenzhenyu-k0epm/znygb4/nogol0viqd1flhqt?singleDoc'
                  )
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
