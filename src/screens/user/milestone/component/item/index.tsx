/*
 * @Author: czy0729
 * @Date: 2024-10-11 05:10:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-11 23:51:06
 */
import React from 'react'
import { Flex, getCoverSrc, Image, Text, Touchable } from '@components'
import { obc } from '@utils/decorators'
import { IMG_SUBJECT_ONLY } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Item({ item, index }: Props, { navigation }: Ctx) {
  const styles = memoStyles()
  return (
    <Flex style={styles.container} justify='center'>
      <Touchable
        onPress={() => {
          navigation.push('Subject', {
            subjectId: item.id,
            _image: getCoverSrc(item.cover, styles.cover.width),
            _cn: item.nameCn,
            _jp: item.name
          })
        }}
      >
        <Flex style={styles.item} direction='column'>
          <Flex style={styles.cover} justify='center'>
            <Image
              style={styles.image}
              src={item.cover === '/img/no_icon_subject.png' ? IMG_SUBJECT_ONLY : item.cover}
              autoSize={styles.cover.width}
              skeleton={false}
              placeholder={false}
              border='rgba(255, 255, 255, 0.16)'
              priority={index < 10 ? 'high' : index < 24 ? 'normal' : 'low'}
            />
          </Flex>
          <Text style={styles.title} size={10} bold numberOfLines={2} align='center' shadow>
            {item.nameCn}
          </Text>
          <Text style={styles.sub} type='sub' size={9} bold align='center' shadow>
            #{index + 1}
          </Text>
        </Flex>
      </Touchable>
    </Flex>
  )
}

export default obc(Item, COMPONENT)
