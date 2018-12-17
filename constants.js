export const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api_key=dfdf286b06d14bbfb24f2898357d4672';

export const formatDate = (date) => {
    if ( date ){
      const tab = date.slice(0, 10).split('-');
      return tab.length === 3 ? tab[2]+'/'+tab[1]+'/'+tab[0] : '';
    } else {
      return '';
    }
}