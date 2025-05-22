/*
 * @Author: czy0729
 * @Date: 2020-04-28 12:02:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 05:15:00
 */
import React from 'react'
import { Component, Cover, Expand, Flex, Image, Text, Touchable } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { _ } from '@stores'
import { cnjp, x18 } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useExpandLazy, useObserver } from '@utils/hooks'
import { EVENT, IMG_HEIGHT_SM, IMG_WIDTH_SM } from '@constants'
import { InView, Tag } from '../../base'
import { AVATAR_SIZE, COMPONENT, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemVoiceProps } from './types'

export { ItemVoiceProps }

export const ItemVoice = ({
  style,
  navigation,
  event = EVENT,
  index,
  id,
  name,
  nameCn,
  cover,
  subject = [],
  children
}: ItemVoiceProps) => {
  r(COMPONENT)

  const { list, onExpand } = useExpandLazy(subject, 4)

  return useObserver(() => {
    const styles = memoStyles()
    const cn = cnjp(nameCn, name)
    const jp = cnjp(name, nameCn)
    const y = ITEM_HEIGHT * (index + 1)
    const content = (
      <>
        <Flex style={styles.wrap} align='start'>
          <Flex.Item flex={1.8}>
            <Touchable
              animate
              onPress={() => {
                t(event.id, {
                  ...event.data,
                  to: 'Mono',
                  monoId: id
                })

                navigation.push('Mono', {
                  monoId: `character/${id}`,
                  _name: nameCn,
                  _jp: name,
                  _image: cover
                })
              }}
            >
              <Flex align='start'>
                <InView style={styles.inViewAvatar} y={y}>
                  <Image size={AVATAR_SIZE} src={cover} radius={_.radiusSm} />
                </InView>
                <Flex.Item style={_.ml.sm}>
                  <Text size={12} bold>
                    {cn}
                  </Text>
                  {!!jp && jp !== cn && (
                    <Text style={_.mt.xs} size={11} type='sub' lineHeight={12} bold>
                      {jp}
                    </Text>
                  )}
                </Flex.Item>
              </Flex>
            </Touchable>
          </Flex.Item>
          <Flex.Item style={_.ml.sm} flex={3.2}>
            {list.map((item, idx) => {
              const cn = cnjp(item.nameCn, item.name)
              const jp = cnjp(item.name, item.nameCn)
              return (
                <Touchable
                  key={item.id}
                  style={idx !== 0 && _.mt.md}
                  animate
                  onPress={() => {
                    t(event.id, {
                      ...event.data,
                      to: 'Subject',
                      subjectId: item.id
                    })

                    navigation.push('Subject', {
                      subjectId: item.id,
                      _jp: jp,
                      _cn: cn,
                      _image: getCoverSrc(item.cover, IMG_WIDTH_SM)
                    })
                  }}
                >
                  <Flex align='start'>
                    <Flex.Item style={_.mr.md}>
                      <Text size={12} bold>
                        {cn}
                      </Text>
                      <Text style={_.mt.xs} size={11} type='sub' lineHeight={12} bold>
                        {jp}
                      </Text>
                      <Flex style={_.mt.sm}>
                        <Tag value={item.staff} />
                      </Flex>
                    </Flex.Item>
                    <InView style={styles.inViewCover} y={y}>
                      <Cover
                        size={IMG_WIDTH_SM}
                        height={IMG_HEIGHT_SM}
                        src={item.cover}
                        radius
                        cdn={!x18(item.id)}
                      />
                    </InView>
                  </Flex>
                </Touchable>
              )
            })}
          </Flex.Item>
        </Flex>
        {children}
      </>
    )

    if (list.length >= 4) {
      return (
        <Component id='item-voice' data-key={id} data-type='expand'>
          <Expand style={style} ratio={1.8} onExpand={onExpand}>
            {content}
          </Expand>
        </Component>
      )
    }

    return (
      <Component id='item-voice' data-key={id} style={style}>
        {content}
      </Component>
    )
  })
}

export default ItemVoice
