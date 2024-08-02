/*
 * @Author: czy0729
 * @Date: 2023-11-03 03:30:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 03:13:55
 */
import React from 'react'
import { Component, Flex, Text, Touchable } from '@components'
import { _, collectionStore, subjectStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { ItemSearch } from '../search'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

export const ItemSubject = ob(
  ({ navigation, event, index, subjectId, type, subject, oss, active }) => {
    const styles = memoStyles()

    const name = subject.jp || oss.name || subjectStore.jp(subjectId)
    const nameCn = subject.cn || oss.name_cn || subjectStore.cn(subjectId)
    if (!(name || nameCn)) {
      return (
        <Touchable
          onPress={() => {
            navigation.push('Subject', {
              subjectId
            })
          }}
        >
          <Flex style={styles.placeholder} direction='column' justify='center'>
            <Text size={15} bold type='sub'>
              {subjectId}
            </Text>
            {!index && (
              <Text style={_.mt.md} size={12} bold type='sub'>
                加载数据中
              </Text>
            )}
          </Flex>
        </Touchable>
      )
    }

    return (
      <Component
        id='item-subject'
        data-key={subjectId}
        style={stl(_.container.item, active && styles.active)}
      >
        <ItemSearch
          navigation={navigation}
          index={index}
          id={`/subject/${subjectId}`}
          typeCn={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type || oss.type || type)}
          name={name}
          nameCn={nameCn}
          cover={subject.image || oss.image || subjectStore.cover(subjectId)}
          rank={subjectStore.ratingRank(subjectId) || subject.rank || oss.rank}
          score={subjectStore.ratingScore(subjectId) || subject.rating.score || oss.rating?.score}
          total={`(${
            subjectStore.ratingTotal(subjectId) || subject.rating.total || oss.rating?.total || 0
          })`}
          tip={
            [
              subject.eps || oss.totalEps ? `${subject.eps || oss.totalEps}话` : '',
              subjectStore.date(subjectId) || subject.date || oss.date,
              oss.origin,
              oss.director
            ]
              .filter(item => !!item)
              .join(' / ') || '-'
          }
          collection={collectionStore.collect(subjectId)}
          event={event}
        />
      </Component>
    )
  },
  COMPONENT
)

export default ItemSubject
