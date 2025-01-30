//
//  TailPlaceholderView.swift
//  react-native-advanced-input-mask
//
//  Created by Ivan Ihnatsiuks on 30/01/2025.
//

import UIKit
import Foundation
import ForkInputMask

class TailPlaceholderLabelManager {
    private weak var textField: UITextField?
    private var tailPlaceholderLabel = UILabel()
    private var tailPlaceholderLabelLeadingConstraint: NSLayoutConstraint?

    init(textField: UITextField) {
        self.textField = textField
        setupTailPlaceholderLabel()
    }

    private func setupTailPlaceholderLabel() {
        guard let textField = textField else { return }

        tailPlaceholderLabel.textColor = textField.tintColor
        tailPlaceholderLabel.font = textField.font
        tailPlaceholderLabel.isUserInteractionEnabled = false

        textField.addSubview(tailPlaceholderLabel)
        tailPlaceholderLabel.translatesAutoresizingMaskIntoConstraints = false

        tailPlaceholderLabelLeadingConstraint = tailPlaceholderLabel.leadingAnchor.constraint(equalTo: textField.leadingAnchor)
        tailPlaceholderLabelLeadingConstraint?.isActive = true

        NSLayoutConstraint.activate([
            tailPlaceholderLabel.centerYAnchor.constraint(equalTo: textField.centerYAnchor)
        ])
    }

    func updateTailPlaceholder(inputText: String, tailPlaceholder: String) {
        guard let textField = textField else { return }
        tailPlaceholderLabel.text = tailPlaceholder

        let inputTextWidth = inputText.boxSizeWithFont(textField.font ?? UIFont.systemFont(ofSize: 14)).width

        tailPlaceholderLabelLeadingConstraint?.constant = inputTextWidth

        textField.layoutIfNeeded()
    }

    func unmountTailPlaceholderLabel() {
        if tailPlaceholderLabel.superview != nil {
            tailPlaceholderLabel.removeFromSuperview()
        }
    }

    func mountTailPlaceholderLabel() {
        if tailPlaceholderLabel.superview == nil {
            setupTailPlaceholderLabel()
        }
    }
}


