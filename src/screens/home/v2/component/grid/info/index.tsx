/*
 * @Author: czy0729
 * @Date: 2019-10-19 21:28:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-21 18:17:58
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IMG_WIDTH_SM } from '@constants'
import { Ctx } from '../../../types'
import IsTop from '../../is-top'
import Count from './count'
import Cover from './cover'
import Eps from './eps'
import Onair from './onair'
import Title from './title'
import ToolBar from './tool-bar'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Info({ subjectId = 0, subject = {}, epStatus = '', tip = '', time = '' }: Props) {
  const { navigation } = useStore<Ctx>()
  const styles = memoStyles()
  return (
    <Flex style={styles.item} align='start'>
      <View>
        <Cover
          subjectId={subjectId}
          subject={subject}
          onPress={() => {
            navigation.push('Subject', {
              subjectId,
              _jp: subject.name,
              _cn: subject.name_cn,
              _image: getCoverSrc(subject?.images?.medium || '', IMG_WIDTH_SM)
            })

            t('首页.跳转', {
              to: 'Subject',
              from: 'grid',
              subjectId
            })
          }}
        />
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
}

export default ob(Info, COMPONENT)
