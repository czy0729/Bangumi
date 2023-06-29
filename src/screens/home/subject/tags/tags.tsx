/*
 * @Author: czy0729
 * @Date: 2019-03-25 05:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-29 17:07:01
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Flex, Text, Touchable, Iconfont, Heatmap } from '@components'
import { SectionTitle, PreventTouchPlaceholder } from '@_'
import { systemStore, _ } from '@stores'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants'
import IconHidden from '../icon/hidden'
import IconGame from '../icon/game'
import Block from './block'
import { DEFAULT_PROPS } from './ds'

export default memo(
  ({
    navigation,
    styles,
    subjectId,
    subjectType,
    showTags,
    subjectTagsExpand,
    focusOrigin,
    tag,
    tags,
    animeTags,
    hentaiTags,
    gameTags,
    mangaTags,
    wenkuTags,
    onSwitchBlock
  }) => {
    // global.rerender('Subject.Tags.Main')

    const elTags = (
      <>
        {tags.map(({ name, count }, index) => {
          const isSelected = tag.includes(name)
          return (
            <Touchable
              key={index}
              animate
              scale={0.9}
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
              <Flex style={isSelected ? [styles.item, styles.selected] : styles.item}>
                <Text
                  type={_.select('desc', isSelected ? 'main' : 'desc')}
                  size={13}
                  bold
                >
                  {name}
                </Text>
                <Text
                  type={_.select('sub', isSelected ? 'main' : 'sub')}
                  size={12}
                  lineHeight={13}
                  bold
                >
                  {' '}
                  {count}
                </Text>
              </Flex>
            </Touchable>
          )
        })}
        <Block path='Anime' tags={animeTags} />
        <Block path='Hentai' tags={hentaiTags} />
        <Block path='Game' tags={gameTags} />
        <Block path='Manga' tags={mangaTags} />
        <Block path='Wenku' tags={wenkuTags} />
      </>
    )

    const show = showTags && !!tags.length
    return (
      <View
        style={stl(_.mt.lg, showTags ? styles.container : _.short, !show && _.mb.md)}
      >
        <SectionTitle
          style={_.container.wind}
          right={
            showTags ? (
              focusOrigin && <IconGame />
            ) : (
              <IconHidden name='标签' value='showTags' />
            )
          }
          icon={!showTags && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showTags')}
        >
          标签
        </SectionTitle>
        {show && (
          <>
            {subjectTagsExpand ? (
              <View style={_.container.windMtSm}>
                <Flex wrap='wrap'>{elTags}</Flex>
                <Heatmap id='条目.跳转' from='标签' />
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
            <Touchable onPress={() => systemStore.switchSetting('subjectTagsExpand')}>
              <Flex justify='center'>
                <Iconfont
                  name={
                    subjectTagsExpand
                      ? 'md-keyboard-arrow-up'
                      : 'md-keyboard-arrow-down'
                  }
                  size={_.device(24, 32)}
                />
              </Flex>
            </Touchable>
          </View>
        )}
        <PreventTouchPlaceholder />
      </View>
    )
  },
  DEFAULT_PROPS
)
