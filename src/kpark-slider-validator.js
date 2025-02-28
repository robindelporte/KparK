// Script de validation des sliders - vérifie si au moins un slider a une valeur > 0
document.addEventListener('DOMContentLoaded', function() {
  // Fonction pour vérifier les valeurs des sliders et mettre à jour l'état du bouton
  function checkSliders() {
    // Récupérer tous les handles de sliders
    const sliderHandles = document.querySelectorAll('[fs-rangeslider-element="handle"]');
    
    // Vérifier si au moins un slider a une valeur > 0
    let hasNonZeroValue = false;
    
    sliderHandles.forEach(function(handle) {
      const value = parseInt(handle.getAttribute('aria-valuenow') || '0');
      if (value > 0) {
        hasNonZeroValue = true;
      }
    });
    
    // Récupérer le bouton (essayer plusieurs méthodes)
    const button = document.getElementById('step-2') || 
                  document.querySelector('.multi-form_step.is-step-2 [data-form="next-btn"]') ||
                  document.querySelector('[data-form="next-btn"]');
    
    // Modifier l'état du bouton en fonction des valeurs des sliders
    if (button) {
      if (!hasNonZeroValue) {
        // Désactiver le bouton
        button.className = "button w-button disabled";
        button.style.opacity = "0.4";
        button.style.pointerEvents = "none";
      } else {
        // Activer le bouton
        button.className = "button w-button";
        button.style.opacity = "1";
        button.style.pointerEvents = "auto";
      }
    }
  }
  
  // Exécuter immédiatement
  checkSliders();
  
  // Vérifier périodiquement (toutes les 500ms)
  setInterval(checkSliders, 500);
  
  // Vérifier lors des interactions utilisateur
  document.addEventListener('click', function() {
    setTimeout(checkSliders, 100);
  });
  
  document.addEventListener('mouseup', function() {
    setTimeout(checkSliders, 100);
  });
  
  // Observer les changements d'affichage des groupes de champs
  const observer = new MutationObserver(function() {
    setTimeout(checkSliders, 100);
  });
  
  // Observer tous les data-fields-group
  document.querySelectorAll('[data-fields-group]').forEach(function(group) {
    observer.observe(group, { attributes: true, attributeFilter: ['style'] });
  });
});
