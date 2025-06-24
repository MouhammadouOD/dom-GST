document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const plusButtons = document.querySelectorAll('.fa-plus-circle');
    const minusButtons = document.querySelectorAll('.fa-minus-circle');
    const deleteButtons = document.querySelectorAll('.fa-trash-alt');
    const likeButtons = document.querySelectorAll('.fa-heart');
    const quantityElements = document.querySelectorAll('.quantity');
    const unitPrices = document.querySelectorAll('.unit-price');
    const totalPriceElement = document.querySelector('.total');
    const productCards = document.querySelectorAll('.card-body');
    
    // Initialisation du prix total
    let totalPrice = 0;
    
    // Fonction pour calculer le prix total
    function calculateTotalPrice() {
        totalPrice = 0;
        quantityElements.forEach((quantityElement, index) => {
            // On vérifie si l'élément existe toujours dans le DOM
            if (quantityElement && quantityElement.closest('.card-body')) {
                const quantity = parseInt(quantityElement.textContent);
                const price = parseFloat(unitPrices[index].textContent);
                totalPrice += quantity * price;
            }
        });
        totalPriceElement.textContent = totalPrice + ' $';
    }
    
    // Fonction pour supprimer un article
    function deleteItem(index) {
        const cardToRemove = productCards[index];
        if (cardToRemove) {
            cardToRemove.remove();
            // On recalcule le prix total après suppression
            calculateTotalPrice();
            
            // On met à jour les index après suppression
            updateIndexes();
        }
    }
    
    // Fonction pour mettre à jour les index après suppression
    function updateIndexes() {
        // On reselectionne les éléments après suppression
        const newProductCards = document.querySelectorAll('.card-body');
        const newQuantityElements = document.querySelectorAll('.quantity');
        const newUnitPrices = document.querySelectorAll('.unit-price');
        
        // On réattache les événements avec les nouveaux index
        newProductCards.forEach((card, newIndex) => {
            const plusBtn = card.querySelector('.fa-plus-circle');
            const minusBtn = card.querySelector('.fa-minus-circle');
            const deleteBtn = card.querySelector('.fa-trash-alt');
            const likeBtn = card.querySelector('.fa-heart');
            
            // On supprime les anciens événements
            plusBtn?.replaceWith(plusBtn.cloneNode(true));
            minusBtn?.replaceWith(minusBtn.cloneNode(true));
            deleteBtn?.replaceWith(deleteBtn.cloneNode(true));
            likeBtn?.replaceWith(likeBtn.cloneNode(true));
            
            // On ajoute les nouveaux événements
            card.querySelector('.fa-plus-circle')?.addEventListener('click', () => {
                const quantityElement = newQuantityElements[newIndex];
                quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
                calculateTotalPrice();
            });
            
            card.querySelector('.fa-minus-circle')?.addEventListener('click', () => {
                const quantityElement = newQuantityElements[newIndex];
                const newQuantity = parseInt(quantityElement.textContent) - 1;
                quantityElement.textContent = newQuantity >= 0 ? newQuantity : 0;
                calculateTotalPrice();
            });
            
            card.querySelector('.fa-trash-alt')?.addEventListener('click', () => {
                deleteItem(newIndex);
            });
            
            card.querySelector('.fa-heart')?.addEventListener('click', function() {
                this.classList.toggle('liked');
            });
        });
    }
    
    // Initialisation des événements
    function initializeEvents() {
        // Boutons +
        plusButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                quantityElements[index].textContent = parseInt(quantityElements[index].textContent) + 1;
                calculateTotalPrice();
            });
        });
        
        // Boutons -
        minusButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const newQuantity = parseInt(quantityElements[index].textContent) - 1;
                quantityElements[index].textContent = newQuantity >= 0 ? newQuantity : 0;
                calculateTotalPrice();
            });
        });
        
        // Boutons supprimer
        deleteButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                deleteItem(index);
            });
        });
        
        // Boutons "J'aime"
        likeButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.classList.toggle('liked');
            });
        });
    }
    
    // Initialisation
    initializeEvents();
    calculateTotalPrice();
});
