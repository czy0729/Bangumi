/*
 * @Author: czy0729
 * @Date: 2019-06-02 02:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-15 20:49:43
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Expand, Text } from '@components'
import { SectionTitle } from '@screens/_'
import { _ } from '@stores'
import { appNavigate } from '@utils/app'

function Disc({ style }, { $, navigation }) {
  const styles = memoStyles()
  return (
    <View style={[_.container.wind, styles.container, style]}>
      <SectionTitle>曲目列表</SectionTitle>
      {!!$.disc.length && (
        <Expand style={_.mt.md}>
          {$.disc.map((item, index) => (
            <View key={item.title} style={!!index && _.mt.md}>
              <Text type='sub' size={16}>
                {item.title}
              </Text>
              <View style={_.mt.sm}>
                {item.disc.map((i, idx) => (
                  <Text
                    key={i.href}
                    style={idx % 2 === 0 && styles.odd}
                    lineHeight={2}
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
                ))}
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
    minHeight: 146,
    backgroundColor: _.colorPlain
  },
  odd: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  }
}))
