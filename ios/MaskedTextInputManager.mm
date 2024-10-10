#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(MaskedTextInputDecoratorViewManager, RCTViewManager)
  RCT_EXPORT_VIEW_PROPERTY(primaryMaskFormat, NSString)
  RCT_EXPORT_VIEW_PROPERTY(customNotations, NSArray)
  RCT_EXPORT_VIEW_PROPERTY(autocomplete, BOOL)
  RCT_EXPORT_VIEW_PROPERTY(autoSkip, BOOL)
  RCT_EXPORT_VIEW_PROPERTY(isRTL, BOOL)
  RCT_EXPORT_VIEW_PROPERTY(autocompleteOnFocus, BOOL)
  RCT_EXPORT_VIEW_PROPERTY(allowSuggestions, BOOL)
  RCT_EXPORT_VIEW_PROPERTY(defaultValue, NSString)
  RCT_EXPORT_VIEW_PROPERTY(value, NSString)

  RCT_EXPORT_VIEW_PROPERTY(onChangeText, RCTBubblingEventBlock);
@end
