(function() {
    // ... Le reste du code reste identique jusqu'au FieldMapper ...

    const FieldMapper = {
        _logFormData: function() {
            console.group('📋 Données qui seront envoyées dans le formulaire:');
            
            // Récupérer tous les champs avec un name
            const allFields = document.querySelectorAll('input[name], select[name], textarea[name]');
            const formData = {};
            
            allFields.forEach(field => {
                if (field.type === 'radio') {
                    // Pour les radios, ne prendre que ceux qui sont cochés
                    if (field.checked) {
                        formData[field.name] = field.value;
                    }
                } else {
                    // Pour les autres types de champs
                    formData[field.name] = field.value;
                }
            });

            // Afficher les données de manière structurée
            Object.entries(formData).forEach(([key, value]) => {
                console.log(`${key}: ${value}`);
            });

            console.groupEnd();
            return formData; // Retourner les données pour usage potentiel
        },

        _logFormFields: function(group) {
            console.group('🔄 Champs modifiés dans le groupe:');
            // Log des quantités
            group.querySelectorAll('.fs-rangeslider_input[name]').forEach(input => {
                if (input.name) {
                    console.log(`${input.name}: ${input.value}`);
                }
            });
            // Log des matériaux
            group.querySelectorAll('input[type="radio"][name]').forEach(input => {
                if (input.name && input.checked) {
                    console.log(`${input.name}: ${input.value}`);
                }
            });
            console.groupEnd();

            // Afficher l'état complet du formulaire après chaque modification
            this._logFormData();
        },

        // ... Le reste du code reste identique ...

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

            // Ajouter un listener sur le formulaire pour logger les données avant l'envoi
            const form = document.querySelector('form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    console.group('🚀 ENVOI DU FORMULAIRE - Données finales:');
                    const formData = this._logFormData();
                    console.groupEnd();
                });
            }
        }
    };

    // ... Le reste du code reste identique ...
})();
