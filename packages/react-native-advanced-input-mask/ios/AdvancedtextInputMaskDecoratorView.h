//
//  AdvancedtextInputMaskDecoratorView.h
//  Pods
//
//  Created by Ivan Ignathuk on 23/10/2024.
//

#pragma once

// This guard prevent this file to be compiled in the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>
#import <react/renderer/components/maskedtextinput/Props.h>
#import "AdvancedTextInputViewContainer.h"

NS_ASSUME_NONNULL_BEGIN

@interface AdvancedTextInputMaskDecoratorView
    : RCTViewComponentView <AdvancedTextInputViewContainerDelegate>
@end

namespace facebook {
namespace react {
// In order to compare these structs we need to add the == operator for each
// TODO:
// https://github.com/reactwg/react-native-new-architecture/discussions/91#discussioncomment-4426469
bool operator==(
    const AdvancedTextInputMaskDecoratorViewCustomNotationsStruct &a,
    const AdvancedTextInputMaskDecoratorViewCustomNotationsStruct &b)
{
  return b.character == a.character && b.characterSet == a.characterSet &&
      b.isOptional == a.isOptional;
}
} // namespace react
} // namespace facebook

NS_ASSUME_NONNULL_END

#endif /* RCT_NEW_ARCH_ENABLED */
