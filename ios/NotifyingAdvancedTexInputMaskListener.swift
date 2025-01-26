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

  public init(primaryFormat: String = "",
              autocomplete: Bool = true,
              autocompleteOnFocus: Bool = true,
              autoskip: Bool = false,
              rightToLeft: Bool = false,
              affineFormats: [String] = [],
              affinityCalculationStrategy: AffinityCalculationStrategy = .wholeString,
              customNotations: [Notation] = [],
              onMaskedTextChangedCallback: ((_ textInput: UITextInput, _ value: String, _ complete: Bool, _ tailPlaceholder: String) -> Void)? = nil,
              allowSuggestions: Bool = true,
              allowedKeys: String = "")
  {
    self.allowedKeys = allowedKeys
    super.init(primaryFormat: primaryFormat, autocomplete: autocomplete, autocompleteOnFocus: autocompleteOnFocus, autoskip: autoskip, rightToLeft: rightToLeft, affineFormats: affineFormats, affinityCalculationStrategy: affinityCalculationStrategy, customNotations: customNotations, onMaskedTextChangedCallback: onMaskedTextChangedCallback, allowSuggestions: allowSuggestions)
  }

  override func textField(
    _ textField: UITextField,
    shouldChangeCharactersIn range: NSRange,
    replacementString string: String
  ) -> Bool {
    let newText: String = allowedKeys.isEmpty
      ? string
      : String(string.filter { allowedKeys.contains($0) })

    defer {
      NotificationCenter.default.post(name: UITextField.textDidChangeNotification, object: textField)
      textField.sendActions(for: .editingChanged)
    }

    return super.textField(textField, shouldChangeCharactersIn: range, replacementString: newText)
  }
}
