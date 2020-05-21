/*
 * @Author: czy0729
 * @Date: 2019-06-02 02:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-22 00:35:33
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Expand, Text } from '@components'
import { SectionTitle, IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { appNavigate } from '@utils/app'

function Disc({ style }, { $, navigation }) {
  const styles = memoStyles()
  const { discTranslateResult } = $.state
  const _discTranslateResult = [...discTranslateResult]
  return (
    <View style={[_.container.wind, styles.container, style]}>
      <SectionTitle
        right={
          !discTranslateResult.length && (
            <IconTouchable
              style={styles.iconTranslate}
              name='translate'
              size={16}
              onPress={$.doDiscTranslate}
            />
          )
        }
      >
        曲目列表
      </SectionTitle>
      {!!$.disc.length && (
        <Expand style={_.mt.md}>
          {$.disc.map((item, index) => (
            <View key={item.title} style={!!index && _.mt.md}>
              <Text type='sub' size={16}>
                {item.title}
              </Text>
              <View style={_.mt.sm}>
                {item.disc.map((i, idx) => {
                  let translate = ''
                  if (_discTranslateResult.length) {
                    translate = _discTranslateResult.shift().dst
                  }
                  return (
                    <View
                      key={i.href}
                      style={[styles.item, idx % 2 === 0 && styles.odd]}
                    >
                      <Text
                        lineHeight={20}
                        onPress={() =>
                          appNavigate(
                            i.href,
                            navigation,
                            {},
                            {
                              id: '条目.跳转',
                              data: {
                                from: '曲目列表',
                                subjectId: $.subjectId
                              }
                            }
                          )
                        }
                      >
                        {i.title}
                        {!!translate && (
                          <Text type='sub' size={12} lineHeight={20}>
                            {' '}
                            {translate}
                          </Text>
                        )}
                      </Text>
                    </View>
                  )
                })}
              </View>
            </View>
          ))}
        </Expand>
      )}
    </View>
  )
}

Disc.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Disc)

const memoStyles = _.memoStyles(_ => ({
  container: {
    minHeight: 146
  },
  item: {
    paddingHorizontal: _.sm
  },
  odd: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  }
}))
