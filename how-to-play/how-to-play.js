(() => {
    document.getElementsByTagName('body')[0].style.backgroundImage = 'none';

    // Το κέντρο που κρατάει τα πάντα
    let mainBox = document.createElement('div');
    mainBox.className = 'mainBox';
    mainBox.style.display = 'block';
    mainBox.style.border = '3px dotted darkgreen';

    // Τίτλος Ιστοσελίδας.
    let websiteHeader = document.createElement('h1');
    websiteHeader.appendChild(document.createTextNode('ΣΤΥΛ ΚΑΡΤΑΣ'));
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
            name: "Νέον Κάρτα",
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
            name: "Σχήμα Κάρτας",
            id: "cardShape",
            type: 'range',
            min: 0,
            max: 100,
            setup: (value) => {
                previewCard.style.borderRadius = value;
            }
        },

        {
            name: "Μέγεθος Γραμματοσειράς",
            id: "cardTextSize",
            type: 'range',
            min: 40,
            max: 100,
            setup: (value) => {
                previewCard.style.fontSize = value;
            }
        },

        {
            name: "Μέγεθος Γραμμής",
            id: "cardTextDecorationThicc",
            type: 'range',
            min: 1,
            max: 15,
            setup: (value) => {
                previewCard.style.textDecorationThickness = value;
            }
        },

        {
            name: "Διακόσμηση Γραμματοσειράς (Γραμμή)",
            id: "cardTextDecoration",
            type: 'select',
            optionSetup: [
                {
                    name: 'Τίποτα',
                    value: 'none'
                },

                {
                    name: 'Υπεργράμμιση',
                    value: 'overline'
                },

                {
                    name: 'Υπογράμμιση',
                    value: 'underline'
                },

                {
                    name: 'Γραμμή-μέσω',
                    value: 'line-through'
                },

                {
                    name: 'Πάνω-Κάτω Γραμμή',
                    value: 'overline underline'
                },
            ],
            setup: (value) => {
                previewCard.style.textDecorationLine = value;
                previewCard.style.textDecorationThickness = `${document.getElementById('cardTextDecorationThicc').value}px`;
            }
        },

        {
            name: "Είδος Γραμμής",
            id: "cardTextDecorationLine",
            type: 'select',
            optionSetup: [
                {
                    name: 'Κανονικό',
                    value: 'solid'
                },

                {
                    name: 'Διακεκομμένο',
                    value: 'dashed'
                },

                {
                    name: 'Διάσπαρτο',
                    value: 'dotted'
                },

                {
                    name: 'Κυματιστό',
                    value: 'wavy'
                },

                {
                    name: 'Διπλό',
                    value: 'double'
                }
            ],
            setup: (value) => {
                previewCard.style.textDecorationStyle = value;
            }
        },

        {
            name: "Είδος Γραμματοσειράς",
            id: "cardTextFontFamily",
            type: 'select',
            optionSetup: [
                {
                    name: 'Κανονικό',
                    value: 'sans-serif'
                },

                {
                    name: 'Παλιό',
                    value: 'serif'
                },

                {
                    name: 'Φανταστικό',
                    value: 'φανταστικό'
                },

                {
                    name: 'Επιστημονικό',
                    value: 'monospace'
                },

                {
                    name: 'Αρχαίο',
                    value: 'αρχαίο'
                },

                {
                    name: 'Παράξενο',
                    value: 'παράξενο'
                },

                {
                    name: 'Καρτούν',
                    value: 'cartoon'
                }
            ],
            setup: (value) => {
                previewCard.style.fontFamily = value;
            }
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
            settingHolder.children[childIndex].style.margin = '5px';
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
        const effect = {
            neonMode: document.getElementById("neonCard").checked,
            borderRadius: `${document.getElementById('cardShape').value}px`,
            fontSize: `${document.getElementById('cardTextSize').value}px`,
            textDecorationThickness: `${document.getElementById('cardTextDecorationThicc').value}px`,
            textDecorationLine: document.getElementById('cardTextDecoration').value,
            textDecorationStyle: document.getElementById('cardTextDecorationLine').value,
            fontFamily: document.getElementById('cardTextFontFamily').value
        }
        localStorage.setItem('customizeEffect', JSON.stringify(effect));
        window.location.href = '/';
    }
    mainBox.appendChild(saveButton);

    // Αφού τελείωσες, ενσωμάτωσέ το στο σώμα της ιστοσελίδας (<body>)
    document.body.appendChild(mainBox);

    // Φόρτωσε τα default εφέ
    document.getElementById('cardShape').value = '5';
    document.getElementById('cardTextSize').value = '60';
    const playersEffect = {
        neonMode: document.getElementById("neonCard").checked,
        borderRadius: `${document.getElementById('cardShape').value}px`,
        fontSize: `${document.getElementById('cardTextSize').value}px`,
        textDecorationThickness: `${document.getElementById('cardTextDecorationThicc').value}px`,
        textDecorationLine: document.getElementById('cardTextDecoration').value,
        textDecorationStyle: document.getElementById('cardTextDecorationLine').value,
        fontFamily: document.getElementById('cardTextFontFamily').value
    }

    previewCard.style.borderRadius = playersEffect.borderRadius;
    previewCard.style.fontSize = playersEffect.fontSize;
    previewCard.style.fontFamily = playersEffect.fontFamily;
    previewCard.style.textDecorationThickness = playersEffect.textDecorationThickness;
    previewCard.style.textDecorationLine = playersEffect.textDecorationLine;
    previewCard.style.textDecorationStyle = playersEffect.textDecorationStyle;

})();
