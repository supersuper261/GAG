function calculateValue() {
  // Get base crop value
  const cropSelected = document.querySelector('#baseValueDropdown .selected');
  const baseValue = Number(cropSelected.dataset.value);

  // Get fruit weight
  let weight = Number(document.getElementById('weight').value);

  // Get growth mutation value (default to 0 if not selected)
  const mutationSelected = document.querySelector('#growthMutation .selected');
  let mutationValue = Number(mutationSelected.dataset.value);
  if (isNaN(mutationValue)) mutationValue = 0;

  // Sum all checked environmental mutations
  let envSum = 0;
  document.querySelectorAll('.env:checked').forEach(cb => {
    envSum += Number(cb.value);
  });

  if (mutationValue === 20) {
    weight -= 11.6;
  } else if (mutationValue === 1) {
    weight -= 8;
  }

  // Prevent negative or zero weight
  if (weight <= 0) {
    document.getElementById('result').textContent = "Weight after adjustment must be greater than 0.";
    return;
  }

  let extraProduct = 1;
  document.querySelectorAll('.extra:checked').forEach(cb => {
    extraProduct += Number(cb.value);
  });
  if (extraProduct === 1) extraProduct = 1; // stays 1 if none selected

  // Check for valid selections
  if (isNaN(baseValue) || isNaN(weight) || weight <= 0) {
    document.getElementById('result').textContent = "Please select a crop and enter a valid weight.";
    return;
  }


  // Final calculation
  const total = (baseValue * weight) * ((extraProduct + envSum) * mutationValue);

  document.getElementById('result').textContent = "Total Value: " + total.toLocaleString();
}

// Custom select logic
document.querySelectorAll('.custom-select').forEach(select => {
  const selected = select.querySelector('.selected');
  const options = select.querySelector('.options');
  selected.addEventListener('click', (e) => {
    e.stopPropagation();
    // Close other selects
    document.querySelectorAll('.custom-select.open').forEach(openSel => {
      if (openSel !== select) openSel.classList.remove('open');
    });
    select.classList.toggle('open');
  });
  options.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      selected.textContent = option.textContent;
      selected.dataset.value = option.dataset.value;
      select.classList.remove('open');
      
    });
  });
});


document.addEventListener('click', () => {
  document.querySelectorAll('.custom-select.open').forEach(openSel => {
    openSel.classList.remove('open');
  });
});

