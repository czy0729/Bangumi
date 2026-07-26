/*
 * @Fork https://github.com/oblador/react-native-collapsible/blob/f8c873290cffa8609e33a64be45be9a2d7a9de0d/Collapsible.js
 * @Author: czy0729
 * @Date: 2024-11-21 12:19:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 02:12:09
 */
import React, { Component } from 'react'
import { Animated, Easing } from 'react-native'

import type { EasingFunction } from 'react-native'

import type { CollapsibleProps } from 'react-native-collapsible'

const ANIMATED_EASING_PREFIXES = ['easeInOut', 'easeOut', 'easeIn'] as const

type EasingModifier = 'in' | 'out' | 'inOut'

type CollapsibleState = {
  measuring: boolean
  measured: boolean
  height: Animated.Value
  contentHeight: number
  animating: boolean
}

type CollapsibleInstance = {
  measure?: (callback: (x: number, y: number, width: number, height: number) => void) => void
  getNode?: () => CollapsibleInstance
}

export default class Collapsible extends Component<CollapsibleProps, CollapsibleState> {
  static defaultProps = {
    align: 'top',
    collapsed: true,
    collapsedHeight: 0,
    enablePointerEvents: false,
    duration: 300,
    easing: 'easeOutCubic',
    onAnimationEnd: () => null,
    renderChildrenCollapsed: true
  }

  constructor(props: CollapsibleProps) {
    super(props)
    this.state = {
      measuring: false,
      measured: false,
      height: new Animated.Value(props.collapsedHeight),
      contentHeight: 0,
      animating: false
    }
  }

  static getDerivedStateFromProps(props: CollapsibleProps): Partial<CollapsibleState> | null {
    if (!props.collapsed) {
      return { measured: false }
    }
    return null
  }

  componentDidUpdate(prevProps: CollapsibleProps): void {
    if (prevProps.collapsed !== this.props.collapsed) {
      this.setState({ measured: false }, () => this._componentDidUpdate(prevProps))
    } else {
      this._componentDidUpdate(prevProps)
    }
  }

  componentWillUnmount(): void {
    this.unmounted = true
  }

  private unmounted?: boolean
  private _animation?: Animated.CompositeAnimation
  private contentHandle: CollapsibleInstance | null = null

  _componentDidUpdate(prevProps: CollapsibleProps): void {
    if (prevProps.collapsed !== this.props.collapsed) {
      this._toggleCollapsed(this.props.collapsed)
    } else if (this.props.collapsed && prevProps.collapsedHeight !== this.props.collapsedHeight) {
      this.state.height.setValue(this.props.collapsedHeight)
    }
  }

  _handleRef = (ref: CollapsibleInstance | null): void => {
    this.contentHandle = ref
  }

  _measureContent(callback: (height: number) => void): void {
    this.setState(
      {
        measuring: true
      },
      () => {
        requestAnimationFrame(() => {
          if (!this.contentHandle) {
            this.setState(
              {
                measuring: false
              },
              () => callback(this.props.collapsedHeight)
            )
          } else {
            let ref: CollapsibleInstance
            if (typeof this.contentHandle.measure === 'function') {
              ref = this.contentHandle
            } else {
              ref = this.contentHandle.getNode()
            }
            ref.measure((_x: number, _y: number, _width: number, height: number) => {
              this.setState(
                {
                  measuring: false,
                  measured: true,
                  contentHeight: height
                },
                () => callback(height)
              )
            })
          }
        })
      }
    )
  }

  _toggleCollapsed(collapsed: boolean): void {
    if (collapsed) {
      this._transitionToHeight(this.props.collapsedHeight)
    } else if (!this.contentHandle) {
      if (this.state.measured) {
        this._transitionToHeight(this.state.contentHeight)
      }
      return
    } else {
      this._measureContent(contentHeight => {
        this._transitionToHeight(contentHeight)
      })
    }
  }

  _transitionToHeight(height: number): void {
    const { duration } = this.props
    let easing = this.props.easing as string | EasingFunction
    if (typeof easing === 'string') {
      let prefix: string
      let found = false
      for (let i = 0; i < ANIMATED_EASING_PREFIXES.length; i++) {
        prefix = ANIMATED_EASING_PREFIXES[i]
        if (easing.substr(0, prefix.length) === prefix) {
          easing = easing.substr(prefix.length, 1).toLowerCase() + easing.substr(prefix.length + 1)
          prefix = prefix.substr(4, 1).toLowerCase() + prefix.substr(5)
          easing = (Easing[prefix as EasingModifier] as (fn: EasingFunction) => EasingFunction)(
            Easing[(easing || 'ease') as keyof typeof Easing] as EasingFunction
          )
          found = true
          break
        }
      }
      if (!found) {
        easing = Easing[easing as keyof typeof Easing] as EasingFunction
      }
      if (!easing) {
        throw new Error('Invalid easing type "' + this.props.easing + '"')
      }
    }

    if (this._animation) {
      this._animation.stop()
    }
    this.setState({ animating: true })
    this._animation = Animated.timing(this.state.height, {
      useNativeDriver: false,
      toValue: height ? height : 0,
      duration,
      easing: easing as EasingFunction
    })
    this._animation.start(() => {
      if (this.unmounted) {
        return
      }
      this.setState({ animating: false }, () => {
        if (this.unmounted) {
          return
        }
        this.props.onAnimationEnd?.()
      })
    })
  }

  _handleLayoutChange = (event: { nativeEvent: { layout: { height: number } } }): void => {
    const contentHeight = event.nativeEvent.layout.height
    if (
      this.state.animating ||
      this.props.collapsed ||
      this.state.measuring ||
      this.state.contentHeight === contentHeight
    ) {
      return
    }

    this.state.height.setValue(contentHeight)
    this.setState({ contentHeight })
  }

  render() {
    const { collapsed, enablePointerEvents, renderChildrenCollapsed } = this.props
    const { height, contentHeight, measuring, measured, animating } = this.state
    const hasKnownHeight = !measuring && (measured || collapsed)
    const style = hasKnownHeight && {
      overflow: 'hidden' as const,
      height: height as unknown as number
    }
    const contentStyle: Record<string, unknown> = {}
    if (measuring) {
      contentStyle.position = 'absolute'
      contentStyle.opacity = 0
    } else if (this.props.align === 'center') {
      contentStyle.transform = [
        {
          translateY: height.interpolate({
            inputRange: [0, contentHeight],
            outputRange: [contentHeight / -2, 0]
          })
        }
      ]
    } else if (this.props.align === 'bottom') {
      contentStyle.transform = [
        {
          translateY: height.interpolate({
            inputRange: [0, contentHeight],
            outputRange: [-contentHeight, 0]
          })
        }
      ]
    }
    if (animating) {
      contentStyle.height = contentHeight
    }
    const shouldRenderChildren =
      renderChildrenCollapsed ||
      ((!collapsed || (collapsed && animating)) && (animating || measuring || measured))

    return (
      <Animated.View
        style={style}
        pointerEvents={!enablePointerEvents && collapsed ? 'none' : 'auto'}
      >
        <Animated.View
          ref={this._handleRef}
          style={[this.props.style, contentStyle]}
          onLayout={this.state.animating ? undefined : this._handleLayoutChange}
        >
          {shouldRenderChildren && this.props.children}
        </Animated.View>
      </Animated.View>
    )
  }
}
