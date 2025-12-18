
import { Pillar } from './types';

export const PILLARS: Record<'en' | 'el', Pillar[]> = {
  en: [
    {
      id: 1,
      title: "Nutritional Integrity",
      crisis: "The dominance of dry kibble in a water-scarce environment causes chronic dehydration and renal stress. Parasites further strip animals of nutrients.",
      infrastructure: "Install permanent, shaded Hydration Coupling Stations. Use self-refilling systems to ensure fresh water alongside food.",
      legal: "Mandate regular parasite treatment drives and funded water stations via Thessaloniki's Article 10 operational plan.",
      educational: "'Food is Water' campaign: Educating that nutrition, water, and cleanliness are a single system.",
      image: "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?auto=format&fit=crop&q=80&w=800",
      icon: "Droplets"
    },
    {
      id: 2,
      title: "Veterinary Care & Biosecurity",
      crisis: "Insufficient aid is the primary threat. Endemic Leishmania and uncontrolled reproduction create a cycle of suffering.",
      infrastructure: "Deploy Mobile Veterinary Clinics (MVCs) on fixed routes to hotspots for vaccination, deworming, and first aid.",
      legal: "Intensify enforcement of 'Sterilize or DNA' mandate. Use Argos funding for continuous care and Leishmania testing.",
      educational: "'Care Delayed is Care Denied': Normalizing vaccination and deworming as a protection, not a luxury.",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
      icon: "Stethoscope"
    },
    {
      id: 2,
      title: "Environmental Hygiene",
      crisis: "Lack of waste infrastructure creates a 'Sanitation-Mortality Nexus.' Accumulated feces spreads parasites and triggers social disgust.",
      infrastructure: "Establish a network of sanitation hotspots with bag dispensers and bins at parks and high-footfall routes.",
      legal: "Enforce fines for failure to clean excrement. Compel businesses to prevent strays from accessing waste.",
      educational: "'Hygiene Squad': Transforming hygiene from punishment into habit. Clean space = safe space.",
      image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800",
      icon: "Trash2"
    },
    {
      id: 4,
      title: "Safe Havens",
      crisis: "Shelters are currently 'warehouses' causing psychological collapse. Streets remain lethal due to traffic and poisoning.",
      infrastructure: "Adaptive reuse of abandoned buildings as micro-sanctuaries. Transition to a 'City-Based Sanctuary' model.",
      legal: "Strict enforcement of shelter specs (Article 28/29). Prioritize poisoning investigations and adoption platforms.",
      educational: "'Shelters are Not Enough': Promoting foster care and the 'adopt, don't wait' mentality.",
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=800",
      icon: "Home"
    }
  ],
  el: [
    {
      id: 1,
      title: "Διατροφική Ακεραιότητα",
      crisis: "Η κυριαρχία της ξηράς τροφής σε περιβάλλον με έλλειψη νερού προκαλεί χρόνια αφυδάτωση και νεφρικό στρες. Τα παράσιτα στερούν περαιτέρω θρεπτικά συστατικά.",
      infrastructure: "Εγκατάσταση μόνιμων, σκιερών Σταθμών Σύζευξης Ενυδάτωσης. Χρήση συστημάτων αυτόματης αναπλήρωσης για φρέσκο νερό δίπλα στην τροφή.",
      legal: "Επιβολή τακτικών δράσεων αποπαρασίτωσης και χρηματοδοτούμενων σταθμών νερού μέσω του επιχειρησιακού σχεδίου του Άρθρου 10 της Θεσσαλονίκης.",
      educational: "Καμπάνια 'Η Τροφή είναι Νερό': Εκπαίδευση ότι η διατροφή, το νερό και η καθαριότητα είναι ένα ενιαίο σύστημα.",
      image: "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?auto=format&fit=crop&q=80&w=800",
      icon: "Droplets"
    },
    {
      id: 2,
      title: "Κτηνιατρική Φροντίδα & Βιοασφάλεια",
      crisis: "Η ανεπαρκής βοήθεια είναι η κύρια απειλή. Η ενδημική Λεϊσμάνια και η ανεξέλεγκτη αναπαραγωγή δημιουργούν έναν κύκλο ταλαιπωρίας.",
      infrastructure: "Ανάπτυξη Κινητών Κτηνιατρικών Κλινικών (ΚΚΚ) σε σταθερές διαδρομές για εμβολιασμό, αποπαρασίτωση και πρώτες βοήθειες.",
      legal: "Εντατικοποίηση της επιβολής της εντολής 'Στείρωση ή DNA'. Χρήση χρηματοδότησης Άργος για συνεχή φροντίδα και έλεγχο Λεϊσμάνιας.",
      educational: "'Η Καθυστερημένη Φροντίδα είναι Άρνηση Φροντίδας': Κανονικοποίηση του εμβολιασμού και της αποπαρασίτωσης ως προστασία, όχι πολυτέλεια.",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
      icon: "Stethoscope"
    },
    {
      id: 3,
      title: "Περιβαλλοντική Υγιεινή",
      crisis: "Η έλλειψη υποδομών απορριμμάτων δημιουργεί έναν 'Κρίκο Σύνδεσης Υγιεινής-Θνησιμότητας'. Τα περιττώματα διασπείρουν παράσιτα και προκαλούν κοινωνική αποστροφή.",
      infrastructure: "Δημιουργία δικτύου σημείων υγιεινής με διανομείς σακουλών και κάδους σε πάρκα και διαδρομές υψηλής κυκλοφορίας.",
      legal: "Επιβολή προστίμων για τη μη καθαριότητα περιττωμάτων. Υποχρέωση των επιχειρήσεων να εμποδίζουν την πρόσβαση των αδέσποτων σε απορρίμματα.",
      educational: "'Ομάδα Υγιεινής': Μετατροπή της υγιεινής από τιμωρία σε συνήθεια. Καθαρός χώρος = ασφαλής χώρος.",
      image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800",
      icon: "Trash2"
    },
    {
      id: 4,
      title: "Ασφαλή Καταφύγια",
      crisis: "Τα καταφύγια είναι σήμερα 'αποθήκες' που προκαλούν ψυχολογική κατάρρευση. Οι δρόμοι παραμένουν θανατηφόροι λόγω της τροχαίας και των δηλητηριάσεων.",
      infrastructure: "Προσαρμοστική επαναχρησιμοποίηση εγκαταλελειμμένων κτιρίων ως μικρο-καταφύγια. Μετάβαση σε ένα μοντέλο 'Αστικού Καταφυγίου'.",
      legal: "Αυστηρή επιβολή προδιαγραφών καταφυγίων (Άρθρα 28/29). Προτεραιότητα στη διερεύνηση δηλητηριάσεων και πλατφόρμες υιοθεσίας.",
      educational: "'Τα Καταφύγια δεν Αρκούν': Προώθηση της φιλοξενίας και της νοοτροπίας 'υιοθέτησε, μην περιμένεις'.",
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=800",
      icon: "Home"
    }
  ]
};

