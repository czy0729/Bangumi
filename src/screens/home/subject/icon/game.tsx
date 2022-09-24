/*
 * @Author: czy0729
 * @Date: 2022-03-24 08:12:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-06 03:07:02
 */
import React from 'react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

const ORIGINS_MANAGE = '源头管理'

function IconGame(props, { $, navigation }: Ctx) {
  if (!$.titleLabel.includes('游戏')) return null

  return (
    <Popover
      style={styles.touch}
      data={[
        ...$.onlineGameOrigins.map(item =>
          typeof item === 'object' ? item.name : item
        ),
        ORIGINS_MANAGE
      ]}
      onSelect={(title: string) => {
        if (title === ORIGINS_MANAGE) {
          navigation.push('OriginSetting')
          return
        }

        $.onlineGameSelected(title)
      }}
    >
      <Flex style={styles.btn} justify='center'>
        <Iconfont name='md-airplay' size={18} />
      </Flex>
      <Heatmap right={55} bottom={-7} id='条目.搜索源' />
    </Popover>
  )
}

export default obc(IconGame)

const styles = _.create({
  touch: {
    marginRight: -_.sm,
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    width: 38,
    height: 38
  }
})
