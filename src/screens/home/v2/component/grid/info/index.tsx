/*
 * @Author: czy0729
 * @Date: 2019-10-19 21:28:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-07 17:06:02
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Link, Text } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { IMG_WIDTH_SM } from '@constants'
import IsTop from '../../is-top'
import Count from './count'
import Cover from './cover'
import Eps from './eps'
import Onair from './onair'
import Title from './title'
import ToolBar from './tool-bar'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function Info({ subjectId = 0, subject = {}, epStatus = '', tip = '', time = '' }: Props) {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <Flex style={styles.item} align='start'>
        <View>
          <Link
            path='Subject'
            getParams={() => ({
              subjectId,
              _jp: subject.name,
              _cn: subject.name_cn,
              _image: getCoverSrc(subject?.images?.medium || '', IMG_WIDTH_SM)
            })}
            eventId='首页.跳转'
            eventData={{
              to: 'Subject',
              from: 'grid',
              subjectId
            }}
          >
            <Cover subjectId={subjectId} subject={subject} />
          </Link>
          <Onair subjectId={subjectId} />
        </View>
        <Flex.Item style={styles.info}>
          <Title subjectId={subjectId} subject={subject} />
          <Flex style={stl(_.mt.sm, _.isPad && _.mb.xs)}>
            <Flex.Item>
              <Count subjectId={subjectId} subject={subject} epStatus={epStatus} tip={tip} />
            </Flex.Item>
            <ToolBar subjectId={subjectId} subject={subject} />
          </Flex>
          <Eps subjectId={subjectId} />
          {!!time && (
            <Text style={_.mt.md} size={12} type='sub'>
              {time} 在玩
            </Text>
          )}
        </Flex.Item>
        <IsTop style={_.mr.xs} subjectId={subjectId} />
      </Flex>
    )
  })
}

export default Info
