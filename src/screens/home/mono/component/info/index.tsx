/*
 * @Author: czy0729
 * @Date: 2019-05-11 17:19:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-16 05:23:48
 */
import React from 'react'
import { View } from 'react-native'
import { Divider, Flex, HeaderPlaceholder, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Collabs from '../collabs'
import Collected from '../collected'
import Content from '../content'
import Cover from '../cover'
import Detail from '../detail'
import Jobs from '../jobs'
import SectionTitle from '../section-title'
import Voice from '../voice'
import Works from '../works'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Info(_props, { $ }: Ctx) {
  const styles = memoStyles()
  return (
    <View style={styles.info}>
      <HeaderPlaceholder />
      <View style={styles.container}>
        <Flex wrap='wrap'>
          <Text size={20} bold>
            {$.nameTop}{' '}
          </Text>
          <Text type='sub' lineHeight={20} bold>
            {$.nameBottom}
          </Text>
        </Flex>
        <Cover thumb={$.thumb} src={$.cover} monoId={$.monoId} />
        <Content />
        <Detail />
        {!!$.cn && (
          <Flex style={_.mt.lg} justify='end'>
            <Touchable style={styles.touch} onPress={$.onMore}>
              <Flex>
                <Text style={_.ml.sm} type='sub'>
                  更多资料
                </Text>
                <Iconfont style={_.ml.xs} name='md-open-in-new' color={_.colorSub} size={16} />
              </Flex>
            </Touchable>
          </Flex>
        )}
      </View>
      <Divider />
      <Voice style={_.mt.md} />
      <Works style={_.mt.md} />
      <Jobs style={_.mt.md} />
      <Collabs style={_.mt.md} />
      <Collected style={_.mt.md} />
      <SectionTitle />
    </View>
  )
}

export default obc(Info, COMPONENT)
