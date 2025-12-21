/*
 * @Author: czy0729
 * @Date: 2024-03-05 18:17:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-19 04:48:35
 */
import React from 'react'
import { Flex, Text } from '@components'
import { HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import Level from '../../level'
import Rank from '../../rank'

function Title({ style, id, name, rank, cLevel, type }) {
  const navigation = useNavigation()
  const text = HTMLDecode(name)
  let size = 11
  if (text.length > 4) {
    if (rank) size -= 1
    if (cLevel) size -= 1
  }

  const isFromTemplesPage = type === 'view'

  return (
    <Flex style={style}>
      <Rank value={rank} />
      <Level value={cLevel} />
      <Flex.Item>
        <Text
          type='tinygrailPlain'
          size={size}
          bold
          numberOfLines={1}
          align={isFromTemplesPage ? 'center' : 'left'}
          onPress={
            isFromTemplesPage
              ? () => {
                  navigation.push('TinygrailSacrifice', {
                    monoId: String(id)
                  })
                }
              : undefined
          }
        >
          {text}
        </Text>
      </Flex.Item>
    </Flex>
  )
}

export default ob(Title)
