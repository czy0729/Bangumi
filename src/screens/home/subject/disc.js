/*
 * @Author: czy0729
 * @Date: 2019-06-02 02:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-11 06:31:37
 */
import React from 'react'
import { View } from 'react-native'
import { Expand, Text, Heatmap } from '@components'
import { SectionTitle } from '@_'
import { _ } from '@stores'
import { obc, memo } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import IconDisc from './icon/disc'
import IconSearchDisc from './icon/search-disc'

const defaultProps = {
  navigation: {},
  styles: {},
  subjectId: 0,
  disc: [],
  discTranslateResult: []
}

const Disc = memo(
  ({ navigation, styles, subjectId, disc, discTranslateResult }) => {
    rerender('Subject.Disc.Main')

    const _discTranslateResult = [...discTranslateResult]
    return (
      <View style={styles.container}>
        <SectionTitle
          right={
            <>
              <IconSearchDisc />
              {!discTranslateResult.length && <IconDisc />}
            </>
          }
        >
          曲目列表
        </SectionTitle>
        {!!disc.length && (
          <View style={_.mt.md}>
            <Expand>
              {disc.map((item, index) => (
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
                                    subjectId
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
  },
  defaultProps,
  ({ discTranslateResult, ...other }) => ({
    discTranslateResult: discTranslateResult.length,
    ...other
  })
)

export default obc((props, { $, navigation }) => {
  rerender('Subject.Disc')

  return (
    <Disc
      navigation={navigation}
      styles={memoStyles()}
      subjectId={$.subjectId}
      disc={$.disc}
      discTranslateResult={$.state.discTranslateResult}
    />
  )
})

const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 96,
    paddingHorizontal: _.wind,
    marginTop: _.lg
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
