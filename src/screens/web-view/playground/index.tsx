/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:37:20
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
            {Object.entries(BGM_MAP).map(([key]) => (
              <View key={key} style={[_.mr.sm, _.mb.xs]}>
                <Text size={12} lineHeight={20} bold align='center'>
                  {key}
                </Text>
                <BgmText index={Number(key)} size={22} />
              </View>
            ))}
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
