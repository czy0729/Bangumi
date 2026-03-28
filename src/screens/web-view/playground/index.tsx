/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-28 00:14:16
 */
import React from 'react'
import { View } from 'react-native'
import {
  BGM_MAP,
  BgmText,
  Component,
  Flex,
  HeaderPlaceholder,
  HeaderV2,
  Page,
  Text
} from '@components'
import { ScrollView } from '@_'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'

const Playground = () => {
  return useObserver(() => (
    <Component id='screen-playground'>
      <Page>
        <HeaderPlaceholder />
        <ScrollView contentContainerStyle={[_.container.bottom, _.container.wind]}>
          <Flex justify='between' wrap='wrap'>
            {Object.entries(BGM_MAP).map(([key]) => {
              const index = Number(key)
              const isNewEmoji = index >= 600
              const size = isNewEmoji ? 40 : 24
              return (
                <View key={key} style={[_.mr.sm, _.mb.xs]}>
                  <Text size={12} lineHeight={20} bold align='center'>
                    {key}
                  </Text>
                  <View
                    style={{
                      width: size,
                      height: size
                    }}
                  >
                    <BgmText index={index} size={size} />
                  </View>
                </View>
              )
            })}
            <View />
            <View />
            <View />
            <View />
            <View />
            <View />
          </Flex>
        </ScrollView>
      </Page>
      <HeaderV2 title='Playground' />
    </Component>
  ))
}

export default Playground
