// Copyright 2014 Volker Sorge
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
 * @fileoverview Clearspeak rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.ClearspeakRules');

goog.require('sre.ClearspeakUtil');
goog.require('sre.Grammar');
goog.require('sre.MathStore');
goog.require('sre.StoreUtil');



//TODO: (MOSS) WP 2.2
// * Implement rules from http://www.dessci.com/en/reference/ies-ets/
// * Implement preference settings
//
/**
 * Rule initialization.
 * @constructor
 * @extends {sre.MathStore}
 */
sre.ClearspeakRules = function() {
  sre.ClearspeakRules.base(this, 'constructor');
};
goog.inherits(sre.ClearspeakRules, sre.MathStore);
goog.addSingletonGetter(sre.ClearspeakRules);


/**
 * @type {sre.MathStore}
 */
sre.ClearspeakRules.mathStore = sre.ClearspeakRules.getInstance();


/** @private */
sre.ClearspeakRules.defineRule_ = goog.bind(
    sre.ClearspeakRules.mathStore.defineRule,
    sre.ClearspeakRules.mathStore);


/** @private */
sre.ClearspeakRules.defineRuleAlias_ = goog.bind(
    sre.ClearspeakRules.mathStore.defineRulesAlias,
    sre.ClearspeakRules.mathStore);


/** @private */
sre.ClearspeakRules.defineSpecialisedRule_ = goog.bind(
    sre.ClearspeakRules.mathStore.defineSpecialisedRule,
    sre.ClearspeakRules.mathStore);


/** @private */
sre.ClearspeakRules.addContextFunction_ = goog.bind(
    sre.ClearspeakRules.mathStore.contextFunctions.add,
    sre.ClearspeakRules.mathStore.contextFunctions);


/** @private */
sre.ClearspeakRules.addCustomQuery_ = goog.bind(
    sre.ClearspeakRules.mathStore.customQueries.add,
    sre.ClearspeakRules.mathStore.customQueries);


/** @private */
sre.ClearspeakRules.addCustomString_ = goog.bind(
    sre.ClearspeakRules.mathStore.customStrings.add,
    sre.ClearspeakRules.mathStore.customStrings);


