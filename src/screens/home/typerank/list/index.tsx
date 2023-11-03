/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:51:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 16:36:47
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Empty, Loading, ScrollView, Touchable, Flex } from '@components'
import { ItemSearch } from '@_'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../types'
import { styles } from './styles'

// const EVENT = {
//   id: '分类排行.跳转'
// } as const

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
        {$.ids.map((item, index) => {
          const subject = $.subject(item)
          const oss = $.subjectOSS(item)
          if (!(subject.jp || oss.name || subject.cn || oss.name_cn)) {
            return (
              <Touchable
                key={item}
                onPress={() => {
                  navigation.push('Subject', {
                    subjectId: item
                  })
                }}
              >
                <Flex style={styles.placeholder} justify='center'>
                  <Text size={15} bold type='sub'>
                    {item}
                  </Text>
                </Flex>
              </Touchable>
            )
          }

          return (
            <View
              key={item}
              style={stl(_.container.item, $.subjectId == item && styles.active)}
            >
              <ItemSearch
                navigation={navigation}
                index={index}
                id={`/subject/${item}`}
                typeCn={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(
                  subject.type || oss.type || $.type
                )}
                name={subject.jp || oss.name}
                nameCn={subject.cn || oss.name_cn}
                cover={subject.image || oss.image}
                rank={subject.rank || oss.rank}
                score={subject.rating.score || oss.rating?.score}
                total={`(${subject.rating.total || oss.rating?.total || 0})`}
                tip={
                  [
                    subject.eps || oss.totalEps
                      ? `${subject.eps || oss.totalEps}话`
                      : '',
                    subject.date || oss.date,
                    oss.origin,
                    oss.director
                  ]
                    .filter(item => !!item)
                    .join(' / ') || '-'
                }
                // event={EVENT}
              />
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default obc(List)
