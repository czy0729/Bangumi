/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:51:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-04 05:42:28
 */
import React from 'react'
import { View } from 'react-native'
import { Empty, Flex, Loading, Mesume, ScrollView } from '@components'
import RandomText from '@components/list-view/footer/random-text'
import { ItemSubject } from '@_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { styles } from './styles'

const EVENT = {
  id: '分类排行.跳转'
} as const

function List(props, { $, navigation }: Ctx) {
  if (!$.ids.length) return <Empty text='此标签没有足够的列表数据' />

  const { searching } = $.state
  if (searching) return <Loading style={_.container.flex} />

  return (
    <ScrollView
      contentContainerStyle={_.container.bottom}
      keyboardDismissMode='on-drag'
      onScroll={$.onScroll}
    >
      <View style={styles.list}>
        {$.ids.map((item, index) => (
          <ItemSubject
            key={item}
            navigation={navigation}
            event={EVENT}
            index={index}
            subjectId={item}
            type={$.type}
            subject={$.subject(item)}
            oss={$.subjectOSS(item)}
            active={$.subjectId == item}
          />
        ))}
        <Flex style={styles.noMore} justify='center' direction='column'>
          <Mesume size={80} />
          {systemStore.setting.speech && <RandomText />}
        </Flex>
      </View>
    </ScrollView>
  )
}

export default obc(List)
