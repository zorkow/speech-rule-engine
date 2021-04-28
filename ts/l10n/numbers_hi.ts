//
// Copyright 2021 Volker Sorge
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Translating numbers into Hindi.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was supported by British Council UKIERI SPARC Project #P1161
//



import * as NumbersExports from './numbers';
import {Numbers} from './numbers';


/**
 * String representation of zero to nineteen.
 */
export const onesNumbers_: string[] = [
  '',       'एक',     'दो',     'तीन',    'चार',     'पाँच',    'छः',
  'सात',    'आठ',     'नौ',     'दस',     'ग्यारह',   'बारह',   'तेरह',
  'चौदह',   'पंद्रह',   'सोलह',   'सत्रह',   'अठारह',   'उन्नीस',  'बीस',
  'इक्कीस',  'बाईस',   'तेइस',    'चौबीस',  'पच्चीस',   'छब्बीस',  'सताइस',
  'अट्ठाइस', 'उनतीस',  'तीस',    'इकतीस',  'बतीस',    'तैंतीस',   'चौंतीस',
  'पैंतीस',   'छतीस',   'सैंतीस',   'अड़तीस',  'उनतालीस', 'चालीस',  'इकतालीस',
  'बयालीस', 'तैतालीस', 'चवालीस', 'पैंतालीस', 'छयालिस',  'सैंतालीस', 'अड़तालीस',
  'उनचास',  'पचास',   'इक्यावन', 'बावन',   'तिरपन',   'चौवन',   'पचपन',
  'छप्पन',   'सतावन',  'अठावन',  'उनसठ',   'साठ',     'इकसठ',   'बासठ',
  'तिरसठ',  'चौंसठ',   'पैंसठ',    'छियासठ', 'सड़सठ',    'अड़सठ',   'उनहतर',
  'सत्तर',   'इकहतर',  'बहतर',   'तिहतर',  'चौहतर',   'पचहतर',  'छिहतर',
  'सतहतर',  'अठहतर',  'उन्नासी', 'अस्सी',   'इक्यासी',  'बयासी',  'तिरासी',
  'चौरासी', 'पचासी',  'छियासी', 'सतासी',  'अट्ठासी',  'नवासी',  'नब्बे',
  'इक्यानवे', 'ब्यानवे',  'तिरानवे', 'चौरानवे', 'पचानवे',   'छियानवे', 'सतानवे',
  'अट्ठानवे', 'निन्यानवे'
];


export const hundred_: string = 'सौ';
// hundred: 1 - 9 hundred  (sau)


/**
 * String representation of thousand to decillion.
 */
export const largeNumbers_: string[] = [
  'हजार',     // thousand: 1 - 99 thousand (hazaar)
  'लाख',      // thousand/million: 100 thousand - 9 million (lakh)
  'करोड़',     // million: 10 - 999 million (caror)
  'अरब',      // billion: 1 - 99 billion (arab)
  'खरब',      // billion/trillion: 100 billion - 9 trillion (kharab)
  'नील',      // 10 trillion - 999 trillion (sau kharab)
  'पद्मा',     // 1 quadrillion - 99 quadrillion (nil)
  'शंख',       // 100 quadrillion - 9 quintillion (padma)
  'महाशंख',    // 10 quin - 999 quin (Shankh)
  'महाउपाध',  // 1 sext - 99 sext
  'जल्द',      // 100 sext - 9 sept
  'परार्ध', 'अंत', 'शिष्ट'
];


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param number The number to translate.
 * @return The string representation of that number.
 */
export function hundredsToWords_(number: number): string {
  let n = number % 1000;
  let str = '';
  str += onesNumbers_[Math.floor(n / 100)] ?
      onesNumbers_[Math.floor(n / 100)] + NUMBERS.numSep + hundred_ :
      '';
  n = n % 100;
  if (n) {
    str += str ? NUMBERS.numSep : '';
    str += onesNumbers_[n];
  }
  return str;
}


/**
 * Translates a number of up to twelve digits into a string representation.
 * @param number The number to translate.
 * @return The string representation of that number.
 */
