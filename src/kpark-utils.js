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
            // Vérification de la validité pendant la saisie (sans modifier la valeur)
            input.addEventListener('input', () => {
                const isValid = this._validateEmail(input.value);
                input.classList.toggle('error', !isValid);
            });
            
            input.addEventListener('blur', () => {
                const isValid = this._validateEmail(input.value);
                input.classList.toggle('error', !isValid);
            });
            
            // Normaliser seulement au moment de la soumission
            if (input.form) {
                input.form.addEventListener('submit', (e) => {
                    const isValid = this._validateEmail(input.value);
                    if (!isValid) {
                        e.preventDefault();
                        alert('Veuillez entrer une adresse email valide');
                    } else {
                        // Normaliser l'email au moment de la soumission
                        input.value = this._normalizeEmail(input.value);
                    }
                });
            }
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
            const phoneInputs = document.querySelectorAll('input[type="tel"]');
            phoneInputs.forEach(input => {
                if (input) {
                    this._attachEvents(input);
                }
            });
        },

        _attachEvents: function(input) {
            // Vérification de la validité pendant la saisie (sans modifier la valeur)
            input.addEventListener('input', () => {
                const isValid = this._validateNumber(input.value);
                input.classList.toggle('error', !isValid);
            });
            
            input.addEventListener('blur', () => {
                const isValid = this._validateNumber(input.value);
                input.classList.toggle('error', !isValid);
            });
            
            // Normaliser seulement au moment de la soumission
            if (input.form) {
                input.form.addEventListener('submit', (e) => {
                    const isValid = this._validateNumber(input.value);
                    if (!isValid) {
                        e.preventDefault();
                        alert('Veuillez entrer un numéro de téléphone valide');
                    } else {
                        // Étape cruciale : normaliser le téléphone juste avant l'envoi
                        const normalizedValue = this._normalizeNumber(input.value);
                        console.log('Normalizing phone from', input.value, 'to', normalizedValue);
                        input.value = normalizedValue;
                    }
                }, true); // Le true est pour capturer l'événement en mode capture
            }
        },

        _normalizeNumber: function(value) {
            // Supprimer tous les caractères non numériques sauf "+"
            let normalized = value.replace(/[^\d+]/g, '');
            
            // Si commence par 0, remplacer par +33
            if (normalized.startsWith('0')) {
                normalized = '+33' + normalized.substring(1);
            }
            
            // Si commence par 33 sans +, ajouter le +
            else if (normalized.startsWith('33') && !normalized.startsWith('+')) {
                normalized = '+' + normalized;
            }
            
            // Appliquer le format avec espaces
            // Match +33 suivi de 9 chiffres et les formatte
            if (/^\+33\d{9}$/.test(normalized)) {
                normalized = normalized.replace(/(\+33)(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5 $6');
            }
            
            return normalized;
        },

        _validateNumber: function(value) {
            // Accepte les formats:
            // 0769454696
            // 07 69 45 46 96
            // +33769454696
            // +33 7 69 45 46 96
            return /^(?:(?:\+33|0)\s?[1-9](?:\s?\d{2}){4})$/.test(value);
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
