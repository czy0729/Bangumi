package com.czy0729.bangumi.passkey;

import android.app.Activity;
import android.os.Build;
import android.os.CancellationSignal;
import android.os.Handler;
import android.os.Looper;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.common.LifecycleState;

import java.lang.ref.WeakReference;

/** Provider-neutral, get-only WebAuthn bridge. Never logs credential material. */
public final class BangumiPasskeyModule extends ReactContextBaseJavaModule
        implements LifecycleEventListener {
    private final Handler mainHandler = new Handler(Looper.getMainLooper());
    private volatile boolean invalidated;
    // Accessed only on the main thread. Identity guards prevent stale callbacks settling a new call.
    private Pending pending;

    private static final class Pending {
        Promise promise;
        PasskeyProtocol.Request request;
        final CancellationSignal cancellation = new CancellationSignal();
        final WeakReference<Activity> activity;
        Runnable timeout;

        Pending(Promise promise, PasskeyProtocol.Request request, Activity activity) {
            this.promise = promise;
            this.request = request;
            this.activity = new WeakReference<>(activity);
        }
    }

    public BangumiPasskeyModule(ReactApplicationContext context) {
        super(context);
        context.addLifecycleEventListener(this);
    }

    @NonNull
    @Override
    public String getName() {
        return "BangumiPasskey";
    }

    /** Capability only: this does not prove provider enablement, caller trust or vault contents. */
    @ReactMethod
    public void isSupported(Promise promise) {
        mainHandler.post(() -> {
            boolean supported = false;
            if (!invalidated && Build.VERSION.SDK_INT >= 34) {
                try {
                    supported = PasskeyPlatform.isAvailable(getReactApplicationContext());
                } catch (RuntimeException | LinkageError ignored) {
                    // ROM differences, missing classes or an unavailable system service cannot establish support.
                }
            }
            promise.resolve(supported);
        });
    }

    /** requestJson is PublicKeyCredentialRequestOptionsJSON, not { publicKey: ... }. */
    @ReactMethod
    public void getAssertion(String requestJson, Promise promise) {
        mainHandler.post(() -> begin(requestJson, promise));
    }

    private void begin(String requestJson, Promise promise) {
        if (invalidated) {
            reject(promise, "E_PASSKEY_ACTIVITY");
            return;
        }
        if (pending != null) {
            reject(promise, "E_PASSKEY_BUSY");
            return;
        }
        if (Build.VERSION.SDK_INT < 34) {
            reject(promise, "E_PASSKEY_UNSUPPORTED");
            return;
        }
        Activity activity = getCurrentActivity();
        if (!validActivity(activity)
                || getReactApplicationContext().getLifecycleState() != LifecycleState.RESUMED) {
            reject(promise, "E_PASSKEY_ACTIVITY");
            return;
        }
        final PasskeyProtocol.Request request;
        try {
            request = PasskeyProtocol.parseRequest(requestJson);
        } catch (Exception ignored) {
            reject(promise, "E_PASSKEY_INVALID_REQUEST");
            return;
        }
        Pending operation = new Pending(promise, request, activity);
        pending = operation;
        // A provider that never calls back must not retain a Promise or block all later requests.
        operation.timeout = () -> finish(operation, null, "E_PASSKEY_FAILED");
        mainHandler.postDelayed(operation.timeout, request.timeout);
        PasskeyPlatform.get(activity, request, operation.cancellation,
                command -> mainHandler.post(command), new PasskeyPlatform.Callback() {
                    @Override
                    public void onSuccess(String json) {
                        if (pending != operation) return;
                        Activity originalActivity = operation.activity.get();
                        if (invalidated || !validActivity(originalActivity)
                                || getCurrentActivity() != originalActivity) {
                            finish(operation, null, "E_PASSKEY_ACTIVITY");
                            return;
                        }
                        try {
                            String verified = PasskeyProtocol.validateResponse(json, operation.request);
                            finish(operation, verified, null);
                        } catch (Exception ignored) {
                            finish(operation, null, "E_PASSKEY_INVALID_RESPONSE");
                        }
                    }

                    @Override
                    public void onFailure(String code) {
                        finish(operation, null, code);
                    }
                });
    }

    @ReactMethod
    public void cancel(Promise promise) {
        mainHandler.post(() -> {
            if (pending != null) finish(pending, null, "E_PASSKEY_CANCELLED");
            // Idempotent: cancelling when idle is a successful no-op.
            promise.resolve(null);
        });
    }

    private void finish(Pending operation, String result, String code) {
        if (pending != operation) return;
        pending = null;
        if (operation.timeout != null) mainHandler.removeCallbacks(operation.timeout);
        operation.timeout = null;
        Promise promise = operation.promise;
        operation.promise = null;
        operation.request = null;
        operation.activity.clear();
        try {
            operation.cancellation.cancel();
        } catch (RuntimeException ignored) {
            // Local completion still happens even if a provider fails during cancellation.
        }
        if (code == null) promise.resolve(result);
        else reject(promise, code);
    }

    private static boolean validActivity(Activity activity) {
        return activity != null && !activity.isFinishing()
                && (Build.VERSION.SDK_INT < 17 || !activity.isDestroyed());
    }

    private static void reject(Promise promise, String code) {
        // Never forward exception messages/causes from providers: they can contain credential data.
        String message;
        switch (code) {
            case "E_PASSKEY_UNSUPPORTED": message = "Passkey login requires Android 14 or later."; break;
            case "E_PASSKEY_CANCELLED": message = "Passkey login was cancelled."; break;
            case "E_PASSKEY_NO_CREDENTIAL": message = "No matching passkey is available from a credential provider."; break;
            case "E_PASSKEY_PROVIDER": message = "Enable a credential provider that supports delegated origin and trusts this app."; break;
            case "E_PASSKEY_BUSY": message = "A passkey request is already active."; break;
            case "E_PASSKEY_INVALID_REQUEST": message = "Invalid bgm.tv passkey request options."; break;
            case "E_PASSKEY_INVALID_RESPONSE": message = "The provider returned an invalid assertion."; break;
            case "E_PASSKEY_ACTIVITY": message = "The login activity is no longer available."; break;
            default: message = "Passkey login did not complete.";
        }
        promise.reject(code, message);
    }

    @Override
    public void onHostResume() {}

    @Override
    public void onHostPause() {
        // The credential selector and provider unlock UI intentionally pause our activity.
    }

    @Override
    public void onHostDestroy() {
        // RN 0.72 calls this on the UI thread. Do not post a delayed cancellation
        // which could accidentally target a request started by a replacement activity.
        if (pending != null) finish(pending, null, "E_PASSKEY_ACTIVITY");
    }

    @Override
    public void invalidate() {
        invalidated = true;
        getReactApplicationContext().removeLifecycleEventListener(this);
        mainHandler.post(() -> {
            if (pending != null) finish(pending, null, "E_PASSKEY_CANCELLED");
        });
        super.invalidate();
    }
}
