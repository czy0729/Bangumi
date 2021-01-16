/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 01:35:09
 */
import React from 'react'
import { View } from 'react-native'
import { Expand, Flex, Text, Touchable, Heatmap } from '@components'
import { SectionTitle } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import IconPS from './icon/ps'

function Tags({ style }, { $, navigation }) {
  const styles = memoStyles()
  const { tag = [] } = $.collection
  const { showTags } = systemStore.setting
  return (
    <View
      style={[
        _.container.wind,
        showTags && styles.container,
        style,
        !showTags && _.short
      ]}
    >
      <SectionTitle
        right={<IconPS />}
        icon={!showTags && 'right'}
        onPress={() => $.switchBlock('showTags')}
      >
        标签
      </SectionTitle>
      {showTags && !!$.tags.length && (
        <View style={_.mt.sm}>
          <Expand moreStyle={styles.moreStyle}>
            <Flex wrap='wrap'>
              {$.tags
                .filter(item => !!item.name)
                .map(({ name, count }, index) => {
                  const isSelected = tag.includes(name)
                  return (
                    <Touchable
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                      style={[styles.item, isSelected && styles.selected]}
                      onPress={() => {
                        t('条目.跳转', {
                          to: 'Tag',
                          from: '标签',
                          subjectId: $.subjectId
                        })
                        navigation.push('Tag', {
                          type: MODEL_SUBJECT_TYPE.getLabel($.subjectType),
                          tag: name
                        })
                      }}
                    >
                      <Flex>
                        <Text
                          type={_.select('desc', isSelected ? 'main' : 'desc')}
                          size={12}
                        >
                          {name}
                        </Text>
                        <Text
                          style={_.ml.xs}
                          type={_.select('sub', isSelected ? 'main' : 'desc')}
                          size={12}
                        >
                          {count}
                        </Text>
                      </Flex>
                    </Touchable>
                  )
                })}
            </Flex>
          </Expand>
          <Heatmap
            id='条目.跳转'
            data={{
              from: '标签'
            }}
          />
        </View>
      )}
    </View>
  )
}

export default obc(Tags)

const memoStyles = _.memoStyles(_ => ({
  container: {
    minHeight: 96
  },
  loading: {
    height: 96
  },
  item: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs
  },
  selected: {
    backgroundColor: _.select(_.colorPrimaryLight, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorPrimaryBorder, _._colorDarkModeLevel1)
  },
  moreStyle: {
    marginRight: _.md
  }
}))
