/*
 * @Author: czy0729
 * @Date: 2024-02-15 00:58:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-15 01:48:40
 */
import React from 'react'
import { Flex, Text } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function VIB(props, { $ }: Ctx) {
  if (!$.vib.avg && !$.vib.anidb && !$.vib.mal) return null

  const styles = memoStyles()
  return (
    <Flex style={styles.vib} direction='column' align='end'>
      {$.vib.avg ? (
        <Text type='sub' size={9} lineHeight={10}>
          VIB: {Number($.vib.avg).toFixed(1)} ({$.vib.total})
        </Text>
      ) : (
        <Text type='sub' size={9} lineHeight={10}>
          VIB: N/A
        </Text>
      )}
      {!!$.vib.anidb && (
        <Text type='sub' size={9} lineHeight={10}>
          AniDB: {Number($.vib.anidb).toFixed(1)} ({$.vib.anidbTotal})
        </Text>
      )}
      {!!$.vib.mal && (
        <Text type='sub' size={9} lineHeight={10}>
          MAL: {Number($.vib.mal).toFixed(1)} ({$.vib.malTotal})
        </Text>
      )}
    </Flex>
  )
}

export default obc(VIB, COMPONENT)
