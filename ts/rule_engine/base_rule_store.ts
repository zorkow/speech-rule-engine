//
// Copyright 2013 Google Inc.
// Copyright 2014-21 Volker Sorge
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
 * @fileoverview Abstract base class for all speech rule stores.
 *
 * The base rule store implements some basic functionality that is common to
 * most speech rule stores.
 * @author sorge@google.com (Volker Sorge)
 */


import {AuditoryDescription} from '../audio/auditory_description';
import {Debugger} from '../common/debugger';
import * as DomUtil from '../common/dom_util';
import * as EngineExports from '../common/engine';
import {Engine} from '../common/engine';
import {Trie} from '../indexing/trie';

import * as DynamicCstrExports from './dynamic_cstr';
import {DynamicCstr} from './dynamic_cstr';
import {SpeechRule} from './speech_rule';
import {SpeechRuleContext} from './speech_rule_context';
import {SpeechRuleEvaluator} from './speech_rule_evaluator';
import {SpeechRuleStore} from './speech_rule_store';



export class BaseRuleStore implements SpeechRuleEvaluator, SpeechRuleStore {
  evaluateString: any;


  initialize: any;

  context: SpeechRuleContext;

  /**
   * Set of speech rules in the store.
   */
  private speechRules_: SpeechRule[] = [];

  trie: Trie;

  parseOrder: DynamicCstr.Order;

  parser: DynamicCstrExports.Parser;

  locale: string;

  modality: string;

  /**
   * Default domain.
   */
  domain: string = '';

  initialized: boolean = false;

  parseMethods: any;

  /**
   * Local transcriptions for special characters.
   */
  customTranscriptions: {[key: string]: string} = {};
  constructor() {
    /**
     * Context for custom functions of this rule store.
     */
    this.context = new SpeechRuleContext();
    /**
     * Trie for indexing speech rules in this store.
     */
    this.trie = new Trie(this);
    /**
     * A priority list of dynamic constraint attributes.
     */
    this.parseOrder = DynamicCstr.DEFAULT_ORDER;
    /**
     * A dynamic constraint parser.
     */
    this.parser = new DynamicCstrExports.Parser(this.parseOrder);
    /**
     * Default locale.
     */
    this.locale = DynamicCstr.DEFAULT_VALUES[DynamicCstrExports.Axis.LOCALE];
    /**
     * Default modality.
     */
    this.modality =
        DynamicCstr.DEFAULT_VALUES[DynamicCstrExports.Axis.MODALITY];
    this.parseMethods = {
      'Rule': goog.bind(this.defineRule, this),
      'Generator': goog.bind(this.generateRules, this)
    };
  }


  /**
   * @override
   */
  lookupRule(node, dynamic) {
    if (!node ||
        node.nodeType != DomUtil.NodeType.ELEMENT_NODE &&
            node.nodeType != DomUtil.NodeType.TEXT_NODE) {
      return null;
    }
    let matchingRules = this.lookupRules(node, dynamic);
    return matchingRules.length > 0 ?
        this.pickMostConstraint_(dynamic, matchingRules) :
        null;
  }


  /**
   * Retrieves a list of applicable rule for the given node.
   * @param node A node.
   * @param dynamic Additional dynamic
   *     constraints. These are matched against properties of a rule.
   * @return All applicable speech rules.
   */
  lookupRules(node: Node, dynamic: DynamicCstr): SpeechRule[] {
    return this.trie.lookupRules(node, dynamic.allProperties());
  }


  /**
   * @override
   */
  defineRule(name, dynamic, action, prec, cstr) {
    let rule;
    try {
      // TODO: Have a parser that respects generators.
      let postc = SpeechRule.Action.fromString(action);
      let cstrList = Array.prototype.slice.call(arguments, 4);
      let fullPrec = this.parsePrecondition(prec, cstrList);
      let dynamicCstr = this.parseCstr(dynamic);
      rule = new SpeechRule(name, dynamicCstr, fullPrec, postc);
    } catch (err) {
      if (err.name == 'RuleError') {
        console.error('Rule Error ', prec, '(' + dynamic + '):', err.message);
        return null;
      } else {
        throw err;
      }
    }
    this.addRule(rule);
    return rule;
  }


  /**
   * @override
   */
  addRule(rule) {
    rule.context = this.context;
    this.trie.addRule(rule);
    this.speechRules_.unshift(rule);
  }


