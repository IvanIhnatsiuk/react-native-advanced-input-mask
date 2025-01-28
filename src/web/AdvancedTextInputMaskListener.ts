import Mask from './helper/Mask';
import RTLMask from './helper/RTLMask';
import CaretString from './model/CaretString';
import { CaretGravityType } from './model/types';
import type { Notation } from '../types';
import type { MaskResult } from './model/types';
import { AFFINITY_CALCULATION_STRATEGY } from '../enums';
import { calculateAffinityOfMask } from './helper/affinityCalculationStrategy';
import type {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputFocusEventData,
} from 'react-native';

type Field = HTMLInputElement;

type MaskAffinity = { mask: Mask; affinity: number };

class MaskedTextChangedListener {
  public primaryFormat: string;
  public affineFormats: string[];
  public customNotations: Notation[];
  public affinityCalculationStrategy: AFFINITY_CALCULATION_STRATEGY;
  public autocomplete: boolean;
  public autoskip: boolean;
  public rightToLeft: boolean;
  public textField: Field | null = null;
  public allowedKeys: string;

  constructor(
    primaryFormat: string,
    affineFormats: string[] = [],
    customNotations: Notation[] = [],
    affinityCalculationStrategy: AFFINITY_CALCULATION_STRATEGY = AFFINITY_CALCULATION_STRATEGY.WHOLE_STRING,
    autocomplete: boolean = true,
    autoskip: boolean = false,
    rightToLeft: boolean = false,
    allowedKeys: string = ''
  ) {
    this.primaryFormat = primaryFormat;
    this.affineFormats = affineFormats;
    this.customNotations = customNotations;
    this.affinityCalculationStrategy = affinityCalculationStrategy;
    this.autocomplete = autocomplete;
    this.autoskip = autoskip;
    this.rightToLeft = rightToLeft;
    this.allowedKeys = allowedKeys;
  }

  private applyMaskAndSetText = (
    textField: Field,
    rawText: string,
    caretPosition: number,
    isDeletion: boolean,
    autocomplete?: boolean
  ): MaskResult => {
    const filteredText = this.allowedKeys
      ? [...rawText].filter((char) => this.allowedKeys.includes(char)).join('')
      : rawText;

    const caretGravity = {
      type: isDeletion ? CaretGravityType.Backward : CaretGravityType.Forward,
      autoskip: isDeletion ? this.autoskip : false,
      autocomplete: isDeletion ? false : autocomplete ?? this.autocomplete,
    };

    const textAndCaret = new CaretString(
      filteredText,
      caretPosition,
      caretGravity
    );

    const mask = this.pickMask(textAndCaret);
    const result = mask.apply(textAndCaret);

    textField.value = result.formattedText.string;
    textField.setSelectionRange(
      result.formattedText.caretPosition,
      result.formattedText.caretPosition
    );

    return result;
  };

  public get primaryMask(): Mask {
    return this.maskGetOrCreate(this.primaryFormat, this.customNotations);
  }

  public setText(text: string, autocomplete?: boolean): void {
    if (!this.textField) {
      return;
    }

    const isDeletion = this.textField.value.length > text.length;

    this.applyMaskAndSetText(
      this.textField,
      text,
      text.length,
      isDeletion,
      autocomplete
    );
  }

  public setAllowedKeys = (allowedKeys: string): void => {
    this.allowedKeys = allowedKeys;

    if (this.textField && allowedKeys) {
      this.setText(this.textField.value, false);
    }
  };

  public get placeholder(): string {
    return this.primaryMask.placeholder();
  }

  public get acceptableTextLength(): number {
    return this.primaryMask.acceptableTextLength();
  }

  public get totalTextLength(): number {
    return this.primaryMask.totalTextLength();
  }

  public get acceptableValueLength(): number {
    return this.primaryMask.acceptableValueLength();
  }

  public get totalValueLength(): number {
    return this.primaryMask.totalValueLength();
  }

  public setTextField = (textField: Field): void => {
    this.textField = textField;
  };

  public handleTextChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ): MaskResult => {
    const { nativeEvent, target } = event;
    const { inputType, text } =
      nativeEvent as NativeSyntheticEvent<TextInputChangeEventData>['nativeEvent'] &
        InputEvent;
    const textField = target as unknown as HTMLInputElement;
    const isDeletion =
      inputType === 'deleteContentForward' ||
      inputType === 'deleteContentBackward';

    const selectionStart = textField.selectionStart || 0;
    const isInside = selectionStart < text.length;
    const caretPosition = isDeletion || isInside ? selectionStart : text.length;

    return this.applyMaskAndSetText(textField, text, caretPosition, isDeletion);
  };

  handleFocus = (
    event: NativeSyntheticEvent<TextInputFocusEventData>
  ): void => {
    if (this.autocomplete) {
      const textField = event.target as unknown as HTMLInputElement;
      const text = textField.value.length > 0 ? textField.value : '';

      this.applyMaskAndSetText(textField, text, text.length, false, true);
    }
  };

  pickMask = (text: CaretString): Mask => {
    if (!this.affineFormats.length) {
      return this.primaryMask;
    }

    const candidates: MaskAffinity[] = [
      {
        mask: this.primaryMask,
        affinity: calculateAffinityOfMask(
          this.affinityCalculationStrategy,
          this.primaryMask,
          text
        ),
      },
      ...this.affineFormats.map((format) => {
        const candidateMask = this.maskGetOrCreate(
          format,
          this.customNotations
        );
        return {
          mask: candidateMask,
          affinity: calculateAffinityOfMask(
            this.affinityCalculationStrategy,
            candidateMask,
            text
          ),
        };
      }),
    ];

    candidates.sort((a, b) => b.affinity - a.affinity);

    return candidates[0]!.mask;
  };

  private maskGetOrCreate = (
    format: string,
    customNotations: Notation[]
  ): Mask =>
    this.rightToLeft
      ? RTLMask.getOrCreate(format, customNotations)
      : Mask.getOrCreate(format, customNotations);
}

export default MaskedTextChangedListener;
