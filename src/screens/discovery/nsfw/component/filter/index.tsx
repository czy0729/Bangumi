/*
 * @Author: czy0729
 * @Date: 2025-11-06 01:15:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-03 05:49:50
 *
 * 找 NSFW 筛选
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Text, Touchable } from '@components'
import { Filter as FilterComp } from '@_'
import { useStore } from '@stores'
import { useNavigation } from '@utils/hooks'
import { TEXT_UPDATE_NSFW } from '@constants'
import { filterDS } from '../../ds'
import { COMPONENT, TEXT_INFORMATION } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Filter() {
  const navigation = useNavigation(COMPONENT)
  const { $ } = useStore<Ctx>(COMPONENT)
  const styles = memoStyles()

  const { expand } = $.state

  return (
    <View>
      <FilterComp
        filterDS={filterDS}
        name='NSFW'
        type='NSFW'
        lastUpdate={TEXT_UPDATE_NSFW.slice(0, 7)}
        information={TEXT_INFORMATION}
      />
      {expand && (
        <Touchable style={styles.legacy} onPress={() => navigation.push('Hentai')}>
          <Text type='icon' size={11} bold>
            前往旧版
          </Text>
        </Touchable>
      )}
    </View>
  )
}

export default observer(Filter)
