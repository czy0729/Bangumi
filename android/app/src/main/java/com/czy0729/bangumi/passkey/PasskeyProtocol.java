package com.czy0729.bangumi.passkey;

import android.util.Base64;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.nio.ByteBuffer;
import java.nio.charset.CodingErrorAction;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

/** Pure request/response boundary: never accepts caller-controlled RP or origin delegation. */
final class PasskeyProtocol {
    static final String RP_ID = "bgm.tv";
    static final String ORIGIN = "https://bgm.tv";
    private static final int MAX_JSON = 131072;
    private static final int BASE64_FLAGS = Base64.URL_SAFE | Base64.NO_PADDING | Base64.NO_WRAP;

    static final class Request {
        final String optionsJson;
        final String challenge;
        final String clientDataJson;
        final byte[] clientDataHash;
        final boolean requireUv;
        final Set<String> allowedIds;

        Request(JSONObject options, String challenge, Set<String> allowedIds) throws Exception {
            this.optionsJson = options.toString();
            this.challenge = challenge;
            this.allowedIds = allowedIds;
            this.requireUv = "required".equals(options.optString("userVerification"));
            // Preserve these exact UTF-8 bytes for both hashing and placeholder completion.
            this.clientDataJson = new JSONObject()
                    .put("type", "webauthn.get")
                    .put("challenge", challenge)
                    .put("origin", ORIGIN)
                    .put("crossOrigin", false)
                    .toString();
            this.clientDataHash = sha256(clientDataJson.getBytes(StandardCharsets.UTF_8));
        }
    }

    static Request parseRequest(String json) throws Exception {
        JSONObject options = object(json);
        Set<String> allowedKeys = new HashSet<>(Arrays.asList(
                "rpId", "challenge", "timeout", "allowCredentials", "userVerification", "extensions"));
        Iterator<String> keys = options.keys();
        while (keys.hasNext()) require(allowedKeys.contains(keys.next()));
        require(RP_ID.equals(string(options, "rpId")));
        String challenge = string(options, "challenge");
        decode(challenge, 16, 1024);
        if (options.has("timeout")) {
            Object timeout = options.get("timeout");
            require(timeout instanceof Number);
            double value = ((Number) timeout).doubleValue();
            require(!Double.isInfinite(value) && !Double.isNaN(value)
                    && value >= 1 && value <= 600000 && value == Math.floor(value));
        }
        if (options.has("userVerification")) {
            require(Arrays.asList("required", "preferred", "discouraged")
                    .contains(string(options, "userVerification")));
        }
        // No AppID or PRF extensions: this first version authenticates only the bgm.tv RP.
        if (options.has("extensions")) {
            require(options.get("extensions") instanceof JSONObject);
            require(options.getJSONObject("extensions").length() == 0);
        }
        Set<String> allowedIds = new HashSet<>();
        if (options.has("allowCredentials")) {
            require(options.get("allowCredentials") instanceof JSONArray);
            JSONArray credentials = options.getJSONArray("allowCredentials");
            require(credentials.length() <= 128);
            for (int i = 0; i < credentials.length(); i++) {
                JSONObject descriptor = credentials.getJSONObject(i);
                require("public-key".equals(string(descriptor, "type")));
                String id = string(descriptor, "id");
                decode(id, 1, 1024);
                allowedIds.add(id);
                Iterator<String> descriptorKeys = descriptor.keys();
                while (descriptorKeys.hasNext()) {
                    require(Arrays.asList("type", "id", "transports").contains(descriptorKeys.next()));
                }
                if (descriptor.has("transports")) {
                    JSONArray transports = descriptor.getJSONArray("transports");
                    require(transports.length() <= 6);
                    for (int j = 0; j < transports.length(); j++) {
                        require(transports.get(j) instanceof String);
                        require(Arrays.asList("usb", "nfc", "ble", "internal", "hybrid", "smart-card")
                                .contains(transports.getString(j)));
                    }
                }
            }
        }
        return new Request(options, challenge, allowedIds);
    }

