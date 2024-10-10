import Foundation
import UIKit
import ForkInputMask

@objc protocol MaskedTextInputDecoratorViewDelegate {
    func onChangeText(extracted: String, formatted: String)
}

class MaskedTextInputDecoratorView: UIView {
    var textView: RCTBaseTextInputView?
    var maskInputListener: MaskedTextInputListener?
    var lastDispatchedEvent: [String: String] = [:]
    var listener: MaskedRCTBackedTextFieldDelegateAdapter?
    
    @objc weak var delegate: MaskedTextInputDecoratorViewDelegate?
    
    @objc var onChangeTextCallback: (_ extracted: String, _ formatted: String) -> Void {
        return { [weak self] extracted, formatted in
            guard let self = self else { return }
            
            let eventData: [String: String] = [
                "extracted": extracted,
                "formatted": formatted
            ]
            
            if NSDictionary(dictionary: eventData).isEqual(to: lastDispatchedEvent) {
                  return
            }
            lastDispatchedEvent = eventData
            if (self.onChangeText != nil) {
                self.onChangeText!(eventData)
            }
        }
    }

    
    @objc var primaryMaskFormat: NSString = "" {
        didSet {
            print(primaryMaskFormat)
            maskInputListener?.primaryMaskFormat = primaryMaskFormat as String
            guard let backedTextInputView = self.textView?.backedTextInputView else { return }
            
            maybeUpdateText(text: backedTextInputView.allText)
        }
    }

    @objc var onChangeText: RCTBubblingEventBlock?
    
    @objc var autocomplete: Bool = true {
        didSet {
            maskInputListener?.autocomplete = autocomplete
        }
    }
    
    @objc var autocompleteOnFocus: Bool = false {
        didSet {
            maskInputListener?.autocompleteOnFocus = autocompleteOnFocus
        }
    }
    
    @objc var allowSuggestions: Bool = true {
        didSet {
            maskInputListener?.allowSuggestions = allowSuggestions
        }
    }
    
    @objc var autoSkip: Bool = false {
        didSet {
            maskInputListener?.autoskip = autoSkip
        }
    }
    
    @objc var isRTL: Bool = false {
        didSet {
            maskInputListener?.rightToLeft = isRTL
            
            guard let backedTextInputView = self.textView?.backedTextInputView else { return }
            maybeUpdateText(text: backedTextInputView.allText)
        }
    }
    
    @objc var affinityFormat: [String] = [] {
        didSet {
            maskInputListener?.affineFormats = affinityFormat
        }
    }
    
    @objc var affinityCalculationStrategy: NSNumber? = 0 {
        didSet {
            maskInputListener?.affinityCalculationStrategy = AffinityCalculationStrategy.forNumber(number: affinityCalculationStrategy)
        }
    }
    
    @objc var defaultValue: NSString = "" {
        didSet {
            updateTextWithoutNotification(text: defaultValue as String)
        }
    }
    
    private func updateTextWithoutNotification(text: String) {
        guard let backedTextInputView = self.textView?.backedTextInputView else { return }
        
        if(text == "") {
            return
        }
        
        guard let primaryMask = maskInputListener?.primaryMask else { return }
        let caretString = CaretString(
            string: text, caretPosition: text.endIndex, caretGravity: CaretString.CaretGravity.forward(autocomplete: autocomplete)
        );
        let result = primaryMask.apply(toText: caretString)
        
        backedTextInputView.allText = result.formattedText.string
    }
    
    private func maybeUpdateText(text: String) {
        guard let backedTextInputView = self.textView?.backedTextInputView else { return }
        
        if(text == "") {
            return
        }
        
        guard let primaryMask = maskInputListener?.primaryMask else { return }
        let carretString = CaretString(
            string: text, caretPosition: text.endIndex, caretGravity: CaretString.CaretGravity.forward(autocomplete: autocomplete)
        );
        let result = primaryMask.apply(toText: carretString)
        
        if(text == result.formattedText.string){
            return
        }
        
        backedTextInputView.allText = result.formattedText.string
        maskInputListener?.notifyOnMaskedTextChangedListeners(forTextInput: backedTextInputView as! UITextField, result: result)
    }
    
    @objc var customNotations: NSArray? {
        didSet {
            let customNotations = (self.customNotations as? [[String:Any]])?.map { $0.toNotation() } ?? []
            
            maskInputListener?.customNotations = customNotations
        }
    }

    override func didMoveToWindow() {
        super.didMoveToWindow()
        
        var previousSibling: UIView?
        if let parent = self.superview {
            for i in 1..<parent.subviews.count {
                if parent.subviews[i] == self {
                    previousSibling = parent.subviews[i - 1]
                    break
                }
            }
        }
        
        if let previousSibling = previousSibling as? RCTBaseTextInputView {
            textView = previousSibling
            guard let textView = textView?.backedTextInputView as? RCTUITextField else { return }
            maskInputListener = MaskedTextInputListener(
                        primaryFormat: primaryMaskFormat as String,
                        autocomplete: autocomplete,
                        autocompleteOnFocus: autocompleteOnFocus,
                        autoskip: autoSkip,
                        rightToLeft: isRTL,
                        affineFormats: affinityFormat,
                        affinityCalculationStrategy: AffinityCalculationStrategy.forNumber(number: affinityCalculationStrategy), customNotations: (self.customNotations as? [[String:Any]])?.map { $0.toNotation() } ?? [],
                        onMaskedTextChangedCallback: { input, value, complete, tailPlaceholder in
                            self.onChangeTextCallback(value, input.allText)
                        },
                        allowSuggestions: allowSuggestions
            )
            listener = MaskedRCTBackedTextFieldDelegateAdapter(textField: textView)
            maskInputListener?.textFieldDelegate = listener
            textView.delegate = maskInputListener
            updateTextWithoutNotification(text: defaultValue as String)
        }
    }
}

class MaskedRCTBackedTextFieldDelegateAdapter : RCTBackedTextFieldDelegateAdapter, UITextFieldDelegate {}