  /**
   * @override
   */
  deleteRule(rule) {
    let index = this.speechRules_.indexOf(rule);
    if (index != -1) {
      this.speechRules_.splice(index, 1);
    }
  }


  /**
   * @override
   */
  findRule(pred) {
    for (let i = 0, rule; rule = this.speechRules_[i]; i++) {
      if (pred(rule)) {
        return rule;
      }
    }
    return null;
  }


  /**
   * @override
   */
  findAllRules(pred) {
    return this.speechRules_.filter(pred);
  }


  /**
   * @override
   */
  evaluateDefault(node) {
    let rest = node.textContent.slice(0);
    if (rest.match(/^\s+$/)) {
      // Nothing but whitespace: Ignore.
      return this.evaluateWhitespace(rest);
    }
    return this.evaluateString(rest);
  }


  /**
   * @override
   */
  evaluateWhitespace(str) {
    return [];
  }


  /**
   * @override
   */
  evaluateCustom(str) {
    let trans = this.customTranscriptions[str];
    return trans !== undefined ?
        AuditoryDescription.create(
            {'text': trans}, {adjust: true, translate: false}) :
        null;
  }


  /**
   * @override
   */
  evaluateCharacter(str) {
    return this.evaluateCustom(str) ||
        AuditoryDescription.create(
            {'text': str}, {adjust: true, translate: true});
  }


  /**
   * Test the applicability of a speech rule in debugging mode.
   * @param rule Rule to debug.
   * @param node DOM node to test applicability of given rule.
   */
  debugSpeechRule(rule: SpeechRule, node: Node) {
    let prec = rule.precondition;
    let queryResult = rule.context.applyQuery(node, prec.query);
    Debugger.getInstance().output(
        prec.query, queryResult ? queryResult.toString() : queryResult);
    prec.constraints.forEach(goog.bind(function(cstr) {
      Debugger.getInstance().output(
          cstr, rule.context.applyConstraint(node, cstr));
    }, this));
  }


  /**
   * Removes duplicates of the given rule from the rule store. Thereby
   * duplicates are identified by having the same precondition and dynamic
   * constraint.
   * @param rule The rule.
   */
  removeDuplicates(rule: SpeechRule) {
    for (let i = this.speechRules_.length - 1, oldRule;
         oldRule = this.speechRules_[i]; i--) {
      if (oldRule != rule && rule.dynamicCstr.equal(oldRule.dynamicCstr) &&
          BaseRuleStore.comparePreconditions_(oldRule, rule)) {
        this.speechRules_.splice(i, 1);
      }
    }
  }


  /**
   * Picks the result of the most constraint rule by prefering those:
   * 1) that best match the dynamic constraints.
   * 2) with the most additional constraints.
   * @param dynamic Dynamic constraints.
   * @param rules An array of rules.
   * @return The most constraint rule.
   */
  private pickMostConstraint_(dynamic: DynamicCstr, rules: SpeechRule[]):
      SpeechRule {
    let comparator = Engine.getInstance().comparator;
    rules.sort(function(r1, r2) {
      return comparator.compare(r1.dynamicCstr, r2.dynamicCstr) ||
          // When same number of dynamic constraint attributes matches for
          // both rules, compare length of static constraints.
          // sre.BaseRuleStore.strongQuery_(r1, r2) ||
          BaseRuleStore.priority_(r1, r2) ||
          r2.precondition.constraints.length -
          r1.precondition.constraints.length;
    });
    Debugger.getInstance().generateOutput(goog.bind(function() {
      return rules.map(function(x) {
        return x.name + '(' + x.dynamicCstr.toString() + ')';
      });
    }, this));
    return rules[0];
  }


  // TODO (sorge) Define the following methods directly on the precondition
  //     classes.
  /**
   * Compares two static constraints (i.e., lists of precondition constraints)
   * and returns true if they are equal.
   * @param cstr1 First static constraints.
   * @param cstr2 Second static constraints.
   * @return True if the static constraints are equal.
   */
  private static compareStaticConstraints_(cstr1: string[], cstr2: string[]):
      boolean {
    if (cstr1.length != cstr2.length) {
      return false;
    }
    for (let i = 0, cstr; cstr = cstr1[i]; i++) {
      if (cstr2.indexOf(cstr) == -1) {
        return false;
      }
    }
    return true;
  }


