/*
 * @Author: czy0729
 * @Date: 2024-11-08 06:06:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 09:56:45
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { fixedTranslateResult } from '@screens/home/subject/component/utils'
import { Ctx } from '../../types'
import Translate from '../translate'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Summary() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const content = $.summary.replace(/\r\n\r\n/g, '\r\n')
  const translateResult = $.state.translateResult.slice()
  return (
    <View style={styles.summary}>
      <Translate content={content} />
      {translateResult.length ? (
        <View>
          {fixedTranslateResult(translateResult, content).map((item, index) => (
            <View key={index} style={_.mt.sm}>
              <Text style={_.mt.md} type='sub' size={12} lineHeight={14} selectable>
                {item.src.trim()}
              </Text>
              <Text style={_.mt.sm} size={15} lineHeight={17} bold selectable>
                {item.dst.trim()}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        !!content && (
          <Text style={_.mt.md} size={15} lineHeight={22} selectable>
            {content}
          </Text>
        )
      )}
    </View>
  )
}

export default ob(Summary, COMPONENT)
