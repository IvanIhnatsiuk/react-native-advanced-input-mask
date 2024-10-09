//
//  MaskedTextInputManager.swift
//  react-native-masked-text-input
//
//  Created by Ivan Ignathuk on 05/10/2024.
//

import Foundation

@objc (MaskedTextInputDecoratorViewManager)
class MaskedTextInputDecoratorViewManager: RCTViewManager {
  override func view() -> UIView! {
    MaskedTextInputDecoratorView()
  }
    
    
  public override static func requiresMainQueueSetup() -> Bool {
      return true
  }
}
