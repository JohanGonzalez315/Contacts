package com.contacts;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class ContactPackage implements ReactPackage {

     @Override
   public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
       return Collections.emptyList();
   }
    
    @Override
   public List<NativeModule> createNativeModules(
           ReactApplicationContext reactContext) {
            ContactModule module = new ContactModule(reactContext);
            List<NativeModule> modules = new ArrayList<>();

            modules.add(module);

            return modules;
        }

}
    
