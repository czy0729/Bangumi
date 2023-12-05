/*
 * @Author: czy0729
 * @Date: 2019-10-19 21:28:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 23:05:58
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { rerender } from '@utils/dev'
import { Ctx } from '../types'
import Cover from './cover'
import Onair from './onair'
import Title from './title'
import Count from './count'
import ToolBar from './tool-bar'
import Eps from './eps'
import { memoStyles } from './styles'
import { Props } from './types'

function GridInfo(
  { subjectId = 0, subject = {}, epStatus = '', tip = '' }: Props,
  { $, navigation }: Ctx
) {
  rerender('Home.GridInfo')
  const styles = memoStyles()
  const isTop = $.state.top.indexOf(subjectId) !== -1
  return (
    <Flex style={styles.item} align='start'>
      <View>
        <Cover
          subjectId={subjectId}
          subject={subject}
          onPress={() => {
            t('首页.跳转', {
              to: 'Subject',
              from: 'grid',
              subjectId
            })

            navigation.push('Subject', {
              subjectId,
              _jp: subject.name,
              _cn: subject.name_cn || subject.name,
              _image: subject?.images?.medium || ''
            })
          }}
        />
        <Onair subjectId={subjectId} />
      </View>
      <Flex.Item style={styles.info}>
        <Title subjectId={subjectId} subject={subject} />
        <Flex style={stl(_.mt.sm, _.isPad && _.mb.xs)}>
          <Flex.Item>
            <Count
              subjectId={subjectId}
              subject={subject}
              epStatus={epStatus}
              tip={tip}
            />
          </Flex.Item>
          <ToolBar subjectId={subjectId} subject={subject} />
        </Flex>
        <Eps subjectId={subjectId} />
      </Flex.Item>
      {isTop && <View style={styles.dot} />}
    </Flex>
  )
}

export default obc(GridInfo)
