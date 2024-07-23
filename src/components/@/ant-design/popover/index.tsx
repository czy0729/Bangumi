/*
 * @Author: czy0729
 * @Date: 2020-04-04 02:53:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-23 21:53:37
 */
import React, { isValidElement } from 'react'
import { Platform, ScrollView, TouchableOpacity, View } from 'react-native'
import { _ } from '@stores'
import { stl } from '@utils'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { WithTheme } from '../style'
import { Popover as PopoverComp } from '../../react-native-modal-popover/Popover'
import { PopoverController } from '../../react-native-modal-popover/PopoverController'
import PopoverStyles from './style'

export class PopoverItem extends React.PureComponent {
  render() {
    const { value, disabled, children, onSelect, hitSlop, style } = this.props
    return (
      <WithTheme>
        {(_, theme) => (
          <TouchableOpacity
            activeOpacity={0.75}
            disabled={disabled}
            hitSlop={hitSlop}
            onPress={() => {
              if (typeof onSelect === 'function') {
                onSelect(value)
              }
            }}
            style={stl(
              {
                padding: theme.v_spacing_md
              },
              style
            )}
          >
            {children}
          </TouchableOpacity>
        )}
      </WithTheme>
    )
  }
}

class Popover extends React.PureComponent {
  static defaultProps = {
    onSelect: () => {}
  }

  // static Item = PopoverItem

  onSelect = (value, closePopover) => {
    const { onSelect } = this.props
    if (onSelect) {
      onSelect(value)
    }
    closePopover()
  }

  renderOverlay = closePopover => {
    const { overlay, renderOverlayComponent } = this.props
    const items = React.Children.map(overlay, child => {
      if (!isValidElement(child)) {
        return child
      }
      return React.cloneElement(child, {
        // fixed
        onSelect: v => {
          if (child.props.onSelect) {
            child.props.onSelect(v)
            this.onSelect(v, closePopover)
          } else {
            this.onSelect(v, closePopover)
          }
        }
      })
    })

    if (typeof renderOverlayComponent === 'function') {
      return renderOverlayComponent(items)
    }

    return (
      <ScrollView
        style={{
          maxHeight: parseInt(_.window.height * 0.48),
          backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2)
        }}
        {...SCROLL_VIEW_RESET_PROPS}
      >
        {items}
      </ScrollView>
    )
  }

  render() {
    const {
      style,
      contentStyle, // @add
      arrowStyle, // @add
      children,
      disabled,
      triggerStyle,
      styles,
      placement,
      hitSlop,
      onLongPress // @add
    } = this.props
    return (
      <WithTheme themeStyles={PopoverStyles} styles={styles}>
        {s => (
          <PopoverController>
            {({
              openPopover,
              closePopover,
              popoverVisible,
              setPopoverAnchor,
              popoverAnchorRect
            }) => (
              <View style={style}>
                <TouchableOpacity
                  ref={setPopoverAnchor}
                  onPress={openPopover}
                  onLongPress={onLongPress} // @add
                  style={triggerStyle}
                  disabled={disabled}
                  activeOpacity={0.75}
                  hitSlop={hitSlop}
                >
                  {children}
                </TouchableOpacity>
                <PopoverComp
                  popoverStyle={s.popover}
                  contentStyle={[s.content, contentStyle]} // @add
                  arrowStyle={{
                    ...(Platform.OS === 'ios' ? s.arrow : s.arrowAndroid),
                    ...arrowStyle
                  }}
                  backgroundStyle={s.background}
                  visible={popoverVisible}
                  onClose={closePopover}
                  fromRect={popoverAnchorRect}
                  supportedOrientations={['portrait', 'landscape']}
                  placement={placement}
                  duration={0}
                  useNativeDriver
                >
                  {this.renderOverlay(closePopover)}
                </PopoverComp>
              </View>
            )}
          </PopoverController>
        )}
      </WithTheme>
    )
  }
}

Popover.Item = PopoverItem

export default Popover
