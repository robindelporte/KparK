const PhoneUtils = {
    init: function(selector = 'input[type="tel"]') {
        document.addEventListener('DOMContentLoaded', function() {
            const phoneInput = document.querySelector(selector);
            if (phoneInput) {
                console.log('Champ téléphone trouvé, ajout des événements');
                this._attachEvents(phoneInput);
            } else {
                console.log('Aucun champ téléphone trouvé dans le formulaire');
            }
        }.bind(this));
    },

    _attachEvents: function(input) {
        input.addEventListener('input', () => {
            console.log('Événement input déclenché');
            this._handlePhoneNumber(input);
        });
        
        input.addEventListener('blur', () => {
            console.log('Événement blur déclenché');
            this._handlePhoneNumber(input);
        });
        
        input.form.addEventListener('submit', (e) => {
            console.log('Tentative de soumission du formulaire');
            if (!this._handlePhoneNumber(input)) {
                console.log('Soumission bloquée : numéro invalide');
                e.preventDefault();
                alert('Veuillez entrer un numéro de téléphone valide');
            } else {
                console.log('Formulaire valide, soumission autorisée');
            }
        });
    },

    _handlePhoneNumber: function(input) {
        console.log('--- Début du traitement ---');
        console.log('Valeur saisie :', input.value);
        
        const displayValue = input.value;
        console.log('Display value :', displayValue);
        
        let hiddenInput = this._getOrCreateHiddenInput(input.form);
        
        let normalizedNumber = this._normalizeNumber(displayValue);
        console.log('Numéro final formaté :', normalizedNumber);
        
        hiddenInput.value = normalizedNumber;
        console.log('Valeur du champ caché mise à jour :', hiddenInput.value);
        
        const isValid = this._validateNumber(displayValue);
        console.log('Numéro valide ?', isValid);
        
        input.classList.toggle('error', !isValid);
        
        console.log('--- Fin du traitement ---');
        return isValid;
    },

    _getOrCreateHiddenInput: function(form) {
        let hidden = form.querySelector('input[name="phone_normalized"]');
        if (!hidden) {
            console.log('Création du champ caché');
            hidden = document.createElement('input');
            hidden.type = 'hidden';
            hidden.name = 'phone_normalized';
            form.appendChild(hidden);
        }
        return hidden;
    },

    _normalizeNumber: function(value) {
        let normalized = value.replace(/[^\d+]/g, '');
        console.log('Après suppression caractères spéciaux :', normalized);
        
        normalized = normalized.replace(/^0/, '+33');
        console.log('Après conversion 0 en +33 :', normalized);
        
        if (normalized.startsWith('33')) {
            normalized = '+' + normalized;
            console.log('Ajout du + devant 33 :', normalized);
        }
        
        return normalized.replace(/(\+33)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5 $6');
    },

    _validateNumber: function(value) {
        return /^(?:\+33\s?|0)\d(?:\s?\d{2}){4}$/.test(value);
    }
};

// Export pour usage comme module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhoneUtils;
}
