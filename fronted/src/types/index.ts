export interface Song{
    _id:string,
    title:string,
    artist:string,
    album:string|null,
    imageURL:string,
    audioURL:string,
    duration:number,
    createdAt:string,
    updateAt:string
}
export interface Album{
    _id:string,
    title:string,
    artist:string,
    imageUrl:string,
    releaseYear:number,
    songs:Song[]
}
export interface Users{
    _id:string,
    fullname:string,
    imageUrl:string,
    ClerkID:number
}
export interface Stats{
    totalSonsg:number,
    totalAlbums:number,
    totalUsers:number,
    totalArtist:number
}
export interface Message{
    _id:string,
    senderID:string,
    recivedID:string,
    content:string
    createdAt:string,
    updatedAt:string
}