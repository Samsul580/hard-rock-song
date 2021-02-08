const searchSongs = () => {
    const songName = document.getElementById("song-name").value;
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
    .then(res => res.json())
    .then(data => displaySongs(data.data))
    .catch(err => alert('could not find this song!'))
}
const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerText = '';
    document.getElementById("song-lyric").innerText = '';
    songs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3";
        const songDetail = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="detailSongs('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `
        songDiv.innerHTML = songDetail;
        songContainer.appendChild(songDiv);
    });
}
const detailSongs = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(res => res.json())
    .then(data => getLyric(data.lyrics))
}
const getLyric = song => {
    const songLyric = document.getElementById("song-lyric");
    songLyric.innerText = '';
    songLyric.innerText = song;
    if (song.length== 0) {
        alert('could not find lyrics')
    }
}