const KEY = '25836176-b4d66cb7105f8e07a6b55e563';

export default function fetchImage(searchQuery, page) {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(
      new Error('There was nothing found for your request')
    );
  });
}