export function numberToWords(number: number): string {
  if (number >= Math.pow(10, 32)) {
    return number.toString();
  }
  let pos = 0;
  let str = '';
  let hundreds = number % 1000;
  let hundredsWords = hundredsToWords_(hundreds);
  number = Math.floor(number / 1000);
  if (!number) {
    return hundredsWords;
  }
  while (number > 0) {
    let thousands = number % 100;
    if (thousands) {
      str = onesNumbers_[thousands] + NUMBERS.numSep + largeNumbers_[pos] +
          (str ? NUMBERS.numSep + str : '');
    }
    number = Math.floor(number / 100);
    pos++;
  }
  return hundredsWords ? str + NUMBERS.numSep + hundredsWords : str;
}


export const smallDenominators_: string[] = [
  '', 'एकांश', 'द्वितीयांश', 'तृतीयांश', 'चतुर्थांश', 'पंचमांश', 'षष्टांश', 'सप्तमांश',
  'अष्टांश', 'नवमांश', 'दशांश'
];


/**
 * Translates a number of up to twelve digits into a string representation of
 * its ordinal.
 * @param num The number to translate.
 * @param plural A flag indicating if the ordinal is in plural.
 * @return The ordinal of the number as string.
 */
export function numberToOrdinal(num: number, plural: boolean): string {
  if (num <= 10) {
    return smallDenominators_[num];
  }
  return wordOrdinal(num) + ' अंश';
}


export const ordinalsMasculine_: string[] = [
  '', 'पहला', 'दूसरा', 'तीसरा', 'चौथा', 'पांचवाँ', 'छठा', 'सातवाँ', 'आठवाँ', 'नौवाँ'
];


export const ordinalsFeminine_: string[] = [
  '', 'पहली', 'दूसरी', 'तीसरी', 'चौथी', 'पाँचवीं', 'छठी', 'सातवीं', 'आठवीं', 'नौवीं'
];


/**
 * Creates a word ordinal string from a number.
 * @param number The number to be converted.
 * @return The ordinal string.
 */
export function wordOrdinal(number: number): string {
  let gender = (sre.Grammar.getInstance().getParameter('gender') as string);
  if (number <= 0) {
    return number.toString();
  }
  if (number < 10) {
    return gender === 'female' ? ordinalsFeminine_[number] :
                                 ordinalsMasculine_[number];
  }
  let ordinal = numberToWords(number);
  return ordinal + (gender === 'female' ? 'वीं' : 'वाँ');
}


export const simpleNumbers_: string[] =
    ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];


export const simpleSmallOrdinalsMasculine_: string[] =
    ['', '१ला', '२रा', '३रा', '४था', '५वाँ', '६ठा', '७वाँ', '८वाँ', '९वाँ'];


export const simpleSmallOrdinalsFeminine_: string[] =
    ['', '१ली', '२री', '३री', '४थी', '५वीं', '६ठी', '७वीं', '८वीं', '९वीं'];


/**
 * Creates a simple ordinal string from a number.
 * @param number The number to be converted.
 * @return The ordinal string.
 */
export function simpleOrdinal(number: number): string {
  let gender = (sre.Grammar.getInstance().getParameter('gender') as string);

  if (number > 0 && number < 10) {
    return gender === 'female' ? simpleSmallOrdinalsFeminine_[number] :
                                 simpleSmallOrdinalsMasculine_[number];
  }
  let ordinal = number.toString()
                    .split('')
                    .map(function(x) {
                      let num = parseInt(x, 10);
                      return isNaN(num) ? '' : simpleNumbers_[num];
                    })
                    .join('');
  return ordinal + (gender === 'female' ? 'वीं' : 'वाँ');
}


export const NUMBERS: Numbers = {
  wordOrdinal: wordOrdinal,
  simpleOrdinal: simpleOrdinal,
  numberToWords: numberToWords,
  numberToOrdinal: numberToOrdinal,
  vulgarSep: ' ',
  numSep: ' '
};
// TODO: For simple speech output this should be different.