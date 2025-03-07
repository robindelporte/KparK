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
                   });

                   // Réinitialiser les valeurs des range sliders
                   element.querySelectorAll('.fs-rangeslider_input').forEach(input => {
                       input.value = '0';
                   });
               }
           }
       });
   });

   const FieldMapper = {
       initWindows: function() {
           document.querySelectorAll('[data-type-ouverture] input[type="radio"]').forEach(radio => {
               radio.addEventListener('change', (e) => {
                   const type = e.target.value;
                   const group = e.target.closest('[data-fields-group]');
                   
                   if (!group) return;
                   
                   // Quantité
                   const quantityInput = group.querySelector('.fs-rangeslider_input');
                   if (quantityInput) {
                       const newName = `quantite${type}__c`;
                       quantityInput.setAttribute('name', newName);
                       quantityInput.setAttribute('data-name', newName);
                       quantityInput.id = newName;
                   }

                   // Nettoyage et mise à jour des matériaux
                   const materialInputs = group.querySelectorAll('[data-material-input] input[type="radio"]');
                   materialInputs.forEach(input => {
                       input.setAttribute('name', `materiaux${type}__c`);
                       input.setAttribute('data-name', `materiaux${type}__c`);
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
                       quantityInput.setAttribute('name', newName);
                       quantityInput.setAttribute('data-name', newName);
                       quantityInput.id = newName;
                   }

                   const materialLabels = group.querySelectorAll('.form_radio');
                   materialLabels.forEach(label => {
                       const input = label.querySelector('input[type="radio"]:not([name="typeVolet"])');
                       if (input) {
                           const newName = `materiaux${type}__c`;
                           input.setAttribute('name', newName);
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
                       quantityInput.setAttribute('name', newName);
                       quantityInput.setAttribute('data-name', newName);
                       quantityInput.id = newName;
                   }

                   // Gérer l'affichage du groupe de matériaux pour les moustiquaires
                   const materialsWrapper = group.querySelector('[data-material-group="moustiquaire"]');
                   if (materialsWrapper) {
                       materialsWrapper.style.display = type === 'Moustiquaire' ? 'flex' : 'none';
                       
                       // Si on repasse sur StoreBanne, on réinitialise les radios de moustiquaire
                       if (type !== 'Moustiquaire') {
                           materialsWrapper.querySelectorAll('input[type="radio"]').forEach(input => {
                               const customInput = input.previousElementSibling;
                               if (customInput) {
                                   customInput.classList.remove('w--redirected-checked');
                               }
                               input.checked = false;
                           });
                       }
                   }

                   // Mettre à jour les noms des inputs matériaux
                   if (materialsWrapper) {
                       const materialInputs = materialsWrapper.querySelectorAll('input[type="radio"]');
                       materialInputs.forEach(input => {
                           const newName = `materiaux${type}__c`;
                           input.setAttribute('name', newName);
                           input.setAttribute('data-name', newName);
                       });
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

                   const quantityInput = group.querySelector('.fs-rangeslider_input');
                   if (quantityInput) {
                       const newName = `quantite${type}__c`;
                       quantityInput.setAttribute('name', newName);
                       quantityInput.setAttribute('data-name', newName);
                       quantityInput.id = newName;
                   }

                   const materialLabels = group.querySelectorAll('.form_radio');
                   materialLabels.forEach(label => {
                       const input = label.querySelector('input[type="radio"]:not([name="typePorte"])');
                       if (input) {
                           const newName = `materiaux${type}__c`;
                           input.setAttribute('name', newName);
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
