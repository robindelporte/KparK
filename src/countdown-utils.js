(function() {
    const CountdownUtils = {
        init: function() {
            console.log('CountdownUtils: Initialisation...');
            
            // Cherche l'élément qui contient la date de fin
            const countdownConfig = document.querySelector('[data-countdown-config]');
            console.log('Element de config trouvé:', countdownConfig);
            if (!countdownConfig) {
                console.log('Pas d\'élément avec data-countdown-config trouvé');
                return;
            }

            // Récupère la date depuis l'attribut
            const configDate = countdownConfig.getAttribute('data-countdown-config');
            console.log('Date de configuration:', configDate);
            const endDate = new Date(configDate).getTime();
            console.log('Date de fin en timestamp:', endDate);
            
            // Lance le countdown
            this._startCountdown(endDate);
        },

        _startCountdown: function(endDate) {
            const updateCountdown = () => {
                const now = new Date().getTime();
                const timeLeft = endDate - now;

                if (timeLeft < 0) {
                    console.log('Countdown terminé');
                    this._updateElements('00', '00', '00', '00');
                    return;
                }

                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                console.log('Mise à jour du countdown:', { days, hours, minutes, seconds });

                this._updateElements(
                    days.toString().padStart(2, '0'),
                    hours.toString().padStart(2, '0'),
                    minutes.toString().padStart(2, '0'),
                    seconds.toString().padStart(2, '0')
                );
            };

            // Mise à jour immédiate
            console.log('Démarrage du countdown');
            updateCountdown();
            
            // Démarrage de l'intervalle
            setInterval(updateCountdown, 1000);
        },

        _updateElements: function(days, hours, minutes, seconds) {
            const daysElements = document.querySelectorAll('[data-countdown-days]');
            const hoursElements = document.querySelectorAll('[data-countdown-hours]');
            const minutesElements = document.querySelectorAll('[data-countdown-minutes]');
            const secondsElements = document.querySelectorAll('[data-countdown-seconds]');

            console.log('Éléments trouvés:', {
                days: daysElements.length,
                hours: hoursElements.length,
                minutes: minutesElements.length,
                seconds: secondsElements.length
            });

            daysElements.forEach(el => el.textContent = days);
            hoursElements.forEach(el => el.textContent = hours);
            minutesElements.forEach(el => el.textContent = minutes);
            secondsElements.forEach(el => el.textContent = seconds);
        }
    };

    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => CountdownUtils.init());
    } else {
        CountdownUtils.init();
    }
})();
