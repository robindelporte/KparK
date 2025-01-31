(function() {
    const ConditionalDisplay = {
        init: function() {
            console.log('ConditionalDisplay: Initialisation...');
            this._initializeGroups();
            this._attachEvents();
        },

        _attachEvents: function() {
            document.addEventListener('change', (e) => {
                // Petit délai pour laisser Webflow mettre à jour les classes
                setTimeout(() => {
                    this._updateAllGroups();
                }, 50);
            });
        },

        _initializeGroups: function() {
            // Cacher tous les groupes initialement
            document.querySelectorAll('[data-fields-group]').forEach(group => {
                group.style.display = 'none';
            });
            
            // État initial
            this._updateAllGroups();
        },

        _updateAllGroups: function() {
            // Vérifier toutes les checkboxes et mettre à jour leurs groupes
            document.querySelectorAll('input[data-related-group]').forEach(input => {
                const checkboxDiv = input.previousElementSibling;
                if (!checkboxDiv) return;

                const isChecked = checkboxDiv.classList.contains('w--redirected-checked');
                const groupId = input.getAttribute('data-related-group');
                
                console.log('État checkbox:', input.getAttribute('name'), isChecked);
                this._toggleGroup(groupId, isChecked);
            });
        },

        _toggleGroup: function(groupId, show) {
            const group = document.querySelector(`[data-fields-group="${groupId}"]`);
            if (!group) return;

            console.log('Toggle group:', groupId, show ? 'visible' : 'caché');
            group.style.display = show ? 'block' : 'none';
            
            if (!show) {
                this._resetFieldsInGroup(group);
            }
        },

        _resetFieldsInGroup: function(group) {
            // Réinitialiser les inputs
            group.querySelectorAll('input').forEach(input => {
                const customInput = input.previousElementSibling;
                if (customInput && customInput.classList.contains('w-checkbox-input')) {
                    customInput.classList.remove('w--redirected-checked');
                } else if (customInput && customInput.classList.contains('w-radio-input')) {
                    customInput.classList.remove('w--redirected-checked');
                }
                input.checked = false;
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
