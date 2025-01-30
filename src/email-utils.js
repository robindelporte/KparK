(function() {
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
            let hidden = form.querySelector('input[name="phone_normalized"]');
            if (!hidden) {
                hidden = document.createElement('input');
                hidden.type = 'hidden';
                hidden.name = 'phone_normalized';
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

    PhoneUtils.init();
})();
