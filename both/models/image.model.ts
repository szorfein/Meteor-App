export interface Image {
    _id?: string,
    complete: boolean,
    extension: string,
    name: string,
    progress: number,
    size: number,
    store: string,
    token: string,
    type: string,
    uploadAt: Date,
    uploading: string,
    url: boolean,
    userId?: string
}
