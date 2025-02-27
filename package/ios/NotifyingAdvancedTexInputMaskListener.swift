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
  public var validationRegex: NSRegularExpression?

    public init(primaryFormat: String,
              autocomplete: Bool,
              autocompleteOnFocus: Bool,
              autoskip: Bool,
              rightToLeft: Bool,
              affineFormats: [String],
              affinityCalculationStrategy: AffinityCalculationStrategy,
              customNotations: [Notation],
              onMaskedTextChangedCallback: (
                (_ textInput: UITextInput,
                 _ value: String,
                 _ complete: Bool,
                 _ tailPlaceholder: String) -> Void)?,
              allowSuggestions: Bool,
              allowedKeys: String,
              validationRegex: NSRegularExpression?)
  {
    self.allowedKeys = allowedKeys
    self.validationRegex = validationRegex
    super.init(
      primaryFormat: primaryFormat,
      autocomplete: autocomplete,
      autocompleteOnFocus: autocompleteOnFocus,
      autoskip: autoskip,
      rightToLeft: rightToLeft,
      affineFormats: affineFormats,
      affinityCalculationStrategy: affinityCalculationStrategy,
      customNotations: customNotations,
      onMaskedTextChangedCallback: onMaskedTextChangedCallback,
      allowSuggestions: allowSuggestions
    )
  }

  private func isValid(_ text: String) -> Bool {
    guard let validationRegex = validationRegex else {
      return true
    }

    let range = NSRange(location: 0, length: text.utf16.count)

    return validationRegex.firstMatch(in: text, options: [], range: range) != nil
  }

  override func textField(
    _ textField: UITextField,
    shouldChangeCharactersIn range: NSRange,
    replacementString string: String
  ) -> Bool {
    let newText: String = allowedKeys.isEmpty
      ? string
      : String(string.filter { allowedKeys.contains($0) })
    let nextTextFieldText = ((textField.text ?? "") as NSString).replacingCharacters(in: range, with: newText)

    if !isValid(nextTextFieldText) {
      return false
    }

    defer {
      NotificationCenter.default.post(name: UITextField.textDidChangeNotification, object: textField)
      textField.sendActions(for: .editingChanged)
    }

    return super.textField(textField, shouldChangeCharactersIn: range, replacementString: newText)
  }
}
