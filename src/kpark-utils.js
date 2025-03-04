(function() {
    // Utilitaire pour les validations d'email
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
                // Si non trouvé, chercher email_normalized
                hidden = form.querySelector('input[name="email_normalized"]');
                if (!hidden) {
                    // Si toujours pas trouvé, créer avec emailCompte__c
                    hidden = document.createElement('input');
                    hidden.type = 'hidden';
                    hidden.name = 'emailCompte__c';
                    form.appendChild(hidden);
                }
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

    // Utilitaire pour les validations de téléphone
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
                // Si non trouvé, chercher phone_normalized
                hidden = form.querySelector('input[name="phone_normalized"]');
                if (!hidden) {
                    // Si toujours pas trouvé, créer avec telephoneDomicileCompte__c
                    hidden = document.createElement('input');
                    hidden.type = 'hidden';
                    hidden.name = 'telephoneDomicileCompte__c';
                    form.appendChild(hidden);
                }
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

    // Utilitaire pour la validation des checkbox
    const CheckboxUtils = {
        init: function() {
            const form = document.getElementById('myForm');
            if (!form) return;

            const checkboxGroup = document.getElementById('chkGroup');
            const errorMessage = document.querySelector('.checkbox-error');
            
            if (!checkboxGroup || !errorMessage) return;

            errorMessage.style.display = 'none';

            form.addEventListener('submit', (e) => {
                const checkboxes = checkboxGroup.querySelectorAll('input[type="checkbox"]');
                const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
                if (!isChecked) {
                    e.preventDefault();
                    errorMessage.style.display = 'flex';
                }
            });

            checkboxGroup.addEventListener('change', (e) => {
                if (e.target.type === 'checkbox' && e.target.checked) {
                    errorMessage.style.display = 'none';
                }
            });
        }
    };

    // Utilitaire pour l'affichage conditionnel
    const ConditionalDisplay = {
        init: function() {
            this._initializeGroups();
            this._attachEvents();
        },

        _attachEvents: function() {
            document.addEventListener('change', (e) => {
                setTimeout(() => {
                    this._updateAllGroups();
                }, 50);
            });
        },

        _initializeGroups: function() {
            document.querySelectorAll('[data-fields-group]').forEach(group => {
                group.style.display = 'none';
            });
            
            this._updateAllGroups();
        },

        _updateAllGroups: function() {
            document.querySelectorAll('input[data-related-group]').forEach(input => {
                const checkboxDiv = input.previousElementSibling;
                if (!checkboxDiv) return;

                const isChecked = checkboxDiv.classList.contains('w--redirected-checked');
                const groupId = input.getAttribute('data-related-group');
                this._toggleGroup(groupId, isChecked);
            });
        },

        _toggleGroup: function(groupId, show) {
            const group = document.querySelector(`[data-fields-group="${groupId}"]`);
            if (!group) return;

            group.style.display = show ? 'flex' : 'none';
            
            if (!show) {
                this._resetFieldsInGroup(group);
            }
        },

        _resetFieldsInGroup: function(group) {
            group.querySelectorAll('input').forEach(input => {
                const customInput = input.previousElementSibling;
                if (customInput && customInput.classList.contains('w-checkbox-input')) {
                    customInput.classList.remove('w--redirected-checked');
                } else if (customInput && customInput.classList.contains('w-radio-input')) {
                    customInput.classList.remove('w--redirected-checked');
                }
                input.checked = false;
            });

            group.querySelectorAll('select').forEach(select => {
                select.selectedIndex = 0;
            });
        }
    };

    // Utilitaire pour le compte à rebours
    const CountdownUtils = {
        init: function() {
            const countdownConfig = document.querySelector('[data-countdown-config]');
            if (!countdownConfig) return;

            const endDate = new Date(countdownConfig.getAttribute('data-countdown-config')).getTime();
            this._startCountdown(endDate);
        },

        _startCountdown: function(endDate) {
            const updateCountdown = () => {
                const now = new Date().getTime();
                const timeLeft = endDate - now;

                if (timeLeft < 0) {
                    this._updateElements('00', '00', '00', '00');
                    return;
                }

                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                this._updateElements(
                    days.toString().padStart(2, '0'),
                    hours.toString().padStart(2, '0'),
                    minutes.toString().padStart(2, '0'),
                    seconds.toString().padStart(2, '0')
                );
            };

            updateCountdown();
            setInterval(updateCountdown, 1000);
        },

        _updateElements: function(days, hours, minutes, seconds) {
            document.querySelectorAll('[data-countdown-days]')
                .forEach(el => el.textContent = days);
            document.querySelectorAll('[data-countdown-hours]')
                .forEach(el => el.textContent = hours);
            document.querySelectorAll('[data-countdown-minutes]')
                .forEach(el => el.textContent = minutes);
            document.querySelectorAll('[data-countdown-seconds]')
                .forEach(el => el.textContent = seconds);
        }
    };

    // Auto-initialisation des utilitaires (sans CheckboxUtils et ConditionalDisplay)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            EmailUtils.init();
            PhoneUtils.init();
            CountdownUtils.init();
        });
    } else {
        EmailUtils.init();
        PhoneUtils.init();
        CountdownUtils.init();
    }
})();
