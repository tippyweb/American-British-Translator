/**
 * #######################################################
 *  American / British English Translator - 2024-10-21
 * #######################################################
 */

'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {

      const text = req.body.text;
      const locale = req.body.locale;

      // one or more required field is missing
      if (text === undefined || locale === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }

      // if text is empty
      if (text === "") {
        return res.json({ error: 'No text to translate' });
      }

      // if locale is invalid
      if (locale !== "american-to-british" &&
          locale !== "british-to-american") {
        return res.json({ error: 'Invalid value for locale field' });
      }

      const translatedText = translator.translate(text, locale);

      // if no translation was needed
      if (text === translatedText) {
        return res.json({
          text: text,
          translation: "Everything looks good to me!"
        });

      // if text was translated
      } else {
        return res.json({
          text: text,
          translation: translatedText
        });
      }

    });
};
