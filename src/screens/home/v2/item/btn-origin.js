/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:49:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-14 07:04:21
 */
import React from 'react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function BtnOrigin({ subjectId, isTop }, { $ }) {
  if (!$.homeOrigin) return null

  const origins = $.onlineOrigins(subjectId).map(item =>
    typeof item === 'object' ? item.name : item
  )
  const data = [isTop ? '取消置顶' : '置顶', ...origins]
  return (
    <Popover
      style={styles.touch}
      data={data}
      onSelect={label => {
        if (label === '置顶') {
          $.itemToggleTop(subjectId, true)
        } else if (label === '取消置顶') {
          $.itemToggleTop(subjectId, false)
        } else {
          $.onlinePlaySelected(label, subjectId)
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

const styles = _.create({
  touch: {
    marginRight: _.device(10, _.sm),
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    width: 34,
    height: 34
  },
  icon: {
    marginBottom: -1
  }
})
