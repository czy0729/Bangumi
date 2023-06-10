/*
 * @Author: czy0729
 * @Date: 2022-04-20 13:52:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-11 01:02:52
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { Cover, Rate } from '@_'
import { HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { IMG_WIDTH_LG, IMG_HEIGHT_LG } from '@constants'
import { memoStyles } from './styles'
import { Ctx } from '../types'

function Item({ item }, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const image = `https://lain.bgm.tv/pic/cover/m/${item.image}.jpg`
  return (
    <Flex style={styles.item} align='start'>
      <Touchable
        animate
        onPress={() => {
          navigation.push('Subject', {
            subjectId: item.id,
            _cn: item.name,
            _image: image
          })
        }}
      >
        <Cover src={image} width={IMG_WIDTH_LG} height={IMG_HEIGHT_LG} radius />
      </Touchable>
      <Flex.Item>
        <Flex style={styles.body} direction='column' justify='between' align='start'>
          <Text style={styles.title} bold numberOfLines={2}>
            {item.name}
          </Text>
          <Flex align='start' wrap='wrap'>
            {item.relates.map((i, idx) => {
              const subject = $.state.relates[i]
              if (!subject || idx >= 5) return null

              // const image = `https://lain.bgm.tv/pic/cover/m/${subject.image}.jpg`
              return (
                <Flex
                  key={subject.id}
                  style={styles.sub}
                  direction='column'
                  align='start'
                >
                  <Text size={10} numberOfLines={1}>
                    ◆ {HTMLDecode(subject.name)}
                  </Text>
                </Flex>
              )
            })}
          </Flex>
        </Flex>
      </Flex.Item>
      <Rate value={Math.floor(item.rate)} />
    </Flex>
  )
}

export default obc(Item)
