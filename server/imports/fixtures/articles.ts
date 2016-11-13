import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'

export function loadArticles() {
    console.log(Articles.find().cursor.count())
    if (Articles.find().cursor.count() === 0) {

        const articles: Article[] = [{
            title: 'first article',
            image: '/path/to/img',
            body: '<div><p>try to write the first article</p></div>',
            writer: 'ninja',
            public: true
        },
        {
            title: 'Second Article',
            image: '/path/to/img',
            body: '<div><p>Second article one more time !</p></div>',
            writer: 'shuriken',
            public: false
        }]

        articles.forEach((article: Article) => Articles.insert(article))
    }
}
