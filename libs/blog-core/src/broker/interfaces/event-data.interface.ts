export enum Subjects {
    POST_CREATED = "POST:CREATED",
    COMMENT_CREATED = "COMMENT:CREATED",
    COMMENT_UPDATED = "COMMENT:UPDATED",
    COMMENT_MODERATED = "COMMENT:MODERATED"
}

export interface IEventData<T = any> {
    eventType: Subjects,
    payload: T
}