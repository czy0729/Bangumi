/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-12 22:38:55
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Expand, Flex, Text, Touchable } from '@components'
import { SectionTitle } from '@screens/_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

function Tags({ style }, { $, navigation }) {
  const styles = memoStyles()
  const { type } = $.subject
  const { tags = [] } = $.subjectFormHTML
  const { tag = [] } = $.collection
  return (
    <View style={[_.container.wind, styles.container, style]}>
      <SectionTitle>标签</SectionTitle>
      {!!tags.length && (
        <Expand style={_.mt.sm}>
          <Flex wrap='wrap'>
            {tags
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
                        type: MODEL_SUBJECT_TYPE.getLabel(type),
                        tag: name
                      })
                    }}
                  >
                    <Flex>
                      <Text
                        type={_.select('desc', isSelected ? 'main' : 'desc')}
                        size={13}
                      >
                        {name}
                      </Text>
                      <Text
                        style={_.ml.xs}
                        type={_.select('sub', isSelected ? 'main' : 'desc')}
                        size={13}
                      >
                        {count}
                      </Text>
                    </Flex>
                  </Touchable>
                )
              })}
          </Flex>
        </Expand>
      )}
    </View>
  )
}

Tags.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Tags)

const memoStyles = _.memoStyles(_ => ({
  container: {
    minHeight: 120,
    backgroundColor: _.colorPlain
  },
  loading: {
    height: 96
  },
  item: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 12,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs
  },
  selected: {
    backgroundColor: _.select(_.colorPrimaryLight, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorPrimaryBorder, _._colorDarkModeLevel1)
  }
}))
