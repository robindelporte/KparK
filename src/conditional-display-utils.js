(function() {
    const ConditionalDisplay = {
        init: function() {
            console.log('ConditionalDisplay: Initialisation...');
            this._attachEvents();
            this._initializeGroups();
        },

        _attachEvents: function() {
            // Surveiller les clics sur les checkboxes Webflow
            document.addEventListener('click', (e) => {
                const checkboxDiv = e.target.closest('.w-checkbox-input');
                if (!checkboxDiv) return;

                const input = checkboxDiv.nextElementSibling;
                if (!input || !input.getAttribute('data-related-group')) return;

                const isChecked = checkboxDiv.classList.contains('w--redirected-checked');
                const groupId = input.getAttribute('data-related-group');
                
                console.log('Checkbox clicked:', { groupId, isChecked });
                this._toggleGroup(groupId, isChecked);
            });
        },

        _initializeGroups: function() {
            // Cacher tous les groupes initialement
            document.querySelectorAll('[data-fields-group]').forEach(group => {
                group.style.display = 'none';
            });

            // Afficher les groupes des checkboxes déjà cochées
            document.querySelectorAll('.w-checkbox-input.w--redirected-checked').forEach(checkboxDiv => {
                const input = checkboxDiv.nextElementSibling;
                if (!input) return;

                const groupId = input.getAttribute('data-related-group');
                if (groupId) {
                    this._toggleGroup(groupId, true);
                }
            });
        },

        _toggleGroup: function(groupId, show) {
            console.log('Toggle group:', { groupId, show });
            const group = document.querySelector(`[data-fields-group="${groupId}"]`);
            if (!group) return;

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
