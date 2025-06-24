// script.js
document.addEventListener('DOMContentLoaded', function() {
    const colorBox = document.getElementById('color-box');
    const changeColorBtn = document.getElementById('change-color-btn');
    const colorInfo = document.querySelector('.color-info');
    const colorHistory = document.getElementById('color-history');
    
    // Function to generate random hex color
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    // Function to update color box and info
    function updateColor(newColor) {
        colorBox.style.backgroundColor = newColor;
        colorInfo.textContent = `Current Color: ${newColor}`;
        
        // Add to color history
        addToHistory(newColor);
    }
    
    // Function to add color to history
    function addToHistory(color) {
        // Check if color already exists in history
        const existingItems = Array.from(colorHistory.querySelectorAll('.history-item'));
        if (existingItems.some(item => item.style.backgroundColor === color)) {
            return;
        }
        
        // Create new history item
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.style.backgroundColor = color;
        historyItem.title = color;
        
        // Add click event to return to this color
        historyItem.addEventListener('click', function() {
            updateColor(color);
        });
        
        // Add to history container
        colorHistory.appendChild(historyItem);
        
        // Limit history to 10 items
        if (colorHistory.children.length > 10) {
            colorHistory.removeChild(colorHistory.firstChild);
        }
    }
    
    // Initial setup
    updateColor('#3498db');
    
    // Button click event
    changeColorBtn.addEventListener('click', function() {
        const newColor = getRandomColor();
        updateColor(newColor);
    });
    
    // Add some initial history items
    const initialColors = ['#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
    initialColors.forEach(color => addToHistory(color));
});
