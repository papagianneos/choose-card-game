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
        "found": "Βρέθηκαν",
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
        "win_mode_hideAndSeek": "Τα βρήκες όλααααα!",
        "win_K_card": 'Σε έσωσα!',
        "new": "ΝΕΟ",
        "achievement": "ΕΠΙΤΕΥΓΜΑ",
        "trophy": "ΤΡΟΠΑΙΟ",
        "choose_special_card_menu_title": "ΔΙΑΛΕΞΕ ΣΠΕΣΙΑΛ ΚΑΡΤΑ",
        "delete_data_question": "Είσαι σίγουρος ότι θέλεις να διαγράψεις τα επιτεύγματα και τις ρυθμίσεις του παιχνιδιού;",
        "nickname": "Ψευδώνυμο",
        "serverDownMsg": "Δεν λειτουργεί ο διακομιστής (server)",
        "noGamesMsg": "Κανένας δεν έπαιξε σήμερα.",
        "todaysGames": "ΣΗΜΕΡΙΝΑ ΠΑΙΧΝΙΔΙΑ",
        "loading": "Φόρτωση",
        // --------------------------------------

        // -----------------------------------------------------------------------------
        // Skins
        // -----------------------------------------------------------------------------
        "locked": "Κλειδωμένο",
        "label_skin_no_skin": "Κανονικό",
        "label_skin_woody": "Ξυλώδης",
        "label_skin_metal": "Μεταλλικό",
        "label_skin_gradient": "Ξεχωριστά Χρώματα",
        "label_skin_window": "Παράθυρο",
        "label_skin_emerald": "Σμαράγδι",
        "label_skin_crystal": "Κρυσταλλικό",
        "label_skin_radian": "Ακτίνια",
        "label_skin_target": "Στόχος",
        // -----------------------------------------------------------------------------

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
        "info_special_card_universe_swap": 'Αλλαγή Κόσμου',
        "info_special_card_delta": 'Σκέψου έξυπνα, όχι σκληρά!',
        "info_special_card_lifesaver": "Δεν θα χάσεις!",
        "info_special_card_clock_gold": 'Χρόνος..',
        "info_special_card_freezer": 'Δεν υπάρχει ο χρόνος για εμένα.',
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
        "mode_desc_og": "Σαν το παρελθόν!",
        "mode_desc_hideAndSeek": "Το ταμπλό χάλασε, βρες όλες τις κάρτες για να κερδίσεις, χωρίς ζευγάρια! Χρησιμοποίησε το κουμπί HINT εάν κολλήσεις!",
        "mode_desc_hell": "Γιατί όχι! Χρόνος με όριο προσπάθειων!",
        "mode_desc_dimensions": "Κάποιες κάρτες δεν βρίσκονται στην σωστή διάσταση! Χρησιμοποίησε τις ειδικές σπέσιαλ κάρτες για να αλλάξεις την διάσταση του επιπέδου.",
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
        "play_mode_hideAndSeek": "Κρυφτό",
        "play_mode_hell": "HELL",
        "play_mode_dimensions": "Διαστάσεις",
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

        'ach_fantastic': {
            name: 'Φανταστικός',
            desc: 'Κέρδισε ένα game στον φανταστικό κόσμο.',
        },

        'ach_win_hell': {
            name: 'ΕΝΕΡΓΕΙΑΚΟ ΠΟΤΟ',
            desc: 'Νίκησε το "Hell" mode.'
        },

        'ach_lifesaver': {
            name: 'Τ Ι',
            desc: 'ΖΩΩ!!'
        },

        'ach_timed_mode_win_10': {
            name: 'Πιο γρήγορος δεν γίνεται!',
            desc: 'Νίκησε το "TIMED" mode 10 φορές.'
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
        "found": "Found",
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
        "win_mode_hideAndSeek": "You found everythinggg!",
        "win_K_card": 'I saved you!',
        "new": "NEW",
        "achievement": "ACHIEVEMENT",
        "trophy": "TROPHY",
        "choose_special_card_menu_title": "SELECT SPECIAL CARD",
        "delete_data_question": "Are you sure that you want to delete all of your progress?",
        "nickname": "Nickname",
        "serverDownMsg": "Error: Server is not working.",
        "noGamesMsg": "No games were played today.",
        "todaysGames": "TODAY'S GAMES",
        "loading": "Loading",
        // --------------------------------------

        // -----------------------------------------------------------------------------
        // Skins
        // -----------------------------------------------------------------------------
        "locked": "Locked",
        "label_skin_no_skin": "No Skin",
        "label_skin_woody": "Woody",
        "label_skin_metal": "Metallic",
        "label_skin_gradient": "Super Gradient",
        "label_skin_window": "Window",
        "label_skin_emerald": "Emerald",
        "label_skin_crystal": "Crystallic",
        "label_skin_radian": "Radians",
        "label_skin_target": "Target",
        // -----------------------------------------------------------------------------

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
        "info_special_card_universe_swap": 'Universe Swap',
        "info_special_card_delta": 'Think smart, not hard!',
        "info_special_card_lifesaver": "You won't lose!",
        "info_special_card_clock_gold": "Time..",
        "info_special_card_freezer": 'Time does not exist for me.',
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
        "mode_desc_og": "Nostalgia.",
        "mode_desc_hideAndSeek": "The board has broke, find all the cards to win, no pairs! Use the hint if you get stuck!",
        "mode_desc_hell": "Why not! Time with tries limit!",
        "mode_desc_dimensions": "Some cards are not in the right dimension! Use the special special cards to change the dimension of the level.",
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
        "play_mode_hideAndSeek": "H. & S.",
        "play_mode_hell": "HELL",
        "play_mode_dimensions": "Dimension",
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

        'ach_fantastic': {
            name: 'Fantastic',
            desc: 'Win a game in the fantastic universe.',
        },

        'ach_win_hell': {
            name: 'ENERGY DRINK',
            desc: 'Beat "Hell" mode.'
        },

        'ach_lifesaver': {
            name: 'W H A T',
            desc: 'I LIVE!!'
        },

        'ach_timed_mode_win_10': {
            name: 'Can\'t be faster!',
            desc: 'Beat "TIMED" mode 10 times.'
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
    },

    /*{ // German (Scrapped)
        "page_title": "Finde die richtige Karte",
        "play_again": "Erneut<br>spielen",
        "amount_of_cards": 'Anzahl der Karten',
        "haha": 'Haha',
        "tries": "Versuche",
        "found": "Gefunden",
        "developer": 'Entwickler: Sotirios Papagiannis',
        "title_game_name": 'FINDE DIE RICHTIGE KARTE',
        "title_credits": "INFORMATIONEN",
        "label_close_button": 'Schließen',
        "label_music_credit": "Musik von:",
        "label_friends_project": "Schau auch:",
        "label_achievements": 'Erfolge',
        "label_button_go_back": 'Zurück zum Spiel!',
        "label_trophies": "Trophäen",
        "win": "DU HAST GEWONNEN!",
        "win_mode_hard": 'DU HAST HARD MODE GESCHLAGEN!!',
        "win_mode_challenge": 'DU HAST CHALLENGE MODE GESCHLAGEN!!!',
        "win_mode_extreme": 'Wow.. du hast den Extrem-Modus geschlagen. Papagianneos ist jetzt beeindruckt',
        "win_mode_finale": 'Du hast gewonnen... MEIN FINALE!! Herzlichen Glückwunsch!!! Ich hoffe, dir hat das Spiel gefallen!',
        "win_mode_timed": 'Du bist schnell..',
        "win_mode_void": 'Die Leere?? WIE.. WIE HAST DU GEWONNEN??',
        "win_mode_virus": 'Du hast das Virus gewonnen.. schön.',
        "win_mode_penalty": 'Du hast mit Strafen gewonnen.. wow.',
        "win_mode_cobalt": "Du hast ein Cobalt gewonnen, sehe ich.",
        "win_mode_hideAndSeek": "Du hast alles gefunden!",
        "win_K_card": 'Ich habe dich gerettet!',
        "new": "NEU",
        "achievement": "ERFOLG",
        "trophy": "TROPHÄE",
        "choose_special_card_menu_title": "WÄHLE SPEZIALKARTE",
        "delete_data_question": "Bist du sicher, dass du deinen Fortschritt löschen möchtest?",
        "nickname": "Spitzname",
        "serverDownMsg": "Fehler: Der Server funktioniert nicht.",
        "noGamesMsg": "Heute wurden keine Spiele gespielt.",
        "todaysGames": "SPIELE HEUTE",
        "loading": "Wird geladen",
        // ... Skins ...
        "locked": "Gesperrt",
        "label_skin_no_skin": "Kein Skin",
        "label_skin_woody": "Holzig",
        "label_skin_metal": "Metallisch",
        "label_skin_gradient": "Super Gradient",
        "label_skin_window": "Fenster",
        "label_skin_emerald": "TO DO",
        "label_skin_crystal": "Kristallin",
        "label_skin_radian": "Radian",
        "label_skin_target": "Ziel",
        // ... Special Cards ...
        "info_special_card_x2": "Doppelter Punktestand",
        "info_special_card_x4": "Vierfacher Punktestand",
        "info_special_card_1/2": "Halber Punktestand",
        "info_special_card_T-2": "2 Versuche weniger",
        "info_special_card_T-6": "6 Versuche weniger",
        "info_special_card_cross": 'Dein Spiel ist tot',
        "info_special_card_triangle": 'VORSICHT EXPLOSION',
        "info_special_card_omega": 'Sichtbar... oder... unsichtbar.',
        "info_special_card_troll": 'Ich ändere die Form. Buuh',
        "info_special_card_clock": '+60 Sekunden Zeit',
        "info_special_card_slow": 'Langsamere Zeit',
        "info_special_card_lamda": 'Ich werde dich nerven',
        "info_special_card_sigma": 'Manchmal denke ich... BUNT!',
        "info_special_card_wild_card": 'Wildcard',
        "info_special_card_universe_swap": 'Universum tauschen',
        "info_special_card_delta": 'Denke klug, nicht schwer!',
        "info_special_card_lifesaver": "Du wirst nicht verlieren!",
        "info_special_card_clock_gold": 'Zeit..',
        "info_special_card_freezer": 'Zeit existiert für mich nicht.',
        // ... How-To-Play things ...
        "how_to_win": 'Um zu gewinnen, musst du alle Kartendoppel finden, ohne die Spezialkarten.',
        "title_special_cards": "SPEZIALKARTEN",
        "info_special_cards": 'Nur 1 der folgenden steht in jedem Spiel zur Verfügung! Sie zählen nicht zum Gesamtpunktestand und du musst sie nicht zusammen mit den anderen einfachen Karten finden, um zu gewinnen. Du musst das Paar von jeder finden, um sie zu betreiben.',
        "dev_thanks": 'Herausgeber: Sotirios Papagiannis',
        "info_gamemodes": 'Du kannst auch mit verschiedenen Spielmodi spielen!',
        "mode_desc_easy": "Einfach und leicht",
        "mode_desc_hard": "Mach einen Fehler und alles tauscht sich aus.",
        "mode_desc_challenge": "Für jeden Fehler bekommst du einen neuen Effekt!",
        "mode_desc_extreme": "Kannst du mit einer bestimmten Anzahl von Versuchen gewinnen?",
        "mode_desc_timed": "Geschwindigkeit = Gewinn",
        "mode_desc_void": "Der letzte Kampf.",
        "mode_desc_virus": "Mach einen Fehler und verliere alles.",
        "mode_desc_penalty": "Alle 5 Fehler bekommst du ein neues Kartenpaar.",
        "mode_desc_cobalt": "Ein Projekt, das 1983 abgebrochen wurde.",
        "mode_desc_og": "Nostalgie.",
        "mode_desc_hideAndSeek": "Das Brett ist kaputt, finde alle Karten, um zu gewinnen, keine Paare! Benutze den Hinweis, wenn du stecken bleibst!",
        "mode_desc_hell": "Warum nicht! Zeitlimit für Versuche!",
        "mode_desc_dimensions": "TO DO"
        // ... Buttons ...
        "play": "Spielen",
        "play_mode_easy": 'Einfach',
        "play_mode_hard": 'Schwer',
        "play_mode_challenge": 'Herausforderung',
        "play_mode_extreme": 'EXTREM',
        "play_mode_timed": 'ZEITLICH',
        "play_mode_void": "LEERE",
        "play_mode_virus": "Virus",
        "play_mode_penalty": "Strafe",
        "play_mode_cobalt": "Cobalt",
        "play_mode_hideAndSeek": "V. & S.",
        "play_mode_hell": "HÖLLE",
        "play_mode_dimensions": "TO DO",
        // ... Settings ...
        "title_settings_page": "EINSTELLUNGEN",
        "setting_label_language": "Sprache",
        "setting_label_musicType": "Musiktyp",
        "setting_label_cardTextFontFamily": "Schriftart",
        "setting_label_cardTextDecorationLine": "Linientyp",
        "setting_label_cardTextDecoration": "Schriftstil (Linie)",
        "setting_label_cardTextDecorationThicc": "Linienstärke",
        "setting_label_fontSize": "Schriftgröße",
        "setting_label_cardOutsideShape": "Außenform Typ",
        "setting_label_cardShape": "Kartenform",
        "setting_label_neonCard": "Neon-Karte",
        "light_mode_warning": 'WARNUNG! Diese Option kann die Bildwiederholrate des Spiels beeinträchtigen.',
        "default": "Standard",
        "dashed": 'Gestrichelt',
        "dotted": 'Gepunktet',
        "wavy": 'Gewellt',
        "double": 'Doppelt',
        "old": 'Alt',
        "fantasy": 'Fantastisch',
        "scientific": 'Wissenschaftlich',
        "ancient": 'Antik',
        "weird": 'Seltsam',
        "none": 'Keine',
        "overline": 'Überstrich',
        "underline": 'Unterstrichen',
        "line_through": 'Durchgestrichen',
        "overline_and_underline": 'Überstrich & Unterstrichen',
        "square": 'Quadrat',
        "rectangle_horizontal": 'Rechteck (horizontal)',
        "rectangle_vertical": 'Rechteck (vertikal)',
        // ... Achievements and Trophies ...
        "ach_new_player": {
            name: "Neuer Spieler",
            desc: 'Willkommen im Spiel!'
        },
        "ach_first_combination": {
            name: "Habe ich es geschafft?",
            desc: 'Finde dein erstes Kartenpaar.'
        },
        "ach_first_special_card": {
            name: 'Was war das?',
            desc: 'Finde eine Spezialkarte.'
        },
        "ach_normal_mode_win": {
            name: 'Easyman',
            desc: 'Schlage den "einfach" Modus.'
        },
        "ach_hard_mode_win": {
            name: 'Hardman',
            desc: 'Schlage den "schwer" Modus.'
        },
        "ach_challenge_mode_win": {
            name: 'Herausforderer',
            desc: 'Schlage den "Herausforderung" Modus.'
        },
        "ach_extreme_mode_win": {
            name: 'Rächer',
            desc: 'Schlage den "extrem" Modus.'
        },
        "ach_pgn_finale_win": {
            name: 'Pgn\'s Laptop',
            desc: 'Schlage das Finale.'
        },
        "ach_beginner": {
            name: 'Anfänger',
            desc: 'Finde 10 Karten.',
        },
        "ach_10_tries": {
            name: 'Der tödliche Fehler',
            desc: 'Spiele 10 Versuche'
        },
        "ach_50_tries": {
            name: 'Noch ein bisschen und ich werde...',
            desc: 'Spiele 50 Versuche'
        },
        "ach_100_tries": {
            name: 'AAAAA',
            desc: 'Spiele 100 Versuche'
        },
        "ach_special_K_card": {
            name: ':)',
            desc: 'Finde die besondere "K"-Karte.'
        },
        'ach_win_any_20': {
            name: 'Out of RAM',
            desc: 'Gewinne 20 Mal',
        },
        'ach_win_any_50': {
            name: 'Spieler aus Kurdistan',
            desc: 'Gewinne 50 Mal',
        },
        'ach_lose_10': {
            name: 'Was zum Teufel',
            desc: 'Verliere 10 Mal',
        },
        'ach_lose_50': {
            name: 'Ich kenne das Alphabet!',
            desc: 'Verliere 50 Mal',
        },
        'ach_win_virus': {
            name: 'Ein wenig Klebeband schadet nicht',
            desc: 'Schlage den "Virus" Modus.',
        },
        'ach_score_100': {
            name: 'Hundert auf der Karte',
            desc: 'Sammle 100 Punkte'
        },
        'ach_somewhat_experienced': {
            name: "Erfahren",
            desc: 'Finde 50 Karten.',
        },
        'ach_2x05': {
            name: "Ich erinnere mich irgendwo daran..",
            desc: '???'
        },
        'ach_expert': {
            name: "Experte",
            desc: 'Finde 100 Karten.',
        },
        'ach_cross_card_found': {
            name: "Ruhe in Frieden",
            desc: "Finde die Karte mit dem Kreuz",
        },
        'ach_pgn_card_found': {
            name: "Wow",
            desc: "Der Titel erklärt alles.",
        },
        'ach_skill_issue': {
            name: "Skill Issue",
            desc: "Gewinne 3 Mal mit weniger als 10 Versuchen.",
        },
        'ach_boom_card_found': {
            name: "T r i a n g l e",
            desc: "Und du denkst, es gibt keinen 'schweren' Modus..",
        },
        'ach_xray_card_found': {
            name: 'Hacker!!11',
            desc: "WARUM HAST DU MEIN SPIEL GEHACKT!!11",
        },
        'ach_score_1k': {
            name: 'Du kennst mich nicht gut..',
            desc: "Sammle 1000 Punkte.",
        },
        'ach_pgn_finale_twice': {
            name: 'Die Rückkehr von Pgn',
            desc: 'Schlage das Finale zum zweiten Mal.',
        },
        'ach_impostor_card_found': {
            name: 'SkinWalker',
            desc: 'WAS STIMMT MIT DIESER KARTE NICHT?',
        },
        'ach_peter': {
            name: 'Genau wie Peter',
            desc: 'Finde 3 Kartenpaare hintereinander.',
        },
        'ach_timed_mode_win': {
            name: 'SREEEEEEED',
            desc: 'Schlage den "zeitlich begrenzten" Modus.',
        },
        'ach_timed_mode_slow_card': {
            name: 'Schildkrötenmann',
            desc: 'Finde die spezielle Karte, die die Zeit verlangsamt.',
        },
        'ach_timed_special_card': {
            name: 'Welche Uhr ist das?',
            desc: 'Finde die Uhr-Spezialkarte.',
        },
        'ach_memory_loss': {
            name: 'Gedächtnisverlust',
            desc: 'Fehler 404',
        },
        'ach_hunter': {
            name: 'Jäger',
            desc: 'Finde 15 Spezialkarten.',
        },
        'ach_sigma_card': {
            name: 'Σ.. von.. Sotiris?',
            desc: 'Finde das seltene Σ.',
        },
        'ach_deceiver': {
            name: 'Täuscher',
            desc: 'Finde 50 Spezialkarten.',
        },
        'ach_fantastic': {
            name: 'Fantastisch',
            desc: 'Gewinne ein Spiel im fantastischen Universum.',
        },
        'ach_win_hell': {
            name: 'ENERGIEGETRÄNK',
            desc: 'Beende den „Höllen“-Modus.'
        },
        'ach_lifesaver': {
            name: 'W A S',
            desc: 'ICH LEBE!!'
        },
        'ach_timed_mode_win_10': {
            name: 'Schneller geht\'s nicht!',
            desc: 'Schlagen Sie den „TIMED“-Modus 10 Mal durch.'
        },
        // ... Trophies ...
        'tr_master_of_cards': {
            name: 'Meister der Karten',
            desc: 'Finde 10000 Karten',
        },

        'tr_million_score': {
            name: 'Millionär',
            desc: 'Sammle 1000000 Punkte',
        },

        'tr_10k_tries': {
            name: 'Wiedehopf',
            desc: 'Spiele 10000 Versuche',
        },

        'tr_win_any_1k': {
            name: 'Finde den richtigen Lehrer',
            desc: 'Gewinne 1000 Mal',
        }
    }*/
];

// Μετάφρασε το όνομα της σελίδας
document.title = LANGUAGE_DATA[LANGUAGE_INDEX].page_title;
