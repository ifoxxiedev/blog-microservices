import { AbstractPublisher } from '../../../abstract'
import { Subjects } from '../../../../interfaces'
import { ICommentEventData } from '../interfaces/comment-data.interface'

export class CommentCreatedPublisher extends AbstractPublisher<ICommentEventData> {
    subject: Subjects = Subjects.COMMENT_CREATED
}