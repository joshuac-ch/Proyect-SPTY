export interface Song{
    _id:string,
    title:string,
    artist:string,
    album:string|null,
    imageUrl:string,
    audioUrl:string,
    duration:number,
    createdAt:Date,
    updateAt:Date
}
export interface Album{
    _id:string,
    title:string,
    artist:string,
    imageUrl:string,
    realeaseYear:number,
    songs:Song[]
}