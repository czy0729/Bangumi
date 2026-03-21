/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:58:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 02:56:00
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Heatmap } from '@components'
import { IconTabsHeader } from '@_'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'
import { styles } from './styles'

function IconSearch() {
  const navigation = useNavigation()

  const handlePress = useCallback(() => {
    navigation.push('RakuenSearch')

    t('超展开.跳转', {
      to: 'RakuenSearch'
    })
  }, [navigation])

  return (
    <IconTabsHeader style={styles.search} name='md-search' onPress={handlePress}>
      <Heatmap right={36} bottom={9} id='超展开.跳转' to='RakuenSearch' alias='搜索' />
    </IconTabsHeader>
  )
}

export default observer(IconSearch)
