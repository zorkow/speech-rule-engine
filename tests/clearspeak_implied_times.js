// Copyright 2017 Volker Sorge
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

//
// With support from the Mozilla Foundation under a MOSS grant.
//


goog.provide('sre.ClearspeakImpliedTimes');

goog.require('sre.ClearspeakRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakRuleTest}
*/
sre.ClearspeakImpliedTimes = function() {
sre.ClearspeakImpliedTimes.base(this, 'constructor');

/**
* @override
*/
this.information = 'ClearspeakImpliedTimes rule tests.';

};
goog.inherits(sre.ClearspeakImpliedTimes, sre.ClearspeakRuleTest);



//
// Implied Times
//


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes001
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes001 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2 times 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes002
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes002 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mn>3</mn><mo>]</mo></mrow></mrow></math>';
  var speech = '2 times 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes003
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes003 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mn>4</mn></msup><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2 to the fourth power, times 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes004
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes004 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 times, open paren, 3 plus 4, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes005
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes005 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2 times, open bracket, 3 plus 4, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes006
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes006 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow><mrow><mo>(</mo><mn>2</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '3 times 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes007
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes007 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><msup><mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = '2 times, open paren, 3 plus 4, close paren, squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes008
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes008 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>−</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, 2 plus 7, close paren, times, open paren, 3 minus 6, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes009
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes009 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>2</mn><mo>+</mo><mn>7</mn></mrow><mo>]</mo></mrow><mrow><mo>[</mo><mrow><mn>3</mn><mo>−</mo><mn>6</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'open bracket, 2 plus 7, close bracket, times, open bracket, 3 minus 6, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes010
 */
// TODO: (simons) x is categorised as function!
sre.ClearspeakImpliedTimes.prototype.untestImpTimes010 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x times, y z';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes011
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes011 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mo>+</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x times, open paren, y plus z, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes012
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes012 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mi>y</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 times, open paren, y plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes013
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes013 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mn>2</mn><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo><mi>x</mi></mrow></math>';
  var speech = 'open paren, 2 minus 1, close paren, times x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes014
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes014 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'p sub 1, times, open paren, 3 plus 7, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes015
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes015 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><msub><mi>a</mi><mn>1</mn></msub></mrow></msubsup><msubsup><mi>p</mi><mn>2</mn><mrow><msub><mi>a</mi><mn>2</mn></msub></mrow></msubsup></mrow></math>';
  var speech = 'p sub 1, raised to the, a sub 1, power, p sub 2, raised to the, a sub 2, power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes016
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes016 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo><mn>4</mn></mrow></msup><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo><mn>4</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, x plus y, close paren, to the negative 4 power, times, open paren, x minus y, close paren, to the negative 4 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes017
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes017 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><mn>4</mn><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow></msup></mrow></math>';
  var speech = '2 raised to the 4 times, open paren, x plus y, close paren, power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes018
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes018 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'x y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes019
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes019 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mi>x</mi><mn>2</mn></msup><msup><mi>y</mi><mn>3</mn></msup></mrow></math>';
  var speech = 'x squared, y cubed';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes020
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes020 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>1</mn></mrow></msup><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>2</mn></mrow></msup></mrow></math>';
  var speech = 'x raised to the y plus 1 power, x raised to the y plus 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes021
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes021 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msqrt><mi>a</mi></msqrt><msqrt><mi>b</mi></msqrt><mo>=</mo><msqrt><mrow><mi>a</mi><mi>b</mi></mrow></msqrt></mrow></math>';
  var speech = 'the square root of a, the square root of b, equals, the square root of a b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes022
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes022 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msqrt><mn>3</mn></msqrt><msqrt><mrow><mn>10</mn></mrow></msqrt><mo>=</mo><msqrt><mrow><mn>30</mn></mrow></msqrt></mrow></math>';
  var speech = 'the square root of 3, the square root of 10, equals, the square root of 30';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes023
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes023 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></math>';
  var speech = '2, the square root of 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes024
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes024 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></math>';
  var speech = '1 plus 2, the square root of 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes025
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes025 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn></msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of x, equals x squared times, open paren, x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes026
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes026 = function() {
  var preference = 'ImpliedTimes_Auto';
  preference = 'Functions_None';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn></msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times x, equals x squared times, open paren, x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes027
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes027 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mi>x</mi><mi>cos</mi><mi>y</mi><mo>+</mo><mi>cos</mi><mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'sine x cosine y, plus, cosine x sine y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes027a
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes027a = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the sine of, open paren, x plus y, close paren, the cosine of, open paren, x plus y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes028
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes028 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'the log base 10 of, x y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes029
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes029 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mo>=</mo><mi>log</mi><mi>x</mi><mi>log</mi><mi>y</mi></mrow></math>';
  var speech = 'the log of, open paren, x plus y, close paren, equals, log x log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes030
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes030 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>7</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the 2 by 2 matrix, row 1, 1, 3. Row 2, 5, 2. times The 2 by 2 matrix, row 1, 7, 4, row 2, 0, 1.';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes031
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes031 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 times, open paren, 3 times, open paren, open paren, 4 plus 5, close paren, plus 6, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes032
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes032 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_Auto(Paren Preference SpeakNestingLevel also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 times, open paren, 3 times, open second paren, open third paren, 4 plus 5, close third paren, plus 6, close second paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes033
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes033 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2 times, open bracket, 3 times, open paren, open paren, 4 plus 5, close paren, plus 6, close paren, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes034
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes034 = function() {
  var preference = 'ImpliedTimes_Auto';
  preference = 'Paren_SpeakNestingLevel'; // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2 times, open bracket, 3 times, open paren, open second paren, 4 plus 5, close second paren, plus 6, close paren, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes035
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes035 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow></mrow></math>';
  var speech = '2 times, the absolute value of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes036
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes036 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow></mrow></math>';
  var speech = 'the absolute value of x, times, the absolute value of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes037
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes037 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the absolute value of x plus 1, times, the absolute value of y minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes037a
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes037a = function() {
  var preference = 'ImpliedTimes_Auto';
  preference = 'AbsoluteValue_AbsEnd';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the absolute value of x plus 1, end absolute value, times, the absolute value of y minus 1, end absolute value';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes038
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes038 = function() {
  var preference = 'ImpliedTimes_Auto';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'the absolute value of x plus 1, times, the absolute value of y, minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes0381
 */
sre.ClearspeakImpliedTimes.prototype.testImpTimes0381 = function() {
  var preference = 'ImpliedTimes_Auto';
  preference = 'AbsoluteValue_AbsEnd';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'the absolute value of x plus 1, end absolute value, times, the absolute value of y, end absolute value, minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes039
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes039 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2 times 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes040
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes040 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mn>3</mn><mo>]</mo></mrow></mrow></math>';
  var speech = '2 times 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes041
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes041 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mn>2</mn><mn>4</mn></msup><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2 to the 4th power, times, 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes042
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes042 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, times, open paren, 3 plus 4, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes043
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes043 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, times, open bracket, 3 plus 4, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes044
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes044 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow><mrow><mo>(</mo><mn>2</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '3 times 2';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes045
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes045 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><msup><mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = '2, times, open paren, 3 plus 4, close paren squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes046
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes046 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>−</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, 2 plus 7, close paren, times open paren, 3 minus 6, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes047
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes047 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>2</mn><mo>+</mo><mn>7</mn></mrow><mo>]</mo></mrow><mrow><mo>[</mo><mrow><mn>3</mn><mo>−</mo><mn>6</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'open bracket, 2 plus 7, close bracket, times, open bracket, 3 minus 6, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes048
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes048 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x times y times z';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes049
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes049 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mo>+</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x times, open paren, y plus z, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes050
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes050 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mi>y</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2 times, open paren, y plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes051
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes051 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mn>2</mn><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo><mi>x</mi></mrow></math>';
  var speech = 'open paren, 2 minus 1, close paren, times, x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes052
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes052 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'p sub 1, times, open paren, 3 plus 7, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes053
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes053 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><msub><mi>a</mi><mn>1</mn></msub></mrow></msubsup><msubsup><mi>p</mi><mn>2</mn><mrow><msub><mi>a</mi><mn>2</mn></msub></mrow></msubsup></mrow></math>';
  var speech = 'p sub 1 raised to the a sub 1 power, times, P sub 2 raised to the a sub 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes054
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes054 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo><mn>4</mn></mrow></msup><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo><mn>4</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, x plus y, close paren, to the negative 4 power, times, open paren, x minus y, close paren, to the negative 4 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes055
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes055 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><mn>4</mn><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow></msup></mrow></math>';
  var speech = '2 raised to the 4 times, open paren, x plus y, close paren, power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes056
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes056 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'x times y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes057
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes057 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mi>x</mi><mn>2</mn></msup><msup><mi>y</mi><mn>3</mn></msup></mrow></math>';
  var speech = 'x squared, times, y cubed';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes058
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes058 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>1</mn></mrow></msup><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>2</mn></mrow></msup></mrow></math>';
  var speech = 'x raised to the y plus 1 power, times, x raised to the y plus 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes059
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes059 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msqrt><mi>a</mi></msqrt><msqrt><mi>b</mi></msqrt><mo>=</mo><msqrt><mrow><mi>a</mi><mi>b</mi></mrow></msqrt></mrow></math>';
  var speech = 'the square root of a, times, the square root of b, equals, the square root of a times b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes060
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes060 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msqrt><mn>3</mn></msqrt><msqrt><mrow><mn>10</mn></mrow></msqrt><mo>=</mo><msqrt><mrow><mn>30</mn></mrow></msqrt></mrow></math>';
  var speech = 'the square root of 3, times, the square root of 10, equals, the square root of 30';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes061
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes061 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></math>';
  var speech = '2 times the square root of 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes062
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes062 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></math>';
  var speech = '1 plus, 2 times the square root of 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes063
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes063 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn></msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of x, equals, x squared, times, open paren, x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes064
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes064 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_MoreImpliedTimesAnd(Functions Preference None also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn></msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f times x, equals, x squared, times, open paren x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes065
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes065 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>sin</mi><mi>x</mi><mi>cos</mi><mi>y</mi><mo>+</mo><mi>cos</mi><mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'sine x, times, cosine y, plus, cosine x, times, sine y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes065a
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes065a = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>sin</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mi>cos</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'the sine of, open paren, x plus y, close paren, times, the cosine of, open paren, x plus y, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes066
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes066 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'the log base 10 of, x y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes067
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes067 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mo>=</mo><mi>log</mi><mi>x</mi><mi>log</mi><mi>y</mi></mrow></math>';
  var speech = 'the log of, open paren, x plus y, close paren, equals, log x, times, log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes068
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes068 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>7</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The 2 by 2 matrix, row 1, 1, 3, row 2, 5, 2, times, The 2 by 2 matrix, row 1, 7, 4, row 2, 0, 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes069
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes069 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, times, open paren, 3 times, open paren, open paren, 4 plus 5, close paren, plus 6, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes070
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes070 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes(Paren Preference SpeakNestingLevel also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, times, open paren, 3 times, open second paren, open third paren, 4 plus 5, close third paren, plus 6, close second paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes070a
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes070a = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2 times, open bracket, 3 times, open paren, open paren, 4 plus 5, close paren, plus 6, close paren, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes071
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes071 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes(Paren Preference SpeakNestingLevel also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2 times, open bracket, 3 times, open paren, open second paren, 4 plus 5, close second paren, plus 6, close paren, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes072
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes072 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow></mrow></math>';
  var speech = '2 times the absolute value of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes073
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes073 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow></mrow></math>';
  var speech = 'the absolute value of x, times, the absolute value of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes074
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes074 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the absolute value of x plus 1, times, the absolute value of y minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes074a
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes074a = function() {
  var preference = 'ImpliedTimes_Implied Times_MoreImpliedTimes(AbsoluteValue Preference EndAbs also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the absolute value of x plus 1, end absolute value, times, the absolute value of y minus 1, end absolute value';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes075
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes075 = function() {
  var preference = 'ImpliedTimes_MoreImpliedTimes';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'the absolute value of x plus 1, times, the absolute value of y. minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes076
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes076 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_MoreImpliedTimes(AbsoluteValue Preference EndAbs also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'the absolute value of x plus 1, end absolute value, times, the absolute value of y, end absoluete value, minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes077
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes077 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2, open paren, 3, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes078
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes078 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mn>3</mn><mo>]</mo></mrow></mrow></math>';
  var speech = '2, open bracket, 3, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes079
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes079 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mn>2</mn><mn>4</mn></msup><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2 to the 4th power open paren, three, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes080
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes080 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, open paren, 3 plus 4, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes081
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes081 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, open bracket, 3 plus 4, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes082
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes082 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow><mrow><mo>(</mo><mn>2</mn><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, 3, close paren, open paren, 2 close paren,';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes083
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes083 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><msup><mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = '2, open paren, 3 plus 4, close paren squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes084
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes084 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>−</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, 2 plus 7, close paren, open paren, 3 minus 6, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes085
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes085 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>2</mn><mo>+</mo><mn>7</mn></mrow><mo>]</mo></mrow><mrow><mo>[</mo><mrow><mn>3</mn><mo>−</mo><mn>6</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'open bracket, 2 plus 7, close bracket, open bracket, 3 minus 6, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes086
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes086 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x, open paren, y z, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes087
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes087 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mo>+</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x, open paren, y plus z, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes088
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes088 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mi>y</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, open paren, y plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes089
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes089 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mn>2</mn><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo><mi>x</mi></mrow></math>';
  var speech = 'open paren, 2 minus 1, close paren, x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes090
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes090 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'p sub 1, open paren, 3 plus 7, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes091
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes091 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msubsup><mi>p</mi><mn>1</mn><mrow><msub><mi>a</mi><mn>1</mn></msub></mrow></msubsup><msubsup><mi>p</mi><mn>2</mn><mrow><msub><mi>a</mi><mn>2</mn></msub></mrow></msubsup></mrow></math>';
  var speech = 'p sub 1 raised to the a sub 1 power, P sub 2 raised to the a sub 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes092
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes092 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo><mn>4</mn></mrow></msup><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo><mn>4</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, x plus y, close paren, to the negative 4 power, open paren, x minus y, close paren, to the negative 4 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes093
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes093 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><mn>4</mn><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow></msup></mrow></math>';
  var speech = '2 raised to the 4, open paren, x plus y, close paren, power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes094
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes094 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'x y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes095
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes095 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mi>x</mi><mn>2</mn></msup><msup><mi>y</mi><mn>3</mn></msup></mrow></math>';
  var speech = 'x squared y cubed';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes096
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes096 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>1</mn></mrow></msup><msup><mi>x</mi><mrow><mi>y</mi><mo>+</mo><mn>2</mn></mrow></msup></mrow></math>';
  var speech = 'x raised to the y plus 1 power, x raised to the y plus 2 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes097
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes097 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msqrt><mi>a</mi></msqrt><msqrt><mi>b</mi></msqrt><mo>=</mo><msqrt><mrow><mi>a</mi><mi>b</mi></mrow></msqrt></mrow></math>';
  var speech = 'the square root of a, the square root of b';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes098
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes098 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msqrt><mn>3</mn></msqrt><msqrt><mrow><mn>10</mn></mrow></msqrt><mo>=</mo><msqrt><mrow><mn>30</mn></mrow></msqrt></mrow></math>';
  var speech = 'the square root of 3, the square root of 10, equals, the square root of 30';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes099
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes099 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></math>';
  var speech = '2, the square root of 3';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes100
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes100 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>1</mn><mo>+</mo><mn>2</mn><msqrt><mn>3</mn></msqrt></mrow></math>';
  var speech = '1, plus, 2, the square root of';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes101
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes101 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_NoneAndFunctions_Auto';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn></msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of x equals x squared, open paren, x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes102
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes102 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None(Functions Preference None is also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn></msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f, open paren, x, close paren, x, close paren equals x squared, open paren, x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes103
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes103 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>sin</mi><mi>x</mi><mi>cos</mi><mi>y</mi><mo>+</mo><mi>cos</mi><mi>x</mi><mi>sin</mi><mi>y</mi></mrow></math>';
  var speech = 'sine x cosine y plus cosine x sine y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes104
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes104 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><msub><mrow><mi>log</mi></mrow><mrow><mn>10</mn></mrow></msub><mi>x</mi><mi>y</mi></mrow></math>';
  var speech = 'the log base 10 of xy';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes105
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes105 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mo>=</mo><mi>log</mi><mi>x</mi><mi>log</mi><mi>y</mi></mrow></math>';
  var speech = 'the Log of open paren, x plus y, close paren, equals, log x log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes106
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes106 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>7</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The 2 by 2 matrix, row 1, 1, 3, row 2 5, 2. The 2 by 2 matrix, row 1, 7, 4, row 2, 0, 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes107
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes107 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, open paren, 3, open paren, open paren, 4 plus 5, close paren, plus 6, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes108
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes108 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None(Paren Preference SpeakNestingLevel also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, open paren, 3, open second paren, open third paren, 4 plus 5, close third paren, plus 6, close second paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes109
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes109 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, open bracket, 3, open paren, open paren, 4 plus 5, close paren, plus 6, close paren, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes110
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes110 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None(Paren Preference SpeakNestingLevel also set)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, open bracket, 3, open paren, open second paren, 4 plus 5, close second paren, plus 6, close paren, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes111
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes111 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow></mrow></math>';
  var speech = '2 the absolute value of x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes112
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes112 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>|</mo><mi>x</mi><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow></mrow></math>';
  var speech = 'the absolute value of x, the absolute value of y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes113
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes113 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mrow><mi>y</mi><mo>−</mo><mn>1</mn></mrow><mo>|</mo></mrow></mrow></math>';
  var speech = 'the absolute value of x plus 1, the absolute value of y minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimes114
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimes114 = function() {
  var preference = 'ImpliedTimes_None';
  var mathml = '<math><mrow><mrow><mo>|</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>|</mo></mrow><mrow><mo>|</mo><mi>y</mi><mo>|</mo></mrow><mo>−</mo><mn>1</mn></mrow></math>';
  var speech = 'the absolute value of x plus 1, the absolute value of y, minus 1';
  this.executeRuleTest(mathml, speech, preference);
};


//
// No Implied Times and Silent Parenthesis Preferences both set
//


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar001
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar001 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2, open paren, 3, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar002
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar002 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mn>3</mn><mo>]</mo></mrow></mrow></math>';
  var speech = '2, open bracket, 3, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar003
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar003 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msup><mn>2</mn><mn>4</mn></msup><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '2 to the 4th power, open paren, three, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar004
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar004 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, open paren, 3 plus 4, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar005
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar005 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, open bracket, 3 plus 4, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar006
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar006 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mrow><mo>(</mo><mn>3</mn><mo>)</mo></mrow><mrow><mo>(</mo><mn>2</mn><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, 3, close paren, open paren, 2 close paren,';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar007
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar007 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>2</mn><msup><mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>4</mn></mrow><mo>)</mo></mrow></mrow><mn>2</mn></msup></mrow></math>';
  var speech = '2, open paren, 3 plus 4, close paren squared';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar008
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar008 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mn>2</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mn>3</mn><mo>−</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'open paren, 2 plus 7, close paren, open paren, 3 minus 6, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar009
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar009 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mrow><mo>[</mo><mrow><mn>2</mn><mo>+</mo><mn>7</mn></mrow><mo>]</mo></mrow><mrow><mo>[</mo><mrow><mn>3</mn><mo>−</mo><mn>6</mn></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = 'open bracket, 2 plus 7, close bracket, open bracket, 3 minus 6, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar010
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar010 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x, open paren, y z, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar011
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar011 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mrow><mi>y</mi><mo>+</mo><mi>z</mi></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'x, open paren, y plus z, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar012
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar012 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mi>y</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, open paren, y plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar013
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar013 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mo stretchy="false">(</mo><mn>2</mn><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo><mi>x</mi></mrow></math>';
  var speech = 'open paren, 2 minus 1, close paren, x';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar014
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar014 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msub><mi>p</mi><mn>1</mn></msub><mrow><mo>(</mo><mrow><mn>3</mn><mo>+</mo><mn>7</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'p sub 1, open paren, 3 plus 7, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar015
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar015 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo><mn>4</mn></mrow></msup><msup><mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>−</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow><mrow><mo>−</mo><mn>4</mn></mrow></msup></mrow></math>';
  var speech = 'open paren, x plus y, close paren, to the negative 4 power open paren, x minus y, close paren, to the negative 4 power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar016
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar016 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><msup><mn>2</mn><mrow><mn>4</mn><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow></mrow></msup></mrow></math>';
  var speech = '2 raised to the 4, open paren, x plus y, close paren, power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar017
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar017 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn></msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f of x equals x squared, open paren, x plus 1, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar018
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar018 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_NoneandParen_SilentAndFunctions_None';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><msup><mi>x</mi><mn>2</mn></msup><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>1</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'f, open paren, x, close paren, equals, x squared, open paren, x plus 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar019
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar019 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>log</mi><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mi>y</mi></mrow><mo>)</mo></mrow><mo>=</mo><mi>log</mi><mi>x</mi><mi>log</mi><mi>y</mi></mrow></math>';
  var speech = 'the log of, open paren, x plus y, close paren, equals, log x log y';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar020
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar020 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>1</mn></mtd><mtd><mn>3</mn></mtd></mtr><mtr><mtd><mn>5</mn></mtd><mtd><mn>2</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mtable><mtr><mtd><mn>7</mn></mtd><mtd><mn>4</mn></mtd></mtr><mtr><mtd><mn>0</mn></mtd><mtd><mn>1</mn></mtd></mtr></mtable></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'The 2 by 2 matrix, row 1, 1, 3, row 2, 5, 2. The 2 by 2 matrix, row 1, 7, 4, row 2, 0, 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar021
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar021 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, open paren, 3, open paren, open paren, 4 plus 5, close paren, plus 6, close paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar022
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar022 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_SpeakNesstingLevel';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>(</mo><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = '2, open paren, 3, open second paren, open third paren, 4 plus 5, close third paren, plus 6, close second paren, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar023
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar023 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_Silent';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, open bracket, 3, open paren, open paren, 4 plus 5, close paren, plus 6, close paren, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example ImpTimesSilPar024
 */
sre.ClearspeakImpliedTimes.prototype.untestImpTimesSilPar024 = function() {
  var preference = 'ImpliedTimes_ImpliedTimes_None and Paren_SpeakNestingLevel';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>2</mn><mrow><mo>[</mo><mrow><mn>3</mn><mrow><mo>(</mo><mrow><mrow><mo>(</mo><mrow><mn>4</mn><mo>+</mo><mn>5</mn></mrow><mo>)</mo></mrow><mo>+</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow><mo>]</mo></mrow></mrow></math>';
  var speech = '2, open bracket, 3, open paren, open second paren, 4 plus 5, close second paren, plus 6, close paren, close bracket';
  this.executeRuleTest(mathml, speech, preference);
};


//
// Implied Times, Functions, or Something Else
//


/**
 * Testing ClearspeakImpliedTimes Example Extra001
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra001 = function() {
  var preference = 'ImpliedTimes_Rules (All Preferences have been cleared)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>A</mi><mo>=</mo><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mrow><msub><mi>b</mi><mn>1</mn></msub><mo>+</mo><msub><mi>b</mi><mn>2</mn></msub></mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'a , equals, h of, open paren, b sub 1 + b sub 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example Extra002
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra002 = function() {
  var preference = 'ImpliedTimes_Functions Preference None has been set';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>A</mi><mo>=</mo><mi>h</mi><mrow><mo>(</mo><mrow><mfrac><mrow><msub><mi>b</mi><mn>1</mn></msub><mo>+</mo><msub><mi>b</mi><mn>2</mn></msub></mrow><mn>2</mn></mfrac></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'a , equals, h times, open paren, b sub 1 + b sub 2, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example Extra003
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra003 = function() {
  var preference = 'ImpliedTimes_Rules (All Preferences have been cleared)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mn>0</mn><mo>)</mo></mrow><mo>=</mo><mn>0</mn><mrow><mo>(</mo><mi>a</mi><mo>)</mo></mrow><mo>=</mo><mn>0</mn></mrow></math>';
  var speech = 'A of z, equals, 0 times a equals 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example Extra004
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra004 = function() {
  var preference = 'ImpliedTimes_Functions Preference None is set';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mn>0</mn><mo>)</mo></mrow><mo>=</mo><mn>0</mn><mrow><mo>(</mo><mi>a</mi><mo>)</mo></mrow><mo>=</mo><mn>0</mn></mrow></math>';
  var speech = 'A times 0 equals 0 times a equals 0';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example Extra005
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra005 = function() {
  var preference = 'ImpliedTimes_Rules (All Preferences have been cleared)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>=</mo><mo>−</mo><mi>a</mi></mrow></math>';
  var speech = 'a times negative 1 , equals, negative a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example Extra006
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra006 = function() {
  var preference = 'ImpliedTimes_Rules (All Preferences have been cleared)withExact Speech (space inserted between a and and exact speech “of” inserted there)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mrow><mo>−</mo><mn>1</mn></mrow><mo>)</mo></mrow><mo>=</mo><mo>−</mo><mi>a</mi></mrow></math>';
  var speech = 'a of negative 1, equals, negative a';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example Extra007
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra007 = function() {
  var preference = 'ImpliedTimes_Rules (All Preferences have been cleared)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mrow><mi>b</mi><mi>c</mi></mrow><mo>)</mo></mrow><mo>=</mo><mrow><mo>(</mo><mrow><mi>a</mi><mi>b</mi></mrow><mo>)</mo></mrow><mi>c</mi></mrow></math>';
  var speech = 'a times bc, equals, ab times c';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example Extra008
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra008 = function() {
  var preference = 'ImpliedTimes_Rules (All Preferences have been cleared)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>a</mi><mrow><mo>(</mo><mrow><mfrac><mn>1</mn><mi>a</mi></mfrac></mrow><mo>)</mo></mrow><mo>=</mo><mn>1</mn></mrow></math>';
  var speech = 'a times, open paren, 1 over a, close paren, equals, 1';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example Extra009
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra009 = function() {
  var preference = 'ImpliedTimes_Rules (All Preferences have been cleared)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math style="background-color:#"> <semantics>  <mrow>   <mo>−</mo><mi>u</mi><mrow><mo>(</mo>    <mi>v</mi>   <mo>)</mo></mrow><mo>=</mo><mi>u</mi><mrow><mo>(</mo>    <mrow>     <mo>−</mo><mi>v</mi></mrow>   <mo>)</mo></mrow><mo>=</mo><mo>−</mo><mrow><mo>(</mo>    <mrow>     <mi>u</mi><mi>v</mi></mrow>   <mo>)</mo></mrow></mrow>   </semantics></math>';
  var speech = 'Negative u times v , equals, u times negative v, equals, negative uv';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example Extra010
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra010 = function() {
  var preference = 'ImpliedTimes_Rules (All Preferences have been cleared)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>B</mi><mrow><mo>(</mo><mrow><mn>2</mn><mo>,</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'b of, open paren 2 comma 6, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example Extra012
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra012 = function() {
  var preference = 'ImpliedTimes_Functions Preference None is set';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>B</mi><mrow><mo>(</mo><mrow><mn>2</mn><mo>,</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'b, times, open paren 2 comma 6, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example Extra013
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra013 = function() {
  var preference = 'ImpliedTimes_Rules (All Preferences have been cleared) withExact Speech(exact speech “point B” has been inserted for B)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>B</mi><mrow><mo>(</mo><mrow><mn>2</mn><mo>,</mo><mn>6</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'point B, open paren, 2 comma 6, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example Extra014
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra014 = function() {
  var preference = 'ImpliedTimes_Rules (All Preferences have been cleared)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>p</mi><mrow><mo>(</mo><mi>w</mi><mo>)</mo></mrow></mrow></math>';
  var speech = 'p of w';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example Extra015
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra015 = function() {
  var preference = 'ImpliedTimes_Rules (All Preferences have been cleared)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>x</mi><mrow><mo>(</mo><mi>t</mi><mo>)</mo></mrow><mo>=</mo><mn>2</mn><mi>t</mi><mo>+</mo><mn>4</mn></mrow></math>';
  var speech = 'x of t, equals, 2t plus 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example Extra016
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra016 = function() {
  var preference = 'ImpliedTimes_Rules (All Preferences have been cleared)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>k</mi><mrow><mo>(</mo><mi>x</mi><mo>)</mo></mrow><mo>=</mo><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><mn>3</mn></mrow><mo>)</mo></mrow><mrow><mo>(</mo><mrow><mi>x</mi><mo>−</mo><mn>5</mn></mrow><mo>)</mo></mrow></mrow></math>';
  var speech = 'k of x, equals, open paren, x plus 3, close paren, times, open paren, x minus 5, close paren';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example Extra017
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra017 = function() {
  var preference = 'ImpliedTimes_Rules (All Preferences have been cleared)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mn>3</mn><msup><mi>a</mi><mn>2</mn></msup><mo>−</mo><mn>12</mn><mi>a</mi><mo>=</mo><mn>3</mn><mi>a</mi><mrow><mo>(</mo><mi>a</mi><mo>)</mo></mrow><mo>−</mo><mn>3</mn><mi>a</mi><mrow><mo>(</mo><mn>4</mn><mo>)</mo></mrow></mrow></math>';
  var speech = '3 s squared minus 12 a, equals, 3a , times a, minus 3a, times 4';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example Extra018
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra018 = function() {
  var preference = 'ImpliedTimes_Rules (All Preferences have been cleared)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>T</mi><mrow><mo>(</mo><mi>t</mi><mo>)</mo></mrow><mo>=</mo><msub><mi>T</mi><mi>s</mi></msub><mo>+</mo><mrow><mo>(</mo><mrow><msub><mi>T</mi><mn>0</mn></msub><mo>−</mo><msub><mi>T</mi><mi>s</mi></msub></mrow><mo>)</mo></mrow><msup><mi>e</mi><mrow><mo>−</mo><mi>k</mi><mi>t</mi></mrow></msup></mrow></math>';
  var speech = 't of t, equals, T sub s, plus, open paren, T sub 0 minus T sub s, close paren, times, e raised to the negative kt power';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example Extra019
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra019 = function() {
  var preference = 'ImpliedTimes_Rules (All Preferences have been cleared)';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>V</mi><mo>=</mo><mi mathvariant="script">l</mi><mi>w</mi><mrow><mo>(</mo><mn>8</mn><mo>)</mo></mrow></mrow></math>';
  var speech = 'v, equals, script L, w, times 8';
  this.executeRuleTest(mathml, speech, preference);
};


/**
 * Testing ClearspeakImpliedTimes Example Extra020
 */
sre.ClearspeakImpliedTimes.prototype.untestExtra020 = function() {
  var preference = 'ImpliedTimes_Rules (All Preferences have been cleared) withExact Speech(exact speech “el” has been inserted for )';  // TODO (sorge): Sort out preferences!
  var mathml = '<math><mrow><mi>V</mi><mo>=</mo><mi mathvariant="script">l</mi><mi>w</mi><mrow><mo>(</mo><mn>8</mn><mo>)</mo></mrow></mrow></math>';
  var speech = 'v, equals, L w, times 8';
  this.executeRuleTest(mathml, speech, preference);
};