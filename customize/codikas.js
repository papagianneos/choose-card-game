import { LANGUAGE_INDEX, LANGUAGE_DATA } from "../modules/languages.js";
import { sounds } from "../modules/sounds.js";
import { FETCHED_SKIN_DATA, SKINS_CONFIG } from "../modules/skins.js";

(() => {

    const playersEffectFetched = JSON.parse(localStorage.getItem('customizeEffect')) == null ? null : JSON.parse(localStorage.getItem('customizeEffect'))[0];

    document.getElementsByTagName('body')[0].style.backgroundImage = 'none';

    // Το κέντρο που κρατάει τα πάντα
    let mainBox = document.createElement('div');
    mainBox.className = 'mainBox';
    mainBox.id = 'mainBox';
    mainBox.style.display = 'block';
    mainBox.style.border = '3px dotted darkgreen';

    let mainSkinsBox = document.createElement('div');
    mainSkinsBox.className = 'mainBox';
    mainSkinsBox.id = 'mainSkinsBox';
    mainSkinsBox.style.display = 'none';
    mainSkinsBox.style.border = '3px dotted darkgreen';

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
       /* {
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
        },*/

        {
            name: "Light Mode",
            id: "improvedGraphics",
            type: 'checkbox',
            setup: (checked) => {
                if (checked) {
                    previewCard.style.boxShadow = 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px';
                }

                else {
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
                    name: 'English',
                    value: 1
                },

                {
                    name: 'Deutsch (German)',
                    value: 2
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
        sounds.buttonClick.play();
        const effect = [{
            //neonMode: document.getElementById("neonCard").checked,
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

    let buttonsWrapper = document.createElement('div');

    let deleteDataBtn = document.createElement('button');
    deleteDataBtn.appendChild(document.createTextNode('Clear Data'));
    deleteDataBtn.style.backgroundColor = 'maroon';
    deleteDataBtn.onclick = () => {
        let question = confirm(LANGUAGE_DATA[LANGUAGE_INDEX].delete_data_question);

        if (question) {
            localStorage.clear();
            window.location.reload();
        }
    }

    // --------------------------------------------------------------------------
    // Skins.
    // --------------------------------------------------------------------------
    let websiteHeaderSkins = document.createElement('h1');
    websiteHeaderSkins.appendChild(document.createTextNode('SKINS'));
    mainSkinsBox.appendChild(websiteHeaderSkins);

    // Φτιάξε τα skins για τον χρήστη
    for (var skin of Object.keys(SKINS_CONFIG)) {

        // Bug fix
        if (!SKINS_CONFIG[skin].displayBg) SKINS_CONFIG[skin].displayBg = SKINS_CONFIG[skin].bg;

        // Check for unlock here too
        if (SKINS_CONFIG[skin].locked) {
            let temp_obj = {};
            let index = -1;

            for (var skinIndex = 0; skinIndex < FETCHED_SKIN_DATA.length; skinIndex++) if (FETCHED_SKIN_DATA[skinIndex].id == skin) index = skinIndex;
            for (var i = 0; i < FETCHED_SKIN_DATA.length; i++) temp_obj[skin] = Object.values(FETCHED_SKIN_DATA)[index];

            SKINS_CONFIG[skin].locked = temp_obj[skin].locked;
        }

        let skinSelect = document.createElement('div');
        skinSelect.className = 'skin';
        skinSelect.id = SKINS_CONFIG[skin].id;
        skinSelect.style.background = SKINS_CONFIG[skin].displayBg == 'none' ? 'grey' : SKINS_CONFIG[skin].displayBg;
        skinSelect.style.backgroundSize = 'cover';
        skinSelect.style.backgroundRepeat = 'no-repeat';

        if (SKINS_CONFIG[skin].locked) {
            skinSelect.isLocked = true;
            skinSelect.className += ' locked';
        }

        // Δες αν είναι είδη επιλεγμένο από προηγούμενη φορά.
        if (localStorage.getItem('selectedSkin') == skinSelect.id) {
            skinSelect.style.background = 'green';
            skinSelect.className += ' equipped';
        }

        let skinLabel = document.createElement('span');
        skinLabel.innerHTML = skinSelect.isLocked ? `${SKINS_CONFIG[skin].name}<br><lockedtxt>[${LANGUAGE_DATA[LANGUAGE_INDEX].locked}]</lockedtxt>` : `${SKINS_CONFIG[skin].name}<br>​`;
        skinSelect.appendChild(skinLabel);

        // Επέλεξε το αν γίνει κλικ
        if (!skinSelect.isLocked) skinSelect.onclick = () => {
            sounds.buttonClick.play();
            localStorage.setItem('selectedSkin', skinSelect.id);
            for (var skin_ of document.getElementsByClassName('skin')) {
                if (skin_.className.includes(' equipped')) {
                    skin_.style.background = SKINS_CONFIG[skin_.id].displayBg == 'none' ? 'grey' : SKINS_CONFIG[skin_.id].displayBg;
                    skin_.style.backgroundSize = 'cover';
                    skin_.style.backgroundRepeat = 'no-repeat';
                    skin_.className = 'skin';
                    if (skin_.isLocked) {
                        skin_.className += ' locked';
                    }
                }
            }
            skinSelect.style.background = 'green';
            skinSelect.className += ' equipped';
        }

        mainSkinsBox.appendChild(skinSelect);
    }

    let openSkinsMenuButton = document.createElement('button');
    openSkinsMenuButton.appendChild(document.createTextNode('Skins'));
    openSkinsMenuButton.style.backgroundColor = 'purple';
    openSkinsMenuButton.onclick = () => {
        sounds.buttonClick.play();
        document.getElementById('mainBox').style.display = 'none';
        document.getElementById('mainSkinsBox').style.display = 'block';
    }

    let buttonToReturnBackWrapper = document.createElement('div');

    let buttonToReturnBack = document.createElement('button');
    buttonToReturnBack.appendChild(document.createTextNode('Back'));
    buttonToReturnBack.style.backgroundColor = 'purple';
    buttonToReturnBack.onclick = () => {
        sounds.buttonClick.play();
        document.getElementById('mainBox').style.display = 'block';
        document.getElementById('mainSkinsBox').style.display = 'none';
    }

    buttonToReturnBackWrapper.appendChild(buttonToReturnBack);
    mainSkinsBox.appendChild(buttonToReturnBackWrapper);
    buttonsWrapper.appendChild(openSkinsMenuButton);
    // --------------------------------------------------------------------------

    buttonsWrapper.appendChild(deleteDataBtn);
    buttonsWrapper.appendChild(saveButton);

    mainBox.appendChild(buttonsWrapper);

    // Αφού τελείωσες, ενσωμάτωσέ το στο σώμα της ιστοσελίδας (<body>)
    document.body.appendChild(mainBox);
    document.body.appendChild(mainSkinsBox);

    // Φόρτωσε τα default εφέ
    document.getElementById('cardShape').value = '2.5';
    document.getElementById('cardTextSize').value = '60';
    if (playersEffectFetched) {
        document.getElementById('cardShape').value = playersEffectFetched.borderRadius.replace('px', '');
        document.getElementById('cardTextSize').value = playersEffectFetched.fontSize;
        //document.getElementById('neonCard').checked = playersEffectFetched.neonMode;
        document.getElementById('cardTextDecorationThicc').value = playersEffectFetched.textDecorationThickness;
        document.getElementById('cardTextDecoration').value = playersEffectFetched.textDecorationLine;
        document.getElementById('cardTextDecorationLine').value = playersEffectFetched.textDecorationStyle;
        document.getElementById('cardTextFontFamily').value = playersEffectFetched.fontFamily;
        document.getElementById('musicType').value = playersEffectFetched.musicType;
        document.getElementById("improvedGraphics").checked = playersEffectFetched.improvedGraphics;
        document.getElementById("language").value = playersEffectFetched.languageID;
        document.getElementById("cardOutsideShape").value = playersEffectFetched.widthAndHeight;

        /*if (playersEffectFetched.neonMode) {
            previewCard.style.borderColor = 'grey';
            previewCard.style.borderStyle = 'solid';
            previewCard.style.borderWidth = '5px';
            previewCard.style.background = 'none';
        }
        else {
            previewCard.style.borderColor = 'none';
            previewCard.style.background = 'grey';
        }*/

        previewCard.style.width = JSON.parse(playersEffectFetched.widthAndHeight)[0];
        previewCard.style.height = JSON.parse(playersEffectFetched.widthAndHeight)[1];
    }

    const playersEffect = [{
       //neonMode: document.getElementById("neonCard").checked,
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
