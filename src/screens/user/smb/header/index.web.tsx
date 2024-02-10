/*
 * @Author: czy0729
 * @Date: 2023-09-23 05:03:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-08 17:17:42
 */
import React from 'react'
import { Activity, Flex, Header as CompHeader, Touchable } from '@components'
import { info, open } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HTML_SINGLE_DOC } from '@constants'
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
            <Touchable style={styles.activity} onPress={() => info('批量请求收藏状态中')}>
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

                  t('SMB.跳转', {
                    to: 'LoginToken',
                    from: 'Header'
                  })
                  break

                case '功能说明':
                  open(HTML_SINGLE_DOC('nogol0viqd1flhqt'))

                  t('SMB.功能说明')
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
