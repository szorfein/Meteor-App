import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'

export function loadArticles() {

    if (Articles.find().cursor.count() === 0) {
        const articles: Article[] = [
            {
                author: 'myroot',
                authorId: 'jfoizefjigzoi',
                createdAt: new Date(),
                image: '/path/to/img',
                bloc: [ {
                    title: 'first article',
                    lastEdit: new Date(),
                    lastEditOwner: 'biggie',
                    description: 'Kanpai',
                    lang: 'en',
                    article: '<div><p>try to write the first article</p></div>'
                } ],
                isPublic: true,
                like: 344,
                hate: 11,
                tags: [ 'linux', 'Windows', 'OSX' ]
            },
            {
                author: 'myroot',
                authorId: 'ofjiozgjozjg',
                createdAt: new Date(),
                image: '/path/to/img',
                bloc: [ {
                    title: 'Second',
                    lastEdit: new Date(),
                    lastEditOwner: 't2pac',
                    description: 'Nozdrovié',
                    lang: 'en',
                    article: '# title \n **user** *italic powaa* \n ```javascript ```'
                } ],
                isPublic: false,
                like: 44,
                hate: 11
            },
            {
                author: 'myroot',
                authorId: 'jgoizjgzjij',
                createdAt: new Date(),
                image: '/path/to/img',
                bloc: [ {
                    title: 'thirst article',
                    lastEdit: new Date(),
                    lastEditOwner: 'blackEnergy',
                    description: 'Viscious',
                    lang: 'en',
                    article: '# Kheops dans les bacs'
                } ],
                isPublic: false,
                like: 644,
                hate: 33
            }
        ]
        articles.forEach((article: Article) => Articles.insert(article))
    }

}
