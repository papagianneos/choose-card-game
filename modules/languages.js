const playersEffect = JSON.parse(localStorage.getItem('customizeEffect')) == null ? null : JSON.parse(localStorage.getItem('customizeEffect'))[0];

export let LANGUAGE_INDEX = playersEffect ? playersEffect.languageID ? playersEffect.languageID : 1 : 1; // 0 = Ελληνικά, 1 = Αγγλικά

export let LANGUAGE_DATA = [
    { // Ελληνικά

        // --------------------------------------
        // Άλλα πράγματα της σελίδας
        // --------------------------------------
        "page_title": "Βρες την σωστή κάρτα",
        "play_again": "Παίξε<br>Ξανά",
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
        "win": "ΚΕΡΔΙΣΕΣ!",
        "win_mode_hard": 'ΚΕΡΔΙΣΕΣ ΤΟ ΔΥΣΚΟΛΟ!!!',
        "win_mode_challenge": 'ΚΕΡΔΙΣΕΣ ΤΟ CHALLENGE!!!',
        "win_mode_extreme": 'Wow.. κέρδισες το extreme. Papagianneos is impressed now',
        "win_mode_finale": 'Κέρδισες... το.. FINALE ΜΟΥ!! Συγχαρητήρια!!! Ελπίζω να σου άρεσε το παιχνίδι!',
        "win_mode_timed": 'Είσαι γρήγορος..',
        "win_mode_void": 'Το void; ΜΑ ΠΩΣ; ΠΩΣ ΚΕΡΔΙΣΕΣ;',
        "win_mode_virus": 'Κέρδισες τον ιό.. μπράβο.',
        "win_mode_penalty": 'Κέρδισες με τις ποινές.. ουάου.',
        "win_mode_cobalt": "Κέρδισες ένα κοβάλτιο βλέπω..",
        "win_K_card": 'Σε έσωσα!',
        "new": "ΝΕΟ",
        "achievement": "ΕΠΙΤΕΥΓΜΑ",
        "trophy": "ΤΡΟΠΑΙΟ",
        "choose_special_card_menu_title": "ΔΙΑΛΕΞΕ ΣΠΕΣΙΑΛ ΚΑΡΤΑ",
        "delete_data_question": "Είσαι σίγουρος ότι θέλεις να διαγράψεις τα επιτεύγματα και τις ρυθμίσεις του παιχνιδιού;",
        // --------------------------------------

        // -------------------------------------------------------------------------------
        // Σπέσιαλ κάρτες
        // -------------------------------------------------------------------------------
        "info_special_card_x2": "Διπλό Score",
        "info_special_card_x4": "Τετραπλό Score",
        "info_special_card_1/2": "Μισό Score",
        "info_special_card_T-2": "2 Λιγότερες Προσπάθειες",
        "info_special_card_T-6": "6 Λιγότερες Προσπάθειες",
        "info_special_card_cross": 'Πάει έχασες το παιχνίδι',
        "info_special_card_triangle": 'ΠΡΟΣΟΧΗ EΚΡΗΞΗ',
        "info_special_card_omega": 'Ορατός... ή.. αόρατος.',
        "info_special_card_troll": 'Αλλάζω μορφή.. booo',
        "info_special_card_clock": '+60sec Χρόνος',
        "info_special_card_slow": 'Αργότερος Χρόνος',
        "info_special_card_lamda": 'Θα σου βγάλω την ψυχή',
        "info_special_card_sigma": 'Κάποιες φορές σκέφτομαι.. ΠΟΛΥΧΡΩΜΟΣ!',
        "info_special_card_wild_card": 'Μπαλαντέρ',
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
        "mode_desc_penalty": "Κάθε 5 λάθη, ένα νέο ζευγάρι καρτών.",
        "mode_desc_cobalt": "Ένα project που ακυρώθηκε το 1983.",
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
        "play_mode_penalty": "Penalty",
        "play_mode_cobalt": "Κοβάλτιο",
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
        "square": 'Τετράγωνο',
        "rectangle_horizontal": 'Ορθογώνιο (Οριζόντιο)',
        "rectangle_vertical": 'Ορθογώνιο (Κάθετο)',
        // ------------------------------------------------------------------------

        // ------------------------------------------------------------------------------------------------
        // Επιτεύγματα και Τρόπαια
        // ------------------------------------------------------------------------------------------------
        "ach_new_player": {
            name: "Νέος Παίχτης",
            desc: 'Καλωσόρισες στο παιχνίδι!'
        },

        "ach_first_combination": {
            name: "Τα κατάφερα;",
            desc: 'Βρες το πρώτο ζευγάρι καρτών'
        },

        "ach_first_special_card": {
            name: 'Τι ήταν αυτό;',
            desc: 'Βρες μία σπεσιαλ κάρτα'
        },

        "ach_normal_mode_win": {
            name: 'Ευκολάκης',
            desc: 'Νίκησε το "απλό" mode.'
        },

        "ach_hard_mode_win": {
            name: 'Δύσκολος',
            desc: 'Νίκησε το "δύσκολο" mode.'
        },

        "ach_challenge_mode_win": {
            name: 'Challenger',
            desc: 'Νίκησε το "challege" mode.'
        },

        "ach_extreme_mode_win": {
            name: 'Εκδικητής',
            desc: 'Νίκησε το "extreme" mode.'
        },

        "ach_pgn_finale_win": {
            name: 'Το λάπτοπ του Pgn',
            desc: 'Νίκησε το "finale" mode.'
        },

        "ach_beginner": {
            name: 'Αρχάριος',
            desc: 'Βρες 10 κάρτες',
        },

        "ach_10_tries": {
            name: 'Το μοιραίο λάθος',
            desc: 'Παίξε 10 Προσπάθειες'
        },

        "ach_50_tries": {
            name: 'Λίγο ακόμα και θα..',
            desc: 'Παίξε 50 Προσπάθειες'
        },

        "ach_100_tries": {
            name: 'ΑΑΑΑΑ',
            desc: 'Παίξε 100 Προσπάθειες'
        },

        "ach_special_K_card": {
            name: ':)',
            desc: 'Βρες την σπεσιαλ "Κ" κάρτα.'
        },

        'ach_win_any_20': {
            name: 'Τέρμα η μνήμη RAM',
            desc: 'Κέρδισε 20 φορές',
        },

        'ach_win_any_50': {
            name: 'Παίχτης από Κουρδιστάν',
            desc: 'Κέρδισε 50 φορές',
        },

        'ach_lose_10': {
            name: 'Τι σκατά ρε',
            desc: 'Χάσε 10 φορές',
        },

        'ach_lose_50': {
            name: 'Ξέρω την αλφάβητο!',
            desc: 'Χάσε 50 φορές',
        },

        'ach_win_virus': {
            name: 'Λίγη κολλητική ταινία δε βλάπτει',
            desc: 'Νίκησε το "virus" mode.',
        },

        'ach_score_100': {
            name: 'Εκατοστάρα στη μάπα',
            desc: 'Κάνε 100 score'
        },

        'ach_somewhat_experienced': {
            name: "Έμπειρος",
            desc: 'Βρες 50 κάρτες',
        },

        'ach_2x05': {
            name: "Κάπου το θυμάμαι αυτό..",
            desc: '???'
        },

        'ach_expert': {
            name: "Ειδικός",
            desc: 'Βρες 100 κάρτες',
        },

        'ach_cross_card_found': {
            name: "Rest in pepperoni",
            desc: "Βρες την κάρτα με τον σταυρό",
        },

        'ach_pgn_card_found': {
            name: "Ουάου",
            desc: "Ο τίτλος το εξηγεί όλο",
        },

        'ach_skill_issue': {
            name: "Skill Issue",
            desc: "Κέρδισε 3 φορές με λιγότερο από 10 προσπάθειες.",
        },

        'ach_boom_card_found': {
            name: "T r i a n g l e",
            desc: "Και νομίζεις ότι δεν υπάρχει 'δύσκολο' mode..",
        },

        'ach_xray_card_found': {
            name: 'Χάκερ!!11',
            desc: "ΓΙΑΤΙΙΙ ΧΑΚΑΡΕΣ ΤΟ GAME ΜΟΥΥΥΥΥ!!11",
        },

        'ach_score_1k': {
            name: 'Δεν με ξέρεις καλά..',
            desc: "Κάνε 1000 score.",
        },

        'ach_pgn_finale_twice': {
            name: 'Η Επιστροφή του Pgn',
            desc: 'Νίκησε το "finale" mode για δεύτερη φορά.',
        },

        'ach_impostor_card_found': {
            name: 'SkinWalker',
            desc: 'ΤΙ ΦΑΣΗ ΜΕ ΑΥΤΗ ΤΗ ΚΑΡΤΑ',
        },

        'ach_peter': {
            name: 'Σαν τον Πέτρο',
            desc: 'Βρες 3 σωστές κάρτες στη σειρά',
        },

        'ach_timed_mode_win': {
            name: 'SREEEEEEED',
            desc: 'Κέρδισε το "timed" mode.',
        },

        'ach_timed_mode_slow_card': {
            name: 'Χελωνάρας',
            desc: 'Βρες την σπέσιαλ κάρτα που κάνει τον χρόνο αργότερο',
        },

        'ach_timed_special_card': {
            name: 'Τι ρολόι είναι αυτό ρε;',
            desc: 'Βρες τη χρονική σπέσιαλ κάρτα',
        },

        'ach_memory_loss': {
            name: 'Απώλεια Μνήμης',
            desc: 'Σφάλμα 404',
        },

        'ach_hunter': {
            name: 'Κυνηγός',
            desc: 'Βρες 15 σπέσιαλ κάρτες',
        },

        'ach_sigma_card': {
            name: 'Σ.. από.. Σωτήρης;',
            desc: 'Βρες το σπάνιο Σ.',
        },

        'ach_deceiver': {
            name: 'Απατεών',
            desc: 'Βρες 50 σπέσιαλ κάρτες',
        },

        // ΤΡΟΠΑΙΑ
        'tr_master_of_cards': {
            name: 'Δάσκαλος των Καρτών',
            desc: 'Βρες 10000 Κάρτες',
        },

        'tr_million_score': {
            name: 'Εκατομμυριούχος',
            desc: 'Κάνε 1000000 Score',
        },

        'tr_10k_tries': {
            name: 'Τσαλαπετεινός',
            desc: 'Παίξε 10000 προσπάθειες',
        },

        'tr_win_any_1k': {
            name: 'Βρες τον σωστό δάσκαλο',
            desc: 'Κέρδισε 1000 φορές',
        }
        // ------------------------------------------------------------------------------------------------
    },

    { // Αγγλικά

        // --------------------------------------
        // Άλλα πράγματα της σελίδας
        // --------------------------------------
        "page_title": "Find the right card",
        "play_again": "Play<br>Again",
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
        "win_mode_penalty": 'You won with penalties.. wow.',
        "win_mode_cobalt": "You won a cobalt, I see.",
        "win_K_card": 'I saved you!',
        "new": "NEW",
        "achievement": "ACHIEVEMENT",
        "trophy": "TROPHY",
        "choose_special_card_menu_title": "SELECT SPECIAL CARD",
        "delete_data_question": "Are you sure that you want to delete all of your progress?",
        // --------------------------------------

        // -------------------------------------------------------------------------------
        // Σπέσιαλ κάρτες
        // -------------------------------------------------------------------------------
        "info_special_card_x2": "Double Score",
        "info_special_card_x4": "Quadruple Score",
        "info_special_card_1/2": "Half Score",
        "info_special_card_T-2": "2 Less Tries",
        "info_special_card_T-6": "6 Less Tries",
        "info_special_card_cross": 'Your game ded',
        "info_special_card_triangle": 'CAUTION EXPLOSION',
        "info_special_card_omega": 'Visible... or.. invisible.',
        "info_special_card_troll": 'I change form. booo',
        "info_special_card_clock": '+60sec Time',
        "info_special_card_slow": 'Slower Time',
        "info_special_card_lamda": 'I will annoy you',
        "info_special_card_sigma": 'Sometimes I think.. COLORFUL!',
        "info_special_card_wild_card": 'Wild Card',
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
        "mode_desc_penalty": "Every 5 mistakes you get a new pair of cards.",
        "mode_desc_cobalt": "A project that was scrapped back in 1983.",
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
        "play_mode_penalty": "Penalty",
        "play_mode_cobalt": "Cobalt",
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
        "square": 'Square',
        "rectangle_horizontal": 'Rectangle (Horizontal)',
        "rectangle_vertical": 'Rectangle (Vertical)',
        // -----------------------------------------------------

        // ------------------------------------------------------------------------------------------------
        // Επιτεύγματα και Τρόπαια
        // ------------------------------------------------------------------------------------------------
        "ach_new_player": {
            name: "New Player",
            desc: 'Wecome to the game!'
        },

        "ach_first_combination": {
            name: "I did it?",
            desc: 'Find your first pair of cards.'
        },

        "ach_first_special_card": {
            name: 'What was that?',
            desc: 'Find a special card.'
        },

        "ach_normal_mode_win": {
            name: 'Easyman',
            desc: 'Beat "easy" mode.'
        },

        "ach_hard_mode_win": {
            name: 'Hardman',
            desc: 'Beat "hard" mode.'
        },

        "ach_challenge_mode_win": {
            name: 'Challenger',
            desc: 'Beat "challenge" mode.'
        },

        "ach_extreme_mode_win": {
            name: 'Avenger',
            desc: 'Beat "extreme" mode.'
        },

        "ach_pgn_finale_win": {
            name: 'Pgn\'s laptop',
            desc: 'Beat the finale.'
        },

        "ach_beginner": {
            name: 'Beginner',
            desc: 'Find 10 cards.',
        },

        "ach_10_tries": {
            name: 'The fatal mistake',
            desc: 'Play 10 Attempts'
        },

        "ach_50_tries": {
            name: 'A little more and I will..',
            desc: 'Play 50 Attempts'
        },

        "ach_100_tries": {
            name: 'ΑΑΑΑΑ',
            desc: 'Play 100 Attempts'
        },

        "ach_special_K_card": {
            name: ':)',
            desc: 'Find the special "K" card.'
        },

        'ach_win_any_20': {
            name: 'Out of RAM',
            desc: 'Win 20 times',
        },

        'ach_win_any_50': {
            name: 'Player from Kurdistan',
            desc: 'Win 50 times',
        },

        'ach_lose_10': {
            name: 'What the hell',
            desc: 'Lose 10 times',
        },

        'ach_lose_50': {
            name: 'I know the alphabet!',
            desc: 'Lose 50 times',
        },

        'ach_win_virus': {
            name: 'A little duct tape won\'t hurt',
            desc: 'Beat "virus" mode.',
        },

        'ach_score_100': {
            name: 'A hundred on the map',
            desc: 'Collect 100 Score'
        },

        'ach_somewhat_experienced': {
            name: "Experienced",
            desc: 'Find 50 cards.',
        },

        'ach_2x05': {
            name: "I remember this somewhere..",
            desc: '???'
        },

        'ach_expert': {
            name: "Expert",
            desc: 'Find 100 cards.',
        },

        'ach_cross_card_found': {
            name: "Rest in pepperoni",
            desc: "Find the card with the cross",
        },

        'ach_pgn_card_found': {
            name: "Wow",
            desc: "The title explains it all.",
        },

        'ach_skill_issue': {
            name: "Skill Issue",
            desc: "Win 3 times with less than 10 tries.",
        },

        'ach_boom_card_found': {
            name: "T r i a n g l e",
            desc: "And you think there is no 'hard' mode..",
        },

        'ach_xray_card_found': {
            name: 'Hacker!!11',
            desc: "WHY DID YOU HACK MY GAME!!11",
        },

        'ach_score_1k': {
            name: 'You don\'t know me well..',
            desc: "Collect 1000 score.",
        },

        'ach_pgn_finale_twice': {
            name: 'The return of Pgn',
            desc: 'Beat the finale for the second time.',
        },

        'ach_impostor_card_found': {
            name: 'SkinWalker',
            desc: 'WHAT IS THE WRONG WITH THIS CARD?',
        },

        'ach_peter': {
            name: 'Just like Peter',
            desc: 'Find 3 pairs of cards in a row.',
        },

        'ach_timed_mode_win': {
            name: 'SREEEEEEED',
            desc: 'Beat "timed" mode.',
        },

        'ach_timed_mode_slow_card': {
            name: 'Turtleman',
            desc: 'Find the special card that slows time down.',
        },

        'ach_timed_special_card': {
            name: 'What watch is this?',
            desc: 'Find the clock special card.',
        },

        'ach_memory_loss': {
            name: 'Memory Loss',
            desc: 'Error 404',
        },

        'ach_hunter': {
            name: 'Hunter',
            desc: 'Find 15 special cards.',
        },

        'ach_sigma_card': {
            name: 'Σ.. from.. Sotiris?',
            desc: 'Find the rare Σ.',
        },

        'ach_deceiver': {
            name: 'Deceiver',
            desc: 'Find 50 special cards.',
        },

        // ΤΡΟΠΑΙΑ
        'tr_master_of_cards': {
            name: 'Master Of Cards',
            desc: 'Find 10000 Cards',
        },

        'tr_million_score': {
            name: 'Millionare',
            desc: 'Collect 1000000 Score',
        },

        'tr_10k_tries': {
            name: 'Hoopoe',
            desc: 'Play 10000 Attempts',
        },

        'tr_win_any_1k': {
            name: 'Find the correct teacher',
            desc: 'Win 1000 times',
        }
        // ------------------------------------------------------------------------------------------------
    }
];

// Μετάφρασε το όνομα της σελίδας
document.title = LANGUAGE_DATA[LANGUAGE_INDEX].page_title;
