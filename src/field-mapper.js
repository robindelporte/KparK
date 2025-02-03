(function() {
    const FieldMapper = {
        init: function() {
            // Surveiller les clics sur les labels radio
            document.addEventListener('click', (e) => {
                const radioLabel = e.target.closest('label[data-type-prefix]');
                if (!radioLabel) return;

                // Attendre que Webflow mette à jour la classe
                setTimeout(() => {
                    // Vérifier si ce radio est sélectionné
                    const isChecked = radioLabel.querySelector('.w-radio-input').classList.contains('w--redirected-checked');
                    if (!isChecked) return;

                    // Récupérer le type depuis data-type-prefix
                    const type = radioLabel.getAttribute('data-type-prefix');
                    console.log('Type sélectionné:', type);

                    // Mise à jour du name de l'input quantité
                    const quantityInput = document.querySelector('[data-quantity-input]');
                    if (quantityInput) {
                        quantityInput.name = `quantite${type}__c`;
                        console.log('Quantity input name updated to:', quantityInput.name);
                    }

                    // Mise à jour des names de tous les radios matériaux
                    const materialInputs = document.querySelectorAll('[data-material-input]');
                    materialInputs.forEach(input => {
                        input.name = `materiaux${type}__c`;
                        console.log('Material input name updated to:', input.name);
                    });
                }, 50); // Petit délai pour laisser Webflow mettre à jour les classes
            });

            // Vérifier l'état initial au chargement
            const checkedRadio = document.querySelector('label[data-type-prefix] .w-radio-input.w--redirected-checked');
            if (checkedRadio) {
                const type = checkedRadio.closest('label').getAttribute('data-type-prefix');
                const quantityInput = document.querySelector('[data-quantity-input]');
                if (quantityInput) {
                    quantityInput.name = `quantite${type}__c`;
                }
                const materialInputs = document.querySelectorAll('[data-material-input]');
                materialInputs.forEach(input => {
                    input.name = `materiaux${type}__c`;
                });
            }
        }
    };

    // Auto-initialisation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => FieldMapper.init());
    } else {
        FieldMapper.init();
    }
})();
