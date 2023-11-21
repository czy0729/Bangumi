/*
 * @Author: czy0729
 * @Date: 2023-09-23 05:03:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-21 16:33:26
 */
import React from 'react'
import { Header as CompHeader, Flex } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title='本地管理'
      hm={['smb', 'Smb']}
      headerRight={() => (
        <Flex>
          <IconTouchable
            style={_.mr.sm}
            name='md-folder-open'
            size={20}
            color={_.colorDesc}
            onPress={$.onOpenCurrentPage}
          />
          <IconTouchable
            style={_.mr.sm}
            name='md-folder'
            size={20}
            color={_.colorDesc}
            onPress={$.onCloseCurrentPage}
          />
          <CompHeader.Popover
            name='md-menu'
            data={['新增服务', '清空所有数据']}
            onSelect={key => {
              switch (key) {
                case '新增服务':
                  $.onShow()
                  break

                case '清空所有数据':
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
