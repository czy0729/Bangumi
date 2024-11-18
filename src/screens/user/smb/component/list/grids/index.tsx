/*
 * @Author: czy0729
 * @Date: 2023-11-25 10:45:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:29:14
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import ItemGrid from '../../item-grid'
import { styles } from './styles'

function Grids() {
  const { $ } = useStore<Ctx>()
  const { layoutGridNums } = $.state.configs
  return (
    <Flex style={styles.grids} justify='between' wrap='wrap'>
      {$.pageList.map((item, index) => (
        <ItemGrid key={String(item?.name || index)} {...item} />
      ))}
      {Array(layoutGridNums - 1)
        .fill('')
        .map((_item, index) => (
          <View
            key={index}
            style={{
              width: (_.window.contentWidth - _.md * (layoutGridNums - 1)) / layoutGridNums
            }}
          />
        ))}
    </Flex>
  )
}

export default ob(Grids)
