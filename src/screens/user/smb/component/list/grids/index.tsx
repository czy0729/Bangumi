/*
 * @Author: czy0729
 * @Date: 2023-11-25 10:45:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 07:29:14
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { _, useStore } from '@stores'
import ItemGrid from '../../item-grid'
import { styles } from './styles'

import type { Ctx } from '../../../types'

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

export default observer(Grids)
