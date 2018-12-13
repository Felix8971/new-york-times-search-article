# new-york-times-search-article
A simple react app for searching and displaying articles from New York Times.
Using the New York Times's API.

### Pre-requirements
- node & npm & yarn installed 

### To get started

1. `git clone https://github.com/Felix8971/new-york-times-search-article.git`
1. `cd new-york-times-search-article` 
2. `npm run dev`
3. visit <http://localhost:3000/> 

#### API

https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=dfdf286b06d14bbfb24f2898357d4672

&sort=newest
&begin_date=20170101
&end_date=20180505
&fl=headline, web_url, pub_date, snippet, _id, by_line, multimedia

For images: use response.docs.multimedia.url
Example: images/2018/04/15/world/00taiwan-hongkong-1/merlin_136317102_1934f1d5-f6ea-4010-b116-b03c7fa14247-articleLarge.jpg
==>  https://www.nytimes.com/images/2018/04/15/world/00taiwan-hongkong-1/merlin_136317102_1934f1d5-f6ea-4010-b116-b03c7fa14247-articleLarge.jpg

