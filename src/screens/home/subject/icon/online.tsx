/*
 * @Author: czy0729
 * @Date: 2021-01-17 00:56:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-02 05:54:42
 */
import React from 'react'
import { Flex, Heatmap, Iconfont } from '@components'
import { Popover } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

const ORIGINS_MANAGE = '源头管理'

function IconOnline(props, { $, navigation }) {
  if ($.isLimit) return null

  return (
    <Popover
      style={styles.touch}
      data={[...$.onlineOrigins, ORIGINS_MANAGE].map(item =>
        typeof item === 'object' ? item.name : item
      )}
      onSelect={(title: string) => {
        if (title === ORIGINS_MANAGE) {
          navigation.push('OriginSetting')
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
  }
})
