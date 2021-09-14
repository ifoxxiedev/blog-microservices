import { AbstractPublisher } from '../../../abstract'
import { Subjects } from '../../../../interfaces'
import { IPostEventData } from '../interfaces/post-data.interface'

export class PostCreatedPublisher extends AbstractPublisher<IPostEventData> {
    subject: Subjects = Subjects.POST_CREATED
}