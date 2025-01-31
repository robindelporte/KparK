(function() {
    const CheckboxUtils = {
        init: function() {
            const form = document.getElementById('myForm');
            if (!form) return;

            const checkboxGroup = document.getElementById('chkGroup');
            const errorMessage = document.querySelector('.checkbox-error');
            
            if (!checkboxGroup || !errorMessage) return;

            // Cacher le message d'erreur par défaut
            errorMessage.style.display = 'none';

            // Gestion de la soumission du formulaire
            form.addEventListener('submit', (e) => {
                const checkboxes = checkboxGroup.querySelectorAll('input[type="checkbox"]');
                const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

                if (!isChecked) {
                    e.preventDefault();
                    errorMessage.style.display = 'flex';
                }
            });

            // Cacher le message d'erreur quand une checkbox est cochée
            checkboxGroup.addEventListener('change', (e) => {
                if (e.target.type === 'checkbox' && e.target.checked) {
                    errorMessage.style.display = 'none';
                }
            });
        }
    };

    // Auto-initialisation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => CheckboxUtils.init());
    } else {
        CheckboxUtils.init();
    }
})();
