const fs = require('fs');

function translate(data) {
    try {
        const englishLang = fs.readFileSync('lib/js/englishLang.json', 'utf8');

        if (!englishLang) {
            // Handle the case when the file is empty
            console.error("The 'englishLang.json' file is empty.");
            return data; // Return the original data
        }

        const enTranslateData = JSON.parse(englishLang);

        let startPos = data.indexOf('##');
        while (startPos !== -1) {
            const endPos = data.indexOf('##', startPos + 1);
            const replacableWord = data.substring(startPos, endPos + 2);
            const replacableWordKey = data.substring(startPos + 2, endPos);
            data = data.replace(
                replacableWord,
                enTranslateData.hasOwnProperty(replacableWordKey)
                    ? enTranslateData[replacableWordKey]
                    : replacableWordKey
            );
            startPos = data.indexOf('##', endPos + 1);
        }
        return data;
    } catch (err) {
        console.error(err);
        // Return the original data in case of an error
        return data;
    }
}

module.exports = translate;
