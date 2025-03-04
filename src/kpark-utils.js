// Modification de l'utilitaire EmailUtils
const EmailUtils = {
    init: function() {
        const emailInputs = document.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            if (input) {
                this._attachEvents(input);
            }
        });
    },

    _attachEvents: function(input) {
        input.addEventListener('input', () => {
            this._handleEmail(input);
        });
        
        input.addEventListener('blur', () => {
            this._handleEmail(input);
        });
        
        input.form.addEventListener('submit', (e) => {
            if (!this._handleEmail(input)) {
                e.preventDefault();
                alert('Veuillez entrer une adresse email valide');
            }
        });
    },

    _handleEmail: function(input) {
        const displayValue = input.value;
        let hiddenInput = this._getOrCreateHiddenInput(input.form);
        let normalizedEmail = this._normalizeEmail(displayValue);
        hiddenInput.value = normalizedEmail;
        
        const isValid = this._validateEmail(displayValue);
        input.classList.toggle('error', !isValid);
        return isValid;
    },

    _getOrCreateHiddenInput: function(form) {
        // Chercher d'abord le champ existant emailCompte__c
        let hidden = form.querySelector('input[name="emailCompte__c"]');
        if (!hidden) {
            // Si non trouvé, créer un nouveau (cas de fallback)
            hidden = document.createElement('input');
            hidden.type = 'hidden';
            hidden.name = 'emailCompte__c';
            form.appendChild(hidden);
        }
        return hidden;
    },

    _normalizeEmail: function(value) {
        return value.trim().toLowerCase();
    },

    _validateEmail: function(value) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
    }
};

// Modification de l'utilitaire PhoneUtils
const PhoneUtils = {
    init: function() {
        const phoneInput = document.querySelector('input[type="tel"]');
        if (phoneInput) {
            this._attachEvents(phoneInput);
        }
    },

    _attachEvents: function(input) {
        input.addEventListener('input', () => {
            this._handlePhoneNumber(input);
        });
        
        input.addEventListener('blur', () => {
            this._handlePhoneNumber(input);
        });
        
        input.form.addEventListener('submit', (e) => {
            if (!this._handlePhoneNumber(input)) {
                e.preventDefault();
                alert('Veuillez entrer un numéro de téléphone valide');
            }
        });
    },

    _handlePhoneNumber: function(input) {
        const displayValue = input.value;
        let hiddenInput = this._getOrCreateHiddenInput(input.form);
        let normalizedNumber = this._normalizeNumber(displayValue);
        hiddenInput.value = normalizedNumber;
        
        const isValid = this._validateNumber(displayValue);
        input.classList.toggle('error', !isValid);
        return isValid;
    },

    _getOrCreateHiddenInput: function(form) {
        // Chercher d'abord le champ telephoneDomicileCompte__c
        let hidden = form.querySelector('input[name="telephoneDomicileCompte__c"]');
        if (!hidden) {
            // Si non trouvé, créer un nouveau (cas de fallback)
            hidden = document.createElement('input');
            hidden.type = 'hidden';
            hidden.name = 'telephoneDomicileCompte__c';
            form.appendChild(hidden);
        }
        return hidden;
    },

    _normalizeNumber: function(value) {
        let normalized = value.replace(/[^\d+]/g, '');
        normalized = normalized.replace(/^0/, '+33');
        
        if (normalized.startsWith('33')) {
            normalized = '+' + normalized;
        }
        
        return normalized.replace(/(\+33)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5 $6');
    },

    _validateNumber: function(value) {
        return /^(?:\+33\s?|0)\d(?:\s?\d{2}){4}$/.test(value);
    }
};
