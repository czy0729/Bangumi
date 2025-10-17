/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:58:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 03:23:31
 */
import React, { useCallback } from 'react'
import { Heatmap } from '@components'
import { IconTabsHeader } from '@_'
import { t } from '@utils/fetch'
import { useNavigation, useObserver } from '@utils/hooks'
import { styles } from './styles'

function IconSearch() {
  const navigation = useNavigation()
  const handlePress = useCallback(() => {
    navigation.push('RakuenSearch')

    t('超展开.跳转', {
      to: 'RakuenSearch'
    })
  }, [navigation])

  return useObserver(() => (
    <IconTabsHeader style={styles.search} name='md-search' onPress={handlePress}>
      <Heatmap right={36} bottom={9} id='超展开.跳转' to='RakuenSearch' alias='搜索' />
    </IconTabsHeader>
  ))
}

export default IconSearch
