/*
 * @Author: czy0729
 * @Date: 2020-01-03 11:23:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-05 20:28:36
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { Cover } from '@screens/_'
import { _ } from '@stores'
import { t } from '@utils/fetch'

const width = _.window.width - _.wind * 2
const height = width * (_.isPad ? 0.32 : 0.48)

function Item(
  { id, name, title, info, last, book, anime, music, game, real },
  { $, navigation }
) {
  if (!book && !anime && !music && !game && !real) {
    return null
  }

  const styles = memoStyles()
  const { list, collect = '-' } = $.catalogDetail(id)
  const text = []
  if (name) text.push(name)
  if (last) text.push(last)
  if (collect) text.push(`${collect}收藏`)
  return (
    <Touchable
      style={styles.item}
      onPress={() => {
        t('目录.跳转', {
          to: 'CatalogDetail',
          catalogId: id
        })

        navigation.push('CatalogDetail', {
          catalogId: id
        })
      }}
    >
      <Flex style={styles.container} direction='column' justify='center'>
        <Text type='title' bold align='center' numberOfLines={1}>
          {title}
        </Text>
        <Text style={_.mt.xs} size={11} align='center' numberOfLines={2}>
          {info}
        </Text>
        <Flex style={[styles.images, _.mt.sm]}>
          {list
            .filter((item, index) => index < 4)
            .map(item => (
              <Cover
                key={item.id}
                style={styles.image}
                size={48}
                radius={_.radiusXs}
                src={item.image}
              />
            ))}
          {list.length ? (
            <Text style={_.ml.xs} type='sub' size={13} bold>
              +{list.length}{' '}
            </Text>
          ) : (
            <Text type='sub' size={12}>
              ...
            </Text>
          )}
        </Flex>
        {!!text.length && (
          <Text style={_.mt.sm} size={12}>
            {text.join(' / ')}
          </Text>
        )}
      </Flex>
    </Touchable>
  )
}

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Item)

const memoStyles = _.memoStyles(_ => ({
  item: {
    width,
    height,
    marginTop: _.space,
    marginLeft: _.wind,
    backgroundColor: _.colorPlain,
    borderRadius: _.radiusXs
  },
  container: {
    paddingHorizontal: _.lg,
    height: '100%'
  },
  images: {
    height: 56
  },
  image: {
    marginHorizontal: _.xs
  }
}))
