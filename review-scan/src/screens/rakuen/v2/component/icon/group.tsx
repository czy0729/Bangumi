/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:56:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 03:20:18
 */
import React from 'react'
import { Heatmap } from '@components'
import { IconTabsHeader } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { styles } from './styles'

function IconGroup() {
  const navigation = useNavigation()
  return (
    <IconTabsHeader
      style={stl(styles.group, _.isPad && styles.groupPad)}
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

export default ob(IconGroup)
