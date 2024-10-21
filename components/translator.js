const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');
const britishToAmericanTitles = require('./british-to-american-titles.js');
const spanBefore = '<span class="highlight">';
const spanAfter = '</span>';

class Translator {

  translate(text, locale) {
    let translatedText;

    if (locale === "american-to-british") {
      translatedText = this.americanToBritish(text);

    } else {
      translatedText = this.britishToAmerican(text);

    }

    return translatedText;

  }

  americanToBritish(text) {
    let textArray = text.split(" ");

    // remove extra spacing from textArray
    let index = textArray.indexOf("");
    while (index > -1) {
      textArray.splice(index, 1);
      index = textArray.indexOf("");
    }

    let word;
    let title;
    let translatedWord;
    let isLastWordWithPeriod = false;

    // remove the period from the end of the text if exists
    if (/\.$/.test(textArray[textArray.length - 1])) {
      isLastWordWithPeriod = true;
      textArray[textArray.length - 1] = textArray[textArray.length - 1].slice(0, -1);
    }

    for (let i = 0; i < textArray.length; i++) {
      word = textArray[i];

      // word is time
      if (/^\d\d?:\d\d?$/.test(word)) {
        const [hours, mins] = word.split(":");
        textArray[i] = spanBefore + hours + "." + mins + spanAfter;

      // word is a title
      } else if (word === 'Mr.'  ||
                 word === 'Mrs.' ||
                 word === 'Ms.'  ||
                 word === 'Mx.'  ||
                 word === 'Dr.'  ||
                 word === 'Prof.') {

        title = americanToBritishTitles[word.toLowerCase()];
        if (title) {
          if (/^[A-Z]/.test(word)) {
            title = title.charAt(0).toUpperCase() + title.slice(1);
          }
          textArray[i] = spanBefore + title + spanAfter;

        }

      // check dictionaries
      } else {
        translatedWord = americanToBritishSpelling[word.toLowerCase()];

        if (translatedWord) {
          if (/^[A-Z]/.test(word)) {
            translatedWord = translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
          }
          textArray[i] = spanBefore + translatedWord + spanAfter;

        } else {
          translatedWord = americanOnly[word.toLowerCase()];
          if (translatedWord) {
            if (/^[A-Z]/.test(word)) {
              translatedWord = translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
            }
            textArray[i] = spanBefore + translatedWord + spanAfter;
            
          }
        }
      }

    }  // for (let i = 0; i < textArray.length; i++) {

    textArray = this.americanToBritishDeepTranslation(textArray);

    if (isLastWordWithPeriod) {
        return textArray.join(" ") + ".";
      } else {
        return textArray.join(" ");
      }

  }

  britishToAmerican(text) {
    let textArray = text.split(" ");
    let britishToAmericanSpelling = {};
    Object.keys(americanToBritishSpelling)
      .forEach((key) => {
        britishToAmericanSpelling[americanToBritishSpelling[key]] = key;
    });

    // remove extra spacing from textArray
    let index = textArray.indexOf("");
    while (index > -1) {
      textArray.splice(index, 1);
      index = textArray.indexOf("");
    }

    let word;
    let title;
    let translatedWord;
    let isLastWordWithPeriod = false;

    // remove the period from the end of the text if exists
    if (/\.$/.test(textArray[textArray.length - 1])) {
      isLastWordWithPeriod = true;
      textArray[textArray.length - 1] = textArray[textArray.length - 1].slice(0, -1);
    }

    for (let i = 0; i < textArray.length; i++) {
      word = textArray[i];

      // word is time
      if (/^\d\d?\.\d\d?$/.test(word)) {
        const [hours, mins] = word.split(".");
        textArray[i] = spanBefore + hours + ":" + mins + spanAfter;

      // word is a title
      } else if (word === 'Mr'  ||
                 word === 'Mrs' ||
                 word === 'Ms'  ||
                 word === 'Mx'  ||
                 word === 'Dr'  ||
                 word === 'Prof') {

        title = britishToAmericanTitles[word.toLowerCase()];
        if (title) {
          if (/^[A-Z]/.test(word)) {
            title = title.charAt(0).toUpperCase() + title.slice(1);
          }
          textArray[i] = spanBefore + title + spanAfter;

        }

      // check dictionaries
      } else {
        translatedWord = britishToAmericanSpelling[word.toLowerCase()];

        if (translatedWord) {
          if (/^[A-Z]/.test(word)) {
            translatedWord = translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
          }
          textArray[i] = spanBefore + translatedWord + spanAfter;

        } else {
          translatedWord = britishOnly[word.toLowerCase()];
          if (translatedWord) {
            if (/^[A-Z]/.test(word)) {
              translatedWord = translatedWord.charAt(0).toUpperCase() + translatedWord.slice(1);
            }
            textArray[i] = spanBefore + translatedWord + spanAfter;
            
          }
        }
      }

    }  // for (let i = 0; i < textArray.length; i++) {

    textArray = this.britishToAmericanDeepTranslation(textArray);

    if (isLastWordWithPeriod) {
        return textArray.join(" ") + ".";
      } else {
        return textArray.join(" ");
      }


  }

