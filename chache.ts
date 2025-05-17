export async function fetchProducts(url: string, strategy: 'CacheFirst' | 'StaleWhileRevalidate') {
  const cached = localStorage.getItem(url);
  const timestamp = localStorage.getItem(url + ':ts');

  if (strategy === 'CacheFirst' && cached) {
    return JSON.parse(cached);
  }

  if (strategy === 'StaleWhileRevalidate' && cached) {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        localStorage.setItem(url, JSON.stringify(data));
        localStorage.setItem(url + ':ts', Date.now().toString());
        document.dispatchEvent(new CustomEvent('productsUpdated', { detail: data }));
      });
    return JSON.parse(cached);
  }

  const res = await fetch(url);
  const data = await res.json();
  localStorage.setItem(url, JSON.stringify(data));
  localStorage.setItem(url + ':ts', Date.now().toString());
  return data;
}