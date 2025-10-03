// @ts-nocheck
/*
 * @Author: czy0729
 * @Date: 2025-10-03 16:50:19
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-10-03 16:50:19
 */

// Regular Expressions for parsing tags and attributes
var startTag =
    /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
  endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
  attr =
    /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g

// Empty Elements - HTML 5
var empty = makeMap(
  'area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr'
)

// Block Elements - HTML 5
var block = makeMap(
  'a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video'
)

// Inline Elements - HTML 5
var inline = makeMap(
  'abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var'
)

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr')

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap(
  'checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected'
)

// Special Elements (can contain anything)
var special = makeMap('script,style')

var HTMLParser = function (html, handler) {
  var index,
    chars,
    match,
    stack = [],
    last = html

  // helper function to get last element
  function lastItem() {
    return stack[stack.length - 1]
  }

  while (html) {
    chars = true

    // Make sure we're not in a script or style element
    if (!lastItem() || !special[lastItem()]) {
      // Comment
      if (html.indexOf('<!--') == 0) {
        index = html.indexOf('-->')

        if (index >= 0) {
          if (handler.comment) handler.comment(html.substring(4, index))
          html = html.substring(index + 3)
          chars = false
        }

        // end tag
      } else if (html.indexOf('</') == 0) {
        match = html.match(endTag)

        if (match) {
          html = html.substring(match[0].length)
          match[0].replace(endTag, parseEndTag)
          chars = false
        }

        // start tag
      } else if (html.indexOf('<') == 0) {
        match = html.match(startTag)

        if (match) {
          html = html.substring(match[0].length)
          match[0].replace(startTag, parseStartTag)
          chars = false
        }
      }

      if (chars) {
        index = html.indexOf('<')

        var text = index < 0 ? html : html.substring(0, index)
        html = index < 0 ? '' : html.substring(index)

        if (handler.chars) handler.chars(text)
      }
    } else {
      html = html.replace(
        new RegExp('([\\s\\S]*?)</' + lastItem() + '[^>]*>'),
        function (all, text) {
          text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, '$1$2')
          if (handler.chars) handler.chars(text)

          return ''
        }
      )

      parseEndTag('', lastItem())
    }

    if (html == last) throw 'Parse Error: ' + html
    last = html
  }

  // Clean up any remaining tags
  parseEndTag()

  function parseStartTag(tag, tagName, rest, unary) {
    tagName = tagName.toLowerCase()

    if (block[tagName]) {
      while (lastItem() && inline[lastItem()]) {
        parseEndTag('', lastItem())
      }
    }

    if (closeSelf[tagName] && lastItem() == tagName) {
      parseEndTag('', tagName)
    }

    unary = empty[tagName] || !!unary

    if (!unary) stack.push(tagName)

    if (handler.start) {
      var attrs = []

      rest.replace(attr, function (match, name) {
        var value = arguments[2]
          ? arguments[2]
          : arguments[3]
          ? arguments[3]
          : arguments[4]
          ? arguments[4]
          : fillAttrs[name]
          ? name
          : ''

        attrs.push({
          name: name,
          value: value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\"') //"
        })
      })

      if (handler.start) handler.start(tagName, attrs, unary)
    }
  }

  function parseEndTag(tag, tagName) {
    // If no tag name is provided, clean shop
    if (!tagName) var pos = 0
    // Find the closest opened tag of the same type
    else for (var pos = stack.length - 1; pos >= 0; pos--) if (stack[pos] == tagName) break

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) if (handler.end) handler.end(stack[i])

      // Remove the open elements from the stack
      stack.length = pos
    }
  }
}

function makeMap(str) {
  var obj = {},
    items = str.split(',')
  for (var i = 0; i < items.length; i++) obj[items[i]] = true
  return obj
}

export default HTMLParser
