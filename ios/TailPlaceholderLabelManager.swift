//
//  TailPlaceholderLabelManager.swift
//  react-native-advanced-input-mask
//
//  Created by Ivan Ignathuk on 07/11/2024.
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

        // Configure the label
        tailPlaceholderLabel.textColor = .systemRed
        tailPlaceholderLabel.font = textField.font
        tailPlaceholderLabel.isUserInteractionEnabled = false
        tailPlaceholderLabel.backgroundColor = .systemPink

        // Add the label to the textField
        textField.addSubview(tailPlaceholderLabel)
        tailPlaceholderLabel.translatesAutoresizingMaskIntoConstraints = false

        // Set up constraints
        tailPlaceholderLabelLeadingConstraint = tailPlaceholderLabel.leadingAnchor.constraint(equalTo: textField.leadingAnchor)
        tailPlaceholderLabelLeadingConstraint?.isActive = true

        NSLayoutConstraint.activate([
            tailPlaceholderLabel.centerYAnchor.constraint(equalTo: textField.centerYAnchor)
        ])
    }

    func updateTailPlaceholder(inputText: String, tailPlaceholder: String) {
        guard let textField = textField else { return }
        tailPlaceholderLabel.text = tailPlaceholder

        // Calculate the width of the input text
        let inputTextWidth = inputText.boxSizeWithFont(textField.font ?? UIFont.systemFont(ofSize: 14)).width

        tailPlaceholderLabelLeadingConstraint?.constant = inputTextWidth

        // Layout the textField to apply changes
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


