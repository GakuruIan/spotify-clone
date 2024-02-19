export const scopes = [
    'user-read-email',
    'user-read-private',
    'playlist-modify-private',
    'playlist-read-collaborative',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-top-read',
    'user-follow-read',
    'user-library-read'
].join("%20")

export const getToken=()=>{
    return window.location.hash.substring(1).split('&').reduce((initial,item)=>{
        let parts = item.split('=')
        initial[parts[0]] = decodeURIComponent(parts[1])

        return initial
    },{})
}

