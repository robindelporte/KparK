(function() {
    const resetObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const element = mutation.target;
                if (element.style.display === 'none') {
                    // Réinitialiser les radios
                    element.querySelectorAll('input[type="radio"]').forEach(input => {
                        const customInput = input.previousElementSibling;
                        if (customInput) {
                            customInput.classList.remove('w--redirected-checked');
                        }
                        input.checked = false;
                        input.name = '';
                        input.setAttribute('data-name', '');
                    });

                    // Réinitialiser les sliders
                    element.querySelectorAll('.fs-rangeslider_input').forEach(input => {
                        input.value = '0';
                        input.name = '';
                        input.setAttribute('data-name', '');
                    });
                }
            }
        });
    });

    const FieldMapper = {
        _handleGroupChange: function(group, selectedType, prefix) {
            const quantityInput = group.querySelector(`.fs-rangeslider_input[id^="quantite${selectedType}"]`);
            const quantity = quantityInput ? parseInt(quantityInput.value) : 0;

            if (quantity === 0) {
                // Si quantité = 0, retirer les names
                if (quantityInput) {
                    quantityInput.name = '';
                    quantityInput.setAttribute('data-name', '');
                }

                // Retirer les names des matériaux
                group.querySelectorAll(`input[name^="materiaux${selectedType}"]`).forEach(input => {
                    input.name = '';
                    input.setAttribute('data-name', '');
                });
            } else {
                // Si quantité > 0, mettre à jour les names
                if (quantityInput) {
                    const newName = `quantite${selectedType}__c`;
                    quantityInput.name = newName;
                    quantityInput.setAttribute('data-name', newName);
                    quantityInput.id = newName;
                }

                // Mettre à jour le name du matériau sélectionné
                const materialInputs = group.querySelectorAll('[data-material-input] input[type="radio"]');
                materialInputs.forEach(input => {
                    if (input.checked) {
                        const newName = `materiaux${selectedType}__c`;
                        input.name = newName;
                        input.setAttribute('data-name', newName);
                    }
                });
            }
        },

        _attachGroupListeners: function(group, typeSelector, prefix) {
            // Écouter les changements de quantité
            const rangeSlider = group.querySelector('.fs-rangeslider_input');
            if (rangeSlider) {
                rangeSlider.addEventListener('input', () => {
                    const typeInput = group.querySelector(typeSelector + ':checked');
                    if (typeInput) {
                        this._handleGroupChange(group, typeInput.value, prefix);
                    }
                });
            }

            // Écouter les changements de matériaux
            group.querySelectorAll('[data-material-input] input[type="radio"]').forEach(input => {
                input.addEventListener('change', () => {
                    const typeInput = group.querySelector(typeSelector + ':checked');
                    if (typeInput) {
                        this._handleGroupChange(group, typeInput.value, prefix);
                    }
                });
            });
        },

        initWindows: function() {
            document.querySelectorAll('[data-type-ouverture] input[type="radio"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const type = e.target.value;
                    const group = e.target.closest('[data-fields-group]');
                    if (group) {
                        this._handleGroupChange(group, type, 'Fenetre');
                    }
                });
            });

            document.querySelectorAll('[data-fields-group]').forEach(group => {
                this._attachGroupListeners(group, '[data-type-ouverture] input[type="radio"]', 'Fenetre');
            });
        },

        initShutters: function() {
            document.querySelectorAll('[data-fields-group="Volets"] input[name="typeVolet"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const type = e.target.value;
                    const group = e.target.closest('[data-fields-group="Volets"]');
                    if (group) {
                        this._handleGroupChange(group, type, 'Volet');

                        // Gestion de l'affichage des matériaux autorisés
                        const materialLabels = group.querySelectorAll('.form_radio');
                        materialLabels.forEach(label => {
                            const allowedTypes = label.getAttribute('data-material-allowed');
                            if (allowedTypes) {
                                label.style.display = allowedTypes.includes(type) ? 'block' : 'none';
                            }
                        });
                    }
                });
            });

            document.querySelectorAll('[data-fields-group="Volets"]').forEach(group => {
                this._attachGroupListeners(group, 'input[name="typeVolet"]', 'Volet');
            });
        },

        initStores: function() {
            document.querySelectorAll('[data-fields-group="Stores"] input[name="typeStore"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const type = e.target.value;
                    const group = e.target.closest('[data-fields-group="Stores"]');
                    if (group) {
                        this._handleGroupChange(group, type, 'Store');

                        // Gestion spécifique pour les moustiquaires
                        const materialsWrapper = group.querySelector('[data-material-group="moustiquaire"]');
                        if (materialsWrapper) {
                            materialsWrapper.style.display = type === 'Moustiquaire' ? 'flex' : 'none';
                        }
                    }
                });
            });

            document.querySelectorAll('[data-fields-group="Stores"]').forEach(group => {
                this._attachGroupListeners(group, 'input[name="typeStore"]', 'Store');
            });
        },

        initDoors: function() {
            document.querySelectorAll('[data-fields-group="Portes"] input[name="typePorte"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const type = e.target.value;
                    const group = e.target.closest('[data-fields-group="Portes"]');
                    if (group) {
                        this._handleGroupChange(group, type, 'Porte');

                        // Gestion de l'affichage des matériaux autorisés
                        const materialLabels = group.querySelectorAll('.form_radio');
                        materialLabels.forEach(label => {
                            const allowedTypes = label.getAttribute('data-material-allowed');
                            if (allowedTypes) {
                                label.style.display = allowedTypes.includes(type) ? 'block' : 'none';
                            }
                        });
                    }
                });
            });

            document.querySelectorAll('[data-fields-group="Portes"]').forEach(group => {
                this._attachGroupListeners(group, 'input[name="typePorte"]', 'Porte');
            });
        },

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

            // Observer les groupes pour réinitialiser quand ils sont masqués
            document.querySelectorAll('[data-fields-group]').forEach(group => {
                resetObserver.observe(group, { attributes: true, attributeFilter: ['style'] });
            });
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => FieldMapper.init());
    } else {
        FieldMapper.init();
    }
})();
