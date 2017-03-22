import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'
import { incIndex } from '/lib/index'
import { userLib } from '/lib/server/user'

export function loadArticles() {

    if (Articles.find().cursor.count() === 0) {
        const articles: Article[] = [
            {
                authorId: userLib.rootId(),
                createdAt: new Date(),
                image: '/path/to/img',
                bloc: [ {
                    title: 'first article',
                    lastEdit: new Date(),
                    lastEditOwner: userLib.rootId(),
                    description: 'Kanpai',
                    lang: 'en',
                    article: '<div><p>try to write the first article</p></div>'
                } ],
                isPublic: true,
                like: 344,
                hate: 11,
                tags: [ 'linux', 'Windows', 'OSX' ],
                index: incIndex('articleId')
            },
            {
                authorId: userLib.rootId(),
                createdAt: new Date(),
                image: '/path/to/img',
                bloc: [ {
                    title: 'Second Hidden',
                    lastEdit: new Date(),
                    lastEditOwner: userLib.rootId(),
                    description: 'hidden article',
                    lang: 'en',
                    article: '# title \n **user** *italic powaa* \n ```javascript ```'
                } ],
                isPublic: false,
                like: 44,
                hate: 11,
                index: incIndex('articleId')
            }
        ]
        articles.forEach((article: Article) => Articles.insert(article))
    }
}
