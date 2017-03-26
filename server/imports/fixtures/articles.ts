import { Articles } from '/both/collections/articles.collection'
import { Article } from '/both/models/article.model'
import { incIndex } from '/lib/index'
import { retLang } from '/lib/lang'
import { userLib } from '/lib/server/user'

export function loadArticles() {

    if (Articles.find().cursor.count() === 0) {
        const articles: Article[] = [
            {
                authorId: userLib.rootId(),
                createdAt: new Date(),
                image: '/path/to/img',
                lastEdit: new Date(),
                lastEditOwner: userLib.rootId(),
                lang: [{}],
                isPublic: true,
                tags: [ 'linux', 'Windows', 'OSX' ],
                index: incIndex('articleId')
            },
            {
                authorId: userLib.rootId(),
                createdAt: new Date(),
                image: '/path/to/img',
                lastEdit: new Date(),
                lastEditOwner: userLib.rootId(),
                lang: [{}],
                isPublic: false,
                tags: [ 'linux', 'OSX' ],
                index: incIndex('articleId')
            }
        ]

        articles[0].lang[retLang('en')] = {
            title: 'first article',
            description: 'Kanpai',
            article: '<div><p>try to write the first article</p></div>'
        }

        articles[1].lang[retLang('en')] = {
            title: 'Second Hidden',
            description: 'hidden article',
            article: '# title \n **user** *italic powaa* \n ```javascript ```'
        }

        articles.forEach((article: Article) => Articles.insert(article))
    }
}
