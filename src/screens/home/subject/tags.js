/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-11 06:24:57
 */
import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { ScrollView, Flex, Text, Touchable, Iconfont, Heatmap } from '@components'
import { SectionTitle } from '@_'
import { _, systemStore } from '@stores'
import { memo, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HENTAI_TAGS } from '@utils/subject/hentai'
import { pick } from '@utils/subject/onair'
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
let _expand = false

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

    const [expand, setExpand] = useState(_expand)
    const onExpand = useCallback(() => {
      setExpand(!expand)
      _expand = !expand
    }, [expand])

    const onAirText = pick(subjectId)
    const elTags = (
      <>
        {!!onAirText && (
          <Flex style={!expand && styles.onair}>
            <Text style={_.mr.sm} size={13} type='sub' bold>
              {onAirText}
            </Text>
            <View style={styles.split} />
          </Flex>
        )}
        {tags.map(({ name, count }, index) => {
          const isSelected = tag.includes(name)
          // if (!isSelected && tags.length > 10 && count < 8) return null

          return (
            <Touchable
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
                  size={13}
                  bold={isSelected}
                >
                  {name}
                </Text>
                <Text
                  style={_.ml.xs}
                  type={_.select('sub', isSelected ? 'main' : 'desc')}
                  size={13}
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
            <View style={[!expand && _.mt.xs, styles.split]} />
            <Text style={[!expand && _.mt.xxs, _.mr.sm]} size={13} type='sub'>
              内容
            </Text>
            {animeTags.split(' ').map(item => (
              <Touchable
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
                <Text size={13}>{item}</Text>
              </Touchable>
            ))}
          </>
        )}
        {!!hentaiTags.length && (
          <>
            <View style={styles.split} />
            <Text style={_.mr.sm} size={13} type='sub'>
              内容
            </Text>
            {hentaiTags.map(item => (
              <Touchable
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
                <Text size={13}>{HENTAI_TAGS[item]}</Text>
              </Touchable>
            ))}
          </>
        )}
      </>
    )
    const show = showTags && !!tags.length
    return (
      <View style={[_.mt.lg, showTags ? styles.container : _.short, !show && _.mb.md]}>
        <SectionTitle
          style={_.container.wind}
          right={!showTags && <IconHidden name='标签' value='showTags' />}
          icon={!showTags && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showTags')}
        >
          标签
        </SectionTitle>
        {show && (
          <>
            {expand ? (
              <View style={[_.container.wind, _.mt.sm]}>
                <Flex wrap='wrap'>{elTags}</Flex>
                <Heatmap
                  id='条目.跳转'
                  data={{
                    from: '标签'
                  }}
                />
              </View>
            ) : (
              <ScrollView
                style={_.mt.md}
                contentContainerStyle={_.container.wind}
                horizontal
              >
                {elTags}
              </ScrollView>
            )}
          </>
        )}
        {show && (
          <View style={styles.more}>
            <Touchable onPress={onExpand}>
              <Flex justify='center'>
                <Iconfont
                  name={expand ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
                  size={_.device(24, 32)}
                />
              </Flex>
            </Touchable>
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

const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 96
  },
  loading: {
    height: 96
  },
  onair: {
    marginTop: -8
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
  },
  more: {
    paddingVertical: _.md,
    paddingHorizontal: 100,
    marginTop: -_.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
