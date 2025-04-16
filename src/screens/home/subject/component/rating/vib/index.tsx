/*
 * @Author: czy0729
 * @Date: 2024-02-15 00:58:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:05:43
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { Popover } from '@_'
import { useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function VIB() {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()

    const handleSelect = useCallback((title: string) => {
      $.onVIBPress(title, navigation)
    }, [])

    return (
      <View style={styles.vib}>
        <Popover data={$.vibData} onSelect={handleSelect}>
          <Flex style={styles.container} direction='column' align='end'>
            {$.vib.avg ? (
              <Text type='sub' size={10} lineHeight={11}>
                VIB: {Number($.vib.avg).toFixed(1)} ({$.vib.total})
              </Text>
            ) : (
              <Text type='sub' size={10} lineHeight={11}>
                VIB: N/A
              </Text>
            )}
            {!!$.vib.anidb && (
              <Text type='sub' size={10} lineHeight={11}>
                AniDB: {Number($.vib.anidb).toFixed(1)} ({$.vib.anidbTotal})
              </Text>
            )}
            {!!$.vib.mal && (
              <Text type='sub' size={10} lineHeight={11}>
                MAL: {Number($.vib.mal).toFixed(1)} ({$.vib.malTotal})
              </Text>
            )}
          </Flex>
        </Popover>
      </View>
    )
  })
}

export default VIB
