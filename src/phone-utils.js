(function() {
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
            let hidden = form.querySelector('input[name="email_normalized"]');
            if (!hidden) {
                hidden = document.createElement('input');
                hidden.type = 'hidden';
                hidden.name = 'email_normalized';
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

    EmailUtils.init();
})();
