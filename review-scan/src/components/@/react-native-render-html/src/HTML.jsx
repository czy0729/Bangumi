/*
 * https://github.com/archriss/react-native-render-html/pull/268/commits/8a61abcd0d900bbc58141f5cf7491fb0f09fbfe4
 * @Author: czy0729
 * @Date: 2019-08-14 16:25:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-14 23:13:44
 */
import React, { PureComponent } from 'react'
import { View, Text, Dimensions } from 'react-native'
import {
  cssStringToRNStyle,
  _getElementClassStyles,
  cssStringToObject,
  cssObjectToString,
  computeTextStyles
} from 'react-native-render-html/src/HTMLStyles'
import {
  BLOCK_TAGS,
  TEXT_TAGS,
  MIXED_TAGS,
  IGNORED_TAGS,
  TEXT_TAGS_IGNORING_ASSOCIATION,
  STYLESETS,
  TextOnlyPropTypes,
  PREFORMATTED_TAGS
} from 'react-native-render-html/src/HTMLUtils'
import {
  generateDefaultBlockStyles,
  generateDefaultTextStyles
} from 'react-native-render-html/src/HTMLDefaultStyles'
import htmlparser2 from 'htmlparser2'
import { stl } from '@utils'
import { IOS } from '@constants'
import { androidTextFixedStyle } from '@styles'
import * as HTMLRenderers from './HTMLRenderers'
import { optimizeCmputeTextStyles } from './utils'

const flexStyle = { flex: 1, alignItems: 'center' }

const k = 0

export default class HTML extends PureComponent {
  // static propTypes = {
  //   renderers: PropTypes.object.isRequired,
  //   ignoredTags: PropTypes.array.isRequired,
  //   ignoredStyles: PropTypes.array.isRequired,
  //   allowedStyles: PropTypes.array,
  //   decodeEntities: PropTypes.bool.isRequired,
  //   debug: PropTypes.bool.isRequired,
  //   listsPrefixesRenderers: PropTypes.object,
  //   ignoreNodesFunction: PropTypes.func,
  //   alterData: PropTypes.func,
  //   alterChildren: PropTypes.func,
  //   alterNode: PropTypes.func,
  //   html: PropTypes.string,
  //   uri: PropTypes.string,
  //   tagsStyles: PropTypes.object,
  //   classesStyles: PropTypes.object,
  //   containerStyle: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
  //   customWrapper: PropTypes.func,
  //   onLinkPress: PropTypes.func,
  //   onParsed: PropTypes.func,
  //   imagesMaxWidth: PropTypes.number,
  //   staticContentMaxWidth: PropTypes.number,
  //   imagesInitialDimensions: PropTypes.shape({
  //     width: PropTypes.number,
  //     height: PropTypes.number
  //   }),
  //   emSize: PropTypes.number.isRequired,
  //   ptSize: PropTypes.number.isRequired,
  //   baseFontStyle: PropTypes.object.isRequired,
  //   textSelectable: PropTypes.bool,
  //   renderersProps: PropTypes.object,
  //   allowFontScaling: PropTypes.bool
  // }

  static defaultProps = {
    renderers: HTMLRenderers,
    debug: false,
    decodeEntities: true,
    emSize: 14,
    ptSize: 1.3,
    staticContentMaxWidth: Dimensions.get('window').width,
    imagesMaxWidth: Dimensions.get('window').width,
    ignoredTags: IGNORED_TAGS,
    ignoredStyles: [],
    baseFontStyle: { fontSize: 14 },
    tagsStyles: {},
    classesStyles: {},
    textSelectable: false,
    allowFontScaling: true
  }

  constructor(props) {
    super(props)
    this.state = {}
    this.renderers = {
      ...HTMLRenderers,
      ...(this.props.renderers || {})
    }
  }

  UNSAFE_componentWillMount() {
    this.generateDefaultStyles()
  }

