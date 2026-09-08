/*
 * @Author: czy0729
 * @Date: 2023-09-23 05:03:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:33:21
 */
import { observer } from 'mobx-react'
import { Activity, Flex, HeaderV2, HeaderV2Popover, Touchable } from '@components'
import { useStore } from '@stores'
import { info, open } from '@utils'
import { t } from '@utils/fetch'
import { HTML_SINGLE_DOC } from '@constants'
import { styles } from './styles'
import './index.scss'

import type { Ctx } from '../types'

function Header() {
  const { $, navigation } = useStore<Ctx>()

  const { fetchingCollections } = $.state

  return (
    <HeaderV2
      title='本地管理'
      mode='float'
      hm={['smb', 'Smb']}
      headerRight={() => (
        <Flex>
          {fetchingCollections && (
            <Touchable style={styles.activity} onPress={() => info('批量请求收藏状态中')}>
              <Activity />
            </Touchable>
          )}
          <HeaderV2Popover
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

export default observer(Header)
