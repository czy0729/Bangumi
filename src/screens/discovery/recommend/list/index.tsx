/*
 * @Author: czy0729
 * @Date: 2023-05-24 12:33:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-24 17:42:13
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Loading, ScrollView, Text } from '@components'
import { ItemSearch } from '@_'
import { obc } from '@utils/decorators'
import { _ } from '@stores'
import { Ctx } from '../types'
import { styles } from './styles'
import { SORT } from './ds'
import { desc } from '@utils'

function List(props, { $, navigation }: Ctx) {
  const { searching, data } = $.state
  if (searching) return <Loading style={_.container.flex} />

  return (
    <ScrollView
      contentContainerStyle={_.container.bottom}
      keyboardDismissMode='on-drag'
    >
      {SORT.slice()
        .sort((a, b) => desc(!!data[a.key]?.length, !!data[b.key]?.length))
        .map(item => (
          <View key={item.key} style={_.mv.md}>
            <Text style={_.ml.md} size={20} bold>
              {item.title}
            </Text>
            <View style={styles.list}>
              {data[item.key].map((item, index) => {
                const subject = $.subject(item)
                const oss = $.subjectOSS(item)
                if (!(subject.jp || oss.name || subject.cn || oss.name_cn)) {
                  return (
                    <Flex key={String(item)} style={styles.loading} justify='center'>
                      <Loading.Raw />
                    </Flex>
                  )
                }

                return (
                  <ItemSearch
                    key={String(item)}
                    style={_.container.item}
                    navigation={navigation}
                    index={index}
                    id={`/subject/${item}`}
                    typeCn='动画'
                    name={subject.jp || oss.name}
                    nameCn={subject.cn || oss.name_cn}
                    cover={subject.image || oss.image}
                    rank={subject.rank || oss.rank}
                    score={subject.rating.score || oss.rating?.score}
                    total={`(${subject.rating.total || oss.rating?.total || 0})`}
                    tip={[
                      subject.eps || oss.totalEps
                        ? `${subject.eps || oss.totalEps}话`
                        : '',
                      subject.date || oss.date,
                      oss.origin,
                      oss.director
                    ]
                      .filter(item => !!item)
                      .join(' / ')}
                  />
                )
              })}
            </View>
          </View>
        ))}
    </ScrollView>
  )
}

export default obc(List)
