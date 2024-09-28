document.addEventListener('DOMContentLoaded', function () {
  async function fetchArticlesBySection(section) {
    const apiKey = '8CTFqFpt1ctXt6MToAbbYpO4GGHF3ADa';
    const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`;

    try {
      document.getElementById(
        'section-container'
      ).innerHTML = `<p>Loading articles...</p>`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      displaySection(
        data.results.slice(0, 20),
        `${capitalizeFirstLetter(section)} Articles`,
        'topstories'
      );
    } catch (error) {
      console.error(`Error fetching ${section} articles:`, error);
      document.getElementById(
        'section-container'
      ).innerHTML = `<p>Failed to fetch ${section} news. Please try again.</p>`;
    }
  }

  function displaySection(articles, title, type) {
    const sectionContainer = document.getElementById('section-container');
    sectionContainer.innerHTML = '';

    document.getElementById('section-title').textContent = title;

    articles.forEach((article) => {
      const sectionItem = document.createElement('section');
      sectionItem.classList.add('article-item');

      const imageUrl =
        article.multimedia && article.multimedia.length > 0
          ? article.multimedia[0].url
          : 'placeholder.jpg';

      const sectionImageLink = document.createElement('a');
      sectionImageLink.href = article.url;
      sectionImageLink.target = '_blank';

      const sectionImage = document.createElement('img');
      sectionImage.src = imageUrl;
      sectionImage.alt = article.title;
      sectionImageLink.appendChild(sectionImage);

      sectionItem.appendChild(sectionImageLink);

      const sectionContent = document.createElement('div');
      sectionContent.classList.add('article-content');

      const articleTitle = document.createElement('h3');
      articleTitle.textContent = article.title;
      sectionContent.appendChild(articleTitle);

      const sectionSnippet = document.createElement('p');
      sectionSnippet.textContent = article.abstract;
      sectionContent.appendChild(sectionSnippet);

      sectionItem.appendChild(sectionContent);
      sectionContainer.appendChild(sectionItem);
    });
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  document
    .querySelector('.nav-links')
    .addEventListener('click', function (event) {
      if (event.target.classList.contains('nav-button')) {
        event.preventDefault();
        const section = event.target.getAttribute('data-section');
        fetchArticlesBySection(section);

        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.remove('active');
      }
    });

  document.querySelector('.hamburger').addEventListener('click', function () {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  });

  fetchArticlesBySection('world');
});
