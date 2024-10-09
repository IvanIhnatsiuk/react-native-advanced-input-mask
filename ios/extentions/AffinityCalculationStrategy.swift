//
//  AffinityStrategy.swift
//  react-native-masked-text-input
//
//  Created by Ivan Ignathuk on 08/10/2024.
//

import Foundation
import ForkInputMask

extension AffinityCalculationStrategy {
    static func forNumber(number: NSNumber?) -> AffinityCalculationStrategy {
        switch number {
            case 0:
                return AffinityCalculationStrategy.wholeString
            case 1:
                return AffinityCalculationStrategy.prefix
            case 2:
                return AffinityCalculationStrategy.capacity
            case 3:
                return AffinityCalculationStrategy.extractedValueCapacity
            default:
                return AffinityCalculationStrategy.wholeString
        }
    }
}
