package com.czy0729.bangumi.passkey;

import android.app.Activity;
import android.content.Context;
import android.credentials.Credential;
import android.credentials.CredentialManager;
import android.credentials.CredentialOption;
import android.credentials.GetCredentialException;
import android.credentials.GetCredentialRequest;
import android.credentials.GetCredentialResponse;
import android.os.Bundle;
import android.os.CancellationSignal;
import android.os.OutcomeReceiver;

import androidx.annotation.RequiresApi;

import java.util.concurrent.Executor;

/** API 34 types are isolated here so the RN module can load on older Android releases. */
@RequiresApi(34)
final class PasskeyPlatform {
    private static final String PUBLIC_KEY_TYPE = "androidx.credentials.TYPE_PUBLIC_KEY_CREDENTIAL";
    private static final String KEY_SUBTYPE = "androidx.credentials.BUNDLE_KEY_SUBTYPE";
    private static final String GET_SUBTYPE =
            "androidx.credentials.BUNDLE_VALUE_SUBTYPE_GET_PUBLIC_KEY_CREDENTIAL_OPTION";
    private static final String KEY_REQUEST_JSON = "androidx.credentials.BUNDLE_KEY_REQUEST_JSON";
    private static final String KEY_CLIENT_DATA_HASH = "androidx.credentials.BUNDLE_KEY_CLIENT_DATA_HASH";
    private static final String KEY_RESPONSE_JSON =
            "androidx.credentials.BUNDLE_KEY_AUTHENTICATION_RESPONSE_JSON";
    private static final String KEY_AUTO_SELECT = "androidx.credentials.BUNDLE_KEY_IS_AUTO_SELECT_ALLOWED";
    private static final String KEY_TYPE_PRIORITY = "androidx.credentials.BUNDLE_KEY_TYPE_PRIORITY_VALUE";

    interface Callback {
        void onSuccess(String authenticationResponseJson);
        void onFailure(String code);
    }

    // Platform capability only; provider enablement, caller trust and vault contents are unknown.
    static boolean isAvailable(Context context) {
        return context.getSystemService(CredentialManager.class) != null;
    }

    static void get(Activity activity, PasskeyProtocol.Request request,
            CancellationSignal cancellation, Executor executor, Callback callback) {
        try {
            CredentialManager manager = activity.getSystemService(CredentialManager.class);
            if (manager == null) {
                callback.onFailure("E_PASSKEY_PROVIDER");
                return;
            }
            // Standard AndroidX GetPublicKeyCredentialOption / PublicKeyCredential Bundle schema:
            // https://github.com/androidx/androidx/tree/androidx-main/credentials/credentials/src/main/java/androidx/credentials
            Bundle optionData = new Bundle();
            optionData.putString(KEY_SUBTYPE, GET_SUBTYPE);
            optionData.putString(KEY_REQUEST_JSON, request.optionsJson);
            optionData.putByteArray(KEY_CLIENT_DATA_HASH, request.clientDataHash.clone());
            optionData.putBoolean(KEY_AUTO_SELECT, false);
            optionData.putInt(KEY_TYPE_PRIORITY, 100);
            // Default selection lets CredentialManager query the user's enabled providers.
            // Delegated-origin support and trust for this calling app remain provider requirements.
            CredentialOption option = new CredentialOption.Builder(
                    PUBLIC_KEY_TYPE, optionData, new Bundle(optionData))
                    .build();
            GetCredentialRequest platformRequest = new GetCredentialRequest.Builder(new Bundle())
                    .addCredentialOption(option)
                    .setAlwaysSendAppInfoToProvider(true)
                    .setOrigin(PasskeyProtocol.ORIGIN)
                    .build();
            manager.getCredential(activity, platformRequest, cancellation, executor,
                    new OutcomeReceiver<GetCredentialResponse, GetCredentialException>() {
                        @Override
                        public void onResult(GetCredentialResponse response) {
                            try {
                                Credential credential = response.getCredential();
                                if (!PUBLIC_KEY_TYPE.equals(credential.getType())) {
                                    callback.onFailure("E_PASSKEY_INVALID_RESPONSE");
                                    return;
                                }
                                String json = credential.getData().getString(KEY_RESPONSE_JSON);
                                if (json == null) {
                                    callback.onFailure("E_PASSKEY_INVALID_RESPONSE");
                                } else {
                                    callback.onSuccess(json);
                                }
                            } catch (RuntimeException error) {
                                callback.onFailure("E_PASSKEY_INVALID_RESPONSE");
                            }
                        }

                        @Override
                        public void onError(GetCredentialException error) {
                            String type = error.getType();
                            if (GetCredentialException.TYPE_USER_CANCELED.equals(type)) {
                                callback.onFailure("E_PASSKEY_CANCELLED");
                            } else if (GetCredentialException.TYPE_NO_CREDENTIAL.equals(type)) {
                                callback.onFailure("E_PASSKEY_NO_CREDENTIAL");
                            } else if (GetCredentialException.TYPE_INTERRUPTED.equals(type)) {
                                callback.onFailure("E_PASSKEY_FAILED");
                            } else {
                                callback.onFailure("E_PASSKEY_PROVIDER");
                            }
                        }
                    });
        } catch (SecurityException error) {
            callback.onFailure("E_PASSKEY_PROVIDER");
        } catch (UnsupportedOperationException error) {
            callback.onFailure("E_PASSKEY_UNSUPPORTED");
        } catch (RuntimeException error) {
            callback.onFailure("E_PASSKEY_FAILED");
        }
    }

    private PasskeyPlatform() {}
}
