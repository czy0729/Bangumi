/*
 * @Author: czy0729
 * @Date: 2022-10-17 11:43:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-16 06:55:15
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { confirm, stl } from '@utils'
import { r } from '@utils/dev'
import { Ctx } from '../../types'
import FormItem from '../form-item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Form() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const { show, showName, showTour, showDefault } = $.state
    return (
      <>
        {show && <View style={styles.mask} />}
        <View style={stl(styles.fixed, !show && styles.hide)}>
          <View style={styles.body}>
            <Flex>
              <Flex.Item>
                <FormItem name='url' />
              </Flex.Item>
              <Flex.Item style={_.ml.md}>
                <FormItem name='url2' />
              </Flex.Item>
            </Flex>
            <Flex style={_.mt.sm}>
              <Flex.Item flex={1.8}>
                <FormItem name='authorization' />
              </Flex.Item>
              <Flex.Item style={_.ml.md}>
                <FormItem name='distance' />
              </Flex.Item>
            </Flex>
            <Flex style={_.mt.sm}>
              <Flex.Item>
                <FormItem name='usersPrefixed' />
              </Flex.Item>
              <Flex.Item style={_.ml.md}>
                <FormItem name='infosPrefixed' />
              </Flex.Item>
              <Flex.Item style={_.ml.md}>
                <FormItem name='unitDay' />
              </Flex.Item>
            </Flex>
            <Flex style={_.mt.sm}>
              <Flex.Item>
                <FormItem name='navigate' />
              </Flex.Item>
              <Flex.Item style={_.ml.md}>
                <FormItem name='referer' />
              </Flex.Item>
              <Flex.Item style={_.ml.md}>
                <FormItem name='event' />
              </Flex.Item>
            </Flex>
            <Flex style={_.mt.sm} justify='end'>
              <Flex.Item>
                <Flex>
                  <Touchable style={styles.touch} onPress={$.onToggleName}>
                    <Text style={!showName && styles.lineThrough} type='sub' size={12} bold>
                      name
                    </Text>
                  </Touchable>
                  <Touchable style={styles.touch} onPress={$.onToggleTour}>
                    <Text style={!showTour && styles.lineThrough} type='sub' size={12} bold>
                      tour
                    </Text>
                  </Touchable>
                  <Touchable style={styles.touch} onPress={$.onToggleDefault}>
                    <Text style={!showDefault && styles.lineThrough} type='sub' size={12} bold>
                      default
                    </Text>
                  </Touchable>
                </Flex>
              </Flex.Item>
              <Touchable style={styles.touch} onPress={$.onCopy}>
                <Text type='sub' size={12} bold>
                  copy
                </Text>
              </Touchable>
              <Touchable
                style={[styles.touch, _.ml.sm]}
                onPress={() => {
                  confirm('应用?', $.onPaste)
                }}
              >
                <Text type='sub' size={12} bold>
                  paste
                </Text>
              </Touchable>
            </Flex>
          </View>
        </View>
      </>
    )
  })
}

export default Form
