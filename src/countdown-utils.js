(function() {
    const CountdownUtils = {
        init: function() {
            // Cherche l'élément qui contient la date de fin
            const countdownConfig = document.querySelector('[data-countdown-config]');
            if (!countdownConfig) return;

            // Récupère la date depuis l'attribut
            const endDate = new Date(countdownConfig.getAttribute('data-countdown-config')).getTime();
            
            // Lance le countdown
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

            // Mise à jour immédiate et démarrage de l'intervalle
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

    CountdownUtils.init();
})();