goog.scope(function() {
var defineRule = sre.ClearspeakRules.defineRule_;
var defineRuleAlias = sre.ClearspeakRules.defineRuleAlias_;
var defineSpecialisedRule = sre.ClearspeakRules.defineSpecialisedRule_;

var addCQF = sre.ClearspeakRules.addCustomQuery_;
var addCSF = sre.ClearspeakRules.addCustomString_;
var addCTXF = sre.ClearspeakRules.addContextFunction_;

sre.ClearspeakRules.addAnnotators_ = function() {
  sre.SemanticAnnotations.getInstance().register(sre.ClearspeakUtil.simpleExpression());
  sre.SemanticAnnotations.getInstance().register(sre.ClearspeakUtil.unitExpression());
};

/**
 * Initialize the custom functions.
 * @private
 */
sre.ClearspeakRules.initCustomFunctions_ = function() {
  addCTXF('CTXFpauseSeparator', sre.StoreUtil.pauseSeparator);
  addCTXF('CTXFnodeCounter', sre.ClearspeakUtil.nodeCounter);
  addCTXF('CTXFcontentIterator', sre.MathmlStoreUtil.contentIterator);
  addCTXF('CTXFcontentPauseIterator', sre.ClearspeakUtil.contentIterator);
  addCSF('CSFvulgarFraction', sre.ClearspeakUtil.vulgarFraction);
  addCQF('CQFvulgarFractionSmall', sre.ClearspeakUtil.isSmallVulgarFraction);
  addCQF('CQFcellsSimple', sre.ClearspeakUtil.allCellsSimple);
  addCSF('CSFordinalExponent', sre.ClearspeakUtil.ordinalExponent);
  addCQF('CQFisCapital', sre.ClearspeakUtil.isCapitalLetter);
  addCQF('CQFmatchingFences', sre.ClearspeakUtil.matchingFences);
  addCSF('CSFnestingDepth', sre.ClearspeakUtil.nestingDepth);
  addCQF('CQFfencedArguments', sre.ClearspeakUtil.fencedArguments);
  addCQF('CQFsimpleArguments', sre.ClearspeakUtil.simpleArguments);
  addCQF('CQFisHyperbolic', sre.ClearspeakUtil.isHyperbolic);
  addCQF('CQFisLogarithm', sre.ClearspeakUtil.isLogarithmWithBase);
};


/**
 * Clearspeak rules.
 * @private
*/
sre.ClearspeakRules.initClearspeakRules_ = function() {

  // Initial rule
  defineRule(
      'stree', 'clearspeak.default',
      '[n] ./*[1]', 'self::stree');

  //
  // Text rules
  // 
  defineRule(
      'text', 'clearspeak.default', '[n] text()', 'self::text');

  //
  // Symbols
  //

  // Capital letters
  // defineRule(
  //   'non-latin', 'clearspeak.default',
  //   '[n] text() (pitch:0.6,grammar:ignoreFont="cap")',
  //   'self::identifier',
  //   '@role="latinletter" or @role="greekletter"',
  //   'CQFisCapital');

  defineRule(
    'capital', 'clearspeak.default',
    '[n] text() (pitch:0.6,grammar:ignoreFont="cap")',
    'self::identifier',
    '@role="latinletter" or @role="greekletter" or @role="simple function"',
    'CQFisCapital');
  defineRule(
    'capital', 'clearspeak.Caps_SayCaps',
    '[n] text()',
    'self::identifier', '@role="latinletter" or @role="greekletter"',
    'CQFisCapital');
  defineRule(
    'capital', 'clearspeak.Caps_SayCaps',
    '[p] (pause:"short"); [n] text()',
    'self::identifier', '@role="latinletter" or @role="greekletter"',
    'CQFisCapital', 'preceding-sibling::*[1]',
    'not(name(preceding-sibling::*[1])="function")',
    'not(contains(@grammar, "angle"))');
  defineRule(
    'capital', 'clearspeak.Caps_SayCaps',
    '[n] text() (pause:"short")',
    'self::identifier', '@role="latinletter" or @role="greekletter"',
    'CQFisCapital', 'following-sibling::*[1]');
  defineRule(
    'capital', 'clearspeak.Caps_SayCaps',
    '[p] (pause:"short"); [n] text() (pause:"short")',
    'self::identifier', '@role="latinletter" or @role="greekletter"',
    'CQFisCapital', 'preceding-sibling::*[1]', 'following-sibling::*[1]',
    'not(name(preceding-sibling::*[1])="function")',
    'not(contains(@grammar, "angle"))');

  // Comma
  defineRule(
      'punctuation-lr', 'clearspeak.default',
      '[p] (pause:"short"); [n] text() (pause:"short")',
      'self::punctuation', '@role="comma"');
  defineRule(
      'punctuation', 'clearspeak.default',
      '[n] text()',
      'self::punctuation', '@role="comma"',
      'not(preceding-sibling::*[1]/children)',
      'not(following-sibling::*[1]/children)');
  defineRule(
      'punctuation-l', 'clearspeak.default',
      '[p] (pause:"short"); [n] text()',
      'self::punctuation', '@role="comma"',
      'not(following-sibling::*[1]/children)');
  defineRule(
      'punctuation-r', 'clearspeak.default',
      '[n] text() (pause:"short")',
      'self::punctuation', '@role="comma"',
      'not(preceding-sibling::*[1]/children)');

  // Ellipses
  defineRule(
    'ellipsis', 'clearspeak.Ellipses_AndSoOn',
    '[t] "and so on"',
    'self::punctuation', '@role="ellipsis"', 'not(following-sibling::*[1])',
    'not(preceding-sibling::*[last()][@role="ellipsis"])'
  );
  defineRule(
    'ellipsis', 'clearspeak.Ellipses_AndSoOn',
    '[t] "and so on up to"',
    'self::punctuation', '@role="ellipsis"',
    'preceding-sibling::*[1]', 'following-sibling::*[1]'
  );

  // Vertical bar
  defineRule(
    'vbar-evaluated', 'clearspeak.default',
    '[n] children/*[1]; [p] (pause:"short"); [t] "evaluated at";' +
      ' [n] content/*[1]/children/*[2]; [p] (pause:"short")',
    'self::punctuated', '@role="endpunct"', 'content/*[1][@role="vbar"]',
    'content/*[1][@embellished]', 'name(content/*[1])="subscript"'
  );
  defineRule(
    'vbar-evaluated', 'clearspeak.default',
    '[n] children/*[1]; [p] (pause:"short"); [t] "evaluated at";' +
      ' [n] content/*[1]/children/*[2]; [p] (pause:"short"); ' +
      '[t] "minus the same expression evaluated at";' +
      ' [n] content/*[1]/children/*[1]/children/*[2]; [p] (pause:"short")',
    'self::punctuated', '@role="endpunct"', 'content/*[1][@role="vbar"]',
    'content/*[1][@embellished]', 'name(content/*[1])="superscript"',
    'name(content/*[1]/children/*[1])="subscript"'
  );

  defineRule(
    'vbar-such-that', 'clearspeak.VerticalLine_SuchThat',
    '[t] "such that"', 'self::punctuation', '@role="vbar"',
    'parent::*/parent::*[@embellished!="punctuation"]'
  );
  defineRule(
    'vbar-such-that', 'clearspeak.VerticalLine_Divides',
    '[t] "divides"', 'self::punctuation', '@role="vbar"',
    'parent::*/parent::*[@embellished!="punctuation"]'
  );
  defineRule(
    'vbar-such-that', 'clearspeak.VerticalLine_Given',
    '[t] "given"', 'self::punctuation', '@role="vbar"',
    'parent::*/parent::*[@embellished!="punctuation"]'
  );


  defineRule(
      'punctuated', 'clearspeak.default',
      '[m] children/*',
      'self::punctuated');

  //
  // Function rules
  // 
  defineRule(
      'function', 'clearspeak.default',
      '[n] text()', 'self::function');

  defineRule(
      'appl', 'clearspeak.default',
      '[p] (pause:"short"); [n] children/*[1]; [t] "of"; [n] children/*[2]; [p] (pause:"short")',
      'self::appl');

  defineRule(
      'function-prefix', 'clearspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::appl', '@role="prefix function"');
  defineRule(
      'function-prefix-simple-arg', 'clearspeak.default',
      '[n] children/*[1]; [p] (pause:"short"); [n] children/*[2]',
    'self::appl', '@role="prefix function"',
    'name(children/*[2])="fenced"',
    'contains(children/*[2]/children/*[1]/@meaning, "clearspeak:simple")',
    'name(children/*[2]/children/*[1])!="number"',
    'name(children/*[2]/children/*[1])!="identifier"',
    'name(children/*[2]/children/*[1])!="appl"'
  );
  defineRule(
      'function-prefix-embell', 'clearspeak.default',
      '[p] (pause:"short"); [n] children/*[1]; [n] children/*[2]; [p] (pause:"short"); ',
      'self::appl', '@role="prefix function"',
      'name(children/*[1])!="function"');

  // REMEMBER: When testing for function we can use the one in content!
  defineRule(
      'function-prefix-fenced-or-frac-arg', 'clearspeak.default',
      '[p] (pause:"short"); [t] "the"; [n] children/*[1]; [t] "of"; [n] children/*[2]; [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      '(name(children/*[2])="fenced" and not(contains(children/*[2]/children/*[1]/@meaning, "clearspeak:simple")))' +
      ' or name(children/*[2])="fraction" or (name(children/*[2])!="fenced" and not(contains(children/*[2]/@meaning, "clearspeak:simple")))');
  defineRule(
      'function-prefix-subscript', 'clearspeak.default',
      '[p] (pause:"short"); [t] "the"; [n] children/*[1]; [t] "of";' +
      ' [p] (pause:"short"); [n] children/*[2]; [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'name(children/*[1])="subscript"');


  // ln rules!
  // QUESTION: These pauses are not consistent!
    defineRule(
      'function-ln', 'clearspeak.default',
      '[n] children/*[1]; [n] children/*[2]',
      'self::appl', '@role="prefix function"',
      'content/*[2][text()="ln"]', 'not(following-sibling::*)',
      'not(contains(@grammar, "NatLog"))');
    defineRule(
      'function-ln', 'clearspeak.default',
      '[n] children/*[1]; [n] children/*[2]; [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'content/*[2][text()="ln"]',
      'not(contains(@grammar, "NatLog"))');
    defineRule(
      'function-ln', 'clearspeak.default',
      '[n] children/*[1]; [t] "of"; [n] children/*[2]; [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'content/*[2][text()="ln"]', 'name(children/*[2])="fenced"',
      'not(contains(@grammar, "NatLog"))');
  // TODO: (MS2.3) This grammar rule can be ditched with a better treatment of
  //               the preferences.
  defineRule(
      'function-ln', 'clearspeak.Log_LnAsNaturalLog',
      '[n] . (grammar:NatLog)',
      'self::appl', '@role="prefix function"',
      'content/*[2][text()="ln"]', 'not(following-sibling::*)',
      'not(contains(@grammar, "NatLog"))');
  defineRule(
      'function-ln', 'clearspeak.Log_LnAsNaturalLog',
      '[n] . (grammar:NatLog); [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'content/*[2][text()="ln"]',
      'not(contains(@grammar, "NatLog"))');


  // Pauses?
  defineRule(
      'function-prefix-as-exp', 'clearspeak.default',
      '[n] children/*[1]; [t] "of";' +
      ' [p] (pause:"short"); [n] children/*[2]; [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'name(parent::*/parent::*)="superscript"', 'not(following-sibling::*)',
      '(name(children/*[2])="fenced" and not(contains(children/*[2]/children/*[1]/@meaning, "clearspeak:simple")))' +
      ' or name(children/*[2])="fraction" or (name(children/*[2])!="fenced" and not(contains(children/*[2]/@meaning, "clearspeak:simple")))');
  defineRule(
      'function-prefix-subscript-as-exp', 'clearspeak.default',
      '[n] children/*[1]; [t] "of";' +
      ' [p] (pause:"short"); [n] children/*[2]; [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'name(parent::*/parent::*)="superscript"', 'not(following-sibling::*)',
      'name(children/*[1])="subscript"');


  defineRule(
      'function-prefix-hyper', 'clearspeak.default',
      '[p] (pause:"short"); [n] children/*[1]; [t] "of"; [n] children/*[2]; [p] (pause:"short")',
      'self::appl', '@role="prefix function"', 'CQFisHyperbolic');

  defineRule(
      'function-prefix-inverse', 'clearspeak.default',
      '[p] (pause:"short"); [t] "the inverse"; [n] children/*[1]/children/*[1];' +
      ' [t] "of"; [n] children/*[2]; [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'name(children/*[1])="superscript"',
      'name(children/*[1]/children/*[2])="prefixop"', 'children/*[1]/children/*[2][@role="negative"]',
      'children/*[1]/children/*[2]/children/*[1][text()="1"]',
      'not(contains(@grammar, "functions_none"))');


  defineRule(
      'appl-triginverse', 'clearspeak.Trig_TrigInverse',
      '[p] (pause:"short"); [n] children/*[1]; [t] "of"; [n] children/*[2]; [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'name(children/*[1])="superscript"',
      'name(children/*[1]/children/*[2])="prefixop"', 'children/*[1]/children/*[2][@role="negative"]',
      'children/*[1]/children/*[2]/children/*[1][text()="1"]');

  defineRule(
      'function-prefix-arc-simple', 'clearspeak.Trig_ArcTrig',
      '[p] (pause:"short"); [t] "arc"; [n] children/*[1]/children/*[1];' +
      ' [n] children/*[2]; [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'name(children/*[1])="superscript"',
      'name(children/*[1]/children/*[2])="prefixop"', 'children/*[1]/children/*[2][@role="negative"]',
      'children/*[1]/children/*[2]/children/*[1][text()="1"]',
      'not(contains(@grammar, "functions_none"))');
  defineRule(
      'function-prefix-arc-simple', 'clearspeak.Trig_ArcTrig',
      '[p] (pause:"short"); [t] "arc"; [n] children/*[1]/children/*[1];' +
      ' [p] (pause:"short"); [n] children/*[2]; [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'name(children/*[1])="superscript"',
      'name(children/*[1]/children/*[2])="prefixop"', 'children/*[1]/children/*[2][@role="negative"]',
      'children/*[1]/children/*[2]/children/*[1][text()="1"]',
      'name(children/*[2])="fenced"',
    'children/*[2]/children/*[1][@role="prefix function"]',
    'contains(children/*[2]/children/*[1]/@meaning, "clearspeak:simple")',
      'not(contains(@grammar, "functions_none"))');

    
  defineRule(
      'function-prefix-arc', 'clearspeak.Trig_ArcTrig',
      '[p] (pause:"short"); [t] "arc"; [n] children/*[1]/children/*[1];' +
      ' [t] "of"; [n] children/*[2]; [p] (pause:"short")',
      'self::appl', '@role="prefix function"',
      'name(children/*[1])="superscript"',
      'name(children/*[1]/children/*[2])="prefixop"', 'children/*[1]/children/*[2][@role="negative"]',
      'children/*[1]/children/*[2]/children/*[1][text()="1"]',
      'not(contains(@grammar, "functions_none"))',
      '(name(children/*[2])="fenced" and not(contains(children/*[2]/children/*[1]/@meaning, "clearspeak:simple")))' +
      ' or (name(children/*[2])="fraction" and children/*[2][@role!="vulgar"])');
  
  defineRule(
      'function-inverse', 'clearspeak.default',
      '[n] children/*[1]; [t] "inverse"',
      'self::superscript', '@role="prefix function" or @role="simple function"',
    'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
    'children/*[2]/children/*[1][text()="1"]',
    'not(contains(@grammar, "functions_none"))');

  defineRule(
      'superscript-prefix-function', 'clearspeak.default',
      '[t] "the"; [n] children/*[2] (grammar:ordinal); [t] "power of"; [n] children/*[1]',
    'self::superscript', '@role="prefix function"', 'name(children/*[2])="number"', 'children/*[2][@role="integer"]');
  defineRule(
      'superscript-prefix-function', 'clearspeak.default',
      '[t] "the"; [n] children/*[2] (grammar:ordinal); [t] "power of"; [n] children/*[1]',
    'self::superscript', '@role="prefix function"', 'name(children/*[2])="identifier"');


  defineRule(
    'appl', 'clearspeak.Functions_None',
    '[p] (pause:"short"); [n] children/*[1]; [t] "times"; [n] children/*[2]; [p] (pause:"short")',
    'self::appl');

  // TODO: (MS2.3) Better handling of preferences.
  defineRule(
      'function-inverse', 'clearspeak.Functions_None',
      '[n] . (grammar:functions_none)',
      'self::superscript', '@role="prefix function" or @role="simple function"',
    'name(children/*[2])="prefixop"', 'children/*[2][@role="negative"]',
    'children/*[2]/children/*[1][text()="1"]',
    'not(contains(@grammar, "functions_none"))');

  //
  // Superscript rules
  //
  defineRule(
      'superscript', 'clearspeak.default',
      '[n] children/*[1]; [t] "raised to exponent" (pause:"short"); ' +
      '[n] children/*[2]; [p] (pause:"short"); [t] "end exponent"',
      'self::superscript');
  defineRule(
      'superscript-simple-exponent', 'clearspeak.default',
      '[n] children/*[1]; [t] "raised to the"; [n] children/*[2]; [t] "power" (pause:"short")',
      'self::superscript', 'not(descendant::superscript)');

  defineRuleAlias(
      'superscript-simple-exponent', 'self::superscript',
    'children/superscript/children/*[2][text()=2] or children/superscript/children/*[2][text()=3]',
    'name(children/superscript/children/*[1])="number"',
    'contains(children/superscript/children/*[1]/@meaning, "clearspeak:simple")');
  defineRuleAlias(
      'superscript-simple-exponent', 'self::superscript',
    'children/superscript/children/*[2][text()=2] or children/superscript/children/*[2][text()=3]',
    'name(children/superscript/children/*[1])="fraction"',
    'contains(children/superscript/children/*[1]/@meaning, "clearspeak:simple")');
  defineRuleAlias(
      'superscript-simple-exponent', 'self::superscript',
    'children/superscript/children/*[2][text()=2] or children/superscript/children/*[2][text()=3]',
    'name(children/superscript/children/*[1])="identifier"');

  defineRule(
      'superscript-ordinal', 'clearspeak.default',
      '[n] children/*[1]; [t] "to the"; [n] children/*[2] (grammar:ordinal); [t] "power" (pause:"short")',
      'self::superscript', 'name(children/*[2])="number"', 'children/*[2][@role="integer"]');
  defineRuleAlias(
    'superscript-ordinal', 'self::superscript', 'name(children/*[2])="identifier"',
    'children/*[2][@role="latinletter" or @role="greekletter" or @role="otherletter"]');
  defineRule(
      'superscript-non-ordinal', 'clearspeak.default',
      '[n] children/*[1]; [t] "to the"; [n] children/*[2]; [t] "power" (pause:"short")',
      'self::superscript', 'children/*[2][@role="negative"]',
      'name(children/*[2]/children/*[1])="number"',
      'children/*[2]/children/*[1][@role="integer"]');

  defineRule(
      'superscript-simple-function', 'clearspeak.default',
      '[t] "the"; [n] children/*[2] (grammar:ordinal); [t] "power of" (pause:"short"); [n] children/*[1]',
    'self::superscript', 'name(children/*[1])="identifier"', 'children/*[1][@role="simple function"]',
    'not(contains(@grammar, "functions_none"))');

  defineRule(
      'superscript-simple-function', 'clearspeak.Functions_None',
      '[n] . (grammar:functions_none)',
      'self::superscript', 'name(children/*[1])="identifier"',
      'children/*[1][@role="simple function"]',
      'not(contains(@grammar, "functions_none"))');

  // defineRule(
  //   'exponent', 'clearspeak.default',
  //   '[t] "0"', 'self::number', '@role="integer"',
  //   'contains(@grammar, "ordinal")', 'text()="0"');
  defineRule(
    'exponent', 'clearspeak.default',
    '[n] text() (join:""); [t] "th"', 'self::identifier',
    'contains(@grammar, "ordinal")');
  defineRule(
    'exponent', 'clearspeak.default',
    '[t] CSFordinalExponent', 'self::number', '@role="integer"',
    'contains(@grammar, "ordinal")', 'text()!="0"');

  // Square
  defineRule(
      'square', 'clearspeak.default',
      '[n] children/*[1]; [t] "squared"',
      'self::superscript', 'children/*[2][text()=2]',
      'name(children/*[1])!="text" or ' +
      // Special exception dealing with footnotes.
      'not(name(children/*[1])="text" and ' +
      '(name(../../../punctuated[@role="text"]/..)="stree" ' +
      'or name(..)="stree"))', 'self::*'

    // ,
      // 'name(children/*[1])!="subscript" or (' +
      // // Keep squared if we have a simple subscript.
      // 'name(children/*[1])="subscript" and ' +
      // 'name(children/*[1]/children/*[1])="identifier" and ' +
      // 'name(children/*[1]/children/*[2])="number" and ' +
      // 'children/*[1]/children/*[2][@role!="mixed"] and ' +
      // 'children/*[1]/children/*[2][@role!="othernumber"])',
    // 'not(@embellished)'

  );

  // Cube
  defineRule(
      'cube', 'clearspeak.default',
      '[n] children/*[1]; [t] "cubed"',
      'self::superscript', 'children/*[2][text()=3]',
      'name(children/*[1])!="text" or ' +
      // Special exception dealing with footnotes.
      'not(name(children/*[1])="text" and ' +
      '(name(../../../punctuated[@role="text"]/..)="stree" ' +
      'or name(..)="stree"))', 'self::*'
    // ,
      // 'name(children/*[1])!="subscript" or (' +
      // // Keep cubed if we have a simple subscript.
      // 'name(children/*[1])="subscript" and ' +
      // 'name(children/*[1]/children/*[1])="identifier" and ' +
      // 'name(children/*[1]/children/*[2])="number" and ' +
      // 'children/*[1]/children/*[2][@role!="mixed"] and ' +
      // 'children/*[1]/children/*[2][@role!="othernumber"])',
      // 'not(@embellished)'
  );


  //
  // Parentheses rules
  // 
  defineRule(
    'paren-simple', 'clearspeak.default',
    '[n] children/*[1]',
    'self::fenced', '@role="leftright"',
    'contains(children/*[1]/@meaning, "clearspeak:simple")',
    'name(../..)!="superscript" and name(../..)!="subscript"'
  );
  defineRule(
    'paren-simple-exp', 'clearspeak.default',
    '[n] children/*[1]',
    'self::fenced', '@role="leftright"',
    'name(../..)="superscript"',
    'children/*[1][@role="integer"] or children/*[1][@role="float"] or ' +
      '(children/*[1][@role="vulgar"] and contains(children/*[1]/@meaning,' +
      ' "clearspeak:simple")) or children/*[1][@role="latinletter"] or ' +
      'children/*[1][@role="greekletter"] or children/*[1][@role="otherletter"]'
  );
  defineRule(
    'paren-simple-nested-func', 'clearspeak.default',
    '[n] children/*[1]',
    'self::fenced', '@role="leftright"',
    'name(../*[1])="identifier" or name(../*[1])="function"',
    'parent::*/parent::*[@role="simple function" or @role="prefix function"]',
    'children/*[1][@role="simple function" or @role="prefix function"]',
    'contains(children/*[1]/children/*[2]/children/*[1]/@meaning, "clearspeak:simple") or ' +
      'name(children/*[1]/children/*[2]/children/*[1])="subscript" or ' +
      'name(children/*[1]/children/*[2]/children/*[1])="superscript" or ' +
      'children/*[1]/children/*[2]/children/*[1][@role="vulgar"] '
  );
  defineRule(
    'paren-simple-nested-func-no-bracket', 'clearspeak.Functions_None',
    '[n] children/*[1];',
    'self::fenced', '@role="leftright"',
    'name(../*[1])="identifier" or name(../*[1])="function"',
    'parent::*/parent::*[@role="simple function" or @role="prefix function"]',
    'children/*[1][@role="simple function" or @role="prefix function"]',
    'name(children/*[1]/children/*[1])="identifier" or name(children/*[1]/children/*[1])="function"',
    'contains(children/*[1]/children/*[2]/children/*[1]/@meaning, "clearspeak:simple")',
    'name(children/*[1]/children/*[2]/children/*[1])="identifier" or ' +
      'name(children/*[1]/children/*[2]/children/*[1])="number"'
  );
  // Parens spoken
  defineRule(
      'fences-open-close', 'clearspeak.default',
      '[p] (pause:"short"); [n] content/*[1] (grammar:spokenFence);' +
      ' [p] (pause:"short"); [n] children/*[1];' +
      ' [p] (pause:"short"); [n] content/*[2] (grammar:spokenFence);' +
      ' [p] (pause:"short")',
    'self::fenced', '@role="leftright"');
  defineRule(
    'paren-simple-nested-func', 'clearspeak.default',
      '[p] (pause:"short"); [n] content/*[1];' +
      ' [p] (pause:"short"); [n] children/*[1];' +
      ' [p] (pause:"short"); [n] content/*[2];' +
      ' [p] (pause:"short")',
    'self::fenced', '@role="leftright"',
    'name(../*[1])="identifier" or name(../*[1])="function"',
    'parent::*/parent::*[@role="simple function" or @role="prefix function"]',
    'not(contains(children/*[1]/@meaning, "clearspeak:simple"))');
  defineRule(
    'paren-simple-nested-func', 'clearspeak.Functions_None',
      '[p] (pause:"short"); [n] content/*[1] (grammar:spokenFence);' +
      ' [p] (pause:"short"); [n] children/*[1];' +
      ' [p] (pause:"short"); [n] content/*[2] (grammar:spokenFence);' +
      ' [p] (pause:"short")',
    'self::fenced', '@role="leftright"',
    'name(../*[1])="identifier" or name(../*[1])="function"',
    'parent::*/parent::*[@role="simple function" or @role="prefix function"]',
    'children/*[1][@role="simple function" or @role="prefix function"]',
    'contains(children/*[1]/children/*[2]/children/*[1]/@meaning, "clearspeak:simple") or ' +
      'name(children/*[1]/children/*[2]/children/*[1])="subscript" or ' +
      'name(children/*[1]/children/*[2]/children/*[1])="superscript" or ' +
      'children/*[1]/children/*[2]/children/*[1][@role="vulgar"] '
  );
  // Order important!
  defineSpecialisedRule(
    'fences-open-close', 'clearspeak.default', 'clearspeak.Paren_Speak');
  defineRuleAlias(
    'fences-open-close', 'self::fenced', '@role="composed function"');
  defineRule(
    'fence-silent', 'clearspeak.Paren_Silent',
    '[p] (pause:"short"); [n] children/*[1]; [p] (pause:"short")',
    'self::fenced'
  );

  // TODO: brackets should be excluded. What about other fences?
  defineRule(
    'fence-nesting', 'clearspeak.Paren_SpeakNestingLevel',
    '[n] text() (grammar:insertNesting=CSFnestingDepth)',
    'self::fence', 'contains(@grammar, "spokenFence")', 'CQFmatchingFences'
  );
  defineRule(
    'fence-no-nesting', 'clearspeak.Paren_SpeakNestingLevel',
    '[n] text()', 'self::fence'
  );
  
  // defineRule(
  //     'fences-open-close-nest', 'clearspeak.Paren_SpeakNestingLevel',
  //     '[p] (pause:"short"); [n] content/*[1] (grammar:nesting=CSFnestingDepth); ' +
  //     '[p] (pause:"short"); [n] children/*[1];' +
  //     ' [p] (pause:"short"); [n] content/*[2] (grammar:nesting=CSFnestingDepth);' +
  //     ' [p] (pause:"short")',
  //   'self::fenced', '@role="leftright"', );

  // Coordinates
  defineRule(
    'fences-points', 'clearspeak.Paren_CoordPoint',
    '[t] "the point with coordinates"; [n] children/*[1]',
    'self::fenced', 'name(children/*[1])="punctuated"',
    'children/*[1][@role="sequence"]');

  // Intervals
  defineRule(
    'fences-interval', 'clearspeak.Paren_Interval',
    '[t] "the interval from"; ' +
      '[n] children/*[1]/children/*[1]; [t] "to"; ' +
      '[n] children/*[1]/children/*[3]; [p] (pause:"short"); ' +
      '[n] . (grammar:interval)',
    'self::fenced', 'not(contains(@grammar, "interval"))',
    'name(children/*[1])="punctuated"',
    'children/*[1][@role="sequence"]', 'count(./children/*[1]/content/*)=1',
    'children/*[1]/content/*[1][@role="comma"]'
  );

  defineRule(
    'interval-open', 'clearspeak.Paren_Interval',
    '[t] "not including"; [n] children/*[1]/children/*[1]; ' +
      '[t] "or"; [n] children/*[1]/children/*[3]',
    'self::fenced', 'contains(@grammar, "interval")',
    'content/*[1]/text()="("',
    'content/*[2]/text()=")"'
  );
  defineRule(
    'interval-closed-open', 'clearspeak.Paren_Interval',
      '[t] "including"; [n] children/*[1]/children/*[1];' +
      ' [p] (pause:"short"); ' +
      '[t] "but not including"; [n] children/*[1]/children/*[3]',
    'self::fenced', 'contains(@grammar, "interval")',
    'content/*[1]/text()="["',
    'content/*[2]/text()=")"'
  );
  defineRule(
    'interval-open-closed', 'clearspeak.Paren_Interval',
      '[t] "not including"; [n] children/*[1]/children/*[1];' +
      ' [p] (pause:"short"); ' +
      '[t] "but including"; [n] children/*[1]/children/*[3]',
    'self::fenced', 'contains(@grammar, "interval")',
    'content/*[1]/text()="("',
    'content/*[2]/text()="]"'
  );
  defineRule(
    'interval-closed', 'clearspeak.Paren_Interval',
    '[t] "including"; [n] children/*[1]/children/*[1]; ' +
      '[t] "and"; [n] children/*[1]/children/*[3]',
    'self::fenced', 'contains(@grammar, "interval")',
    'content/*[1]/text()="["',
    'content/*[2]/text()="]"'
  );
  // Infinity cases.
  defineRule(
    'interval-open-inf-r', 'clearspeak.Paren_Interval',
    '[t] "not including"; [n] children/*[1]/children/*[1]',
    'self::fenced', 'contains(@grammar, "interval")',
    'content/*[1]/text()="("',
    'content/*[2]/text()=")"',
    'children/*[1]/children/*[3]/text()="∞" or' +
      ' (name(children/*[1]/children/*[3])="prefixop" and ' +
      'children/*[1]/children/*[3]/children/*[1]/text()="∞")');
  defineRule(
    'interval-open-inf-l', 'clearspeak.Paren_Interval',
    '[t] "not including"; [n] children/*[1]/children/*[3]',
    'self::fenced', 'contains(@grammar, "interval")',
    'content/*[1]/text()="("',
    'content/*[2]/text()=")"',
    'children/*[1]/children/*[1]/text()="∞" or' +
      ' (name(children/*[1]/children/*[1])="prefixop" and ' +
      'children/*[1]/children/*[1]/children/*[1]/text()="∞")');
  defineRule(
    'interval-open-inf-lr', 'clearspeak.Paren_Interval',
    '',
    'self::fenced', 'contains(@grammar, "interval")',
    'content/*[1]/text()="("',
    'content/*[2]/text()=")"',
    'children/*[1]/children/*[3]/text()="∞" or' +
      ' (name(children/*[1]/children/*[3])="prefixop" and ' +
      'children/*[1]/children/*[3]/children/*[1]/text()="∞")',
    'children/*[1]/children/*[1]/text()="∞" or' +
      ' (name(children/*[1]/children/*[1])="prefixop" and ' +
      'children/*[1]/children/*[1]/children/*[1]/text()="∞")');
  defineRule(
    'interval-closed-open-inf', 'clearspeak.Paren_Interval',
      '[t] "including"; [n] children/*[1]/children/*[1]',
    'self::fenced', 'contains(@grammar, "interval")',
    'content/*[1]/text()="["',
    'content/*[2]/text()=")"',
    'children/*[1]/children/*[3]/text()="∞" or' +
      ' (name(children/*[1]/children/*[3])="prefixop" and ' +
      'children/*[1]/children/*[3]/children/*[1]/text()="∞")');
  defineRule(
    'interval-open-closed-inf', 'clearspeak.Paren_Interval',
    '[t] "including"; [n] children/*[1]/children/*[3]',
    'self::fenced', 'contains(@grammar, "interval")',
    'content/*[1]/text()="("',
    'content/*[2]/text()="]"',
    'children/*[1]/children/*[1]/text()="∞" or' +
      ' (name(children/*[1]/children/*[1])="prefixop" and ' +
      'children/*[1]/children/*[1]/children/*[1]/text()="∞")');

  defineRule(
    'paren-nested-embellished-funcs', 'clearspeak.Functions_None',
    '[p] (pause:"short"); [n] content/*[1];' +
      ' [p] (pause:"short"); [n] children/*[1];' +
      ' [p] (pause:"short"); [n] content/*[2]; [p] (pause:"short")',
    'self::fenced', '@role="leftright"',
    'name(../..)="appl"', 'name(children/*[1]) = "appl"',
    'preceding-sibling::*/descendant-or-self::*[@role="subsup"] or ' +
      'children/*[1]/descendant-or-self::*[@role="subsup"]'
  );
  // defineRule(
  //     'fences-open-close', 'clearspeak.default',
  //     '[t] (pause:"short"); [n] content/*[1]; [t] (pause:"short"); [n] children/*[1];' +
  //     ' [t] (pause:"short"); [n] content/*[2]; [t] (pause:"short")',
  //     'self::fenced', '@role="leftright"');
  // defineRule(
  //     'function-fences', 'clearspeak.default',
  //     '[n] children/*[1]',
  //     'self::fenced', '@role="leftright"', 'contains(children/*[1]/@meaning, "clearspeak:simple")', 'parent::*/parent::appl');

  // Set braces
  defineRule(
      'set-empty', 'clearspeak.default',
      '[t] "the empty set"',
      'self::fenced', '@role="set empty"');
  defineRule(
      'set-extended', 'clearspeak.default',
      '[t] "the set of all"; [n] children/*[1]/children/*[1]; ' +
      '[t] "such that"; [n] children/*[1]/children/*[3]',
      'self::fenced', '@role="set extended"');
  defineRule(
      'set-collection', 'clearspeak.default',
      '[t] "the set"; [n] children/*[1]',
      'self::fenced', '@role="set collection"');
  defineRuleAlias(
      'set-collection', 'self::fenced', '@role="set singleton"');

  defineRule(
    'set-extended', 'clearspeak.Sets_woAll',
    '[t] "the set of"; [n] children/*[1]/children/*[1]; ' +
      '[t] "such that"; [n] children/*[1]/children/*[3]',
    'self::fenced', '@role="set extended"');
  defineRule(
      'set-collection', 'clearspeak.Sets_SilentBracket',
      '[n] children/*[1]',
      'self::fenced', '@role="set collection"');


  // Subscript
  defineRule(
      'subscript', 'clearspeak.default',
      '[p] (pause:short); [n] children/*[1]; [t] "sub"; [n] children/*[2]; [p] (pause:short)',
      'self::subscript');
  defineRule(
      'subscript-base', 'clearspeak.default',
      '[n] children/*[1]; [t] "base"; [n] children/*[2]',
    'self::subscript', 'CQFisLogarithm');
  // TODO: (Simons) This should be removed once we have index structures.
  defineRule(
      'subscript-index', 'clearspeak.default',
      '[n] children/*[1]; [t] "sub"; [n] children/*[2]',
      'self::subscript', 'contains(@grammar, "simpleDet")');


  // Fraction rules
  defineRule(
      'fraction', 'clearspeak.default',
      '[p] (pause:short); [t] "the fraction with numerator"; [n] children/*[1]; [p] (pause:short);' +
          ' [t] "and denominator"; [n] children/*[2]; [p] (pause:short)',
      'self::fraction');
  defineRule(
      'fraction', 'clearspeak.Functions_None',
      '[p] (pause:short); [t] "the fraction with numerator"; [n] children/*[1]; [p] (pause:short);' +
          ' [t] "and denominator"; [n] children/*[2]; [p] (pause:short)',
      'self::fraction',
      'name(children/*[1])="appl" or name(children/*[2])="appl"'
  );
  // defineRuleAlias(
  //     'fraction', 'self::fraction',
  //   'contains(children/*[1]/@meaning, "clearspeak:simple")',
  //   'contains(children/*[2]/@meaning, "clearspeak:simple")',
  //   'name(children/*[1])="fraction" or name(children/*[1])="fraction"');
  defineRule(
      'simple-fraction', 'clearspeak.default',
      '[p] (pause:short); [n] children/*[1]; [t] "over"; [n] children/*[2]; [p] (pause:short)',
    'self::fraction',
    'contains(children/*[1]/@meaning, "clearspeak:simple") or contains(children/*[1]/@meaning, "clearspeak:unit")',
    'contains(children/*[2]/@meaning, "clearspeak:simple") or contains(children/*[2]/@meaning, "clearspeak:unit")');
  defineRule(
      'simple-vulgar-fraction', 'clearspeak.default',
      '[p] (pause:short); [n] children/*[1]; [t] "over"; [n] children/*[2]; [p] (pause:short)',
    'self::fraction', '@role="vulgar"');
  defineRule(
      'simple-text-fraction', 'clearspeak.default',
      '[p] (pause:short); [n] children/*[1]; [t] "over"; [n] children/*[2]; [p] (pause:short)',
      'self::fraction', 'name(children/*[1])="text"', 'name(children/*[2])="text"');
  defineRule(
      'simple-text-fraction', 'clearspeak.default',
      '[p] (pause:short); [n] children/*[1]; [t] "over"; [n] children/*[2]; [p] (pause:short)',
      'self::fraction',
      'name(children/*[1])="infixop"', 'children/*[1][@role="unit"]',
      'name(children/*[2])="text"');
  defineRule(
      'vulgar-fraction', 'clearspeak.default',
      '[t] CSFvulgarFraction', 'self::fraction', '@role="vulgar"', 'CQFvulgarFractionSmall');
  // Preferences
  defineRule(
      'fraction', 'clearspeak.Fraction_Over',
      '[p] (pause:short); [n] children/*[1];' +
          ' [t] "over"; [n] children/*[2]; [p] (pause:short)',
      'self::fraction');
  defineRule(
      'fraction', 'clearspeak.Fraction_OverEndFrac',
      '[p] (pause:short); [n] children/*[1]; [t] "over"; [n] children/*[2];' +
      ' [p] (pause:short); [t] "end fraction"; [p] (pause:short)',
      'self::fraction');
  defineRule(
      'fraction', 'clearspeak.Fraction_FracOver',
      '[p] (pause:short); [t] "the fraction"; [n] children/*[1];' +
          ' [t] "over"; [n] children/*[2]; [p] (pause:short)',
      'self::fraction');
  defineRule(
      'fraction', 'clearspeak.Fraction_Per',
      '[p] (pause:short); [n] children/*[1];' +
          ' [t] "per"; [n] children/*[2]; [p] (pause:short)',
      'self::fraction');
  defineRule(
      'fraction', 'clearspeak.Fraction_GeneralEndFrac',
      '[p] (pause:short); [t] "the fraction with numerator"; [n] children/*[1]; [p] (pause:short);' +
          ' [t] "and denominator"; [n] children/*[2]; [p] (pause:short); [t] "end fraction"; [p] (pause:short)',
      'self::fraction');
  defineRule(
      'fraction', 'clearspeak.Fraction_General',
      '[p] (pause:short); [t] "the fraction with numerator"; [n] children/*[1]; [p] (pause:short);' +
          ' [t] "and denominator"; [n] children/*[2]; [p] (pause:short)',
      'self::fraction');

  defineRule(
      'simple-vulgar-fraction', 'clearspeak.Fraction_Ordinal',
      '[t] CSFvulgarFraction', 'self::fraction', '@role="vulgar"');

  defineRule(
      'fraction', 'clearspeak.Fraction_EndFrac',
      '[p] (pause:short); [n] . (grammar:endfrac); [t] "end fraction"; [p] (pause:short)',
    'self::fraction', 'not(contains(@grammar, "endfrac"))',
    'not(contains(children/*[1]/@meaning, "clearspeak:unit"))',
    'not(contains(children/*[2]/@meaning, "clearspeak:unit"))');
  // defineRule(
  //     'fraction', 'clearspeak.Fraction_EndFrac',
  //     '[p] (pause:short); [t] "the fraction with numerator"; [n] children/*[1]; [p] (pause:short);' +
  //         ' [t] "and denominator"; [n] children/*[2]; [p] (pause:short); [t] "end fraction"; [p] (pause:short)',
  //   'self::fraction', 'not(@role="vulgar")',
  //   'not(contains(children/*[1]/@meaning, "clearspeak:unit"))',
  //   'not(contains(children/*[2]/@meaning, "clearspeak:unit"))');
  // defineRule(
  //     'vulgar-fraction', 'clearspeak.Fraction_EndFrac',
  //     '[p] (pause:short); [n] children/*[1]; [t] "over"; [n] children/*[2];' +
  //     ' [p] (pause:short); [t] "end fraction"; [p] (pause:short)',
  //     'self::fraction', '@role="vulgar"');
  defineRule(
      'vulgar-fraction', 'clearspeak.Fraction_EndFrac',
      '[p] (pause:short); [n] children/*[1]; [t] "over"; [n] children/*[2];' +
      ' [p] (pause:short)',
      'self::fraction', 'name(children/*[1])="fraction"', 'name(children/*[2])="fraction"',
      'contains(children/*[1]/@meaning, "clearspeak:simple")',
      'contains(children/*[2]/@meaning, "clearspeak:simple")');
  defineRule(
      'simple-vulgar-fraction', 'clearspeak.Fraction_EndFrac',
      '[t] CSFvulgarFraction', 'self::fraction', '@role="vulgar"',
    'contains(@meaning, "clearspeak:simple")', 'self::*');


  // Roots
  defineRule(
      'sqrt', 'clearspeak.default',
      '[p] (pause:"short"); [t] "the square root of"; [n] children/*[1]; [p] (pause:"short")',
    'self::sqrt');
  defineRule(
      'sqrt', 'clearspeak.Roots_RootEnd',
      '[p] (pause:"short"); [t] "the square root of"; [n] children/*[1];' +
      ' [p] (pause:"short"); [t] "end root"; [p] (pause:"short")',
    'self::sqrt');

  // minus sign
  defineRule(
      'negative', 'clearspeak.default',
      '[t] "negative"; [n] children/*[1]',
      'self::prefixop', '@role="negative"');
  //, 'contains(@meaning, "clearspeak:simple")');
  defineRule(
      'positive', 'clearspeak.default',
      '[t] "positive"; [n] children/*[1]',
      'self::prefixop', '@role="positive"');

  // Angle
  // defineRule(
  //   'angle-prefix', 'clearspeak.default',
  //   '[n] content/*[1]; [n] children/*[1] (grammar:angle)',
  //   'self::prefixop', 'content/*[1]/text()="∠"');
  // defineRule(
  //   'angle-infix', 'clearspeak.default',
  //   '[n] content/*[1]; [n] children/*[1]; ' +
  //     '[n] children/*[2] (grammar:angle)',
  //   'self::infixop', 'content/*[1]/text()="∠"');
  defineRule(
    'angle-measure', 'clearspeak.default',
    '[t] "the measure of"; [n] content/*[1]; ' +
      '[n] children/*[2] (grammar:angle)',
    'self::infixop', 'content/*[1]/text()="∠"', 'children/*[1][text()="m"]');

 
  // defineRuleAlias(
  //     'negative',
  //     'self::prefixop', '@role="negative"', 'children/number');
  // defineRuleAlias(
  //     'negative',
  //     'self::prefixop', '@role="negative"',
  //     'children/fraction[@role="vulgar"]');

  // defineRule(
  //     'negative', 'clearspeak.default',
  //     '[t] "minus"; [n] children/*[1]',
  //     'self::prefixop', '@role="negative"');

  // Operator rules
  defineRule(
      'prefix', 'clearspeak.default',
      '[n] text(); [n] children/*[1]',
      'self::prefixop');
  defineRule(
      'postfix', 'clearspeak.default',
      '[n] children/*[1]; [n] text()',
      'self::postfixop');

  defineRule(
      'binary-operation', 'clearspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator);', 'self::infixop');
  defineRule(
      'binary-operation-pause', 'clearspeak.default',
    '[p] (pause:"short"); [m] children/* (sepFunc:CTXFcontentIterator);',
    'self::infixop', '@role="implicit"', 'name(children/*[1])="appl"');
  defineRule(
      'binary-operation-pause', 'clearspeak.default',
    '[m] children/* (sepFunc:CTXFcontentIterator); [p] (pause:"short")',
    'self::infixop', '@role="implicit"', 'name(children/*[last()])="appl"');
  defineRule(
      'binary-operation-pause', 'clearspeak.default',
    '[p] (pause:"short"); [m] children/* (sepFunc:CTXFcontentIterator); [p] (pause:"short")',
    'self::infixop', '@role="implicit"', 'name(children/*[1])="appl"', 'name(children/*[last()])="appl"');
  // Maybe restrict those to prefix function role only!

  defineRule(
      'implicit-times', 'clearspeak.default',
      '[p] (pause:"short")', 'self::operator', '@role="multiplication"', 'text()="⁢"');
  defineRule(
      'implicit-times', 'clearspeak.default',
      '', 'self::operator', '@role="multiplication"', 'text()="⁢"',
      'CQFsimpleArguments');
  defineRule(
      'implicit-times', 'clearspeak.default',
      '[n] text()', 'self::operator', '@role="multiplication"', 'text()="⁢"',
      'CQFfencedArguments'); 
  // TODO: XPath 2.0 would help here!

  // REMARK: Currently we have accelerated rate only with multi-character simple
  // expressions or if they are the enumerator of a fraction.
  // 
  defineRule(
      'binary-operation-simple', 'clearspeak.default',
      '[m] children/* (rate:"0.5"); [p] (pause:"short")',
      'self::infixop', '@role="implicit"',
      'contains(@meaning, "clearspeak:simple")',
      'not(contains(@grammar, "inFrac"))');

  defineRule(
      'simple-in-fraction', 'clearspeak.default',
      '[n] . (rate:"0.5",grammar:inFrac)',
      'self::*', 'contains(@meaning, "clearspeak:simple")',
      'not(contains(@grammar, "inFrac"))',
      'name(.)!="identifier"', 'name(.)!="function"', 'name(.)!="number"',
      'name(parent::*/parent::*)="fraction"',
      'not(preceding-sibling::*)');
  

  // Relations
  defineRule(
      'relseq', 'clearspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::relseq');

  // defineRule(
  //     'equality', 'clearspeak.default',
  //     '[n] children/*[1]; [n] content/*[1]; [n] children/*[2]',
  //     'self::relseq', '@role="equality"', 'count(./children/*)=2');

  // defineRule(
  //     'multi-equality', 'clearspeak.default',
  //     '[m] ./children/* (sepFunc:CTXFcontentIterator)',
  //     'self::relseq', '@role="equality"', 'count(./children/*)>2');

  defineRule(
      'multrel', 'clearspeak.default',
      '[m] children/* (sepFunc:CTXFcontentIterator)',
      'self::multirel');

  // Named sets
  defineRule(
    'natural-numbers', 'clearspeak.default',
    '[t] "the natural numbers"', 'self::identifier',
    'text()="\u2115" or (text()="N" and @font="double-struck")',
    'self::*');
  defineRule(
    'integers', 'clearspeak.default',
    '[t] "the integers"', 'self::identifier',
    'text()="\u2124" or (text()="Z" and @font="double-struck")',
    'self::*');
  defineRule(
    'rational-numbers', 'clearspeak.default',
    '[t] "the rational numbers"', 'self::identifier',
    'text()="\u211A" or (text()="Q" and @font="double-struck")',
    'self::*');
  defineRule(
    'real-numbers', 'clearspeak.default',
    '[t] "the real numbers"', 'self::identifier',
    'text()="\u211D" or (text()="R" and @font="double-struck")',
    'self::*');
  defineRule(
    'complex-numbers', 'clearspeak.default',
    '[t] "the complex numbers"', 'self::identifier',
    'text()="\u2102" or (text()="C" and @font="double-struck")',
    'self::*');

  // Named sets with superscripts
  defineRule(
    'natural-numbers-super', 'clearspeak.default',
    '[t] "n" (join: "-"); [n] children/*[2] (grammar:numbers2alpha)',
    'self::superscript', 'children/*[1]/text()="\u2115"' +
      ' or (children/*[1]/text()="N" and @font="double-struck")',
    'self::*', 'self::*');
  defineRule(
    'integers-super', 'clearspeak.default',
    '[t] "z" (join: "-"); [n] children/*[2] (grammar:numbers2alpha)',
    'self::superscript', 'children/*[1]/text()="\u2124"' +
      ' or (children/*[1]/text()="Z" and @font="double-struck")',
    'self::*', 'self::*');
  defineRule(
    'rational-numbers-super', 'clearspeak.default',
    '[t] "q" (join: "-"); [n] children/*[2] (grammar:numbers2alpha)',
    'self::superscript', 'children/*[1]/text()="\u211A"' +
      ' or (children/*[1]/text()="Q" and @font="double-struck")',
    'self::*', 'self::*');
  defineRule(
    'real-numbers-super', 'clearspeak.default',
    '[t] "r" (join:"-"); [n] children/*[2] (grammar:numbers2alpha)',
    'self::superscript', 'children/*[1]/text()="\u211D"' +
      ' or (children/*[1]/text()="R" and @font="double-struck")',
    'self::*', 'self::*');
  defineRule(
    'complex-numbers-super', 'clearspeak.default',
    '[t] "c" (join:"-"); [n] children/*[2] (grammar:numbers2alpha)',
    'self::superscript', 'children/*[1]/text()="\u2102"' +
      ' or (children/*[1]/text()="C" and @font="double-struck")',
    'self::*', 'self::*');

  // Partial named sets.
  defineRule(
    'natural-numbers-with-zero', 'clearspeak.default',
    '[t] "the natural numbers with zero"',
    'self::subscript', 'children/*[1]/text()="\u2115"' +
      ' or (children/*[1]/text()="N" and @font="double-struck")',
    'children/*[2]/text()="0"');
  defineRule(
    'positive-integers', 'clearspeak.default',
    '[t] "the positive integers"',
    'self::superscript', 'children/*[1]/text()="\u2124"' +
      ' or (children/*[1]/text()="Z" and @font="double-struck")',
    'children/*[2]/text()="+"',
    'self::*', 'self::*');
  defineRule(
    'positive-integers', 'clearspeak.default',
    '[t] "the negative integers"',
    'self::superscript', 'children/*[1]/text()="\u2124"' +
      ' or (children/*[1]/text()="Z" and @font="double-struck")',
    'children/*[2]/text()="-"',
    'self::*', 'self::*');
  defineRule(
    'positive-rational-numbers', 'clearspeak.default',
    '[t] "the positive rational numbers"',
    'self::superscript', 'children/*[1]/text()="\u211A"' +
      ' or (children/*[1]/text()="Q" and @font="double-struck")',
    'children/*[2]/text()="+"',
    'self::*', 'self::*');
  defineRule(
    'negative-rational-numbers', 'clearspeak.default',
    '[t] "the negative rational numbers"',
    'self::superscript', 'children/*[1]/text()="\u211A"' +
      ' or (children/*[1]/text()="Q" and @font="double-struck")',
    'children/*[2]/text()="-"',
    'self::*', 'self::*');
  // TODO: Do we need positive and negative real numbers. Usually they are more
  //       complex notation!

  // Absolute Values
  defineRule(
    'fences-neutral', 'clearspeak.default',
    '[p] (pause:short); [t] "the absolute value of"; ' +
      '[n] children/*[1]; [p] (pause: short)',
    'self::fenced', '@role="neutral"',
    'content/*[1][text()]="|" or content/*[1][text()]="❘" or' +
      ' content/*[1][text()]="｜"');
  defineRule(
    'fences-neutral', 'clearspeak.AbsoluteValue_AbsEnd',
    '[p] (pause:short); [t] "the absolute value of"; ' +
      '[n] children/*[1]; [p] (pause: short); ' +
      '[t] "end absolute value"; [p] (pause: short)',
    'self::fenced', '@role="neutral"',
    'content/*[1][text()]="|" or content/*[1][text()]="❘" or' +
      ' content/*[1][text()]="｜"');

  // Layout elements: Matrix like structures
  // Order of rules is important!
  // 
  // Matrix
  defineRule(
      'matrix', 'clearspeak.default',
      '[t] "the"; [t] count(children/*);  [t] "by";' +
      '[t] count(children/*[1]/children/*); [t] "matrix"; [p] (pause:long);' +
      ' [m] children/* (ctxtFunc:CTXFnodeCounter,context:"Row-:");' +
      ' [p] (pause:long)',
      'self::matrix');
  defineRule(
      'matrix-simple', 'clearspeak.default',
      '[t] "the"; [t] count(children/*);  [t] "by";' +
      '[t] count(children/*[1]/children/*); [t] "matrix"; [p] (pause:long);' +
      ' [m] children/* (ctxtFunc:CTXFnodeCounter,context:"Row-:",grammar:simpleDet);' +
      ' [p] (pause:long)',
      'self::matrix', 'count(children/*)<4',
      'count(children/*[1]/children/*)<4', 'CQFcellsSimple');
  // Determinant
  defineRule(
      'determinant', 'clearspeak.default',
      '[t] "the determinant of the"; [t] count(children/*);  [t] "by";' +
      '[t] count(children/*[1]/children/*); [t] "matrix"; [p] (pause:long);' +
      ' [m] children/* (ctxtFunc:CTXFnodeCounter,context:"Row-:",grammar:simpleDet);' +
      ' [p] (pause:long)',
      'self::matrix', '@role="determinant"', 'count(children/*)<4', 'CQFcellsSimple');
  defineRule(
      'determinant-simple', 'clearspeak.default',
      '[t] "the determinant of the"; [t] count(children/*);  [t] "by";' +
      '[t] count(children/*[1]/children/*); [t] "matrix"; [p] (pause:long);' +
      ' [m] children/* (ctxtFunc:CTXFnodeCounter,context:"Row-:");' +
      ' [p] (pause:long)',
      'self::matrix', '@role="determinant"');
  // Vector
    defineRule(
      'vector', 'clearspeak.default',
      '[t] "the"; [t] count(children/*);  [t] "by";' +
      '[t] count(children/*[1]/children/*); [t] "column matrix"; [p] (pause:long);' +
      ' [m] children/* (ctxtFunc:CTXFnodeCounter,context:"Row-:",grammar:simpleDet);' +
      ' [p] (pause:long)',
      'self::vector');
    defineSpecialisedRule(
      'vector', 'clearspeak.default', 'clearspeak.Matrix_SpeakColNum');
    defineRule(
      'vector-simple', 'clearspeak.default',
      '[t] "the"; [t] count(children/*);  [t] "by";' +
      '[t] count(children/*[1]/children/*); [t] "column matrix"; [p] (pause:long);' +
      ' [m] children/* (sepFunc:CTXFpauseSeparator,separator:"short",grammar:simpleDet);' +
      ' [p] (pause:long)',
      'self::vector', 'count(children/*)<4', 'CQFcellsSimple');
    defineRule(
      'vector-simple', 'clearspeak.Matrix_SilentColNum',
      '[t] "the"; [t] count(children/*);  [t] "by";' +
      '[t] count(children/*[1]/children/*); [t] "column matrix"; [p] (pause:long);' +
      ' [m] children/* (sepFunc:CTXFpauseSeparator,separator:"short",grammar:simpleDet);' +
      ' [p] (pause:long)',
      'self::vector');

  defineRule(
      'row-vector', 'clearspeak.default',
      '[t] "the"; [t] count(children/*);  [t] "by";' +
      '[t] count(children/*[1]/children/*); [t] "row matrix"; [p] (pause:long);' +
      ' [m] children/*[1]/children/* (ctxtFunc:CTXFnodeCounter,context:"Column-:",grammar:simpleDet);' +
      ' [p] (pause:long)',
      'self::matrix', '@role="rowvector"');
    defineSpecialisedRule(
      'row-vector', 'clearspeak.default', 'clearspeak.Matrix_SpeakColNum');
    defineRule(
      'row-vector-simple', 'clearspeak.default',
      '[t] "the"; [t] count(children/*);  [t] "by";' +
      '[t] count(children/*[1]/children/*); [t] "row matrix"; [p] (pause:long);' +
      ' [m] children/*[1]/children/* (sepFunc:CTXFpauseSeparator,separator:"short",grammar:simpleDet);' +
      ' [p] (pause:long)',
      'self::matrix', '@role="rowvector"', 'count(children/*[1]/children/*)<4', 'CQFcellsSimple');
    defineRule(
      'row-vector-simple', 'clearspeak.Matrix_SilentColNum',
      '[t] "the"; [t] count(children/*);  [t] "by";' +
      '[t] count(children/*[1]/children/*); [t] "row matrix"; [p] (pause:long);' +
      ' [m] children/*[1]/children/* (sepFunc:CTXFpauseSeparator,separator:"short",grammar:simpleDet);' +
      ' [p] (pause:long)',
      'self::matrix', '@role="rowvector"');


  defineRule(
      'matrix-row-simple', 'clearspeak.default',
      '[m] children/* (sepFunc:CTXFpauseSeparator,separator:"short")',
      'self::row', 'contains(@grammar, "simpleDet")');
  defineRule(
      'matrix-row-simple', 'clearspeak.Matrix_SilentColNum',
      '[m] children/* (sepFunc:CTXFpauseSeparator,separator:"short")',
      'self::row');
  defineRule(
      'line-simple', 'clearspeak.default',
      '[n] children/*[1]',
      'self::line', 'contains(@grammar, "simpleDet")');
  defineRule(
      'matrix-row', 'clearspeak.default',
      '[m] children/* (ctxtFunc:CTXFnodeCounter,context:"Column-,- ",' +
      'sepFunc:CTXFpauseSeparator,separator:"medium"); [p] (pause:long)',
      'self::row');
  defineSpecialisedRule(
      'matrix-row', 'clearspeak.default', 'clearspeak.Matrix_SpeakColNum');
  defineRule(
      'matrix-cell', 'clearspeak.default',
      '[n] children/*[1]', 'self::cell');

  defineRule(
      'end-matrix', 'clearspeak.Matrix_EndMatrix',
      '[n] . (grammar:EndMatrix); [t] "end matrix"',
      'self::matrix', 'not(contains(@grammar, "EndMatrix"))');
  defineRule(
      'end-vector', 'clearspeak.Matrix_EndMatrix',
      '[n] . (grammar:EndMatrix); [t] "end matrix"',
      'self::vector', 'not(contains(@grammar, "EndMatrix"))');
  defineRule(
      'end-determinant', 'clearspeak.Matrix_EndMatrix',
      '[n] . (grammar:EndMatrix); [t] "end determinant"',
      'self::matrix', '@role="determinant"',
      'not(contains(@grammar, "EndMatrix"))');

  // defineRule(
  //     'line-vector-row', 'clearspeak.default',
  //     '[n] text(); [p] (pause:long)',
  //     'self::line');

};

});  // goog.scope


sre.ClearspeakRules.getInstance().initializer = [
  sre.ClearspeakRules.initCustomFunctions_,
  sre.ClearspeakRules.initClearspeakRules_,
  sre.ClearspeakRules.addAnnotators_
];


sre.Grammar.getInstance().setPreprocessor('numbers2alpha',
                                          sre.ClearspeakUtil.numbersToAlpha);
