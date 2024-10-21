/**
 * #######################################################
 *  American / British English Translator - 2024-10-21
 * #######################################################
 */

const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {

    test('1. Translate Mangoes are my favorite fruit. to British English', function () {
        assert.include(translator.translate('Mangoes are my favorite fruit.', 'american-to-british'), "favourite");
    });

    test('2. Translate I ate yogurt for breakfast. to British English', function () {
        assert.include(translator.translate('I ate yogurt for breakfast.', 'american-to-british'), "yoghurt");
    });

    test("3. Translate We had a party at my friend's condo. to British English", function () {
        assert.include(translator.translate("We had a party at my friend's condo.", 'american-to-british'), "flat");
    });

    test('4. Translate Can you toss this in the trashcan for me? to British English', function () {
        assert.include(translator.translate('Can you toss this in the trashcan for me?', 'american-to-british'), "bin");
    });

    test('5. Translate The parking lot was full. to British English', function () {
        assert.include(translator.translate('The parking lot was full.', 'american-to-british'), "car park");
    });

    test('6. Translate Like a high tech Rube Goldberg machine. to British English', function () {
        assert.include(translator.translate('Like a high tech Rube Goldberg machine.', 'american-to-british'), "Heath Robinson device");
    });

    test('7. Translate To play hooky means to skip class or work. to British English', function () {
        assert.include(translator.translate('To play hooky means to skip class or work.', 'american-to-british'), "bunk off");
    });

    test('8. Translate No Mr. Bond, I expect you to die. to British English', function () {
        assert.include(translator.translate('No Mr. Bond, I expect you to die.', 'american-to-british'), '<span class="highlight">Mr</span> Bond');
    });

    test('9. Translate Dr. Grosh will see you now. to British English', function () {
        assert.include(translator.translate('Dr. Grosh will see you now.', 'american-to-british'), '<span class="highlight">Dr</span> Grosh');
    });

    test('10. Translate Lunch is at 12:15 today. to British English', function () {
        assert.include(translator.translate('Lunch is at 12:15 today.', 'american-to-british'), "12.15");
    });

    test('11. Translate We watched the footie match for a while. to American English', function () {
        assert.include(translator.translate('We watched the footie match for a while.', 'british-to-american'), "soccer");
    });

    test('12. Translate Paracetamol takes up to an hour to work. to American English', function () {
        assert.include(translator.translate('Paracetamol takes up to an hour to work.', 'british-to-american'), "Tylenol");
    });

    test('13. Translate First, caramelise the onions. to American English', function () {
        assert.include(translator.translate('First, caramelise the onions.', 'british-to-american'), "caramelize");
    });

    test('14. Translate I spent the bank holiday at the funfair. to American English', function () {
        assert.include(translator.translate('I spent the bank holiday at the funfair.', 'british-to-american'), "public holiday");
    });

    test('15. Translate I had a bicky then went to the chippy. to American English', function () {
        assert.include(translator.translate('I had a bicky then went to the chippy.', 'british-to-american'), "fish-and-chip shop");
    });

    test("16. Translate I've just got bits and bobs in my bum bag. to American English", function () {
        assert.include(translator.translate("I've just got bits and bobs in my bum bag.", 'british-to-american'), "odds and ends");
    });

    test('17. Translate The car boot sale at Boxted Airfield was called off. to American English', function () {
        assert.include(translator.translate('The car boot sale at Boxted Airfield was called off.', 'british-to-american'), "swap meet");
    });

    test('18. Translate Have you met Mrs Kalyani? to American English', function () {
        assert.include(translator.translate('Have you met Mrs Kalyani?', 'british-to-american'), "Mrs.");
    });

    test("19. Translate Prof Joyner of King's College, London. to American English", function () {
        assert.include(translator.translate("Prof Joyner of King's College, London.", 'british-to-american'), "Prof.");
    });

    test('20. Translate Tea time is usually around 4 or 4.30. to American English', function () {
        assert.include(translator.translate('Tea time is usually around 4 or 4.30.', 'british-to-american'), "4:30");
    });

    test('21. Highlight translation in Mangoes are my favorite fruit.', function () {
        assert.include(translator.translate('Mangoes are my favorite fruit.', 'american-to-british'), '<span class="highlight">favourite</span>');
    });

    test('22. Highlight translation in I ate yogurt for breakfast.', function () {
        assert.include(translator.translate('I ate yogurt for breakfast.', 'american-to-british'), '<span class="highlight">yoghurt</span>');
    });

    test('23. Highlight translation in We watched the footie match for a while.', function () {
        assert.include(translator.translate('We watched the footie match for a while.', 'british-to-american'), '<span class="highlight">soccer</span>');
    });

    test('24. Highlight translation in Paracetamol takes up to an hour to work.', function () {
        assert.include(translator.translate('Paracetamol takes up to an hour to work.', 'british-to-american'), '<span class="highlight">Tylenol</span>');
    });

});
