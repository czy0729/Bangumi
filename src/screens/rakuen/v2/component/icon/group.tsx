/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:56:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 19:39:34
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTabsHeader } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'

function IconGroup(_props, { navigation }: Ctx) {
  return (
    <IconTabsHeader
      style={stl(styles.icon, _.isPad && styles.iconPad)}
      name='md-filter-none'
      size={18}
      onPress={() => {
        t('超展开.跳转', {
          to: 'Mine'
        })

        navigation.push('Mine')
      }}
    >
      <Heatmap right={-40} id='超展开.跳转' to='Mine' alias='我的小组' />
    </IconTabsHeader>
  )
}

export default obc(IconGroup)

const styles = _.create({
  icon: {
    marginBottom: 0,
    marginLeft: _.xs,
    borderRadius: 40,
    overflow: 'hidden'
  },
  iconPad: {
    height: 52
  }
})
