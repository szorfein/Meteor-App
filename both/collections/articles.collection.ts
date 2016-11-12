import { MongoObservable } from 'meteor-rxjs'

import { Article } from '/both/models/article.model'

export const Articles = new MongoObservable.Collection<Article>('articles')
