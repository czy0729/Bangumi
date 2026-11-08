/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 12:00:00
 *
 * 表情一览: 用原生字体渲染全部 BGM 表情, 便于比对字形与尺寸
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import {
  BgmText,
  Component,
  Flex,
  HeaderPlaceholder,
  HeaderV2,
  Page,
  ScrollView,
  Text
} from '@components'
import { _ } from '@stores'
import { ITEMS, SIZE } from './ds'
import { styles } from './styles'

/** 表情一览 */
function Playground() {
  return (
    <Component id='screen-playground'>
      <Page>
        <HeaderPlaceholder />
        <ScrollView style={_.container.wind} contentContainerStyle={_.container.bottom}>
          <Flex wrap='wrap'>
            {ITEMS.map(({ index, size }) => (
              <View key={index} style={styles.item}>
                <Text size={12} lineHeight={20} bold align='center'>
                  {index}
                </Text>
                <View style={size === SIZE.large ? styles.iconLarge : styles.icon}>
                  <BgmText index={index} size={size} />
                </View>
              </View>
            ))}
          </Flex>
        </ScrollView>
      </Page>
      <HeaderV2 title='Playground' />
    </Component>
  )
}

export default observer(Playground)
