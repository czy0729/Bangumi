/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:56:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 03:20:18
 */
import React, { useCallback } from 'react'
import { Heatmap } from '@components'
import { IconTabsHeader } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { t } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { styles } from './styles'

function IconGroup() {
  const navigation = useNavigation()
  const handlePress = useCallback(() => {
    navigation.push('Mine')

    t('超展开.跳转', {
      to: 'Mine'
    })
  }, [navigation])

  return useObserver(() => (
    <IconTabsHeader
      style={stl(styles.group, _.isPad && styles.groupPad)}
      name='md-filter-none'
      size={18}
      onPress={handlePress}
    >
      <Heatmap right={-40} id='超展开.跳转' to='Mine' alias='我的小组' />
    </IconTabsHeader>
  ))
}

export default IconGroup
