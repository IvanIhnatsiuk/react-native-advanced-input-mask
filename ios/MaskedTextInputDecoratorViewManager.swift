//
//  MaskedTextInputDecoratorViewManager.swift
//  react-native-masked-text-input
//
//  Created by Ivan Ignathuk on 05/10/2024.
//

import Foundation

@objc(MaskedTextInputDecoratorViewManager)
class MaskedTextInputDecoratorViewManager: RCTViewManager {
  override func view() -> UIView! {
    MaskedTextInputDecoratorView()
  }

  override public static func requiresMainQueueSetup() -> Bool {
    false
  }
}
