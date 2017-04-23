import { DisplayImagePipe } from './display-image.pipe'
import { DisplayNamePipe } from './display-name.pipe'
import { DisplayNameWithIdPipe } from './display-name-with-id.pipe'
import { DisplayReplyCommentPipe } from './display-reply-comment.pipe'
import { DisplayOrNonePipe } from './display-or-none.pipe'
import { DisplayUserImagePipe } from './display-user-image.pipe'
import { DisplayMarkdownPipe } from './display-markdown.pipe'
import { RootInput } from './root.input.ts'
import { DisplayArticleList } from './display-article-list.component'
import { DisplayTagsComponent } from './display-tags.component'
import { CaptchaComponent } from './captcha.component'
import { DisplayImgurComponent } from './display-imgur.component'

export const SHARED_DECLARATIONS : any[] = [
    DisplayImagePipe,
    DisplayNamePipe,
    DisplayNameWithIdPipe,
    DisplayReplyCommentPipe,
    DisplayOrNonePipe,
    DisplayUserImagePipe,
    DisplayMarkdownPipe,
    RootInput,
    DisplayArticleList,
    DisplayTagsComponent,
    CaptchaComponent,
    DisplayImgurComponent
]
