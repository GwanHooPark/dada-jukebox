interface MusicInfo {
    movieTitle?: string,
    title: string,
    artist: string
}

interface MBCInfo {
    HomeUrl: string,
    DailyList: string,
    ListSelector: string
}

interface MusicList {
    albumThumbnailUrl?: string,
    title?: string,
    artist?: string,
    previewUrl?: string
}

export {
    MusicInfo,
    MBCInfo,
    MusicList
}