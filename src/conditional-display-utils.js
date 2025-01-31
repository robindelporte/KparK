(function() {
    const ConditionalDisplay = {
        init: function() {
            const checkboxGroup = document.querySelector('[data-checkbox-group="products"]');
            if (!checkboxGroup) return;
            
            // Initialiser tous les groupes de champs en caché
            document.querySelectorAll('[data-fields-group]').forEach(group => {
                group.style.display = 'none';
            });
            
            // Attacher les événements aux checkboxes
            const checkboxes = checkboxGroup.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', (e) => this._handleCheckboxChange(e));
                
                // Afficher les groupes initialement cochés
                if (checkbox.checked) {
                    const groupId = checkbox.getAttribute('data-related-group');
                    const relatedGroup = document.querySelector(`[data-fields-group="${groupId}"]`);
                    if (relatedGroup) {
                        relatedGroup.style.display = 'block';
                    }
                }
            });

            // Gérer le retour en arrière
            this._handleBackButton();
        },

        _handleCheckboxChange: function(event) {
            const checkbox = event.target;
            const groupId = checkbox.getAttribute('data-related-group');
            const relatedGroup = document.querySelector(`[data-fields-group="${groupId}"]`);
            
            if (!relatedGroup) return;
            
            if (checkbox.checked) {
                relatedGroup.style.display = 'block';
            } else {
                relatedGroup.style.display = 'none';
                this._resetFieldsInGroup(relatedGroup);
            }
        },

        _handleBackButton: function() {
            const backButton = document.querySelector('[data-form="back-btn"]');
            if (!backButton) return;
            
            backButton.addEventListener('click', () => {
                document.querySelectorAll('[data-fields-group]').forEach(group => {
                    const groupId = group.getAttribute('data-fields-group');
                    const relatedCheckbox = document.querySelector(`[data-related-group="${groupId}"]`);
                    
                    if (!relatedCheckbox?.checked) {
                        this._resetFieldsInGroup(group);
                    }
                });
            });
        },

        _resetFieldsInGroup: function(group) {
            // Réinitialiser les inputs
            group.querySelectorAll('input').forEach(input => {
                if (input.type === 'radio' || input.type === 'checkbox') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
            });
            
            // Réinitialiser les selects
            group.querySelectorAll('select').forEach(select => {
                select.selectedIndex = 0;
            });
        }
    };

    // Auto-initialisation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => ConditionalDisplay.init());
    } else {
        ConditionalDisplay.init();
    }
})();
