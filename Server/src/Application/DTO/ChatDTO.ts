export interface MsgDTO{
    room:string
    author:string,
    releaseDate:string
    description:string
}

export interface CreateRoomDTO {
    name:string,
    participants:string[]
}
