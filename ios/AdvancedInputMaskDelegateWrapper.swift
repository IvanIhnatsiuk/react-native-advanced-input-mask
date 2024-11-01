//
//  AdvancedInputMaskDelegateWrapper.swift
//  react-native-advanced-input-mask
//
//  Created by Ivan Ignathuk on 01/11/2024.
//

import ForkInputMask
import Foundation
import UIKit

class AdvancedInputMaskDelegateWrapper: NSObject, UITextFieldDelegate {
  weak var textFieldDelegate: UITextFieldDelegate?

  init(textFieldDelegate: UITextFieldDelegate?) {
    self.textFieldDelegate = textFieldDelegate
    super.init()
  }

  func textFieldDidEndEditing(_ textField: UITextField, reason _: UITextField.DidEndEditingReason) {
    // since reason method doesn't exist in RN delegate, but we need this event to properly blur the input
    textFieldDelegate?.textFieldDidEndEditing?(textField)
  }

  // MARK: call forwarding

  override func responds(to aSelector: Selector!) -> Bool {
    if super.responds(to: aSelector) {
      return true
    }
    return textFieldDelegate?.responds(to: aSelector) ?? false
  }

  override func forwardingTarget(for aSelector: Selector!) -> Any? {
    if textFieldDelegate?.responds(to: aSelector) ?? false {
      return textFieldDelegate
    }
    return super.forwardingTarget(for: aSelector)
  }
}
