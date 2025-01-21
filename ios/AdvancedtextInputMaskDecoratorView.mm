//
//  AdvancedtextInputMaskDecoratorView.m
//  react-native-advanced-input-mask
//
//  Created by Ivan Ignathuk on 23/10/2024.
//

#ifdef RCT_NEW_ARCH_ENABLED
#import "AdvancedTextInputMaskDecoratorView.h"

#if __has_include("react_native_advanced_input_mask-Swift.h")
#import "react_native_advanced_input_mask-Swift.h"
#else
#import <react_native_advanced_input_mask/react_native_advanced_input_mask-Swift.h>
#endif

#import <react/renderer/components/maskedtextinput/ComponentDescriptors.h>
#import <react/renderer/components/maskedtextinput/EventEmitters.h>
#import <react/renderer/components/maskedtextinput/Props.h>
#import <react/renderer/components/maskedtextinput/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"
#import "RNConversions.h"

using namespace facebook::react;

@interface AdvancedTextInputMaskDecoratorView () <RCTAdvancedTextInputMaskDecoratorViewViewProtocol>
@end

@implementation AdvancedTextInputMaskDecoratorView {
  AdvancedTextInputViewDecoratorView *_view;
}

// Needed because of this: https://github.com/facebook/react-native/pull/37274
+ (void)load
{
  [super load];
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps =
        std::make_shared<const AdvancedTextInputMaskDecoratorViewProps>();
    _props = defaultProps;

    _view = [AdvancedTextInputViewDecoratorView new];
    _view.delegate = self;

    self.contentView = _view;
  }

  return self;
}

#pragma mark - RCTComponentViewProtocol

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<
      AdvancedTextInputMaskDecoratorViewComponentDescriptor>();
}

- (void)updateProps:(const facebook::react::Props::Shared &)props
           oldProps:(const facebook::react::Props::Shared &)oldProps
{
  const auto &oldViewProps =
      *std::static_pointer_cast<const AdvancedTextInputMaskDecoratorViewProps>(_props);
  const auto &newViewProps =
      *std::static_pointer_cast<const AdvancedTextInputMaskDecoratorViewProps>(props);

  if (newViewProps.value != oldViewProps.value) {
    [_view setValue:RCTNSStringFromString(newViewProps.value)];
  }

  if (newViewProps.defaultValue != oldViewProps.defaultValue) {
    [_view setDefaultValue:RCTNSStringFromString(newViewProps.defaultValue)];
  }

  if (newViewProps.primaryMaskFormat != oldViewProps.primaryMaskFormat) {
    [_view setPrimaryMaskFormat:RCTNSStringFromString(newViewProps.primaryMaskFormat)];
  }

  if (newViewProps.customNotations != oldViewProps.customNotations) {
    [_view setCustomNotations:convertCustomNotations(newViewProps.customNotations)];
  }
  
  if (newViewProps.allowedKeys != oldViewProps.allowedKeys) {
    [_view setAllowedKeys:RCTNSStringFromString(newViewProps.allowedKeys)];
  }

  if (newViewProps.allowSuggestions != oldViewProps.allowSuggestions) {
    [_view setAllowSuggestions:newViewProps.allowSuggestions];
  }

  if (newViewProps.autocomplete != oldViewProps.autocomplete) {
    [_view setAutocomplete:newViewProps.autocomplete];
  }

  if (newViewProps.autocompleteOnFocus != oldViewProps.autocompleteOnFocus) {
    [_view setAutocompleteOnFocus:newViewProps.autocompleteOnFocus];
  }

  if (newViewProps.autoSkip != oldViewProps.autoSkip) {
    [_view setAutoSkip:newViewProps.autoSkip];
  }

  if (newViewProps.affinityFormat != oldViewProps.affinityFormat) {
    [_view setAffinityFormat:convertAffinityFormat(newViewProps.affinityFormat)];
  }

  if (newViewProps.isRTL != oldViewProps.isRTL) {
    [_view setIsRTL:newViewProps.isRTL];
  }

  if (newViewProps.affinityCalculationStrategy != oldViewProps.affinityCalculationStrategy) {
    [_view setAffinityCalculationStrategy:newViewProps.affinityCalculationStrategy];
  }

  [super updateProps:props oldProps:oldProps];
}

- (void)onAdvancedMaskTextChangeWithEventData:(NSDictionary *)eventData
{
  if (!_eventEmitter) {
    return;
  }

  NSString *formatted = eventData[(id) @"formatted"];
  NSString *extracted = eventData[(id) @"extracted"];
  NSString *tailPlaceholder = eventData[(id) @"tailPlaceholder"];

  AdvancedTextInputMaskDecoratorViewEventEmitter::OnAdvancedMaskTextChange event = {
      .formatted = std::string([formatted UTF8String]),
      .extracted = std::string([extracted UTF8String]),
      .tailPlaceholder = std::string([tailPlaceholder UTF8String])};

  std::dynamic_pointer_cast<const AdvancedTextInputMaskDecoratorViewEventEmitter>(_eventEmitter)
      ->onAdvancedMaskTextChange(event);
}

@end

Class<RCTComponentViewProtocol> AdvancedTextInputMaskDecoratorViewCls(void)
{
  return AdvancedTextInputMaskDecoratorView.class;
}

#endif