    /** Does not verify the signature: that must be verified by bgm.tv, which owns the public key. */
    static String validateResponse(String json, Request request) throws Exception {
        JSONObject credential = object(json);
        require("public-key".equals(string(credential, "type")));
        String id = string(credential, "id");
        byte[] rawId = decode(string(credential, "rawId"), 1, 1024);
        require(MessageDigest.isEqual(decode(id, 1, 1024), rawId));
        require(request.allowedIds.isEmpty() || request.allowedIds.contains(id));
        JSONObject response = credential.getJSONObject("response");
        require(!response.has("attestationObject"));
        byte[] authenticatorData = decode(string(response, "authenticatorData"), 37, 65536);
        require(MessageDigest.isEqual(Arrays.copyOf(authenticatorData, 32),
                sha256(RP_ID.getBytes(StandardCharsets.UTF_8))));
        require((authenticatorData[32] & 1) != 0); // User presence.
        if (request.requireUv) require((authenticatorData[32] & 4) != 0);
        decode(string(response, "signature"), 1, 8192);
        if (response.has("userHandle") && !response.isNull("userHandle")) {
            decode(string(response, "userHandle"), 0, 1024);
        }
        String encodedClientData = string(response, "clientDataJSON");
        if ("<placeholder>".equals(encodedClientData)) {
            encodedClientData = encode(request.clientDataJson.getBytes(StandardCharsets.UTF_8));
            response.put("clientDataJSON", encodedClientData);
        }
        // Decode and validate the provider's fields before considering any byte restoration.
        byte[] clientDataBytes = decode(encodedClientData, 1, 16384);
        String clientDataText = StandardCharsets.UTF_8.newDecoder()
                .onMalformedInput(CodingErrorAction.REPORT)
                .onUnmappableCharacter(CodingErrorAction.REPORT)
                .decode(ByteBuffer.wrap(clientDataBytes)).toString();
        JSONObject clientData = object(clientDataText);
        require("webauthn.get".equals(string(clientData, "type")));
        require(request.challenge.equals(string(clientData, "challenge")));
        require(ORIGIN.equals(string(clientData, "origin")));
        if (clientData.has("crossOrigin")) require(Boolean.FALSE.equals(clientData.get("crossOrigin")));
        require(!clientData.has("topOrigin"));
        if (!MessageDigest.isEqual(sha256(clientDataBytes), request.clientDataHash)) {
            // Bitwarden's DefaultWithCustomHash signs the caller-supplied hash but may
            // return independently generated JSON (for example, different slash escaping).
            // Restore the EXACT bytes supplied for signing, not a reserialization of the
            // returned JSON. Invalid origins/challenges above must never be normalized.
            // bgm.tv still performs the final signature verification with its public key.
            response.put("clientDataJSON", encode(request.clientDataJson.getBytes(StandardCharsets.UTF_8)));
        }
        if (credential.has("clientExtensionResults")) {
            require(credential.get("clientExtensionResults") instanceof JSONObject);
        } else {
            credential.put("clientExtensionResults", new JSONObject());
        }
        if (credential.has("authenticatorAttachment") && !credential.isNull("authenticatorAttachment")) {
            require(Arrays.asList("platform", "cross-platform")
                    .contains(string(credential, "authenticatorAttachment")));
        }
        return credential.toString();
    }

    private static JSONObject object(String json) throws JSONException {
        require(json != null && !json.isEmpty() && json.length() <= MAX_JSON);
        checkNesting(json);
        JSONTokener tokener = new JSONTokener(json);
        Object value = tokener.nextValue();
        require(value instanceof JSONObject && tokener.nextClean() == 0);
        return (JSONObject) value;
    }

    /** Bound parser recursion before Android's permissive JSONTokener processes bridge input. */
    private static void checkNesting(String json) {
        int depth = 0;
        boolean quoted = false;
        boolean escaped = false;
        for (int i = 0; i < json.length(); i++) {
            char value = json.charAt(i);
            if (quoted) {
                if (escaped) escaped = false;
                else if (value == '\\') escaped = true;
                else if (value == '"') quoted = false;
                continue;
            }
            if (value == '"') quoted = true;
            else if (value == '{' || value == '[') require(++depth <= 32);
            else if (value == '}' || value == ']') require(--depth >= 0);
            else require(value != '\'' && value != '/' && value != '#');
        }
        require(depth == 0 && !quoted);
    }

    private static String string(JSONObject object, String key) throws JSONException {
        Object value = object.get(key);
        require(value instanceof String);
        return (String) value;
    }

    private static byte[] decode(String value, int min, int max) {
        require(value.length() <= ((max + 2) / 3) * 4);
        require(value.isEmpty() || value.matches("[A-Za-z0-9_-]+"));
        byte[] decoded = Base64.decode(value, BASE64_FLAGS);
        require(decoded.length >= min && decoded.length <= max && encode(decoded).equals(value));
        return decoded;
    }

    private static String encode(byte[] value) {
        return Base64.encodeToString(value, BASE64_FLAGS);
    }

    private static byte[] sha256(byte[] value) throws Exception {
        return MessageDigest.getInstance("SHA-256").digest(value);
    }

    private static void require(boolean value) {
        if (!value) throw new IllegalArgumentException("Invalid Bangumi passkey data");
    }

    private PasskeyProtocol() {}
}
