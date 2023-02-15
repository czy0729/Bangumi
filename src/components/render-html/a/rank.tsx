/*
 * @Author: czy0729
 * @Date: 2023-02-15 05:54:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-15 06:09:02
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { Text } from '../../text'

function Rank({ value }) {
  if (systemStore.setting.hideScore || !value) return null

  const styles = memoStyles()
  return (
    <Text style={styles.rank} size={9} lineHeight={10} bold align='center'>
      {value}
    </Text>
  )
}

export default observer(Rank)

const memoStyles = _.memoStyles(() => ({
  rank: {
    minWidth: 24,
    paddingHorizontal: 6,
    marginRight: 8,
    color: _.__colorPlain__,
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.48)',
    backgroundColor: _.select('#ffc107', _._colorDarkModeLevel2),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
