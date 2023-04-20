import { LANGUAGE_INDEX, LANGUAGE_DATA } from "../modules/languages.js";

(() => {

    const playersEffectFetched = JSON.parse(localStorage.getItem('customizeEffect')) == null ? null : JSON.parse(localStorage.getItem('customizeEffect'))[0];

    document.getElementsByTagName('body')[0].style.backgroundImage = 'none';

    // Το κέντρο που κρατάει τα πάντα
    let mainBox = document.createElement('div');
    mainBox.className = 'mainBox';
    mainBox.style.display = 'block';
    mainBox.style.border = '3px dotted darkgreen';

    // Τίτλος Ιστοσελίδας.
    let websiteHeader = document.createElement('h1');
    websiteHeader.appendChild(document.createTextNode(LANGUAGE_DATA[LANGUAGE_INDEX].title_settings_page));
    mainBox.appendChild(websiteHeader);

    // Τα "εργαλεία" που μπορεί να χρησιμοποιεί ο παίχτης.
    let customizeBox = document.createElement('div');
    customizeBox.style.width = '100%';
    customizeBox.style.alignItems = 'center';
    customizeBox.style.textAlign = 'center';
    customizeBox.style.justifyContent = 'center';
    customizeBox.style.height = 'auto'; // για να λειτουργεί και σε κινητά τηλέφωνα
    customizeBox.style.display = 'inline-flex';

    // Ψεύτικη κάρτα για να βλέπει ο χρήστης το πώς φαίνεται το νέο στυλ
    let previewCard = document.createElement('div');
    previewCard.className = 'card';
    previewCard.style.transition = 'none';
    previewCard.style.pointerEvents = 'none';
    previewCard.appendChild(document.createTextNode('A'));
    previewCard.style.background = 'grey';

    customizeBox.appendChild(previewCard);

    // ------------------------------------------------------------------------
    // Εργαλεία και ρυθμίσεις για τον χρήστη.
    // ------------------------------------------------------------------------
    let toolsBox = document.createElement('div');

    const toolsConfig = [
        {
            name: LANGUAGE_DATA[LANGUAGE_INDEX].setting_label_neonCard,
            id: "neonCard",
            type: 'checkbox',
            setup: (checked) => {
                if (checked) {
                    previewCard.style.borderColor = previewCard.style.background;
                    previewCard.style.borderStyle = 'solid';
                    previewCard.style.borderWidth = '5px';
                    previewCard.style.background = 'none';
                }

                else {
                    previewCard.style.background = previewCard.style.borderColor;
                    previewCard.style.border = 'none';
                }
            }
        },

        {
            name: "Light Mode",
            id: "improvedGraphics",
            type: 'checkbox',
            setup: (checked) => {
                if (checked) {
                    document.getElementsByTagName('body').style.backgroundColor = 'white';
                    previewCard.style.boxShadow = 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px';
                }

                else {
                    document.getElementsByTagName('body').style.backgroundColor = 'black';
                    previewCard.style.boxShadow = 'none';
                }
            }
        },

        {
            name: LANGUAGE_DATA[LANGUAGE_INDEX].setting_label_cardShape,
            id: "cardShape",
            type: 'range',
            min: 0,
            max: 100,
            setup: (value) => {
                previewCard.style.borderRadius = value;
            }
        },

        {
            name: LANGUAGE_DATA[LANGUAGE_INDEX].setting_label_cardOutsideShape,
            id: "cardOutsideShape",
            type: 'select',
            optionSetup: [
                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].square,
                    value: JSON.stringify(['150px', '150px'])
                },

                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].rectangle_horizontal,
                    value: JSON.stringify(['250px', '150px'])
                },

                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].rectangle_vertical,
                    value: JSON.stringify(['150px', '250px'])
                },

                {
                    name: 'B I G',
                    value: JSON.stringify(['300px', '300px'])
                },
            ],
            setup: (value) => {
                previewCard.style.width = JSON.parse(value)[0];
                previewCard.style.height = JSON.parse(value)[1];
            }
        },

        {
            name: LANGUAGE_DATA[LANGUAGE_INDEX].setting_label_fontSize,
            id: "cardTextSize",
            type: 'range',
            min: 40,
            max: 100,
            setup: (value) => {
                previewCard.style.fontSize = value;
            }
        },

        {
            name: LANGUAGE_DATA[LANGUAGE_INDEX].setting_label_cardTextDecorationThicc,
            id: "cardTextDecorationThicc",
            type: 'range',
            min: 1,
            max: 15,
            setup: (value) => {
                previewCard.style.textDecorationThickness = value;
            }
        },

        {
            name: LANGUAGE_DATA[LANGUAGE_INDEX].setting_label_cardTextDecoration,
            id: "cardTextDecoration",
            type: 'select',
            optionSetup: [
                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].none,
                    value: 'none'
                },

                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].overline,
                    value: 'overline'
                },

                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].underline,
                    value: 'underline'
                },

                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].line_through,
                    value: 'line-through'
                },

                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].overline_and_underline,
                    value: 'overline underline'
                },
            ],
            setup: (value) => {
                previewCard.style.textDecorationLine = value;
                previewCard.style.textDecorationThickness = `${document.getElementById('cardTextDecorationThicc').value}px`;
            }
        },

        {
            name: LANGUAGE_DATA[LANGUAGE_INDEX].setting_label_cardTextDecorationLine,
            id: "cardTextDecorationLine",
            type: 'select',
            optionSetup: [
                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].default,
                    value: 'solid'
                },

                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].dashed,
                    value: 'dashed'
                },

                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].dotted,
                    value: 'dotted'
                },

                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].wavy,
                    value: 'wavy'
                },

                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].double,
                    value: 'double'
                }
            ],
            setup: (value) => {
                previewCard.style.textDecorationStyle = value;
            }
        },

        {
            name: LANGUAGE_DATA[LANGUAGE_INDEX].setting_label_cardTextFontFamily,
            id: "cardTextFontFamily",
            type: 'select',
            optionSetup: [
                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].default,
                    value: 'sans-serif'
                },

                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].old,
                    value: 'serif'
                },

                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].fantasy,
                    value: 'φανταστικό'
                },

                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].scientific,
                    value: 'monospace'
                },

                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].ancient,
                    value: 'αρχαίο'
                },

                {
                    name: LANGUAGE_DATA[LANGUAGE_INDEX].weird,
                    value: 'παράξενο'
                },

                {
                    name: 'Cartoon',
                    value: 'cartoon'
                }
            ],
            setup: (value) => {
                previewCard.style.fontFamily = value;
            }
        },

        {
            name: LANGUAGE_DATA[LANGUAGE_INDEX].setting_label_musicType,
            id: "musicType",
            type: 'select',
            optionSetup: [
                {
                    name: `${LANGUAGE_DATA[LANGUAGE_INDEX].default} (Petercraft)`,
                    value: 'normal'
                },

                {
                    name: `${LANGUAGE_DATA[LANGUAGE_INDEX].old} (OG) (Soundimage.org)`,
                    value: 'OG'
                }
            ],
            setup: () => { }
        },

        {
            name: LANGUAGE_DATA[LANGUAGE_INDEX].setting_label_language,
            id: "language",
            type: 'select',
            optionSetup: [
                {
                    name: 'Ελληνικά (Greek)',
                    value: 0
                },

                {
                    name: 'Αγγλικά (English)',
                    value: 1
                }
            ],
            setup: (languageIndexVal) => LANGUAGE_INDEX = languageIndexVal
        }
    ];

    // Δημιουργεία της κάθε ρύθμισης
    toolsConfig.forEach(toolSetting => {
        let settingWrapper = document.createElement('div');
        settingWrapper.style.display = 'block';

        let settingHolder = document.createElement('div');
        settingHolder.style.display = 'inline-flex';

        let inputFieldLabel = document.createElement('label');
        inputFieldLabel.htmlFor = toolSetting.id;
        inputFieldLabel.appendChild(document.createTextNode(toolSetting.name));
        inputFieldLabel.style.fontSize = '15px';
        settingHolder.appendChild(inputFieldLabel);

        switch (toolSetting.type) {

            case 'checkbox': {
                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = toolSetting.id;
                checkbox.setAttribute('draggable', 'false');
                checkbox.onclick = () => {
                    toolSetting.setup(checkbox.checked);
                };

                settingHolder.appendChild(checkbox);

                if (toolSetting.id == 'improvedGraphics') {
                    let warnTip = document.createElement('span'),
                        warnTipDesc = document.createElement('span');

                    warnTip.className = "warntip";
                    warnTipDesc.appendChild(document.createTextNode(LANGUAGE_DATA[LANGUAGE_INDEX].light_mode_warning));
                    warnTipDesc.id = "warntipDesc";
                    warnTip.appendChild(warnTipDesc);
                    settingHolder.appendChild(warnTip);
                }
            }
                break;

            case 'range': {
                let inputField = document.createElement('input');
                inputField.type = 'range';
                inputField.max = toolSetting.max;
                inputField.min = toolSetting.min;
                inputField.id = toolSetting.id;
                inputField.setAttribute('draggable', 'false');
                inputField.addEventListener('input', () => {
                    toolSetting.setup(`${inputField.value}px`);
                });

                settingHolder.appendChild(inputField);
            }
                break;

            case 'select': {
                let selectField = document.createElement('select');
                selectField.id = toolSetting.id;

                const optionsConfig = toolSetting.optionSetup;

                optionsConfig.forEach(optionSetting => {
                    let option = document.createElement('option');
                    option.value = optionSetting.value;
                    option.text = optionSetting.name;

                    selectField.appendChild(option);
                });

                selectField.onchange = () => {
                    toolSetting.setup(selectField.value);
                }

                settingHolder.appendChild(selectField);
            }
                break;

        } // end of switch

        // Βάλε κενό ανάμεσα στα γράμματα και το slider
        for (var childIndex = 0; childIndex < settingHolder.children.length; childIndex++) {
            settingHolder.children[childIndex].style.margin = `${settingHolder.children[childIndex].className != 'warntip' ? 5 : 7}px`;
        }

        settingWrapper.appendChild(settingHolder);
        toolsBox.appendChild(settingWrapper);
    });

    // Λίγο ακόμα..


    customizeBox.appendChild(toolsBox);
    // ------------------------------------------------------------------------

    mainBox.appendChild(customizeBox);

    // Το κουμπί
    let saveButton = document.createElement('button');
    saveButton.appendChild(document.createTextNode('Save'));
    saveButton.style.marginTop = '50px';
    saveButton.style.marginBottom = '50px';
    saveButton.onclick = () => {
        new Audio('../audio/click.mp3').play();
        const effect = [{
            neonMode: document.getElementById("neonCard").checked,
            widthAndHeight: document.getElementById("cardOutsideShape").value,
            borderRadius: `${document.getElementById('cardShape').value}px`,
            fontSize: `${document.getElementById('cardTextSize').value}px`,
            textDecorationThickness: `${document.getElementById('cardTextDecorationThicc').value}px`,
            textDecorationLine: document.getElementById('cardTextDecoration').value,
            textDecorationStyle: document.getElementById('cardTextDecorationLine').value,
            fontFamily: document.getElementById('cardTextFontFamily').value,
            musicType: document.getElementById('musicType').value,
            improvedGraphics: document.getElementById("improvedGraphics").checked,
            languageID: document.getElementById("language").value
        }]
        localStorage.setItem('customizeEffect', JSON.stringify(effect));
        window.location.href = '/';
    }
    mainBox.appendChild(saveButton);

    // Αφού τελείωσες, ενσωμάτωσέ το στο σώμα της ιστοσελίδας (<body>)
    document.body.appendChild(mainBox);

    // Φόρτωσε τα default εφέ
    if (playersEffectFetched) {
        document.getElementById('cardShape').value = playersEffectFetched.borderRadius;
        document.getElementById('cardTextSize').value = playersEffectFetched.fontSize;
        document.getElementById('neonCard').checked = playersEffectFetched.neonMode;
        document.getElementById('cardTextDecorationThicc').value = playersEffectFetched.textDecorationThickness;
        document.getElementById('cardTextDecoration').value = playersEffectFetched.textDecorationLine;
        document.getElementById('cardTextDecorationLine').value = playersEffectFetched.textDecorationStyle;
        document.getElementById('cardTextFontFamily').value = playersEffectFetched.fontFamily;
        document.getElementById('musicType').value = playersEffectFetched.musicType;
        document.getElementById("improvedGraphics").checked = playersEffectFetched.improvedGraphics;
        document.getElementById("language").value = playersEffectFetched.languageID;
        document.getElementById("cardOutsideShape").value = playersEffectFetched.widthAndHeight;
    }

    const playersEffect = [{
        neonMode: document.getElementById("neonCard").checked,
        widthAndHeight: document.getElementById("cardOutsideShape").value,
        borderRadius: `${document.getElementById('cardShape').value}px`,
        fontSize: `${document.getElementById('cardTextSize').value}px`,
        textDecorationThickness: `${document.getElementById('cardTextDecorationThicc').value}px`,
        textDecorationLine: document.getElementById('cardTextDecoration').value,
        textDecorationStyle: document.getElementById('cardTextDecorationLine').value,
        fontFamily: document.getElementById('cardTextFontFamily').value,
        musicType: document.getElementById('musicType').value,
        improvedGraphics: document.getElementById("improvedGraphics").checked,
        languageID: document.getElementById("language").value
    }][0]

    previewCard.style.borderRadius = playersEffect.borderRadius;
    previewCard.style.fontSize = playersEffect.fontSize;
    previewCard.style.fontFamily = playersEffect.fontFamily;
    previewCard.style.textDecorationThickness = playersEffect.textDecorationThickness;
    previewCard.style.textDecorationLine = playersEffect.textDecorationLine;
    previewCard.style.textDecorationStyle = playersEffect.textDecorationStyle;
    previewCard.style.width = playersEffect.widthAndHeight[0];
    previewCard.style.height = playersEffect.widthAndHeight[1];

})();
