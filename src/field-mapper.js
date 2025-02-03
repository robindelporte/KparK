(function() {
    const FieldMapper = {
        initWindows: function() {
            document.querySelectorAll('[data-type-ouverture] input[type="radio"]').forEach(radio => {
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
                        console.log('Quantity input updated:', {
                            name: quantityInput.name,
                            dataName: quantityInput.getAttribute('data-name'),
                            id: quantityInput.id
                        });
                    }
                    // Mise à jour des names des radios matériaux
                    const materialInputs = group.querySelectorAll('[data-material-input] input[type="radio"]');
                    materialInputs.forEach(input => {
                        const newName = `materiaux${type}__c`;
                        input.name = newName;
                        input.setAttribute('data-name', newName);
                        console.log('Material input name updated to:', newName);
                    });
                });
            });
        },

        initShutters: function() {
            // Gestion spécifique pour les volets
            document.querySelectorAll('[data-fields-group="Volets"] input[name="typeVolet"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    console.log('Volet radio changed:', e.target.value);
                    const type = e.target.value;
                    const group = e.target.closest('[data-fields-group="Volets"]');
                    
                    if (!group) return;

                    // Mise à jour de l'input quantité pour les volets
                    const quantityInput = group.querySelector('.fs-rangeslider_input');
                    if (quantityInput) {
                        const newName = `quantite${type}__c`;
                        quantityInput.name = newName;
                        quantityInput.setAttribute('data-name', newName);
                        quantityInput.id = newName;
                        console.log('Volet quantity updated:', newName);
                    }

                    // Mise à jour des radios matériaux pour les volets
                    const materialRadios = group.querySelectorAll('.form_radio input[type="radio"]:not([name="typeVolet"])');
                    materialRadios.forEach(input => {
                        const newName = `materiaux${type}__c`;
                        input.name = newName;
                        input.setAttribute('data-name', newName);
                        console.log('Volet material updated:', newName);
                    });
                });
            });
        },

        initStores: function() {
            document.querySelectorAll('[data-fields-group="Stores"] input[name="typeStore"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    console.log('Store radio changed:', e.target.value);
                    const type = e.target.value;
                    const group = e.target.closest('[data-fields-group="Stores"]');
                    
                    if (!group) return;

                    // Mise à jour de l'input quantité pour les stores
                    const quantityInput = group.querySelector('.fs-rangeslider_input');
                    if (quantityInput) {
                        const newName = `quantite${type}__c`;
                        quantityInput.name = newName;
                        quantityInput.setAttribute('data-name', newName);
                        quantityInput.id = newName;
                        console.log('Store quantity updated:', newName);
                    }
                });
            });
        },

    initDoors: function() {
            document.querySelectorAll('[data-fields-group="Portes"] input[name="typePorte"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const type = e.target.value;
                    const group = e.target.closest('[data-fields-group="portes"]');
                    
                    if (!group) return;

                    const quantityInput = group.querySelector('.fs-rangeslider_input');
                    if (quantityInput) {
                        const newName = `quantitePorte${type}__c`;
                        quantityInput.name = newName;
                        quantityInput.setAttribute('data-name', newName);
                        quantityInput.id = newName;
                        console.log('Door quantity updated:', newName);
                    }
                });
            });
        },

    init: function() {
            this.initWindows();
            this.initShutters();
            this.initStores();
            this.initDoors();
        }
    };

    // Auto-initialisation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => FieldMapper.init());
    } else {
        FieldMapper.init();
    }
})();
