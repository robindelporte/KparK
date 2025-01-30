console.log('EmailUtils: Script chargé');

(function() {
    console.log('EmailUtils: IIFE démarré');
    
    const EmailUtils = {
        init: function() {
            console.log('EmailUtils: Initialisation...');
            
            const emailInputs = document.querySelectorAll('input[type="email"]');
            console.log('EmailUtils: Recherche inputs email :', emailInputs);
            
            emailInputs.forEach(input => {
                if (input) {
                    console.log('EmailUtils: Champ email trouvé, ajout des événements');
                    this._attachEvents(input);
                }
            });
        },

        _attachEvents: function(input) {
            input.addEventListener('input', () => {
                console.log('Événement input déclenché');
                this._handleEmail(input);
            });
            
            input.addEventListener('blur', () => {
                console.log('Événement blur déclenché');
                this._handleEmail(input);
            });
            
            input.form.addEventListener('submit', (e) => {
                console.log('Tentative de soumission du formulaire');
                if (!this._handleEmail(input)) {
                    console.log('Soumission bloquée : email invalide');
                    e.preventDefault();
                    alert('Veuillez entrer une adresse email valide');
                } else {
                    console.log('Formulaire valide, soumission autorisée');
                }
            });
        },

        _handleEmail: function(input) {
            console.log('--- Début du traitement ---');
            console.log('Valeur saisie :', input.value);
            
            const displayValue = input.value;
            console.log('Display value :', displayValue);
            
            let hiddenInput = this._getOrCreateHiddenInput(input.form);
            
            let normalizedEmail = this._normalizeEmail(displayValue);
            console.log('Email final formaté :', normalizedEmail);
            
            hiddenInput.value = normalizedEmail;
            console.log('Valeur du champ caché mise à jour :', hiddenInput.value);
            
            const isValid = this._validateEmail(displayValue);
            console.log('Email valide ?', isValid);
            
            input.classList.toggle('error', !isValid);
            
            console.log('--- Fin du traitement ---');
            return isValid;
        },

        _getOrCreateHiddenInput: function(form) {
            let hidden = form.querySelector('input[name="email_normalized"]');
            if (!hidden) {
                console.log('Création du champ caché');
                hidden = document.createElement('input');
                hidden.type = 'hidden';
                hidden.name = 'email_normalized';
                form.appendChild(hidden);
            }
            return hidden;
        },

        _normalizeEmail: function(value) {
            // Suppression des espaces et conversion en minuscules
            return value.trim().toLowerCase();
        },

        _validateEmail: function(value) {
            // Regex standard pour validation email
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(value);
        }
    };

    // Auto-initialisation
    console.log('EmailUtils: Lancement initialisation');
    EmailUtils.init();
})();
