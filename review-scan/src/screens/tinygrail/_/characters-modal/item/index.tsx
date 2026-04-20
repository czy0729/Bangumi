/*
 * @Author: czy0729
 * @Date: 2020-07-01 17:20:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-25 22:22:22
 */
import React, { useCallback } from 'react'
import { Avatar, Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { stl, tinygrailOSS } from '@utils'
import { useObserver } from '@utils/hooks'
import Level from '../../level'
import Progress from '../../progress'
import Rank from '../../rank'
import { memoStyles } from './styles'
import { Props } from './types'

const Item = React.memo(
  ({
    type,
    src,
    id,
    level,
    rank,
    name,
    extra,
    assets = 0,
    sacrifices = 0,
    refine = 0,
    disabled,
    item,
    onPress
  }: Props) => {
    const handlePress = useCallback(() => {
      onPress(item)
    }, [item, onPress])

    return useObserver(() => {
      const styles = memoStyles()
      return (
        <Touchable onPress={handlePress}>
          <Flex style={stl(styles.item, !disabled && styles[type])}>
            {src ? (
              <Avatar
                key={src}
                src={tinygrailOSS(src)}
                size={30}
                radius={_.radiusXs}
                skeletonType='tinygrail'
              />
            ) : (
              <Text type='tinygrailPlain' size={9} lineHeight={10} bold numberOfLines={1}>
                #{id}{' '}
              </Text>
            )}
            <Flex.Item style={_.ml.xs}>
              <Flex>
                {rank <= 500 && <Rank style={styles.rank} size={8} value={rank} />}
                <Flex.Item>
                  <Text type='tinygrailPlain' size={9} bold numberOfLines={1}>
                    <Level value={level} size={9} lineHeight={9} />
                    {name}
                  </Text>
                </Flex.Item>
              </Flex>
              {assets && sacrifices ? (
                <Flex style={_.mt.xs}>
                  <Flex.Item>
                    <Progress size='xs' assets={assets} sacrifices={sacrifices} refine={refine} />
                  </Flex.Item>
                  {!!refine && (
                    <Text style={_.ml.xs} type='tinygrailText' size={9} bold>
                      +{refine}
                    </Text>
                  )}
                </Flex>
              ) : (
                !!extra && (
                  <Text style={_.mt.xs} type='tinygrailText' size={9} numberOfLines={1}>
                    {extra}
                  </Text>
                )
              )}
            </Flex.Item>
          </Flex>
        </Touchable>
      )
    })
  },
  (prevProps, nextProps) =>
    prevProps.extra === nextProps.extra &&
    prevProps.assets === nextProps.assets &&
    prevProps.sacrifices === nextProps.sacrifices &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.onPress === nextProps.onPress
)

export default Item
