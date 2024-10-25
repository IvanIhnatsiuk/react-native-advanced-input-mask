//
//  MaskedTextInputDecoratorViewManager.swift
//  react-native-advanced-input-mask
//
//  Created by Ivan Ignathuk on 05/10/2024.
//

import Foundation

@objc(AdvancedTextInputMaskDecoratorViewManager)
class AdvancedTextInputMaskDecoratorViewManager: RCTViewManager {
  override func view() -> UIView! {
    AdvancedTextInputMaskDecoratorView()
  }

  override public static func requiresMainQueueSetup() -> Bool {
    false
  }
}
