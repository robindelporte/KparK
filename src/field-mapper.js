(function() {
    const resetObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const element = mutation.target;
                if (element.style.display === 'none') {
                    FieldMapper._resetGroupFields(element);
                }
            }
        });
    });

    const FieldMapper = {
        // Fonction helper pour réinitialiser tous les noms de champs dans un groupe
        _resetGroupFields: function(group) {
            // Réinitialiser tous les inputs radio
            group.querySelectorAll('input[type="radio"]').forEach(input => {
                input.name = '';
                input.setAttribute('data-name', '');
                const customInput = input.previousElementSibling;
                if (customInput) {
                    customInput.classList.remove('w--redirected-checked');
                }
                input.checked = false;
            });

            // Réinitialiser le range slider
            const rangeSlider = group.querySelector('.fs-rangeslider_input');
            if (rangeSlider) {
                rangeSlider.value = '0';
                rangeSlider.name = '';
                rangeSlider.setAttribute('data-name', '');
            }
        },

        // Fonction helper pour gérer les changements dans un groupe
        _handleGroupChange: function(group, type, typeInputName) {
            // D'abord, on réinitialise tous les noms sauf le type sélectionné
            group.querySelectorAll('input[type="radio"]').forEach(input => {
                if (input.name !== typeInputName && !input.checked) {
                    input.name = '';
                    input.setAttribute('data-name', '');
                }
            });

            // Gestion du range slider
            const quantityInput = group.querySelector('.fs-rangeslider_input');
            if (quantityInput) {
                if (quantityInput.value !== '0') {
                    const newName = `quantite${type}__c`;
                    quantityInput.name = newName;
                    quantityInput.setAttribute('data-name', newName);
                    quantityInput.id = newName;
                } else {
                    quantityInput.name = '';
                    quantityInput.setAttribute('data-name', '');
                }
            }

            // Gestion des matériaux
            const checkedMaterial = group.querySelector('[data-material-input] input[type="radio"]:checked');
            if (checkedMaterial) {
                const newName = `materiaux${type}__c`;
                checkedMaterial.name = newName;
                checkedMaterial.setAttribute('data-name', newName);
            }
        },

        initWindows: function() {
            document.querySelectorAll('[data-type-ouverture] input[type="radio"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const type = e.target.value;
                    const group = e.target.closest('[data-fields-group]');
                    if (group) {
                        this._handleGroupChange(group, type, 'typeOuverture');
                    }
                });
            });

            this._attachGroupListeners('[data-fields-group]', '[data-type-ouverture]');
        },

        initShutters: function() {
            document.querySelectorAll('[data-fields-group="Volets"] input[name="typeVolet"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const type = e.target.value;
                    const group = e.target.closest('[data-fields-group="Volets"]');
                    if (group) {
                        this._handleGroupChange(group, type, 'typeVolet');
                        
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

            this._attachGroupListeners('[data-fields-group="Volets"]', 'input[name="typeVolet"]');
        },

        initStores: function() {
            document.querySelectorAll('[data-fields-group="Stores"] input[name="typeStore"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const type = e.target.value;
                    const group = e.target.closest('[data-fields-group="Stores"]');
                    if (group) {
                        this._handleGroupChange(group, type, 'typeStore');
                        
                        // Gestion spécifique pour les moustiquaires
                        const materialsWrapper = group.querySelector('[data-material-group="moustiquaire"]');
                        if (materialsWrapper) {
                            materialsWrapper.style.display = type === 'Moustiquaire' ? 'flex' : 'none';
                        }
                    }
                });
            });

            this._attachGroupListeners('[data-fields-group="Stores"]', 'input[name="typeStore"]');
        },

        initDoors: function() {
            document.querySelectorAll('[data-fields-group="Portes"] input[name="typePorte"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const type = e.target.value;
                    const group = e.target.closest('[data-fields-group="Portes"]');
                    if (group) {
                        this._handleGroupChange(group, type, 'typePorte');
                        
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

            this._attachGroupListeners('[data-fields-group="Portes"]', 'input[name="typePorte"]');
        },

        _attachGroupListeners: function(groupSelector, typeSelector) {
            document.querySelectorAll(groupSelector).forEach(group => {
                // Pour les changements de matériaux
                group.querySelectorAll('[data-material-input] input[type="radio"]').forEach(input => {
                    input.addEventListener('change', () => {
                        const typeInput = group.querySelector(typeSelector + ':checked');
                        if (typeInput) {
                            this._handleGroupChange(group, typeInput.value, typeInput.name);
                        }
                    });
                });

                // Pour les changements de quantité
                const rangeSlider = group.querySelector('.fs-rangeslider_input');
                if (rangeSlider) {
                    rangeSlider.addEventListener('input', () => {
                        const typeInput = group.querySelector(typeSelector + ':checked');
                        if (typeInput) {
                            this._handleGroupChange(group, typeInput.value, typeInput.name);
                        }
                    });
                }
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
