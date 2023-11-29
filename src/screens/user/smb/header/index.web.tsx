/*
 * @Author: czy0729
 * @Date: 2023-09-23 05:03:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-29 16:50:47
 */
import React from 'react'
import { Header as CompHeader, Flex, Touchable, Activity } from '@components'
import { open, info } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'
import './index.scss'

function Header(props, { $, navigation }: Ctx) {
  const { fetchingCollections } = $.state
  return (
    <CompHeader
      title='本地管理'
      mode='float'
      fixed
      hm={['smb', 'Smb']}
      headerRight={() => (
        <Flex>
          {fetchingCollections && (
            <Touchable
              style={styles.activity}
              onPress={() => info('批量请求收藏状态中')}
            >
              <Activity />
            </Touchable>
          )}
          <CompHeader.Popover
            name='md-menu'
            data={['新增服务', '通用配置', '扩展刮削词', '用户令牌', '功能说明']}
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

                case '功能说明':
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
      onBackPress={() => {
        navigation.push('Discovery')
      }}
    />
  )
}

export default obc(Header)
