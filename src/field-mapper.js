(function() {
    const FieldMapper = {
        initWindows: function() {
            document.querySelectorAll('[data-type-ouverture] input[type="radio"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const type = e.target.value;
                    const group = e.target.closest('[data-fields-group]');
                    
                    if (!group) return;
                    
                    const quantityInput = group.querySelector('.fs-rangeslider_input');
                    if (quantityInput) {
                        const newName = `quantite${type}__c`;
                        quantityInput.name = newName;
                        quantityInput.setAttribute('data-name', newName);
                        quantityInput.id = newName;
                    }

                    const materialInputs = group.querySelectorAll('[data-material-input] input[type="radio"]');
                    materialInputs.forEach(input => {
                        const newName = `materiaux${type}__c`;
                        input.name = newName;
                        input.setAttribute('data-name', newName);
                    });
                });
            });
        },

        initShutters: function() {
            document.querySelectorAll('[data-fields-group="Volets"] input[name="typeVolet"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const type = e.target.value;
                    const group = e.target.closest('[data-fields-group="Volets"]');
                    
                    if (!group) return;

                    const quantityInput = group.querySelector('.fs-rangeslider_input');
                    if (quantityInput) {
                        const newName = `quantite${type}__c`;
                        quantityInput.name = newName;
                        quantityInput.setAttribute('data-name', newName);
                        quantityInput.id = newName;
                    }

                    const materialLabels = group.querySelectorAll('.form_radio');
                    materialLabels.forEach(label => {
                        const input = label.querySelector('input[type="radio"]:not([name="typeVolet"])');
                        if (input) {
                            const newName = `materiaux${type}__c`;
                            input.name = newName;
                            input.setAttribute('data-name', newName);

                            const allowedTypes = label.getAttribute('data-material-allowed');
                            if (allowedTypes) {
                                label.style.display = allowedTypes.includes(type) ? 'block' : 'none';
                            }
                        }
                    });
                });
            });
        },

        initStores: function() {
            document.querySelectorAll('[data-fields-group="Stores"] input[name="typeStore"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const type = e.target.value;
                    const group = e.target.closest('[data-fields-group="Stores"]');
                    
                    if (!group) return;

                    const quantityInput = group.querySelector('.fs-rangeslider_input');
                    if (quantityInput) {
                        const newName = `quantite${type}__c`;
                        quantityInput.name = newName;
                        quantityInput.setAttribute('data-name', newName);
                        quantityInput.id = newName;
                    }
                });
            });
        },

        initDoors: function() {
    document.querySelectorAll('[data-fields-group="Portes"] input[name="typePorte"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const type = e.target.value;
            const group = e.target.closest('[data-fields-group="Portes"]');
            
            if (!group) return;

            // Update quantity input
            const quantityInput = group.querySelector('.fs-rangeslider_input');
            if (quantityInput) {
                const newName = `quantite${type}__c`;
                quantityInput.name = newName;
                quantityInput.setAttribute('data-name', newName);
                quantityInput.id = newName;
            }

            // Update material inputs and show/hide based on allowed types
            const materialLabels = group.querySelectorAll('.form_radio');
            materialLabels.forEach(label => {
                const input = label.querySelector('input[type="radio"]:not([name="typePorte"])');
                if (input) {
                    const newName = `materiaux${type}__c`;
                    input.name = newName;
                    input.setAttribute('data-name', newName);

                    // Handle conditional display based on allowed types
                    const allowedTypes = label.getAttribute('data-material-allowed');
                    if (allowedTypes) {
                        label.style.display = allowedTypes.includes(type) ? 'block' : 'none';
                    }
                }
            });
        });
    });
}
        initRangeSliders: function() {
            document.querySelectorAll('.fs-rangeslider_input').forEach(input => {
                const displayValueElement = input.closest('.fs-rangeslider_wrapper').querySelector('[fs-rangeslider-element="display-value"]');
                
                if (displayValueElement) {
                    const observer = new MutationObserver((mutations) => {
                        mutations.forEach((mutation) => {
                            if (mutation.type === 'characterData') {
                                const value = mutation.target.textContent;
                                if (value === '10') {
                                    displayValueElement.textContent = '10 et plus';
                                    input.value = '10 et plus';
                                }
                            }
                        });
                    });

                    observer.observe(displayValueElement, { characterData: true, subtree: true });
                }
            });
        },

        init: function() {
            this.initWindows();
            this.initShutters();
            this.initStores();
            this.initDoors();
            this.initRangeSliders();
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => FieldMapper.init());
    } else {
        FieldMapper.init();
    }
})();
