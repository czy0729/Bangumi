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
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function VIB() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleSelect = useCallback(
    (title: string) => $.onVIBPress(title, navigation),
    [$, navigation]
  )

  return useObserver(() => {
    const styles = memoStyles()

    const renderLine = (label: string, value?: number, total?: number) => {
      if (!value) return null
      return (
        <Text type='sub' size={10} lineHeight={11}>
          {label}: {value.toFixed(1)} {total ? `(${total})` : ''}
        </Text>
      )
    }

    return (
      <View style={styles.vib}>
        <Popover data={$.vibData} onSelect={handleSelect}>
          <Flex style={styles.container} direction='column' align='end'>
            {$.vib.avg ? (
              renderLine('VIB', Number($.vib.avg), $.vib.total)
            ) : (
              <Text type='sub' size={10} lineHeight={11}>
                VIB: N/A
              </Text>
            )}
            {renderLine('AniDB', Number($.vib.anidb), $.vib.anidbTotal)}
            {renderLine('MAL', Number($.vib.mal), $.vib.malTotal)}
          </Flex>
        </Popover>
      </View>
    )
  })
}

export default VIB
