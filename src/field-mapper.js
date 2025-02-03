(function() {
    const FormMapper = {
        handleWindows: function() {
            document.querySelectorAll('[data-fields-group="fenetre"] [data-type-ouverture] input[type="radio"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const type = e.target.value;
                    const group = e.target.closest('[data-fields-group]');
                    
                    if (!group) return;

                    // Mise à jour du name, data-name et id de l'input quantité
                    const quantityInput = group.querySelector('.fs-rangeslider_input');
                    if (quantityInput) {
                        const newName = `quantite${type}__c`;
                        quantityInput.name = newName;
                        quantityInput.setAttribute('data-name', newName);
                        quantityInput.id = newName;
                    }

                    // Mise à jour des names des radios matériaux
                    const materialInputs = group.querySelectorAll('[data-material-input] input[type="radio"]');
                    materialInputs.forEach(input => {
                        const newName = `materiaux${type}__c`;
                        input.name = newName;
                        input.setAttribute('data-name', newName);
                    });
                });
            });
        },

        handleShutters: function() {
            document.querySelectorAll('[data-fields-group="Volets"] input[name="typeVolet"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const type = e.target.value;
                    const group = e.target.closest('[data-fields-group]');
                    
                    if (!group) return;

                    // Mise à jour du name, data-name et id de l'input quantité
                    const quantityInput = group.querySelector('.fs-rangeslider_input');
                    if (quantityInput) {
                        const newName = `quantite${type}__c`;
                        quantityInput.name = newName;
                        quantityInput.setAttribute('data-name', newName);
                        quantityInput.id = newName;
                    }

                    // Mise à jour des names des radios matériaux
                    const materialRadios = group.querySelectorAll('input[type="radio"]:not([name="typeVolet"])');
                    materialRadios.forEach(input => {
                        const newName = `materiaux${type}__c`;
                        input.name = newName;
                        input.setAttribute('data-name', newName);
                    });
                });
            });
        },

        init: function() {
            this.handleWindows();
            this.handleShutters();
        }
    };

    // Auto-initialisation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => FormMapper.init());
    } else {
        FormMapper.init();
    }
})();
