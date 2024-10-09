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
    var customNotation: [Notation] = []
    
    var maskFormat: NSString = ""

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
            maybeUpdateText()
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
    
    private func maybeUpdateText() {
        guard let textView = self.textView?.backedTextInputView else { return }
        let currentText = textView.allText
        
        if(currentText == ""){
            return
        }
        
        guard let primaryMask = maskInputListener?.primaryMask else { return }
        let carretString = CaretString(
            string: currentText, caretPosition: currentText.endIndex, caretGravity: CaretString.CaretGravity.forward(autocomplete: autocomplete)
        );
        let result = primaryMask.apply(toText: carretString)
        
        if(currentText == result.formattedText.string){
            return
        }
        
        textView.allText = result.formattedText.string
        maskInputListener?.notifyOnMaskedTextChangedListeners(forTextInput: textView as! UITextField, result: result)
    }

    
    @objc func setMask(_ maskFormat: NSDictionary) {
        self.maskFormat = maskFormat["maskFormat"] as! NSString
        customNotation = (maskFormat["customNotations"] as? [[String:Any]])?.map { $0.toNotation() } ?? []
        maskInputListener?.primaryMaskFormat = self.maskFormat as String
        maskInputListener?.customNotations = customNotation

        maybeUpdateText()
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
                        primaryFormat: maskFormat as String,
                        autocomplete: autocomplete,
                        autocompleteOnFocus: autocompleteOnFocus,
                        autoskip: autoSkip,
                        rightToLeft: isRTL,
                        affineFormats: affinityFormat,
                        affinityCalculationStrategy: AffinityCalculationStrategy.forNumber(number: affinityCalculationStrategy), customNotations: customNotation,
                        onMaskedTextChangedCallback: { input, value, complete, tailPlaceholder in
                            self.onChangeTextCallback(input.allText, value)
                        },
                        allowSuggestions: allowSuggestions
                    )
            textView.delegate = maskInputListener
            
        }
    }
}
