/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:49:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-28 04:05:54
 */
import React from 'react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { obc } from '@utils/decorators'
import { styles } from './styles'

function BtnOrigin({ subjectId, isTop }, { $ }) {
  if ($.homeOrigin === -1) return null

  let origins = []
  if ($.homeOrigin === 0) {
    origins = $.onlineOrigins(subjectId).map(item =>
      typeof item === 'object' ? item.name : item
    )
  }

  const data = [isTop ? '取消置顶' : '置顶', ...origins, '全部展开', '全部收起']
  return (
    <Popover
      style={styles.touch}
      data={data}
      onSelect={(label: string) => {
        switch (label) {
          case '置顶':
            $.itemToggleTop(subjectId, true)
            break

          case '取消置顶':
            $.itemToggleTop(subjectId, false)
            break

          case '全部展开':
            $.expandAll()
            break

          case '全部收起':
            $.closeAll()
            break

          default:
            $.onlinePlaySelected(label, subjectId)
            break
        }
      }}
    >
      <Flex style={styles.btn} justify='center'>
        <Iconfont
          style={styles.icon}
          name={origins.length ? 'md-airplay' : 'md-menu'}
          size={origins.length ? 17 : 21}
        />
      </Flex>
      <Heatmap right={55} bottom={-7} id='首页.搜索源' />
    </Popover>
  )
}

export default obc(BtnOrigin)
