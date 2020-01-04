/*
 * @Author: czy0729
 * @Date: 2020-01-03 11:23:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-04 15:48:34
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import {
  Shadow,
  Flex,
  Text,
  // BlurView,
  Image
} from '@components'
import { getCoverSmall } from '@utils/app'
import { _ } from '@stores'

const width = _.window.width - _.wind * 2
const height = width * 0.4

function Item({ id, name, title, info, last }, { $ }) {
  const styles = memoStyles()
  const { list, collect = '-' } = $.catalogDetail(id)
  return (
    <Shadow
      style={{
        marginTop: _.wind,
        marginLeft: _.wind
      }}
      initHeight={154}
    >
      <Flex style={styles.item} direction='column' justify='center'>
        {/* {!!list.length && !!list[0].image && (
        <BlurView
          style={styles.blurView}
          theme='dark'
          tint={_.select('default', 'dark')}
          src={getCoverSmall(list[0].image)}
        />
      )} */}
        <Text type='title' bold size={15} align='center' numberOfLines={1}>
          {title}
        </Text>
        <Text style={_.mt.xs} size={10} align='center' numberOfLines={1}>
          {info}
        </Text>
        <Flex style={[styles.images, _.mt.md]}>
          {list
            .filter((item, index) => index < 4)
            .map(item => (
              <Image
                key={item.id}
                style={styles.image}
                size={32}
                radius={16}
                src={getCoverSmall(item.image)}
              />
            ))}
          {!!list.length && (
            <Text style={_.ml.xs} type='sub' size={12}>
              +{list.length}
            </Text>
          )}
        </Flex>
        <Text style={_.mt.md} size={12}>
          {name} · {last} · {collect}收藏
        </Text>
      </Flex>
    </Shadow>
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
    paddingHorizontal: _.lg,
    backgroundColor: _.colorPlain,
    borderColor: _.colorBorder,
    borderWidth: _.hairlineWidth,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height
  },
  images: {
    height: 32
  },
  image: {
    marginHorizontal: _.xs
  }
}))
