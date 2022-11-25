/*
 * @Author: czy0729
 * @Date: 2021-01-17 00:56:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-25 10:32:15
 */
import React from 'react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import IconActions from './actions'

const ORIGINS_MANAGE = '源头管理'
const ACTIONS_MANAGE = '自定义指令'

function IconOnline(props, { $, navigation }: Ctx) {
  // if ($.isLimit) return null

  const data = [...$.onlineOrigins, ORIGINS_MANAGE]
  if (!$.actions.length) data.push(ACTIONS_MANAGE)

  return (
    <>
      <Popover
        style={styles.touch}
        data={data.map(item => (typeof item === 'object' ? item.name : item))}
        onSelect={(title: string) => {
          if (title === ORIGINS_MANAGE) {
            navigation.push('OriginSetting')
            return
          }

          if (title === ACTIONS_MANAGE) {
            navigation.push('Actions', {
              subjectId: $.subjectId,
              name: $.cn || $.jp
            })
            return
          }

          $.onlinePlaySelected(title)
        }}
      >
        <Flex style={styles.btn} justify='center'>
          <Iconfont name='md-airplay' size={18} />
        </Flex>
        <Heatmap right={55} bottom={-7} id='条目.搜索源' />
      </Popover>
      {!!$.actions.length && <IconActions style={styles.actions} />}
    </>
  )
}

export default obc(IconOnline)

const styles = _.create({
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    width: 38,
    height: 38
  },
  actions: {
    marginRight: 4,
    marginLeft: 2
  }
})
