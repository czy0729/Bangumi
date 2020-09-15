package com.czy0729.bangumi.umeng;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.json.JSONObject;
import org.json.JSONException;
import java.util.Iterator;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableNativeMap;
import com.facebook.react.bridge.ReadableType;
import com.umeng.analytics.MobclickAgent;

/**
 * 示例： SDK 接口桥接封装类，并未封装SDK所有API(仅封装常用API接口)，设置配置参数类API应在Android原生代码
 * 调用，例如：SDK初始化函数，Log开关函数，子进程自定义事件埋点使能函数，异常捕获功能使能/关闭函数等等。
 * 如果还需要封装其它SDK API，请参考本例自行封装
 * Created by wangfei on 17/8/28.
 * -- 适配海棠版(common 2.0.0 + analytics 8.0.0) modify by yujie on 18/12/28
 */

public class AnalyticsModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext context;

    public AnalyticsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return "UMAnalyticsModule";
    }

    /********************************U-App统计*********************************/
    @ReactMethod
    public void onPageStart(String pageName) {
        //android.util.Log.e("xxxxxx","onPageStart="+mPageName);

        MobclickAgent.onPageStart(pageName);
    }

    @ReactMethod
    public void onPageEnd(String pageName) {
        //android.util.Log.e("xxxxxx","onPageEnd="+mPageName);

        MobclickAgent.onPageEnd(pageName);

    }
    @ReactMethod
    public void onEvent(String eventId) {
        MobclickAgent.onEvent(context, eventId);
    }
    @ReactMethod
    public void onEventWithLable(String eventId, String eventLabel) {
        MobclickAgent.onEvent(context, eventId, eventLabel);
    }
    @ReactMethod
    public void onEventWithMap(String eventId, ReadableMap map) {
        Map<String, String> rMap = new HashMap<String, String>();
        ReadableMapKeySetIterator iterator = map.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            if (ReadableType.Array == map.getType(key)) {
                rMap.put(key, map.getArray(key).toString());
            } else if (ReadableType.Boolean == map.getType(key)) {
                rMap.put(key, String.valueOf(map.getBoolean(key)));
            } else if (ReadableType.Number == map.getType(key)) {
                rMap.put(key, String.valueOf(map.getInt(key)));
            } else if (ReadableType.String == map.getType(key)) {
                rMap.put(key, map.getString(key));
            } else if (ReadableType.Map == map.getType(key)) {
                rMap.put(key, map.getMap(key).toString());
            }
        }
        MobclickAgent.onEvent(context, eventId, rMap);
    }
    @ReactMethod
    public void onEventWithMapAndCount(String eventId,ReadableMap map,int value) {
        Map<String, String> rMap = new HashMap();
        ReadableMapKeySetIterator iterator = map.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            if (ReadableType.Array == map.getType(key)) {
                rMap.put(key, map.getArray(key).toString());
            } else if (ReadableType.Boolean == map.getType(key)) {
                rMap.put(key, String.valueOf(map.getBoolean(key)));
            } else if (ReadableType.Number == map.getType(key)) {
                rMap.put(key, String.valueOf(map.getInt(key)));
            } else if (ReadableType.String == map.getType(key)) {
                rMap.put(key, map.getString(key));
            } else if (ReadableType.Map == map.getType(key)) {
                rMap.put(key, map.getMap(key).toString());
            }
        }
        MobclickAgent.onEventValue(context, eventId, rMap, value);
    }

    @ReactMethod
    public void onEventObject(String eventID, ReadableMap property) {
        Map<String, Object> map = new HashMap();
        ReadableMapKeySetIterator iterator = property.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            if (ReadableType.Array == property.getType(key)) {
                map.put(key, property.getArray(key).toString());
            } else if (ReadableType.Boolean == property.getType(key)) {
                map.put(key, String.valueOf(property.getBoolean(key)));
            } else if (ReadableType.Number == property.getType(key)) {
                map.put(key, String.valueOf(property.getInt(key)));
            } else if (ReadableType.String == property.getType(key)) {
                map.put(key, property.getString(key));
            } else if (ReadableType.Map == property.getType(key)) {
                map.put(key, property.getMap(key).toString());
            }
        }

        MobclickAgent.onEventObject(context, eventID, map);

    }
    @ReactMethod
    public void registerPreProperties(ReadableMap map) {
        ReadableNativeMap map2 = (ReadableNativeMap) map;
        Map<String, Object> map3  = map2.toHashMap();
        Iterator entries = map3.entrySet().iterator();
        JSONObject json = new JSONObject();
        while (entries.hasNext()) {
            Map.Entry entry = (Map.Entry) entries.next();
            String key = (String)entry.getKey();
            String value = (String)entry.getValue();
            try {
                json.put(key,value);
            }catch (JSONException e){

            }
        }
        MobclickAgent.registerPreProperties(context,json);
    }
    @ReactMethod
    public void unregisterPreProperty(String propertyName) {
        MobclickAgent.unregisterPreProperty(context, propertyName);

    }

    @ReactMethod
    public void getPreProperties(Callback callback) {
        String result = MobclickAgent.getPreProperties(context).toString();
        callback.invoke(result);
    }
    @ReactMethod
    public void clearPreProperties() {
        MobclickAgent.clearPreProperties(context);

    }
    @ReactMethod
    public void setFirstLaunchEvent(ReadableArray array) {
        List<String> list = new ArrayList();
        for (int i = 0; i < array.size(); i++) {
            if (ReadableType.Array == array.getType(i)) {
                list.add(array.getArray(i).toString());
            } else if (ReadableType.Boolean == array.getType(i)) {
                list.add(String.valueOf(array.getBoolean(i)));
            } else if (ReadableType.Number == array.getType(i)) {
                list.add(String.valueOf(array.getInt(i)));
            } else if (ReadableType.String == array.getType(i)) {
                list.add(array.getString(i));
            } else if (ReadableType.Map == array.getType(i)) {
                list.add(array.getMap(i).toString());
            }
        }
        MobclickAgent.setFirstLaunchEvent(context, list);
    }
    /********************************U-Dplus*********************************/
    @ReactMethod
    public void profileSignInWithPUID(String puid) {
        MobclickAgent.onProfileSignIn(puid);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void profileSignInWithPUIDWithProvider(String provider, String puid) {
        MobclickAgent.onProfileSignIn(provider, puid);
    }

    @ReactMethod
    @SuppressWarnings("unused")
    public void profileSignOff() {
        MobclickAgent.onProfileSignOff();
    }

}
