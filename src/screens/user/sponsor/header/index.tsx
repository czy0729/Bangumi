/*
 * @Author: czy0729
 * @Date: 2022-09-07 15:16:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:36:05
 */
import React from 'react'
import { Flex, Header as HeaderComp } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../types'
import { timeDiff } from '../utils'
import { COMPONENT } from './ds'

function Header() {
  const { $, navigation } = useStore<Ctx>()
  const { list } = $.state
  return (
    <HeaderComp
      title='赞助者'
      hm={['sponsor', 'Sponsor']}
      headerRight={() => (
        <Flex>
          <IconTouchable
            style={_.mr.sm}
            name={list ? 'md-insert-chart-outlined' : 'md-sort'}
            color={_.colorTitle}
            onPress={$.onToggle}
          />
          <IconTouchable
            name='md-info-outline'
            color={_.colorTitle}
            onPress={() => {
              navigation.push('Information', {
                title: '赞助者',
                message: [
                  `生存情况：已存活 ${timeDiff()}`,
                  '图表根据赞助额按比例划分',
                  '点击方格隐藏 1 格，若你为赞助者长按可进入空间',
                  '除此外还有 30 多个赞助者没有留名',
                  '@senken 提供的 100 刀 iOS 开发账号',
                  '@magma 提供的服务器和 OSS 服务',
                  '数据不定期更新，感谢各位的支持！'
                ]
              })

              t('赞助者.提示')
            }}
          />
        </Flex>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
