/*
 * @Author: czy0729
 * @Date: 2019-05-11 17:19:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-20 14:35:03
 */
import React from 'react'
import { View } from 'react-native'
import { Divider, Flex, HeaderPlaceholder, Iconfont, Text, Touchable } from '@components'
import { IconSound } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
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

import type { Ctx } from '../../types'

function Info() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    let text = ''
    try {
      text = // $.info.match(/<span[^>]*>罗马音<\/span>\s*([^<]+)/)?.[1] ||
        ($.nameBottom || $.nameTop || '').trim()
    } catch (error) {}

    return (
      <View style={styles.info}>
        <HeaderPlaceholder />
        <View style={styles.container}>
          <Flex wrap='wrap'>
            <Text size={20} bold>
              {$.nameTop}{' '}
            </Text>
            {!!$.nameBottom && (
              <Text type='sub' lineHeight={20} bold>
                {$.nameBottom}
              </Text>
            )}
            <IconSound style={styles.sound} text={text} />
          </Flex>
          <Cover thumb={$.thumb} src={$.cover} monoId={$.monoId} />
          <Content />
          <Detail />
          {!!$.cn && (
            <Flex style={styles.more} justify='end'>
              <Touchable style={styles.touch} onPress={$.onMore}>
                <Flex>
                  <Text style={_.ml.sm} type='sub'>
                    更多资料
                  </Text>
                  <Iconfont style={_.ml.xs} name='md-open-in-new' color={_.colorSub} size={15} />
                </Flex>
              </Touchable>
            </Flex>
          )}
        </View>
        <Divider />
        <Voice />
        <Works />
        <Jobs />
        <Collabs />
        <Collected />
        <SectionTitle />
      </View>
    )
  })
}

export default Info
