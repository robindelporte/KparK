(function() {
    const AddressUtils = {
        init: function() {
            // Initialisation de l'autocomplétion sur le code postal
            const postalInput = document.querySelector('input[data-address="postal"]');
            const cityInput = document.querySelector('input[data-address="city"]');
            
            if (!postalInput || !cityInput) return;

            // Style pour le conteneur de suggestions
            this._createStyles();
            
            // Créer le conteneur de suggestions
            const suggestionsContainer = document.createElement('div');
            suggestionsContainer.className = 'city-suggestions';
            cityInput.parentNode.insertBefore(suggestionsContainer, cityInput.nextSibling);
            
            // Événements
            postalInput.addEventListener('input', (e) => {
                const postal = e.target.value;
                if (postal.length === 5) {
                    this._fetchCities(postal, suggestionsContainer, cityInput);
                } else {
                    suggestionsContainer.style.display = 'none';
                }
            });
            
            // Masquer les suggestions en cliquant ailleurs
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.city-suggestions')) {
                    suggestionsContainer.style.display = 'none';
                }
            });
        },

        _createStyles: function() {
            const style = document.createElement('style');
            style.textContent = `
                .city-suggestions {
                    display: none;
                    position: absolute;
                    z-index: 1000;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    max-height: 200px;
                    overflow-y: auto;
                    width: 100%;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .city-suggestion {
                    padding: 8px 12px;
                    cursor: pointer;
                }
                .city-suggestion:hover {
                    background-color: #f5f5f5;
                }
            `;
            document.head.appendChild(style);
        },

        _fetchCities: function(postalCode, container, cityInput) {
            // Utilise l'API gouvernementale pour récupérer les villes
            fetch(`https://geo.api.gouv.fr/communes?codePostal=${postalCode}&fields=nom`)
                .then(response => response.json())
                .then(cities => {
                    if (cities.length > 0) {
                        container.innerHTML = '';
                        cities.forEach(city => {
                            const div = document.createElement('div');
                            div.className = 'city-suggestion';
                            div.textContent = city.nom;
                            div.addEventListener('click', () => {
                                cityInput.value = city.nom;
                                container.style.display = 'none';
                            });
                            container.appendChild(div);
                        });
                        container.style.display = 'block';
                    }
                })
                .catch(error => console.error('Erreur:', error));
        }
    };

    // Auto-initialisation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AddressUtils.init());
    } else {
        AddressUtils.init();
    }
})();
