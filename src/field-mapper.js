(function() {
    const FormUtils = {
        initFenetres: function() {
            // Gestionnaire pour le type d'ouverture
            document.querySelectorAll('[data-type-ouverture]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const prefix = e.target.getAttribute('data-type-prefix');
                    
                    // Mise à jour du name de l'input quantité
                    const quantityInput = e.target.closest('[data-fields-group]')
                        .querySelector('[data-quantity-input]');
                    if (quantityInput) {
                        quantityInput.name = `quantite${prefix}__c`;
                    }

                    // Mise à jour des names des radios matériaux
                    const materialsInputs = e.target.closest('[data-fields-group]')
                        .querySelectorAll('[data-material-input]');
                    materialsInputs.forEach(input => {
                        input.name = `materiaux${prefix}__c`;
                    });
                });
            });

            // Gestion du "10 et plus" pour le slider
            document.addEventListener('change', (e) => {
                if (!e.target.matches('input[type="range"]')) return;
                
                const rangeInput = e.target;
                const maxValue = parseFloat(rangeInput.max);
                const currentValue = parseFloat(rangeInput.value);
                
                if (currentValue === maxValue) {
                    const displayInput = rangeInput.parentElement.querySelector('input[type="text"]');
                    if (displayInput) {
                        displayInput.value = '10 et plus';
                    }
                }
            });
        },

        init: function() {
            this.initFenetres();
        }
    };

    // Auto-initialisation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => FormUtils.init());
    } else {
        FormUtils.init();
    }
})();
