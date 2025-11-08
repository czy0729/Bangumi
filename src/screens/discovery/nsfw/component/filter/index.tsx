/*
 * @Author: czy0729
 * @Date: 2025-11-06 01:15:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-08 21:45:54
 */
import React from 'react'
import { Text, Touchable } from '@components'
import { Filter as FilterComp } from '@_'
import { _ } from '@stores'
import { useNavigation, useObserver } from '@utils/hooks'
import { TEXT_UPDATE_NSFW } from '@constants'
import { filterDS } from '../../ds'
import { COMPONENT, TEXT_INFORMATION } from './ds'

function Filter() {
  const navigation = useNavigation(COMPONENT)

  return useObserver(() => (
    <FilterComp
      filterDS={filterDS}
      name='NSFW'
      type='NSFW'
      lastUpdate={TEXT_UPDATE_NSFW.slice(0, 7)}
      information={TEXT_INFORMATION}
      renderRight={
        <>
          <Touchable style={_.mr.xs} onPress={() => navigation.push('Hentai')}>
            <Text size={11} type='sub' bold>
              前往旧版 ·
            </Text>
          </Touchable>
        </>
      }
    />
  ))
}

export default Filter