  /**
   * Compares the preconditions of two speech rules.
   * @param rule1 The first speech rule.
   * @param rule2 The second speech rule.
   * @return True if the preconditions are equal.
   */
  private static comparePreconditions_(rule1: SpeechRule, rule2: SpeechRule):
      boolean {
    let prec1 = rule1.precondition;
    let prec2 = rule2.precondition;
    if (prec1.query != prec2.query) {
      return false;
    }
    return BaseRuleStore.compareStaticConstraints_(
        prec1.constraints, prec2.constraints);
  }


  /**
   * Compares priority of two rules.
   * @param rule1 The first speech rule.
   * @param rule2 The second speech rule.
   * @return -1, 0, 1 depending on the comparison.
   */
  private static priority_(rule1: SpeechRule, rule2: SpeechRule): number {
    let priority1 = rule1.precondition.priority;
    let priority2 = rule2.precondition.priority;
    return priority1 === priority2 ? 0 : priority1 > priority2 ? -1 : 1;
  }


  /**
   * @return Set of all speech rules in the store.
   */
  getSpeechRules(): SpeechRule[] {
    return this.speechRules_;
  }


  /**
   * Sets the speech rule set of the store.
   * @param rules New rule set.
   */
  setSpeechRules(rules: SpeechRule[]) {
    this.speechRules_ = rules;
  }


  /**
   * Default constraint parser that adds the locale to the rest constraint
   * (generally, domain.style).
   * @param cstr The constraint string.
   * @return The parsed constraint including locale.
   */
  parseCstr(cstr: string): DynamicCstr {
    return this.parser.parse(
        this.locale + '.' + this.modality +
        (this.domain ? '.' + this.domain : '') + '.' + cstr);
  }


  /**
   * Parses precondition by resolving generator rules.
   * @param query The query constraint.
   * @param rest The rest constraints.
   * @return The new precondition.
   */
  parsePrecondition(query: string, rest: string[]): SpeechRule.Precondition {
    let queryCstr = this.parsePrecondition_(query);
    query = queryCstr[0];
    let restCstr = queryCstr.slice(1);
    for (let cstr of rest) {
      restCstr = restCstr.concat(this.parsePrecondition_(cstr));
    }
    return new SpeechRule.Precondition(query, restCstr);
  }


  /**
   * Resolves a single precondition constraint.
   * @param cstr The precondition constraint.
   * @return Array of constraints, possibly generated.
   */
  private parsePrecondition_(cstr: string): string[] {
    let generator = this.context.customGenerators.lookup(cstr);
    return generator ? generator() : [cstr];
  }


  /**
   * Parses a rule set definition.
   * @param ruleSet The
   *     definition object.
   */
  parse(ruleSet: {[key: string]: string|any[]}) {
    this.modality = ruleSet.modality || this.modality;
    this.locale = ruleSet.locale || this.locale;
    this.domain = ruleSet.domain || this.domain;
    this.context.parse(ruleSet.functions || []);
    this.parseRules(ruleSet.rules || []);
  }


  /**
   * Parse a list of rules, each given as a list of strings.
   * @param rules The list of rules.
   */
  parseRules(rules: string[][]) {
    for (let i = 0, rule; rule = rules[i]; i++) {
      let type = rule[0];
      let method = this.parseMethods[type];
      if (type && method) {
        method.apply(this, rule.slice(1));
      }
    }
  }


  /**
   * Parses rules generated by the given generator function.
   * @param generator Name of the generator function.
   */
  generateRules(generator: string) {
    let method = this.context.customGenerators.lookup(generator);
    if (method) {
      method(this);
    }
  }


  /**
   * Prunes the trie of the store for a given constraint.
   * @param constraints A list of constraints.
   */
  prune(constraints: string[]) {
    let last = constraints.pop();
    let parent = this.trie.byConstraint(constraints);
    if (parent) {
      parent.removeChild(last);
    }
  }
}

/**
 * @override
 */
BaseRuleStore.prototype.evaluateString = goog.abstractMethod;
/**
 * Function to initialize the store with speech rules. It is called by the
 * speech rule engine upon parametrization with this store. The function allows
 * us to define sets of rules in separate files while depending on functionality
 * that is defined in the rule store.
 * Essentially it is a way of getting around dependencies.
 */
BaseRuleStore.prototype.initialize = goog.abstractMethod;