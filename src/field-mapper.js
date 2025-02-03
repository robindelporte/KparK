(function() {
    const FieldMapper = {
        init: function() {
            // Écouter les changements sur les radios de type d'ouverture
            document.querySelectorAll('[data-type-ouverture] input[type="radio"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const type = e.target.value; // "Fenetre", "Coulissant" ou "PorteFenetre"
                    const group = e.target.closest('[data-fields-group]');
                    
                    if (!group) return;

                    // Mise à jour du name de l'input quantité
                    const quantityInput = group.querySelector('.fs-rangeslider_input');
                    if (quantityInput) {
                        quantityInput.name = `quantite${type}__c`;
                        quantityInput.setAttribute('data-name', `quantite${type}__c`);
                        console.log('Quantity input name updated to:', quantityInput.name);
                    }

                    // Mise à jour des names des radios matériaux
                    const materialLabels = group.querySelectorAll('[data-material-input] input[type="radio"]');
                    materialLabels.forEach(input => {
                        input.name = `materiaux${type}__c`;
                        input.setAttribute('data-name', `materiaux${type}__c`);
                        console.log('Material input name updated to:', input.name);
                    });
                });
            });
        }
    };

    // Auto-initialisation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => FieldMapper.init());
    } else {
        FieldMapper.init();
    }
})();
