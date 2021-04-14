/*
 * @Author: czy0729
 * @Date: 2019-06-02 02:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-16 20:17:50
 */
import React from 'react'
import { View } from 'react-native'
import { Expand, Text, Heatmap } from '@components'
import { SectionTitle } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import IconDisc from './icon/disc'

function Disc({ style }, { $, navigation }) {
  const styles = memoStyles()
  const { discTranslateResult } = $.state
  const _discTranslateResult = [...discTranslateResult]
  return (
    <View style={[_.container.wind, styles.container, style]}>
      <SectionTitle right={!discTranslateResult.length && <IconDisc />}>
        曲目列表
      </SectionTitle>
      {!!$.disc.length && (
        <View style={_.mt.md}>
          <Expand>
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
                        </Text>
                        {!!translate && (
                          <Text style={styles.translate} type='sub' size={12}>
                            {translate}
                          </Text>
                        )}
                      </View>
                    )
                  })}
                </View>
              </View>
            ))}
          </Expand>
          <Heatmap
            id='条目.跳转'
            data={{
              from: '曲目列表'
            }}
          />
        </View>
      )}
    </View>
  )
}

export default obc(Disc)

const memoStyles = _.memoStyles(_ => ({
  container: {
    minHeight: 96
  },
  item: {
    paddingHorizontal: _.sm,
    paddingVertical: _.sm
  },
  odd: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  },
  translate: {
    marginTop: _.xs
  }
}))
