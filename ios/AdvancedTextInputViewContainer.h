//
//  Header.h
//  Pods
//
//  Created by Ivan Ignathuk on 23/10/2024.
//

@class UITraitCollection;
@class NSDictionary;
@class NSString;
@class NSCoder;

#import <React/RCTView.h>

@protocol AdvancedTextInputViewContainerDelegate
- (void)onAdvancedMaskTextChangeWithEventData:(NSDictionary *)eventData;
@end

@interface AdvancedTextInputViewDecoratorView : RCTView
@property (nonatomic, weak) id <AdvancedTextInputViewContainerDelegate> _Nullable delegate;
- (void)setPrimaryMaskFormat:(NSString * _Nonnull)primaryMaskFormat;
- (void)setAutocomplete:(BOOL)autocomplete;
- (void)setAutocompleteOnFocus:(BOOL)autocompleteOnFocus;
- (void)setAllowSuggestions:(BOOL)allowSuggestions;
- (void)setCustomNotations:(NSArray<NSDictionary *> *)customNotations;
- (void)setAutoSkip:(BOOL)autoSkip;
- (void)setIsRTL:(BOOL)isRTL;
- (void)setDefaultValue:(NSString *)defaultValue;
- (void)setValue:(NSString *)value;
- (void)setAffinityFormat:(NSArray<NSString *> *)affinityFormat;
- (void)setAffinityCalculationStrategy:(NSInteger)affinityCalculationStrategy;
@end
