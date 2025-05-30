function calculateValue() {
  // Get crop value
  const cropSelected = document.querySelector('#baseValueDropdown .selected');
  const cropValue = Number(cropSelected.dataset.value);

  // Get growth mutation value
  const mutationSelected = document.querySelector('#growthMutation .selected');
  const mutationValue = Number(mutationSelected.dataset.value);

  // Sum environmental mutations
  let envSum = 0;
  document.querySelectorAll('.env:checked').forEach(cb => {
    envSum += Number(cb.value);
  });

  // Sum additional multipliers
  let extraSum = 0;
  document.querySelectorAll('.extra:checked').forEach(cb => {
    extraSum += Number(cb.value);
  });

  // Get weight
  const weight = Number(document.getElementById('weight').value);

  // Check for valid selections
  if (isNaN(cropValue) || isNaN(mutationValue) || isNaN(weight) || weight <= 0) {
    document.getElementById('result').textContent = "Please select a crop, mutation, and enter a valid weight.";
    return;
  }

  // Add (base * (weight / 100)) to the base value
  let baseWithWeight = cropValue + envSum;
  baseWithWeight += baseWithWeight * (weight / 100);

  // Multiply by mutation and extra multipliers
  const total = baseWithWeight * mutationValue * (extraSum > 0 ? extraSum : 1);

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