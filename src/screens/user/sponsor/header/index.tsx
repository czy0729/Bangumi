/*
 * @Author: czy0729
 * @Date: 2022-09-07 15:16:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-07 22:25:20
 */
import React from 'react'
import { Header as CompHeader, Flex } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { alert } from '@utils'
import { obc } from '@utils/decorators'
import { timeDiff } from '../utils'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  const { list } = $.state
  return (
    <CompHeader
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
            onPress={() =>
              alert(
                `应用已存活 ${timeDiff()}
              \n图表根据赞助额按比例划分
              \n点击方格隐藏 1 格，若你为赞助者长按可进入空间
              \n除此外还有 30 多个赞助者没有留名
              \n@senken 提供的 100 刀 iOS 开发账号
              \n@magma 提供的服务器和 OSS 服务
              \n数据不定期更新，感谢各位的支持！`,
                '生存情况'
              )
            }
          />
        </Flex>
      )}
    />
  )
}

export default obc(Header)
