/*
 * @Author: czy0729
 * @Date: 2022-11-11 19:17:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-01 11:13:26
 */
import React from 'react'
import { Katakana, Text } from '@components'
import { ob } from '@utils/decorators'
import { Name } from '../../../base'
import P3 from '../p3'

function P({ image, p1Text, p1Url, p2Text, p3Text, p3Url, p4Text, userId, avatarSrc, onNavigate }) {
  // 是否渲染第一行
  const hasPosition = !!(p1Text || p2Text || p3Text?.length || p4Text)
  if (!hasPosition) return null

  return (
    <Katakana.Provider lineHeight={16}>
      {!!p1Text && (
        <Name
          userId={userId}
          type='title'
          lineHeight={16}
          bold
          onPress={() => {
            onNavigate(p1Url, {
              _name: p1Text,
              _image: avatarSrc
            })
          }}
        >
          {p1Text}
        </Name>
      )}
      <Text type='sub' lineHeight={16}>
        {!!p1Text && ' '}
        {p2Text}{' '}
      </Text>
      <P3 image={image} p3Text={p3Text} p3Url={p3Url} onNavigate={onNavigate} />
      {!!p4Text && (
        <Katakana type='sub' lineHeight={16}>
          {' '}
          {p4Text}
        </Katakana>
      )}
    </Katakana.Provider>
  )
}

export default ob(P)
