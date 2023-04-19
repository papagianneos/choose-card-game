const playersEffect = JSON.parse(localStorage.getItem('customizeEffect')) == null ? null : JSON.parse(localStorage.getItem('customizeEffect'))[0];

export let LANGUAGE_INDEX = playersEffect ? playersEffect.languageID ? playersEffect.languageID : 0 : 0; // 0 = Ελληνικά, 1 = Αγγλικά

export let LANGUAGE_DATA = [
    { // Ελληνικά

        // --------------------------------------
        // Άλλα πράγματα της σελίδας
        // --------------------------------------
        "page_title": "Βρες την σωστή κάρτα",
        "play_again": "Παίξε Ξανά",
        "amount_of_cards": 'Σύνολο Καρτών',
        "haha": 'Χάχα',
        "tries": 'Προσπάθειες',
        "developer": 'Προγραμματιστής: Σωτήριος Παπαγιάννης',
        "title_game_name": 'ΒΡΕΣ ΤΗΝ ΣΩΣΤΗ ΚΑΡΤΑ',
        "title_credits": "ΠΛΗΡΟΦΟΡΙΕΣ",
        "label_close_button": 'Κλείσιμο',
        "label_music_credit": "Μουσική από:",
        "label_friends_project": "Επίσης τσέκαρε:",
        "label_achievements": 'Επιτεύγματα',
        "label_button_go_back": 'Πίσω στο παιχνίδι!',
        "label_trophies": "Τρόπαια",
        "win": "ΚΕΡΔΙΣΕΣ",
        "win_mode_hard": 'ΚΕΡΔΙΣΕΣ ΤΟ ΔΥΣΚΟΛΟ!!!',
        "win_mode_challenge": 'ΚΕΡΔΙΣΕΣ ΤΟ CHALLENGE!!!',
        "win_mode_extreme": 'Wow.. κέρδισες το extreme. Papagianneos is impressed now',
        "win_mode_finale": 'Κέρδισες... το.. FINALE ΜΟΥ!! Συγχαρητήρια!!! Ελπίζω να σου άρεσε το παιχνίδι!',
        "win_mode_timed": 'Είσαι γρήγορος..',
        "win_mode_void": 'Το void; ΜΑ ΠΩΣ; ΠΩΣ ΚΕΡΔΙΣΕΣ;',
        "win_mode_virus": 'Κέρδισες τον ιό.. μπράβο.',
        "win_K_card": 'Σε έσωσα!',
        // --------------------------------------

        // -------------------------------------------------------------------------------
        // Σπέσιαλ κάρτες
        // -------------------------------------------------------------------------------
        "info_special_card_x2": "Διπλό Score",
        "info_special_card_1/2": "Μισό Score",
        "info_special_card_T-2": "2 Λιγότερες Προσπάθειες",
        "info_special_card_cross": 'Πάει έχασες το παιχνίδι',
        "info_special_card_triangle": 'ΠΡΟΣΟΧΗ EΚΡΗΞΗ',
        "info_special_card_omega": 'Ορατός... ή.. αόρατος.',
        "info_special_card_troll": 'Αλλάζω μορφή.. booo',
        "info_special_card_clock": '+60sec Χρόνος',
        "info_special_card_slow": 'Αργότερος Χρόνος',
        "info_special_card_lamda": 'Θα σου βγάλω την ψυχή',
        "info_special_card_sigma": 'Κάποιες φορές σκέφτομαι.. ΠΟΛΥΧΡΩΜΟΣ!',
        // -------------------------------------------------------------------------------

        // --------------------------------------------------------------------------------------------
        // How-To-Play things
        // --------------------------------------------------------------------------------------------
        "how_to_win": 'Για να κερδίσεις πρέπει να βρείς όλα τα ζευγάρια καρτών, χωρίς τις σπεσιαλ κάρτες.',
        "title_special_cards": "ΣΠΕΣΙΑΛ ΚΑΡΤΕΣ",
        "info_special_cards": 'Μόνο 1 από τις παρακάτω υπάρχει σε κάθε παιχνίδι! Δεν μετράνε στο σύνολο και δεν χρειάζεται να τις βρεις μαζί με τις άλλες απλές κάρτες για να κερδίσεις. Πρέπει να βρεις το ζευγάρι τις καθεμιάς για να τις λειτουργήσεις.',
        "dev_thanks": 'Επιμέλεια: Σωτήριος Παπαγιάννης',
        "info_gamemodes": 'Μπορείς να παίξεις επίσης και με διαφορετικά gamemodes!',
        "mode_desc_easy": "Απλό και εύκολο.",
        "mode_desc_hard": "Κάνε λάθος και.. αλλάζουν όλες οι κάρτες θέση!",
        "mode_desc_challenge": "Κάνε λάθος και.. νέο εφέ!",
        "mode_desc_extreme": "Μπορείς να κερδίσεις με συγκεκριμένες προσπάθειες;",
        "mode_desc_timed": "Ταχύτητα = Νίκη",
        "mode_desc_void": "Η τελική μάχη",
        "mode_desc_virus": "Κάνε λάθος και χάσε τα πάντα.",
        // --------------------------------------------------------------------------------------------

        // --------------------------------------
        // Κουμπιά
        // --------------------------------------
        "play": 'Παίξε',
        "play_mode_easy": 'Απλό',
        "play_mode_hard": 'Δύσκολο',
        "play_mode_challenge": 'Challenge',
        "play_mode_extreme": 'EXTREME',
        "play_mode_timed": 'TIMED',
        "play_mode_void": "VOID",
        "play_mode_virus": "Virus",
        // --------------------------------------

        // ------------------------------------------------------------------------
        // Ονομασίες Ρυθμίσεων
        // ------------------------------------------------------------------------
        "title_settings_page": "ΡΥΘΜΙΣΕΙΣ",
        "setting_label_language": "Γλώσσα",
        "setting_label_musicType": "Είδος Μουσικής",
        "setting_label_cardTextFontFamily": "Είδος Γραμματοσειράς",
        "setting_label_cardTextDecorationLine": "Είδος Γραμμής",
        "setting_label_cardTextDecoration": "Διακόσμηση Γραμματοσειράς (Γραμμή)",
        "setting_label_cardTextDecorationThicc": "Μέγεθος Γραμμής",
        "setting_label_fontSize": "Μέγεθος Γραμματοσειράς",
        "setting_label_cardOutsideShape": "Τετράπλευρο Κάρτας",
        "setting_label_cardShape": "Σχήμα Κάρτας",
        "setting_label_neonCard": "Νέον Κάρτα",
        "light_mode_warning": 'ΠΡΟΣΟΧΗ! Αυτή η ρύθμιση ενδέχεται να σου μειώσει τα FPS.',
        "default": "Κανονικό",
        "dashed": 'Διακεκομμένο',
        "dotted": 'Διάσπαρτο',
        "wavy": 'Κυματιστό',
        "double": 'Διπλό',
        "old": 'Παλιό',
        "fantasy": 'Φανταστικό',
        "scientific": 'Επιστημονικό',
        "ancient": 'Αρχαίο',
        "weird": 'Παράξενο',
        "none": 'Τίποτα',
        "overline": 'Υπεργράμμιση',
        "underline": 'Υπογράμμιση',
        "line_through": 'Γραμμή-μέσω',
        "overline_and_underline": 'Πάνω-Κάτω Γραμμή',
        // ------------------------------------------------------------------------
    },

    { // Αγγλικά

        // --------------------------------------
        // Άλλα πράγματα της σελίδας
        // --------------------------------------
        "page_title": "Find the right card",
        "play_again": "Play Again",
        "amount_of_cards": 'Amount of cards',
        "haha": 'Haha',
        "tries": "Tries",
        "developer": 'Developer: Sotirios Papagiannis',
        "title_game_name": 'FIND THE RIGHT CARD',
        "title_credits": "INFORMATION",
        "label_close_button": 'Close',
        "label_music_credit": "Music by:",
        "label_friends_project": "Also check:",
        "label_achievements": 'Achievements',
        "label_button_go_back": 'Back to the game!',
        "label_trophies": "Trophies",
        "win": "YOU WON!",
        "win_mode_hard": 'YOU BEAT HARD MODE!!',
        "win_mode_challenge": 'YOU BEAT CHALLENGE MODE!!!',
        "win_mode_extreme": 'Wow.. you beat the extreme. Papagianneos is impressed now',
        "win_mode_finale": 'You won... MY FINALE!! Congratulations!!! I hope you liked the game!',
        "win_mode_timed": 'You are fast..',
        "win_mode_void": 'The void?? HOW.. HOW DID YOU WIN??',
        "win_mode_virus": 'You won the virus.. nice.',
        "win_K_card": 'I saved you!',
        // --------------------------------------

        // -------------------------------------------------------------------------------
        // Σπέσιαλ κάρτες
        // -------------------------------------------------------------------------------
        "info_special_card_x2": "Double Score",
        "info_special_card_1/2": "Half Score",
        "info_special_card_T-2": "2 Less Tries",
        "info_special_card_cross": 'Your game ded',
        "info_special_card_triangle": 'CAUTION EXPLOSION',
        "info_special_card_omega": 'Visible... or.. invisible.',
        "info_special_card_troll": 'I change form. booo',
        "info_special_card_clock": '+60sec Time',
        "info_special_card_slow": 'Slower Time',
        "info_special_card_lamda": 'I will annoy you',
        "info_special_card_sigma": 'Sometimes I think.. COLORFUL!',
        // -------------------------------------------------------------------------------

        // --------------------------------------------------------------------------------------------
        // How-To-Play things
        // --------------------------------------------------------------------------------------------
        "how_to_win": 'To win, you must find all the pairs of cards, without the special cards.',
        "title_special_cards": "SPECIAL CARDS",
        "info_special_cards": 'Only 1 of the following is available in each game! They don\'t count towards the total and you don\'t have to find them along with the other simple cards to win. You have to find the pair of each to operate them.',
        "dev_thanks": 'Editor: Sotirios Papagiannis',
        "info_gamemodes": 'You can also play with different gamemodes!',
        "mode_desc_easy": "Simple and easy",
        "mode_desc_hard": "Make a mistake and everything swaps.",
        "mode_desc_challenge": "For each mistake you get a new effect!",
        "mode_desc_extreme": "Can you win with a specific amount of tries?",
        "mode_desc_timed": "Speed = Win",
        "mode_desc_void": "The final fight.",
        "mode_desc_virus": "Make a mistake and lose everything.",
        // --------------------------------------------------------------------------------------------

        // --------------------------------------
        // Κουμπιά
        // --------------------------------------
        "play": "Play",
        "play_mode_easy": 'Simple',
        "play_mode_hard": 'Hard',
        "play_mode_challenge": 'Challenge',
        "play_mode_extreme": 'EXTREME',
        "play_mode_timed": 'TIMED',
        "play_mode_void": "VOID",
        "play_mode_virus": "Virus",
        // --------------------------------------

        // -----------------------------------------------------
        // Ονομασίες Ρυθμίσεων
        // -----------------------------------------------------
        "title_settings_page": "SETTINGS",
        "setting_label_language": "Language",
        "setting_label_musicType": "Music Type",
        "setting_label_cardTextFontFamily": "Font Type",
        "setting_label_cardTextDecorationLine": "Line Type",
        "setting_label_cardTextDecoration": "Font Style (Line)",
        "setting_label_cardTextDecorationThicc": "Line Size",
        "setting_label_fontSize": "Font Size",
        "setting_label_cardOutsideShape": "Outside Shape Type",
        "setting_label_cardShape": "Card Shape",
        "setting_label_neonCard": "Neon Card",
        "light_mode_warning": 'WARNING! This option might decrease your FPS on the game.',
        "default": "Default",
        "dashed": 'Dashed',
        "dotted": 'Dotted',
        "wavy": 'Wavy',
        "double": 'Double',
        "old": 'Old',
        "fantasy": 'Fantastic',
        "scientific": 'Scientific',
        "ancient": 'Ancient',
        "weird": 'Weird',
        "none": 'None',
        "overline": 'Overline',
        "underline": 'Underline',
        "line_through": 'Line-Through',
        "overline_and_underline": 'Overline & Underline',
        "square": 'Τετράγωνο',
        "rectangle_horizontal": 'Ορθογώνιο (Οριζόντιο)',
        "rectangle_vertical": 'Ορθογώνιο (Κάθετο)',
        // -----------------------------------------------------
    }
];

// Μετάφρασε το όνομα της σελίδας
document.title = LANGUAGE_DATA[LANGUAGE_INDEX].page_title;
