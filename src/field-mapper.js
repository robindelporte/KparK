(function() {
    const FieldMapper = {
        init: function() {
            // Pour chaque groupe de radios qui contrôle le type
            document.querySelectorAll('input[type="radio"][name="typeOuverture"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const type = e.target.value; // "Fenetre", "Coulissant" ou "PorteFenetre"
                    
                    // Mise à jour du name de l'input quantité
                    const quantityInput = document.querySelector('[data-quantity-input]');
                    if (quantityInput) {
                        quantityInput.name = `quantite${type}__c`;
                        console.log('Quantity input name updated to:', quantityInput.name);
                    }

                    // Mise à jour des names des radios matériaux
                    const materialLabels = document.querySelectorAll('label[data-material-input]');
                    materialLabels.forEach(label => {
                        const input = label.querySelector('input[type="radio"]');
                        if (input) {
                            input.name = `materiaux${type}__c`;
                            input.setAttribute('data-name', `materiaux${type}__c`);
                            console.log('Material input name updated to:', input.name);
                        }
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
