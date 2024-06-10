package com.contacts;

import android.content.ContentResolver;
import android.content.Context;
import android.database.Cursor;
import android.provider.ContactsContract;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReactMethod;

public class ContactModule extends ReactContextBaseJavaModule {

    public ContactModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ContactModule";
    }

   @ReactMethod
    public void getContacts(Promise promise) {
        ContentResolver contentResolver = getReactApplicationContext().getContentResolver();
        Cursor cursor = contentResolver.query(ContactsContract.Contacts.CONTENT_URI, null, null, null, null);

        WritableArray contactsArray = Arguments.createArray();

        if (cursor != null && cursor.getCount() > 0) {
            while (cursor.moveToNext()) {
                String contactId = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts._ID));
                String contactName = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME));
                String contactPhotoUri = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts.PHOTO_THUMBNAIL_URI));

                WritableMap contactMap = Arguments.createMap();
                contactMap.putString("name", contactName);
                contactMap.putString("photo", contactPhotoUri);

                Cursor phoneCursor = contentResolver.query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI,
                        null,
                        ContactsContract.CommonDataKinds.Phone.CONTACT_ID + " = ?",
                        new String[]{contactId},
                        null);

                if (phoneCursor != null && phoneCursor.moveToFirst()) {
                    String phoneNumber = phoneCursor.getString(phoneCursor.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER));
                    contactMap.putString("phone", phoneNumber);
                    phoneCursor.close();
                } else {
                    contactMap.putString("phone", "Sin número");
                }

                contactsArray.pushMap(contactMap);
            }
            cursor.close();
            promise.resolve(contactsArray);
        } else {
            promise.reject("NO_CONTACTS_FOUND", "No contacts found on device");
        }
    }

}
