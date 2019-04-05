/* eslint-disable no-unused-vars */
const UIManager = {
  AIRGoogleMap: {
    Commands: {
      animateToBearing: 4,
      animateToCoordinate: 2,
      animateToNavigation: 0,
      animateToRegion: 1,
      animateToViewingAngle: 3,
      coordinateForPoint: 10,
      fitToCoordinates: 7,
      fitToElements: 5,
      fitToSuppliedMarkers: 6,
      pointForCoordinate: 9,
      setIndoorActiveLevelIndex: 12,
      setMapBoundaries: 11,
      takeSnapshot: 8
    },
    Constants: {
      legalNotice: '-------',
      Manager: 'AIRGoogleMapManager',
      NativeProps: {
        customMapStyleString: 'NSString',
        initialRegion: 'MKCoordinateRegion',
        kmlSrc: 'NSString',
        mapPadding: 'UIEdgeInsets',
        mapType: 'GMSMapViewType',
        maxZoomLevel: 'CGFloat',
        minZoomLevel: 'CGFloat',
        onChange: 'BOOL',
        onIndoorBuildingFocused: 'BOOL',
        onIndoorLevelActivated: 'BOOL',
        onKmlReady: 'BOOL',
        onLongPress: 'BOOL',
        onMapReady: 'BOOL',
        onMarkerPress: 'BOOL',
        onPoiClick: 'BOOL',
        onPress: 'BOOL',
        onRegionChange: 'BOOL',
        onRegionChangeComplete: 'BOOL',
        onUserLocationChange: 'BOOL',
        paddingAdjustmentBehavior: 'NSString',
        pitchEnabled: 'BOOL',
        region: 'MKCoordinateRegion',
        rotateEnabled: 'BOOL',
        scrollEnabled: 'BOOL',
        showsBuildings: 'BOOL',
        showsCompass: 'BOOL',
        showsIndoorLevelPicker: 'BOOL',
        showsIndoors: 'BOOL',
        showsMyLocationButton: 'BOOL',
        showsTraffic: 'BOOL',
        showsUserLocation: 'BOOL',
        zoomEnabled: 'BOOL'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topChange: {
          phasedRegistrationNames: {
            bubbled: 'onChange',
            captured: 'onChangeCapture'
          }
        },
        topKmlReady: {
          phasedRegistrationNames: {
            bubbled: 'onKmlReady',
            captured: 'onKmlReadyCapture'
          }
        },
        topLongPress: {
          phasedRegistrationNames: {
            bubbled: 'onLongPress',
            captured: 'onLongPressCapture'
          }
        },
        topMapReady: {
          phasedRegistrationNames: {
            bubbled: 'onMapReady',
            captured: 'onMapReadyCapture'
          }
        },
        topPress: {
          phasedRegistrationNames: {
            bubbled: 'onPress',
            captured: 'onPressCapture'
          }
        },
        topUserLocationChange: {
          phasedRegistrationNames: {
            bubbled: 'onUserLocationChange',
            captured: 'onUserLocationChangeCapture'
          }
        }
      },
      directEventTypes: {
        topIndoorBuildingFocused: {
          registrationName: 'onIndoorBuildingFocused'
        },
        topIndoorLevelActivated: {
          registrationName: 'onIndoorLevelActivated'
        },
        topMarkerPress: {
          registrationName: 'onMarkerPress'
        },
        topPoiClick: {
          registrationName: 'onPoiClick'
        },
        topRegionChange: {
          registrationName: 'onRegionChange'
        },
        topRegionChangeComplete: {
          registrationName: 'onRegionChangeComplete'
        }
      }
    },
    AIRGoogleMapCallout: {
      Commands: {},
      Constants: {},
      Manager: 'AIRGoogleMapCalloutManager',
      NativeProps: {
        onPress: 'BOOL',
        tooltip: 'BOOL'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topPress: {
          phasedRegistrationNames: {
            bubbled: 'onPress',
            captured: 'onPressCapture'
          }
        }
      },
      directEventTypes: {}
    },
    AIRGoogleMapCircle: {
      Commands: {},
      Constants: {},
      Manager: 'AIRGoogleMapCircleManager',
      NativeProps: {
        center: 'CLLocationCoordinate2D',
        fillColor: 'UIColor',
        radius: 'double',
        strokeColor: 'UIColor',
        strokeWidth: 'double',
        zIndex: 'int'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    AIRGoogleMapMarker: {
      Commands: {
        hideCallout: 1,
        redraw: 2,
        showCallout: 0
      },
      Constants: {},
      Manager: 'AIRGoogleMapMarkerManager',
      NativeProps: {
        anchor: 'CGPoint',
        calloutAnchor: 'CGPoint',
        coordinate: 'CLLocationCoordinate2D',
        description: 'NSString',
        draggable: 'BOOL',
        identifier: 'NSString',
        image: 'NSString',
        onDrag: 'BOOL',
        onDragEnd: 'BOOL',
        onDragStart: 'BOOL',
        onPress: 'BOOL',
        opacity: 'double',
        pinColor: 'UIColor',
        rotation: 'CLLocationDegrees',
        title: 'NSString',
        tracksInfoWindowChanges: 'BOOL',
        tracksViewChanges: 'BOOL',
        zIndex: 'NSInteger'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topPress: {
          phasedRegistrationNames: {
            bubbled: 'onPress',
            captured: 'onPressCapture'
          }
        }
      },
      directEventTypes: {
        topDrag: {
          registrationName: 'onDrag'
        },
        topDragEnd: {
          registrationName: 'onDragEnd'
        },
        topDragStart: {
          registrationName: 'onDragStart'
        }
      }
    },
    AIRGoogleMapOverlay: {
      Commands: {},
      Constants: {},
      Manager: 'AIRGoogleMapOverlayManager',
      NativeProps: {
        bounds: 'NSArray',
        image: 'NSString'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    AIRGoogleMapPolygon: {
      Commands: {},
      Constants: {},
      Manager: 'AIRGoogleMapPolygonManager',
      NativeProps: {
        coordinates: 'ABI32_0_0AIRMapCoordinateArray',
        fillColor: 'UIColor',
        geodesic: 'BOOL',
        holes: 'ABI32_0_0AIRMapCoordinateArrayArray',
        onPress: 'BOOL',
        strokeColor: 'UIColor',
        strokeWidth: 'double',
        tappable: 'BOOL',
        zIndex: 'int'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topPress: {
          phasedRegistrationNames: {
            bubbled: 'onPress',
            captured: 'onPressCapture'
          }
        }
      },
      directEventTypes: {}
    },
    AIRGoogleMapPolyline: {
      Commands: {},
      Constants: {},
      Manager: 'AIRGoogleMapPolylineManager',
      NativeProps: {
        coordinates: 'ABI32_0_0AIRMapCoordinateArray',
        fillColor: 'UIColor',
        geodesic: 'BOOL',
        lineDashPattern: 'NSArray',
        onPress: 'BOOL',
        strokeColor: 'UIColor',
        strokeWidth: 'double',
        tappable: 'BOOL',
        zIndex: 'int'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topPress: {
          phasedRegistrationNames: {
            bubbled: 'onPress',
            captured: 'onPressCapture'
          }
        }
      },
      directEventTypes: {}
    },
    AIRGoogleMapUrlTile: {
      Commands: {},
      Constants: {},
      Manager: 'AIRGoogleMapUrlTileManager',
      NativeProps: {
        maximumZ: 'NSInteger',
        minimumZ: 'NSInteger',
        urlTemplate: 'NSString',
        zIndex: 'int'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    AIRMap: {
      Commands: {
        animateToBearing: 4,
        animateToCoordinate: 2,
        animateToNavigation: 0,
        animateToRegion: 1,
        animateToViewingAngle: 3,
        coordinateForPoint: 10,
        fitToCoordinates: 7,
        fitToElements: 5,
        fitToSuppliedMarkers: 6,
        pointForCoordinate: 9,
        takeSnapshot: 8
      },
      Constants: {},
      Manager: 'AIRMapManager',
      NativeProps: {
        cacheEnabled: 'BOOL',
        followsUserLocation: 'BOOL',
        handlePanDrag: 'BOOL',
        initialRegion: 'MKCoordinateRegion',
        kmlSrc: 'NSString',
        legalLabelInsets: 'UIEdgeInsets',
        loadingBackgroundColor: 'UIColor',
        loadingEnabled: 'BOOL',
        loadingIndicatorColor: 'UIColor',
        mapType: 'MKMapType',
        maxDelta: 'CGFloat',
        maxZoomLevel: 'CGFloat',
        minDelta: 'CGFloat',
        minZoomLevel: 'CGFloat',
        onCalloutPress: 'BOOL',
        onChange: 'BOOL',
        onLongPress: 'BOOL',
        onMapReady: 'BOOL',
        onMarkerDeselect: 'BOOL',
        onMarkerDrag: 'BOOL',
        onMarkerDragEnd: 'BOOL',
        onMarkerDragStart: 'BOOL',
        onMarkerPress: 'BOOL',
        onMarkerSelect: 'BOOL',
        onPanDrag: 'BOOL',
        onPress: 'BOOL',
        pitchEnabled: 'BOOL',
        region: 'MKCoordinateRegion',
        rotateEnabled: 'BOOL',
        scrollEnabled: 'BOOL',
        showsBuildings: 'BOOL',
        showsCompass: 'BOOL',
        showsPointsOfInterest: 'BOOL',
        showsScale: 'BOOL',
        showsTraffic: 'BOOL',
        showsUserLocation: 'BOOL',
        userLocationAnnotationTitle: 'NSString',
        zoomEnabled: 'BOOL'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topChange: {
          phasedRegistrationNames: {
            bubbled: 'onChange',
            captured: 'onChangeCapture'
          }
        },
        topLongPress: {
          phasedRegistrationNames: {
            bubbled: 'onLongPress',
            captured: 'onLongPressCapture'
          }
        },
        topMapReady: {
          phasedRegistrationNames: {
            bubbled: 'onMapReady',
            captured: 'onMapReadyCapture'
          }
        },
        topPanDrag: {
          phasedRegistrationNames: {
            bubbled: 'onPanDrag',
            captured: 'onPanDragCapture'
          }
        },
        topPress: {
          phasedRegistrationNames: {
            bubbled: 'onPress',
            captured: 'onPressCapture'
          }
        }
      },
      directEventTypes: {
        topCalloutPress: {
          registrationName: 'onCalloutPress'
        },
        topMarkerDeselect: {
          registrationName: 'onMarkerDeselect'
        },
        topMarkerDrag: {
          registrationName: 'onMarkerDrag'
        },
        topMarkerDragEnd: {
          registrationName: 'onMarkerDragEnd'
        },
        topMarkerDragStart: {
          registrationName: 'onMarkerDragStart'
        },
        topMarkerPress: {
          registrationName: 'onMarkerPress'
        },
        topMarkerSelect: {
          registrationName: 'onMarkerSelect'
        }
      }
    },
    AIRMapCallout: {
      Commands: {},
      Constants: {},
      Manager: 'AIRMapCalloutManager',
      NativeProps: {
        onPress: 'BOOL',
        tooltip: 'BOOL'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topPress: {
          phasedRegistrationNames: {
            bubbled: 'onPress',
            captured: 'onPressCapture'
          }
        }
      },
      directEventTypes: {}
    },
    AIRMapCircle: {
      Commands: {},
      Constants: {},
      Manager: 'AIRMapCircleManager',
      NativeProps: {
        center: 'CLLocationCoordinate2D',
        fillColor: 'UIColor',
        lineCap: 'CGLineCap',
        lineDashPattern: 'NSArray',
        lineDashPhase: 'CGFloat',
        lineJoin: 'CGLineJoin',
        miterLimit: 'CGFloat',
        radius: 'CLLocationDistance',
        strokeColor: 'UIColor',
        strokeWidth: 'CGFloat'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    AIRMapLocalTile: {
      Commands: {},
      Constants: {},
      Manager: 'AIRMapLocalTileManager',
      NativeProps: {
        pathTemplate: 'NSString',
        tileSize: 'CGFloat'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    AIRMapMarker: {
      Commands: {
        hideCallout: 1,
        showCallout: 0
      },
      Constants: {},
      Manager: 'AIRMapMarkerManager',
      NativeProps: {
        calloutOffset: 'CGPoint',
        centerOffset: 'CGPoint',
        coordinate: 'CLLocationCoordinate2D',
        description: 'NSString',
        draggable: 'BOOL',
        identifier: 'NSString',
        image: 'NSString',
        onCalloutPress: 'BOOL',
        onDeselect: 'BOOL',
        onDrag: 'BOOL',
        onDragEnd: 'BOOL',
        onDragStart: 'BOOL',
        onPress: 'BOOL',
        onSelect: 'BOOL',
        opacity: 'double',
        pinColor: 'UIColor',
        title: 'NSString',
        zIndex: 'NSInteger'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topPress: {
          phasedRegistrationNames: {
            bubbled: 'onPress',
            captured: 'onPressCapture'
          }
        }
      },
      directEventTypes: {
        topCalloutPress: {
          registrationName: 'onCalloutPress'
        },
        topDeselect: {
          registrationName: 'onDeselect'
        },
        topDrag: {
          registrationName: 'onDrag'
        },
        topDragEnd: {
          registrationName: 'onDragEnd'
        },
        topDragStart: {
          registrationName: 'onDragStart'
        },
        topSelect: {
          registrationName: 'onSelect'
        }
      }
    },
    AIRMapOverlay: {
      Commands: {},
      Constants: {},
      Manager: 'AIRMapOverlayManager',
      NativeProps: {
        bounds: 'NSArray',
        image: 'NSString'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    AIRMapPolygon: {
      Commands: {},
      Constants: {},
      Manager: 'AIRMapPolygonManager',
      NativeProps: {
        coordinates: 'ABI32_0_0AIRMapCoordinateArray',
        fillColor: 'UIColor',
        holes: 'ABI32_0_0AIRMapCoordinateArrayArray',
        lineCap: 'CGLineCap',
        lineDashPattern: 'NSArray',
        lineDashPhase: 'CGFloat',
        lineJoin: 'CGLineJoin',
        miterLimit: 'CGFloat',
        onPress: 'BOOL',
        strokeColor: 'UIColor',
        strokeWidth: 'CGFloat'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topPress: {
          phasedRegistrationNames: {
            bubbled: 'onPress',
            captured: 'onPressCapture'
          }
        }
      },
      directEventTypes: {}
    },
    AIRMapPolyline: {
      Commands: {},
      Constants: {},
      Manager: 'AIRMapPolylineManager',
      NativeProps: {
        coordinates: 'ABI32_0_0AIRMapCoordinateArray',
        lineCap: 'CGLineCap',
        lineDashPattern: 'NSArray',
        lineDashPhase: 'CGFloat',
        lineJoin: 'CGLineJoin',
        miterLimit: 'CGFloat',
        onPress: 'BOOL',
        strokeColor: 'UIColor',
        strokeColors: 'UIColorArray',
        strokeWidth: 'CGFloat'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topPress: {
          phasedRegistrationNames: {
            bubbled: 'onPress',
            captured: 'onPressCapture'
          }
        }
      },
      directEventTypes: {}
    },
    AIRMapUrlTile: {
      Commands: {},
      Constants: {},
      Manager: 'AIRMapUrlTileManager',
      NativeProps: {
        maximumZ: 'NSInteger',
        minimumZ: 'NSInteger',
        shouldReplaceMapContent: 'BOOL',
        urlTemplate: 'NSString'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    ARTGroup: {
      Commands: {},
      Constants: {},
      Manager: 'ARTGroupManager',
      NativeProps: {
        clipping: 'CGRect'
      },
      baseModuleName: 'ARTNode',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    ARTNode: {
      Commands: {},
      Constants: {},
      Manager: 'ARTNodeManager',
      NativeProps: {
        opacity: 'CGFloat',
        transform: 'CGAffineTransform'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    ARTRenderable: {
      Commands: {},
      Constants: {},
      Manager: 'ARTRenderableManager',
      NativeProps: {
        fill: 'ABI32_0_0ARTBrush',
        stroke: 'CGColor',
        strokeCap: 'CGLineCap',
        strokeDash: 'ABI32_0_0ARTCGFloatArray',
        strokeJoin: 'CGLineJoin',
        strokeWidth: 'CGFloat'
      },
      baseModuleName: 'ARTNode',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    ARTShape: {
      Commands: {},
      Constants: {},
      Manager: 'ARTShapeManager',
      NativeProps: {
        d: 'CGPath'
      },
      baseModuleName: 'ARTRenderable',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    ARTSurfaceView: {
      Commands: {},
      Constants: {},
      Manager: 'ARTSurfaceViewManager',
      NativeProps: {},
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    ARTText: {
      Commands: {},
      Constants: {},
      Manager: 'ARTTextManager',
      NativeProps: {
        alignment: 'CTTextAlignment',
        frame: 'ABI32_0_0ARTTextFrame'
      },
      baseModuleName: 'ARTRenderable',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    AdIconView: {
      Commands: {},
      Constants: {},
      Manager: 'AdIconViewManager',
      NativeProps: {},
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    CTKBannerView: {
      Commands: {},
      Constants: {},
      Manager: 'CTKBannerViewManager',
      NativeProps: {
        onAdError: 'BOOL',
        onAdPress: 'BOOL',
        placementId: 'NSString',
        size: 'NSNumber'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topAdError: {
          phasedRegistrationNames: {
            bubbled: 'onAdError',
            captured: 'onAdErrorCapture'
          }
        },
        topAdPress: {
          phasedRegistrationNames: {
            bubbled: 'onAdPress',
            captured: 'onAdPressCapture'
          }
        }
      },
      directEventTypes: {}
    },
    CTKNativeAd: {
      Commands: {
        disableAutoRefresh: 3,
        init: 1,
        registerViewsForInteraction: 0,
        setMediaCachePolicy: 2
      },
      Constants: {},
      Manager: 'CTKNativeAdManager',
      NativeProps: {
        adsManager: 'NSString',
        onAdLoaded: 'BOOL'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topAdLoaded: {
          phasedRegistrationNames: {
            bubbled: 'onAdLoaded',
            captured: 'onAdLoadedCapture'
          }
        }
      },
      directEventTypes: {}
    },
    EXViewManagerAdapter: {
      Commands: {},
      Constants: {},
      Manager: 'EXViewManagerAdapter',
      NativeProps: {
        proxiedProperties: 'NSDictionary'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    ExponentBlurView: {
      Commands: {},
      Constants: {},
      Manager: 'ExponentBlurViewManager',
      NativeProps: {
        intensity: 'NSNumber',
        tint: 'NSString'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    ExponentLinearGradient: {
      Commands: {},
      Constants: {},
      Manager: 'ExponentLinearGradientManager',
      NativeProps: {
        colors: 'NSArray',
        endPoint: 'CGPoint',
        locations: 'NSArray',
        startPoint: 'CGPoint'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    ExponentVideo: {
      Commands: {
        setFullscreen: 0
      },
      Constants: {
        ScaleAspectFill: 'AVLayerVideoGravityResizeAspectFill',
        ScaleAspectFit: 'AVLayerVideoGravityResizeAspect',
        ScaleNone: 'AVLayerVideoGravityResizeAspect',
        ScaleToFill: 'AVLayerVideoGravityResize'
      },
      Manager: 'ExponentVideoManager',
      NativeProps: {
        nativeResizeMode: 'NSString',
        onErrorNative: 'BOOL',
        onFullscreenUpdateNative: 'BOOL',
        onLoadNative: 'BOOL',
        onLoadStartNative: 'BOOL',
        onReadyForDisplayNative: 'BOOL',
        onStatusUpdateNative: 'BOOL',
        source: 'NSDictionary',
        status: 'NSDictionary',
        useNativeControls: 'BOOL'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {
        topErrorNative: {
          registrationName: 'onErrorNative'
        },
        topFullscreenUpdateNative: {
          registrationName: 'onFullscreenUpdateNative'
        },
        topLoadNative: {
          registrationName: 'onLoadNative'
        },
        topLoadStartNative: {
          registrationName: 'onLoadStartNative'
        },
        topReadyForDisplayNative: {
          registrationName: 'onReadyForDisplayNative'
        },
        topStatusUpdateNative: {
          registrationName: 'onStatusUpdateNative'
        }
      }
    },
    LottieAnimationView: {
      Commands: {
        play: 0,
        reset: 1
      },
      Constants: {
        VERSION: 1
      },
      Manager: 'LottieAnimationView',
      NativeProps: {
        loop: 'BOOL',
        progress: 'CGFloat',
        resizeMode: 'NSString',
        sourceJson: 'NSString',
        sourceName: 'NSString',
        speed: 'CGFloat'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    MediaView: {
      Commands: {},
      Constants: {},
      Manager: 'MediaViewManager',
      NativeProps: {},
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RCTActivityIndicatorView: {
      Commands: {},
      Constants: {},
      Manager: 'ActivityIndicatorViewManager',
      NativeProps: {
        animating: 'BOOL',
        color: 'UIColor',
        hidesWhenStopped: 'BOOL',
        size: 'UIActivityIndicatorViewStyle'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RCTBaseText: {
      Commands: {},
      Constants: {},
      Manager: 'BaseText',
      NativeProps: {
        allowFontScaling: 'BOOL',
        backgroundColor: 'UIColor',
        color: 'UIColor',
        fontFamily: 'NSString',
        fontSize: 'CGFloat',
        fontStyle: 'NSString',
        fontVariant: 'NSArray',
        fontWeight: 'NSString',
        isHighlighted: 'BOOL',
        letterSpacing: 'CGFloat',
        lineHeight: 'CGFloat',
        opacity: 'CGFloat',
        textAlign: 'NSTextAlignment',
        textDecorationColor: 'UIColor',
        textDecorationLine: 'ABI32_0_0RCTTextDecorationLineType',
        textDecorationStyle: 'NSUnderlineStyle',
        textShadowColor: 'UIColor',
        textShadowOffset: 'CGSize',
        textShadowRadius: 'CGFloat',
        textTransform: 'ABI32_0_0RCTTextTransform',
        writingDirection: 'NSWritingDirection'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RCTBaseTextInputView: {
      Commands: {},
      Constants: {},
      Manager: 'BaseTextInputViewManager',
      NativeProps: {
        autoCapitalize: 'UITextAutocapitalizationType',
        autoCorrect: 'UITextAutocorrectionType',
        blurOnSubmit: 'BOOL',
        caretHidden: 'BOOL',
        clearButtonMode: 'UITextFieldViewMode',
        clearTextOnFocus: 'BOOL',
        contextMenuHidden: 'BOOL',
        editable: 'BOOL',
        enablesReturnKeyAutomatically: 'BOOL',
        inputAccessoryViewID: 'NSString',
        keyboardAppearance: 'UIKeyboardAppearance',
        keyboardType: 'UIKeyboardType',
        maxLength: 'NSNumber',
        mostRecentEventCount: 'NSInteger',
        onChange: 'BOOL',
        onContentSizeChange: 'BOOL',
        onScroll: 'BOOL',
        onSelectionChange: 'BOOL',
        onTextInput: 'BOOL',
        placeholder: 'NSString',
        placeholderTextColor: 'UIColor',
        returnKeyType: 'UIReturnKeyType',
        scrollEnabled: 'BOOL',
        secureTextEntry: 'BOOL',
        selectTextOnFocus: 'BOOL',
        selection: 'ABI32_0_0RCTTextSelection',
        selectionColor: 'UIColor',
        spellCheck: 'UITextSpellCheckingType',
        text: 'NSString',
        textContentType: 'NSString'
      },
      baseModuleName: 'RCTBaseText',
      bubblingEventTypes: {
        topChange: {
          phasedRegistrationNames: {
            bubbled: 'onChange',
            captured: 'onChangeCapture'
          }
        },
        topContentSizeChange: {
          phasedRegistrationNames: {
            bubbled: 'onContentSizeChange',
            captured: 'onContentSizeChangeCapture'
          }
        }
      },
      directEventTypes: {
        topScroll: {
          registrationName: 'onScroll'
        },
        topSelectionChange: {
          registrationName: 'onSelectionChange'
        },
        topTextInput: {
          registrationName: 'onTextInput'
        }
      }
    },
    RCTDatePicker: {
      Commands: {},
      Constants: {},
      Manager: 'DatePickerManager',
      NativeProps: {
        date: 'NSDate',
        locale: 'NSLocale',
        maximumDate: 'NSDate',
        minimumDate: 'NSDate',
        minuteInterval: 'NSInteger',
        mode: 'UIDatePickerMode',
        onChange: 'BOOL',
        timeZoneOffsetInMinutes: 'NSTimeZone'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topChange: {
          phasedRegistrationNames: {
            bubbled: 'onChange',
            captured: 'onChangeCapture'
          }
        }
      },
      directEventTypes: {}
    },
    RCTImageView: {
      Commands: {
        getSize: 0,
        prefetchImage: 1
      },
      Constants: {},
      Manager: 'ImageViewManager',
      NativeProps: {
        blurRadius: 'CGFloat',
        capInsets: 'UIEdgeInsets',
        defaultSource: 'UIImage',
        onError: 'BOOL',
        onLoad: 'BOOL',
        onLoadEnd: 'BOOL',
        onLoadStart: 'BOOL',
        onPartialLoad: 'BOOL',
        onProgress: 'BOOL',
        resizeMode: 'ABI32_0_0RCTResizeMode',
        source: 'NSArray<ABI32_0_0RCTImageSource *>',
        tintColor: 'UIColor'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topBlur: {
          phasedRegistrationNames: {
            bubbled: 'onBlur',
            captured: 'onBlurCapture'
          }
        },
        topChange: {
          phasedRegistrationNames: {
            bubbled: 'onChange',
            captured: 'onChangeCapture'
          }
        },
        topEndEditing: {
          phasedRegistrationNames: {
            bubbled: 'onEndEditing',
            captured: 'onEndEditingCapture'
          }
        },
        topFocus: {
          phasedRegistrationNames: {
            bubbled: 'onFocus',
            captured: 'onFocusCapture'
          }
        },
        topKeyPress: {
          phasedRegistrationNames: {
            bubbled: 'onKeyPress',
            captured: 'onKeyPressCapture'
          }
        },
        topPress: {
          phasedRegistrationNames: {
            bubbled: 'onPress',
            captured: 'onPressCapture'
          }
        },
        topSubmitEditing: {
          phasedRegistrationNames: {
            bubbled: 'onSubmitEditing',
            captured: 'onSubmitEditingCapture'
          }
        },
        topTouchCancel: {
          phasedRegistrationNames: {
            bubbled: 'onTouchCancel',
            captured: 'onTouchCancelCapture'
          }
        },
        topTouchEnd: {
          phasedRegistrationNames: {
            bubbled: 'onTouchEnd',
            captured: 'onTouchEndCapture'
          }
        },
        topTouchMove: {
          phasedRegistrationNames: {
            bubbled: 'onTouchMove',
            captured: 'onTouchMoveCapture'
          }
        },
        topTouchStart: {
          phasedRegistrationNames: {
            bubbled: 'onTouchStart',
            captured: 'onTouchStartCapture'
          }
        }
      },
      directEventTypes: {
        onGestureHandlerEvent: {
          registrationName: 'onGestureHandlerEvent'
        },
        onGestureHandlerStateChange: {
          registrationName: 'onGestureHandlerStateChange'
        },
        topAccessibilityAction: {
          registrationName: 'onAccessibilityAction'
        },
        topAccessibilityTap: {
          registrationName: 'onAccessibilityTap'
        },
        topError: {
          registrationName: 'onError'
        },
        topLayout: {
          registrationName: 'onLayout'
        },
        topLoad: {
          registrationName: 'onLoad'
        },
        topLoadEnd: {
          registrationName: 'onLoadEnd'
        },
        topLoadStart: {
          registrationName: 'onLoadStart'
        },
        topMagicTap: {
          registrationName: 'onMagicTap'
        },
        topPartialLoad: {
          registrationName: 'onPartialLoad'
        },
        topProgress: {
          registrationName: 'onProgress'
        }
      },
      uiViewClassName: 'RCTImageView',
      validAttributes: {
        accessibilityActions: true,
        accessibilityElementsHidden: true,
        accessibilityHint: true,
        accessibilityIgnoresInvertColors: true,
        accessibilityLabel: true,
        accessibilityRole: true,
        accessibilityStates: true,
        accessibilityTraits: true,
        accessibilityViewIsModal: true,
        accessible: true,
        alignContent: true,
        alignItems: true,
        alignSelf: true,
        aspectRatio: true,
        backfaceVisibility: true,
        backgroundColor: {
          diff: null,
          process: processColor => {}
        },
        blurRadius: true,
        borderBottomColor: {
          diff: null,
          process: processColor => {}
        },
        borderBottomEndRadius: true,
        borderBottomLeftRadius: true,
        borderBottomRightRadius: true,
        borderBottomStartRadius: true,
        borderBottomWidth: true,
        borderColor: {
          diff: null,
          process: processColor => {}
        },
        borderEndColor: {
          diff: null,
          process: processColor => {}
        },
        borderEndWidth: true,
        borderLeftColor: {
          diff: null,
          process: processColor => {}
        },
        borderLeftWidth: true,
        borderRadius: true,
        borderRightColor: {
          diff: null,
          process: processColor => {}
        },
        borderRightWidth: true,
        borderStartColor: {
          diff: null,
          process: processColor => {}
        },
        borderStartWidth: true,
        borderStyle: true,
        borderTopColor: {
          diff: null,
          process: processColor => {}
        },
        borderTopEndRadius: true,
        borderTopLeftRadius: true,
        borderTopRightRadius: true,
        borderTopStartRadius: true,
        borderTopWidth: true,
        borderWidth: true,
        bottom: true,
        capInsets: {
          diff: insetsDiffer => {},
          process: null
        },
        defaultSource: {
          diff: null,
          process: resolveAssetSource => {}
        },
        direction: true,
        display: true,
        end: true,
        flex: true,
        flexBasis: true,
        flexDirection: true,
        flexGrow: true,
        flexShrink: true,
        flexWrap: true,
        height: true,
        hitSlop: {
          diff: insetsDiffer => {},
          process: null
        },
        justifyContent: true,
        left: true,
        margin: true,
        marginBottom: true,
        marginEnd: true,
        marginHorizontal: true,
        marginLeft: true,
        marginRight: true,
        marginStart: true,
        marginTop: true,
        marginVertical: true,
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true,
        nativeID: true,
        onAccessibilityAction: true,
        onAccessibilityTap: true,
        onError: true,
        onLayout: true,
        onLoad: true,
        onLoadEnd: true,
        onLoadStart: true,
        onMagicTap: true,
        onPartialLoad: true,
        onProgress: true,
        opacity: true,
        overflow: true,
        padding: true,
        paddingBottom: true,
        paddingEnd: true,
        paddingHorizontal: true,
        paddingLeft: true,
        paddingRight: true,
        paddingStart: true,
        paddingTop: true,
        paddingVertical: true,
        pointerEvents: true,
        position: true,
        removeClippedSubviews: true,
        resizeMode: true,
        right: true,
        shadowColor: {
          diff: null,
          process: processColor => {}
        },
        shadowOffset: {
          diff: sizesDiffer => {},
          process: null
        },
        shadowOpacity: true,
        shadowRadius: true,
        shouldRasterizeIOS: true,
        source: true,
        start: true,
        style: {
          alignContent: 'alignContent',
          alignItems: 'alignItems',
          alignSelf: 'alignSelf',
          aspectRatio: 'aspectRatio',
          backfaceVisibility: 'backfaceVisibility',
          backgroundColor: {
            process: processColor => {}
          },
          borderBottomColor: {
            process: processColor => {}
          },
          borderBottomEndRadius: 'borderBottomEndRadius',
          borderBottomLeftRadius: 'borderBottomLeftRadius',
          borderBottomRightRadius: 'borderBottomRightRadius',
          borderBottomStartRadius: 'borderBottomStartRadius',
          borderBottomWidth: 'borderBottomWidth',
          borderColor: {
            process: processColor => {}
          },
          borderEndColor: {
            process: processColor => {}
          },
          borderEndWidth: 'borderEndWidth',
          borderLeftColor: {
            process: processColor => {}
          },
          borderLeftWidth: 'borderLeftWidth',
          borderRadius: 'borderRadius',
          borderRightColor: {
            process: processColor => {}
          },
          borderRightWidth: 'borderRightWidth',
          borderStartColor: {
            process: processColor => {}
          },
          borderStartWidth: 'borderStartWidth',
          borderStyle: 'borderStyle',
          borderTopColor: {
            process: processColor => {}
          },
          borderTopEndRadius: 'borderTopEndRadius',
          borderTopLeftRadius: 'borderTopLeftRadius',
          borderTopRightRadius: 'borderTopRightRadius',
          borderTopStartRadius: 'borderTopStartRadius',
          borderTopWidth: 'borderTopWidth',
          borderWidth: 'borderWidth',
          bottom: 'bottom',
          color: {
            process: processColor => {}
          },
          decomposedMatrix: 'decomposedMatrix',
          direction: 'direction',
          display: 'display',
          elevation: 'elevation',
          end: 'end',
          flex: 'flex',
          flexBasis: 'flexBasis',
          flexDirection: 'flexDirection',
          flexGrow: 'flexGrow',
          flexShrink: 'flexShrink',
          flexWrap: 'flexWrap',
          fontFamily: {
            process: processFontFamily => {}
          },
          fontSize: 'fontSize',
          fontStyle: 'fontStyle',
          fontVariant: 'fontVariant',
          fontWeight: 'fontWeight',
          height: 'height',
          includeFontPadding: 'includeFontPadding',
          justifyContent: 'justifyContent',
          left: 'left',
          letterSpacing: 'letterSpacing',
          lineHeight: 'lineHeight',
          margin: 'margin',
          marginBottom: 'marginBottom',
          marginEnd: 'marginEnd',
          marginHorizontal: 'marginHorizontal',
          marginLeft: 'marginLeft',
          marginRight: 'marginRight',
          marginStart: 'marginStart',
          marginTop: 'marginTop',
          marginVertical: 'marginVertical',
          maxHeight: 'maxHeight',
          maxWidth: 'maxWidth',
          minHeight: 'minHeight',
          minWidth: 'minWidth',
          opacity: 'opacity',
          overflow: 'overflow',
          overlayColor: {
            process: processColor => {}
          },
          padding: 'padding',
          paddingBottom: 'paddingBottom',
          paddingEnd: 'paddingEnd',
          paddingHorizontal: 'paddingHorizontal',
          paddingLeft: 'paddingLeft',
          paddingRight: 'paddingRight',
          paddingStart: 'paddingStart',
          paddingTop: 'paddingTop',
          paddingVertical: 'paddingVertical',
          position: 'position',
          resizeMode: 'resizeMode',
          right: 'right',
          rotation: 'rotation',
          scaleX: 'scaleX',
          scaleY: 'scaleY',
          shadowColor: {
            process: processColor => {}
          },
          shadowOffset: {
            diff: sizesDiffer => {}
          },
          shadowOpacity: 'shadowOpacity',
          shadowRadius: 'shadowRadius',
          start: 'start',
          textAlign: 'textAlign',
          textAlignVertical: 'textAlignVertical',
          textDecorationColor: {
            process: processColor => {}
          },
          textDecorationLine: 'textDecorationLine',
          textDecorationStyle: 'textDecorationStyle',
          textShadowColor: {
            process: processColor => {}
          },
          textShadowOffset: 'textShadowOffset',
          textShadowRadius: 'textShadowRadius',
          textTransform: 'textTransform',
          tintColor: {
            process: processColor => {}
          },
          top: 'top',
          transform: {
            process: processTransform => {}
          },
          transformMatrix: 'transformMatrix',
          translateX: 'translateX',
          translateY: 'translateY',
          width: 'width',
          writingDirection: 'writingDirection',
          zIndex: 'zIndex'
        },
        testID: true,
        tintColor: {
          diff: null,
          process: processColor => {}
        },
        top: true,
        transform: {
          diff: matricesDiffer => {},
          process: null
        },
        width: true,
        zIndex: true
      }
    },
    RCTInputAccessoryView: {
      Commands: {},
      Constants: {},
      Manager: 'InputAccessoryViewManager',
      NativeProps: {
        backgroundColor: 'UIColor'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RCTMaskedView: {
      Commands: {},
      Constants: {},
      Manager: 'MaskedViewManager',
      NativeProps: {},
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RCTModalHostView: {
      Commands: {},
      Constants: {},
      Manager: 'ModalHostViewManager',
      NativeProps: {
        animationType: 'NSString',
        identifier: 'NSNumber',
        onOrientationChange: 'BOOL',
        onShow: 'BOOL',
        presentationStyle: 'UIModalPresentationStyle',
        supportedOrientations: 'NSArray',
        transparent: 'BOOL'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topBlur: {
          phasedRegistrationNames: {
            bubbled: 'onBlur',
            captured: 'onBlurCapture'
          }
        },
        topChange: {
          phasedRegistrationNames: {
            bubbled: 'onChange',
            captured: 'onChangeCapture'
          }
        },
        topEndEditing: {
          phasedRegistrationNames: {
            bubbled: 'onEndEditing',
            captured: 'onEndEditingCapture'
          }
        },
        topFocus: {
          phasedRegistrationNames: {
            bubbled: 'onFocus',
            captured: 'onFocusCapture'
          }
        },
        topKeyPress: {
          phasedRegistrationNames: {
            bubbled: 'onKeyPress',
            captured: 'onKeyPressCapture'
          }
        },
        topPress: {
          phasedRegistrationNames: {
            bubbled: 'onPress',
            captured: 'onPressCapture'
          }
        },
        topSubmitEditing: {
          phasedRegistrationNames: {
            bubbled: 'onSubmitEditing',
            captured: 'onSubmitEditingCapture'
          }
        },
        topTouchCancel: {
          phasedRegistrationNames: {
            bubbled: 'onTouchCancel',
            captured: 'onTouchCancelCapture'
          }
        },
        topTouchEnd: {
          phasedRegistrationNames: {
            bubbled: 'onTouchEnd',
            captured: 'onTouchEndCapture'
          }
        },
        topTouchMove: {
          phasedRegistrationNames: {
            bubbled: 'onTouchMove',
            captured: 'onTouchMoveCapture'
          }
        },
        topTouchStart: {
          phasedRegistrationNames: {
            bubbled: 'onTouchStart',
            captured: 'onTouchStartCapture'
          }
        }
      },
      directEventTypes: {
        onGestureHandlerEvent: {
          registrationName: 'onGestureHandlerEvent'
        },
        onGestureHandlerStateChange: {
          registrationName: 'onGestureHandlerStateChange'
        },
        topAccessibilityAction: {
          registrationName: 'onAccessibilityAction'
        },
        topAccessibilityTap: {
          registrationName: 'onAccessibilityTap'
        },
        topLayout: {
          registrationName: 'onLayout'
        },
        topMagicTap: {
          registrationName: 'onMagicTap'
        },
        topOrientationChange: {
          registrationName: 'onOrientationChange'
        },
        topShow: {
          registrationName: 'onShow'
        }
      },
      uiViewClassName: 'RCTModalHostView',
      validAttributes: {
        accessibilityActions: true,
        accessibilityElementsHidden: true,
        accessibilityHint: true,
        accessibilityIgnoresInvertColors: true,
        accessibilityLabel: true,
        accessibilityRole: true,
        accessibilityStates: true,
        accessibilityTraits: true,
        accessibilityViewIsModal: true,
        accessible: true,
        alignContent: true,
        alignItems: true,
        alignSelf: true,
        animationType: true,
        aspectRatio: true,
        backfaceVisibility: true,
        backgroundColor: {
          diff: null,
          process: processColor => {}
        },
        borderBottomColor: {
          diff: null,
          process: processColor => {}
        },
        borderBottomEndRadius: true,
        borderBottomLeftRadius: true,
        borderBottomRightRadius: true,
        borderBottomStartRadius: true,
        borderBottomWidth: true,
        borderColor: {
          diff: null,
          process: processColor => {}
        },
        borderEndColor: {
          diff: null,
          process: processColor => {}
        },
        borderEndWidth: true,
        borderLeftColor: {
          diff: null,
          process: processColor => {}
        },
        borderLeftWidth: true,
        borderRadius: true,
        borderRightColor: {
          diff: null,
          process: processColor => {}
        },
        borderRightWidth: true,
        borderStartColor: {
          diff: null,
          process: processColor => {}
        },
        borderStartWidth: true,
        borderStyle: true,
        borderTopColor: {
          diff: null,
          process: processColor => {}
        },
        borderTopEndRadius: true,
        borderTopLeftRadius: true,
        borderTopRightRadius: true,
        borderTopStartRadius: true,
        borderTopWidth: true,
        borderWidth: true,
        bottom: true,
        direction: true,
        display: true,
        end: true,
        flex: true,
        flexBasis: true,
        flexDirection: true,
        flexGrow: true,
        flexShrink: true,
        flexWrap: true,
        height: true,
        hitSlop: {
          diff: insetsDiffer => {},
          process: null
        },
        identifier: true,
        justifyContent: true,
        left: true,
        margin: true,
        marginBottom: true,
        marginEnd: true,
        marginHorizontal: true,
        marginLeft: true,
        marginRight: true,
        marginStart: true,
        marginTop: true,
        marginVertical: true,
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true,
        nativeID: true,
        onAccessibilityAction: true,
        onAccessibilityTap: true,
        onLayout: true,
        onMagicTap: true,
        onOrientationChange: true,
        onShow: true,
        opacity: true,
        overflow: true,
        padding: true,
        paddingBottom: true,
        paddingEnd: true,
        paddingHorizontal: true,
        paddingLeft: true,
        paddingRight: true,
        paddingStart: true,
        paddingTop: true,
        paddingVertical: true,
        pointerEvents: true,
        position: true,
        presentationStyle: true,
        removeClippedSubviews: true,
        right: true,
        shadowColor: {
          diff: null,
          process: processColor => {}
        },
        shadowOffset: {
          diff: sizesDiffer => {},
          process: null
        },
        shadowOpacity: true,
        shadowRadius: true,
        shouldRasterizeIOS: true,
        start: true,
        style: {
          alignContent: 'alignContent',
          alignItems: 'alignItems',
          alignSelf: 'alignSelf',
          aspectRatio: 'aspectRatio',
          backfaceVisibility: 'backfaceVisibility',
          backgroundColor: {
            process: processColor => {}
          },
          borderBottomColor: {
            process: processColor => {}
          },
          borderBottomEndRadius: 'borderBottomEndRadius',
          borderBottomLeftRadius: 'borderBottomLeftRadius',
          borderBottomRightRadius: 'borderBottomRightRadius',
          borderBottomStartRadius: 'borderBottomStartRadius',
          borderBottomWidth: 'borderBottomWidth',
          borderColor: {
            process: processColor => {}
          },
          borderEndColor: {
            process: processColor => {}
          },
          borderEndWidth: 'borderEndWidth',
          borderLeftColor: {
            process: processColor => {}
          },
          borderLeftWidth: 'borderLeftWidth',
          borderRadius: 'borderRadius',
          borderRightColor: {
            process: processColor => {}
          },
          borderRightWidth: 'borderRightWidth',
          borderStartColor: {
            process: processColor => {}
          },
          borderStartWidth: 'borderStartWidth',
          borderStyle: 'borderStyle',
          borderTopColor: {
            process: processColor => {}
          },
          borderTopEndRadius: 'borderTopEndRadius',
          borderTopLeftRadius: 'borderTopLeftRadius',
          borderTopRightRadius: 'borderTopRightRadius',
          borderTopStartRadius: 'borderTopStartRadius',
          borderTopWidth: 'borderTopWidth',
          borderWidth: 'borderWidth',
          bottom: 'bottom',
          color: {
            process: processColor => {}
          },
          decomposedMatrix: 'decomposedMatrix',
          direction: 'direction',
          display: 'display',
          elevation: 'elevation',
          end: 'end',
          flex: 'flex',
          flexBasis: 'flexBasis',
          flexDirection: 'flexDirection',
          flexGrow: 'flexGrow',
          flexShrink: 'flexShrink',
          flexWrap: 'flexWrap',
          fontFamily: {
            process: processFontFamily => {}
          },
          fontSize: 'fontSize',
          fontStyle: 'fontStyle',
          fontVariant: 'fontVariant',
          fontWeight: 'fontWeight',
          height: 'height',
          includeFontPadding: 'includeFontPadding',
          justifyContent: 'justifyContent',
          left: 'left',
          letterSpacing: 'letterSpacing',
          lineHeight: 'lineHeight',
          margin: 'margin',
          marginBottom: 'marginBottom',
          marginEnd: 'marginEnd',
          marginHorizontal: 'marginHorizontal',
          marginLeft: 'marginLeft',
          marginRight: 'marginRight',
          marginStart: 'marginStart',
          marginTop: 'marginTop',
          marginVertical: 'marginVertical',
          maxHeight: 'maxHeight',
          maxWidth: 'maxWidth',
          minHeight: 'minHeight',
          minWidth: 'minWidth',
          opacity: 'opacity',
          overflow: 'overflow',
          overlayColor: {
            process: processColor => {}
          },
          padding: 'padding',
          paddingBottom: 'paddingBottom',
          paddingEnd: 'paddingEnd',
          paddingHorizontal: 'paddingHorizontal',
          paddingLeft: 'paddingLeft',
          paddingRight: 'paddingRight',
          paddingStart: 'paddingStart',
          paddingTop: 'paddingTop',
          paddingVertical: 'paddingVertical',
          position: 'position',
          resizeMode: 'resizeMode',
          right: 'right',
          rotation: 'rotation',
          scaleX: 'scaleX',
          scaleY: 'scaleY',
          shadowColor: {
            process: processColor => {}
          },
          shadowOffset: {
            diff: sizesDiffer => {}
          },
          shadowOpacity: 'shadowOpacity',
          shadowRadius: 'shadowRadius',
          start: 'start',
          textAlign: 'textAlign',
          textAlignVertical: 'textAlignVertical',
          textDecorationColor: {
            process: processColor => {}
          },
          textDecorationLine: 'textDecorationLine',
          textDecorationStyle: 'textDecorationStyle',
          textShadowColor: {
            process: processColor => {}
          },
          textShadowOffset: 'textShadowOffset',
          textShadowRadius: 'textShadowRadius',
          textTransform: 'textTransform',
          tintColor: {
            process: processColor => {}
          },
          top: 'top',
          transform: {
            process: processTransform => {}
          },
          transformMatrix: 'transformMatrix',
          translateX: 'translateX',
          translateY: 'translateY',
          width: 'width',
          writingDirection: 'writingDirection',
          zIndex: 'zIndex'
        },
        supportedOrientations: true,
        testID: true,
        top: true,
        transform: {
          diff: matricesDiffer => {},
          process: null
        },
        transparent: true,
        width: true,
        zIndex: true
      }
    },
    RCTMultilineTextInputView: {
      Commands: {},
      Constants: {},
      Manager: 'MultilineTextInputViewManager',
      NativeProps: {
        dataDetectorTypes: 'UIDataDetectorTypes'
      },
      baseModuleName: 'RCTBaseTextInputView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RCTNavItem: {
      Commands: {},
      Constants: {},
      Manager: 'NavItemManager',
      NativeProps: {
        backButtonIcon: 'UIImage',
        backButtonTitle: 'NSString',
        barStyle: 'UIBarStyle',
        barTintColor: 'UIColor',
        leftButtonIcon: 'UIImage',
        leftButtonSystemIcon: 'UIBarButtonSystemItem',
        leftButtonTitle: 'NSString',
        navigationBarHidden: 'BOOL',
        onLeftButtonPress: 'BOOL',
        onRightButtonPress: 'BOOL',
        rightButtonIcon: 'UIImage',
        rightButtonSystemIcon: 'UIBarButtonSystemItem',
        rightButtonTitle: 'NSString',
        shadowHidden: 'BOOL',
        tintColor: 'UIColor',
        title: 'NSString',
        titleImage: 'UIImage',
        titleTextColor: 'UIColor',
        translucent: 'BOOL'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topLeftButtonPress: {
          phasedRegistrationNames: {
            bubbled: 'onLeftButtonPress',
            captured: 'onLeftButtonPressCapture'
          }
        },
        topRightButtonPress: {
          phasedRegistrationNames: {
            bubbled: 'onRightButtonPress',
            captured: 'onRightButtonPressCapture'
          }
        }
      },
      directEventTypes: {}
    },
    RCTNavigator: {
      Commands: {
        requestSchedulingJavaScriptNavigation: 0
      },
      Constants: {},
      Manager: 'NavigatorManager',
      NativeProps: {
        interactivePopGestureEnabled: 'BOOL',
        onNavigationComplete: 'BOOL',
        onNavigationProgress: 'BOOL',
        requestedTopOfStack: 'NSInteger'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topNavigationComplete: {
          phasedRegistrationNames: {
            bubbled: 'onNavigationComplete',
            captured: 'onNavigationCompleteCapture'
          }
        }
      },
      directEventTypes: {
        topNavigationProgress: {
          registrationName: 'onNavigationProgress'
        }
      }
    },
    RCTPicker: {
      Commands: {},
      Constants: {},
      Manager: 'PickerManager',
      NativeProps: {
        color: 'UIColor',
        fontFamily: 'NSString',
        fontSize: 'NSNumber',
        fontStyle: 'NSString',
        fontWeight: 'NSString',
        items: 'NSArray<NSDictionary *>',
        onChange: 'BOOL',
        selectedIndex: 'NSInteger',
        textAlign: 'NSTextAlignment'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topChange: {
          phasedRegistrationNames: {
            bubbled: 'onChange',
            captured: 'onChangeCapture'
          }
        }
      },
      directEventTypes: {}
    },
    RCTProgressView: {
      Commands: {},
      Constants: {},
      Manager: 'ProgressViewManager',
      NativeProps: {
        progress: 'float',
        progressImage: 'UIImage',
        progressTintColor: 'UIColor',
        progressViewStyle: 'UIProgressViewStyle',
        trackImage: 'UIImage',
        trackTintColor: 'UIColor'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RCTRawText: {
      Commands: {},
      Constants: {},
      Manager: 'RawText',
      NativeProps: {
        text: 'NSString'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RCTRefreshControl: {
      Commands: {},
      Constants: {},
      Manager: 'RefreshControlManager',
      NativeProps: {
        onRefresh: 'BOOL',
        refreshing: 'BOOL',
        tintColor: 'UIColor',
        title: 'NSString',
        titleColor: 'UIColor'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {
        topRefresh: {
          registrationName: 'onRefresh'
        }
      }
    },
    RCTSafeAreaView: {
      Commands: {},
      Constants: {},
      Manager: 'SafeAreaViewManager',
      NativeProps: {},
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RCTScrollContentView: {
      Commands: {},
      Constants: {},
      Manager: 'ScrollContentViewManager',
      NativeProps: {},
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topBlur: {
          phasedRegistrationNames: {
            bubbled: 'onBlur',
            captured: 'onBlurCapture'
          }
        },
        topChange: {
          phasedRegistrationNames: {
            bubbled: 'onChange',
            captured: 'onChangeCapture'
          }
        },
        topEndEditing: {
          phasedRegistrationNames: {
            bubbled: 'onEndEditing',
            captured: 'onEndEditingCapture'
          }
        },
        topFocus: {
          phasedRegistrationNames: {
            bubbled: 'onFocus',
            captured: 'onFocusCapture'
          }
        },
        topKeyPress: {
          phasedRegistrationNames: {
            bubbled: 'onKeyPress',
            captured: 'onKeyPressCapture'
          }
        },
        topPress: {
          phasedRegistrationNames: {
            bubbled: 'onPress',
            captured: 'onPressCapture'
          }
        },
        topSubmitEditing: {
          phasedRegistrationNames: {
            bubbled: 'onSubmitEditing',
            captured: 'onSubmitEditingCapture'
          }
        },
        topTouchCancel: {
          phasedRegistrationNames: {
            bubbled: 'onTouchCancel',
            captured: 'onTouchCancelCapture'
          }
        },
        topTouchEnd: {
          phasedRegistrationNames: {
            bubbled: 'onTouchEnd',
            captured: 'onTouchEndCapture'
          }
        },
        topTouchMove: {
          phasedRegistrationNames: {
            bubbled: 'onTouchMove',
            captured: 'onTouchMoveCapture'
          }
        },
        topTouchStart: {
          phasedRegistrationNames: {
            bubbled: 'onTouchStart',
            captured: 'onTouchStartCapture'
          }
        }
      },
      directEventTypes: {
        onGestureHandlerEvent: {
          registrationName: 'onGestureHandlerEvent'
        },
        onGestureHandlerStateChange: {
          registrationName: 'onGestureHandlerStateChange'
        },
        topAccessibilityAction: {
          registrationName: 'onAccessibilityAction'
        },
        topAccessibilityTap: {
          registrationName: 'onAccessibilityTap'
        },
        topLayout: {
          registrationName: 'onLayout'
        },
        topMagicTap: {
          registrationName: 'onMagicTap'
        }
      },
      uiViewClassName: 'RCTScrollContentView',
      validAttributes: {
        accessibilityActions: true,
        accessibilityElementsHidden: true,
        accessibilityHint: true,
        accessibilityIgnoresInvertColors: true,
        accessibilityLabel: true,
        accessibilityRole: true,
        accessibilityStates: true,
        accessibilityTraits: true,
        accessibilityViewIsModal: true,
        accessible: true,
        alignContent: true,
        alignItems: true,
        alignSelf: true,
        aspectRatio: true,
        backfaceVisibility: true,
        backgroundColor: {
          diff: null,
          process: processColor => {}
        },
        borderBottomColor: {
          diff: null,
          process: processColor => {}
        },
        borderBottomEndRadius: true,
        borderBottomLeftRadius: true,
        borderBottomRightRadius: true,
        borderBottomStartRadius: true,
        borderBottomWidth: true,
        borderColor: {
          diff: null,
          process: processColor => {}
        },
        borderEndColor: {
          diff: null,
          process: processColor => {}
        },
        borderEndWidth: true,
        borderLeftColor: {
          diff: null,
          process: processColor => {}
        },
        borderLeftWidth: true,
        borderRadius: true,
        borderRightColor: {
          diff: null,
          process: processColor => {}
        },
        borderRightWidth: true,
        borderStartColor: {
          diff: null,
          process: processColor => {}
        },
        borderStartWidth: true,
        borderStyle: true,
        borderTopColor: {
          diff: null,
          process: processColor => {}
        },
        borderTopEndRadius: true,
        borderTopLeftRadius: true,
        borderTopRightRadius: true,
        borderTopStartRadius: true,
        borderTopWidth: true,
        borderWidth: true,
        bottom: true,
        direction: true,
        display: true,
        end: true,
        flex: true,
        flexBasis: true,
        flexDirection: true,
        flexGrow: true,
        flexShrink: true,
        flexWrap: true,
        height: true,
        hitSlop: {
          diff: insetsDiffer => {},
          process: null
        },
        justifyContent: true,
        left: true,
        margin: true,
        marginBottom: true,
        marginEnd: true,
        marginHorizontal: true,
        marginLeft: true,
        marginRight: true,
        marginStart: true,
        marginTop: true,
        marginVertical: true,
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true,
        nativeID: true,
        onAccessibilityAction: true,
        onAccessibilityTap: true,
        onLayout: true,
        onMagicTap: true,
        opacity: true,
        overflow: true,
        padding: true,
        paddingBottom: true,
        paddingEnd: true,
        paddingHorizontal: true,
        paddingLeft: true,
        paddingRight: true,
        paddingStart: true,
        paddingTop: true,
        paddingVertical: true,
        pointerEvents: true,
        position: true,
        removeClippedSubviews: true,
        right: true,
        shadowColor: {
          diff: null,
          process: processColor => {}
        },
        shadowOffset: {
          diff: sizesDiffer => {},
          process: null
        },
        shadowOpacity: true,
        shadowRadius: true,
        shouldRasterizeIOS: true,
        start: true,
        style: {
          alignContent: 'alignContent',
          alignItems: 'alignItems',
          alignSelf: 'alignSelf',
          aspectRatio: 'aspectRatio',
          backfaceVisibility: 'backfaceVisibility',
          backgroundColor: {
            process: processColor => {}
          },
          borderBottomColor: {
            process: processColor => {}
          },
          borderBottomEndRadius: 'borderBottomEndRadius',
          borderBottomLeftRadius: 'borderBottomLeftRadius',
          borderBottomRightRadius: 'borderBottomRightRadius',
          borderBottomStartRadius: 'borderBottomStartRadius',
          borderBottomWidth: 'borderBottomWidth',
          borderColor: {
            process: processColor => {}
          },
          borderEndColor: {
            process: processColor => {}
          },
          borderEndWidth: 'borderEndWidth',
          borderLeftColor: {
            process: processColor => {}
          },
          borderLeftWidth: 'borderLeftWidth',
          borderRadius: 'borderRadius',
          borderRightColor: {
            process: processColor => {}
          },
          borderRightWidth: 'borderRightWidth',
          borderStartColor: {
            process: processColor => {}
          },
          borderStartWidth: 'borderStartWidth',
          borderStyle: 'borderStyle',
          borderTopColor: {
            process: processColor => {}
          },
          borderTopEndRadius: 'borderTopEndRadius',
          borderTopLeftRadius: 'borderTopLeftRadius',
          borderTopRightRadius: 'borderTopRightRadius',
          borderTopStartRadius: 'borderTopStartRadius',
          borderTopWidth: 'borderTopWidth',
          borderWidth: 'borderWidth',
          bottom: 'bottom',
          color: {
            process: processColor => {}
          },
          decomposedMatrix: 'decomposedMatrix',
          direction: 'direction',
          display: 'display',
          elevation: 'elevation',
          end: 'end',
          flex: 'flex',
          flexBasis: 'flexBasis',
          flexDirection: 'flexDirection',
          flexGrow: 'flexGrow',
          flexShrink: 'flexShrink',
          flexWrap: 'flexWrap',
          fontFamily: {
            process: processFontFamily => {}
          },
          fontSize: 'fontSize',
          fontStyle: 'fontStyle',
          fontVariant: 'fontVariant',
          fontWeight: 'fontWeight',
          height: 'height',
          includeFontPadding: 'includeFontPadding',
          justifyContent: 'justifyContent',
          left: 'left',
          letterSpacing: 'letterSpacing',
          lineHeight: 'lineHeight',
          margin: 'margin',
          marginBottom: 'marginBottom',
          marginEnd: 'marginEnd',
          marginHorizontal: 'marginHorizontal',
          marginLeft: 'marginLeft',
          marginRight: 'marginRight',
          marginStart: 'marginStart',
          marginTop: 'marginTop',
          marginVertical: 'marginVertical',
          maxHeight: 'maxHeight',
          maxWidth: 'maxWidth',
          minHeight: 'minHeight',
          minWidth: 'minWidth',
          opacity: 'opacity',
          overflow: 'overflow',
          overlayColor: {
            process: processColor => {}
          },
          padding: 'padding',
          paddingBottom: 'paddingBottom',
          paddingEnd: 'paddingEnd',
          paddingHorizontal: 'paddingHorizontal',
          paddingLeft: 'paddingLeft',
          paddingRight: 'paddingRight',
          paddingStart: 'paddingStart',
          paddingTop: 'paddingTop',
          paddingVertical: 'paddingVertical',
          position: 'position',
          resizeMode: 'resizeMode',
          right: 'right',
          rotation: 'rotation',
          scaleX: 'scaleX',
          scaleY: 'scaleY',
          shadowColor: {
            process: processColor => {}
          },
          shadowOffset: {
            diff: sizesDiffer => {}
          },
          shadowOpacity: 'shadowOpacity',
          shadowRadius: 'shadowRadius',
          start: 'start',
          textAlign: 'textAlign',
          textAlignVertical: 'textAlignVertical',
          textDecorationColor: {
            process: processColor => {}
          },
          textDecorationLine: 'textDecorationLine',
          textDecorationStyle: 'textDecorationStyle',
          textShadowColor: {
            process: processColor => {}
          },
          textShadowOffset: 'textShadowOffset',
          textShadowRadius: 'textShadowRadius',
          textTransform: 'textTransform',
          tintColor: {
            process: processColor => {}
          },
          top: 'top',
          transform: {
            process: processTransform => {}
          },
          transformMatrix: 'transformMatrix',
          translateX: 'translateX',
          translateY: 'translateY',
          width: 'width',
          writingDirection: 'writingDirection',
          zIndex: 'zIndex'
        },
        testID: true,
        top: true,
        transform: {
          diff: matricesDiffer => {},
          process: null
        },
        width: true,
        zIndex: true
      }
    },
    RCTScrollView: {
      Commands: {
        calculateChildFrames: 1,
        flashScrollIndicators: 5,
        getContentSize: 0,
        scrollTo: 2,
        scrollToEnd: 3,
        zoomToRect: 4
      },
      Constants: {},
      Manager: 'ScrollViewManager',
      NativeProps: {
        DEPRECATED_sendUpdatedChildFrames: 'BOOL',
        alwaysBounceHorizontal: 'BOOL',
        alwaysBounceVertical: 'BOOL',
        automaticallyAdjustContentInsets: 'BOOL',
        bounces: 'BOOL',
        bouncesZoom: 'BOOL',
        canCancelContentTouches: 'BOOL',
        centerContent: 'BOOL',
        contentInset: 'UIEdgeInsets',
        contentInsetAdjustmentBehavior:
          'UIScrollViewContentInsetAdjustmentBehavior',
        contentOffset: 'CGPoint',
        decelerationRate: 'CGFloat',
        directionalLockEnabled: 'BOOL',
        indicatorStyle: 'UIScrollViewIndicatorStyle',
        keyboardDismissMode: 'UIScrollViewKeyboardDismissMode',
        maintainVisibleContentPosition: 'NSDictionary',
        maximumZoomScale: 'CGFloat',
        minimumZoomScale: 'CGFloat',
        onMomentumScrollBegin: 'BOOL',
        onMomentumScrollEnd: 'BOOL',
        onScroll: 'BOOL',
        onScrollBeginDrag: 'BOOL',
        onScrollEndDrag: 'BOOL',
        overflow: 'ABI32_0_0YGOverflow',
        pagingEnabled: 'BOOL',
        pinchGestureEnabled: 'BOOL',
        scrollEnabled: 'BOOL',
        scrollEventThrottle: 'NSTimeInterval',
        scrollIndicatorInsets: 'UIEdgeInsets',
        scrollsToTop: 'BOOL',
        showsHorizontalScrollIndicator: 'BOOL',
        showsVerticalScrollIndicator: 'BOOL',
        snapToAlignment: 'NSString',
        snapToInterval: 'int',
        snapToOffsets: 'NSArray<NSNumber *>',
        zoomScale: 'CGFloat'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topBlur: {
          phasedRegistrationNames: {
            bubbled: 'onBlur',
            captured: 'onBlurCapture'
          }
        },
        topChange: {
          phasedRegistrationNames: {
            bubbled: 'onChange',
            captured: 'onChangeCapture'
          }
        },
        topEndEditing: {
          phasedRegistrationNames: {
            bubbled: 'onEndEditing',
            captured: 'onEndEditingCapture'
          }
        },
        topFocus: {
          phasedRegistrationNames: {
            bubbled: 'onFocus',
            captured: 'onFocusCapture'
          }
        },
        topKeyPress: {
          phasedRegistrationNames: {
            bubbled: 'onKeyPress',
            captured: 'onKeyPressCapture'
          }
        },
        topPress: {
          phasedRegistrationNames: {
            bubbled: 'onPress',
            captured: 'onPressCapture'
          }
        },
        topSubmitEditing: {
          phasedRegistrationNames: {
            bubbled: 'onSubmitEditing',
            captured: 'onSubmitEditingCapture'
          }
        },
        topTouchCancel: {
          phasedRegistrationNames: {
            bubbled: 'onTouchCancel',
            captured: 'onTouchCancelCapture'
          }
        },
        topTouchEnd: {
          phasedRegistrationNames: {
            bubbled: 'onTouchEnd',
            captured: 'onTouchEndCapture'
          }
        },
        topTouchMove: {
          phasedRegistrationNames: {
            bubbled: 'onTouchMove',
            captured: 'onTouchMoveCapture'
          }
        },
        topTouchStart: {
          phasedRegistrationNames: {
            bubbled: 'onTouchStart',
            captured: 'onTouchStartCapture'
          }
        }
      },
      directEventTypes: {
        onGestureHandlerEvent: {
          registrationName: 'onGestureHandlerEvent'
        },
        onGestureHandlerStateChange: {
          registrationName: 'onGestureHandlerStateChange'
        },
        topAccessibilityAction: {
          registrationName: 'onAccessibilityAction'
        },
        topAccessibilityTap: {
          registrationName: 'onAccessibilityTap'
        },
        topLayout: {
          registrationName: 'onLayout'
        },
        topMagicTap: {
          registrationName: 'onMagicTap'
        },
        topMomentumScrollBegin: {
          registrationName: 'onMomentumScrollBegin'
        },
        topMomentumScrollEnd: {
          registrationName: 'onMomentumScrollEnd'
        },
        topScroll: {
          registrationName: 'onScroll'
        },
        topScrollBeginDrag: {
          registrationName: 'onScrollBeginDrag'
        },
        topScrollEndDrag: {
          registrationName: 'onScrollEndDrag'
        }
      },
      uiViewClassName: 'RCTScrollView',
      validAttributes: {
        DEPRECATED_sendUpdatedChildFrames: true,
        accessibilityActions: true,
        accessibilityElementsHidden: true,
        accessibilityHint: true,
        accessibilityIgnoresInvertColors: true,
        accessibilityLabel: true,
        accessibilityRole: true,
        accessibilityStates: true,
        accessibilityTraits: true,
        accessibilityViewIsModal: true,
        accessible: true,
        alignContent: true,
        alignItems: true,
        alignSelf: true,
        alwaysBounceHorizontal: true,
        alwaysBounceVertical: true,
        aspectRatio: true,
        automaticallyAdjustContentInsets: true,
        backfaceVisibility: true,
        backgroundColor: {
          diff: null,
          process: processColor => {}
        },
        borderBottomColor: {
          diff: null,
          process: processColor => {}
        },
        borderBottomEndRadius: true,
        borderBottomLeftRadius: true,
        borderBottomRightRadius: true,
        borderBottomStartRadius: true,
        borderBottomWidth: true,
        borderColor: {
          diff: null,
          process: processColor => {}
        },
        borderEndColor: {
          diff: null,
          process: processColor => {}
        },
        borderEndWidth: true,
        borderLeftColor: {
          diff: null,
          process: processColor => {}
        },
        borderLeftWidth: true,
        borderRadius: true,
        borderRightColor: {
          diff: null,
          process: processColor => {}
        },
        borderRightWidth: true,
        borderStartColor: {
          diff: null,
          process: processColor => {}
        },
        borderStartWidth: true,
        borderStyle: true,
        borderTopColor: {
          diff: null,
          process: processColor => {}
        },
        borderTopEndRadius: true,
        borderTopLeftRadius: true,
        borderTopRightRadius: true,
        borderTopStartRadius: true,
        borderTopWidth: true,
        borderWidth: true,
        bottom: true,
        bounces: true,
        bouncesZoom: true,
        canCancelContentTouches: true,
        centerContent: true,
        contentInset: {
          diff: insetsDiffer => {},
          process: null
        },
        contentInsetAdjustmentBehavior: true,
        contentOffset: {
          diff: pointsDiffer => {},
          process: null
        },
        decelerationRate: true,
        direction: true,
        directionalLockEnabled: true,
        display: true,
        end: true,
        flex: true,
        flexBasis: true,
        flexDirection: true,
        flexGrow: true,
        flexShrink: true,
        flexWrap: true,
        height: true,
        hitSlop: {
          diff: insetsDiffer => {},
          process: null
        },
        indicatorStyle: true,
        justifyContent: true,
        keyboardDismissMode: true,
        left: true,
        maintainVisibleContentPosition: true,
        margin: true,
        marginBottom: true,
        marginEnd: true,
        marginHorizontal: true,
        marginLeft: true,
        marginRight: true,
        marginStart: true,
        marginTop: true,
        marginVertical: true,
        maxHeight: true,
        maxWidth: true,
        maximumZoomScale: true,
        minHeight: true,
        minWidth: true,
        minimumZoomScale: true,
        nativeID: true,
        onAccessibilityAction: true,
        onAccessibilityTap: true,
        onLayout: true,
        onMagicTap: true,
        onMomentumScrollBegin: true,
        onMomentumScrollEnd: true,
        onScroll: true,
        onScrollBeginDrag: true,
        onScrollEndDrag: true,
        opacity: true,
        overflow: true,
        padding: true,
        paddingBottom: true,
        paddingEnd: true,
        paddingHorizontal: true,
        paddingLeft: true,
        paddingRight: true,
        paddingStart: true,
        paddingTop: true,
        paddingVertical: true,
        pagingEnabled: true,
        pinchGestureEnabled: true,
        pointerEvents: true,
        position: true,
        removeClippedSubviews: true,
        right: true,
        scrollEnabled: true,
        scrollEventThrottle: true,
        scrollIndicatorInsets: {
          diff: insetsDiffer => {},
          process: null
        },
        scrollsToTop: true,
        shadowColor: {
          diff: null,
          process: processColor => {}
        },
        shadowOffset: {
          diff: sizesDiffer => {},
          process: null
        },
        shadowOpacity: true,
        shadowRadius: true,
        shouldRasterizeIOS: true,
        showsHorizontalScrollIndicator: true,
        showsVerticalScrollIndicator: true,
        snapToAlignment: true,
        snapToInterval: true,
        snapToOffsets: true,
        start: true,
        style: {
          alignContent: 'alignContent',
          alignItems: 'alignItems',
          alignSelf: 'alignSelf',
          aspectRatio: 'aspectRatio',
          backfaceVisibility: 'backfaceVisibility',
          backgroundColor: {
            process: processColor => {}
          },
          borderBottomColor: {
            process: processColor => {}
          },
          borderBottomEndRadius: 'borderBottomEndRadius',
          borderBottomLeftRadius: 'borderBottomLeftRadius',
          borderBottomRightRadius: 'borderBottomRightRadius',
          borderBottomStartRadius: 'borderBottomStartRadius',
          borderBottomWidth: 'borderBottomWidth',
          borderColor: {
            process: processColor => {}
          },
          borderEndColor: {
            process: processColor => {}
          },
          borderEndWidth: 'borderEndWidth',
          borderLeftColor: {
            process: processColor => {}
          },
          borderLeftWidth: 'borderLeftWidth',
          borderRadius: 'borderRadius',
          borderRightColor: {
            process: processColor => {}
          },
          borderRightWidth: 'borderRightWidth',
          borderStartColor: {
            process: processColor => {}
          },
          borderStartWidth: 'borderStartWidth',
          borderStyle: 'borderStyle',
          borderTopColor: {
            process: processColor => {}
          },
          borderTopEndRadius: 'borderTopEndRadius',
          borderTopLeftRadius: 'borderTopLeftRadius',
          borderTopRightRadius: 'borderTopRightRadius',
          borderTopStartRadius: 'borderTopStartRadius',
          borderTopWidth: 'borderTopWidth',
          borderWidth: 'borderWidth',
          bottom: 'bottom',
          color: {
            process: processColor => {}
          },
          decomposedMatrix: 'decomposedMatrix',
          direction: 'direction',
          display: 'display',
          elevation: 'elevation',
          end: 'end',
          flex: 'flex',
          flexBasis: 'flexBasis',
          flexDirection: 'flexDirection',
          flexGrow: 'flexGrow',
          flexShrink: 'flexShrink',
          flexWrap: 'flexWrap',
          fontFamily: {
            process: processFontFamily => {}
          },
          fontSize: 'fontSize',
          fontStyle: 'fontStyle',
          fontVariant: 'fontVariant',
          fontWeight: 'fontWeight',
          height: 'height',
          includeFontPadding: 'includeFontPadding',
          justifyContent: 'justifyContent',
          left: 'left',
          letterSpacing: 'letterSpacing',
          lineHeight: 'lineHeight',
          margin: 'margin',
          marginBottom: 'marginBottom',
          marginEnd: 'marginEnd',
          marginHorizontal: 'marginHorizontal',
          marginLeft: 'marginLeft',
          marginRight: 'marginRight',
          marginStart: 'marginStart',
          marginTop: 'marginTop',
          marginVertical: 'marginVertical',
          maxHeight: 'maxHeight',
          maxWidth: 'maxWidth',
          minHeight: 'minHeight',
          minWidth: 'minWidth',
          opacity: 'opacity',
          overflow: 'overflow',
          overlayColor: {
            process: processColor => {}
          },
          padding: 'padding',
          paddingBottom: 'paddingBottom',
          paddingEnd: 'paddingEnd',
          paddingHorizontal: 'paddingHorizontal',
          paddingLeft: 'paddingLeft',
          paddingRight: 'paddingRight',
          paddingStart: 'paddingStart',
          paddingTop: 'paddingTop',
          paddingVertical: 'paddingVertical',
          position: 'position',
          resizeMode: 'resizeMode',
          right: 'right',
          rotation: 'rotation',
          scaleX: 'scaleX',
          scaleY: 'scaleY',
          shadowColor: {
            process: processColor => {}
          },
          shadowOffset: {
            diff: sizesDiffer => {}
          },
          shadowOpacity: 'shadowOpacity',
          shadowRadius: 'shadowRadius',
          start: 'start',
          textAlign: 'textAlign',
          textAlignVertical: 'textAlignVertical',
          textDecorationColor: {
            process: processColor => {}
          },
          textDecorationLine: 'textDecorationLine',
          textDecorationStyle: 'textDecorationStyle',
          textShadowColor: {
            process: processColor => {}
          },
          textShadowOffset: 'textShadowOffset',
          textShadowRadius: 'textShadowRadius',
          textTransform: 'textTransform',
          tintColor: {
            process: processColor => {}
          },
          top: 'top',
          transform: {
            process: processTransform => {}
          },
          transformMatrix: 'transformMatrix',
          translateX: 'translateX',
          translateY: 'translateY',
          width: 'width',
          writingDirection: 'writingDirection',
          zIndex: 'zIndex'
        },
        testID: true,
        top: true,
        transform: {
          diff: matricesDiffer => {},
          process: null
        },
        width: true,
        zIndex: true,
        zoomScale: true
      }
    },
    RCTSegmentedControl: {
      Commands: {},
      Constants: {},
      Manager: 'SegmentedControlManager',
      NativeProps: {
        enabled: 'BOOL',
        momentary: 'BOOL',
        onChange: 'BOOL',
        selectedIndex: 'NSInteger',
        tintColor: 'UIColor',
        values: 'NSArray<NSString *>'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topChange: {
          phasedRegistrationNames: {
            bubbled: 'onChange',
            captured: 'onChangeCapture'
          }
        }
      },
      directEventTypes: {}
    },
    RCTSinglelineTextInputView: {
      Commands: {},
      Constants: {},
      Manager: 'SinglelineTextInputViewManager',
      NativeProps: {},
      baseModuleName: 'RCTBaseTextInputView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RCTSlider: {
      Commands: {},
      Constants: {},
      Manager: 'SliderManager',
      NativeProps: {
        disabled: 'BOOL',
        maximumTrackImage: 'UIImage',
        maximumTrackTintColor: 'UIColor',
        maximumValue: 'float',
        minimumTrackImage: 'UIImage',
        minimumTrackTintColor: 'UIColor',
        minimumValue: 'float',
        onSlidingComplete: 'BOOL',
        onValueChange: 'BOOL',
        step: 'float',
        thumbImage: 'UIImage',
        trackImage: 'UIImage',
        value: 'float'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topSlidingComplete: {
          phasedRegistrationNames: {
            bubbled: 'onSlidingComplete',
            captured: 'onSlidingCompleteCapture'
          }
        },
        topValueChange: {
          phasedRegistrationNames: {
            bubbled: 'onValueChange',
            captured: 'onValueChangeCapture'
          }
        }
      },
      directEventTypes: {}
    },
    RCTSwitch: {
      Commands: {},
      Constants: {},
      Manager: 'SwitchManager',
      NativeProps: {
        disabled: 'BOOL',
        onChange: 'BOOL',
        onTintColor: 'UIColor',
        thumbTintColor: 'UIColor',
        tintColor: 'UIColor',
        value: 'BOOL'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topChange: {
          phasedRegistrationNames: {
            bubbled: 'onChange',
            captured: 'onChangeCapture'
          }
        }
      },
      directEventTypes: {}
    },
    RCTTabBar: {
      Commands: {},
      Constants: {},
      Manager: 'TabBarManager',
      NativeProps: {
        barStyle: 'UIBarStyle',
        barTintColor: 'UIColor',
        itemPositioning: 'UITabBarItemPositioning',
        tintColor: 'UIColor',
        translucent: 'BOOL',
        unselectedItemTintColor: 'UIColor',
        unselectedTintColor: 'UIColor'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RCTTabBarItem: {
      Commands: {},
      Constants: {},
      Manager: 'TabBarItemManager',
      NativeProps: {
        badge: 'id',
        badgeColor: 'UIColor',
        icon: 'UIImage',
        isTVSelectable: 'BOOL',
        onPress: 'BOOL',
        renderAsOriginal: 'BOOL',
        selected: 'BOOL',
        selectedIcon: 'UIImage',
        systemIcon: 'UITabBarSystemItem',
        testID: 'NSString',
        title: 'NSString'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {
        topPress: {
          phasedRegistrationNames: {
            bubbled: 'onPress',
            captured: 'onPressCapture'
          }
        }
      },
      directEventTypes: {}
    },
    RCTText: {
      Commands: {},
      Constants: {},
      Manager: 'Text',
      NativeProps: {
        adjustsFontSizeToFit: 'BOOL',
        ellipsizeMode: 'NSLineBreakMode',
        minimumFontScale: 'CGFloat',
        numberOfLines: 'NSInteger',
        selectable: 'BOOL'
      },
      baseModuleName: 'RCTBaseText',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RCTView: {
      Commands: {},
      Constants: {},
      Manager: 'ViewManager',
      NativeProps: {
        accessibilityActions: 'NSString',
        accessibilityElementsHidden: 'BOOL',
        accessibilityHint: 'NSString',
        accessibilityIgnoresInvertColors: 'BOOL',
        accessibilityLabel: 'NSString',
        accessibilityRole: 'UIAccessibilityTraits',
        accessibilityStates: 'UIAccessibilityTraits',
        accessibilityTraits: 'UIAccessibilityTraits',
        accessibilityViewIsModal: 'BOOL',
        accessible: 'BOOL',
        alignContent: 'ABI32_0_0YGAlign',
        alignItems: 'ABI32_0_0YGAlign',
        alignSelf: 'ABI32_0_0YGAlign',
        aspectRatio: 'float',
        backfaceVisibility: 'css_backface_visibility_t',
        backgroundColor: 'UIColor',
        borderBottomColor: 'UIColor',
        borderBottomEndRadius: 'CGFloat',
        borderBottomLeftRadius: 'CGFloat',
        borderBottomRightRadius: 'CGFloat',
        borderBottomStartRadius: 'CGFloat',
        borderBottomWidth: 'float',
        borderColor: 'CGColor',
        borderEndColor: 'UIColor',
        borderEndWidth: 'float',
        borderLeftColor: 'UIColor',
        borderLeftWidth: 'float',
        borderRadius: 'CGFloat',
        borderRightColor: 'UIColor',
        borderRightWidth: 'float',
        borderStartColor: 'UIColor',
        borderStartWidth: 'float',
        borderStyle: 'ABI32_0_0RCTBorderStyle',
        borderTopColor: 'UIColor',
        borderTopEndRadius: 'CGFloat',
        borderTopLeftRadius: 'CGFloat',
        borderTopRightRadius: 'CGFloat',
        borderTopStartRadius: 'CGFloat',
        borderTopWidth: 'float',
        borderWidth: 'float',
        bottom: 'ABI32_0_0YGValue',
        direction: 'ABI32_0_0YGDirection',
        display: 'ABI32_0_0YGDisplay',
        end: 'ABI32_0_0YGValue',
        flex: 'float',
        flexBasis: 'ABI32_0_0YGValue',
        flexDirection: 'ABI32_0_0YGFlexDirection',
        flexGrow: 'float',
        flexShrink: 'float',
        flexWrap: 'ABI32_0_0YGWrap',
        height: 'ABI32_0_0YGValue',
        hitSlop: 'UIEdgeInsets',
        justifyContent: 'ABI32_0_0YGJustify',
        left: 'ABI32_0_0YGValue',
        margin: 'ABI32_0_0YGValue',
        marginBottom: 'ABI32_0_0YGValue',
        marginEnd: 'ABI32_0_0YGValue',
        marginHorizontal: 'ABI32_0_0YGValue',
        marginLeft: 'ABI32_0_0YGValue',
        marginRight: 'ABI32_0_0YGValue',
        marginStart: 'ABI32_0_0YGValue',
        marginTop: 'ABI32_0_0YGValue',
        marginVertical: 'ABI32_0_0YGValue',
        maxHeight: 'ABI32_0_0YGValue',
        maxWidth: 'ABI32_0_0YGValue',
        minHeight: 'ABI32_0_0YGValue',
        minWidth: 'ABI32_0_0YGValue',
        nativeID: 'NSString',
        onAccessibilityAction: 'BOOL',
        onAccessibilityTap: 'BOOL',
        onLayout: 'BOOL',
        onMagicTap: 'BOOL',
        opacity: 'CGFloat',
        overflow: 'ABI32_0_0YGOverflow',
        padding: 'ABI32_0_0YGValue',
        paddingBottom: 'ABI32_0_0YGValue',
        paddingEnd: 'ABI32_0_0YGValue',
        paddingHorizontal: 'ABI32_0_0YGValue',
        paddingLeft: 'ABI32_0_0YGValue',
        paddingRight: 'ABI32_0_0YGValue',
        paddingStart: 'ABI32_0_0YGValue',
        paddingTop: 'ABI32_0_0YGValue',
        paddingVertical: 'ABI32_0_0YGValue',
        pointerEvents: 'ABI32_0_0RCTPointerEvents',
        position: 'ABI32_0_0YGPositionType',
        removeClippedSubviews: 'BOOL',
        right: 'ABI32_0_0YGValue',
        shadowColor: 'CGColor',
        shadowOffset: 'CGSize',
        shadowOpacity: 'float',
        shadowRadius: 'CGFloat',
        shouldRasterizeIOS: 'BOOL',
        start: 'ABI32_0_0YGValue',
        testID: 'NSString',
        top: 'ABI32_0_0YGValue',
        transform: 'CATransform3D',
        width: 'ABI32_0_0YGValue',
        zIndex: 'NSInteger'
      },
      baseModuleName: null,
      bubblingEventTypes: {
        topBlur: {
          phasedRegistrationNames: {
            bubbled: 'onBlur',
            captured: 'onBlurCapture'
          }
        },
        topChange: {
          phasedRegistrationNames: {
            bubbled: 'onChange',
            captured: 'onChangeCapture'
          }
        },
        topEndEditing: {
          phasedRegistrationNames: {
            bubbled: 'onEndEditing',
            captured: 'onEndEditingCapture'
          }
        },
        topFocus: {
          phasedRegistrationNames: {
            bubbled: 'onFocus',
            captured: 'onFocusCapture'
          }
        },
        topKeyPress: {
          phasedRegistrationNames: {
            bubbled: 'onKeyPress',
            captured: 'onKeyPressCapture'
          }
        },
        topPress: {
          phasedRegistrationNames: {
            bubbled: 'onPress',
            captured: 'onPressCapture'
          }
        },
        topSubmitEditing: {
          phasedRegistrationNames: {
            bubbled: 'onSubmitEditing',
            captured: 'onSubmitEditingCapture'
          }
        },
        topTouchCancel: {
          phasedRegistrationNames: {
            bubbled: 'onTouchCancel',
            captured: 'onTouchCancelCapture'
          }
        },
        topTouchEnd: {
          phasedRegistrationNames: {
            bubbled: 'onTouchEnd',
            captured: 'onTouchEndCapture'
          }
        },
        topTouchMove: {
          phasedRegistrationNames: {
            bubbled: 'onTouchMove',
            captured: 'onTouchMoveCapture'
          }
        },
        topTouchStart: {
          phasedRegistrationNames: {
            bubbled: 'onTouchStart',
            captured: 'onTouchStartCapture'
          }
        }
      },
      directEventTypes: {
        onGestureHandlerEvent: {
          registrationName: 'onGestureHandlerEvent'
        },
        onGestureHandlerStateChange: {
          registrationName: 'onGestureHandlerStateChange'
        },
        topAccessibilityAction: {
          registrationName: 'onAccessibilityAction'
        },
        topAccessibilityTap: {
          registrationName: 'onAccessibilityTap'
        },
        topLayout: {
          registrationName: 'onLayout'
        },
        topMagicTap: {
          registrationName: 'onMagicTap'
        }
      },
      uiViewClassName: 'RCTView',
      validAttributes: {
        accessibilityActions: true,
        accessibilityElementsHidden: true,
        accessibilityHint: true,
        accessibilityIgnoresInvertColors: true,
        accessibilityLabel: true,
        accessibilityRole: true,
        accessibilityStates: true,
        accessibilityTraits: true,
        accessibilityViewIsModal: true,
        accessible: true,
        alignContent: true,
        alignItems: true,
        alignSelf: true,
        aspectRatio: true,
        backfaceVisibility: true,
        backgroundColor: {
          diff: null,
          process: processColor => {}
        },
        borderBottomColor: {
          diff: null,
          process: processColor => {}
        },
        borderBottomEndRadius: true,
        borderBottomLeftRadius: true,
        borderBottomRightRadius: true,
        borderBottomStartRadius: true,
        borderBottomWidth: true,
        borderColor: {
          diff: null,
          process: processColor => {}
        },
        borderEndColor: {
          diff: null,
          process: processColor => {}
        },
        borderEndWidth: true,
        borderLeftColor: {
          diff: null,
          process: processColor => {}
        },
        borderLeftWidth: true,
        borderRadius: true,
        borderRightColor: {
          diff: null,
          process: processColor => {}
        },
        borderRightWidth: true,
        borderStartColor: {
          diff: null,
          process: processColor => {}
        },
        borderStartWidth: true,
        borderStyle: true,
        borderTopColor: {
          diff: null,
          process: processColor => {}
        },
        borderTopEndRadius: true,
        borderTopLeftRadius: true,
        borderTopRightRadius: true,
        borderTopStartRadius: true,
        borderTopWidth: true,
        borderWidth: true,
        bottom: true,
        direction: true,
        display: true,
        end: true,
        flex: true,
        flexBasis: true,
        flexDirection: true,
        flexGrow: true,
        flexShrink: true,
        flexWrap: true,
        height: true,
        hitSlop: {
          diff: insetsDiffer => {},
          process: null
        },
        justifyContent: true,
        left: true,
        margin: true,
        marginBottom: true,
        marginEnd: true,
        marginHorizontal: true,
        marginLeft: true,
        marginRight: true,
        marginStart: true,
        marginTop: true,
        marginVertical: true,
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true,
        nativeID: true,
        onAccessibilityAction: true,
        onAccessibilityTap: true,
        onLayout: true,
        onMagicTap: true,
        opacity: true,
        overflow: true,
        padding: true,
        paddingBottom: true,
        paddingEnd: true,
        paddingHorizontal: true,
        paddingLeft: true,
        paddingRight: true,
        paddingStart: true,
        paddingTop: true,
        paddingVertical: true,
        pointerEvents: true,
        position: true,
        removeClippedSubviews: true,
        right: true,
        shadowColor: {
          diff: null,
          process: processColor => {}
        },
        shadowOffset: {
          diff: sizesDiffer => {},
          process: null
        },
        shadowOpacity: true,
        shadowRadius: true,
        shouldRasterizeIOS: true,
        start: true,
        style: {
          alignContent: 'alignContent',
          alignItems: 'alignItems',
          alignSelf: 'alignSelf',
          aspectRatio: 'aspectRatio',
          backfaceVisibility: 'backfaceVisibility',
          backgroundColor: {
            process: processColor => {}
          },
          borderBottomColor: {
            process: processColor => {}
          },
          borderBottomEndRadius: 'borderBottomEndRadius',
          borderBottomLeftRadius: 'borderBottomLeftRadius',
          borderBottomRightRadius: 'borderBottomRightRadius',
          borderBottomStartRadius: 'borderBottomStartRadius',
          borderBottomWidth: 'borderBottomWidth',
          borderColor: {
            process: processColor => {}
          },
          borderEndColor: {
            process: processColor => {}
          },
          borderEndWidth: 'borderEndWidth',
          borderLeftColor: {
            process: processColor => {}
          },
          borderLeftWidth: 'borderLeftWidth',
          borderRadius: 'borderRadius',
          borderRightColor: {
            process: processColor => {}
          },
          borderRightWidth: 'borderRightWidth',
          borderStartColor: {
            process: processColor => {}
          },
          borderStartWidth: 'borderStartWidth',
          borderStyle: 'borderStyle',
          borderTopColor: {
            process: processColor => {}
          },
          borderTopEndRadius: 'borderTopEndRadius',
          borderTopLeftRadius: 'borderTopLeftRadius',
          borderTopRightRadius: 'borderTopRightRadius',
          borderTopStartRadius: 'borderTopStartRadius',
          borderTopWidth: 'borderTopWidth',
          borderWidth: 'borderWidth',
          bottom: 'bottom',
          color: {
            process: processColor => {}
          },
          decomposedMatrix: 'decomposedMatrix',
          direction: 'direction',
          display: 'display',
          elevation: 'elevation',
          end: 'end',
          flex: 'flex',
          flexBasis: 'flexBasis',
          flexDirection: 'flexDirection',
          flexGrow: 'flexGrow',
          flexShrink: 'flexShrink',
          flexWrap: 'flexWrap',
          fontFamily: {
            process: processFontFamily => {}
          },
          fontSize: 'fontSize',
          fontStyle: 'fontStyle',
          fontVariant: 'fontVariant',
          fontWeight: 'fontWeight',
          height: 'height',
          includeFontPadding: 'includeFontPadding',
          justifyContent: 'justifyContent',
          left: 'left',
          letterSpacing: 'letterSpacing',
          lineHeight: 'lineHeight',
          margin: 'margin',
          marginBottom: 'marginBottom',
          marginEnd: 'marginEnd',
          marginHorizontal: 'marginHorizontal',
          marginLeft: 'marginLeft',
          marginRight: 'marginRight',
          marginStart: 'marginStart',
          marginTop: 'marginTop',
          marginVertical: 'marginVertical',
          maxHeight: 'maxHeight',
          maxWidth: 'maxWidth',
          minHeight: 'minHeight',
          minWidth: 'minWidth',
          opacity: 'opacity',
          overflow: 'overflow',
          overlayColor: {
            process: processColor => {}
          },
          padding: 'padding',
          paddingBottom: 'paddingBottom',
          paddingEnd: 'paddingEnd',
          paddingHorizontal: 'paddingHorizontal',
          paddingLeft: 'paddingLeft',
          paddingRight: 'paddingRight',
          paddingStart: 'paddingStart',
          paddingTop: 'paddingTop',
          paddingVertical: 'paddingVertical',
          position: 'position',
          resizeMode: 'resizeMode',
          right: 'right',
          rotation: 'rotation',
          scaleX: 'scaleX',
          scaleY: 'scaleY',
          shadowColor: {
            process: processColor => {}
          },
          shadowOffset: {
            diff: sizesDiffer => {}
          },
          shadowOpacity: 'shadowOpacity',
          shadowRadius: 'shadowRadius',
          start: 'start',
          textAlign: 'textAlign',
          textAlignVertical: 'textAlignVertical',
          textDecorationColor: {
            process: processColor => {}
          },
          textDecorationLine: 'textDecorationLine',
          textDecorationStyle: 'textDecorationStyle',
          textShadowColor: {
            process: processColor => {}
          },
          textShadowOffset: 'textShadowOffset',
          textShadowRadius: 'textShadowRadius',
          textTransform: 'textTransform',
          tintColor: {
            process: processColor => {}
          },
          top: 'top',
          transform: {
            process: processTransform => {}
          },
          transformMatrix: 'transformMatrix',
          translateX: 'translateX',
          translateY: 'translateY',
          width: 'width',
          writingDirection: 'writingDirection',
          zIndex: 'zIndex'
        },
        testID: true,
        top: true,
        transform: {
          diff: matricesDiffer => {},
          process: null
        },
        width: true,
        zIndex: true
      }
    },
    RCTVirtualText: {
      Commands: {},
      Constants: {},
      Manager: 'VirtualText',
      NativeProps: {},
      baseModuleName: 'RCTBaseText',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RCTWKWebView: {
      Commands: {
        goBack: 3,
        goForward: 0,
        injectJavaScript: 2,
        postMessage: 1,
        reload: 4,
        startLoadWithResult: 6,
        stopLoading: 5
      },
      Constants: {},
      Manager: 'WKWebViewManager',
      NativeProps: {
        allowsInlineMediaPlayback: 'BOOL',
        automaticallyAdjustContentInsets: 'BOOL',
        bounces: 'BOOL',
        contentInset: 'UIEdgeInsets',
        decelerationRate: 'CGFloat',
        injectedJavaScript: 'NSString',
        mediaPlaybackRequiresUserAction: 'BOOL',
        messagingEnabled: 'BOOL',
        onLoadingError: 'BOOL',
        onLoadingFinish: 'BOOL',
        onLoadingStart: 'BOOL',
        onMessage: 'BOOL',
        onShouldStartLoadWithRequest: 'BOOL',
        scrollEnabled: 'BOOL',
        source: 'NSDictionary'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {
        topLoadingError: {
          registrationName: 'onLoadingError'
        },
        topLoadingFinish: {
          registrationName: 'onLoadingFinish'
        },
        topLoadingStart: {
          registrationName: 'onLoadingStart'
        },
        topMessage: {
          registrationName: 'onMessage'
        },
        topShouldStartLoadWithRequest: {
          registrationName: 'onShouldStartLoadWithRequest'
        }
      }
    },
    RCTWebView: {
      Commands: {
        goBack: 0,
        goForward: 1,
        injectJavaScript: 5,
        postMessage: 4,
        reload: 2,
        startLoadWithResult: 6,
        stopLoading: 3
      },
      Constants: {},
      Manager: 'WebViewManager',
      NativeProps: {
        allowsInlineMediaPlayback: 'BOOL',
        automaticallyAdjustContentInsets: 'BOOL',
        bounces: 'BOOL',
        contentInset: 'UIEdgeInsets',
        dataDetectorTypes: 'UIDataDetectorTypes',
        decelerationRate: 'CGFloat',
        injectedJavaScript: 'NSString',
        mediaPlaybackRequiresUserAction: 'BOOL',
        messagingEnabled: 'BOOL',
        onLoadingError: 'BOOL',
        onLoadingFinish: 'BOOL',
        onLoadingStart: 'BOOL',
        onMessage: 'BOOL',
        onShouldStartLoadWithRequest: 'BOOL',
        scalesPageToFit: 'BOOL',
        scrollEnabled: 'BOOL',
        source: 'NSDictionary'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {
        topLoadingError: {
          registrationName: 'onLoadingError'
        },
        topLoadingFinish: {
          registrationName: 'onLoadingFinish'
        },
        topLoadingStart: {
          registrationName: 'onLoadingStart'
        },
        topMessage: {
          registrationName: 'onMessage'
        },
        topShouldStartLoadWithRequest: {
          registrationName: 'onShouldStartLoadWithRequest'
        }
      }
    },
    RNGestureHandlerButton: {
      Commands: {},
      Constants: {},
      Manager: 'RNGestureHandlerButton',
      NativeProps: {
        enabled: 'BOOL',
        hitSlop: 'UIEdgeInsets'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSScreen: {
      Commands: {},
      Constants: {},
      Manager: 'RNSScreenManager',
      NativeProps: {
        active: 'BOOL'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSScreenContainer: {
      Commands: {},
      Constants: {},
      Manager: 'RNSScreenContainerManager',
      NativeProps: {},
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGCircle: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGCircleManager',
      NativeProps: {
        cx: 'ABI32_0_0RNSVGLength*',
        cy: 'ABI32_0_0RNSVGLength*',
        r: 'ABI32_0_0RNSVGLength*'
      },
      baseModuleName: 'RNSVGRenderable',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGClipPath: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGClipPathManager',
      NativeProps: {},
      baseModuleName: 'RNSVGNode',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGDefs: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGDefsManager',
      NativeProps: {},
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGEllipse: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGEllipseManager',
      NativeProps: {
        cx: 'ABI32_0_0RNSVGLength*',
        cy: 'ABI32_0_0RNSVGLength*',
        rx: 'ABI32_0_0RNSVGLength*',
        ry: 'ABI32_0_0RNSVGLength*'
      },
      baseModuleName: 'RNSVGRenderable',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGGroup: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGGroupManager',
      NativeProps: {
        font: 'NSDictionary'
      },
      baseModuleName: 'RNSVGRenderable',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGImage: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGImageManager',
      NativeProps: {
        align: 'NSString',
        height: 'id',
        imageheight: 'ABI32_0_0RNSVGLength*',
        imagewidth: 'ABI32_0_0RNSVGLength*',
        meetOrSlice: 'ABI32_0_0RNSVGVBMOS',
        src: 'id',
        width: 'id',
        x: 'ABI32_0_0RNSVGLength*',
        y: 'ABI32_0_0RNSVGLength*'
      },
      baseModuleName: 'RNSVGRenderable',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGLine: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGLineManager',
      NativeProps: {
        x1: 'ABI32_0_0RNSVGLength*',
        x2: 'ABI32_0_0RNSVGLength*',
        y1: 'ABI32_0_0RNSVGLength*',
        y2: 'ABI32_0_0RNSVGLength*'
      },
      baseModuleName: 'RNSVGRenderable',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGLinearGradient: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGLinearGradientManager',
      NativeProps: {
        gradient: 'NSArray<NSNumber *>',
        gradientTransform: 'CGAffineTransform',
        gradientUnits: 'ABI32_0_0RNSVGUnits',
        x1: 'ABI32_0_0RNSVGLength*',
        x2: 'ABI32_0_0RNSVGLength*',
        y1: 'ABI32_0_0RNSVGLength*',
        y2: 'ABI32_0_0RNSVGLength*'
      },
      baseModuleName: 'RNSVGNode',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGMask: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGMaskManager',
      NativeProps: {
        height: 'id',
        maskContentUnits: 'ABI32_0_0RNSVGUnits',
        maskTransform: 'CGAffineTransform',
        maskUnits: 'ABI32_0_0RNSVGUnits',
        maskheight: 'ABI32_0_0RNSVGLength*',
        maskwidth: 'ABI32_0_0RNSVGLength*',
        width: 'id',
        x: 'ABI32_0_0RNSVGLength*',
        y: 'ABI32_0_0RNSVGLength*'
      },
      baseModuleName: 'RNSVGGroup',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGNode: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGNodeManager',
      NativeProps: {
        alignContent: 'id',
        alignItems: 'id',
        alignSelf: 'id',
        aspectRatio: 'id',
        borderBottomWidth: 'id',
        borderEndWidth: 'id',
        borderLeftWidth: 'id',
        borderRightWidth: 'id',
        borderStartWidth: 'id',
        borderTopWidth: 'id',
        borderWidth: 'id',
        bottom: 'id',
        clipPath: 'NSString',
        clipRule: 'ABI32_0_0RNSVGCGFCRule',
        direction: 'id',
        display: 'id',
        end: 'id',
        flex: 'id',
        flexBasis: 'id',
        flexDirection: 'id',
        flexGrow: 'id',
        flexShrink: 'id',
        flexWrap: 'id',
        height: 'id',
        justifyContent: 'id',
        left: 'id',
        margin: 'id',
        marginBottom: 'id',
        marginEnd: 'id',
        marginHorizontal: 'id',
        marginLeft: 'id',
        marginRight: 'id',
        marginStart: 'id',
        marginTop: 'id',
        marginVertical: 'id',
        mask: 'NSString',
        matrix: 'CGAffineTransform',
        maxHeight: 'id',
        maxWidth: 'id',
        minHeight: 'id',
        minWidth: 'id',
        name: 'NSString',
        onLayout: 'BOOL',
        opacity: 'CGFloat',
        overflow: 'id',
        padding: 'id',
        paddingBottom: 'id',
        paddingEnd: 'id',
        paddingHorizontal: 'id',
        paddingLeft: 'id',
        paddingRight: 'id',
        paddingStart: 'id',
        paddingTop: 'id',
        paddingVertical: 'id',
        position: 'id',
        responsible: 'BOOL',
        right: 'id',
        start: 'id',
        top: 'id',
        transform: 'CATransform3D',
        width: 'id'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {
        topLayout: {
          registrationName: 'onLayout'
        }
      }
    },
    RNSVGPath: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGPathManager',
      NativeProps: {
        d: 'ABI32_0_0RNSVGCGPath'
      },
      baseModuleName: 'RNSVGRenderable',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGPattern: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGPatternManager',
      NativeProps: {
        align: 'NSString',
        height: 'id',
        meetOrSlice: 'ABI32_0_0RNSVGVBMOS',
        minX: 'CGFloat',
        minY: 'CGFloat',
        patternContentUnits: 'ABI32_0_0RNSVGUnits',
        patternTransform: 'CGAffineTransform',
        patternUnits: 'ABI32_0_0RNSVGUnits',
        patternheight: 'ABI32_0_0RNSVGLength*',
        patternwidth: 'ABI32_0_0RNSVGLength*',
        vbHeight: 'CGFloat',
        vbWidth: 'CGFloat',
        width: 'id',
        x: 'ABI32_0_0RNSVGLength*',
        y: 'ABI32_0_0RNSVGLength*'
      },
      baseModuleName: 'RNSVGGroup',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGRadialGradient: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGRadialGradientManager',
      NativeProps: {
        cx: 'ABI32_0_0RNSVGLength*',
        cy: 'ABI32_0_0RNSVGLength*',
        fx: 'ABI32_0_0RNSVGLength*',
        fy: 'ABI32_0_0RNSVGLength*',
        gradient: 'NSArray<NSNumber *>',
        gradientTransform: 'CGAffineTransform',
        gradientUnits: 'ABI32_0_0RNSVGUnits',
        rx: 'ABI32_0_0RNSVGLength*',
        ry: 'ABI32_0_0RNSVGLength*'
      },
      baseModuleName: 'RNSVGNode',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGRect: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGRectManager',
      NativeProps: {
        height: 'id',
        rectheight: 'ABI32_0_0RNSVGLength*',
        rectwidth: 'ABI32_0_0RNSVGLength*',
        rx: 'ABI32_0_0RNSVGLength*',
        ry: 'ABI32_0_0RNSVGLength*',
        width: 'id',
        x: 'ABI32_0_0RNSVGLength*',
        y: 'ABI32_0_0RNSVGLength*'
      },
      baseModuleName: 'RNSVGRenderable',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGRenderable: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGRenderableManager',
      NativeProps: {
        fill: 'ABI32_0_0RNSVGBrush',
        fillOpacity: 'CGFloat',
        fillRule: 'ABI32_0_0RNSVGCGFCRule',
        propList: 'NSArray<NSString *>',
        stroke: 'ABI32_0_0RNSVGBrush',
        strokeDasharray: 'NSArray<ABI32_0_0RNSVGLength *>',
        strokeDashoffset: 'CGFloat',
        strokeLinecap: 'CGLineCap',
        strokeLinejoin: 'CGLineJoin',
        strokeMiterlimit: 'CGFloat',
        strokeOpacity: 'CGFloat',
        strokeWidth: 'ABI32_0_0RNSVGLength*'
      },
      baseModuleName: 'RNSVGNode',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGSvgView: {
      Commands: {
        toDataURL: 0
      },
      Constants: {},
      Manager: 'RNSVGSvgViewManager',
      NativeProps: {
        align: 'NSString',
        bbHeight: 'NSString',
        bbWidth: 'NSString',
        meetOrSlice: 'ABI32_0_0RNSVGVBMOS',
        minX: 'CGFloat',
        minY: 'CGFloat',
        tintColor: 'UIColor',
        vbHeight: 'CGFloat',
        vbWidth: 'CGFloat'
      },
      baseModuleName: 'RCTView',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGSymbol: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGSymbolManager',
      NativeProps: {
        align: 'NSString',
        meetOrSlice: 'ABI32_0_0RNSVGVBMOS',
        minX: 'CGFloat',
        minY: 'CGFloat',
        vbHeight: 'CGFloat',
        vbWidth: 'CGFloat'
      },
      baseModuleName: 'RNSVGNode',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGTSpan: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGTSpanManager',
      NativeProps: {
        content: 'NSString'
      },
      baseModuleName: 'RNSVGText',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGText: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGTextManager',
      NativeProps: {
        alignmentBaseline: 'NSString',
        baselineShift: 'id',
        dx: 'id',
        dy: 'id',
        font: 'NSDictionary',
        lengthAdjust: 'NSString',
        positionX: 'id',
        positionY: 'id',
        rotate: 'id',
        textAnchor: 'ABI32_0_0RNSVGTextAnchor',
        textLength: 'id',
        x: 'id',
        y: 'id'
      },
      baseModuleName: 'RNSVGRenderable',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGTextPath: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGTextPathManager',
      NativeProps: {
        href: 'NSString',
        method: 'NSString',
        midLine: 'NSString',
        side: 'NSString',
        spacing: 'NSString',
        startOffset: 'ABI32_0_0RNSVGLength*'
      },
      baseModuleName: 'RNSVGRenderable',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    RNSVGUse: {
      Commands: {},
      Constants: {},
      Manager: 'RNSVGUseManager',
      NativeProps: {
        height: 'id',
        href: 'NSString',
        useheight: 'ABI32_0_0RNSVGLength*',
        usewidth: 'ABI32_0_0RNSVGLength*',
        width: 'id'
      },
      baseModuleName: 'RNSVGRenderable',
      bubblingEventTypes: {},
      directEventTypes: {}
    },
    ViewManagerAdapter_ExpoAdsAdMobBannerView: {
      Commands: {},
      Constants: {},
      Manager: 'ViewManagerAdapter_ExpoAdsAdMobBannerView',
      NativeProps: {
        onAdViewDidDismissScreen: 'BOOL',
        onAdViewDidReceiveAd: 'BOOL',
        onAdViewWillDismissScreen: 'BOOL',
        onAdViewWillLeaveApplication: 'BOOL',
        onAdViewWillPresentScreen: 'BOOL',
        onDidFailToReceiveAdWithError: 'BOOL',
        onSizeChange: 'BOOL'
      },
      baseModuleName: 'EXViewManagerAdapter',
      bubblingEventTypes: {},
      directEventTypes: {
        topAdViewDidDismissScreen: {
          registrationName: 'onAdViewDidDismissScreen'
        },
        topAdViewDidReceiveAd: {
          registrationName: 'onAdViewDidReceiveAd'
        },
        topAdViewWillDismissScreen: {
          registrationName: 'onAdViewWillDismissScreen'
        },
        topAdViewWillLeaveApplication: {
          registrationName: 'onAdViewWillLeaveApplication'
        },
        topAdViewWillPresentScreen: {
          registrationName: 'onAdViewWillPresentScreen'
        },
        topDidFailToReceiveAdWithError: {
          registrationName: 'onDidFailToReceiveAdWithError'
        },
        topSizeChange: {
          registrationName: 'onSizeChange'
        }
      }
    },
    ViewManagerAdapter_ExpoAdsPublisherBannerView: {
      Commands: {},
      Constants: {},
      Manager: 'ViewManagerAdapter_ExpoAdsPublisherBannerView',
      NativeProps: {
        onAdViewDidDismissScreen: 'BOOL',
        onAdViewDidReceiveAd: 'BOOL',
        onAdViewWillDismissScreen: 'BOOL',
        onAdViewWillLeaveApplication: 'BOOL',
        onAdViewWillPresentScreen: 'BOOL',
        onAdmobDispatchAppEvent: 'BOOL',
        onDidFailToReceiveAdWithError: 'BOOL',
        onSizeChange: 'BOOL'
      },
      baseModuleName: 'EXViewManagerAdapter',
      bubblingEventTypes: {},
      directEventTypes: {
        topAdViewDidDismissScreen: {
          registrationName: 'onAdViewDidDismissScreen'
        },
        topAdViewDidReceiveAd: {
          registrationName: 'onAdViewDidReceiveAd'
        },
        topAdViewWillDismissScreen: {
          registrationName: 'onAdViewWillDismissScreen'
        },
        topAdViewWillLeaveApplication: {
          registrationName: 'onAdViewWillLeaveApplication'
        },
        topAdViewWillPresentScreen: {
          registrationName: 'onAdViewWillPresentScreen'
        },
        topAdmobDispatchAppEvent: {
          registrationName: 'onAdmobDispatchAppEvent'
        },
        topDidFailToReceiveAdWithError: {
          registrationName: 'onDidFailToReceiveAdWithError'
        },
        topSizeChange: {
          registrationName: 'onSizeChange'
        }
      }
    },
    ViewManagerAdapter_ExpoBarCodeScannerView: {
      Commands: {},
      Constants: {},
      Manager: 'ViewManagerAdapter_ExpoBarCodeScannerView',
      NativeProps: {
        onBarCodeScanned: 'BOOL'
      },
      baseModuleName: 'EXViewManagerAdapter',
      bubblingEventTypes: {},
      directEventTypes: {
        topBarCodeScanned: {
          registrationName: 'onBarCodeScanned'
        }
      }
    },
    ViewManagerAdapter_ExponentCamera: {
      Commands: {},
      Constants: {},
      Manager: 'ViewManagerAdapter_ExponentCamera',
      NativeProps: {
        onBarCodeScanned: 'BOOL',
        onCameraReady: 'BOOL',
        onFacesDetected: 'BOOL',
        onMountError: 'BOOL',
        onPictureSaved: 'BOOL'
      },
      baseModuleName: 'EXViewManagerAdapter',
      bubblingEventTypes: {},
      directEventTypes: {
        topBarCodeScanned: {
          registrationName: 'onBarCodeScanned'
        },
        topCameraReady: {
          registrationName: 'onCameraReady'
        },
        topFacesDetected: {
          registrationName: 'onFacesDetected'
        },
        topMountError: {
          registrationName: 'onMountError'
        },
        topPictureSaved: {
          registrationName: 'onPictureSaved'
        }
      }
    },
    ViewManagerAdapter_ExponentGLView: {
      Commands: {},
      Constants: {},
      Manager: 'ViewManagerAdapter_ExponentGLView',
      NativeProps: {
        onSurfaceCreate: 'BOOL'
      },
      baseModuleName: 'EXViewManagerAdapter',
      bubblingEventTypes: {},
      directEventTypes: {
        topSurfaceCreate: {
          registrationName: 'onSurfaceCreate'
        }
      }
    },
    __takeSnapshot: fn => {},
    blur: fn => {},
    clearJSResponder: anonymous => {},
    configureNextLayoutAnimation: fn => {},
    createView: fn => {},
    dispatchViewManagerCommand: fn => {},
    findSubviewIn: fn => {},
    focus: fn => {},
    genericDirectEventTypes: {
      onGestureHandlerEvent: {
        registrationName: 'onGestureHandlerEvent'
      },
      onGestureHandlerStateChange: {
        registrationName: 'onGestureHandlerStateChange'
      }
    },
    manageChildren: fn => {},
    measure: fn => {},
    measureInWindow: fn => {},
    measureLayout: fn => {},
    measureLayoutRelativeToParent: fn => {},
    measureViewsInRect: fn => {},
    removeRootView: fn => {},
    removeSubviewsFromContainerWithID: fn => {},
    replaceExistingNonRootView: fn => {},
    setChildren: fn => {},
    setJSResponder: anonymous => {},
    takeSnapshot: anonymous => {},
    updateView: fn => {},
    viewIsDescendantOf: fn => {}
  }
}