  componentDidMount() {
    this.registerDOM()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { html, uri, renderers } = this.props

    this.generateDefaultStyles(nextProps.baseFontStyle)
    if (renderers !== nextProps.renderers) {
      this.renderers = { ...HTMLRenderers, ...(nextProps.renderers || {}) }
    }
    if (html !== nextProps.html || uri !== nextProps.uri) {
      // If the source changed, register the new HTML and parse it
      this.registerDOM(nextProps)
    } else {
      // If it didn't, let's just parse the current DOM and re-render the nodes
      // to compute potential style changes
      this.parseDOM(this.state.dom, nextProps)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.dom !== prevState.dom) {
      this.parseDOM(this.state.dom)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async registerDOM(props = this.props, cb) {
    const { html, uri } = props
    if (html) {
      this.setState({
        dom: html,
        loadingRemoteURL: false,
        errorLoadingRemoteURL: false
      })
    } else if (props.uri) {
      try {
        // WIP : This should render a loader and html prop should not be set in state
        // Error handling would be nice, too.
        try {
          this.setState({
            loadingRemoteURL: true,
            errorLoadingRemoteURL: false
          })
          const response = await fetch(uri)
          this.setState({ dom: response._bodyText, loadingRemoteURL: false })
        } catch (err) {
          console.warn(err)
          this.setState({
            errorLoadingRemoteURL: true,
            loadingRemoteURL: false
          })
        }
      } catch (err) {
        console.warn('react-native-render-html', `Couldn't fetch remote HTML from uri : ${uri}`)
        return false
      }
    } else {
      console.warn('react-native-render-html', 'Please provide the html or uri prop.')
    }
  }

  parseDOM(dom, props = this.props) {
    const { decodeEntities, debug, onParsed } = this.props
    const parser = new htmlparser2.Parser(
      new htmlparser2.DomHandler((_err, dom) => {
        let RNElements = this.mapDOMNodesTORNElements(dom, false, props)
        if (onParsed) {
          const alteredRNElements = onParsed(dom, RNElements)
          if (alteredRNElements) {
            RNElements = alteredRNElements
          }
        }
        this.setState({
          RNNodes: this.renderRNElements(RNElements, 'root', 0, props)
        })
        if (debug) {
          console.log('DOMNodes from htmlparser2', dom)
          console.log('RNElements from render-html', RNElements)
        }
      }),
      { decodeEntities: decodeEntities }
    )
    parser.write(dom)
    parser.done()
  }

  generateDefaultStyles(baseFontStyle = this.props.baseFontStyle) {
    this.defaultBlockStyles = generateDefaultBlockStyles(baseFontStyle.fontSize || 14)
    this.defaultTextStyles = generateDefaultTextStyles(baseFontStyle.fontSize || 14)
  }

  /**
   * Loop on children and return whether if their parent needs to be a <View>
   * @param {any} children
   * @returns {boolean}
   * @memberof HTML
   */
  childrenNeedAView(children) {
    for (let i = 0; i < children.length; i++) {
      if (children[i].wrapper === 'View') {
        // If we find at least one View, it has to be nested in one
        return true
      }
    }
    // We didn't find a single view, it can be wrapped in a Text
    return false
  }

  wrapperHasTextChild(children) {
    for (let i = 0; i < children.length; i++) {
      if (children[i].wrapper === 'Text') {
        return true
      }
    }
    return false
  }

  /**
   * Loops on children an find texts that need to be wrapped so we don't render line breaks
   * The wrapper can either be a <p> when it should be a paragraph, or a custom tag named
   * "textwrapper", which renders a plain <Text> component.
   * @param {any} children
   * @returns {array}
   * @memberof HTML
   */
  associateRawTexts(children) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (
        child.wrapper === 'Text' &&
        TEXT_TAGS_IGNORING_ASSOCIATION.indexOf(child.tagName) === -1 &&
        children.length > 1 &&
        (!child.parent || TEXT_TAGS_IGNORING_ASSOCIATION.indexOf(child.parent.name) === -1)
      ) {
        // Texts outside <p> or not <p> themselves (with siblings)
        const wrappedTexts = []
        for (let j = i; j < children.length; j++) {
          // Loop on its next siblings and store them in an array
          // until we encounter a block or a <p>
          const nextSibling = children[j]
          if (
            nextSibling.wrapper !== 'Text' ||
            TEXT_TAGS_IGNORING_ASSOCIATION.indexOf(nextSibling.tagName) !== -1
          ) {
            break
          }
          wrappedTexts.push(nextSibling)
          // Remove the child that has been nested
          children[j] = false
        }
        // Replace the raw text with a <p> that has wrappedTexts as its children
        if (wrappedTexts.length) {
          children[i] = {
            attribs: {},
            children: wrappedTexts,
            nodeIndex: i,
            parent: child.parent,
            parentTag: child.parentTag,
            tagName: 'textwrapper',
            wrapper: 'Text'
          }
        }
      }
    }
    return children.filter(parsedNode => parsedNode !== false && parsedNode !== undefined)
  }

