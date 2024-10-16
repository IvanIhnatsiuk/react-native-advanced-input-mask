//
//  NotifyingMaskedTextFieldListener.swift
//  react-native-advanced-input-mask
//
//  Created by Ivan Ignathuk on 16/10/2024.
//

import ForkInputMask
import Foundation
import UIKit

class NotifyingMaskedTextFieldListener: MaskedTextInputListener {
    override func textField(
        _ textField: UITextField,
        shouldChangeCharactersIn range: NSRange,
        replacementString string: String
    ) -> Bool {
        defer {
            NotificationCenter.default.post(name: UITextField.textDidChangeNotification, object: textField)
            textField.sendActions(for: .editingChanged)
        }
        return super.textField(textField, shouldChangeCharactersIn: range, replacementString: string)
    }
}
