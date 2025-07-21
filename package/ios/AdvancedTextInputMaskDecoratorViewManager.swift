//
//  AdvancedTextInputMaskDecoratorViewManager.swift
//  react-native-advanced-input-mask
//
//  Created by Ivan Ignathuk on 05/10/2024.
//

import Foundation
import UIKit

@objc(AdvancedTextInputMaskDecoratorViewManager)
class AdvancedTextInputMaskDecoratorViewManager: RCTViewManager {
  override func view() -> UIView! {
    AdvancedTextInputMaskDecoratorView()
  }

  override static func requiresMainQueueSetup() -> Bool {
    true
  }

  @objc(setText:text:autocomplete:)
  func setText(_ reactTag: NSNumber, text: NSString, autocomplete: Bool) {
    bridge.uiManager.addUIBlock { _, viewRegistry in
      guard let view = viewRegistry?[reactTag] as? AdvancedTextInputMaskDecoratorView else {
        if RCT_DEBUG == 1 {
          print("Invalid view returned from registry, expecting ContainerView")
        }
        return
      }

      view.setMaskedText(text: text, autocomplete: autocomplete)
    }
  }
}
