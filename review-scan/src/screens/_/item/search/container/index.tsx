/*
 * @Author: czy0729
 * @Date: 2025-01-25 22:28:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-25 22:38:02
 */
import React from 'react'
import { Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { appNavigate, stl } from '@utils'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function Container({
  navigation,
  style,
  id,
  name,
  nameCn,
  cover,
  width,
  collection,
  typeCn,
  event,
  children
}) {
  const styles = memoStyles()
  return (
    <Touchable
      style={stl(styles.container, style)}
      animate
      onPress={() => {
        appNavigate(
          String(id),
          navigation,
          {
            _jp: name,
            _cn: nameCn,
            _image: getCoverSrc(cover, width),
            _type: typeCn,
            _collection: collection
          },
          event
        )
      }}
    >
      {children}
    </Touchable>
  )
}

export default ob(Container)
