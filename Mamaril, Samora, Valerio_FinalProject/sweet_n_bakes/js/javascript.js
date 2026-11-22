const filterButtons = document.querySelectorAll('.filter-panel a');
const recipeCards = document.querySelectorAll('.recipe-card');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form input');

let selectedFilter = 'all';

const searchParams = new URLSearchParams(window.location.search);
let searchText = searchParams.get('search') || '';

if (searchInput) {
  searchInput.value = searchText;
}

function displayRecipes() {
  recipeCards.forEach(card => {
    const categories = card.dataset.category.split(' ');
    const recipeText = card.textContent.toLowerCase();

    const matchesFilter =
      selectedFilter === 'all' ||
      categories.includes(selectedFilter);

    const matchesSearch =
      searchText === '' ||
      recipeText.includes(searchText.toLowerCase());

    if (matchesFilter && matchesSearch) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();

    selectedFilter = this.dataset.filter;

    filterButtons.forEach(btn => {
      btn.classList.remove('active');
    });

    this.classList.add('active');

    displayRecipes();
  });
});

if (searchForm) {
  searchForm.addEventListener('submit', function() {
    searchText = searchInput.value.trim();
  });
}

displayRecipes();