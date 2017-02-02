import { DisplayMainImagePipe } from './display-main-image.pipe'
import { DisplayPreviewImage } from './display-preview-image.pipe'
import { DisplayNamePipe } from './display-name.pipe'
import { DisplayNameWithIdPipe } from './display-name-with-id.pipe'
import { DisplayReplyCommentPipe } from './display-reply-comment.pipe'
import { DisplayAboutPipe } from './display-about.pipe'
import { DisplayUserImagePipe } from './display-user-image.pipe'
import { DisplayMarkdownPipe } from './display-markdown.pipe'

export const SHARED_DECLARATIONS : any[] = [
    DisplayMainImagePipe,
    DisplayPreviewImage,
    DisplayNamePipe,
    DisplayNameWithIdPipe,
    DisplayReplyCommentPipe,
    DisplayAboutPipe,
    DisplayUserImagePipe,
    DisplayMarkdownPipe
]