  americanToBritishDeepTranslation(textArray) {
    let i = 0;
    let phrase;
    let translatedPhrase = null;
    let translatedArray = [];

    while (i < textArray.length -2) {

      if (textArray[i + 2]) {
        phrase = textArray[i] + " " + textArray[i + 1] + " " + textArray[i + 2];
  
        translatedPhrase = americanOnly[phrase.toLowerCase()];
        if (translatedPhrase) {
          translatedArray = translatedPhrase.split(" ");
  
          if (/^[A-Z]/.test(textArray[i])) {
            translatedArray[0] = translatedArray[0].charAt(0).toUpperCase() + translatedArray[0].slice(1);
          }
          if (/^[A-Z]/.test(textArray[i + 1]) && translatedArray[1]) {
            translatedArray[1] = translatedArray[1].charAt(0).toUpperCase() + translatedArray[1].slice(1);
          }
          if (/^[A-Z]/.test(textArray[i + 2]) && translatedArray[2]) {
            translatedArray[2] = translatedArray[2].charAt(0).toUpperCase() + translatedArray[2].slice(1);
          }
  
          if (translatedArray.length === 3) {
            textArray[i] = spanBefore + translatedArray[0];
            textArray[i + 1] = translatedArray[1];
            textArray[i + 2] = translatedArray[2] + spanAfter;
          } else if (translatedArray.length === 2) {
            textArray[i] = spanBefore + translatedArray[0]
            textArray[i + 1] = translatedArray[1] + spanAfter;
            textArray.splice(i + 2, 1);
          } else if (translatedArray.length === 1) {
            textArray[i] = spanBefore + translatedArray[0] + spanAfter;
            textArray.splice(i + 1, 2);
          }
  
        }

      }  // if (textArray[i + 2]) {

      if (! translatedPhrase) {
        phrase = textArray[i] + " " + textArray[i + 1];
  
        translatedPhrase = americanOnly[phrase.toLowerCase()];
        if (translatedPhrase) {
          translatedArray = translatedPhrase.split(" ");
  
          if (/^[A-Z]/.test(textArray[i])) {
            translatedArray[0] = translatedArray[0].charAt(0).toUpperCase() + translatedArray[0].slice(1);
          }
          if (/^[A-Z]/.test(textArray[i + 1]) && translatedArray[1]) {
            translatedArray[1] = translatedArray[1].charAt(0).toUpperCase() + translatedArray[1].slice(1);
           }
  
          if (translatedArray.length === 2) {
            textArray[i] = spanBefore + translatedArray[0];
            textArray[i + 1] = translatedArray[1] + spanAfter;
          } else if (translatedArray.length === 3) {
            textArray[i] = spanBefore + translatedArray[0]
            textArray[i + 1] = translatedArray[1] + " " + translatedArray[2] + spanAfter;
          } else if (translatedArray.length === 1) {
            textArray[i] = spanBefore + translatedArray[0] + spanAfter;
            textArray.splice(i + 1, 1);
          }
  
        }

      }
 
      translatedPhrase = null;
      i++;
  
    }  // while (i < textArray.length -2) {

    return textArray;

  }  // americanToBritishDeepTranslation(textArray) {

  britishToAmericanDeepTranslation(textArray) {
    let i = 0;
    let phrase;
    let translatedPhrase = null;
    let translatedArray = [];

    while (i < textArray.length -2) {

      if (textArray[i + 2]) {
        phrase = textArray[i] + " " + textArray[i + 1] + " " + textArray[i + 2];
    
        translatedPhrase = britishOnly[phrase.toLowerCase()];
        if (translatedPhrase) {
          translatedArray = translatedPhrase.split(" ");
    
          if (/^[A-Z]/.test(textArray[i])) {
            translatedArray[0] = translatedArray[0].charAt(0).toUpperCase() + translatedArray[0].slice(1);
          }
          if (/^[A-Z]/.test(textArray[i + 1]) && translatedArray[1]) {
            translatedArray[1] = translatedArray[1].charAt(0).toUpperCase() + translatedArray[1].slice(1);
          }
          if (/^[A-Z]/.test(textArray[i + 2]) && translatedArray[2]) {
            translatedArray[2] = translatedArray[2].charAt(0).toUpperCase() + translatedArray[2].slice(1);
          }
    
          if (translatedArray.length === 3) {
            textArray[i] = spanBefore + translatedArray[0];
            textArray[i + 1] = translatedArray[1];
            textArray[i + 2] = translatedArray[2] + spanAfter;
          } else if (translatedArray.length === 2) {
            textArray[i] = spanBefore + translatedArray[0]
            textArray[i + 1] = translatedArray[1] + spanAfter;
            textArray.splice(i + 2, 1);
          } else if (translatedArray.length === 1) {
            textArray[i] = spanBefore + translatedArray[0] + spanAfter;
            textArray.splice(i + 1, 2);
          }
    
        }
  
      }  // if (textArray[i + 2]) {
  
      if (! translatedPhrase) {
        phrase = textArray[i] + " " + textArray[i + 1];
    
        translatedPhrase = britishOnly[phrase.toLowerCase()];
        if (translatedPhrase) {
          translatedArray = translatedPhrase.split(" ");
    
          if (/^[A-Z]/.test(textArray[i])) {
            translatedArray[0] = translatedArray[0].charAt(0).toUpperCase() + translatedArray[0].slice(1);
          }
          if (/^[A-Z]/.test(textArray[i + 1]) && translatedArray[1]) {
            translatedArray[1] = translatedArray[1].charAt(0).toUpperCase() + translatedArray[1].slice(1);
          }
    
          if (translatedArray.length === 2) {
            textArray[i] = spanBefore + translatedArray[0];
            textArray[i + 1] = translatedArray[1] + spanAfter;
          } else if (translatedArray.length === 3) {
            textArray[i] = spanBefore + translatedArray[0]
            textArray[i + 1] = translatedArray[1] + " " + translatedArray[2] + spanAfter;
          } else if (translatedArray.length === 1) {
            textArray[i] = spanBefore + translatedArray[0] + spanAfter;
            textArray.splice(i + 1, 1);
          }
    
        }
  
      }
   
      translatedPhrase = null;
      i++;
    
    }  // while (i < textArray.length -2) {

    return textArray;

  }  // britishToAmericanDeepTranslation(textArray) {

}

module.exports = Translator;