  /**
   * Maps the DOM nodes parsed by htmlparser2 into a simple structure that will be easy to render with
   * native components. It removes ignored tags, chooses the right wrapper for each set of children
   * to ensure we're not wrapping views inside texts and improves the structure recursively
   * to prevent erratic rendering.
   * @param {array} DOMNodes
   * @param {boolean} [parentTag=false]
   * @returns
   * @memberof HTML
   */
  mapDOMNodesTORNElements(DOMNodes, parentTag = false, props = this.props) {
    const {
      ignoreNodesFunction,
      ignoredTags,
      alterNode,
      alterData,
      alterChildren,
      tagsStyles,
      classesStyles
    } = props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const RNElements = DOMNodes.map((node, nodeIndex) => {
      let { children, data } = node
      if (ignoreNodesFunction && ignoreNodesFunction(node, parentTag) === true) {
        return false
      }
      if (
        ignoredTags.map(tag => tag.toLowerCase()).indexOf(node.name && node.name.toLowerCase()) !==
        -1
      ) {
        return false
      }

      if (alterNode) {
        const alteredNode = alterNode(node)
        node = alteredNode || node
      }
      const { type, attribs, name, parent } = node

      if (alterData && data) {
        const alteredData = alterData(node)
        data = alteredData || data
      }
      if (alterChildren && children) {
        const alteredChildren = alterChildren(node)
        children = alteredChildren || children
      }
      // Remove whitespaces to check if it's just a blank text
      const strippedData = data && data.replace(/\s/g, '')
      if (type === 'text') {
        if (!strippedData || !strippedData.length) {
          // This is blank, don't render an useless additional component
          return false
        }

        if (node.parent && node.parent.name && PREFORMATTED_TAGS.indexOf(node.parent.name) === -1) {
          // Remove line breaks in non-pre-formatted tags
          data = data.replace(/(\r\n|\n|\r)/gm, '')
        }

        // Text without tags, these can be mapped to the Text wrapper
        return {
          wrapper: 'Text',
          data: data,
          attribs: attribs || {},
          parent,
          parentTag: parent && parent.name,
          tagName: name || 'rawtext'
        }
      }
      if (type === 'tag') {
        if (children) {
          // Recursively map all children with this method
          children = this.associateRawTexts(this.mapDOMNodesTORNElements(children, name))
        }
        if (this.childrenNeedAView(children) || BLOCK_TAGS.indexOf(name.toLowerCase()) !== -1) {
          // If children cannot be nested in a Text, or if the tag
          // maps to a block element, use a view
          return {
            wrapper: 'View',
            children,
            attribs,
            parent,
            tagName: name,
            parentTag
          }
        } else if (
          TEXT_TAGS.indexOf(name.toLowerCase()) !== -1 ||
          MIXED_TAGS.indexOf(name.toLowerCase()) !== -1
        ) {
          // We are able to nest its children inside a Text
          return {
            wrapper: 'Text',
            children,
            attribs,
            parent,
            tagName: name,
            parentTag
          }
        } else if (this.renderers[name] && this.renderers[name].wrapper) {
          return {
            wrapper: this.renderers[name].wrapper,
            children,
            attribs,
            parent,
            tagName: name,
            parentTag
          }
        }
        return {
          wrapper: 'View',
          children,
          attribs,
          parent,
          tagName: name,
          parentTag
        }
      }
    })
      .filter(parsedNode => parsedNode !== false && parsedNode !== undefined) // remove useless nodes
      .map((parsedNode, nodeIndex) => {
        const { wrapper, children, attribs, tagName } = parsedNode
        const firstChild = children && children[0]
        if (firstChild && children.length === 1) {
          // Specific tweaks for wrappers with a single child
          if (
            (attribs === firstChild.attribs || !firstChild.attribs) &&
            firstChild.wrapper === wrapper &&
            (tagName === firstChild.tagName || firstChild.tagName === 'rawtext')
          ) {
            // If the only child of a node is using the same wrapper, merge them into one
            return {
              ...parsedNode,
              attribs: { ...attribs, ...firstChild.attribs },
              data: firstChild.data,
              children: [],
              tagName,
              nodeIndex
            }
          }
        }
        return { ...parsedNode, nodeIndex }
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map((parsedNode, nodeIndex) => {
        const { wrapper, attribs, tagName, children } = parsedNode
        if (wrapper === 'View' && attribs && this.wrapperHasTextChild(children)) {
          // When encountering a View wrapper that has some styles and also Text children,
          // let's filter out text-only styles and apply those to *all* Text children and
          // remove them from the wrapper, mimicking browsers' behaviour better.
          const wrapperStyles = {
            ...(tagsStyles[tagName] || {}),
            ..._getElementClassStyles(attribs, classesStyles),
            ...cssStringToObject(attribs.style || '')
          }

          const textChildrenInheritedStyles = {}
          Object.keys(wrapperStyles).forEach(styleKey => {
            // Extract text-only styles
            if (TextOnlyPropTypes.indexOf(styleKey) !== -1) {
              textChildrenInheritedStyles[styleKey] = wrapperStyles[styleKey]
              delete wrapperStyles[styleKey]
            }
          })
          if (Object.keys(textChildrenInheritedStyles).length === 0) {
            // No style to apply to text children, avoid unecessary loops
            return parsedNode
          }
          // Re-write wrapper's styles as a string
          parsedNode.attribs.style = cssObjectToString(wrapperStyles)
          for (let i = 0; i < children.length; i++) {
            const child = children[i]
            const { wrapper, attribs } = child

            if (wrapper === 'Text') {
              // Set (or merge) the inherited text styles extracted from the wrapper for
              // each Text child
              if (!attribs.style) {
                child.attribs.style = cssObjectToString(textChildrenInheritedStyles)
              } else {
                child.attribs.style = cssObjectToString({
                  ...textChildrenInheritedStyles,
                  ...cssStringToObject(child.attribs.style)
                })
              }
            }
          }
        }
        return parsedNode
      })
    return this.associateRawTexts(RNElements)
  }

  /**
   * Takes the parsed nodes from mapDOMNodesTORNElements and actually renders native components.
   * Calls the utils that convert the CSS into react-native compatible styles and renders custom
   * components when needed.
   * @param {boolean} RNElements
   * @param {string} [parentWrapper='root']
   * @param {number} [parentIndex=0]
   * @returns {array}
   * @memberof HTML
   */
  renderRNElements(
    RNElements,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    parentWrapper = 'root',
    parentIndex = 0,
    props = this.props
  ) {
    const {
      allowFontScaling,
      allowedStyles,
      baseFontStyle,
      classesStyles,
      emSize,
      ignoredStyles,
      ptSize,
      tagsStyles
      // textSelectable
    } = props

    return RNElements && RNElements.length
      ? RNElements.map((element, index) => {
          const { attribs, data, tagName, parentTag, children, nodeIndex, wrapper } = element
          const Wrapper = wrapper === 'Text' ? Text : View
          const key = `${wrapper}-${parentIndex}-${nodeIndex}-${tagName}-${index}-${
            parentTag || ''
          }`
          const convertedCSSStyles =
            attribs && attribs.style
              ? cssStringToRNStyle(
                  attribs.style,
                  Wrapper === Text ? STYLESETS.TEXT : STYLESETS.VIEW, // proper prop-types validation
                  {
                    parentTag: tagName,
                    emSize,
                    ptSize,
                    ignoredStyles,
                    allowedStyles
                  }
                )
              : {}

          const renderersProps = {}
          if (Wrapper === Text) {
            renderersProps.allowFontScaling = allowFontScaling
            renderersProps.selectable = this.props.textSelectable
          }

          const childElements =
            children && children.length
              ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
                children.map((child, childIndex) =>
                  this.renderRNElements([child], wrapper, index, props)
                )
              : false

          if (this.renderers[tagName]) {
            const customRenderer =
              typeof this.renderers[tagName] === 'function'
                ? this.renderers[tagName]
                : this.renderers[tagName].renderer

            if (!customRenderer || typeof customRenderer !== 'function') {
              console.warn(
                `Custom renderer for ${tagName} supplied incorrectly. Please check out the docs.`
              )
              return undefined
            }

            // If a custom renderer is available for this tag
            return customRenderer(attribs, childElements, convertedCSSStyles, {
              ...props,
              parentWrapper: wrapper,
              parentTag,
              nodeIndex,
              parentIndex,
              key,
              data,
              rawChildren: children,
              ...renderersProps
            })
          }

          const classStyles = _getElementClassStyles(attribs, classesStyles)
          const textElement = data ? (
            <Text
              allowFontScaling={allowFontScaling}
              style={stl(
                !IOS && androidTextFixedStyle,
                optimizeCmputeTextStyles(
                  computeTextStyles(element, {
                    defaultTextStyles: this.defaultTextStyles,
                    tagsStyles,
                    classesStyles,
                    baseFontStyle,
                    emSize,
                    ptSize,
                    ignoredStyles,
                    allowedStyles
                  })
                )
              )}
              textBreakStrategy='simple'
              numberOfLines={0}
            >
              {data}
            </Text>
          ) : (
            false
          )

          const style = [
            !tagsStyles || !tagsStyles[tagName]
              ? (Wrapper === Text ? this.defaultTextStyles : this.defaultBlockStyles)[tagName]
              : undefined,
            tagsStyles ? tagsStyles[tagName] : undefined,
            classStyles,
            convertedCSSStyles
          ].filter(s => s !== undefined)

          // const renderersProps = {};
          // if (Wrapper === Text) {
          //     renderersProps.allowFontScaling = allowFontScaling;
          //     renderersProps.selectable = textSelectable;
          // }
          return (
            <Wrapper key={key} style={style} {...renderersProps}>
              {textElement}
              {childElements}
            </Wrapper>
          )
        })
      : false
  }

  render() {
    return <View style={this.props.containerStyle}>{this.state.RNNodes}</View>

    // const { allowFontScaling, customWrapper, remoteLoadingView, remoteErrorView } = this.props
    // const { RNNodes, loadingRemoteURL, errorLoadingRemoteURL } = this.state
    // if (!RNNodes && !loadingRemoteURL && !errorLoadingRemoteURL) {
    //   return null
    // }

    // if (loadingRemoteURL) {
    //   return remoteLoadingView ? (
    //     remoteLoadingView(this.props, this.state)
    //   ) : (
    //     <View style={flexStyle}>
    //       <ActivityIndicator />
    //     </View>
    //   )
    // }

    // if (errorLoadingRemoteURL) {
    //   return remoteErrorView ? (
    //     remoteErrorView(this.props, this.state)
    //   ) : (
    //     <View style={flexStyle}>
    //       <Text
    //         // style={{ fontStyle: 'italic', fontSize: 16 }}
    //         style={!IOS && androidTextFixedStyle}
    //         allowFontScaling={allowFontScaling}
    //         textBreakStrategy='simple'
    //         numberOfLines={0}
    //       >
    //         Could not load {this.props.uri}
    //       </Text>
    //     </View>
    //   )
    // }

    // return customWrapper ? (
    //   customWrapper(RNNodes)
    // ) : (
    //   <View style={this.props.containerStyle || {}}>{RNNodes}</View>
    // )
  }
}
