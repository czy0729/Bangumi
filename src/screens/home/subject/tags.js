/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-10-04 11:18:32
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { SectionTitle } from '@screens/_'
import { _, systemStore } from '@stores'
import { memo, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HENTAI_TAGS } from '@utils/subject/hentai'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import IconHidden from './icon/hidden'

const defaultProps = {
  navigation: {},
  styles: {},
  subjectId: 0,
  subjectType: '',
  showTags: true,
  tag: [],
  tags: [],
  animeTags: '',
  hentaiTags: [],
  onSwitchBlock: Function.prototype
}

const Tags = memo(
  ({
    navigation,
    styles,
    subjectId,
    subjectType,
    showTags,
    tag,
    tags,
    animeTags,
    hentaiTags,
    onSwitchBlock
  }) => {
    rerender('Subject.Tags.Main')

    return (
      <View style={[_.container.wind, _.mt.lg, showTags ? styles.container : _.short]}>
        <SectionTitle
          right={!showTags && <IconHidden name='标签' value='showTags' />}
          icon={!showTags && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showTags')}
        >
          标签
        </SectionTitle>
        {showTags && !!tags.length && (
          <View style={_.mt.sm}>
            <Flex wrap='wrap'>
              {tags.map(({ name, count }, index) => {
                const isSelected = tag.includes(name)
                // if (!isSelected && tags.length > 10 && count < 8) return null

                return (
                  <Touchable
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    style={[styles.item, isSelected && styles.selected]}
                    onPress={() => {
                      t('条目.跳转', {
                        to: 'Tag',
                        from: '标签',
                        subjectId
                      })

                      navigation.push('Tag', {
                        type: MODEL_SUBJECT_TYPE.getLabel(subjectType),
                        tag: name
                      })
                    }}
                  >
                    <Flex>
                      <Text
                        type={_.select('desc', isSelected ? 'main' : 'desc')}
                        size={12}
                        bold={isSelected}
                      >
                        {name}
                      </Text>
                      <Text
                        style={_.ml.xs}
                        type={_.select('sub', isSelected ? 'main' : 'desc')}
                        size={12}
                        bold={isSelected}
                      >
                        {count}
                      </Text>
                    </Flex>
                  </Touchable>
                )
              })}
              {!!animeTags && (
                <>
                  <View style={styles.split} />
                  <Text style={_.mr.sm} size={12} type='sub'>
                    内容
                  </Text>
                  {animeTags.split(' ').map(item => (
                    <Touchable
                      // eslint-disable-next-line react/no-array-index-key
                      key={item}
                      style={styles.item}
                      onPress={() => {
                        t('条目.跳转', {
                          to: 'Anime',
                          from: '标签',
                          subjectId
                        })
                        navigation.push('Anime', {
                          _tags: [item]
                        })
                      }}
                    >
                      <Text size={12}>{item}</Text>
                    </Touchable>
                  ))}
                </>
              )}
              {!!hentaiTags.length && (
                <>
                  <View style={styles.split} />
                  <Text style={_.mr.sm} size={12} type='sub'>
                    内容
                  </Text>
                  {hentaiTags.map(item => (
                    <Touchable
                      // eslint-disable-next-line react/no-array-index-key
                      key={item}
                      style={styles.item}
                      onPress={() => {
                        t('条目.跳转', {
                          to: 'Hentai',
                          from: '标签',
                          subjectId
                        })
                        navigation.push('Hentai', {
                          _tags: [item]
                        })
                      }}
                    >
                      <Text size={12}>{HENTAI_TAGS[item]}</Text>
                    </Touchable>
                  ))}
                </>
              )}
            </Flex>
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
  },
  defaultProps
)

export default obc((props, { $, navigation }) => {
  rerender('Subject.Tags')

  const { showTags } = systemStore.setting
  if (showTags === -1) return null

  return (
    <Tags
      navigation={navigation}
      styles={memoStyles()}
      subjectId={$.subjectId}
      subjectType={$.subjectType}
      showTags={showTags}
      tag={$.collection.tag}
      tags={$.tags}
      animeTags={$.animeInfo?.tags}
      hentaiTags={$.hentaiInfo?.tags}
      onSwitchBlock={$.switchBlock}
    />
  )
})

const memoStyles = _.memoStyles(_ => ({
  container: {
    minHeight: 96
  },
  loading: {
    height: 96
  },
  item: {
    paddingVertical: 2 * _.ratio,
    paddingHorizontal: 6 * _.ratio,
    marginRight: 8 * _.ratio,
    marginBottom: 8 * _.ratio,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  selected: {
    backgroundColor: _.select(_.colorPrimaryLight, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorPrimaryBorder, _._colorDarkModeLevel1)
  },
  split: {
    height: 16,
    width: 2,
    marginLeft: 4 * _.ratio,
    marginRight: 12 * _.ratio,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
