//
//  NotifyingAdvancedTexInputMaskListener.swift
//  react-native-advanced-input-mask
//
//  Created by Ivan Ignathuk on 16/10/2024.
//

import ForkInputMask
import Foundation
import UIKit

class NotifyingAdvancedTexInputMaskListener: MaskedTextInputListener {
  public var allowedKeys = ""

  override func textField(
    _ textField: UITextField,
    shouldChangeCharactersIn range: NSRange,
    replacementString string: String
  ) -> Bool {
    let newText: String = allowedKeys.isEmpty
      ? string
      : strString(string.filter { allowedKeys.contains($0) })

    defer {
      NotificationCenter.default.post(name: UITextField.textDidChangeNotification, object: textField)
      textField.sendActions(for: .editingChanged)
    }

    return super.textField(textField, shouldChangeCharactersIn: range, replacementString: newText)
  }
}
