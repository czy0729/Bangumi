/*
 * @Author: czy0729
 * @Date: 2021-01-25 11:50:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-03 22:21:33
 */
import React from 'react'
import { _ } from '@stores'
import { Flex, Touchable, Heatmap } from '@components'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'

function Btns({ style, children, ...other }) {
  const styles = memoStyles()
  return (
    <Flex style={[styles.btns, style]} justify='center' {...other}>
      {children}
    </Flex>
  )
}

Btns.Touchable = function Item({ heatmap, onSelect, children }) {
  const styles = memoStyles()
  return (
    <Touchable onPress={onSelect}>
      <Flex style={styles.item} justify='center'>
        {children}
      </Flex>
      {!!heatmap && <Heatmap id={heatmap} />}
    </Touchable>
  )
}

export default obc(Btns)

const memoStyles = _.memoStyles(_ => ({
  btns: {
    paddingTop: IOS ? 6 : 0,
    paddingBottom: 10
  },
  item: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md,
    marginHorizontal: _.xs,
    backgroundColor: _.tSelect(
      _.colorTinygrailBorder,
      'rgba(238, 238, 238, 0.8)'
    ),
    borderRadius: 16
  }
}))