export const FIVE_FREEDOMS: Record<'en' | 'el', string[]> = {
  en: [
    "Freedom from hunger and thirst",
    "Freedom from discomfort",
    "Freedom from pain, injury and disease",
    "Freedom to express normal behavior",
    "Freedom from fear and distress"
  ],
  el: [
    "Ελευθερία από την πείνα και τη δίψα",
    "Ελευθερία από την ταλαιπωρία",
    "Ελευθερία από τον πόνο, τον τραυματισμό και τις ασθένειες",
    "Ελευθερία έκφρασης φυσιολογικής συμπεριφοράς",
    "Ελευθερία από τον φόβο και την αγωνία"
  ]
};

export const TRANSLATIONS: Record<'en' | 'el', any> = {
  en: {
    nav_title: "ENSURING INTEGRITY",
    contact_btn: "Contact Us",
    hero_badge: "A Call for Systemic Change",
    hero_title: "Protecting the Shared Welfare of ",
    hero_desc: "Thessaloniki is a city defined by the shared spaces between its citizens—a definition that inherently includes its stray animal population.",
    hero_cta: "Join Signatories",
    hero_read: "Read the Manifesto",
    stats_signed: "People have signed. Help us reach our goal of ",
    stats_reached: "Reached",
    stats_share: "Share to boost momentum",
    manifesto_title: "From Managed Neglect to Welfare Integrity",
    manifesto_p1: "For too long, Thessaloniki's approach to companion animal welfare has been a cycle of reactive crisis management, defined by insufficiency and silent suffering.",
    manifesto_p2: "This manifesto rejects the current paradigm. We believe that the well-being of stray animals is inextricably linked to public health, ethical standing, and the overall liveability of our city.",
    manifesto_quote: "This is not a request for charity; it is a declaration of necessary action.",
    pillars_title: "The Four Priority Pillars",
    pillars_desc: "Our immediate, comprehensive strategy across four fundamental pillars to guarantee basic needs for every animal on our streets.",
    vision_title: "Read the Full Vision",
    tab_pillars: "The Pillars",
    tab_full: "Full Manifesto",
    vision_sub: "Vision for Thessaloniki",
    vision_desc: "To transition Thessaloniki from a Paradigm of Managed Neglect to a standard of Welfare Integrity. We demand a municipality where the basic levels of 'Five Freedoms' and 'Five Needs' of companion animals are guaranteed through integrated urban planning, legal accountability, and cultural empathy.",
    about_title: "About the Organizers",
    about_p1: "Founded in 1999, EERco evolved from a professional performance group into an NGO dedicated to inclusive culture and social innovation.",
    about_p2: "With Skyrthalia vol. II – Pawsitive Parks (Thessaloniki, Dec 2025), we are tackling the city’s urgent stray animal crisis.",
    about_p3: "By combining green urban practices with direct animal care and advocacy, our volunteers work to combat neglect and improve the quality of life for Thessaloniki’s most vulnerable inhabitants.",
    about_footer: "United for Thessaloniki's Animals",
    form_title: "Take the Pledge",
    form_desc: "By signing this petition, you are demanding that the Municipality of Thessaloniki adopts the 'Ensuring Integrity' manifesto as its core operational strategy.",
    form_label_name: "Full Name",
    form_label_email: "Email Address",
    form_label_loc: "Neighborhood / Location",
    form_label_comment: "Why is this important to you? (Optional)",
    form_submit: "Confirm Signature",
    form_success_h: "Thank you for your integrity!",
    form_success_p: "Your signature has been added. Help us reach the finish line by sharing with friends.",
    recent_sig: "Recent Signatures",
    live_updates: "Live Updates",
    manifesto_crisis: "The Crisis",
    manifesto_infra: "Infrastructure",
    manifesto_legal: "Legal & Enforcement",
    manifesto_edu: "Education"
  },
  el: {
    nav_title: "ΔΙΑΣΦΑΛΙΣΗ ΑΚΕΡΑΙΟΤΗΤΑΣ",
    contact_btn: "Επικοινωνία",
    hero_badge: "Κάλεσμα για Συστημική Αλλαγή",
    hero_title: "Προστατεύοντας την Κοινή Ευημερία της ",
    hero_desc: "Η Θεσσαλονίκη είναι μια πόλη που ορίζεται από τους κοινόχρηστους χώρους μεταξύ των πολιτών της—ένας ορισμός που εγγενώς περιλαμβάνει τον πληθυσμό των αδέσποτων ζώων της.",
    hero_cta: "Γίνετε μέλος",
    hero_read: "Διαβάστε το Μανιφέστο",
    stats_signed: "Άτομα έχουν υπογράψει. Βοηθήστε μας να φτάσουμε τον στόχο των ",
    stats_reached: "Επιτεύχθηκε",
    stats_share: "Μοιραστείτε για να ενισχύσετε την προσπάθεια",
    manifesto_title: "Από τη Διαχειριζόμενη Παραμέληση στην Ακεραιότητα Ευημερίας",
    manifesto_p1: "Για πάρα πολύ καιρό, η προσέγγιση της Θεσσαλονίκης για την ευημερία των ζώων συντροφιάς ήταν ένας κύκλος αντιδραστικής διαχείρισης κρίσεων, που χαρακτηριζόταν από ανεπάρκεια και σιωπηρή ταλαιπωρία.",
    manifesto_p2: "Αυτό το μανιφέστο απορρίπτει το τρέχον παράδειγμα. Πιστεύουμε ότι η ευημερία των αδέσποτων ζώων είναι άρρηκτα συνδεδεμένη με τη δημόσια υγεία, το ηθικό επίπεδο και τη συνολική βιωσιμότητα της πόλης μας.",
    manifesto_quote: "Αυτό δεν είναι αίτημα για φιλανθρωπία· είναι δήλωση αναγκαίας δράσης.",
    pillars_title: "Οι Τέσσερις Πυλώνες Προτεραιότητας",
    pillars_desc: "Η άμεση, ολοκληρωμένη στρατηκή μας σε τέσσερις θεμελιώδεις πυλώνες για τη διασφάλιση των βασικών αναγκών για κάθε ζώο στους δρόμους μας.",
    vision_title: "Διαβάστε το Πλήρες Όραμα",
    tab_pillars: "Οι Πυλώνες",
    tab_full: "Πλήρες Μανιφέστο",
    vision_sub: "Όραμα για τη Θεσσαλονίκη",
    vision_desc: "Η μετάβαση της Θεσσαλονίκης από ένα Παράδειγμα Διαχειριζόμενης Παραμέλησης σε ένα πρότυπο Ακεραιότητας Ευημερίας. Απαιτούμε έναν δήμο όπου τα βασικά επίπεδα των 'Πέντε Ελευθεριών' και των 'Πέντε Αναγκών' των ζώων συντροφιάς είναι εγγυημένα.",
    about_title: "Σχετικά με τους Διοργανωτές",
    about_p1: "Ιδρύθηκε το 1999 και εξελίχθηκε από μια επαγγελματική καλλιτεχνική ομάδα σε μια ΜΚΟ αφιερωμένη στον συμπεριληπτικό πολιτισμό και την κοινωνική καινοτομία.",
    about_p2: "Με το πρόγραμμα Skyrthalia vol. II – Pawsitive Parks (Θεσσαλονίκη, Δεκέμβριος 2025), αντιμετωπίζουμε την επείγουσα κρίση των αδέσποτων ζώων της πόλης μας.",
    about_p3: "Συνδυάζοντας πράσινες αστικές πρακτικές με άμεση φροντίδα και προάσπιση των ζώων, οι εθελοντές μας εργάζονται για την καταπολέμηση της παραμέλησης και τη βελτίωση της ποιότητας ζωής για τους πιο ευάλωτους κατοίκους της Θεσσαλονίκης.",
    about_footer: "Ενωμένοι για τα ζώα της Θεσσαλονίκης",
    form_title: "Πάρτε τη Δέσμευση",
    form_desc: "Υπογράφοντας αυτό το αίτημα, ζητάτε από τον Δήμο Θεσσαλονίκης να υιοθετήσει το μανιφέστο 'Διασφάλιση Ακεραιότητας' ως τη βασική επιχειρησιακή στρατηγική του.",
    form_label_name: "Ονοματεπώνυμο",
    form_label_email: "Διεύθυνση Email",
    form_label_loc: "Γειτονιά / Περιοχή",
    form_label_comment: "Γιατί είναι σημαντικό για εσάς; (Προαιρετικό)",
    form_submit: "Επιβεβαίωση Υπογραφής",
    form_success_h: "Σας ευχαριστούμε για την ακεραιότητά σας!",
    form_success_p: "Η υπογραφή σας προστέθηκε. Βοηθήστε μας να φτάσουμε στη γραμμή τερματισμού κοινοποιώντας το στους φίλους σας.",
    recent_sig: "Πρόσφατες Υπογραφές",
    live_updates: "Ζωντανές Ενημερώσεις",
    manifesto_crisis: "Η Κρίση",
    manifesto_infra: "Υποδομή",
    manifesto_legal: "Νομικά & Επιβολή",
    manifesto_edu: "Εκπαίδευση"
  }
};
